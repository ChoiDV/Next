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


// bodyParser를 false로 설정하는 이유
// Next.js가 요청 본문을 해석하지 않도록 설정하는 것이다.
// Next.js가 요청 본문을 해석하면 개발자가 원하는대로 파일 저장하는데 문제가 생길 수 있다.
export const config = {
    api: {
        bodyParser: false,
    }
}

// 파일을 저장할 함수 readFile
const readFile = (req: NextApiRequest, saveLocally: boolean): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) { // saveLocally 변수는 로컬에 저장할지 말지 여부를 결정해줄 변수라고 생각
        options.uploadDir = process.env.FILE_UPLOAD_PATH; // 파일 저장 경로 // .env 파일에 변수로 따로 뺴놓음

        options.filename = (name, ext, path, form) => {
            let date = Date.now();
            let filename = "forum" +"_"+ date + "_" + path.originalFilename;  // 저장할 파일 이름 , path.originalFilename 에 파일의 원본명이 있다.
            return filename;
        }
        // 이렇게 formidable의 options 설정 끝
    }

    const form = formidable(options);  // 위에서 만든 options으로 formidable 객체 생성

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {  // 파일을 파싱하고 저장까지 해주는 부분 form.parse()
            // console.log(files); 여기에 파일정보들이 들어있고 배열형태로 있다.
            if (err) {
                reject(err);
            }
            resolve({ fields, files })
            
            // 1. form.parse를 실행한다 이때 
            // 첫번째 인자는 요청 객체(req)
            // 두번째 인자는 (err,fields,files) 를 인자로 하는 함수
            // 즉  form.parse(req, function(err,fields,files) )  라고 생각
            // form.parse의 첫번째 작업인 req객체를 파싱한다.
            // 이때 성공적으로 파싱이 완료되면 resolve를 실행하며 fields와 files를 넘겨주어 파일들을 저장한다.
            // 파싱에 실패할 경우 reject를 이용하여 err 를 반환한다.

            // 즉 파일을 저장하는건 form.parse()
        })
    })
}


// handler
export default async function Image(req: NextApiRequest, res: NextApiResponse) {
    let file_upload_path = process.env.FILE_UPLOAD_PATH; // 파일 저장경로
        if(!file_upload_path){  // ts때문에 null 체크
            file_upload_path = "";
        }  
    try{
        await fs.readdir(file_upload_path);  // 파일 경로를 읽는다. 이때 경로가 없다면 예외발생
    }catch (error){
        await fs.mkdir(file_upload_path);  //  저장경로를 만들어준다.
    }

    const {files} = await readFile(req,true);  // 위에서 만든 readFile()을 실행한다 req객체와 true 로컬에 저장하겠다는 변수 -> return은 파일객체를 받는다.
    let filenames : any = [];
    files?.files?.map((item,idx) =>{  // 파일객체에서 저장된 파일 이름들을 컴포넌트에 보내주기위해 저장하는 부분
        let date = Date.now();
        let filename = "forum" +"_"+ date + "_" + item.originalFilename;
        filenames[idx] = filename;
    })

    // 저장완료
    return res.status(200).json({result : true, "message" : "파일 업로드 성공" , data : filenames}) 

}
