import Link from "next/link";

export default function Header() {

    

    return (
        <>
            <div className='navbar'>
                <Link href={`/`}>Home</Link>
                <Link href={`/list`}>List</Link>
                <Link href={`/write`}>Write</Link>
            
                {/* <Link href={`/api/list`}>Data-List</Link>
                <Link href={`/api/nowtime`}>Now-time</Link> */}
            </div>
        </>
    )
}