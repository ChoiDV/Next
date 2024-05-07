'use client'

import { signIn } from "next-auth/react"
import { useEffect } from "react"

export default function LoginBtn() {

    // localStorage는 client 컴포넌트에서만 사용가능
    // 근데 client 컴포넌트여도 서버에서 렌더링 가능한건 미리 렌더링해주기떄문에 
    // localStorage.setItem() 등등을 사용하면 오류가 발생할수도있음 그래서 
    // Next.js에서 localStorage를 사용할땐

    // localStorage
    // useEffect(()=>{
    //     if(typeof window != 'undefined'){ // 현재 위치가 브라우저인지 서버인지 확인하는 조건문 -- 브라우저에서는 window 변수가 undefined가 아니면 브라우저라고 생각함
    //         localStorage.setItem('uimode','dark');
    //     }
    // },[]);

    
    return (
        <>
        
            <button onClick={() => { signIn() }}>로그인</button>
           {/*  <button onClick={() => { signOut() }}>로그아웃</button> */}
        </>
    )
}