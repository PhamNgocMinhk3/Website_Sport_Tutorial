import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// import moment from 'moment';
import { Link } from 'react-router-dom';
function AdminManage() {
  const token = Cookies.get('token');
  const [decoded, setDecoded] = useState({});
  const [database, setdb] = useState([]);
  useEffect(() => {
    if (token) {
      const tokenValue = Cookies.get('token');
      const decodedToken = jwt_decode(tokenValue);
      setDecoded(decodedToken);
    }
  }, [token]);

  useEffect(() => {
    const id = decoded.idUser;
    const data = {
      token:token,
      id: id,
    };
    axios.post("http://localhost:3000/rerender-cs", data)
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
      {/* {JSON.stringify(hoadon)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope='col'>Mã Người QLý</th>
            <th scope="col">Tên Nquản lý</th>
            <th scope="col">Mã cụm Sân</th>
            <th scope="col">Tên cụm sân </th>
            <th scope="col">Tình Trạng</th>
            <th scope="col">Fix</th>
          </tr>
        </thead>
        <tbody>
        {database.map((san, index) => (
          <tr key={index}>
            <th>{san.MaNguoiQL}</th>
            <td>{san.TenNguoiQL}</td>
            <th scope="row">{san.MaCumSan}</th>
            <th scope="row">{san.TenCumSan}</th>
            <td>
              {san.TinhTrang === '1' ? 'Còn hoạt động' : 'Ngưng hoạt động'}
            </td>            <td>
            <Link to={`/cumsanfd/${san.MaCumSan}`}>
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