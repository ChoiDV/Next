
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
                        if (!e.target.files) {
                            return;
                        }

                        let files = e.target.files;
                        if (files.length === 0) {
                            setImgUrl([]);
                            setFileNames([]);
                            return;
                        }
                        if (imgUrl) {
                            imgUrl.map(item => {
                                // 이전에 URL.createObjectURL() 을 사용하여 생성한 URL을 해제하는 메서드
                                URL.revokeObjectURL(item);
                            })

                        }
                        let urls: any = [];
                        //let filename : any = [];
                        const formData = new FormData();
                       
                        Array.from(files).map((file, idx) => {
                            // img의 URL을 생성해내는 코드  매개변수에는 파일이 들어가야함
                            urls[idx] = URL.createObjectURL(file);
                            //filename[idx] = encodeURIComponent(file.name); // 인코딩  보낼필요없음 
                            formData.append("files",file);
                        })

                        setImgUrl(urls);
                        await fetch(`/api/post/image`,{
                            method : 'POST',
                            body : formData
                        })
                        .then(res =>{
                            return res.json();
                        })
                        .then(result =>{
                            if(result.result){
                                console.log("사진 저장 성공");
                                setFileNames(result.data);

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
                                }
                                {/* <img className="dd" src={imgUrl} alt="upload_img" width={500} height={300} /> */}
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}
//}