import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function AdminManage() {
  const token = Cookies.get('token');
  const [database, setdb] = useState([]);
  const [nguoiquanly, setql] = useState([]);
  const [IdngQL, setIdngQL] = useState([]);
  const [namecumsan, setnamecumsan] = useState([]);
  const [ttcs, setttcs] = useState([]);

  const { id } = useParams() || 1;

const updated = async (e) => {
  const data ={
    IdngQL,
    namecumsan,
    ttcs,
    id
  }
  try {
    const response = await axios.post('http://localhost:3000/update-cumsanmini', data);
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  axios.post("http://localhost:3000/nguoiquanly")
    .then(response => {
      setql(response.data.result.recordset)
      setIdngQL(response.data.result.recordset[0].MaNguoiQL)
    })
    .catch(error => {
      console.log(error);
      if (error.code === 401) {
        window.location = '/home'
      }
    });
}, []);
  useEffect(() => {
    const data = {
      token:token,
      id: id,
    };
    axios.post("http://localhost:3000/rerender-cs-fix", data)
      .then(response => {
        setnamecumsan(response.data.result.recordset[0].TenCumSan)
        setttcs(response.data.result.recordset[0].TinhTrang)
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
            <th scope="col">Tên Nquản lý</th>
            <th scope="col">Mã Sân</th>
            <th scope="col">Tên cụm sân </th>
            <th scope="col">Tình Trạng</th>
            <th scope="col">Fix</th>
          </tr>
        </thead>
        <tbody>
        {database.map((san, index) => (
          <tr key={index}>
            <th>
            <select id="form_need " style={{"width":"180px"}} name="need" className="form-control" defaultValue={san.MaNguoiQL}  
              onChange={(e) => setIdngQL(e.target.value)}
            >
                {nguoiquanly.map((cumsan, index)  => (
                                    <option key={index} value={cumsan.MaNguoiQL} >
                                    {cumsan.TenNguoiQL}
                                    </option>
                                ))}
              </select>
            </th>
            <th scope="row">{san.MaCumSan}</th>
            <th scope="row">
            <input type="text" defaultValue={san.TenCumSan}
              onChange={(e) => setnamecumsan(e.target.value)}
            />
            </th>
            <td>
              <select id="form_need " style={{"width":"180px"}} name="need" className="form-control" defaultValue={san.TinhTrang}  
              onChange={(e) => setttcs(e.target.value)}
            >
                                    <option key={index} value={0} >Tạm Ngưng</option>
                                    <option key={index} value={1} >Hoạt Động</option>
              </select>
            </td>            <td>
              <button type="button" className="btn btn-primary" onClick={updated}>
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