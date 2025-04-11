import { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import jwt_decode from "jwt-decode";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// import moment from 'moment';
import { Link } from 'react-router-dom';
function AdminManage() {
  // const token = Cookies.get('token');
  // const [decoded, setDecoded] = useState({});
  const [user, setUser] = useState([]);
  // useEffect(() => {
  //   if (token) {
  //     const tokenValue = Cookies.get('token');
  //     const decodedToken = jwt_decode(tokenValue);
  //     setDecoded(decodedToken);
  //   }
  // }, [token]);

  useEffect(() => {
    axios.get("http://localhost:3000/rank")
      .then(response => {
        setUser(response.data.result.recordset)
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
        {/* {JSON.stringify(user)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Hạng</th>
            <th scope="col">avatar</th>
            <th scope="col">Tên Người Dùng</th>
            <th scope="col">Điểm elo</th>
            <th scope="col">Nghề Nghiệp</th>
            <th scope="col">Thông tin liên lạc</th>
          </tr>
        </thead>
        <tbody>
        {user.map((user,index) => (
          <tr key={index}>
            <th scope="row">{index +1}</th>
            <td>
            {user && user.img ? (
              <img
                src={`http://localhost:3000/${user.img}`}
                className="rounded-circle"
                style={{ width: '35px' }}
                alt="Avatar"
              />
            ) : (
              <img
                src="https://35express.org/wp-content/uploads/2020/01/ricardo-milos-la-ai-35express.jpg"
                className="rounded-circle"
                style={{ width: '35px' ,objectFit: 'cover'}}
                alt="Avatar"
              />
            )}
          </td>
            <td>{user.name_ten}</td>
            <td>{user.point}</td>
            <td>{user.nghe}
            </td>
            <td>
            <Link to={`http://localhost:3001/user/${user.MA_Taikhoang}`}>
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