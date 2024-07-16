import { useEffect, useState } from "react";
import edit from "../assets/laporan/edit.svg";
import sampah from "../assets/laporan/sampah.svg";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Silang from '../assets/forum/silang.svg';
import { tambahKategori, cariKategori, fetchCategories, deleteKategori, updateKategori } from "../services/auth.services";

const Tambahkategori = () => {
  const jamskrng = () => {
    const sekarang = new Date();
    const jam = sekarang.getHours();
    const menit = sekarang.getMinutes();
    const waktu = `${jam}:${menit}`;
    return waktu;
  }

  const [inputCari, setCari] = useState("");
  const [dataValue, setDataValue] = useState([]);
  const [newData, setNewData] = useState({ kategori: "", tanggal: "", waktu: "" });
  const [editData, setEditData] = useState({ id: "", kategori: "", waktu: "" });
  const [idEdit, setIdEdit] = useState("");

  const handlePost = (event) => {
    const { name, value } = event.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  }

  const submithundle = async (event) => {
    event.preventDefault();
    const data = { name: newData.kategori };
    try {
      const response = await tambahKategori(data);
      alert(`${response.message}`);
      fetchData();
    } catch (error) {
      alert(`Gagal menambah kategori: ${error.message}`);
    }
  }

  const handleCari = (event) => {
    setCari(event.target.value);
  }

  const handleClickCari = async (event) => {
    event.preventDefault();
    try {
      const result = await cariKategori(inputCari);
      setDataValue(result);
    } catch (error) {
      alert(`Gagal mencari kategori: ${error.message}`);
    }
  }

  const fetchData = async () => {
    try {
      const categories = await fetchCategories();
      setDataValue(categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteKategori(id);
      alert(`Berhasil dihapus: ${response.message}`);
      fetchData();
    } catch (error) {
      alert(`Gagal menghapus kategori: ${error.message}`);
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Laporan Kategori Buku", 14, 22);

    const tableColumn = ["No.", "Kategori", "Tanggal"];
    const tableRows = [];

    dataValue.forEach((data, index) => {
      const dataRow = [
        index + 1,
        data.name,
        data.createdAt,
      ];
      tableRows.push(dataRow);
    });

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('table.pdf');
  }

  const handleEdit = (event) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  }

  const handlePutEdit = async (event) => {
    event.preventDefault();
    if (editData.id === "") {
      alert("ID tidak boleh kosong");
    } else if (editData.kategori === "" || editData.waktu === "") {
      alert("Data tidak boleh ada yang kosong");
    } else {
      const data = { name: editData.kategori };
      try {
        const response = await updateKategori(editData.id, data);
        alert(`Data berhasil diperbarui: ${response.message}`);
        fetchData();
        hilang();
      } catch (error) {
        alert(`Gagal memperbarui data: ${error.message}`);
      }
    }
  }

  const Edit = (id) => {
    setIdEdit(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let item = document.querySelector('#edit');
    if (item.classList.contains("hidden")) {
      item.classList.toggle("hidden");
      setTimeout(() => {
        item.style.opacity = "1";
      }, 200);
    } else {
      item.style.opacity = "0";
      setTimeout(() => {
        item.classList.toggle("hidden");
      }, 200);
    }
  }

  const hilang = () => {
    let item = document.querySelector('#edit');
    item.style.opacity = "0";
    setTimeout(() => {
      item.classList.add("hidden");
    }, 200);
  }

  return (
    <section className="flex flex-col items-center">
      <div className="h-full bg-slate-400 p-2 absolute w-full z-20 bg-opacity-25 hidden transition-all duration-200 ease-in-out" id="edit">
        <div className="flex justify-center items-center h-full">
          <div className="bg-putih shadow-xl p-2 rounded-lg w-3/4 h-fit z-20">
            <form className="flex w-full h-full justify-center flex-col gap-4">
              <div className="flex flex-row justify-between px-2">
                <p className="font-medium">Nama kategori baru</p>
                <img src={Silang} alt="" onClick={hilang} className="cursor-pointer" />
              </div>
              <input 
                type="text"
                name="kategori"
                className="border focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md p-2 w-4/6"
                placeholder="Masukkan kategori baru"
                onChange={handleEdit}
                value={editData.kategori}
              />
              <input 
                type="hidden" 
                name="waktu" 
                value={editData.waktu = jamskrng()}
              />
              <input 
                type="hidden"
                name="id"
                id="id"
                value={editData.id = idEdit}
              />
              <button className="flex items-start bg-ijo w-fit rounded-xl text-putih px-6 py-2" onClick={handlePutEdit}>Ubah</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center my-10">
        <span className="text-xl font-medium text-biru">Laporan</span>
        <span className="text-2xl font-semibold text-biru">Kategori buku</span>
        <div className="bg-ijo mt-3">
          <img src="/src/laporan/garis(2).svg" alt=""/>
        </div>
      </div>
      
      <div className="flex flex-col w-3/5 gap-2">
        <form method="post" className="flex flex-col w-3/4 gap-4">
          <p className="font-medium">Nama kategori</p>
          <div className="flex flex-row gap-2">
            <input 
              name="kategori"
              type="text"
              className="border focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md p-2 w-4/6"
              placeholder="Masukkan kategori baru"
              onChange={handlePost}
              value={newData.kategori}
            />
            <input 
              name="waktu"
              type="hidden"
              className="border focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-2/5"
              value={newData.waktu = jamskrng()}
            />
          </div>
          <button className="flex items-start bg-ijo w-fit rounded-xl text-putih px-6 py-2" type="submit" onClick={submithundle}>Tambah</button>
        </form>
        <div className="">
          <form action="" className="flex flex-row gap-4">
            <div className="basis-2/3 flex items-center">
              <div className="absolute ml-2">
                <img src="/konten/Vector.png" alt=""/>
              </div>
              <input 
                type="text"
                placeholder="Cari"
                className="w-full h-full border rounded-md px-9"
                value={inputCari}
                onChange={handleCari}
              />
            </div>
            <button className="basis-1/3 bg-ijo rounded-xl text-putih px-6 py-2" onClick={handleClickCari}>Cari</button>
          </form>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table-auto mt-5 text-sm w-full">
            <thead className="bg-abu_muda text-biru">
              <tr>
                <th className="py-4 md:px-6">No.</th>
                <th className="py-4 md:px-6">Kategori</th>
                <th className="py-4 md:px-6">Tanggal</th>
                <th className="py-4 md:px-6">Hapus</th>
                <th className="py-4 md:px-6">Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                dataValue.map((data, index) => (
                  <tr key={index} className="border-b-2 text-center">
                    <td className="py-4 md:px-6">{index + 1}</td>
                    <td className="py-4 md:px-6">{data.name}</td>
                    <td className="py-4 md:px-6">{data.createdAt}</td>
                    <td className="py-4 md:px-6">
                      <div className="flex justify-center items-center">
                        <img src={sampah} alt="" className="cursor-pointer" onClick={() => handleDelete(data._id)} />
                      </div>
                    </td>
                    <td className="py-4 md:px-6">
                      <div className="flex justify-center items-center">
                        <img src={edit} alt="" className="cursor-pointer" onClick={() => Edit(data._id)} />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4">
          <button className="rounded-lg bg-biru p-2 text-putih mb-2" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>
      </div>
    </section>
  );
}

export default Tambahkategori;
