// import classNames from "classnames/bind";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  './Details.module.scss';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// const cx = classNames.bind(styles)

function Cardsanpayment() {
  const { id } = useParams() || 1;
  const token = Cookies.get('token');
  const [product, setProduct] = useState([]);
  // const [dichvu, setDichVu] = useState([]);
  const [atmchusan, setAtmchusan] = useState([]);
  const [atm, setatm] = useState([]);
  const [price, setPrice] = useState(0);
  const [iduser, setuser] = useState({});

  // 
  const [tennguoidung, settennguoidung] = useState('');
  const [atmcs, setatmcs] = useState('');
  const [hour, sethour] = useState('');
  const [Ehour, setEhour] = useState('');
  const [date, setdate] = useState('');
  const [tiencoc,settiencoc] =useState(0);
  const [gia,setgia] = useState(0);
  const [bb,setbb] = useState('');
  const[atmmy, setamtmy ]=  useState(0);
  const [tensans, settensans] = useState('');
  const data = {
    id:id // hoặc viết tắt là iduser,
  };
  useEffect(() => {
    const time = new Date().getHours();
    if (time >= 6 && time < 12) {
      setPrice(0);
    } else if (time >= 12 && time < 18) {
      setPrice(50000);
    } else {
      setPrice(100000);
    }
  }, []);
  useEffect(() => {
    if (token) {
      const tokenValue = Cookies.get('token');
      const decodedToken = jwt_decode(tokenValue);
      settennguoidung(decodedToken.nameUser);
      setuser(decodedToken.idUser)
    }
  }, [token]);

useEffect(() => {
    axios.post("http://localhost:3000/san/id", data).then(response => {
        setProduct(response.data?.result?.recordset || []);
        settensans(response.data?.result?.recordset[0].TenSan || []);
        setgia(response.data?.result?.recordset[0].Gia || []);
    }).catch(error => {
        console.log(error);
        if (error.code === 401){
            window.location('/home')
        }
    });
},[]);
  const datamini ={
    token:token
  };
  // console.log(datamini);
useEffect(() => {
  axios.post("http://localhost:3000/atmc", datamini).then(response => {
    setatm(response.data?.result || []);
  }).catch(error => {
      console.log(error);
      if (error.code === 401){
          window.location('/home')
      }
  });
},[]);
useEffect(() => {
  axios.post("http://localhost:3000/atmchusan", data).then(response => {
    setAtmchusan(response.data?.result?.recordset || []);
    setatmcs(response.data?.result?.recordset[0].nganhang || []);
  }).catch(error => {
      console.log(error);
      if (error.code === 401){
          window.location('/home')
      }
  });
},[]);
useEffect(() => {
  axios.post("http://localhost:3000/b", data).then(response => {
    setbb(response.data?.result?.recordset[0].MaHD || []);
  }).catch(error => {
      console.log(error);
      if (error.code === 401){
          window.location('/home')
      }
  });
},[]);
useEffect(() => {
  if (atm.length > 0) {
    setamtmy(atm[0].nganhang);
  }
}, [atm]);
const [hinhthucthanhtoan, setHinhthucthanhtoan] = useState('1');
const handleInputChange = (event) => {
  setHinhthucthanhtoan(event.target.value);
}

const handleMain = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('tennguoidung', tennguoidung);
  formData.append('hinhthucthanhtoan', hinhthucthanhtoan);
  formData.append('atmcs', atmcs);
  formData.append('atmy', atmmy);
  formData.append('hour', hour);
  formData.append('Ehour', Ehour);
  formData.append('masan', id);
  formData.append('token', token);
  formData.append('date', date);
  const [hourHours, hourMinutes] = hour.split(':');
  const [EhourHours, EhourMinutes] = Ehour.split(':');
  const timeDiff = (parseInt(hourHours, 10) - parseInt(EhourHours, 10)) + ((parseInt(hourMinutes, 10) - parseInt(EhourMinutes, 10)) / 60);
  formData.append('tiencoc', tiencoc);
  formData.append('gia', Math.abs((gia+price)*Math.round(timeDiff))+gia+gia*0.1);
  formData.append('tensans', tensans);
  try {
      const response = await axios.post('http://localhost:3000/payment/id', formData,{
          headers: {
          'Content-Type': 'multipart/form-data',
          },});
      console.log(response.data.message);
  } catch (error) {
      console.log(error);
  }};
    return <section class="h-100 h-custom">
      {/* {JSON.stringify(product)} */}
      {/* {JSON.stringify(bb)} */}
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="h5">Trang Thanh Toán Sân</th>
                  <th scope="col">Tên Sân</th>
                  <th scope="col">Giá Sân</th>
                  {/* <th scope="col">Dịch vụ đi kèm</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                  {product.map((product,index) => (
                    <div class="d-flex align-items-center">
                      <img src={`http://localhost:3000/${product.Logo_1}`} class="img-fluid rounded-3"
                        style={{width:" 200px"}}alt="Book"></img>
                        
                    </div>
                      ))}  
                  </th>
                  {product.map((product,index) => (
                  <td class="align-middle">
                    <p class="mb-0" style={{"font-weight": "500"}} >{product.TenSan}</p>
                  </td>
                    ))} 
                  <td class="align-middle">
                  {product.map((product,index) => (
                    <p class="mb-0" style={{"font-weight": "500"}}>{product.Gia + price} VND</p>
                    ))} 
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card shadow-2-strong mb-5 mb-lg-0" style={{"border-radius":" 16px"}}>
            <div class="card-body p-4">
              <div class="row">
                <div class="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                  <form>
                    <div class="d-flex flex-row pb-3">
                      <div class="d-flex align-items-center pe-2">
                      <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v"
                      value="1" aria-label="..." checked onChange={handleInputChange} />
                      </div>
                      <div class="rounded border w-100 p-3">
                        <p class="d-flex align-items-center mb-0">
                          <i class="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Thanh Toán Trực Tiếp
                        </p>
                      </div>
                    </div>
                    
                    <div class="d-flex flex-row">
                      <div class="d-flex align-items-center pe-2">
                      <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3v"
                      value="3" aria-label="..." onChange={handleInputChange} />
                      </div>
                      <div class="rounded border w-100 p-3">
                        <p class="d-flex align-items-center mb-0">
                          <i class="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>Chuyển Khoản
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-6">
                  <div class="row">
                    <div class="col-12 col-xl-6">
                      <div class="form-outline mb-4 mb-xl-5">
                        <input type="text" id="typeName" class="form-control form-control-lg" siez="17" value={tennguoidung}
                          placeholder={iduser.nameUser} onChange={(e) => settennguoidung(e.target.value)}/>
                        <label class="form-label" for="typeName">Tên Người Dùng</label>
                      </div>
                      {atmchusan.map((atmchusan,index) => (
                      <div class="form-outline mb-4 mb-xl-5" key={index}>
                        <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                            minlength="19" maxlength="19" value={atmchusan.nganhang} />
                        <label class="form-label" for="typeText">ATM chủ sân</label>
                      </div>
                      ))} 
                    </div>
                    <div class="col-12 col-xl-6">
                      <div class="form-outline mb-4 mb-xl-5">
                        <input type="text" id="typeText" class="form-control form-control-lg" siez="17" 
                        defaultValue={0} onChange={(e) => settiencoc(e.target.value)}
                        minlength="19" maxlength="19" />
                        <label class="form-label" for="typeText">Tiền Cọc</label>
                      </div>
                      {atm.map((atm,index) => (
                      <div class="form-outline mb-4 mb-xl-5">
                        <input type="text" id="typeSupperText" class="form-control form-control-lg" size="1" minlength="9" maxlength="20" value={atm.nganhang}   onChange={(e) => setamtmy(e.target.value)}/>
                        <label class="form-label" for="typeText">ATM khách hàng</label>
                      </div>
                      ))} 
                    </div>
                    <div class="col-12 col-xl-6">
                      <div class="form-outline mb-4 mb-xl-5">
                        <input type="date" id="typeText" class="form-control form-control-lg" size="1" minlength="9" maxlength="20"  onChange={(e) => setdate(e.target.value)} required
                        />
                        <label class="form-label" for="typeText">Chọn ngày đặt sân</label>
                      </div>
                      <div class="form-outline mb-4 mb-xl-5">
                        <input type="time" id="typeText" class="form-control form-control-lg" siez="17" onChange={(e) => sethour(e.target.value)} required
                            minlength="19" maxlength="19" />
                        <label class="form-label" for="typeText">Chọn giờ đặt sân</label>
                      </div>
                      <div class="form-outline mb-4 mb-xl-5">
                        <input type="time" id="typeText" class="form-control form-control-lg" siez="17" onChange={(e) => setEhour(e.target.value)} required
                            minlength="19" maxlength="19" />
                        <label class="form-label" for="typeText">Chọn giờ Kết Thúc</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-xl-3">
                {product.map((product,index) => (
                  <div class="d-flex justify-content-between" style={{"font-weight": "500"}} key={index} >
                    <p class="mb-2">Tổng tiền sân </p>
                    <p class="mb-2">{product.Gia +price } VND</p>
                  </div>
                      ))} 
                {product.map((product,index) => (
                  <div class="d-flex justify-content-between" style={{"font-weight": "500"}}>
                    <p class="mb-0">Tiền Thuế VAT</p>
                    <p class="mb-0">{product.Gia + product.Gia*0.1}</p>
                  </div>
                  ))} 
                  <hr className="my-4" />
                {product.map((product,index) => (
                  <div class="d-flex justify-content-between mb-4" style={{"font-weight": "500"}}>
                    <p class="mb-2">Tổng phí phải trả </p>
                    <p class="mb-2">{
                    (product.Gia + price +product.Gia +product.Gia*0.1 + 0)
                    } VND</p>
                  </div>
                  ))} 
                  <button type="button" class="btn btn-primary btn-block btn-lg" onClick={handleMain}>
                    <div class="d-flex justify-content-between">
                      <span>Tiến Hành Thanh Toán</span>
                    </div>
                  </button>
                  <a href={`/showhd/${bb}`}>
                  <button type="button" class="btn btn-primary btn-block btn-lg " style={{marginLeft:"9px",marginTop:"1px"}}>
                    <div class="d-flex justify-content-between">
                      <span>Thêm Dịch Vụ</span>
                    </div>
                  </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Cardsanpayment;