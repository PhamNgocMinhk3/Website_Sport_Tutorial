import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import '../Admin-Manager-fixxed/Details.module.scss';
import { useParams } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// import moment from 'moment';
// import { Link } from 'react-router-dom';
function AdminFixxed() {
    const token = Cookies.get('token');
    const { id } = useParams() || 1;
    const [decoded, setDecoded] = useState({});
    const [product, setProduct] = useState([]);

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const hour = currentDate.getHours().toString().padStart(2, '0');
const minute = currentDate.getMinutes().toString().padStart(2, '0');
const second = currentDate.getSeconds().toString().padStart(2, '0');
const datetime = `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
const [uploading, setUploading] = useState(false);
    const data = { 
        id:id // hoặc viết tắt là iduser,
    };
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
useEffect(() => {
    if (token) {
        const tokenValue = Cookies.get('token');
        const decodedToken = jwt_decode(tokenValue);
        setDecoded(decodedToken);
    }
}, [token]);
useEffect(() => {
    axios.post("http://localhost:3000/san/:id", data).then(response => {
        setProduct(response.data?.result?.recordset || [])
        setUploadsangia(response.data?.result?.recordset[0].Gia  || [])
        setUploadsanmaloaisan(response.data?.result?.recordset[0].MaLoaiSan  || []);
        setUploadsanmacumsan(response.data?.result?.recordset[0].MaCumSan  || []);
        setUploadsantinhtrang(response.data?.result?.recordset[0].TinhTrang  || []);
        setUploadsanthongbao(response.data?.result?.recordset[0].ThongBao  || []);
        setUploadsantensan(response.data?.result?.recordset[0].TenSan  || []);
        // console.log(response.data?.result?.recordset[0].AnhReview );
    }).catch(error => {
        console.log(error);
        if (error.code === 401){
            window.location('/home')
        }
    });
},[]);
    const [cumsan, setCumsan] = useState([]);
    const [loaisan, setLoaisan] = useState([]); 
    // 
    const [uploadsanmaloaisan, setUploadsanmaloaisan] = useState([]);
    const [uploadsanmacumsan, setUploadsanmacumsan] = useState([]);
    const [uploadsanthongbao, setUploadsanthongbao] = useState([]);
    const [uploadsantinhtrang, setUploadsantinhtrang] = useState([]);
    const [uploadsangia, setUploadsangia] = useState([]);
    const [uploadsantensan, setUploadsantensan] = useState([]);
    const idUser = decoded.idUser;
    // 
const handleChildrent = async (e) => {
        const setUploadpic = e.target.files[0];
        const formData = new FormData();
        formData.append('setUploadpic', setUploadpic);
        formData.append('date', datetime);
        formData.append('idsan', id);
        try {
            const response = await axios.post('http://localhost:3000/upload-single-san', formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                },});
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }};
const [AnhReview, setAnhreview] = useState(null); 
const handleFather = (e) => {
        setAnhreview(e.target.files);
};
        
useEffect(() => {
        if (AnhReview && !uploading) {
        setUploading(true);
        const formData = new FormData();
        for (let i = 0; i < AnhReview.length; i++) {
            formData.append('images_review', AnhReview[i]);
        }
        formData.append('id', id);
        formData.append('date', datetime);
        try {
            const response =  axios.post('http://localhost:3000/upload-multiple-san', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log(response.data.message);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
        }
    }, [AnhReview, id, datetime, uploading]);      
const handleMain = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('uploadsanmaloaisan', uploadsanmaloaisan);
        formData.append('uploadsanmacumsan', uploadsanmacumsan);
        formData.append('uploadsantinhtrang', uploadsantinhtrang);
        formData.append('uploadsanthongbao', uploadsanthongbao);
        formData.append('uploadsantensan', uploadsantensan);
        formData.append('date', datetime);
        formData.append('idUerupdate', idUser);
        formData.append('uploadsangia', uploadsangia);
        try {
            const response = await axios.post('http://localhost:3000/fix-infosan', formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                },});
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }};
return (
    <div className="container">
        <div className=" text-center mt-5 ">
            <h1 >Chỉnh sữa thông tin chi tiết sân</h1>
    {/* {JSON.stringify(product)} */}
        </div>
    <div className="row ">
<div className="col-lg-7 mx-auto">
        <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
            <div className = "container">
<form onSubmit={handleMain}>
{product.map((product,index) => (
            <div className="controls" key={index}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form_name">Tên Sân :</label>
                            <input 
                            id="form_name" 
                            type="text" 
                            onChange={(e) => setUploadsantensan(e.target.value)} 
                            className="form-control" 
                            placeholder={product.TenSan} 
                            
                            data-error="Firstname is required." 
                            value={uploadsantensan} 
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                        <label htmlFor="form_need">Sân Thuộc Cụm :</label>
                            <select id="form_need" name="need" className="form-control" defaultValue={product.MaCumSan} onChange={(e) => setUploadsanmacumsan(e.target.value)}  >
                                {cumsan.map((cumsan, index)  => (
                                    <option key={index} value={cumsan.MaCumSan} >
                                    {cumsan.TenCumSan}
                                    </option>
                                ))}
                            </select>
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form_email">Giá :</label>
                            <input 
                            id="form_name" 
                            type="text" 
                            onChange={(e) => setUploadsangia(e.target.value)} 
                            className="form-control" 
                            placeholder={product.Gia} 
                            data-error="Firstname is required." 
                            value={uploadsangia} 
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                        <label htmlFor="form_need">Bộ Môn :</label>
                            <select id="form_need" name="need" className="form-control"  defaultValue={product.MaLoaiSan} onChange={(e) => setUploadsanmaloaisan(e.target.value)}>
                                {loaisan.map((loaisan, index)  => (
                                    <option key={index} value={loaisan.MaLoaiSan}>
                                    {loaisan.TenLoaiSan} - Môn {loaisan.Mon}
                                    </option>
                                ))}
                            </select>
                            </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form_need">Tình Trạng :</label>
                            <select
                            id="form_need"
                            name="need"
                            className="form-control"
                            onChange={(e) => setUploadsantinhtrang(e.target.value)}
                            data-error="Please specify your need"
                            defaultValue={product.TinhTrang === '0' ? "0" : "1"} // Lấy giá trị tương ứng với "Bảo Trì" hoặc "Hoạt Động"
                            >
                            <option value="0">Bảo Trì</option> 
                            <option value="1">Hoạt Động</option> 
                            </select>
                        </div>
                    </div>
                </div>
                    <div>
                    <label className="form-label" htmlFor="customFile">
                        Ảnh Đại diện chính cho sân :(chỉ chọn 1 ảnh đại diện cho sân nếu cần thay đổi)
                        </label>
                        <div className="d-flex">
                            <img src={`http://localhost:3000/${product.Logo_1}`} alt="" style={{width: '70px', height: '70px'}} className="mx-2 mt-2 mb-2" />
                        </div>
                        <input
                        type="file"
                        className="form-control"
                        id="customFile"
                        accept="image/*"
                        onChange={handleChildrent}
                        />
                        <label htmlFor="formFileMultiple" className="form-label">
                        Chuỗi ảnh review sân :(chỉ chọn 4 ảnh cho sân nếu cần thay đổi)
                        </label>
                            <div className="d-flex">
                            {product.AnhReview.split(',').map((image, index) => (
                                <img key={index} src={`http://localhost:3000/${image.replace('public\\images\\', '')}`}  alt="" style={{width: '70px', height: '70px'}} className="mx-2 mt-2 mb-2" />
                                ))}
                            </div>
                        <input
                        className="form-control"
                        type="file"
                        id="formFileMultiple"
                        multiple
                        accept="image/*"
                        onChange={handleFather}
                        />
                    </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="form_message">Thông Báo :</label>
                            <textarea id="form_message"  className="form-control" placeholder={product.ThongBao} value={uploadsanthongbao} rows="4"  data-error="Please, leave us a message." onChange={(e) => setUploadsanthongbao(e.target.value)}></textarea>
                            </div>
                        </div>
                    <div className="col-md-12">
                        <button className="btn btn-success btn-send  pt-2 btn-block mt-2"  value={decoded.idUser}>Lưu Sửa Đổi</button>
                </div>
                </div>
        </div>
            ))}
        </form>
        </div>
            </div>
    </div>
    </div>
</div>
</div>
    );
}

export default AdminFixxed;