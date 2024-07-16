import { useEffect, useState } from "react";
import { Navigasi } from "../Component"
import DetailProfileFrag from "../Component/DetailProfile"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookies';
const Profile = () =>{
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    useEffect (()=>{
        const authToken = Cookies.getItem('auth_token');

        if (!authToken) {
            // Jika tidak ada auth_token, arahkan ke halaman login
            navigate('/home');
        } else {
            
            // Dekode token dan periksa atribut yang diinginkan (ini contoh sederhana tanpa verifikasi JWT yang sebenarnya)
            const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
            setUser(decodedToken);
            if (!decodedToken || !decodedToken.email || !decodedToken.nama || !decodedToken.role) {
                // Jika token tidak valid atau atribut tidak ada, arahkan ke halaman login
                alert('login terlebih dahulu');
                navigate('/home');
            }
        }
    },[])
    return(
        <>
            <DetailProfileFrag>{user}</DetailProfileFrag>
        </>
    )

}
export default Profile