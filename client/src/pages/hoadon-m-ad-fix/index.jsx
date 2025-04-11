import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { useParams } from 'react-router-dom';
function AdminManage() {
    const { id } = useParams() || 1;
  const token = Cookies.get('token');
  const [decoded, setDecoded] = useState({});
  const [sdsan, setsdsan] = useState([]);
    const [tiencoc,settiencoc]=useState([]);
    const [tcoc,settcoc]=useState([]);
    const [htttoan,setHinhthucthanhtoan]= useState([]);
    const [tinhtrang,settinhtrang]= useState([]);
    const[tongtien,settt] = useState([]);
  useEffect(() => {
    if (token) {
      const tokenValue = Cookies.get('token');
      const decodedToken = jwt_decode(tokenValue);
      setDecoded(decodedToken);
    }
  }, [token]);
  console.log(decoded.idUser);
  useEffect(() => {
    const data = {id}
    axios.post("http://localhost:3000/fixhd/id",data).then(response => {
        setsdsan(response.data.result.recordset);
        settiencoc(response.data.result.recordset[0].TienCoc);
        setHinhthucthanhtoan(response.data.result.recordset[0].Hinhthucthanhtoan);
        settinhtrang(response.data.result.recordset[0].TinhTrang);
        settt(response.data.result.recordset[0].tongtienall);
    }).catch(error => {
        if(error.code === 401){
            window.location('/home')
        }
    });
}, [id]);
const handleMain = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('id', id);
  formData.append('htttoan', htttoan);
  formData.append('tinhtrang', tinhtrang);
  formData.append('tiencoc', +(tiencoc)+Number(tcoc));
  formData.append('tongtien', Number(tongtien-tiencoc));
  try {
      const response = await axios.post('http://localhost:3000/updatefixhd', formData,{
          headers: {
          'Content-Type': 'application/json',
          },});
      console.log(response.data.message);
  } catch (error) {
      console.log(error);
  }
};
  return (
    <div>
      {/* {JSON.stringify(sdsan)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Mã Hđ</th>
            <th scope="col">Mã Khách</th>
            <th scope="col">Phone</th>
            <th scope="col">Ngày Đặt</th>
            <th scope="col">Giờ start</th>
            <th scope="col">Giờ end</th>
            <th scope="col">Kiểu thanh toán</th>
            <th scope="col">Tình Trạng</th>
            <th scope="col">Tiền thanh toán</th>
            <th scope="col">Tiền chưa thanh toán</th>
            <th scope="col">Nhập Tiền</th>
            <th scope="col">Fix</th>
          </tr>
        </thead>
        <tbody>
        {sdsan.map((san, index) => (
          <tr key={index}>
            <th scope="row">{san.MaSan}</th>
            <th scope="row">{san.MaKhachHang}</th>
            <td>{'0'+ san.sdt}</td>
            <td>{moment(san.NgayDatSan).format('DD-MM-YYYY')}</td>
            <td>{san.GioBatDau.substring(11, 19)}</td>
            <td>{san.GioKetThuc.substring(11, 19)}</td>
            <td>
            <select id="form_need " style={{"width":"120px"}} name="need" className="form-control" defaultValue={san.Hinhthucthanhtoan}  
              onChange={(e) =>setHinhthucthanhtoan(e.target.value)}
            >
                                    <option  value={1} >
                                    Thanh Toán Trực Tiếp
                                    </option>
                                    <option  value={3} >
                                    Chuyển Khoảng
                                    </option>
              </select>
            </td>
            <td>
            <select id="form_need " style={{"width":"120px"}} name="need" className="form-control" defaultValue={san.TinhTrang}  
              onChange={(e) => settinhtrang(e.target.value)}
            >
                                    <option  value={1} >
                                    Đã Thanh Toán
                                    </option>
                                    <option  value={0} >
                                    Chưa Thanh Toán
                                    </option>
              </select>
            </td>
            <td>{+(san.TienCoc + Number(tcoc))}</td>
            <td>{ tongtien - tcoc}</td>
            <td>
              <input type="text" 
              // defaultValue={0}
              onChange={(e) => settcoc(e.target.value)}
              />
            </td>
            <td>
              <button type="button" className="btn btn-primary"
              onClick={handleMain}
              >
                Fixxed
              </button>
            </td>
            
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManage;