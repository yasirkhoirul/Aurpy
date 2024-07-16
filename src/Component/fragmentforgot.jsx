import React from "react"
import Logo1 from '../assets/Logo1.svg'
import Circles from "../assets/login/Circles.svg"
import { ForgotPas } from "../services/auth.services"
const Forgot = () => {

    const handleforgot = async (event) => {
        event.preventDefault();
    
        const data = {
          email: event.target.email.value
        };
        console.log(data)
        ForgotPas(data,(status,res) =>{
            if(status){
              // localStorage.setItem("token",res)
              console.log(`res=${res}`)
              alert(res)
              // window.location.href="/forum"
            }else{
              console.log(`res=${res}`)
              alert(res)
            }
          })
    
        
      };

    return (
        <form  
        onSubmit={handleforgot}
        className="gap-5 flex-1 basis-1/2 justify-center p-2 bg-putih items-start flex flex-col ml-10" >
            <img src={Logo1} alt="" className="absolute left-0.5 top-0.5 md:ml-10 md:mt-5" />
            <div className="flex flex-col" >
                <p className="text-3xl font-semibold text-biru" >Kirim Email</p>
                <span>Jangan khawatir! silahkan masukkan alamat email yang ditautkan dengan akun Anda.</span>
            </div>
            <div className="flex flex-col gap-4">
                <span>Alamat Email</span>
                <div>
                    <input name="email" type="email" className="rounded-lg p-2 pr-12 border-2 border-abu invis" placeholder="Masukkan alamat email "/>
                </div>
                <button 
                type="submit"
                className="bg-ijo_muda p-2 w-full rounded-lg" onclick="location.href='CekEmail.html'" >
                    <p className="text-putih" >Cek Email</p>
                </button>
            </div>
            <img src={Circles} alt="" className="absolute bottom-0 left-0 md:block md:absolute hidden" />
        </form>
    )

    
}
export default Forgot