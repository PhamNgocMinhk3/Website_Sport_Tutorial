import { useState, useEffect } from 'react';
import '../Admin-Manager-fixxed/Details.module.scss';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
const token = Cookies.get('token');
    if (token){
        var tokenValue = Cookies.get('token');
        var decoded = jwt_decode(tokenValue) || 1;
    }
    function AdminFixxed() {
    const iduser=decoded.idUser;
    const nameuser=decoded.nameUser;
    const data = { 
        id:iduser ,
        
    };
    const [sdt,setsdt]=useState([]);
    const [sdtn,setsdtn]=useState('');

    useEffect(() => {
        axios.post("http://localhost:3000/getsdt", data).then(response => {
            setsdt(response.data?.result?.recordset || []);
            setsdtn(response.data?.result?.recordset[0].sdt || []);
        }).catch(error => {
            console.log(error);
            if (error.code === 401){
                window.location('/home')
            }
        });
    },[]);
    const handleMain = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', iduser);
        formData.append('name', nameuser);
        formData.append('sdtn', sdtn);
        try {
            const response = await axios.post('http://localhost:3000/createdoi', formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                },});
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }};
return (
    <div className="container d-flex justify-content-center align-items-center">
    <div className="row">
    <div className="col-sm-6"></div>
    <div className="container">
        
    <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Mã Đội </th>
                <th scope="col">Mã Trưởng Nhóm </th>
                <th scope="col">Tên Trưởng Nhóm </th>
                <th scope="col">Số Điện Thoại Trưởng Nhóm</th>
                <th scope="col">Tạo Đội </th>
            </tr>
            </thead>
            <tbody>
                                    <tr  className="align-middle">
                                        <td>
                                        {iduser}
                                        </td>
                                        <td>
                                        {iduser}
                                        </td>
                                        <td>
                                        {nameuser}
                                        </td>
                                        {sdt.map((product,index) => (
                                        <td key={index} >
                                            0{product.sdt}
                                        </td>
                                        ))}
                                        <td>
                                            <button type="button" className="btn btn-primary" onClick={handleMain}>Tạo Đội</button>
                                        </td>
                                    </tr>
            </tbody>
        </table>
        {/* {JSON.stringify(sdtn)} */}
    </div>
    </div>
    </div>

);
}

export default AdminFixxed;