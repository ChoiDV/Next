import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import Btn from "./Btn";
import Link from "next/link";

interface Post{
    params : {
        post_id : string
    },
    searchParams : {

    }
}

export default async function Detail(props : Post){
    const db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.post_id)});

    return (
        <>
            <h4>상세페이지</h4>
            <h4>{result && result.title}</h4>
            <p>{result && result.content}</p>
            <Link href={`/edit/${props.params.post_id}`} className='updateBtn'>수정</Link>
            <Btn />
        </>
    )
}