import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        let data = req.body;
        const db = (await connectDB).db("forum");
        try {
            if (data.title == '') {
                return res.status(500).json('제목을 입력해주세요');
            }
            let result = await db.collection('post').insertOne(data);
            // post collection에 새로운 document를 만들어서 data를 insert

            //return res.status(200).json('둥록 완료');
            
            //return res.redirect(302, '/list');

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.write('<script>alert("등록 완료"); window.location.href="/list";</script>');
            res.end();
        } catch (e) {
            console.error("DB Insert Error:", e);
            return res.status(500).json({ message: '등록 과정에서 오류가 발생했습니다' });
        }


    }

}