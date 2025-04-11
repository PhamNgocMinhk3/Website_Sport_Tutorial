import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

// import { useHistory } from "react-router-dom";
const cx = classNames.bind(styles);

function Header() {
const cookie = Cookies.get('token');
// const history = useHistory();
if (cookie){
    var tokenValue = Cookies.get('token');
    var decoded = jwt_decode(tokenValue) || 0;
}
function handleLogout() {
Cookies.remove("token");
window.location.href="/login";
//   history.push("/login");
}

return (
    <header className={cx('wrapper')}>
<div className={cx('inner')}>
        <div className={cx('logo')}></div>
            <div className={cx('menu')}>
            <ul className={cx('menu-list')}>
                <li className={cx('menu-item')}>
                <a className={cx('menu-item-link')} href="/">
                    Trang chủ
                </a>
                </li>
                {/* <li className={cx('menu-item')}>
                <a className={cx('menu-item-link')} href="/taogiai">
                    Thách đấu
                </a>
                </li> */}
                <li className={cx('menu-item')}>
                <a className={cx('menu-item-link')} href="/Arena">
                    Sân đấu
                </a>
                </li>
                <li className={cx('menu-item')}>
                <a className={cx('menu-item-link')} href="/hienthishowgiaidau">
                    Giải đấu
                </a>
                </li>
                <li className={cx('menu-item')}>
                <a className={cx('menu-item-link')} href="/giaidau">
                    Tham Gia giải
                </a>
                </li>
                <li className={cx('menu-item')}>
                <a className={cx('menu-item-link')} href="/taogiai">
                    Tạo Giải
                </a>
                </li>
                <li className={cx('menu-item')}>
                <a className={cx('menu-item-link')} href="/taodoi">
                    Tạo Đội
                </a>
                </li>
                <li className={cx('menu-item')}>
                <a className={cx('menu-item-link')} href="/rank">
                    Bảng xếp hạng
                </a>
                </li>
            </ul>
            {cookie ? (
                <nav className="navbar navbar-expand-lg ml-12">
                    <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle d-flex align-items-center"
                            href="#a"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                            className="rounded-circle"
                            height="22"
                            alt="Avatar"
                            loading="lazy"
                            />
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuLink"
                            data-bs-popper="static"
                        >
                            <li>
                            <a className="dropdown-item" href="/user">
                                My profile
                            </a>
                            </li>
                            <li>
                            <p
                                className="dropdown-item"
                                onClick={handleLogout}
                            >
                                Logout
                            </p>
                            </li>
                            {decoded.idUser === Number(1) ? (
                                <li>
                                <a className="dropdown-item" href="/adminmanager">
                                    Admin manager
                                </a>
                                <a className="dropdown-item" href="/showhd">
                                    Hiển thị hóa đơn
                                </a><a className="dropdown-item" href="/cumsanfd">
                                    Sửa cụm sân
                                </a><a className="dropdown-item" href="/loaisanfd">
                                    Sửa Loại sân
                                </a>
                                </li>
                                ):(
                                    <li>
                                    <a className="dropdown-item" href="#a">
                                        Bạn không đủ quyền
                                    </a>
                                    </li>
                                )}
                        </ul>
                        </li>
                    </ul>
                    </div>
            </nav>
            ) : (
                <ul className={cx('menu-list')}>
                <li className={cx('menu-item')}>
                    <a className={cx('menu-item-link')} href="/register">
                    Đăng ký
                    </a>
                </li>
                <li className={cx('menu-item')}>
                    <a className={cx('menu-item-link')} href="/login">
                    Đăng nhập
                    </a>
                </li>
                </ul>
            )}
            </div>
        </div>
        </header>
    );
}

export default Header;