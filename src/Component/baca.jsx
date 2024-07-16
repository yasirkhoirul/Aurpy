import axios from 'axios';
import React, { useEffect, useState } from 'react';
import gambarkosong from '../assets/koleksi/buku.svg';
import { deleteBuku, DetailBukus, fetchGambar1 } from '../services/auth.services';
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';

const DetailBuku = (props) => {
    const User = () => {
        const authToken = Cookies.getItem('auth_token');
        if (!authToken) {
            navigate('/home');
        } else {
            const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
            
            if (!decodedToken || !decodedToken.email || !decodedToken.nama || !decodedToken.role) {
                alert('login terlebih dahulu');
                navigate('/home');
            }

            return decodedToken;
        }
    }

    const [buku, setBuku] = useState(null);
    const [gambarSrc, setGambarSrc] = useState(gambarkosong);

    useEffect(() => {
        
        fetchGambar1(props.children).then(data=>{
            setGambarSrc(data)
            console.log("iniadalahgambar",data)
        });
        DetailBukus(props.children).then(data=>{
            setBuku(data.book)
        })
        
        
    }, []);

    const navigate = useNavigate();

    const handle_del_frst = (id) => {
        const role = User().role;
        console.log("role",role);
        if (role === 1) {
            handling_delete(id);
        }
        else {
            alert("anda bukan admin");
        }
    }

    const handling_delete = async (id) => {
        try {
        const hapus = await deleteBuku(id);
        navigate('/koleksi')

    } catch (error) {
        alert(`Gagal menghapus buku: ${error.message}`);
      }
    }

    const pdfUrl = `https://aurpy-429202.et.r.appspot.com/books/view/${props.children}`;
    

    const unduh = () => {
        window.location.href = pdfUrl;
    };

    return (
        <>
            <section className="flex flex-col justify-start items-center mt-10" id="popdis">
                <div>
                    <h1 className="font-semibold text-3xl">KOLEKSI</h1>
                </div>
                <img src="/konten/line.png" alt="" className="mt-2 ml-2 mb-2" />
                <p className="mt-2 text-center">“Membaca adalah napas hidup dan jembatan emas ke masa depan”</p>
            </section>
            <section className=''>
                <div className="md:flex flex-row gap-5">
                    <div className="flex flex-row gap-4 md:gap-0 md:w-1/4 p-2 justify-start md:justify-center">
                        <div className="flex min-h-32 max-w-28 min-w-20 items-center">
                            <img className="object-center object-contain" src={gambarSrc} alt="" />
                        </div>
                        <div className="flex flex-col justify-between md:hidden w-full">
                            <h1 className="basis-1/2 p-2 text-biru text-2xl">{buku?.namaBuku}</h1>
                            <div className="basis-1/2 bg-abu_muda_banget flex flex-row justify-between p-2 gap-2 flex-wrap rounded-lg text-lg">
                                <div className="flex flex-col">
                                    <span className="text-abu">isbn</span>
                                    <p className="text-biru" id="isbn">{buku?.isbn}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-abu">penulis</span>
                                    <p className="text-biru">{buku?.pengarang}</p>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-abu">penerbit</span>
                                    <p className="text-biru">{buku?.penerbit}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-between md:m-10">
                        <h1 className="basis-1/2 p-2 text-biru hidden md:block text-2xl">{buku?.namaBuku}</h1>
                        <div className="basis-1/2 bg-abu_muda_banget hidden flex-row justify-between p-2 gap-2 flex-wrap rounded-lg md:flex text-lg">
                            <div className="flex flex-col">
                                <span className="text-abu">isbn</span>
                                <p className="text-biru" id="isbn">{buku?.isbn}</p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-abu">penulis</span>
                                <p className="text-biru">{buku?.pengarang}</p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-abu">penerbit</span>
                                <p className="text-biru">{buku?.penerbit}</p>
                            </div>
                        </div>
                        <div className="basis-4/6 p-2 flex flex-col justify-start">
                            <p className="text-merah">ABSTRAK</p>
                            <p>{buku?.abstrak}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col" id="popdis">
                <button className="bg-biru p-3 text-putih font-normal rounded-xl mx-10 my-3 " onClick={unduh}>
                    Download
                </button>
                <button className="bg-merah p-3 text-putih font-normal rounded-xl mx-10" onClick={() => handle_del_frst(props.children)}>
                    delete
                </button>
                <div className="mt-4">
                    {/* <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                    /> */}
                </div>
            </section>
        </>
    );
}

export default DetailBuku;
