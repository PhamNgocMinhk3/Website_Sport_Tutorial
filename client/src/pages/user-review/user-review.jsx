import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import  "./User.moudule.scss";
    function DetailUser() {
    const { id } = useParams() || 1;
    console.log(id);
    // const iduser=decoded.idUser;
    const [userData, setUserData] = useState([]);
    const data = {
    iduser: id, // hoặc viết tắt là iduser,
};
useEffect(() => {
    axios.post("http://localhost:3000/getUserprofile", data).then(response => {
        // setUserData(response.data.result.recordset)
        setUserData(response.data?.result?.recordset || [])
    }).catch(error => {
        console.log(error);
        if (error.code === 401){
            window.location('/home')
        }
    });
},[]);
return (
    <div className="container emp-profile">
            <form method="post">
                <div className="row">
                <div className="col-md-3">
                    <div className="profile-img">
                        {userData && userData.length > 0 && userData[0].img ? (
                        <img src={`http://localhost:3000/${userData[0].img}`} alt="" 
                        />
                        ) : (
                        <img src="https://th.bing.com/th/id/OIP.yYZlvvkrtgiFgPKhGUY1EQHaEK?pid=ImgDet&rs=1" alt="" />
                        )}
                    </div>
                </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <label htmlFor="">Name:</label>
                            {userData.map((user,index) => (
                                    <h5>
                                    {user?.name_ten || 'Đoán xem hihi'}
                                    </h5>
                                    ))}
                                    <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Infor</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" >Thách Đấu</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>WORK LINK</p>
                            <a href="#a">Website Link</a><br/>
                            <a href="#a">Bootsnipp Profile</a><br/>
                            <a href="#a">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="#a">Web Designer</a><br/>
                            <a href="#a">Web Developer</a><br/>
                            <a href="#a">WordPress</a><br/>
                            <a href="#a">WooCommerce</a><br/>
                            <a href="#a">PHP, .Net</a><br/>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {userData.map((user,index) => (
                                        <div key={index}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Tên :</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{user.name_ten}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>CCCD/CMND :</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{user.CardId}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-md-6">
                                                <label>Mô tả bản thân :</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.Describe}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>ATM :</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.ATM}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Thành tích :</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.thanhtich}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Ngày sinh :</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{moment(user.birtday).format('DD-MM-YYYY')}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Cấp độ :</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.cap}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>
                                                    Địa chỉ :</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.diachi}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Điểm elo :</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.elopoint}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Số điện thoại :</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>0{user.sdt}</p>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>10$/hr</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Total Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>230</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>English Level</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
    );
}

export default DetailUser;