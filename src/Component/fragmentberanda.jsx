import React, { useEffect, useState } from "react";
import emailIcon from "../assets/logoSocial/email.svg";
import fbIcon from "../assets/logoSocial/fb.svg";
import igIcon from "../assets/logoSocial/ig.svg";
import twitterIcon from "../assets/logoSocial/twiter.svg";
import DigitalLibrary from "../assets/Digital Library.svg";
import rafiki from "../assets/rafiki.svg";
import defaultBookCover from "../assets/koleksi/buku.svg";
import axios from "axios";
import { ambildatabuku, fetchGambar1 } from "../services/auth.services";

const SelamatDatang = () => {
  const [buku, setBuku] = useState([]);
  const [bukug, setBukug] = useState({});

  useEffect(() => {
    const ambildata = async () => {
      try {
        const respon = await ambildatabuku();
        const books = respon.books;
        setBuku(books);

        const bookImages = await Promise.all(
          books.map(async (book) => {
            const image = await fetchGambar1(book._id);
            return { [book._id]: image };
          })
        );

        const bookImagesMap = bookImages.reduce((acc, img) => {
          return { ...acc, ...img };
        }, {});
        setBukug(bookImagesMap);
      } catch (err) {
        console.log(err);
      }
    };

    ambildata();
  }, []);

  return (
    <>
      <section className="p-5 h-svh flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 basis-1/2 justify-center">
          <div className="basis-1/2 flex justify-center items-center text-center flex-col md:-mt-12">
            <p className="text-4xl font-bold md:text-6xl">Halo,Selamat Datang</p>
            <p className="text-2xl font-medium">
              Dengan <span className="text-ijo font-bold">A-Library</span> jelajahi buku dan temukan rekomendasi bacaan
            </p>
          </div>
          <div className="basis-1/2 flex-col justify-center min-w-10 flex-none items-center md:hidden flex">
            <img src={DigitalLibrary} alt="" className="min-h-16" />
          </div>
          <div className="flex justify-center flex-col gap-4">
            <div className="ml-12">
              <p className="font-medium text-xl">
                <span className="text-ijo font-medium">Contact us : <br /></span>
                Address: Jl. KH. Ahmad Dahlan Nomor 32, 55161, <br /> Email: A Library@gmail.com(?)
              </p>
            </div>
            <div className="flex flex-row items-center ml-12 gap-5">
              <img src={fbIcon} alt="Facebook" />
              <img src={twitterIcon} alt="Twitter" />
              <img src={emailIcon} alt="Email" />
              <img src={igIcon} alt="Instagram" />
            </div>
          </div>
        </div>
        <div className="basis-1/2 flex-col justify-center min-w-10 flex-none items-center hidden md:flex">
          <img src={DigitalLibrary} alt="" className="min-h-16" />
        </div>
      </section>
      <section className="h-lvh flex flex-col justify-center">
        <div className="p-5 text-center flex flex-col gap-5">
          <h1 className="font-bold text-4xl text-biru underline underline-offset-8">TENTANG</h1>
          <p className="text-xl">“Sistem informasi perpustakaan melalui web adalah sebuah sistem yang digunakan untuk mengelola perpustakan melalui interface berbasis web”</p>
        </div>
        <div className="flex md:flex-row justify-between p-5 gap-12 flex-col">
          <div className="basis-1/2 flex items-center justify-center">
            <img src={rafiki} alt="" />
          </div>
          <ul className="list-inside basis-1/2 text-xl flex justify-center flex-col">
            <li>Mengelola klasifikasi buku berdasarkan kategori</li>
            <li>Memudahkan dalam melakukan pencarian buku</li>
            <li>Mengakses koleksi buku secara fleksibel</li>
            <li>Meningkatkan minat literasi digital</li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col justify-center h-lvh gap-10 items-center">
        <div className="flex justify-center text-4xl font-bold items-center">BUKU POPULER</div>
        <div className="flex flex-row justify-center items-center gap-2">
          {buku.slice(0, 4).map((isi, index) => (
            <div className={index > 2 ? `hidden md:block justify-center` : `justify-center`} key={isi._id}>
              <div className="flex min-h-32 max-w-28 min-w-20 items-center bg-abu_muda justify-center">
                <img src={bukug[isi._id] || defaultBookCover} className="object-center object-contain" alt="Book Cover" />
              </div>
              <h2 className="text-center mt-5 font-semibold text-xl">{isi.namaBuku}</h2>
              <h2 className="text-center mt-5 font-semibold text-xl">{isi.pengarang}</h2>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full flex justify-center">
        <div className="w-10/12 bg-ijo p-20 mt-14">
          <p className="text-putih font-medium text-4xl">INGIN MENERIMA <br /> UPDATE BUKU TERBARU?</p>
          <div className="bg-putih rounded-md mt-5 flex flex-row justify-between items-center overflow-auto">
            <input type="email" placeholder="masukkan email disini" className="p-8 rounded-md pr-20 w-full" />
            <button className="bg-ijo mr-10 px-12 py-3 h-fit rounded-md text-putih font-medium text-2xl">kirim</button>
          </div>
        </div>
      </section>
      <section className="flex flex-row p-10">
        <div className="basis-2/5 flex flex-wrap items-center">
          <img src="/konten/Frame 23logo.png" alt="" className="flex-none" />
          A Library merupakan perpustakaan digital yang menyediakan akses mudah dan cepat ke koleksi buku-buku yang dimiliki oleh PP Aisiyah.
        </div>
        <div className="basis-1/5">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Forum</li>
            <li>Help</li>
          </ul>
        </div>
        <div className="basis-1/5">
          <h3>Customer Area</h3>
          <ul>
            <li>MyAccount</li>
            <li>Tracking List</li>
            <li>Privacy Policy</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="basis-1/5">
          <h3>Social media</h3>
          <ul>
            <li><img src={fbIcon} alt="Facebook" /></li>
            <li><img src={twitterIcon} alt="Twitter" /></li>
            <li><img src={emailIcon} alt="Email" /></li>
            <li><img src={igIcon} alt="Instagram" /></li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default SelamatDatang;
