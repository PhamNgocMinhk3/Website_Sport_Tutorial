import { useState, useEffect } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
const token = Cookies.get('token');
    if (token){
        var tokenValue = Cookies.get('token');
        var decoded = jwt_decode(tokenValue) || 1;
    }
function AdminManage() {
  const [database, setdb] = useState([]);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hour = currentDate.getHours().toString().padStart(2, '0');
  const minute = currentDate.getMinutes().toString().padStart(2, '0');
  const second = currentDate.getSeconds().toString().padStart(2, '0');
  const datetime = `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
useEffect(() => {
  axios.get("http://localhost:3000/getgiaidauthongtin")
    .then(response => {
      setdb(response.data.result.recordset)
    })
    .catch(error => {
      console.log(error);
      if (error.code === 401) {
        window.location = '/home'
      }
    });
}, []);

const updated = async (e) => {
  const targetValue = e.target.value; // giá trị của button
  const data ={
    token:decoded.idUser,datetime,
    id :targetValue
  }
  try {
    const response = await axios.post('http://localhost:3000/thamgiagiadau', data);
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div>
      {/* {JSON.stringify(database)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tên Giải</th>
            <th scope="col">Ngày Bắt Đầu</th>
            <th scope="col">Ngày Kết Thúc</th>
            <th scope="col">Hình Thức Thi</th>
            <th scope="col">Thể Lệ</th>
            <th scope="col">Bộ Môn</th>
            <th scope="col">Số Lượng</th>
            <th scope="col">Phần Thưởng</th>
            <th scope="col">John</th>
          </tr>
        </thead>
        <tbody>
        {database.map((san, index) => (
          <tr key={index}>
            <th scope="row">{san.Ten}</th>
            <th scope="row">{moment(san.NgayBatDau).format('DD/MM/YYYY')}</th>
            <th scope="row">{moment(san.NgayKetThuc).format('DD/MM/YYYY')}</th>
            <th scope="row">{san.HinhThuc}</th>
            <th scope="row">{san.TheLe}</th>
            <th scope="row">{san.BoMon}</th>
            <th scope="row">{san.SoLuong}</th>
            <th scope="row">{san.PhanThuong}</th>
            <td>
              <button type="button" className="btn btn-primary" onClick={updated} value={san.MaNoiDung}>
                Tham Gia
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