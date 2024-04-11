'use client'

import Link from 'next/link';
import styles from './list.module.css';
import { ObjectId } from 'mongodb';


// 이렇게도 사용가능 
// interface Board {
//     data: {
//         _id: ObjectId
//         title: string
//         content: string
//     }[]
// }


// 이렇게 해도된다 Board 정의 ListItemProps에서 data : Array<Board>
interface Board {
    _id: ObjectId
    title: string
    content: string
}
interface ListItemProps {
    data: Array<Board>
}

export default function ListItem(props: ListItemProps) {


    function deletePost(_id: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        fetch(`/api/post/delete`, {
            method: 'POST',
            body: JSON.stringify({ _id: _id })
        })
            .then(res => {
                // if(res.ok){
                return res.json();
                // }
            })
            .then(data => {
                alert(data.message);
                if (data.result) {
                    //console.log(e.target); // <span></span>
                    const eventTarget = e.target as HTMLElement;
                    
                    const parentElement = eventTarget.parentElement as HTMLElement;
                     
                    parentElement.style.opacity = '0';
                    setTimeout(()=>{
                        //parentElement.style.display = 'none';
                        //parentElement.remove();
                        location.reload();
                    },1000);

                    // location.reload();  // 새로고침
                }

            })
            .catch(error => { // 인터넷문제 또는 연결문제로 실패시 실행할 코드
                console.log("error : " + error)
            });

        // const name = "choijinyoung";
        // ?name=${name}
        // fetch(`/api/server?name=${name}`)
        // fetch(`/api/abc/${name}`);

    }
    return (
        <>
            {
                props.data.map((board, idx) => (

                    <div className={styles['list-item']} key={idx} >
                        <Link prefetch={false} href={`/detail/${board._id}`}>
                            <h4>{board.title}</h4>
                            <p>{board.content}</p>
                        </Link>
                        <Link href={`/edit/${board._id}`} >✏️</Link>
                        <span onClick={e => {
                            deletePost(board._id.toString(), e)
                        }}>🗑️</span>
                    </div>

                ))
            }
        </>
    )
}