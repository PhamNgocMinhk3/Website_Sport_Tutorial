import '../Admin-Manager-fixxed/Details.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
    function AdminFixxed() {
        const dinhDangThoiGian = "HH:mm:ss";
    const idnd = parseInt(window.location.pathname.split('/')[2]);
    const [giaidau,setgiaidau]=useState([]);
    const [user1,setuser1]=useState([]);
    const [user2,setuser2]=useState([]);
    const [time,settime]=useState([]);
    const [stt,setstt]=useState([]);
    const [idsan,setidsan]=useState([]);
    const [bomondata,setbomondata]=useState([]);
    const [usertt,setusertt]=useState([]);
    const [win1,setwin1]=useState([]);
    const [win2,setwin2]=useState([]);

    const [gio,setgio]=useState('');


    useEffect(() => {
        axios.get("http://localhost:3000/gettrandautt").then(response => {
            setgiaidau(response.data?.result?.recordset || []);
            setgio(response.data?.result?.recordset[0].ThoiGian || []);
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
        formData.append('idnd', idnd);
        formData.append('id1', user1);
        formData.append('id2', user2);
        formData.append('time', time);
        formData.append('stt', stt);
        formData.append('idsan', idsan);
        try {
            const response = await axios.post('http://localhost:3000/updatetrandau', formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                },});
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }};
    useEffect(() => {
        axios.get("http://localhost:3000/san").then(response => {
            setbomondata(response.data?.result?.recordset || [])
        }).catch(error => {
            console.log(error);
            if (error.code === 401){
                window.location('/home')
            }
        });
        
    },[]); 
    const handle = async (e) => {
        const a = e.target.getAttribute('value');
        const formData = new FormData();
        formData.append('win1', win1);
        formData.append('win2', win2);
        formData.append('Matd', a);
        try {
            const response = await axios.post('http://localhost:3000/updatedtrandau', formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                },});
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }};
    useEffect(() => {
        axios.get("http://localhost:3000/usertt").then(response => {
            setusertt(response.data?.result?.recordset || [])
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
                <th scope="col">Mã Trận Đấu</th>
                <th scope="col">player 1</th>
                <th scope="col">player 2</th>
                <th scope="col">Số Thứ Tự</th>
                <th scope="col">Thời Gian</th>
                <th scope="col">Kết Quả 1</th>
                <th scope="col">Kết Quả 2</th>
                <th scope="col">Save</th>
            </tr>
            </thead>
            <tbody>
            {giaidau.map((product,index) => {
                const formattedTime = moment.utc(gio).utcOffset("+00:00").format(dinhDangThoiGian)
                return (
                    <tr key={index}  className="align-middle">
                        <td>{product.MaTD}</td>
                        <td>
                        <select
                                    className="form-control"
                                    style={{width:"145px"}}
                                    id="tinhTrang"
                                    value={product.MaPlayer1}
                                    >
                                        <option value="0">---- Vui lòng chọn user ----</option>
                                    {usertt.map((cumsan, index)  => (
                                    <option key={index} value={cumsan.MA_Taikhoang} >
                                    {cumsan.name_ten}
                                    </option>
                                ))}
                                    </select>
                        </td>
                        <td>
                        <select
                                    className="form-control"
                                    style={{width:"145px"}}
                                    id="tinhTrang"
                                    value={product.MaPlayer2}
                                    >
                                        <option value="0">---- Vui lòng chọn user ----</option>
                                    {usertt.map((cumsan, index)  => (
                                    <option key={index} value={cumsan.MA_Taikhoang} >
                                    {cumsan.name_ten}
                                    </option>
                                ))}
                                    </select>
                            </td>
                        <td>{product.SoThuTu}</td>
                        <td>{formattedTime}</td>
                        <td> <select
                                    className="form-control"
                                    style={{width:"145px"}}
                                    id="tinhTrang"
                                    onChange={(e) => setwin1(e.target.value)}
                                    >
                                        <option value="0">---- Vui lòng chọn Kết Quả ----</option>
                                        <option key={index} value={1} >
                                        Thắng
                                        </option>
                                        <option key={index} value={2} >
                                        Thua
                                        </option>
                                    </select></td>
                        <td> <select
                                    className="form-control"
                                    style={{width:"145px"}}
                                    id="tinhTrang"
                                    onChange={(e) => setwin2(e.target.value)}
                                    >
                                        <option value="0">---- Vui lòng chọn Kết Quả ----</option>
                                        <option key={index} value={1} >
                                        Thắng
                                        </option>
                                        <option key={index} value={2} >
                                        Thua
                                        </option>
                                    </select>
                                    </td>
                        <td>
                                <button type="button" className="btn btn-primary" onClick={handle} value={product.MaTD}>save</button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
                                        {/* {JSON.stringify(giaidau)} */}
        <div className="row gutters ">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div className="card h-100 mx-auto d-flex justify-content-center align-items-center" style={{ marginTop: "22px"}}>
                <div style={{padding : "12px"}} className="card-body mt">
                <div className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h4 className="mt-3 mb-2 text-danger">Hiển Thị Giải Đấu</h4>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Player 1</label>
                            <select
                                    className="form-control"
                                    style={{width:"145px"}}
                                    id="tinhTrang"
                                    onChange={(e) => setuser1(e.target.value)}
                                    >
                                        <option value="0">---- Vui lòng chọn user ----</option>
                                    {usertt.map((cumsan, index)  => (
                                    <option key={index} value={cumsan.MA_Taikhoang} >
                                    {cumsan.name_ten}
                                    </option>
                                ))}
                                    </select>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Player 2</label>
                            <select
                                    className="form-control"
                                    style={{width:"145px"}}
                                    id="tinhTrang"
                                    onChange={(e) => setuser2(e.target.value)}
                                    >
                                        <option value="0">---- Vui lòng chọn user ----</option>
                                    {usertt.map((cumsan, index)  => (
                                    <option key={index} value={cumsan.MA_Taikhoang} >
                                    {cumsan.name_ten}
                                    </option>
                                ))}
                                    </select>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Thời Gian</label>
                            <input type="time" className="form-control" id="Street" placeholder="...."
                            onChange={(e) => settime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Số Thứ Tự</label>
                            <input type="name" className="form-control" id="Street" placeholder="...."
                            onChange={(e) => setstt(e.target.value)}
                                />
                            </div>
                        </div>
                        <div  className="form-group">
                                    <label htmlFor="tinhTrang">Sân</label>
                                    <select
                                    className="form-control"
                                    style={{width:"145px"}}
                                    id="tinhTrang"
                                    onChange={(e) => setidsan(e.target.value)}
                                    >
                                        <option value="0">---- Vui lòng chọn môn ----</option>
                                    {bomondata.map((cumsan, index)  => (
                                    <option key={index} value={cumsan.MaSan} >
                                    {cumsan.TenSan}
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