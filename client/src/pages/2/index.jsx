import { useState,useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function AdminManage() {
  const [IdngQL, setIdngQL] = useState([]);
  const [kieuthidau, setkieuthidau] = useState([]);
  const [namecumsan, setnamecumsan] = useState([]);
  const [ttcs, setttcs] = useState([]);
  const [hinhthuc, sethinhthuc] = useState([]);
  const [ngaybd, setngaybd] = useState([]);
  const [ngaykt, setngaykt] = useState([]);

  const { id } = useParams() || 1;
  useEffect(() => {
    axios.get("http://localhost:3000/kieuthidau").then(response => {
      setkieuthidau(response.data?.result?.recordset || [])
    }).catch(error => {
        console.log(error);
        if (error.code === 401){
            window.location('/home')
        }
    });
},[]);
const updated = async (e) => {
  const data ={
    kieuthi:IdngQL,
    Tinhtrang:namecumsan,
    tennd:ttcs,
    id,hinhthuc,ngaybd,ngaykt
  }
  try {
    const response = await axios.post('http://localhost:3000/phonglol', data);
    console.log(response.data.message);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div>
      {/* {JSON.stringify(hoadon)} */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tên Nội Dung</th>
            <th scope="col">Mã Giải Đấu</th>
            <th scope="col">Kiểu Thi Đấu</th>
            <th scope="col">Ngày Bắt Đầu</th>
            <th scope="col">Ngày Kết Thúc</th>
            <th scope="col">Tình Trạng</th>
            <th scope="col">
              HÌnh Thức
            </th>
            <th scope="col">Save</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <th scope="row">
            <input type="text" 
            onChange={(e) => 
              setttcs(e.target.value)
            }
            />
          </th>
            <th scope="row">{`${id}`}</th>
            <th>
            <select id="form_need " style={{"width":"180px"}} name="need" className="form-control" 
              onChange={(e) => 
                setIdngQL(e.target.value)
              }
            >
              <option  > -----Chọn----</option>
              {kieuthidau.map((product,index) => (
                                    <option  value={product.MaKieuThiDau} > {product.Ten}
                                    </option>
                                ))}
              </select>
            </th>
            <th scope="row">
            <input type="date" 
            onChange={(e) => 
              setngaybd(e.target.value)
            }
            />
            </th>
            <th scope="row">
            <input type="date" 
            onChange={(e) => 
              setngaykt(e.target.value)
            }
            />
            </th>

            <th scope="row">
            <input type="text" defaultValue={0}
              onChange={(e) => setnamecumsan(e.target.value)}
            />
            </th>
            <td>
              <select id="form_need " style={{"width":"180px"}} name="need" className="form-control" 
              onChange={(e) => sethinhthuc(e.target.value)}
            >
                                    <option value={0} >----Chọn-----</option>
                                    <option value={"Đơn nam"} >Đơn nam</option>
                                    <option value={"Đơn nữ"} >Đơn nữ</option>
                                    <option value={"Đôi nam"} >Đôi nam</option>
                                    <option value={"Đôi nữ"} >Đôi nữ</option>
                                    <option value={"Đôi nam nữ"} >Đôi nam nữ</option>
                                    <option value={"Đội"} >Đội</option>
              </select>
            </td>            <td>
              <button type="button" className="btn btn-primary" onClick={updated}>
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminManage;