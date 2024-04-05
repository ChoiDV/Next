'use client'

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

interface Post {
    post_id: string
}
export default function DetailLink(props: Post) {
    let router = useRouter(); // useRouter()는 client component안에서만 사용가능

    let a = usePathname(); // 현재 URL 출력
    let b = useSearchParams(); // 현재 Search parameter 출력
    let c = useParams(); // 유저가 dynamic route 입력한거 출력은 useParams();



    function moveButton() {
        router.push(`/detail/${props.post_id}`);
        // router.back();  이전페이지 이동
        // router.forward();  앞으로가기
        // router.refresh();  새로고침 // 변동사항이 있는 일부분만 바꿔줌 // soft refresh기능
        // router.prefetch('/detail/dsds'); // 페이지 미리로드 
    }
    return (
        <>
            <button onClick={moveButton}>버튼</button>
        </>
    )
}