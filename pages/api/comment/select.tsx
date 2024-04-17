import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse){
    let data = JSON.parse(req.body);
    
    const db = (await connectDB).db("forum");
    let result = await db.collection('comment').find({post_id : new ObjectId(data.post_id)}).toArray();

    return res.status(200).json({ data : result});
}