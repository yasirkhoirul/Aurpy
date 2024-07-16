import React, { useEffect, useState } from "react";
import garis from "../assets/laporan/garis(2).svg";
import edit from "../assets/laporan/edit.svg";
import sampah from "../assets/laporan/sampah.svg";
import icondrop from "../assets/laporan/icondrop.svg";
import { ListKategori, tambahBuku } from "../services/auth.services";
import axios from "axios";

const Tambahbku = () => {
  const [formValues, setFormValues] = useState({
    namaBuku: '',
    pdfUrl: null,
    pengarang: '',
    penerbit: '',
    tahunTerbit: '',
    isbn: '',
    jmlhhlmn: '',
    abstrak: '',
    category: '',
    tempatTerbit: '',
    imageUrl: null // Added state for cover image
  });

  const [kategorivalues, setKategorivalues] = useState([]);

  useEffect(() => {
    // Mengambil daftar kategori saat komponen dimuat
    ListKategori((status, res) => {
      if (status) {
        console.log("Categories fetched successfully:", res);
        setKategorivalues(res); // Simpan data kategori ke state
      } else {
        console.log("Error fetching categories:", res);
      }
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormValues({
      ...formValues,
      [name]: files[0],
    });
  };

  const handleCategoryClick = (kategori) => {
    setFormValues({
      ...formValues,
      category: kategori,
    });
    drop();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }

    try {
      const responseData = await tambahBuku(formData);
      console.log('Response Data:', responseData);
      alert('Berhasil diunggah');
    } catch (error) {
      console.error('Error message:', error.message);
      alert('Gagal diunggah: ' + error.message);
    }
  };

  const drop = () => {
    let muter = document.querySelector('#icondrop');
    let item = document.querySelector('#dropbawah');
    item.classList.toggle('hidden');
    muter.classList.toggle('rotate-180');
  };

  return (
    <section className="h-dvh">
      <div className="flex flex-col justify-center items-center my-10">
        <span className="text-xl font-medium text-biru">Laporan</span>
        <span className="text-2xl font-semibold text-biru">Kategori buku</span>
        <div className="bg-ijo mt-3">
          <img src={garis} alt="" />
        </div>
      </div>

      <div className="justify-center flex">
        <form className="flex flex-col gap-4 w-3/4 text-xs md:text-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-medium">Judul Buku</label>
            <input
              required
              className="border rounded-lg border-abu px-2 py-2"
              type="text"
              name="namaBuku"
              placeholder="Masukkan judul"
              onChange={handleInputChange}
              value={formValues.namaBuku}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Masukkan file buku</label>
            <input
              required
              className="border rounded-lg border-abu px-2 py-2"
              type="file"
              name="pdfUrl"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Masukkan cover buku</label>
            <input
              className="border rounded-lg border-abu px-2 py-2"
              type="file"
              name="imageUrl"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Penulis</label>
            <input
              required
              className="border rounded-lg border-abu px-2 py-2"
              type="text"
              name="pengarang"
              placeholder="Masukkan penulis buku"
              onChange={handleInputChange}
              value={formValues.pengarang}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Penerbit</label>
            <input
              required
              className="border rounded-lg border-abu px-2 py-2"
              type="text"
              name="penerbit"
              placeholder="Masukkan penerbit buku"
              onChange={handleInputChange}
              value={formValues.penerbit}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Tempat Terbit</label>
            <input
              name="tempatTerbit"
              className="border rounded-lg border-abu px-2 py-2"
              placeholder="Masukkan tempat terbit buku"
              onChange={handleInputChange}
              value={formValues.tempatTerbit}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Tahun Terbit</label>
            <input
              required
              className="border rounded-lg border-abu px-2 py-2"
              type="text"
              name="tahunTerbit"
              placeholder="Masukkan tahun terbit buku"
              onChange={handleInputChange}
              value={formValues.tahunTerbit}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">ISBN</label>
            <input
              required
              className="border rounded-lg border-abu px-2 py-2"
              type="text"
              name="isbn"
              placeholder="Masukkan ISBN buku"
              onChange={handleInputChange}
              value={formValues.isbn}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Jumlah Halaman</label>
            <input
              required
              className="border rounded-lg border-abu px-2 py-2"
              type="text"
              name="jmlhhlmn"
              placeholder="Masukkan jumlah halaman buku"
              onChange={handleInputChange}
              value={formValues.jmlhhlmn}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Abstrak</label>
            <textarea
              name="abstrak"
              className="border border-abu rounded-lg py-4 px-2"
              onChange={handleInputChange}
              value={formValues.abstrak}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Pilih Kategori</label>
            <div className="w-full h-full border focus:border-ijo rounded-md relative cursor-pointer">
              <span className="p-2 flex justify-between items-center text-abu_muda" onClick={drop}>
                {formValues.category !== '' ? formValues.category : 'Pilih kategori'}
                <div>
                  <img src={icondrop} alt="" className="rotate-180 transition-all duration-200" id="icondrop" />
                </div>
              </span>
              <ul className="w-full left-0 opacity-100 mt-3 border-t-2 bg-putih top-8 max-h-28 overflow-y-auto hidden" id="dropbawah">
                {kategorivalues.map((rek, index) => (
                  <li key={index} className="hover:bg-abu_muda w-full p-2" onClick={() => handleCategoryClick(rek._id)}>
                    {rek.name}
                  </li>
                ))}
              </ul>
              <input type="hidden" value="" />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-ijo rounded-md text-putih px-4 py-2 mb-4" type="submit">
              Tambah
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Tambahbku;
