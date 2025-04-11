import { HeaderOnly } from '~/components/Layout';
import Home from '~/pages/Home';
import Arena from '~/pages/Arena';
import Login from '../pages/login';
import Register from '../pages/register/register';
import Admanager from '../pages/Admin-Manage-san';
import Admin from '../pages/admin/admin';
import Yarddetails from '~/pages/Yard-details';
import User from '../pages/user/user';
import Fixxedsan from '../pages/Admin-Manager-fixxed';
import Rank from '../pages/Rank-on';
import DetailUser from '../pages/user-review/user-review';
import Sancard from '../pages/Sancardpayment';
import hoadon_manager from '../pages/hoadon_manager';
import hoadon_manager_fixxed from '../pages/hoadon-manager-fixxed';
import cumsanfd from '../pages/cumsan-manage';
import cumsanfdid from '../pages/cumsan-manage-update';
import loaisanfd from '../pages/loaisan-manage';
import hoadonadduyet from '../pages/hoadon-m-ad-fix';
import b from '../pages/loaisan-manage';
import c from '../pages/loaisan-manage-update';
// ----------------------
import one from '../pages/1';
import two from '../pages/2';
import three from '../pages/3';
import four from '../pages/4';
import five from '../pages/5';
import six from '../pages/6';
import seven from '../pages/7';
import eight from '../pages/8';
import nine from '../pages/9';
import ten from '../pages/10';
import elevent from '../pages/11';








const publicRouters = [
    {path: '/', component: Home,layout: HeaderOnly},
    {path: '/Arena', component: Arena, layout: HeaderOnly},
    {path: '/login', component: Login, layout: null},
    {path: '/register', component: Register, layout: null},
    {path: '/admin_update', component: Admin, layout: null},
    {path: '/yarddetails/:id',component: Yarddetails,layout: HeaderOnly},
    {path: '/user', component: User, layout: HeaderOnly},
    {path: '/user/:id',component: DetailUser,layout: HeaderOnly},
    {path: '/adminmanager',component: Admanager,layout: HeaderOnly},
    {path: '/fix/:id',component: Fixxedsan,layout: null},
    {path: '/rank',component: Rank,layout: HeaderOnly},
    {path: '/payment/:id',component: Sancard,layout: HeaderOnly},
    {path: '/showhd',component: hoadon_manager,layout: HeaderOnly},
    {path: '/cumsanfd',component: cumsanfd,layout: HeaderOnly},
    {path: '/cumsanfd/:id',component: cumsanfdid,layout: HeaderOnly},
    {path: '/loaisanfd',component: b,layout: HeaderOnly},
    {path: '/loaisanfd/:id',component: c,layout: HeaderOnly},
    {path: '/hdduyet/:id',component: hoadonadduyet,layout: HeaderOnly},
    {path: '/loaisanfd',component: loaisanfd,layout: HeaderOnly},
    {path: '/showhd/:id',component: hoadon_manager_fixxed,layout: HeaderOnly},
// ------------------------------------------------------------------------
    {path: '/taogiai',component: one,layout: HeaderOnly}, 
    {path: '/taogiai/:id',component: two,layout: HeaderOnly},
    {path: '/duyetgiaidau/:id',component: eight,layout: HeaderOnly},
    {path: '/taodoi',component: three,layout: HeaderOnly},
    {path: '/johnteam',component: four,layout: HeaderOnly},
    {path: '/thachdau/:id',component: five,layout: HeaderOnly},
    {path: '/thachdau/ketqua/:id',component: six,layout: HeaderOnly},
    {path: '/giaidau',component: seven,layout: HeaderOnly},
    {path: '/hienthishowgiaidau',component: nine,layout: HeaderOnly},
    {path: '/showgiaidau/:id',component: ten,layout: HeaderOnly},
    {path: '/Editshowgiaidau/:id',component: elevent,layout: HeaderOnly},

]

const privateRouters = [
]



export {publicRouters,privateRouters}