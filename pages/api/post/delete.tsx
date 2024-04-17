import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let data = JSON.parse(req.body);

    const db = (await connectDB).db("forum");

    let session = await getServerSession(req, res, authOptions);

    let selectData = await db.collection('post').findOne({ _id: new ObjectId(data._id) });


    if (selectData && selectData.author == session?.user?.email) {
        let result = await db.collection('post').deleteOne({ _id: new ObjectId(data._id) });

        if (result.deletedCount > 0) {
            return res.status(200).json({ message: '삭제 완료', result: true });
        } else {
            return res.status(500).json({ message: '삭제 과정에서 오류가 발생했습니다', result: false });
        }
    } else {
        return res.status(200).json({ message: '본인 게시글만 삭제 가능합니다.', result: false });
    }
}