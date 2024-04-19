'use client'

export default function Error(error : Error , reset : any ){
    return (
        <>
            <h4>에러남</h4>
            <button onClick={()=>(
                reset()
            )} >reset</button>
        </>
    )
}