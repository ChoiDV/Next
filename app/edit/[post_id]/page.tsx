import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

interface Post{
    params : {
        post_id : string
    },
    searchParams : {

    }
}

export default async function Edit(props : Post ){
    
    const db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne( { _id : new ObjectId(props.params.post_id)} );

    //await db.collection('post').updateOne({ _id : props.params.post_id }, { $set : { title : '수정 제목' , content : '수정 내용' } } )
    
    const _id : string = props.params.post_id;

    return (
        <>
            <div className="p-20">
                <h4>수정페이지</h4>
                <form action="/api/post/edit" method="POST">
                    <input type="hidden" name="_id" value={result?._id?.toString()} />
                    <input name="title" placeholder="글 제목"  defaultValue={result?.title} />
                    <input name="content" placeholder="글 내용" defaultValue={result?.content} />
                    <button type="submit">수정</button>
                </form>
            </div>
        </>
    )
}