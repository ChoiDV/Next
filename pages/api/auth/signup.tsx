import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {

        let data = req.body;
        
        if(!data.name){
            return res.status(500).json({ message : '아이디 입력바람'});
        }else if(!data.email){
            return res.status(500).json({ message : '이메일 입력바람'});
        }else if(!data.password){
            return res.status(500).json({ message : '비밀번호 입력바람'});
        }

        let hash = await bcrypt.hash(data.password,10);
        data.password = hash;
        let db = (await connectDB).db('forum');

        // 유효성 검증 로직 추가

        let result = await db.collection('user_cred').insertOne(data);

        if(result.acknowledged){
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.write('<script>alert("회원가입 완료"); window.location.href="/";</script>');
            res.end();
            //return res.status(200).json({ message : '가입완료'});
        }else{
            return res.status(500).json({ message : '가입실패'});
        }
       

    }

}