import RightIcon from "../assets/forum/RightIcon.svg"
import Silang from '../assets/forum/silang.svg'
import React, { useEffect } from 'react';

const Diskusibaru = (props) =>{
    const {buat=false} =props
    useEffect(() =>{
            let item = document.querySelector('#popdis')
            console.log(item)
            let hasil = item.classList
            hasil.toggle("hidden")
            setTimeout(function(){
                item.style.opacity = "1"
            },200)
        
    },[buat])
    
    
    function rekomendasi(){
        let item = document.querySelector('#droprek')
        
        if(item.classList.contains("hidden")){
            item.classList.toggle("hidden")
            setTimeout(function(){
                item.style.opacity = "1"
            },200)
        }
        else{
            item.style.opacity = "0"
            setTimeout(function(){
                item.classList.toggle("hidden")
            },200)
        }
    }
    function tutup(){
        let item = document.querySelector('#popdis')
        item.style.opacity = "0"
        setTimeout(function(){
            item.classList.toggle("hidden")
        },200)
    }
    return(
        <section className="hidden transition-all ease-in-out duration-200 opacity-0" id="popdis">
        <div className=" p-10 absolute inset-0 z-10 flex justify-center items-center " >
        
            <div className=" shadow-xl p-4 w-3/4 h-3/4 rounded-xl bg-putih flex flex-col ">
                <div className="flex flex-row justify-between items-center  border-abu_muda_banget p-2 border-b-2 " >
                    <p className="text-biru font-semibold text-lg"> Buat Diskusi Baru</p>
                    <button className="inline" onClick={tutup} >
                        <img src={Silang}  alt=""/>
                    </button>
                </div>
                <form className="flex-col flex p-2 mt-2 justify-between items-start h-full  " >
                    <div className="flex flex-col rounded-lg w-full   " >
                        <span className="text-biru font-semibold text-lg" >Pilih topik</span>
                        <div className="relative    ">
                            <div className=" flex justify-between px-3 py-5 border-ijo_muda border w-full rounded-xl z-10 cursor-pointer " id="tombolrek" onClick={rekomendasi}  >
                                <p className="text-abu" >Rekomendasi buku</p>
                                <img src={RightIcon} alt="" className="inline " />
                            </div>
                            <div className="border border-ijo_muda z-20 absolute  w-full rounded-b-xl -mt-3  bg-putih hidden transition-all duration-200 opacity-0" id="droprek" >
                                <ul className="text-abu" >
                                    <li className="p-2 cursor-pointer hover:bg-background_forum " >list 1</li>
                                    <li className="p-2 cursor-pointer hover:bg-background_forum " >list 2</li>
                                    <li className="p-2 cursor-pointer hover:bg-background_forum " >list 3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full  rounded-lg  flex flex-col h-2/4  " >
                        <p className="text-biru font-semibold text-lg" >Uraikan pertanyaan <span className="text-merah" >*</span></p>
                        <textarea className="rounded-lg border p-3 h-full border-ijo_muda " placeholder="Write Something"></textarea>
                        <p className="text-sm " >Uraikan pertanyaan Anda lebih panjang dan jelas pada bagian ini.</p>
                    </div>
                    <div className="flex justify-end flex-row w-full" >
                        <button className="bg-biru p-3 text-putih font-normal rounded-xl" >
                            Buat Diskusi
                        </button>
                    </div>
                    
    
                </form>
            </div>
            
        </div>
    </section>
    )
}
export default Diskusibaru