import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface ChangeData{
    title? : string,
    content? : string
}

export default async function handler(req : NextApiRequest , res : NextApiResponse){
    
    let data = req.body;
    
    const db = (await connectDB).db("forum");
    try{
        let changeData : ChangeData = {
            title : data.title,
            content : data.content
        }

        //let result = await db.collection('post').updateOne( {_id : new ObjectId(data._id) }, {$set : { title : data.title , content : data.content} });
        let result = await db.collection('post').updateOne( {_id : new ObjectId(data._id) }, {$set : changeData });

        if(result.modifiedCount > 0){
            // 1개 이상 성공
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.write('<script>alert("수정 완료"); window.location.href="/detail/'+data._id+'";</script>');
            res.end();
            
            // res.status(200).redirect('/list');
        }
    }catch(e){
        console.error("DB Insert Error:", e);
        return res.status(500).json({ message: '등록 과정에서 오류가 발생했습니다' });
    }
    


}