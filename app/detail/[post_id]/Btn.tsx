'use client'

import { useRouter } from "next/navigation"

export default function Btn() {

    let router = useRouter();

    function move(action: string) {
        if(action === 'back'){
            router.back();
        }else if(action === 'list'){
            router.push('/list');
        }
    }

    return (
        <>
            <div className="navBtn">
                <button onClick={() => { move('back');}}>뒤로가기</button>
                <button onClick={() => { move('list');}}>목록</button>
            </div>
        </>
    )
}