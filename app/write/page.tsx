
'use client'

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useState } from "react";

export default function Write() {

    //let session = await getServerSession(authOptions);

    /*  if (!session) {
         return (
             <>
                 <div className="p-20">
                     <h4>로그인 후 이용해주세요</h4>
                 </div>
             </>
         )
     } else { */

    
    let [imgUrl, setImgUrl] = useState([]);  // 선택한 사진 img url
    let [filenames, setFileNames] = useState([]);  // 선택한 사진 저장한 후 사진 파일명 -> 글 저장시 DB 매핑

    return (
        <>
            <div className="p-20">
                <h4>글 작성</h4>
                <form action="/api/post/new" method="POST">
                    <input name="title" placeholder="글 제목" />
                    <input name="content" placeholder="글 내용" />

                    <input type="file" multiple accept="image/*" onChange={async (e) => {
                        if (!e.target.files) { // null 체크 -> 선택했다가 취소했을경우에도 여기로 들어옴
                            setImgUrl([]);    // imgUrl 변수 초기화
                            setFileNames([]); // filenames 변수 초기화
                            return;
                        }
                        let files = e.target.files; // 업로드 한 파일들
                       
                        if (imgUrl) {
                            imgUrl.map(item => {
                                // 이전에 URL.createObjectURL() 을 사용하여 생성한 URL을 해제하는 메서드
                                URL.revokeObjectURL(item);
                            })

                        }
                        let urls: any = [];  // img 미리보기를 위한 url 생성후 담아놓을 변수

                        const formData = new FormData(); // 서버에 넘길 formData
                       
                        Array.from(files).map((file, idx) => {
                            // img의 URL을 생성해내는 코드  매개변수에는 파일이 들어가야함
                            urls[idx] = URL.createObjectURL(file);  // 미리보기 url 생성
                            formData.append("files",file);   // formData에 append
                        })

                        setImgUrl(urls);   // 미리보기 url들을 state 변수에 저장

                        // 여기까지 서버에 보낼준비 완료


                        // 서버에 보내기
                        await fetch(`/api/post/image`,{   // 각자 서버 컴포넌트 경로 적으시고
                            method : 'POST',
                            body : formData
                        })
                        .then(res =>{
                            return res.json();
                        })
                        .then(result =>{
                            if(result.result){
                                console.log("사진 저장 성공");
                                setFileNames(result.data);  // 저장된 파일 이름 가져와서 state변수에 저장 -> db매핑을 위해
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        })
                    }}
                    />
                    <button type="submit">등록</button>
                </form>

                {
                    imgUrl && (
                        <>
                            <div style={{ marginTop: "20px" }}>
                                {
                                    imgUrl.map((item,idx) => (
                                        <img className="img" style={{margin:"10px"}} src={item} alt="upload_img" width={500} height={300} key={idx} />
                                    ))
                                    // imgUrl로 map 함수를 사용해 사진 띄우기
                                }
                                {
                                  // 사진을 한개만 올리도록 한다면 이렇게 사용
                                 /* <img className="img" src={imgUrl} alt="upload_img" width={500} height={300} /> */
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}