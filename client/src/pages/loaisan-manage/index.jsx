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
    axios.post("http://localhost:3000/rerender-ls")
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
            <th scope="col">Tên Sân</th>
            <th scope="col">Bộ Môn</th>
            <th scope="col">Fixxed</th>
          </tr>
        </thead>
        <tbody>
        {hoadon.map((san, index) => (
          <tr key={index}>
            <th scope="row">{san.MaLoaiSan}</th>
            <td>{san.TenLoaiSan}</td>
            <td>{san.Mon}</td>
            <td>
            <Link to={`/loaisanfd/${san.MaLoaiSan}`}>
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