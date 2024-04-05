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

export default async function ListItem(props : ListItemProps) {

    return (
        <>
            {
                props.data.map((board, idx) => (

                    <div className={styles['list-item']} key={idx} >
                        <Link prefetch={false} href={`/detail/${board._id}`}>
                            <h4>{board.title}</h4>
                            <p>{board.content}</p>
                        </Link>
                    </div>

                ))
            }
        </>
    )
}