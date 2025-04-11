import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function AdminManage() {
  const token = Cookies.get('token');
  const [database, setdb] = useState([]);
  const [loaisan, setloaisan] = useState([]);
  const [namecumsan, setnamecumsan] = useState([]);
  const [ttcs, setttcs] = useState([]);

  const { id } = useParams() || 1;

const updated = async (e) => {
  const targetValue = e.target.value; // giá trị của button
  const data ={
    namecumsan,
    ttcs,
    id :targetValue
  }
  try {
    const response = await axios.post('http://localhost:3000/update-cumsanminiz', data);
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  axios.post("http://localhost:3000/e")
    .then(response => {
      setloaisan(response.data.result.recordset)
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
    axios.post("http://localhost:3000/rerender-ls", data)
      .then(response => {
        setnamecumsan(response.data.result.recordset[0].TenCumSan)
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
            <th scope="col">Mã Loại Sân</th>
            <th scope="col">Tên Loại Sân</th>
            <th scope="col">Loại Sân</th>
            <th scope="col">Fix</th>
          </tr>
        </thead>
        <tbody>
        {database.map((san, index) => (
          <tr key={index}>
            <th scope="row">{san.MaLoaiSan}</th>
            <th scope="row">
            <input type="text" defaultValue={san.TenLoaiSan}
              onChange={(e) => setnamecumsan(e.target.value)}
            />
            </th>
            <td>
              <select id="form_need " style={{"width":"180px"}} name="need" className="form-control" defaultValue={san.Mon}  
              onChange={(e) => setttcs(e.target.value)}
            >
              {loaisan.map((san, index) => (
                                    <option key={index} value={san.Mon} >{san.Mon}</option>
                                    ))}
              </select>
            </td>            <td>
              <button type="button" className="btn btn-primary" onClick={updated} value={san.MaLoaiSan}>
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