import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./admin.moudule.scss";
// import {FaUserAlt,FaLock} from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from "axios";
import jwt_decode from "jwt-decode";
const cx = classNames.bind(styles);
function Admin(){
    const token = Cookies.get('token');
    if (token===undefined)  {
        window.location.href = "http://localhost:3001/login";
    }
    if (token){ 
        var tokenValue = Cookies.get('token');
        var decoded = jwt_decode(tokenValue);
    }
    const [loaisan, setLoaisan] = useState([]); 
    const [uploaisan, setUpLoaisan] = useState([]);
    const [uploaisangia, setUpLoaisangia] = useState([]);
    const [uploaisanbomon, setUpLoaisanbomon] = useState([]);
    // -------------------------
    const [cumsan, setCumsan] = useState([]);
    const [upcumsanidnql, setUpcumsanidngql] = useState(decoded.idUser);
    const [upcumsanten, setUpcumsanten] = useState([]);
    const [upcumsantinhtrang, setUpcumsantinhtrang] = useState([]);
    // ----------------------
    const [uploadsanmaloaisan, setUploadsanmaloaisan] = useState([]);
    const [uploadsanmacumsan, setUploadsanmacumsan] = useState([]);
    const [uploadsantrangthai, setUploadsantrangthai] = useState([]);
    const [uploadsanthongbao, setUploadsanthongbao] = useState([]);
    const [uploadsanlogo, setUploadsanlogo] = useState('null');
    const [uploadsantinhtrang, setUploadsantinhtrang] = useState([]);
    const [uploadsantensan, setUploadsantensan] = useState([]);
    const [uploadsananhreview, setUploadsananhreview] = useState('null');

useEffect(() => {
    axios.get("http://localhost:3000/loaisan").then(response => {
        setLoaisan(response.data.result.recordset);
    }).catch(error => {
        if(error.code === 401){
            window.location('/home')
        }
    });
}, []);
useEffect(() => {
    axios.get("http://localhost:3000/cumsan").then(response => {
        setCumsan(response.data.result.recordset);
    });
}, []);
const handleImageSelect = e => {
    setUploadsananhreview(e.target.files);
};
const handleSingleFrontSelect = e => {
    setUploadsanlogo(e.target.files[0]);
};
const handleMain = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < uploadsananhreview.length; i++) {
        console.log(uploadsananhreview[i]);
        formData.append('images_review', uploadsananhreview[i]);
    }
    formData.append('uploadsanmaloaisan', uploadsanmaloaisan);
    formData.append('id', upcumsanidnql);
    formData.append('uploadsanmacumsan', uploadsanmacumsan);
    formData.append('uploadsantrangthai', uploadsantrangthai);
    formData.append('uploadsanthongbao', uploadsanthongbao);
    formData.append('uploadsanlogo', uploadsanlogo);
    formData.append('uploadsantinhtrang', uploadsantinhtrang);
    formData.append('uploadsantensan', uploadsantensan);
    try {
        const response = await axios.post('http://localhost:3000/upload-info-san', formData,{
            headers: {
            'Content-Type': 'multipart/form-data',
            },});
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }};
const handleSend = async (e) => {
    e.preventDefault();
    const Data = {
        upcumsanidnql,
        upcumsanten,
        upcumsantinhtrang,
    };
    try {
        const response = await axios.post('http://localhost:3000/update-cumsan', Data);
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }};
const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = {
        uploaisan,
        uploaisangia,
        uploaisanbomon,
    };
    try {
        const response = await axios.post('http://localhost:3000/update-loaisan', Data);
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }};
return <div className={cx('Login')} >
        <form className="login" onSubmit={handleMain} >
        <h1 className={cx('Login-heading')} >Create Sân</h1>
            <div className={cx('Login-from')}>
                <select onChange={(e) => setUploadsanmaloaisan(e.target.value)}>
                {loaisan.map((Loaisan, index)  => (
                    <option key={index} value={Loaisan.MaLoaiSan}>
                    {Loaisan.TenLoaiSan} ({Loaisan.Mon})
                    </option>
                ))}
                </select>
                    <input
                        type="radio"
                        name="uploadsantrangthai"
                        value="1"
                        checked={uploadsantrangthai === '1'}
                        onChange={(e) => setUploadsantrangthai(e.target.value)}
                    /> Hoạt Động
                    <input
                        type="radio"
                        name="uploadsantrangthai"
                        value="0"
                        checked={uploadsantrangthai === '0'}
                        onChange={(e) => setUploadsantrangthai(e.target.value)}
                    /> Tạm Ngưng
                <select onChange={(e) => setUploadsanmacumsan(e.target.value)}>
                {cumsan.map((cumsan, index)  => (
                    <option key={index} value={cumsan.MaCumSan}>
                    {cumsan.TenCumSan}
                    </option>
                ))}
                </select>
            <input
                    className={cx('Login-input')} 
                    type="text"
                    defaultValue={uploadsanthongbao}
                    onChange={(e) => setUploadsanthongbao(e.target.value)}
                    placeholder="Thông Báo"
            />
            <input
                    type="radio"
                    name="uploadsantinhtrang"
                    value="1"
                    checked={uploadsantinhtrang === '1'}
                    onChange={(e) => setUploadsantinhtrang(e.target.value)}
                /> Hoạt Động
            <input
                    type="radio"
                    name="uploadsantinhtrang"
                    value="0"
                    checked={uploadsantinhtrang === '0'}
                    onChange={(e) => setUploadsantinhtrang(e.target.value)}
                /> Bảo Trì
                <input
                    className={cx('Login-input')} 
                    type="text"
                    defaultValue={uploadsantensan}
                    onChange={(e) => setUploadsantensan(e.target.value)}
                    placeholder="Tên Cụm Sân"
                />
                <input
                    className={cx('Login-input')} 
                    type="file"
                    onChange={handleSingleFrontSelect}
                    />
                <input 
                    onChange={handleImageSelect}
                    className={cx('Login-input')} 
                    multiple
                    type="file"
                />
                <button type="submit">Cập nhật</button>
            </div>
        </form>
        <form className="login" onSubmit={handleSend}>
        <h1 className={cx('Login-heading')} >Create cụm sân</h1>
            <div className={cx('Login-from')}>
            <input
                    className={cx('blind')} 
                    type="text"
                    defaultValue={decoded.idUser}
                    onLoad={(e) => setUpcumsanidngql(e.target.value)}
                />
                <input
                    className={cx('Login-input')} 
                    type="text"
                    defaultValue={upcumsanten}
                    onChange={(e) => setUpcumsanten(e.target.value)}
                    placeholder="Tên Cụm Sân"
                />
                <input
                    type="radio"
                    name="upcumsantinhtrang"
                    value="1"
                    checked={upcumsantinhtrang === '1'}
                    onChange={(e) => setUpcumsantinhtrang(e.target.value)}
                /> Còn Hoạt Động
                <input
                    type="radio"
                    name="upcumsantinhtrang"
                    value="0"
                    checked={upcumsantinhtrang === '0'}
                    onChange={(e) => setUpcumsantinhtrang(e.target.value)}
                /> Tạm Ngưng
                <button type="submit">Cập nhật</button>
            </div>
        </form>
        <form className="login" onSubmit={handleSubmit}>
        <h1 className={cx('Login-heading')} >Create loại sân</h1>
            <div className={cx('Login-from')}>
                <input
                    className={cx('Login-input')} 
                    type="text"
                    value={uploaisan}
                    onChange={(e) => setUpLoaisan(e.target.value)}
                    placeholder="Tên Loại Sân"
                />
                <input
                    className={cx('Login-input')} 
                    type="text"
                    value={uploaisanbomon}
                    onChange={(e) => setUpLoaisanbomon(e.target.value)}
                    placeholder="Bộ Môn"
                />
                <input
                    className={cx('Login-input')} 
                    type="text"
                    value={uploaisangia}
                    onChange={(e) =>  setUpLoaisangia(e.target.value)}
                    placeholder="money"
                />
                <button type="submit">Cập nhật</button>
            </div>
        </form>
    </div> 
}
export default Admin;