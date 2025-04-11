import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import axios from "axios";

function AdminManage() {
  const { id } = useParams() || 1;
  const dataa = {id};
  const [database, setdb] = useState([]);
  const [usertt, setusertt] = useState([]);
  const [san, setsan] = useState([]);
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
  useEffect(() => {
    axios.post("http://localhost:3000/getshowtrandau", dataa).then(response => {
      setdb(response.data.result.recordset)
    }).catch(error => {
        console.log(error);
        if (error.code === 401){
            window.location('/home')
        }
    });
},[]);
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
    <div>
      {/* {JSON.stringify(usertt)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tên Giải Đấu</th>
            <th scope="col">Thể Lệ</th>
            <th scope="col">Số Người Tham Gia Tối Đa</th>
            <th scope="col">Phần Thưởng</th>
            <th scope="col">Bộ Môn</th>
            <th scope="col">Hình Thức Thi Đấu</th>
            <th scope="col">Sân Đấu</th>
            <th scope="col">Số Thứ Tự</th>
          </tr>
            </thead>
          <tbody style={{backgroundColor:"#FFFF33"}}>
          {database.map((data, index) => {
  const tenSan = san.find((s) => s.MaSan === +(data.SanDau))?.TenSan;
  return (
    <tr key={index}>
      <th scope="row">{data.namegiaidau}</th>
      <th scope="row">{data.TheLe}</th>
      <th scope="row">{data.SoLuong}</th>
      <th scope="row">{data.PhanThuong}</th>
      <th scope="row">{data.BoMon}</th>
      <th scope="row">{data.HinhThuc}</th>
      <td>{tenSan}</td>
      <th scope="row">{data.SoThuTu}</th>
    </tr>
  );
})}
        </tbody>
        <thead>
          <tr>
            <th scope="col">Nội Dung</th>
            <th scope="col">Ngày Bắt Đầu</th>
            <th scope="col">Ngày Kết Thúc</th>
            <th scope="col">Kiểu Thi Đấu</th>
            <th scope="col">Thời Gian Bắt Đầu</th>
            <th scope="col">Người Thách Đấu 1</th>
            <th scope="col">Người Thách Đấu 2</th>
            <th scope="col">Kết Quả Đội 1</th>
            <th scope="col">Kết Quả Đội 2</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:"#FFFF33"}}>
        {database.map((san, index) => {
          const player1 = usertt.find((player) => player.MA_Taikhoang === san.MaPlayer1);
          const player2 = usertt.find((player) => player.MA_Taikhoang === san.MaPlayer2);
          const player1Name = player1 ? player1.name_ten : 'N/A';
          const player2Name = player2 ? player2.name_ten : 'N/A';
          return (
            <tr key={index}>
              <th scope="row">{san.tennoidung}</th>
              <th scope="row">{moment(san.NgayBatDau).format('DD/MM/YYYY')}</th>
              <th scope="row">{moment(san.NgayKetThuc).format('DD/MM/YYYY')}</th>
              <th scope="row">{san.Ten}</th>
              <th scope="row">{san.ThoiGian.substring(11, 19)}</th>
              <th scope="row">{player1Name}</th>
              <th scope="row">{player2Name}</th>
              <th scope="row">{san.Ketqua1 === 2 ? 'Chiến thắng' : 'Thua'}</th>
              <th scope="row">{san.Ketqua2 === 2 ? 'Chiến thắng' : 'Thua'}</th>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManage;