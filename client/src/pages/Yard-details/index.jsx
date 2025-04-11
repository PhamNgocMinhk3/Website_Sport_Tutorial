import classNames from "classnames/bind";
import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import styles from './Details.module.scss';
import moment from 'moment';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
const cx = classNames.bind(styles)

function Yarddetails(props) {
    const { id } = useParams() || 1;
    const [product, setProduct] = useState([]);
    const [Lich, setLich] = useState([]);
    const [price, setPrice] = useState(0);
    const nowz = new Date();
    const formattedDate = `${nowz.getFullYear()}-${(nowz.getMonth() + 1).toString().padStart(2, '0')}-${nowz.getDate().toString().padStart(2, '0')}`;
    const data = {
        id:id, // hoặc viết tắt là iduser,
        formattedDate
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
        axios.post("http://localhost:3000/san/:id", data).then(response => {
            setProduct(response.data?.result?.recordset || [])
        }).catch(error => {
            console.log(error);
            if (error.code === 401){
                window.location('/home')
            }
        });
    },[]);
    useEffect(() => {
      axios.post("http://localhost:3000/c", data).then(response => {
        setLich(response.data.result.recordset || [])
      }).catch(error => {
          console.log(error);
          if (error.code === 401){
              window.location('/home')
          }
      });
  },[]);
    if (!product) {
        return <div>Loading...</div>;
    }
    return <div className={cx('yarddetails')}>
      {JSON.stringify(Lich)}
        {product.map((product,index) => (
        <section className="bg-light" key={index}>
  <div className="container pb-5" >
    <div className="row">
      <div className="col-lg-5 mt-5">
        <div className="card mb-3">
          <img
            className="card-img img-fluid"
            src={`http://localhost:3000/${product.Logo_1}`}
            alt=""
            id="product-detail"
          />
        </div>
        <div className="row">
          <div className="col-1 align-self-center">
            <a href="#multi-item-example" role="button" data-bs-slide="prev">
              <i className="text-dark fas fa-chevron-left"></i>
              <span className="sr-only"><i className="bi bi-arrow-left"></i></span>
            </a>
          </div>
          <div
            id="multi-item-example"
            className="col-10 carousel slide carousel-multi-item"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner product-links-wap" role="listbox">
            <div className="carousel-item active">
                <div className="row d-flex flex-row" >
            {product.AnhReview.split(',').map((image, index) => (
                  <div className="col-3" key={index}>
                    <a href="#a">
                    <img key={index} src={`http://localhost:3000/${image.replace('public\\images\\', '')}`} alt={image} className="card-img img-fluid" 
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    </a>
                  </div>
              ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7 mt-5">
        <div className="card">
          <div className="card-body">
            <h1 className="color_text">{}</h1>
            <p className="h3 py-2">😍🥰😘</p>
            <p></p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <h3 className="color_text">Tên Sân :</h3>
              </li>
              <li className="list-inline-item">
                <p className="text-muted"><strong>{product.TenSan}</strong></p>
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <h3 className="color_text">Tên Cụm Sân :</h3>
              </li>
              <li className="list-inline-item">
                <p className="text-muted"><strong>{product.TenCumSan}</strong></p>
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <h3 className="color_text">Thời Gian Thành Lập Sân :</h3>
              </li>
              <li className="list-inline-item">
                <p className="text-muted"><strong>{moment(product.Ngaykhoitao).format('DD-MM-YYYY')}</strong></p>
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <h3 className="color_text">Bộ Môn :</h3>
              </li>
              <li className="list-inline-item">
                <p className="text-muted"><strong>{product.Mon}</strong></p>
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <h3 className="color_text">Tình Trạng :</h3>
              </li>
              <li className="list-inline-item">
              {product.TinhTrang === '1' ? (
                <p className="text-muted"><strong>Hoạt Động</strong></p>
                ) : (
                  <p className="text-muted"><strong>Bảo Trì</strong></p>
                )}
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <h3 className="color_text">Trạng Thái:</h3>
              </li>
              <li className="list-inline-item">
              {product.TrangThai === '1' ? (
                <p className="text-muted"><strong>Sân Chưa Được Đặt</strong></p>
                ) : (
                  <p className="text-muted"><strong>Sân Đã Được Thuê</strong></p>
                )}
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <h3 className="color_text">Giá Thuê :</h3>
              </li>
              <li className="list-inline-item">
                <p className="text-muted"><strong>{product.Gia + price}</strong></p>
              </li>
            </ul>
            <h3 className="color_text">Thông Báo:</h3>
            <ul className="list-unstyled pb-3">
              <li>{product.ThongBao}</li>
            </ul>
          {Lich.length > 0 ? (
          Lich.map((product) => {
            const start = new Date(product.GioBatDau);
            const end = new Date(product.GioKetThuc);
            const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
            if (start <= now && end >= now) {
              return (
                <p className="text-muted">
                  <strong>Vui Lòng Chờ Sân Trống</strong>
                </p>
              );
            } 
          })
        ) : (
          <div className="row pb-3">
            <div className="col d-grid">
              <a href={`/payment/${product.ID}`}>
                <button type="submit" className="btn btn-success btn-lg">
                  Click To Order
                </button>
              </a>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      ))} 
    </div>
}

export default Yarddetails;