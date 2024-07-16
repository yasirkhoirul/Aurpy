import { LayoutUtama } from "../Component/layouts/layout";
import { Isiforum } from "../Component";
import { useEffect } from "react";

const Forum = () => {
    useEffect (()=>{
        const username = localStorage.getItem("username")
        const password = localStorage.getItem("password")
        // localStorage.removeItem("username")
        console.log(`username = ${username}`)
        console.log(`password = ${password}`)
    },[])//array nya untuk dijalankan setiap kali item didalam array berubah

    
    return(
        <>
        <LayoutUtama>
            <Isiforum></Isiforum>
        </LayoutUtama>
        
        </>
    )
}

export default Forum