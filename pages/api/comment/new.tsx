import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import nowTime from "@/app/component/nowtime";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let data = JSON.parse(req.body);
    //console.log(Object.prototype.toString.call(req.body));
    //console.log(Object.prototype.toString.call(data));

    // db에 넣을 자료
    const content = {
        content: data.comment,
        author: data.data.email,
        post_id: new ObjectId(data.data.post_id),
        regdt: nowTime
    }
    //  db연결
    const db = (await connectDB).db("forum");
    let result = await db.collection("comment").insertOne(content);

    let selectData = await db.collection("comment").find({post_id : content.post_id}).toArray();

    if (result.acknowledged) {
        return res.status(200).json({ message: '댓글 등록 완료',result : true, data : selectData });
    }else{
        return res.status(500).json({ message: '댓글 등록 과정에서 오류가 발생했습니다' , result : false });
    }

}
