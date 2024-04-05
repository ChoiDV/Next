import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function List(request: NextApiRequest, response: NextApiResponse) {

    if (request.method == 'GET') {
        const db = (await connectDB).db("forum");
        let data = await db.collection('post').find().toArray();
        
        return response.status(200).json(data);
    }else if(request.method == 'POST'){
        return response.status(200);
    }
}