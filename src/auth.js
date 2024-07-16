// auth.js
import Cookies from 'js-cookie';

export const isAuthenticated = () => {
    const token = Cookies.get('token'); // Mengambil token dari cookies
    return !!token; // Mengembalikan true jika token ada, false jika tidak
};
