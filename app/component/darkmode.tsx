'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DarkMode() {
    let router = useRouter();

    let [uimode, setUimode] = useState('');

    useEffect(() => { // 맨처음에 실행할때 한번만 쿠키 생성하기위해
        if (typeof window === 'undefined') return;
        let existMode = ('; ' + document.cookie).split(`; uimode=`).pop()?.split(';')[0];
        if (existMode == '') {
            document.cookie = "uimode=light; max-age=" + (3600 * 24 * 400);
            setUimode('light');
        } else {
            if (existMode !== undefined) { // ts때문에 한번더 검사;;
                setUimode(existMode);
            }
        }

    }, []);




    return (
        <>
            <span onClick={() => {
                let mode = '';
                if(uimode === 'light'){
                    mode = 'dark'
                }else if(uimode === 'dark'){
                    mode = 'light';
                }
                document.cookie =  `uimode=${mode}; max-age=` + (3600 * 24 * 400);
                setUimode(mode);
                router.refresh();
            }}> { uimode && uimode === 'light' ? '🌙' : uimode === 'dark' ? '☀️' : '' }</span>
        </>
    )
}