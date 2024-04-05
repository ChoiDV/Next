import { connectDB } from "@/util/database"
import Header from "./component/Header"

// DB 입출력 코드는 server componet 안에서만 쓰는게 좋다.
export default async function Home() {
  
  // await을 쓰려면 async function에서만 사용가능
  const client = await connectDB;
  const db = client.db("forum");
  const data = await db.collection('post').find().toArray();

  
  return (
    <>
      <div>Hello, World</div>
    </>
  )
}