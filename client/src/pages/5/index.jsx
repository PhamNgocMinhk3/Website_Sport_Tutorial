import { useState, useEffect } from 'react';
import '../Admin-Manager-fixxed/Details.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import { useParams } from 'react-router-dom';

const token = Cookies.get('token');
if (token){
    var tokenValue = Cookies.get('token');
    var decoded = jwt_decode(tokenValue) || 1;
}

function AdminFixxed() {
    const { id } = useParams() || 1;
    const iduser=decoded.idUser;
    const data = { 
        id:iduser // hoặc viết tắt là iduser,
    };
    const [giaidau,setgiaidau]=useState([]);
    const [ngaythidau,setngaythidau]=useState([]);
    const [ngaythachdau,setngaythachdau]=useState([]);
    const [diadiem,setdiadiem]=useState([]);
    const [trongtai,settrongtai]=useState([]);
    const [tt,settt]=useState([]);

    useEffect(() => {
        axios.post("http://localhost:3000/getthachdau", data).then(response => {
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
        formData.append('idnguoithachdau', iduser);
        formData.append('idnguoiduocthachdau', id);
        formData.append('ngaythidau', ngaythidau);
        formData.append('ngaythachdau', ngaythachdau);
        formData.append('diadiem', diadiem);
        formData.append('trongtai', tt);
        try {
            const response = await axios.post('http://localhost:3000/createduel', formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                },});
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }};
    useEffect(() => {
        axios.get("http://localhost:3000/trongtai").then(response => {
            settrongtai(response.data?.result?.recordset || [])
        }).catch(error => {
            console.log(error);
            if (error.code === 401){
                window.location('/home')
            }
        });
    },[]);
return (
    <div className="container d-flex justify-content-center align-items-center">
    <div className="row">
    <div className="col-sm-6"></div>
    <div className="container">
        <tbody>
    <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Mã Thách Đấu</th>
                <th scope="col">Mã Trọng Tài</th>
                <th scope="col">Mã Người Thách Đấu</th>
                <th scope="col">Mã Người Được Thách Đấu</th>
                <th scope="col">Ngày Thi Đấu</th>
                <th scope="col">Ngày Thách Đấu</th>
                <th scope="col">Địa Điểm</th>
                <th scope="col">Add Kết Quả</th>
            </tr>
            </thead>
            {giaidau.map((product,index) => (
                                    <tr key={index}  className="align-middle">
                                        <td>
                                        {product.MaThachDau}
                                        </td>
                                        <td>
                                            {product.NguoiGiamSat}
                                        </td>
                                        <td>
                                            {product.NguoiThachDau}
                                        </td>
                                        <td>
                                            {product.NguoiDuocThachDau}
                                        </td>
                                        <td>
                                            {    moment(product.NgayThiDau).format('DD/MM/YYYY')
                                            }
                                        </td>
                                        <td>
                                            {moment(product.NgayThachDau).format('DD/MM/YYYY')}
                                        </td>
                                        <td>
                                            {product.DiaDiem}
                                        </td>
                                        <td>
                                            <a href={`ketqua/${product.MaThachDau}`}>
                                            <button type="button" className="btn btn-primary" >add</button>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
        </table>
        {/* {JSON.stringify(giaidau)} */}
        <div className="row gutters ">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div className="card h-100 mx-auto d-flex justify-content-center align-items-center" style={{ marginTop: "22px"}}>
                <div style={{padding : "12px"}} className="card-body mt">
                <div className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h4 className="mt-3 mb-2 text-danger">Thách Đấu</h4>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Người Giám Sát - Trọng Tài</label>
                            <select name="" id="" className="form-control"
                            onChange={(e) => settt(e.target.value)}
                            >
                                <option value="0">-------------------------Chọn Người Giám Sát Trận Đấu---------------------</option>
                                {trongtai.map((product,index) => (
                                <option key={index} value={product.MA_Taikhoang}>{product.name_ten}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Người Thách Đấu</label>
                            <input type="name" className="form-control" id="Street" placeholder={`${iduser}`}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Người Được Thách Đấu</label>
                            <input type="name" className="form-control" id="Street" placeholder={`${id}`}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Ngày Thi Đấu</label>
                            <input type="date" className="form-control" id="Street" placeholder="...."
                            onChange={(e) => setngaythidau(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Ngày Thách Đấu</label>
                            <input type="date" className="form-control" id="Street" placeholder="...."
                            onChange={(e) => setngaythachdau(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Địa Điểm</label>
                            <input type="name" className="form-control" id="Street" placeholder="...."
                            onChange={(e) => setdiadiem(e.target.value)}
                                />
                            </div>
                        </div>
                </div>
                <div className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right " style={{ marginTop: "12px"}}>
                                <button type="button" onClick={handleMain} className="btn btn-primary" style={{ marginRight: "5px"}}>Tạo</button>
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