import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
export const AuthGuard = ({children}) =>{
    const token = Cookies.get('token');
    const [user,setUser] = useState(null);

    if(token){
        return children
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        // call api get user info
        axios.get("http://localhost:3000/user").then(response => {
            setUser(response.data.result.recordset);
        }).catch(error => {
            if(error.code === 401){
                window.location('/home')
            }
        });
        // if token is valid => setUser
        // token exipired => setUser = nulll
    },[token])
    useEffect(() => {
        axios.get("http://localhost:3000/user").then(response => {
            setLoaisan(response.data.result.recordset);
        }).catch(error => {
            if(error.code === 401){
                window.location('/home')
            }
        });
    }, []);
    if(user) return children
    return <div>
        Token expired
    </div>
}