import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import moment from 'moment';

import axios from "axios";
import jwt_decode from "jwt-decode";
const token = Cookies.get('token');
    if (token){
        var tokenValue = Cookies.get('token');
        var decoded = jwt_decode(tokenValue) || 1;
    }
function AdminManage() {
  const [database, setdb] = useState([]);
  const idupdate = decoded.idUser;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hour = currentDate.getHours().toString().padStart(2, '0');
  const minute = currentDate.getMinutes().toString().padStart(2, '0');
  const second = currentDate.getSeconds().toString().padStart(2, '0');
  const datetime = `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
const updated = async (e) => {
  const targetValue = e.target.value; 
  const data ={
    idupdate,datetime,
    id :targetValue
  }
  try {
    const response = await axios.post('http://localhost:3000/updatedktd', data);
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    axios.get("http://localhost:3000/getdktd")
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

  return (
    <div>
      {/* {JSON.stringify(database)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Mã Đăng Kí</th>
            <th scope="col">Mã Player Thách Đấu</th>
            <th scope="col">Ngày Đăng kí</th>
            <th scope="col">Duyệt</th>
          </tr>
        </thead>
        <tbody>
        {database.map((san, index) => (
          <tr key={index}>
            <th scope="row">{san.MaDk}</th>
            <th scope="row">
            {san.MaPlayer}
            </th>
            <td>
            {moment(san.NgayDangKi).format('DD/MM/YYYY')}
            </td>            <td>
              <button type="button" className="btn btn-primary" onClick={updated} value={san.MaDk}>
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