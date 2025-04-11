import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

import axios from "axios";

function AdminManage() {
  const [database, setdb] = useState([]);
  const [san, setsan] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3000/gettrandauht")
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
  useEffect(() => {
    axios.get("http://localhost:3000/san")
      .then(response => {
        setsan(response.data.result.recordset)
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
      {/* {JSON.stringify(san)} */}
      {/* {JSON.stringify(database)} */}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tên Giải Đấu</th>
            <th scope="col">Bộ Môn</th>
            <th scope="col">Hình Thức Thi</th>
            <th scope="col">Ngày Bắt Đầu</th>
            <th scope="col">Ngày Kết Thúc</th>
            <th scope="col">Giờ Bắt Đầu</th>
            <th scope="col">Sân</th>
            <th scope="col">Xem Chi Tiết</th>
          </tr>
        </thead>
        <tbody>
        {database.map((data, index) => {
  const tenSan = san.find((s) => s.MaSan === +(data.SanDau))?.TenSan;
  return (
    <tr key={index}>
      <th scope="row">{data.Ten}</th>
      <th scope="row">{data.BoMon}</th>
      <th scope="row">{data.HinhThuc}</th>
      <th scope="row">{moment(data.NgayBatDau).format('DD/MM/YYYY')}</th>
      <th scope="row">{moment(data.NgayKetThuc).format('DD/MM/YYYY')}</th>
      <th scope="row">{data.ThoiGian.substring(11, 19)}</th>
      <td>{tenSan}</td>
      <td>
        <a href={`/showgiaidau/${data.MaTD}`}>
          <button type="button" className="btn btn-primary">
            Show
          </button>
        </a>
      </td>
    </tr>
  );
})}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManage;