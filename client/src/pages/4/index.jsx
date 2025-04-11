import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
const token = Cookies.get('token');
    if (token){
        var tokenValue = Cookies.get('token');
        var decoded = jwt_decode(tokenValue) || 1;
    }
function AdminManage() {
      const [kieuthidau, setkieuthidau] = useState([]);
      const [sdtn,setsdtn]=useState('');
      const [madoi,setmadoi]=useState('');
      const [sl, setsl] = useState([]);
      const iduser=decoded.idUser;
      const nameuser=decoded.nameUser;
      const data = { 
          id:iduser ,
          // name:nameuser
      };
      useEffect(() => {
        axios.post("http://localhost:3000/getsdt", data).then(response => {
            setsdtn(response.data?.result?.recordset[0].sdt || []);
        }).catch(error => {
            console.log(error);
            if (error.code === 401){
                window.location('/home')
            }
        });
    },[]);
    useEffect(() => {
      axios.get("http://localhost:3000/getsl").then(response => {
        setsl(response.data?.result?.recordset || []);
      }).catch(error => {
        console.log(error);
        if (error.code === 401){
          window.location('/home')
        }
      });
    },[]);
  useEffect(() => {
    axios.get("http://localhost:3000/team").then(response => {
      setkieuthidau(response.data?.result?.recordset || []);
      setmadoi(response.data?.result?.recordset[0].MaDoi || []);
    }).catch(error => {
        console.log(error);
        if (error.code === 401){
            window.location('/home')
        }
    });
},[]);
const updated = async (e) => {
  const data ={
    sdtn,iduser,nameuser,madoi
  }
  try {
    const response = await axios.post('http://localhost:3000/createdoiclone', data);
    if(response.data.message === "ok"){
      alert('success !!')
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div>
      {/* {JSON.stringify(sl)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Mã Team</th>
            <th scope="col">Tên Chủ Team</th>
            <th scope="col">Số Lượng Thành Viên</th>
            <th scope="col">Gia Nhập</th>
          </tr>
        </thead>
        <tbody>
      {kieuthidau.map((san, index) => (
        <tr key={index}>
          <th scope="row">{san.MaDoi}</th>
          <th scope="row">{san.Ten}</th>
          {sl.map((slSan, slIndex) => (
            slSan.MaDoi === san.MaDoi ? (
              <th scope="row" key={slIndex}>{slSan.SL}</th>
            ) : null
          ))}
          <td>
            <button type="button" className="btn btn-primary" onClick={updated} value={san.MaDoi}>
              Save
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