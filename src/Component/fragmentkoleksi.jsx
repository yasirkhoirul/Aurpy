import kacamata from "../assets/koleksi/Vector.svg";
import { useEffect, useState } from "react";
import { ambildatabuku, CariBuku, fetchGambar1 } from "../services/auth.services";
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";

const Collection = () => {
    const [dataValue, setDataValue] = useState([]);
    const [inputCari, setCari] = useState("");


    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Laporan Buku", 14, 22);
    
        const tableColumn = ["No.", "judul", "penulis","penerbit","isbn"];
        const tableRows = [];
    
        dataValue.forEach((data, index) => {
          const dataRow = [
            index + 1,
            data.namaBuku,
            data.pengarang,
            data.penerbit,
            data.isbn
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await ambildatabuku();
            console.log(response.books);
            const booksWithImages = await Promise.all(response.books.map(async book => {
                const imageSrc = await fetchGambar1(book._id);
                return { ...book, imageSrc };
            }));
            setDataValue(booksWithImages);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const carihandler = (event) => {
        console.log(event.target.value);
        setCari(event.target.value);
    }

    const cariSubmt = async (event) => {
        event.preventDefault();
        console.log(`res nya ${inputCari}`);
        if (inputCari === "") {
            alert("masukkan kata kunci");
            fetchData();
        } else {
            CariBuku(inputCari, (status, res) => {
                if (status) {
                    setDataValue(res);
                    console.log("renya", res);
                } else {
                    console.log(`res=${res}`);
                }
            });
        }
    }

    const navigate = useNavigate();
    const pindahdetail = (id) => {
        console.log(id);
        navigate(`/detail/${id}`);
    }

    return (
        <section className="h-lvh flex flex-col justify-start items-center mt-10">
            <div>
                <h1 className="font-semibold text-3xl">KOLEKSI</h1>
            </div>
            <img src="/konten/line.png" alt="" className="mt-2 ml-2 mb-2" />
            <p className="mt-2 text-center">“Membaca adalah napas hidup dan jembatan emas ke masa depan”</p>
            <div className="w-3/4">
                <form className="md:flex-row flex flex-col gap-4 mt-10 m-10 ">
                    <div className="basis-1/2 text-xl font-medium flex flex-col gap-4">
                        <h2>Cari buku</h2>
                        <div>
                            <img src={kacamata} alt="" className="absolute translate-y-3 translate-x-4" />
                            <input type="text"
                                className="pl-12 rounded-xl py-2.5 font-light border border-abu_muda w-full text-sm"
                                placeholder="ketikkan judul pencarian"
                                value={inputCari}
                                onChange={carihandler}
                            />
                        </div>
                    </div>
                  
                    <div className=" text-xl font-medium flex flex-col gap-4">
                        <h2 className=" opacity-0 " > a </h2>
                        <div 
                            onClick={cariSubmt}
                            className=" bg-ijo text-white p-6 rounded-xl py-2 text-sm flex justify-between cursor-pointer items-center">
                                <p className=" w-full text-center " >Cari</p>
                        </div>
                            
                    </div>
                    <div className=" text-xl font-medium flex flex-col gap-4">
                        <h2 className=" opacity-0 " > a </h2>
                        <div 
                            onClick={downloadPDF}
                            className=" bg-biru text-white p-6 rounded-xl py-2 text-sm flex justify-between cursor-pointer items-center">
                                <p className=" w-full text-center " >Cetak Laporan</p>
                        </div>
                            
                    </div>
                    
                </form>

                <div className="flex flex-col mt-5">
                    {
                        dataValue.map((data, index) => {
                            return (
                                <div key={index} className="md:flex flex-row gap-5">
                                    <div className="flex flex-row gap-4 md:gap-0 md:w-1/4 p-2 justify-start md:justify-center">
                                        <div className="flex min-h-32 max-w-28 min-w-20 items-center">
                                            <img className="object-center object-contain" alt="" src={data.imageSrc} />
                                        </div>
                                        <div className="flex flex-col justify-between md:hidden w-full">
                                            <h1
                                                className="basis-1/2 p-2 text-biru cursor-pointer"
                                                onClick={() => pindahdetail(data._id)}
                                            >
                                                {data.namaBuku}
                                            </h1>
                                            <div className="basis-1/2 bg-abu_muda_banget flex flex-row justify-between p-2 gap-2 flex-wrap rounded-lg">
                                                <div className="flex flex-col">
                                                    <span className="text-abu">isbn</span>
                                                    <p className="text-biru" id="isbn">{data.isbn}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-abu">penulis</span>
                                                    <p className="text-biru">{data.pengarang}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-abu">penerbit</span>
                                                    <p className="text-biru">{data.penerbit}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full justify-between">
                                        <h1
                                            className="basis-1/2 p-2 text-biru hidden md:block cursor-pointer"
                                            onClick={() => pindahdetail(data._id)}
                                        >
                                            {data.namaBuku}
                                        </h1>
                                        <div className="basis-1/2 bg-abu_muda_banget hidden flex-row justify-between p-2 gap-2 flex-wrap rounded-lg md:flex">
                                            <div className="flex flex-col">
                                                <span className="text-abu">isbn</span>
                                                <p className="text-biru" id="isbn">{data.isbn}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-abu">penulis</span>
                                                <p className="text-biru">{data.pengarang}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-abu">penerbit</span>
                                                <p className="text-biru">{data.penerbit}</p>
                                            </div>
                                        </div>
                                        <div className="basis-4/6 p-2 flex flex-col justify-start">
                                            <p className="text-merah">ABSTRAK</p>
                                            <p>{data.abstrak}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Collection;
