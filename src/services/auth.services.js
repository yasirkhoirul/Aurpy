import axios from "axios";
import { jwtDecode } from "jwt-decode";
import gambarkosong from "../assets/koleksi/buku.svg";
export const getUser = (token) =>{
    let deskripsi = jwtDecode(token)
    return deskripsi
}

export const Regis = (data,callback) => {
    axios
    .post("https://aurpy-429202.et.r.appspot.com/tambahUser",data)
    .then((res)=>{
        callback(true,res.data.message)
        console.log(`res ${res.data.message}`)
    })
    .catch((err)=>{
        if (err.response && err.response.status === 400) {
            // Tangkap respons dengan status 400
            callback(false, err.response.data.message); // Memanggil callback dengan pesan error
            console.error('Error:', err.response.data.message);
        } else {
            callback(false, err); // Tangkap kesalahan umum
            console.error('Error:', err);
        }
    })
}

export const ForgotPas = (data,callback) => {
    axios
    .post("https://aurpy-429202.et.r.appspot.com/forgot-password",data)
    .then((res)=>{
        callback(true,res.data.message)
        console.log(`res ${res.data.message}`)
    })
    .catch((err)=>{
        if (err.response && err.response.status === 400) {
            // Tangkap respons dengan status 400
            callback(false, err.response.data.message); // Memanggil callback dengan pesan error
            console.error('Error:', err.response.data.message);
        } else {
            callback(false, err); // Tangkap kesalahan umum
            console.error('Error:', err);
        }
    })
}


export const CariKategori = (data, callback) => {
    axios.get("https://aurpy-429202.et.r.appspot.com/search", {
        params: {
            query: data
        }
    })
    .then((res) => {
        const categories = res.data.categories;
        callback(true, categories);
        console.log('Categories:', categories);

    })
    .catch((err) => {
        console.error('Error:', err);
        callback(false, err);
    });
};

export const ListKategori = (callback) => {
    axios
    .get("https://aurpy-429202.et.r.appspot.com/categories")
    .then((res)=>{
        callback(true,res.data.categories)
        console.log(`res ${res.data.categories}`)
    })
    .catch((err)=>{
        if (err.response && err.response.status === 400) {
            // Tangkap respons dengan status 400
            callback(false, err.response.data.message); // Memanggil callback dengan pesan error
            console.error('Error:', err.response.data.message);
        } else {
            callback(false, err); // Tangkap kesalahan umum
            console.error('Error:', err);
        }
    })
}

export const CariBuku = (data, callback) => {
    // Ensure data is a string
    const searchQuery = String(data);

    axios.get("https://aurpy-429202.et.r.appspot.com/books/search", {
        params: {
            namaBuku: searchQuery
        }
    })
    .then((res) => {
        const books = res.data;
        callback(true, books);
        console.log('books:', books);
    })
    .catch((err) => {
        console.error('Error:', err);
        callback(false, err);
    });
};

export const DetailBukus = async (data) => {
    try {
        const response = await axios.get(`https://aurpy-429202.et.r.appspot.com/books/id/${data}`);
        return response.data
    } catch (error) {
        alert(error);
    }
};

export const fetchGambar1 = async (data) => {
    try {
        const respon = await axios.get(`https://aurpy-429202.et.r.appspot.com/books/image/${data}`);
        if (respon.status === 200) {
            return `https://aurpy-429202.et.r.appspot.com/books/image/${data}`;
        }
    } catch {
        return gambarkosong;
    }
};
export const ambildatabuku = async () =>{
    try{
        const respon = await axios.get("https://aurpy-429202.et.r.appspot.com/books")
        return respon.data

    }catch(err){
        console.log(err)
    }
}

export const loginUser = async (data) => {
    const response = await axios.post('https://aurpy-429202.et.r.appspot.com/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };



  export const tambahBuku = async (formData) => {
    try {
      const response = await axios.post(`https://aurpy-429202.et.r.appspot.com/books/tambah`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error('No response received from server.');
      } else {
        throw new Error(error.message);
      }
    }
  };
  


const BASE_URL = 'https://aurpy-429202.et.r.appspot.com/categories';

export const tambahKategori = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/tambah`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const cariKategori = async (inputCari) => {
  try {
    const response = await axios.get(`${BASE_URL}/cari?name=${inputCari}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.categories;
  } catch (error) {
    handleError(error);
  }
};

export const deleteKategori = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/hapus/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateKategori = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/ubah/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response && error.response.data) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error(error.message);
  }
};

export const deleteBuku = async (id) => {
    try {
      const response = await axios.delete(`https://aurpy-429202.et.r.appspot.com/books/hapus/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };


  export const detailUser = async (id) =>{
    try{
        const respon = await axios.get(`https://aurpy-429202.et.r.appspot.com/users/${id}`)
        return respon.data
    }catch(err){
        handleError(err)
    }
  }
