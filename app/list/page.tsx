import { connectDB } from '@/util/database';
import ListItem from './ListItem';
import { ObjectId } from 'mongodb';

interface Board {
    _id: ObjectId
    title: string
    content: string
}

export default async function List() {
   
    const db = (await connectDB).db("forum");

    let result = await db.collection('post').find().toArray();

    // mongoDB에서 find 메소드로 반환된 결과 즉 result가
    // WithId<Document>[] type이라서 
    // 이 타입을 우리가 원하는 Board 타입으로 변환해줘야함
    // 그래서 map을 이용하여 formattedResult에 다시 담아주는과정
    const formattedResult: Board[] = result.map(item => ({
        _id: item._id, // _id가 ObjectId인 경우에는 변환 없이 그대로 사용 가능
        title: item.title,
        content: item.content
    }));

    return (
        <>
           <ListItem data={formattedResult} />
        </>
    )
}