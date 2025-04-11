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
    const data = { 
        id:iduser // hoặc viết tắt là iduser,
    };
    const [giaidau,setgiaidau]=useState([]);
    const [tengd,settengd]=useState([]);
    const [thele,setthele]=useState([]);
    const [soluong,setsoluong]=useState([]);
    const [phanthuong,setphanthuong]=useState([]);
    const [bomon,setbomon]=useState([]);
    const [bomondata,setbomondata]=useState([]);
    useEffect(() => {
        axios.post("http://localhost:3000/getgiaidau", data).then(response => {
            setgiaidau(response.data?.result?.recordset || []);
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
        formData.append('tengd', tengd);
        formData.append('thele', thele);
        formData.append('soluong', soluong);
        formData.append('phanthuong', phanthuong);
        formData.append('bomon', bomon);
        try {
            const response = await axios.post('http://localhost:3000/creategiaidau', formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                },});
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }};
    useEffect(() => {
        axios.get("http://localhost:3000/mon").then(response => {
            setbomondata(response.data?.result?.recordset || [])
        }).catch(error => {
            console.log(error);
            if (error.code === 401){
                window.location('/home')
            }
        });
    },[]);
return (
    <div class="container d-flex justify-content-center align-items-center">
    <div class="row">
    <div class="col-sm-6"></div>
    <div className="container">
        <tbody>
    <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Mã Giải Đấu</th>
                <th scope="col">Tên Giải Đấu</th>
                <th scope="col">Bộ Môn</th>
                <th scope="col">Add Thông Tin</th>
                <th scope="col">Duyệt Tham Gia </th>
                <th scope="col"> Hiển Thị Giải Đấu </th>
            </tr>
            </thead>
            <tbody>
            {giaidau.map((product,index) => (
                                    <tr key={index}  className="align-middle">
                                        <td>
                                        {product.MaGD}
                                        </td>
                                        <td>
                                            {product.Ten}
                                        </td>
                                        <td>
                                            {product.BoMon}
                                        </td>
                                        <td>
                                            <a href={`taogiai/${product.MaGD}`}>
                                            <button type="button" className="btn btn-primary" >add</button>
                                            </a>
                                        </td>
                                        <td>
                                            <a href={`duyetgiaidau/${product.MaGD}`}>
                                            <button type="button" className="btn btn-primary" >Click !!</button>
                                            </a>
                                        </td>
                                        <td>
                                            <a href={`Editshowgiaidau/${product.MaNoiDung}`}>
                                            <button type="button" className="btn btn-primary" >Click !!</button>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
            </tbody>
        </table>
        {/* {JSON.stringify(giaidau)} */}
        <div className="row gutters ">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div className="card h-100 mx-auto d-flex justify-content-center align-items-center" style={{ marginTop: "22px"}}>
                <div style={{padding : "12px"}} className="card-body mt">
                <div className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h4 className="mt-3 mb-2 text-danger">Tạo Giải Đấu</h4>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Tên Giải Đấu</label>
                            <input type="name" className="form-control" id="Street" placeholder="..."
                            onChange={(e) => settengd(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Thể Lệ</label>
                            <input type="name" className="form-control" id="Street" placeholder="...."
                            onChange={(e) => setthele(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Số Lượng</label>
                            <input type="name" className="form-control" id="Street" placeholder="...."
                            onChange={(e) => setsoluong(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Phần Thưởng</label>
                            <input type="name" className="form-control" id="Street" placeholder="...."
                            onChange={(e) => setphanthuong(e.target.value)}
                                />
                            </div>
                        </div>
                        <div  className="form-group">
                                    <label htmlFor="tinhTrang">Bộ Môn</label>
                                    <select
                                    className="form-control"
                                    style={{width:"145px"}}
                                    id="tinhTrang"
                                    onChange={(e) => setbomon(e.target.value)}
                                    >
                                        <option value="0">---- Vui lòng chọn môn ----</option>
                                    {bomondata.map((cumsan, index)  => (
                                    <option key={index} value={cumsan.Mon} >
                                    {cumsan.Mon}
                                    </option>
                                ))}
                                    </select>
                                </div>
                </div>
                <div className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right " style={{ marginTop: "12px"}}>
                                <button type="button" onClick={handleMain} className="btn btn-primary" style={{ marginRight: "5px"}}>add</button>
                            </div>
                        </div>
                    </div>
    </div>
    </div>
    </div>
    </div>
    </tbody>
    </div>
    </div>
    </div>

);
}

export default AdminFixxed;