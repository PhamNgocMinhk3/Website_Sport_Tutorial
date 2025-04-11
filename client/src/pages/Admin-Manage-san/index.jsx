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
  const [san, setSan] = useState([]);
  useEffect(() => {
    if (token) {
      const tokenValue = Cookies.get('token');
      const decodedToken = jwt_decode(tokenValue);
      setDecoded(decodedToken);
    }
  }, [token]);
const Deleted = async (e) => {
  const maSan = e.target.value;
  const formData = new FormData();
  formData.append('maSan', maSan);
  try {
    const response = await axios.post('http://localhost:3000/deletedsan', formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    const id = decoded.idUser || 1;
    const data = {
      id: id,
    };
    axios.post("http://localhost:3000/rerender-san", data)
      .then(response => {
        setSan(response.data.result.recordset)
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
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Mã Sân</th>
            <th scope="col">Tên Sân</th>
            <th scope="col">Sân Thuộc Cụm</th>
            <th scope="col">Ngày Tạo</th>
            <th scope="col">Fix</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        {san.map((san, index) => (
          <tr key={index}>
            <th scope="row">{san.MaSan}</th>
            <td>{san.TenSan}</td>
            <td>{san.TenCumSan}</td>
            <td>{moment(san.Ngaykhoitao).format('DD-MM-YYYY')}</td>
            <td>
            <Link to={`/fix/${san.MaSan}`}>
              <button type="button" className="btn btn-primary">
                Fixxed
              </button>
            </Link>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={Deleted}
                value={san.MaSan}
              >
                Deleted
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