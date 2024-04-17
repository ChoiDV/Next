'use client'

import { useEffect, useState } from "react"

interface CommentParam {
    data: {
        name?: string | null | undefined
        email?: string | null | undefined
        post_id: string
    }
}

interface Comment{
    _id : string
    content : string
    author : string
    post_id : string
    regdt : string
}
// user : User
export default function Comment(data: CommentParam) {
    let [comment, setComment] = useState('');

    let [commentList, setCommentList] = useState<Comment[]>([]); // 초기값을 Comment 타입의 빈 배열로 설정


    useEffect(()=>{
        fetch('/api/comment/select', {
            method: 'POST',
            body: JSON.stringify({
                post_id: data.data.post_id
            })
    
        }).then(res => {
            return res.json();
        }).then(result => {
            // 항상 오는 데이터의 구조 파악하기

           /*  const data: Comment[] = result.data.map((item: any) => ({
                _id: item._id.toString(),
                content: item.content,
                author: item.author,
                post_id: item.post_id,
                regdt: item.regdt
            })); */

            setCommentList(result.data);
        })
    },[]);
   




    return (

        <>
            <div>
                <div>
                {
                    commentList.length > 0 ? 
                    commentList.map((item,idx) =>{
                        return (
                            <p key={idx}>{item.content} - ({item.regdt}) </p>
                        )
                    })
                      : '댓글없음'
                }
                </div>
                <input value={comment} onChange={(e) => {
                    setComment(e.target.value)
                }} />
                <button onClick={() => {
                    fetch('/api/comment/new', {
                        method: 'POST',
                        body: JSON.stringify({
                            comment: comment,
                            data: data.data
                        })

                    }).then(res => {
                        return res.json();
                    }).then(result => {
                        alert(result.message);
                        
                        if(result.result){
                            setCommentList(result.data);
                            setComment('');   
                        }

                    })


                }}>댓글 작성</button>
            </div>
        </>
    )
}