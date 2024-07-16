import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg'
import pp from '../assets/pp.jpg'
import Logo1 from '../assets/Logo1.svg'
import Circles from "../assets/login/Circles.svg"
import Ellipse from "../assets/login/Ellipse 4.svg"
import gambarbuku from "../assets/login/gambarbuku.svg"
import arrow from "../assets/navigasi/evaArrowIosBackFill2.svg"
import garis from "../assets/navigasi/garis.svg"
import suka from "../assets/forum/love.svg"
import balas from "../assets/forum/reply.svg"
import loved from "../assets/forum/loved.svg"
import pesawatkertas from "../assets/forum/pesawatkertas.svg"
import ppuser from "../assets/user/hasilnyaadlaah.png"
import kiripage from "../assets/forum/kiri.svg"
import kananpage from "../assets/forum/kanan.svg"
import kacapembesar from "../assets/forum/kacapembesar.svg"
import RightIcon from "../assets/forum/RightIcon.svg"
import Diskusibaru from './diskusibaru';
import Cookies from 'js-cookies';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { Regis, getUser, loginUser } from '../services/auth.services';



const user = 
  {
    photouser:ppuser,
    email:"yasirkhoirul@gmail.com",
    username:"yasirhuda"
  }


const Aref = (props) =>{

    const {href = "#",children = "menu"}=props
  
    return(
      <a className=" text-biru font-medium text-2xl transition duration-300 ease-in-out hover:underline " href={href}>
      {children}
      </a>
    );
    //tanpa des atau nilai default
    // return(
    //   <a className=" text-biru font-medium text-2xl transition duration-300 ease-in-out hover:underline " href={props.href}>
    //   {props.children}
    //   </a>
    // );
  };
  
  const Navigasi = () =>{
    const [username,setUsername] = useState("username")
    const [ceklogin,setCeklogin] = useState(false)
    const Logout = () => {
      Cookies.removeItem('auth_token')
      window.location.href = "/login"
    }
    
    useEffect(()=>{
      const token = Cookies.getItem('auth_token')
      console.log(token)
      if(token!==null){
        setCeklogin(true)
        const gail = getUser(token)
        setUsername(gail.email)
      }else{
        setCeklogin(false)
      }
      console.log("cek:",ceklogin)
      
    },[])
    
    function checkFlexDirection() {
    let item = document.querySelector('#navbawah');
    const styles = window.getComputedStyle(item);
    const flexDirection = styles.getPropertyValue('flex-direction');
  

    // console.log(`Current flex-direction: ${flexDirection}`);

    if (flexDirection === 'row-reverse') {
        
        item.classList.remove('hidden');
        item.style.opacity = "1";
    } else if (flexDirection === 'column-reverse') {
        
        item.classList.add('hidden');
        item.style.opacity = "0";
    }
}


window.addEventListener('resize', checkFlexDirection);

    const turunkan = () => {
      let item = document.querySelector('#navbawah')
      let display = window.getComputedStyle(item).getPropertyValue('display');

     
      if(item.classList.contains("hidden")){
          item.classList.remove("hidden");
          setTimeout(function(){
              item.style.opacity = "1";
          },200)
  
      }else{
          item.style.opacity = "0";
          setTimeout(function(){
              item.classList.add("hidden");
          },200)
      }
  }

    const dropdown = () => {
      let turun = document.querySelector('#turun');
      let opcity_turun = window.getComputedStyle(turun).getPropertyValue('opacity');
  
      let muter = document.querySelector('#ikon');
      muter.classList.toggle("rotate-180");
  
      if (turun.classList.contains("hidden")){
          turun.classList.remove("hidden");
          console.log("elemen punya hidden");
          console.log(opcity_turun)
          setTimeout(function(){
              turun.style.opacity = "1";
          },200)
          
          
      }else{
          turun.style.opacity = "0";
          console.log("ridak punya elemen hidden");
          console.log(opcity_turun)
          setTimeout(function(){
              turun.classList.add("hidden")
          },200)  
      }
    }
    const handlingprofile = () =>{
      const navigate = useNavigate();
      navigate('/detailprofile')
    }
   
    
    return(
    <nav className="flex shadow-md bg-ijo justify-between flex-col md:flex-row ">
        <div className="p-2 flex items-center flex-none md:justify-center md:ml-12 justify-between">
            <img src={Logo} alt="" className="ml-4"/>
            <img src={garis} alt="" className="cursor-pointer mr-4 md:hidden" onClick={turunkan} id="garistiga" />
        </div>
        <div className="p-2 md:flex  flex-col-reverse md:flex-row-reverse gap-2 item flex-grow mr-10 transition-all duration-300 ease-in-out md:opacity-100 bg-putih rounded-xl shadow-xl justify-center items-center right-0  translate-y-1/4 md:translate-y-0 md:bg-ijo md:justify-start md:shadow-none  absolute md:relative opacity-0 hidden" id="navbawah">
            <div className={`flex-col items-start  md:items-center gap-5 p-2 flex md:flex-row ${!ceklogin ? 'hidden' : ''}`} >
                <button onClick={Logout} >logout</button>
                <Link
                to={`/detailprofile`}
                >{username}</Link>
                <img src={user.photouser} alt="gambar" className="rounded-full w-16 h-16 min-w-16"/>
            </div>
            <div className ={`flex-col items-start  md:items-center gap-5 p-2 flex md:flex-row ${!ceklogin ? '' : 'hidden'}`} >
                <Link to={"/login"} ><div className="bg-biru px-12 py-2 rounded-xl transition-colors ease-in-out duration-300 text-putih hover:bg-putih hover:text-ijo ">masuk</div></Link>
                <Link to={"/daftar"} ><div className="bg-putih px-12 py-2 rounded-xl transition-colors ease-in-out duration-300 hover:text-ijo hover:bg-biru">daftar</div></Link>
            </div>
            <div className="flex flex-col gap-5 p-2 items-start md:items-center rounded md:flex-row  ">
                <Aref href="/home" >Beranda</Aref>
                <div className ={!ceklogin ? 'hidden' : ''} >
                    <div className="flex justify-center" >  
                        <div className=" text-biru font-medium text-2xl hover:underline cursor-pointer " onClick={dropdown}>Laporan</div>
                        <img className="h-auto inline cursor-pointer transition-all duration-500" src={arrow}  alt="" srcSet="" id="ikon" />
                    </div>
                    <div className="bg-putih absolute text-start hidden transition-all duration-500 z-10 shadow-xl opacity-0" id="turun">
                      <div className='flex flex-col' >
                      <Link className="p-2 hover:bg-abu_muda transition-all duration-300 border border-abu_muda cursor-pointer h-full bg-white " to="/laporanKategori">Tambah Kategori</Link>
                      <Link className="p-2 hover:bg-abu_muda transition-all duration-300 border border-abu_muda cursor-pointer bg-white " to="/laporan" >Tambah buku</Link>
                    
                      </div>
                    </div>

                </div>
                
                <Aref href="/koleksi" >Koleksi</Aref>
                <Aref href="/forum" >forum</Aref>
                
            </div>
        </div>
    </nav>
    )
  }

  const Daftarkiri = () => {
    const [cekemail, setCekemail] = useState(false);
    const [cekur, setCekur] = useState(false);
    const [cekpassword, setCekpassword] = useState(false);
  
    const handledaftar = async (event) => {
      event.preventDefault();
      const data = {
        email: event.target.email.value,
        nama: event.target.ur.value,
        password: event.target.pw.value,
      };
  
      let isValid = true;
  
      if (data.email === "") {
        console.log("email kosong");
        setCekemail(true);
        isValid = false;
      } else {
        setCekemail(false);
      }
  
      if (data.name === "") {
        console.log("username kosong");
        setCekur(true);
        isValid = false;
      } else {
        setCekur(false);
      }
      
      if (data.password === "") {
        console.log("password kosong");
        setCekpassword(true);
        isValid = false;
      } else {
        setCekpassword(false);
      }
  
      if (isValid) {
        console.table(data)
        Regis(data,(status,res) =>{
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
      }
    };
  
    return (
      <form className="gap-5 flex-1 basis-1/2 justify-center p-2 bg-putih items-center flex flex-col" onSubmit={handledaftar}>
        <img src={Logo1} alt="" className="absolute left-0.5 top-0.5 md:ml-10 md:mt-5" />
        <div className="flex flex-col">
          <p className="text-3xl font-semibold text-biru">Daftar</p>
          <span>Email</span>
          <input name='email' type="email" className="rounded-lg p-2 pr-12 border-2 border-abu" placeholder="Masukkan Email" />
          {cekemail && <p className="text-red-500">Email harus diisi</p>}
        </div>
        <div className="flex flex-col">
          <span>Username</span>
          <input name='ur' type="text" className="rounded-lg p-2 pr-12 border-2 border-abu" placeholder="Masukkan Username" />
          {cekur && <p className="text-red-500">Username harus diisi</p>}
        </div>
        <div className="flex flex-col">
          <span>Kata Sandi</span>
          <div>
            <input name='pw' type="password" className="rounded-lg p-2 pr-12 border-2 border-abu" placeholder="Masukkan Password" />
          </div>
          {cekpassword && <p className="text-red-500">Kata sandi harus diisi</p>}
          <div className="text-right mt-2 mb-2">
            <Link to={"/lupapassword"} >Lupa kata Sandi?</Link>
          </div>
          <button className="bg-ijo_muda p-2 w-full rounded-lg" type='submit'>
            <p className="text-putih">Daftar</p>
          </button>
        </div>
        <img src={Circles} alt="" className="absolute bottom-0 left-0 md:block md:absolute hidden" />
      </form>
    );
  }
  const Loginkiri = () => {
    const [loginfail, setLoginfail] = useState("");
  
    const handlelogin = async (event) => {
      event.preventDefault();
  
      const data = {
        email: event.target.ur.value,
        password: event.target.pw.value
      };
      console.log(data)
  
      try {
        const response = await loginUser(data);
        console.log(response.data)
        console.log('responyya');
        if (response.status !== 200) {
          console.log('responyya',response.status);
          setLoginfail('Login failed. Please check your credentials and try again.');
          return;
        }else{
          const token = response.data.token;
          const userData = getUser(token); // Pastikan getUser didefinisikan di tempat lain // Pastikan getUser didefinisikan di tempat lain
          const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
          const secondsUntilExpired = userData.exp - currentTime;
          console.log('expired:', userData.exp);
          console.log('currentTime:', currentTime);
          console.log('secondsUntilExpired:', secondsUntilExpired);

          //masukkan ke cookies
        Cookies.setItem('auth_token',token, secondsUntilExpired, '/', '', true, 'None');
        window.location.href = "/home";
        }
        
  
       
      } catch (error) {
        console.error('Error:', error);
        console.error('Error:', error);
        // Log the status and message for debugging purposes
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
        
        // Set a user-friendly error message
      
        setLoginfail('Login failed. Please check your credentials and try again.');
      }
    };
  
    return (
      <>
        <img src={Logo1} alt="" className="absolute left-0.5 top-0.5 md:ml-10 md:mt-5" />
        <form onSubmit={handlelogin}>
          <div className="flex flex-col">
            <p className="text-3xl font-semibold text-biru">Masuk</p>
            <span>Email</span>
            <input
              name='ur'
              type="text"
              className="rounded-lg p-2 pr-12 border-2 border-abu"
              placeholder="Masukkan username"
            />
          </div>
          <div className="flex flex-col">
            <span>kata sandi</span>
            <input
                name='pw'
                type="password"
                className="rounded-lg p-2 pr-12 border-2 border-abu"
                placeholder="Masukkan password"
            />
            <div className="text-right mt-2 mb-2">
              <Link to={"/lupapassword"} >Lupa kata Sandi ?</Link>
            </div>
            {loginfail && <p className="text-merah text-center mb-2">{loginfail}</p>}
            <button className="bg-ijo_muda p-2 w-full rounded-lg flex justify-center" type="submit">
              <p className="text-putih">MASUK</p>
            </button>
          </div>
        </form>
        <img src={Circles} alt="" className="absolute bottom-0 left-0 md:block md:absolute hidden" />
      </>
    );
  }

const Loginkanan = () =>{
    return(
        <>
            <div className="  h-full w-full  items-center justify-center flex" >
                <img src={gambarbuku} alt=""/>
            </div> 
            
            <img src={Ellipse} alt="" className=" right-0 bottom-0 hidden md:block md:absolute "/>
        </>
    )
  }

const Registerkiri = () => {
  return(
    <div className="gap-5 flex-1 basis-1/2 justify-center p-2 bg-putih items-center flex flex-col" >
    <img src="/konten/Frame 22.png" alt="" className="absolute left-0.5  top-0.5 md:ml-10 md:mt-5" />
    <div className="flex flex-col" >
        <p className="text-3xl font-semibold text-biru" >Daftar</p>
        <span>Email</span>
        <input type="email" className="rounded-lg p-2 pr-12 border-2 border-abu" placeholder="Masukkan Email"/>

    </div>
    <div className="flex flex-col" >
        <span>username</span>
        <input type="text" className="rounded-lg p-2 pr-12 border-2 border-abu" placeholder="Masukkan username"/>

    </div>
    <div className="flex flex-col">
        <span>kata sandi</span>
        <div>
            <input type="password" className="rounded-lg p-2 pr-12 border-2 border-abu" placeholder="Masukkan password"/>
        </div>
        <div className="text-right mt-2 mb-2" >
            <a href="lupakatasandi.html">lupa kata sandi?</a>
        </div>
        <button className="bg-ijo_muda p-2 w-full rounded-lg" >
            <p className="text-putih" >MASUK</p>
        </button>
    </div>
    <img src="/konten/Circles.png" alt="" className="absolute bottom-0 left-0" />
  </div>
  )
}


const reply = [
  {
    id :1,
    photo: pp,
    nama : "yasir kh",
    subjek : "Kehilangan",
    balasan : "lorem ipsum baa ",
    like : 2,
    balasanya: 2,
    waktu: "2024-05-17T10:00:00",
    disukai:false
  },
  {
    id :2,
    photo: pp,
    nama : "Ahmad",
    subjek : "pencurian",
    balasan : "lorem ipsum baa ",
    like : 4,
    balasanya: 1,
    waktu: "2024-05-17T11:00:00",
    disukai:true
  },
  {
    id :3,
    photo: pp,
    nama : "Ahmad",
    subjek : "pencurian",
    balasan : "lorem ipsum baa ",
    like : 4,
    balasanya: 0,
    waktu: "2024-04-17T12:00:00",
    disukai:false
  },
  {
    id :4,
    photo: pp,
    nama : "yasir kh",
    subjek : "Kehilangan",
    balasan : "lorem ipsum baa ",
    like : 2,
    balasanya: 0,
    waktu: "2024-05-17T09:00:00",
    disukai:false
  },
  {
    id :5,
    photo: pp,
    nama : "yasir kh",
    subjek : "Kehilangan",
    balasan : "lorem ipsum baa ",
    like : 2,
    balasanya: 0,
    waktu: "2024-05-17T16:00:00",
    disukai:false
  },
]
const balasanorang = [
  {
    idreply:1,
    pp : pp,
    nama : "budi",
    isi : "asd",
    waktu : "2024-05-17T12:00:00"
  },
  {
    idreply:1,
    pp : pp,
    nama : "budian",
    isi : "cukup menyenangkan",
    waktu : "2024-05-17T13:00:00"
  },
  {
    idreply:2,
    pp : pp,
    nama : "budian",
    isi : "tidak asik",
    waktu : "2024-05-17T14:00:00"
  }
]

const Balasannyaorang = (props) => {
  const {id} = props
  // console.log(id)
  const sortbalasan = [...balasanorang].sort((a,b) => new Date(b.waktu) - new Date(a.waktu) )
  return(
    <>
    
    {
    
    sortbalasan.map ((isi,index) =>{
      if(id==isi.idreply){
        return(
          
            <div className=" w-full  p-4 flex flex-row gap-2" id="isi " key={index} >
                <img src={isi.pp} alt="gambar" className="rounded-full w-8 h-8" />
                <div className="bg-border_ijo flex flex-col  w-full h-full p-2 rounded-lg" >
                    
                        <p id="nama" className="font-semibold">{isi.nama}<img src="/konten/forum/bulet.svg" className="inline" alt=""/> <span id="satuan" className="text-abu" >{isi.waktu}</span> </p>
                    
                    <p className="text-abu" id="komentar" >{isi.isi}</p>
                </div>
          </div>
          
            )
      }

      })

    }
    </>
    
  )
}

const sortedReply = [...reply].sort((a, b) => new Date(a.waktu) - new Date(b.waktu));

const Isiforum = () => {
  //force render ulang
  
  // sorting
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState('Terbaru');
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  const sortedReply = [...reply].sort((a, b) => {
    if (sortOrder === 'Terbaru') {
      return new Date(a.waktu) - new Date(b.waktu);
    } else {
      return new Date(b.waktu) - new Date(a.waktu);
    }
  });
  
  const buat = () =>{
    setIsActive(!isActive);
  }

  return(
    <>
    {
      console.log(`ini adalah isActive ${isActive}`)
    }
    <Diskusibaru buat={isActive} ></Diskusibaru>
    <section className=" h-dvh flex flex-col items-center p-5 gap-5" >
        <div className="flex flex-col gap-4 w-3/4 justify-start md:flex-row" id="buat_dis" >
            <div className="flex flex-col gap-2 basis-1/4" >
                <button className="bg-biru p-2 rounded-xl shadow-lg text-putih " id="buatdis" onClick={buat} >buat diskusi baru</button>
            </div>
            <div className="flex flex-row basis-3/4 gap-3  " >
                <div className="basis-1/2" >
                    <img src={kacapembesar} alt="" className="absolute translate-y-1 translate-x-4 md:translate-y-3  " />
                    <input type="text" placeholder="cari judul diskusi " className=" flex rounded-lg border border-abu_muda h-full pl-12 w-full transition-all duration-100 ease-in-out  " />
                </div>
                
                <div className="border border-abu_muda rounded-lg basis-1/2 text-abu_muda flex items-center pl-6 justify-between cursor-pointer" >
                    <span>pilih topik</span>
                    <img src={RightIcon} alt="" className="pr-6 " />
                </div>
            </div>
        </div>
        
        <div className="flex justify-start flex-col w-3/4  md:flex-row gap-3 h-full " >
            <div className="border border-abu_muda rounded-lg md:w-1/4 flex flex-col gap-2 p-2 h-fit" >
                <fieldset>
                    <legend className="text-lg font-medium">Filter Berdasarkan</legend>
                    <div className="mt-4 flex flex-col">
                        <div className="inline-flex items-center">
                            <input type="radio" 
                            id="diskusi-terbaru" 
                            className="" 
                            name="pilihan" 
                            value="Terbaru" 
                            onChange={handleSortChange}
                            checked={sortOrder === 'Terbaru'}/>
                            <span className="ml-2 text-abu_muda">Diskusi Terbaru</span>
                        </div>
                        <div className="inline-flex items-center mt-2">
                            <input type="radio" 
                            id="diskusi-terlama" 
                            className="" 
                            name="pilihan" 
                            value="Terlama" 
                            onChange={handleSortChange}
                            checked={sortOrder === 'Terlama'}/>
                            <span className="ml-2 text-abu_muda">Diskusi Terlama</span>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className=" basis-3/4 flex flex-col gap-3" >
                <div className="flex flex-row flex-wrap" >
                    <span className="text-abu_muda " >Diskusi Berdasarkan : </span>
                    <span id="filter" >{sortOrder}</span>
                </div>
        
                <PaginatedList items={sortedReply} ></PaginatedList>
                  {/* {
                    sortedReply.map((producs,index) =>{
                      return(
                      <div className="bg-background_forum flex flex-col gap-2 " >
                        <div key={index} className="p-4 flex flex-col gap-2 " >
                          <div className=" flex-row-reverse items-center gap-2 p-2 flex justify-end  " >
                              <div className="inline" >
                                  <p id="nama" className="font-semibold">{producs.nama} <img src="/konten/forum/bulet.svg" className="inline" alt=""/> <span id="satuan" className="text-abu" >{producs.waktu}</span> </p>
                              </div>
                              <img src={producs.photo} alt="gambar" className="rounded-full w-8 h-8" />
                          </div>

                          <div>
                              <p id="topik" className="font-semibold"  >{producs.subjek}</p>
                              <p id="komentar" className="text-abu" >
                                  {producs.balasan}
                                </p>
                          </div>

                          <div className="flex flex-row gap-2 flex-wrap  " >
                              <div id="suka" className="flex flex-row gap-2 px-2 justify-between" >
                                <div className="flex justify-center items-center h-7 w-7 " >
                                <img src={producs.disukai ? loved:suka} 
                                  id={`love${producs.id}`}
                                  alt=""
                                  className="cursor-pointer transition-all duration-200 ease-in-out object-contain"
                                  onClick={() => toggleLike(producs.id) }
                                  />
                                </div>
                                <p className="text-biru w-full " > <span id={`jml${producs.id}`} >{producs.like}</span>  Suka </p>
                              </div>
                              <div id="suka" className="flex flex-row gap-2 " >
                                  <div className="flex justify-center items-center w-5 h-7  " >
                                  <img src={balas} alt="" onClick={()=>tombolbalas(producs.id)} className="cursor-pointer object-contain " />
                                  </div>
                                  <p className="text-biru" ><span id="jumlah_balasan">{producs.balasanya}</span>Balasan</p>
                              </div>
                          </div>

                        </div>
                        <div  className="border-t-2 border-border_ijo hidden " id={`balasanorang${producs.id}`} >
                          <Balasannyaorang id ={producs.id}></Balasannyaorang>
                          <div className="  p-2 " >
                            <div className=" flex-row-reverse items-center gap-2 p-2 flex justify-end  " >
                                
                                <form action="submit" className="w-full p-2 border border-biru rounded-lg flex "  >
                                  <input type="text" className= " w-full   py-2  item-center pl-2 bg-background_forum rounded-lg  " placeholder='balas'  ></input>
                                  <button className="" >
                                    <img src={pesawatkertas} 
                                    alt="" 
                                    className="inline "
                                    />
                                  </button>
                                  
                                </form>
                                <img src={user.photouser} alt="gambar" className="rounded-full w-8 h-8" />
                                
                            </div>
                          </div>
                        </div>
                      </div>

                      )
                    } )
                  }  */}

                           
            </div>
        </div>
    </section>
    </>
  )
}

const PaginatedList = ({ items }) => {
  
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Sort the reply items based on the criteria you need, for example, by time

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Calculate items to display on the current page
  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Function to navigate to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to navigate to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const toggleLike = (id) => {
    const pencet = document.querySelector(`#love${id}`)
    let hasil = document.querySelector(`#jml${id}`)
    
    
    // ubah jumlah like
    reply.map((isi) =>{
      if(isi.id==id){
        isi.disukai= !isi.disukai
        if(isi.disukai===true){
          pencet.src=loved
          isi.like+=1
          //post
        }else{
          pencet.src=suka
          isi.like-=1
          //delete
        }
        hasil.innerHTML=`${isi.like}`
      }    
    })
    // reply.map((abc) =>{
    //   if(abc.id==id){
    //     console.log(abc.like)
    //   }    
    // })
    //jumlah like end
    // animasi
    if(pencet.classList.contains("scale-100")){
      pencet.classList.remove("scale-100")
    }
    pencet.classList.add("scale-0")
    setTimeout(function(){
    if(pencet.classList.contains("scale-0")){
        pencet.classList.remove("scale-0")
        pencet.classList.add("scale-100")
    }
    },200)
    // animasi end
  };
  
  const tombolbalas = (id) =>{
    const balasanorang = document.querySelector(`#balasanorang${id}`)
    balasanorang.classList.toggle("hidden")
  };
  return (
    <div className="h-full flex flex-col justify-start gap-3" >
      {/* Render current items */}
      {currentItems.map((producs, index) => (
        <div className="bg-background_forum flex flex-col gap-4 " key={index} >
                        <div className="p-4 flex flex-col gap-2 " >
                          <div className=" flex-row-reverse items-center gap-2 p-2 flex justify-end  " >
                              <div className="inline" >
                                  <p id="nama" className="font-semibold">{producs.nama} <img src="/konten/forum/bulet.svg" className="inline" alt=""/> <span id="satuan" className="text-abu" >{producs.waktu}</span> </p>
                              </div>
                              <img src={producs.photo} alt="gambar" className="rounded-full w-8 h-8" />
                          </div>

                          <div>
                              <p id="topik" className="font-semibold"  >{producs.subjek}</p>
                              <p id="komentar" className="text-abu" >
                                  {producs.balasan}
                                </p>
                          </div>

                          <div className="flex flex-row gap-2 flex-wrap  " >
                              <div id="suka" className="flex flex-row gap-2 px-2 justify-between" >
                                <div className="flex justify-center items-center h-7 w-7 " >
                                <img src={producs.disukai ? loved:suka} 
                                  id={`love${producs.id}`}
                                  alt=""
                                  className="cursor-pointer transition-all duration-200 ease-in-out object-contain"
                                  onClick={() => toggleLike(producs.id) }
                                  />
                                </div>
                                <p className="text-biru w-full " > <span id={`jml${producs.id}`} >{producs.like}</span>  Suka </p>
                              </div>
                              <div id="suka" className="flex flex-row gap-2 " >
                                  <div className="flex justify-center items-center w-5 h-7  " >
                                  <img src={balas} alt="" onClick={()=>tombolbalas(producs.id)} className="cursor-pointer object-contain " />
                                  </div>
                                  <p className="text-biru" ><span id="jumlah_balasan">{producs.balasanya}</span>Balasan</p>
                              </div>
                          </div>

                        </div>
                        <div  className="border-t-2 border-border_ijo hidden " id={`balasanorang${producs.id}`} >
                          <Balasannyaorang id ={producs.id}></Balasannyaorang>
                          <div className="  p-2 " >
                            <div className=" flex-row-reverse items-center gap-2 p-2 flex justify-end  " >
                                
                                <form action="submit" className="w-full p-2 border border-biru rounded-lg flex "  >
                                  <input type="text" className= " w-full   py-2  item-center pl-2 bg-background_forum rounded-lg  " placeholder='balas'  ></input>
                                  <button className="" >
                                    <img src={pesawatkertas} 
                                    alt="" 
                                    className="inline "
                                    />
                                  </button>
                                  
                                </form>
                                <img src={user.photouser} alt="gambar" className="rounded-full w-8 h-8" />
                                
                            </div>
                          </div>
                        </div>
                      </div>
      ))}

      {/* Navigation buttons */}
      <div className=" flex flex-row justify-center items-center w-full gap-2" >
                    <button className="flex justify-center items-center rounded-xl border" onClick={prevPage} disabled={currentPage === 1} >
                    <img src={kiripage} alt="" />
                    </button>
                    <button className="flex justify-center items-center rounded-xl border" onClick={nextPage} disabled={currentPage === totalPages} >
                    <img src={kananpage} alt="" />
                    </button>
      </div> 
    </div>
  );
};



export {Navigasi, Loginkiri, Loginkanan, Registerkiri, Isiforum, Daftarkiri}