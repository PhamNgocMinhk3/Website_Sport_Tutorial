import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
function AdminManage() {
  const token = Cookies.get('token');
  const [decoded, setDecoded] = useState({});
  const [hoadon, setHoadon] = useState([]);
  useEffect(() => {
    if (token) {
      const tokenValue = Cookies.get('token');
      const decodedToken = jwt_decode(tokenValue);
      setDecoded(decodedToken);
    }
  }, [token]);
  console.log(decoded.idUser);
  useEffect(() => {
    const data = {
      token:token
    };
    axios.post("http://localhost:3000/rerender-hd", data)
      .then(response => {
        setHoadon(response.data.result.recordset)
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
      {/* {JSON.stringify(hoadon)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Mã Sân</th>
            <th scope="col">Ngày Tạo</th>
            <th scope="col">Giờ Đặt sân</th>
            <th scope="col">Giờ Kết Thúc</th>
            <th scope="col">Số Điện Thoại Khách</th>
            <th scope="col">Hình thức thanh toán</th>
            <th scope="col">Tình Trạng</th>
            <th scope="col">Fix</th>
          </tr>
        </thead>
        <tbody>
        {hoadon.map((san, index) => (
          <tr key={index}>
            <th scope="row">{san.MaSan}</th>
            <td>{moment(san.Ngaykhoitao).format('DD-MM-YYYY')}</td>
            <td>{san.GioBatDau.substring(11, 19)}</td>
            <td>{san.GioKetThuc.substring(11, 19)}</td>
            <td>{'0'+ san.sdt}</td>
            <td>
              {san.Hinhthucthanhtoan === 1 ? 'Thanh toán trực tiếp' : 'Chuyển khoản'}
            </td>
            <td>{san.TinhTrang  === '1' ? 'Đã Thanh toán ' : 'Chưa thanh toán '}</td>
            <td>
            <Link to={`/hdduyet/${san.MaHD}`}>
              <button type="button" className="btn btn-primary">
                Fixxed
              </button>
            </Link>
            </td>
            
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManage;