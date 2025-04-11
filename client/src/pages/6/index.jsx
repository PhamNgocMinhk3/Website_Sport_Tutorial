import { useState, useEffect } from 'react';
import '../Admin-Manager-fixxed/Details.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
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
    const [ketqua1,setketqua1]=useState([]);
    const [ketqua2,setketqua2]=useState([]);


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
        formData.append('idmatrandau', id);
        formData.append('ketqua1', ketqua1);
        formData.append('ketqua2', ketqua2);

        try {
            const response = await axios.post('http://localhost:3000/updatedketquadau', formData,{
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
    <div className="container">
        {/* {JSON.stringify(giaidau)} */}
        <div className="row gutters ">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div className="card h-100 mx-auto d-flex justify-content-center align-items-center" style={{ marginTop: "22px"}}>
                <div style={{padding : "12px"}} className="card-body mt">
                        {giaidau.map((product,index) => (
                <div key={index} className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h4 className="mt-3 mb-2 text-danger">Trận Đấu</h4>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Người Thách Đấu</label>
                            <input type="name" className="form-control" id="Street" placeholder={product.NguoiThachDau}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Kết Quả</label>
                            <select name="" id="" className="form-control" 
                            onChange={(e) => setketqua1(e.target.value)}
                            >
                                <option value={0} >-------------------------Chọn Kết Quả---------------------</option>
                                    <option  value={1}>Thua</option>          
                                    <option  value={2}>Thắng</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Người Được Thách Đấu</label>
                            <input type="text" className="form-control" id="Street" placeholder={product.NguoiDuocThachDau}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Kết Quả</label>
                            <select name="" id="" className="form-control"
                            onChange={(e) => setketqua2(e.target.value)}
                            >
                                <option >-------------------------Chọn Kết Quả---------------------</option>
                                    <option  defaultValue={0}>Thua</option>          
                                    <option  defaultValue={1}>Thắng</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Mã Trận Đấu</label>
                            <input type="text" name="" id="" className="form-control" defaultValue={product.MaThachDau}/>
                            </div>
                        </div>
                        <div className="row gutters justify-content-center">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right " style={{ marginTop: "12px"}}>
                                        <button type="button" onClick={handleMain} className="btn btn-primary" style={{ marginRight: "5px"}}>Saved</button>
                                    </div>
                                </div>
                            </div>
                </div>
                                ))}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>

);
}

export default AdminFixxed;