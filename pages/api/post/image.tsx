import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";

/* export const config = {
    api: {
        // bodyParse : false, // = next.js 자체에서 request body에 대한 처리 하는것을 막는다.
        bodyParser: {   
            sizeLimit: '10mb',
        }
    }
} */

export const config = {
    api: {
        bodyParser: false,
    }
}

const readFile = (req: NextApiRequest, saveLocally: boolean): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = process.env.FILE_UPLOAD_PATH;

        options.filename = (name, ext, path, form) => {
            let date = Date.now();
            let filename = "forum" +"_"+ date + "_" + path.originalFilename;
            
            return filename;
        }
    }

    const form = formidable(options);

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {  // 파일을 파싱하고 저장까지 해주는 부분 form.parse
            // console.log(files); 여기에 파일정보들이 들어있고 배열형태로 있다.
            if (err) {
                reject(err);
            }
            resolve({ fields, files })
            
        })
    })
}
export default async function Image(req: NextApiRequest, res: NextApiResponse) {
    let file_upload_path = process.env.FILE_UPLOAD_PATH;
        if(!file_upload_path){
            file_upload_path = "";
        }
    try{
        await fs.readdir(file_upload_path);
    }catch (error){
        await fs.mkdir(file_upload_path);
    }
    const {files} = await readFile(req,true);
    let filenames : any = [];
    files?.files?.map((item,idx) =>{
        let date = Date.now();
        let filename = "forum" +"_"+ date + "_" + item.originalFilename;
        filenames[idx] = filename;
    })
    return res.status(200).json({result : true, "message" : "파일 업로드 성공" , data : filenames})
}
