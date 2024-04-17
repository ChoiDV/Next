import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import Btn from "./Btn";
import Link from "next/link";
import Comment from "./Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface Post {
    params: {
        post_id: string
    },
    searchParams: {

    }
}

interface Comment {
    name? : string | null | undefined
    email? : string | null | undefined
    post_id : string
}

export default async function Detail(props: Post) {
    const db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.post_id) });

    let session = await getServerSession(authOptions);
    
    const comment = {
        name : session?.user?.name,
        email : session?.user?.email,
        post_id : props.params.post_id.toString()
    }

    return (
        <> 
            <h4>상세페이지</h4>
            <h4>{result && result.title}</h4>
            <p>{result && result.content}</p>
            <Link href={`/edit/${props.params.post_id}`} >✏️</Link>
           {/*  <Comment user={session && session.user}/> */}
            <Comment data={comment}/>

            {/* <Btn /> */}
        </>
    )
}