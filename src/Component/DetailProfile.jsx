import React from "react"
import ppuser from "../assets/user/hasilnyaadlaah.png"
import Logo1 from '../assets/Logo1.svg'
import Circles from "../assets/login/Circles.svg"
import { ForgotPas } from "../services/auth.services"
import { useNavigate } from "react-router-dom"
const DetailProfileFrag = (props) => {
    console.log(props.children)
    const role = (id) => {
        if(id === 1){
            return "admin"
        }else{
            return "user"
        }
    }
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-dvh" >
            <nav className=" flex justify-between flex-row bg-white items-center p-4 border-b-2 border-biru " >
                <button 
                onClick={() => navigate(-1)}
                className=" bg-ijo rounded-lg p-2 h-fit  ml-10 text-white " >back</button>
                <div className="flex justify-center items-center gap-4 " >
                <p className="text-biru" >Username</p>
                <img src={ppuser} alt="gambar" className="rounded-full w-16 h-16 min-w-16"/>
                </div>
            </nav>
            <div className=" bg-slate-50p-2 flex m-20 h-fit rounded-sm border border-ijo bg-birumuda flex-row shadow-xl items-center p-4 overflow-auto " >
                <div className="flex flex-col my-21 h-full justify-between text-xl gap-4 basis-1/5 ml-10 " >
                <div className="flex flex-row w-full" >
                    <div className=" flex justify-center flex-col text-biru " >
                        Username
                    </div>
                    {/* <p className="basis-2/3 ml-2 text-sm items-center flex border-abu_muda rounded-xl border p-2 " >yasirkhoirul</p> */}
                </div>
                <div className="flex flex-row w-full" >
                    <div className=" flex justify-center flex-col text-biru " >
                        Email
                    </div>
                    {/* <p className="basis-2/3 ml-2 text-sm items-center flex border-abu_muda rounded-xl border p-2 " >yasirkhoirul@gmail.com</p> */}
                </div>
                <div className="flex flex-row w-full" >
                    <div className=" flex justify-center flex-col text-biru " >
                        Role
                    </div>
                    {/* <p className="basis-2/3 ml-2 text-sm items-center flex border-abu_muda rounded-xl border p-2 " >user</p> */}
                </div>
                </div>
                <div className="flex flex-col justify-center text-xl gap-4 basis-3/4 " >
                <div className="flex flex-row w-full" >
                    <p className="basis-2/3 ml-2 text-sm items-center flex border-abu_muda rounded-xl border p-2 " >{props.children.nama}</p>
                </div>
                <div className="flex flex-row w-full" >
                    <p className="basis-2/3 ml-2 text-sm items-center flex border-abu_muda rounded-xl border p-2 " >{props.children.email}</p>
                </div>
                <div className="flex flex-row w-full" >
                    <p className="basis-2/3 ml-2 text-sm items-center flex border-abu_muda rounded-xl border p-2 " >{role(props.children.role)}</p>
                </div>
                </div>
            </div>
        </div>
    )

    
}
export default DetailProfileFrag