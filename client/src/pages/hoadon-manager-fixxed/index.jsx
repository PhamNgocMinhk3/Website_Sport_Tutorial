import { useState, useEffect } from 'react';
import '../Admin-Manager-fixxed/Details.module.scss';
import { useParams } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// import moment from 'moment';
function AdminFixxed() {
    const { id } = useParams() || 1;
    const [tiencoc,settiencoc]=useState([]);
    const [tiensan,settiensan]=useState([]);
    const [gioBatDau, setGioBatDau] = useState("01:00:00");
    const [giaPhuThu, setGiaPhuThu] = useState(0);
    const [ttdv,setttdv]= useState(0);
    const [tien,sett]= useState(0);
    const [minimoney,setminimoney]= useState(0);
    const [mdv,setmdv]= useState(0);
    const [mnfix,setmnfix]= useState(0);
    const [ssl,setssl]= useState(1);
    const now = new Date().toISOString();
    const [sddv,setsddv]=useState([]);
    const [sum,setsum]=useState([]);
    const [tongsum,settongsum]=useState([]);
    useEffect(() => {
        const data = {id}
        axios.post("http://localhost:3000/sdsan/id",data).then(response => {
            setGioBatDau(response.data.result.recordset[0].GioBatDau.substring(11, 19));
            settiencoc(response.data.result.recordset[0].TienCoc);
            settiensan(response.data.result.recordset[0].Tongcong);
        }).catch(error => {
            if(error.code === 401){
                window.location('/home')
            }
        });
    }, [id]);
    useEffect(() => {
        const data = {id}
        axios.post("http://localhost:3000/sddichvu",data).then(response => {
            setsddv(response.data.result.recordset);
        }).catch(error => {
            if(error.code === 401){
                window.location('/home')
            }
        });
    }, [id]);
    
    const [dichvu, setDichVu] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/dichvu").then(response => {
            setDichVu(response.data?.result?.recordset || [])
        }).catch(error => {
            console.log(error);
            if (error.code === 401){
                window.location('/home')
            }
        });
    },[]);
    useEffect(() => {
        const data ={id}
        axios.post("http://localhost:3000/sumsddv",data).then(response => {
            setsum(response.data?.result?.recordset || [])
            settongsum(response.data?.result?.recordset[0].sum || [])
        }).catch(error => {
            console.log(error);
            if (error.code === 401){
                window.location('/home')
            }
        });
    },[id]);
    
    const [items, setItems] = useState([]);
    const [giatong, setgiatong] = useState(0);
const handleCheckboxClick = (e) => {
            const maDichVu = parseInt(e.target.value);
            if (isNaN(maDichVu)) {
            console.error('Invalid value for maDichVu:', e.target.value);
            return;
            }
            if (typeof e.target.checked !== 'boolean') {
            console.error('Invalid value for e.target.checked:', e.target.checked);
            return;
            }
            if (e.target.checked) {
            const dv = dichvu.find((dv) => dv.MaDichVu === maDichVu);
            const newItem = { maDichVu: maDichVu, soLuong: 1, giaTien: dv.Gia };
            setItems([...items, newItem]);
            } else {
            const filteredItems = items.filter(item => item.maDichVu !== maDichVu);
            setItems(filteredItems);
            }
    };
    
const handleSoluongChange = (e) => {
        const maDichVu = parseInt(e.target.name);
        const soLuong = parseInt(e.target.value) || 0;
        const updatedItems = items.map(item => {
            if (item.maDichVu === maDichVu) {
                const dv = dichvu.find((dv) => dv.MaDichVu === item.maDichVu);
                const giaTien = dv.Gia * soLuong;
                return { ...item, soLuong: soLuong, giaTien: giaTien };
            } else {
                return item;
            }
        });
        setItems(updatedItems);
    };
useEffect(() => {
            let oldGiaTong = giatong;
            if (gioBatDau >= "06:00:00" && gioBatDau < "12:00:00") {
                setGiaPhuThu(0);
            } else if (gioBatDau >= "12:00:00" && gioBatDau < "18:00:00") {
                setGiaPhuThu(50000);
            } else {
                setGiaPhuThu(100000);
            }
            
            const updatedItems = items.map(item => {
                const dv = dichvu.find((dv) => dv.MaDichVu === item.maDichVu);
                const giaTien = dv.Gia * item.soLuong;
                return { ...item, giaTien: giaTien };
            });
            
            const newGiaTong = updatedItems.reduce((acc, item) => {
                return acc + item.giaTien;
            }, 0);
            
            if (newGiaTong !== oldGiaTong) {
                setgiatong(newGiaTong);
            }

}, [items, gioBatDau]);
const handle = async (e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append('id', id);
                    items.forEach((item, index) => {
                    formData.append(`maDichVu[${index}]`, item.maDichVu);
                    formData.append(`soLuong[${index}]`, item.soLuong);
                    formData.append(`giatong[${index}]`, item.giaTien); // sửa lại tên thuộc tính
                    });
                    formData.append('ttdv', ttdv);
                    formData.append('date', now);
                    try {
                    const response = await axios.post('http://localhost:3000/update-sddichvu', formData, {
                        headers: {
                        'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log(response.data.message);
                    } catch (error) {
                    console.log(error);
                    }
};
const handlefixxed = async (event) => {
    const maSuDungDichVu = event.currentTarget.dataset.msddv;
    event.preventDefault();
    const formData = new FormData();
    formData.append('dongia', mnfix);
    formData.append('sl', ssl);
    formData.append('tiensan', tiensan+giaPhuThu-tiencoc+mnfix-minimoney+tongsum);
    formData.append('tiensdsan', tiensan+giaPhuThu-tiencoc);
    // formData.append('minimoney', minimoney);
    formData.append('msddv', maSuDungDichVu);
    formData.append('mdv', mdv);
    formData.append('MaSDSan', id);
        try {
        const response = await axios.post('http://localhost:3000/upsddv/id', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data.message);
        } catch (error) {
        console.log(error);
        }
    };
const handledeleted = async (event) => {
    const maSuDungDichVu = event.currentTarget.dataset.msddv;
    event.preventDefault();
                        const formData = new FormData();
                        formData.append('maSuDungDichVu', maSuDungDichVu);
                        formData.append('tiensdsan', tiensan+giaPhuThu-tiencoc);
                        formData.append('id', id);
                        try {
                        const response = await axios.post('http://localhost:3000/deletesddv/id', formData, {
                            headers: {
                            'Content-Type': 'multipart/form-data',
                            },
                        });
                        console.log(response.data.message);
                        } catch (error) {
                        console.log(error);
                        }
                    };
return (
    <div class="container d-flex justify-content-center align-items-center">
    <div class="row">
    <div class="col-sm-6"></div>
    <div className="container">
        <tbody>
    <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Checkbox</th>
                <th scope="col">Tên Dịch Vụ</th>
                <th scope="col">Số Lượng</th>
                <th scope="col">Fix</th>
                <th scope="col">Deleted</th>
            </tr>
            </thead>
            <tbody>
            {sddv.map((item) => (
                                    <tr key={item.MaDichVu} className="align-middle">
                                        <td>
                                            <input
                                                type="checkbox"
                                                value={item.MaDichVu}
                                                onChange={(e) => setmdv(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            {item.TenDichVu}
                                        </td>
                                        <td>
                                        <input
                                                type="number"
                                                className='ml-12'
                                                name={item.MaDichVu}
                                                defaultValue={item.SoLuong}
                                                min="1"
                                                onChange={(e) => {
                                                    setssl(e.target.value);
                                                    setmnfix((item.DonGia/item.SoLuong)*e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-primary" data-msddv={item.MaSuDungDichVu} onClick={handlefixxed}>Fixxed</button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger" data-msddv={item.MaSuDungDichVu} onClick={handledeleted}>Deleted</button>
                                        </td>
                                    </tr>
                                ))}
                                {sum.map((item) => (
            <tr style={{color:"red"}} >
                <td>
                Tổng Tiền
                </td>
                <td>
                <input
                                type="text"
                                id="totalCost"
                                name="totalCost"
                                value={tiensan+giaPhuThu-tiencoc+mnfix-minimoney+item.sum}
                                readOnly
                                />
                </td>
                <td>
                Nhập Số Tiền Thanh Toán
                </td>
                <td>
                <input type="name" className="form-control" id="Street" placeholder="0"
                            onChange={(e) => setminimoney(e.target.value)}
                                />
                </td>
                <td> </td>
                </tr>
                                ))}
            </tbody>
        </table>
        {/* {JSON.stringify(sddv)} */}
        <div className="row gutters ">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div className="card h-100 mx-auto d-flex justify-content-center align-items-center" style={{ marginTop: "22px"}}>
                <div style={{padding : "12px"}} className="card-body mt">
                <div className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h4 className="mt-3 mb-2 text-danger">Dịch Vụ Kêu Thêm</h4>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                            {dichvu.map((item) => (
                                                <tr key={item.MaDichVu} className="align-middle">
                                                    <td style={{marginLeft:"32px"}}>
                                                        <input
                                                            type="checkbox"
                                                            value={item.MaDichVu}
                                                            onChange={handleCheckboxClick}
                                                        />
                                                    </td>
                                                    <td>
                                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                                    </td>
                                                    <td style={{ whiteSpace: "nowrap" }}>{item.TenDichVu}</td>
                                                    <td>
                                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name={item.MaDichVu}
                                                            onChange={handleSoluongChange}
                                                            disabled={!items.some((i) => i.maDichVu === item.MaDichVu)}
                                                            value={items.find((i) => i.maDichVu === item.MaDichVu)?.soLuong || ""}
                                                            min="1"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                </div>
                            </div>
                </div>
                <div className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h4 className="mt-3 mb-2 text-danger">Thanh Toán</h4>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Tổng Số Thanh Toán</label>
                            <input type="name" className="form-control" id="Street" placeholder=
                            {
                                tiensan+giaPhuThu+giatong-tiencoc-tien
                            }
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label htmlFor="Street">Nhập Số tiền thanh toán</label>
                            <input type="name" className="form-control" id="Street" placeholder="0"
                            onChange={(e) => sett(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{display:"none"}}  className="form-group">
                                    <label htmlFor="tinhTrang">Tình trạng</label>
                                    <select
                                    className="form-control"
                                    id="tinhTrang"
                                    onChange={(e) => setttdv(e.target.value)}
                                    >
                                    <option value="0">Chưa thanh toán</option>
                                    <option value="1">Đã thanh toán</option>
                                    </select>
                                </div>
                </div>
                <div className="row gutters justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right " style={{ marginTop: "12px"}}>
                                <button type="button" onClick={handle} className="btn btn-primary" style={{ marginRight: "5px"}}>add</button>
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