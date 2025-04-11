const { json } = require('express');
var express = require('express');
const moment = require('moment');
var jwt = require('jsonwebtoken');
var router = express.Router();
const sql = require("../dboperation");
const multer = require('multer');
const path = require('path');
var {pool} = require("../dbconfig");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const date = Date.now().toString();
    cb(null,date+path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
var mssql = require("mssql");
var {pool} = require("../dbconfig");
const { RFC_2822 } = require('moment');
const { Server } = require('http');
const { log } = require('console');

/* GET home page. */



router.get('/',upload.none(), function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/b',upload.none(),async function(req, res, next) {
  try {
    await pool.connect();
    const result = await pool 
      .request()
      .input('id', mssql.Int, +(req.body.id))
      .query(`
      SELECT TOP (100) PERCENT MaSan, MaHD
      FROM   dbo.SuDungSan
      WHERE (MaSan = @id)
      GROUP BY MaSan, MaHD
      ORDER BY MaHD DESC
      `);
      const data = result;
        if (result) {
      res.json({
        result : data,
      });
    } 
  } catch (error) {
    res.status(500);
  }});
router.post('/getgiaidau',upload.none(),async function(req, res, next) {
    try {
      await pool.connect();
      const result = await pool 
        .request()
        .input('id', mssql.Int, +(req.body.id))
        .query(`
        SELECT dbo.GiaiDau.MaGD, dbo.GiaiDau.MaBTC, dbo.GiaiDau.Ten, dbo.GiaiDau.TheLe, dbo.GiaiDau.SoLuong, dbo.GiaiDau.PhanThuong, dbo.GiaiDau.BoMon, dbo.NoiDung.MaNoiDung
FROM   dbo.GiaiDau INNER JOIN
            dbo.NoiDung ON dbo.GiaiDau.MaGD = dbo.NoiDung.MaGD
        WHERE (MaBTC = @id)
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
    }});
    
    
router.post('/updatedtrandau',upload.none(),async function(req, res, next) {
  try {
    await pool.connect();
    const result = await pool 
      .request()
      .input('id', mssql.Int, +(req.body.Matd))
      .input('win1', mssql.Int, +(req.body.win1))
      .input('win2', mssql.Int, +(req.body.win2))
      .query(`
      update TranDau
set Ketqua1 = @win1, Ketqua2 = @win2
Where MaTD = @id
      `);
      const data = result;
        if (result) {
      res.json({
        message:"success",
        result : data
      });
    } 
  } catch (error) {
    res.status(500);
  }});
// ---
  router.post('/getshowtrandau',upload.none(),async function(req, res, next) {
    try {
      await pool.connect();
      const result = await pool 
        .request()
        .input('id', mssql.Int, +(req.body.id))
        .query(`
        SELECT dbo.KieuThiDau.Ten, dbo.GiaiDau.Ten AS namegiaidau, dbo.GiaiDau.TheLe, dbo.GiaiDau.SoLuong, dbo.GiaiDau.PhanThuong, dbo.GiaiDau.BoMon, dbo.NoiDung.Ten AS tennoidung, dbo.NoiDung.NgayBatDau, dbo.NoiDung.NgayKetThuc, dbo.NoiDung.HinhThuc, 
              dbo.TranDau.MaPlayer1, dbo.TranDau.MaPlayer2, dbo.TranDau.ThoiGian, dbo.TranDau.SanDau, dbo.TranDau.SoThuTu, dbo.TranDau.Ketqua1, dbo.TranDau.Ketqua2, dbo.TranDau.MaTD
FROM   dbo.GiaiDau INNER JOIN
              dbo.NoiDung ON dbo.GiaiDau.MaGD = dbo.NoiDung.MaGD INNER JOIN
              dbo.KieuThiDau ON dbo.NoiDung.MaKieuThiDau = dbo.KieuThiDau.MaKieuThiDau INNER JOIN
              dbo.TranDau ON dbo.NoiDung.MaNoiDung = dbo.TranDau.MaNoiDung
WHERE (dbo.TranDau.MaTD = @id)
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
    }});

    router.get('/gettrandauht',upload.none(),async function(req, res, next) {
      try {
        await pool.connect();
        const result = await pool 
          .request()
          .query(`
          SELECT dbo.TranDau.ThoiGian, dbo.TranDau.SanDau, dbo.TranDau.MaTD, dbo.NoiDung.NgayBatDau, dbo.NoiDung.NgayKetThuc, dbo.NoiDung.HinhThuc, dbo.GiaiDau.Ten, dbo.GiaiDau.BoMon
FROM   dbo.TranDau INNER JOIN
              dbo.NoiDung ON dbo.TranDau.MaNoiDung = dbo.NoiDung.MaNoiDung INNER JOIN
              dbo.GiaiDau ON dbo.NoiDung.MaGD = dbo.GiaiDau.MaGD
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});

    router.get('/gettrandautt',upload.none(),async function(req, res, next) {
      try {
        await pool.connect();
        const result = await pool 
          .request()
          .query(`
          SELECT MaTD, MaPlayer1, MaPlayer2, ThoiGian, SanDau, SoThuTu, Ketqua1, Ketqua2
          FROM   dbo.TranDau
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});
    router.get('/usertt',upload.none(),async function(req, res, next) {
      try {
        await pool.connect();
        const result = await pool 
          .request()
          .query(`
          select name_ten,MA_Taikhoang from ThongTin_TK
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});
    router.get('/san',upload.none(),async function(req, res, next) {
      try {
        await pool.connect();
        const result = await pool 
          .request()
          .query(`
          select TenSan,MaSan from San
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});



router.get('/mon',upload.none(),async function(req, res, next) {
    try {
      await pool.connect();
      const result = await pool 
        .request()
        .query(`
        SELECT Mon
        FROM   dbo.LoaiSan
        GROUP BY Mon
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
    }});
router.get('/getdktd',upload.none(),async function(req, res, next) {
      try {
        await pool.connect();
        const result = await pool 
          .request()
          .query(`
SELECT MaDk, MaPlayer, NgayDangKi, MaNoiDung
FROM   dbo.DangKiThiDau
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});
router.post('/updatedketquadau',upload.none(),async function(req, res, next) {
  try {
    await pool.connect();
    const result = await pool 
      .request()
      .input('id', mssql.Int, +(req.body.idmatrandau))
      .input('kq1', mssql.Int, +(req.body.ketqua1))
      .input('kq2', mssql.Int, +(req.body.ketqua2))
      .query(`
    update ThachDau
    set KetQuaNguoiTD=@kq1 , KetQuaNguoiDuocTD = @kq2
    where MaThachDau = @id
      `);
      const data = result;
        if (result) {
      res.json({
        message:"success",
        result : data,
      });
    } 
  } catch (error) {
    res.status(500);
  }});
router.post('/updatedktd',upload.none(),async function(req, res, next) {
    try {
      await pool.connect();
      const result = await pool 
        .request()
        .input('id', mssql.Int, +(req.body.id))
        .input('maid', mssql.Int, +(req.body.idupdate))
        .input('datetime', mssql.DateTime, req.body.datetime)
        .query(`
update DangKiThiDau
set MaNguoiDuyet= @maid , NgayDuyet = @datetime, KetQua = 1
where MaDk=@id
        `);
        const data = result;
          if (result) {
        res.json({
          message:"success",
          result : data,
        });
      } 
    } catch (error) {
      res.status(500).json(error);
    }});
router.get('/getgiaidauthongtin',upload.none(),async function(req, res, next) {
    try {
      await pool.connect();
      const result = await pool 
        .request()
        .query(`
        SELECT dbo.NoiDung.MaNoiDung, dbo.NoiDung.Ten, dbo.NoiDung.NgayBatDau, dbo.NoiDung.NgayKetThuc, dbo.NoiDung.HinhThuc, dbo.GiaiDau.Ten AS Expr1, dbo.GiaiDau.TheLe, dbo.GiaiDau.SoLuong, dbo.GiaiDau.PhanThuong, dbo.GiaiDau.BoMon
FROM   dbo.GiaiDau INNER JOIN
            dbo.NoiDung ON dbo.GiaiDau.MaGD = dbo.NoiDung.MaGD
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
    }});
router.post('/getthachdau',upload.none(),async function(req, res, next) {
      try {
        await pool.connect();
        const result = await pool 
          .request()
          .input('id', mssql.Int, +(req.body.id))
          .query(`
          SELECT dbo.ThachDau.*
          FROM   dbo.ThachDau
          WHERE (NguoiThachDau = @id)
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});
router.get('/kieuthidau',upload.none(),async function(req, res, next) {
      try {
        await pool.connect();
        const result = await pool 
          .request()
          .query(`
          select * from KieuThiDau
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});
    
router.post('/e',upload.none(),async function(req, res, next) {
    try {
      await pool.connect();
      const result = await pool 
        .request()
        .input('id', mssql.Int, +(req.body.id))
        .query(`
        SELECT Mon
FROM   dbo.LoaiSan
GROUP BY Mon
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
    }});
router.post('/phonglol',upload.none(),async function(req, res, next) {
      try {
        // console.log(req.body);
        const Startdate = new Date(req.body.ngaybd).toLocaleString();
        const Enddate = new Date(req.body.ngaykt).toLocaleString();
        // console.log(Startdate,Enddate);
        await pool.connect();
        const result = await pool 
          .request()
          .input('id', mssql.Int, +(req.body.id))
          .input('Tinhtrang',mssql.NVarChar,req.body.Tinhtrang)
          .input('hinhthuc',mssql.NVarChar,req.body.hinhthuc)
          .input('kieuthi',mssql.NVarChar,req.body.kieuthi)
          .input('ngaybd',mssql.Date,req.body.ngaybd)
          .input('ngaykt',mssql.Date,req.body.ngaykt)
          .input('tennd',mssql.NVarChar,req.body.tennd)

          .query(`
          insert into NoiDung(Ten,MaGD,MaKieuThiDau,NgayBatDau,NgayKetThuc,TinhTrang,HinhThuc) values(@tennd,@id,@kieuthi,@ngaybd,@ngaykt,@Tinhtrang,@hinhthuc)
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
            message:"success"
          });
        } 
      } catch (error) {
        res.status(500);
      }});
router.post('/c', upload.none(), async function(req, res, next) {
    try {
      const formattedDate = moment.utc(req.body.formattedDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
      // console.log(formattedDate);
      const id = parseInt(req.body.id); // Use parseInt with a radix to convert string to integer
      await pool.connect();
      const result = await pool 
      .request()
        .input('id', mssql.Int, id)
        // .input('formattedDate', mssql.DateTime, formattedDate)
        .query(`
          SELECT TOP (100) PERCENT MaSan, NgayDatSan, GioBatDau, GioKetThuc
          FROM dbo.SuDungSan
          WHERE (MaSan = @id) AND (NgayDatSan = CONVERT(datetime, '${formattedDate}', 120))
        `);
      const data = result;
      res.json({
        result: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  });
//test connection
router.get('/sanA',upload.none(),  async function (req, res, next) {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`
      SELECT dbo.San.Logo_1, dbo.San.TenSan, dbo.LoaiSan.TenLoaiSan, dbo.CumSan.TenCumSan, dbo.San.MaSan AS ID
      FROM   dbo.San INNER JOIN
                  dbo.CumSan ON dbo.San.MaCS = dbo.CumSan.MaCumSan INNER JOIN
                  dbo.LoaiSan ON dbo.San.MaLoaiSan = dbo.LoaiSan.MaLoaiSan
      `);
      const data = result;
        if (result) {
      res.json({
        result : data,
      });
    } 
  } catch (error) {
    res.status(500);
  }});
  router.post('/updatetrandau',upload.none(),  async function (req, res, next) {
    try {
      let hour = req.body.time;
          if (hour.length === 5) {
              hour = `${hour}:00`;
          }
          const hbd = new Date(`1970-01-01T${hour}.000Z`);
      await pool.connect();
      const result = await pool
        .request()
        .input('idnd', mssql.Int, +(req.body.idnd))
        .input('id1', mssql.Int, +(req.body.id1))
        .input('id2', mssql.Int, +(req.body.id2))
        .input('time', mssql.DateTime, hbd)
        .input('stt', mssql.Int, +(req.body.stt))
        .input('idsan', mssql.Int, +(req.body.idsan))
        .query(`
        insert into TranDau(MaNoiDung,MaPlayer1,MaPlayer2,ThoiGian,SanDau,SoThuTu) 
        values (@idnd,@id1,@id2,@time,@idsan,@stt)
        `);
        const data = result;
          if (result) {
        res.json({
          message:"sucess",
          result : data
        });
      } 
    } catch (error) {
      res.status(500).json(error);
}});

router.post('/atmchusan',upload.none(),  async function (req, res, next) {
    try {
      await pool.connect();
      const result = await pool
        .request()
        .input('id', mssql.Int, +(req.body.id))
        .query(`
        SELECT dbo.ThongTin_TK.nganhang, dbo.San.MaSan
        FROM   dbo.ThongTin_TK INNER JOIN
                    dbo.NguoiQuanLi ON dbo.ThongTin_TK.MA_Taikhoang = dbo.NguoiQuanLi.MaNguoiQL INNER JOIN
                    dbo.San ON dbo.NguoiQuanLi.MaNguoiQL = dbo.San.Manguoitao
        GROUP BY dbo.ThongTin_TK.nganhang, dbo.ThongTin_TK.MA_Taikhoang, dbo.San.Manguoitao, dbo.San.MaSan
        HAVING (dbo.San.MaSan = @id)
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
}});
router.post('/creategiaidau',upload.none(),  async function (req, res, next) {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input('id', mssql.Int, +(req.body.id))
      .input('soluong', mssql.Int, +(req.body.soluong))
      .input('tengd', mssql.NVarChar, req.body.tengd)
      .input('thele', mssql.NVarChar, req.body.thele)
      .input('phanthuong', mssql.NVarChar, req.body.phanthuong)
      .input('bomon', mssql.NVarChar, req.body.bomon)
      .query(`
      insert into GiaiDau( MaBTC, Ten, TheLe, SoLuong, PhanThuong, BoMon) values (@id,@tengd,@thele,@soluong,@phanthuong,@bomon)
      `);
      const data = result;
        if (result) {
      res.json({
        result : data,
        message:"success"
      });
    } 
  } catch (error) {
    res.status(500);
}});
router.post('/atmc', upload.none(), async function (req, res, next) {
  try {
    const token = req.body.token;
    let decoded = null;
    // Giải mã token và lưu trữ giá trị `decoded` vào biến
    jwt.verify(token, 'mk', (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      decoded = result;
    });
    // Nếu biến `decoded` có giá trị, sử dụng nó trong truy vấn cơ sở dữ liệu
    if (decoded) {
      await pool.connect();
      const result = await pool
        .request()
        .input('id', mssql.Int, decoded.idUser)
        .query(`
          SELECT nganhang
          FROM dbo.ThongTin_TK
          WHERE (MA_Taikhoang = @id)
        `);

      if (result) {
        res.json({
          result: result.recordset,
        });
      }
    }
  } catch (error) {
    res.status(500);
  }
});
router.get('/rank',upload.none(),  async function (req, res, next) {
    try {
      await pool.connect();
      const result = await pool
        .request()
        .query(`
        SELECT TOP (100) PERCENT [elo-diem] AS point, name_ten, img, [Nghề Nghiệp] AS nghe, MA_Taikhoang
        FROM   dbo.ThongTin_TK
        GROUP BY [elo-diem], name_ten, img, [Nghề Nghiệp], MA_Taikhoang
        ORDER BY point DESC
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
    }});
router.post('/san/:id',upload.none(),  async function (req, res, next) {
    try {
      // console.log(req.body.id);
      await pool.connect();
      const result = await pool
        .request()
        .input('id', mssql.Int, +(req.body.id))
        .query(`
        SELECT dbo.San.Logo_1, dbo.San.TenSan, dbo.CumSan.TenCumSan, dbo.San.MaSan AS ID, dbo.LoaiSan.Mon, dbo.San.TrangThai, dbo.San.MaLoaiSan, dbo.San.MaCS, dbo.San.ThongBao, dbo.San.TinhTrang, dbo.San.AnhReview, dbo.San.Ngaykhoitao, dbo.San.Gia, dbo.CumSan.MaCumSan, 
        dbo.LoaiSan.TenLoaiSan
FROM   dbo.San INNER JOIN
        dbo.CumSan ON dbo.San.MaCS = dbo.CumSan.MaCumSan INNER JOIN
        dbo.LoaiSan ON dbo.San.MaLoaiSan = dbo.LoaiSan.MaLoaiSan
WHERE (dbo.San.MaSan = @id)
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) { 
      console.log(error);
      res.status(500);
    }});
router.post('/sddichvu',upload.none(),  async function (req, res, next) {
      try {
        // console.log(req.body.id);
        await pool.connect();
        const result = await pool
          .request()
          .input('id', mssql.Int, +(req.body.id))
          .query(`
          SELECT dbo.SuDungDichVu.MaSuDungDichVu, dbo.SuDungDichVu.MaDichVu, dbo.SuDungDichVu.SoLuong, dbo.SuDungDichVu.DonGia, dbo.SuDungDichVu.TinhTrang, dbo.SuDungDichVu.MaSDSan, dbo.DichVu.TenDichVu
FROM   dbo.SuDungDichVu INNER JOIN
              dbo.DichVu ON dbo.SuDungDichVu.MaDichVu = dbo.DichVu.MaDichVu
WHERE (dbo.SuDungDichVu.MaSDSan = @id)
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) { 
        console.log(error);
        res.status(500);
      }});
router.post('/update-sdsan', upload.none(), async function (req, res, next) {
      try {
        const hkt = moment.utc(req.body.hkt, 'HH:mm:ss').format('HH:mm:ss');
        const gioKetThuc = new Date(`1970-01-01T${hkt}.000Z`);
        await pool.connect();
        const result = await pool
          .request()
          .input('id', mssql.Int, +(req.body.id))
          .input('tts', mssql.Int, +(req.body.tts))
          .input('htthanhtoan', mssql.Int, +(req.body.htttoan))
          .input('kht', mssql.Time, gioKetThuc)
          .query(`
            UPDATE SuDungSan
            SET Hinhthucthanhtoan = @htthanhtoan,
                GioKetThuc = @kht,
                TinhTrang=@tts
            WHERE MaHD = @id
          `);
        if (result) {
          res.json({
            result: result,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500);
      }
    });
router.post('/sumsddv', upload.none(), async function (req, res, next) {
      try {;
        await pool.connect();
        const result = await pool
          .request()
          .input('id', mssql.Int, +(req.body.id))
          .query(`
          SELECT SUM(DonGia) AS sum
          FROM   dbo.SuDungDichVu
          WHERE (MaSDSan = @id)
          `);
        if (result) {
          res.json({
            result: result,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500);
      }
    });
router.post('/update-sddichvu', upload.none(), async function (req, res, next) {
      try {
        const maHD = req.body.id;
        const maDichVu = req.body.maDichVu;
        const soLuong = req.body.soLuong;
        const giatong = req.body.giatong;
        const ttdv = req.body.ttdv;
        await pool.connect();
        const transaction = pool.transaction();
        try {
          await transaction.begin();
          for (let i = 0; i < maDichVu.length; i++) {
            await transaction
              .request()
              .input('maHD', mssql.Int, +(maHD))
              .input('maDichVu', mssql.Int, +(maDichVu[i]))
              .input('soLuong', mssql.Int, +(soLuong[i]))
              .input('giatong', mssql.Int, +(giatong[i]))
              .input('ttdv', mssql.Int, +(ttdv))
              .input('date', mssql.DateTime, req.body.date)
              .query(`
              insert into SuDungDichVu(MaDichVu,Ngay,SoLuong,DonGia,TinhTrang,MaSDSan) values (@maDichVu,@date,@soLuong,@giatong,@ttdv,@maHD)
            `);
          }
          await transaction.commit();
          res.json({ message: 'Insert success' });
        } catch (error) {
          console.log(error);
          await transaction.rollback();
          res.status(500);
        }
      } catch (error) {
        console.log(error);
        res.status(500);
      }
    });
router.post('/sdsan/id',upload.none(),  async function (req, res, next) {
      try {
        // console.log(req.body.id);
        await pool.connect();
        const result = await pool
          .request()
          .input('id', mssql.Int, +(req.body.id))
          .query(`
          SELECT MaHD, MaSan, NgayDatSan, GioBatDau, Tongcong, TienCoc, TinhTrang, Hinhthucthanhtoan, GioKetThuc, MaKhachHang
FROM   dbo.SuDungSan
WHERE (MaHD = @id)
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) { 
        res.status(500);
      }});
router.post('/fixhd/id',upload.none(),  async function (req, res, next) {
        try {
          // console.log(req.body.id);
          await pool.connect();
          const result = await pool
            .request()
            .input('id', mssql.Int, +(req.body.id))
            .query(`
            SELECT dbo.NguoiQuanLi.MaNguoiQL, dbo.SuDungSan.MaSan, dbo.SuDungSan.NgayDatSan, dbo.SuDungSan.GioBatDau, dbo.SuDungSan.Hinhthucthanhtoan, dbo.SuDungSan.TinhTrang, dbo.SuDungSan.MaHD, dbo.SuDungSan.GioKetThuc, dbo.SuDungSan.MaKhachHang, 
            dbo.ThongTin_TK.sdt, dbo.SuDungDichVu.tongtienall, dbo.SuDungSan.TienCoc, dbo.San.Gia
FROM   dbo.SuDungSan INNER JOIN
            dbo.San ON dbo.SuDungSan.MaSan = dbo.San.MaSan INNER JOIN
            dbo.CumSan ON dbo.San.MaCS = dbo.CumSan.MaCumSan INNER JOIN
            dbo.NguoiQuanLi ON dbo.CumSan.MaNguoiQL = dbo.NguoiQuanLi.MaNguoiQL INNER JOIN
            dbo.ThongTin_TK ON dbo.SuDungSan.MaKhachHang = dbo.ThongTin_TK.MA_Taikhoang INNER JOIN
            dbo.SuDungDichVu ON dbo.SuDungSan.MaHD = dbo.SuDungDichVu.MaSDSan
GROUP BY dbo.NguoiQuanLi.MaNguoiQL, dbo.SuDungSan.MaSan, dbo.SuDungSan.NgayDatSan, dbo.SuDungSan.GioBatDau, dbo.SuDungSan.Hinhthucthanhtoan, dbo.SuDungSan.TinhTrang, dbo.SuDungSan.MaHD, dbo.SuDungSan.GioKetThuc, dbo.SuDungSan.MaKhachHang, 
            dbo.ThongTin_TK.sdt, dbo.SuDungDichVu.tongtienall, dbo.SuDungSan.TienCoc, dbo.San.Gia
HAVING (dbo.SuDungSan.MaHD = @id)
            `);
            const data = result;
              if (result) {
            res.json({
              result : data,
            });
          } 
        } catch (error) { 
          res.status(500);
        }});
router.post('/updatefixhd', async function (req, res, next) {
          try {
            // console.log(req.body);
            const id = req.body.id;
            const htttoan = req.body.htttoan;
            const tiencoc = req.body.tiencoc;
            const tinhtrang = req.body.tinhtrang;
            const tongtien = req.body.tongtien;
            // console.log(id,htttoan,tiencoc,tinhtrang,tongtien);
            await pool.connect();
            const result = await pool
              .request()
              .input('id', mssql.Int, +(id))
              .input('TienCoc', mssql.Money, tiencoc)
              .input('TinhTrang', mssql.NVarChar, tinhtrang)
              .input('Hinhthucthanhtoan', mssql.Int, +(htttoan))
              .input('tongtienall', mssql.Money, tongtien)
              .query(`
              uphd @TienCoc,@TinhTrang,@Hinhthucthanhtoan,@id,@tongtienall
              `);
            // console.log(result);
            // console.log(id,htttoan,tiencoc,tinhtrang,tongtien);
            res.json({
              message: 'Data updated successfully',
              result: result,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: 'Error occurred while updating data',
              error: error.message,
            });
          }
        });
router.post('/upsddv/id',upload.none(),  async function (req, res, next) {
        try {
          await pool.connect();
          const result = await pool
            .request() 
            .input('id', mssql.Int, +(req.body.msddv))
            // .input('tientra', mssql.Money, req.body.minimoney|| 0)
            .input('tiensan', mssql.Money, req.body.tiensan)
            .input('tiensdsan', mssql.Money, req.body.tiensdsan)
            .input('sl', mssql.Int, +(req.body.sl))
            .input('dongia', mssql.Money, req.body.dongia)
            .input('madv', mssql.Int, +(req.body.mdv))
            .input('MaSDSan', mssql.Int, +(req.body.MaSDSan))
            .query(`
            update SuDungDichVu set MaDichVu =@madv,SoLuong=@sl,DonGia=@dongia where MaSuDungDichVu=@id
            UPDATE SuDungDichVu
            SET tongtienall =  (SELECT SUM(DonGia)  FROM SuDungDichVu where MaSDSan=@MaSDSan) + @tiensdsan
            WHERE MaSuDungDichVu IN (select MaSuDungDichVu from SuDungDichVu  where MaSDSan=@MaSDSan);
            `);
            const data = result;
              if (result) {
            res.json({
              message:"success"
            });
          } 
        } catch (error) { 
          res.status(500);
        }});
router.post('/deletesddv/id',upload.none(),  async function (req, res, next) {
          try {
            await pool.connect();
            const result = await pool
              .request()
              .input('id', mssql.Int, +(req.body.maSuDungDichVu))
              .input('s', mssql.Int, +(req.body.id))
              .input('tiensdsan',mssql.Money,req.body.tiensdsan)
              .query(`
              UPDATE SuDungDichVu
            SET tongtienall =  (SELECT SUM(DonGia)  FROM SuDungDichVu where MaSDSan=@s) - (SELECT DonGia  FROM SuDungDichVu where MaSuDungDichVu = @id) + @tiensdsan
            WHERE MaSuDungDichVu IN (select MaSuDungDichVu from SuDungDichVu  where MaSDSan=@s);
            DELETE FROM SuDungDichVu WHERE MaSuDungDichVu=@id;
              `);
              const data = result;
                if (result) {
              res.json({
                message:"success"
              });
            } 
          } catch (error) { 
            res.status(500);
          }});
router.post('/payment/id',upload.none(),  async function (req, res, next) {
      try {
          const token = req.body.token;
          let decoded = null;
          jwt.verify(token, 'mk', (err, result) => {
            if (err) {
              console.log(err);
              return res.sendStatus(403);
            }
            decoded = result;
          });
          
          const masan = Number(req.body.masan);
          const tongcong = Number(req.body.gia);
          const tiencoc = Number(req.body.tiencoc);
          const hinhthucthanhtoan = Number(req.body.hinhthucthanhtoan);
          const date = new Date(req.body.date).toLocaleString();
          let hour = req.body.hour;
          if (hour.length === 5) {
              hour = `${hour}:00`;
          }
          const hbd = new Date(`1970-01-01T${hour}.000Z`);

          let Ehour = req.body.Ehour;
          if (Ehour.length === 5) {
              Ehour = `${Ehour}:00`;
          }
          const Ehbd = new Date(`1970-01-01T${Ehour}.000Z`);
          
          await pool.connect();
          const result = await pool
              .request()
              .input('id', mssql.Int, decoded.idUser)
              .input('masan', mssql.Int, masan)
              .input('date', mssql.Date, date)
              .input('hbd', mssql.Time, hbd)
              .input('Ehbd', mssql.Time, Ehbd)
              .input('tongcong', mssql.Money, tongcong)
              .input('tiencoc', mssql.Money, tiencoc)
              .input('hinhthucthanhtoan', mssql.Int, hinhthucthanhtoan)
              .query(`
                  INSERT INTO SuDungSan(MaSan, MaKhachHang, NgayDatSan, GioBatDau, Tongcong, TienCoc, Hinhthucthanhtoan,GioKetThuc)
                  VALUES (@masan, @id, @date, @hbd, @tongcong, @tiencoc, @hinhthucthanhtoan,@Ehbd)
              `);
  
          if (result.rowsAffected[0] > 0) {
              res.json({
                  result: result.recordset,
              });
          } else {
              res.sendStatus(400);
          }
      } catch (error) { 
          res.sendStatus(500);
      }
  });
router.get('/dichvu',upload.none(),  async function (req, res, next) {
      try {
        // console.log(req.body.id);
        await pool.connect();
        const result = await pool
          .request()
          .query(`
          SELECT MaDichVu, TenDichVu, Gia, DonViTinh
          FROM   dbo.DichVu
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) { 
        res.status(500);
      }});
router.get('/loaisan',upload.none(),  async function (req, res, next) {
    try {
      await pool.connect();
      const result = await pool
        .request()
        .query(`
        SELECT MaLoaiSan, TenLoaiSan, Mon
        FROM   dbo.LoaiSan
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
    }});
router.get('/trongtai',upload.none(),  async function (req, res, next) {
      try {
        await pool.connect();
        const result = await pool
          .request()
          .query(`
          SELECT MA_Taikhoang, name_ten, [Nghề Nghiệp]
FROM   dbo.ThongTin_TK
WHERE ([Nghề Nghiệp] = N'Trọng Tài')
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});
router.get('/cumsan',upload.none(),  async function (req, res, next) {
    try {
      await pool.connect();
      const result = await pool
        .request()
        .query(`
        SELECT MaCumSan , TenCumSan
        FROM   dbo.CumSan
        `);
        const data = result;
          if (result) {
        res.json({
          result : data,
        });
      } 
    } catch (error) {
      res.status(500);
    }});
router.get('/team',upload.none(),async function(req, res, next) {
      try {
        await pool.connect();
        const result = await pool 
          .request()
          .query(`
          SELECT COUNT(dbo.ChiTietDoi.MaPlayer) AS SL, dbo.Player.Ten, dbo.ChiTietDoi.MaDoi
FROM   dbo.ChiTietDoi INNER JOIN
          dbo.Player ON dbo.ChiTietDoi.MaPlayer = dbo.Player.MaPlayer
GROUP BY dbo.Player.Ten, dbo.ChiTietDoi.MaDoi, dbo.Player.Chuteam
HAVING (dbo.Player.Chuteam = 1)
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});  
router.get('/getsl',upload.none(),  async function (req, res, next) {
      try {
        await pool.connect();
        const result = await pool
          .request()
          .query(`
          SELECT COUNT(dbo.ChiTietDoi.MaPlayer) AS [SL], dbo.ChiTietDoi.MaDoi
FROM   dbo.ChiTietDoi INNER JOIN
              dbo.Player ON dbo.ChiTietDoi.MaPlayer = dbo.Player.MaPlayer
GROUP BY dbo.ChiTietDoi.MaDoi
          `);
          const data = result;
            if (result) {
          res.json({
            result : data,
          });
        } 
      } catch (error) {
        res.status(500);
      }});
router.post("/update-loaisan",upload.none(),async  function (req, res, next) {
    try {
      const {uploaisan,uploaisangia,uploaisanbomon} = req.body;
      await pool.connect();
      const result = await pool
        .request()
        .input('bomon', mssql.NVarChar, uploaisanbomon)
        .input('gia', mssql.Int, uploaisangia)
        .input('name', mssql.NVarChar, uploaisan)
        .query(`
        insert into LoaiSan(TenLoaiSan,Mon,Gia) values(@name,@bomon,@gia)
        `,
        (err, result) => {
          if (err) console.log(err);
          res.json({ message:'thành công cmnr' });
        }
        );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }});
router.post("/deletedsan",upload.none(),async function (req, res, next) {
      try {
        const id = req.body.maSan;
        console.log(id);
        await pool.connect();
        const result = await pool
          .request()
          .input('id', mssql.Int, +(id))
          .query(`
            DELETE FROM san WHERE MaSan =@id;
          `,
          (err, result) => {
            if (err) console.log(err);
            res.json({ message:'thành công cmnr' });
          }
        );
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    });
router.post("/update-cumsan",upload.none(),async  function (req, res, next) {
      try {
        const {upcumsanidnql,upcumsanten,upcumsantinhtrang} = req.body;
        await pool.connect();
        const result = await pool
          .request()
          .input('manguoiql', mssql.Int, upcumsanidnql)
          .input('tencumsan', mssql.NVarChar, upcumsanten)
          .input('tinhtrang', mssql.NVarChar, upcumsantinhtrang)
          .query(`
          insert into CumSan(MaNguoiQL,TenCumSan,TinhTrang) values(@manguoiql,@tencumsan,@tinhtrang)
          `,
          (err, result) => {
            if (err) console.log(err);
            res.json({ message:'thành công cmnr' });
          }
          );
      } catch (error) {
        res.status(500).json({ message: error.message });
      }});
router.post("/getUserprofile", upload.none(), async function (req, res, next) {
  try {
    const { iduser} = req.body
    await pool.connect();
      const result = await pool
        .request()
        .input('iduser',mssql.Int,+(iduser))
        .query(`
        SELECT [CCCD/CMND] AS CardId, ngaysinh AS birtday, nganhang AS ATM, motabanthan AS Describe, thanhtich, [elo-diem] AS elopoint, cap, sdt, diachi, name_ten, autolocation AS phanquyen, img
        FROM   dbo.ThongTin_TK
        WHERE (MA_Taikhoang = @iduser)
      `)
      const data = result;
      if (result) {
    res.json({
      result : data,
    });
  } 
}catch (error) {
  console.log(error);
}
  });
router.post("/upload-avatar", upload.single('setUploadpic'), async function (req, res, next) {
    try {
      const { iduser } = req.body;
      const setUploadpic = req.file;
      await pool.connect();
      const result = await pool
        .request()
        .input('iduser',mssql.Int,+(iduser))
        .input('avatar',mssql.NVarChar,setUploadpic.filename)
        .query(`
        IF EXISTS (SELECT img FROM [ThongTin_TK] WHERE MA_Taikhoang = @iduser) 
        UPDATE [ThongTin_TK] SET img = @avatar WHERE MA_Taikhoang=@iduser 
        ELSE 
        INSERT INTO [ThongTin_TK] (img) VALUES (@avatar)
        `)
      const data = result;
      if (result) {
        res.json({
          message:"ok"
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/getsdt", upload.none(), async function (req, res, next) {
    try {
      await pool.connect();
      const result = await pool
        .request()
        .input('id',mssql.Int,+(req.body.id))
        .query(`
        SELECT sdt
        FROM   dbo.ThongTin_TK
        WHERE (MA_Taikhoang = @id)
        `)
      const data = result;
      if (result) {
        res.json({
          result : data,
          message:"ok"
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/createdoi", upload.none(), async function (req, res, next) {
    try {
      const newid = req.body.id;
      await pool.connect();
      const result = await pool
        .request()
        .input('id',mssql.Int,+(req.body.id))
        .input('idn',mssql.NVarChar,newid)
        .input('name',mssql.NVarChar,req.body.name)
        .input('sdt',mssql.NVarChar,req.body.sdtn)
        .query(`
        insert into Player(MaPlayer,Ten,SoDt) values(@id,@name,@sdt)
        insert into ChiTietDoi(MaPlayer,MaDoi) values(@id,@idn)
        `)
      const data = result;
      if (result) {
        res.json({
          message:"ok"
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/createdoiclone", upload.none(), async function (req, res, next) {
    try {
      // const newid = req.body.id;
      await pool.connect();
      const result = await pool
        .request()
        .input('id',mssql.Int,+(req.body.iduser))
        .input('idn',mssql.NVarChar,req.body.madoi)
        .input('name',mssql.NVarChar,req.body.nameuser)
        .input('sdt',mssql.NVarChar,req.body.sdtn)
        .query(`
        insert into Player(MaPlayer,Ten,SoDt) values(@id,@name,@sdt)
        insert into ChiTietDoi(MaPlayer,MaDoi) values(@id,@idn)
        `)
      const data = result;
      if (result) {
        res.json({
          message:"ok"
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/upload-single-san", upload.single('setUploadpic'), async function (req, res, next) {
    try {
      const { idsan } = req.body;
      const setUploadpic = req.file;
      await pool.connect();
      const result = await pool
        .request()
        .input('id', mssql.Int, +(idsan))
        .input('date', mssql.DateTime, req.body.date)
        .input('avatar', mssql.Text, setUploadpic.filename)
        .query(`
          UPDATE San
          SET Logo_1 = @avatar,Ngaysuachua=@date
          WHERE MaSan = @id
        `);
      if (result.rowsAffected[0] > 0) {
        res.json({
          message: "ok"
        });
      } else {
        res.json({
          message: "failed"
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        message: "error"
      });
    }
  });
router.post("/upload-multiple-san", upload.fields([
    { name: 'images_review', maxCount: 4 },
  ]), async function (req, res, next) {
    try {
      const idsan = +(req.body.id);
      const images_review = req.files.images_review;
      const studentImgPaths = images_review?.map((img) => img?.path);
      pool.connect().then(() => {
        const request = new mssql.Request(pool);
        request.input('Idsan', mssql.Int, idsan);
        request.input('studentImgs', mssql.Text, studentImgPaths?.join(','));
        request.input('date', mssql.DateTime, req.body.date);
        request.query(`
          UPDATE San
          SET AnhReview=@studentImgs,Ngaysuachua=@date
          WHERE MaSan = @Idsan
        `)
          .then(() => {
            res.json({message:'Đã cập nhật thông tin thành công'});
          })
          .catch((err) => {
            console.error(err);
            res.status(500);
          })
          .finally(() => {
            pool.close();
          });
      }).catch((err) => {
        console.error(err);
        res.status(500).send('Không thể kết nối tới cơ sở dữ liệu');
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({message: error.message});
    }
  });
router.post("/rerender-san", upload.none(), async function (req, res, next) {
    try {
      const  iduser  = req.body.id;
      // console.log(iduser);
      await pool.connect();
      const result = await pool
        .request()
        .input('iduser',mssql.Int,+(iduser))
        // .input('avatar',mssql.NVarChar,setUploadpic.filename)
        .query(`
        SELECT dbo.San.Manguoitao, dbo.San.Ngaykhoitao, dbo.San.TenSan, dbo.CumSan.TenCumSan, dbo.San.MaSan
        FROM   dbo.San INNER JOIN
                    dbo.CumSan ON dbo.San.MaCS = dbo.CumSan.MaCumSan
        WHERE (dbo.San.Manguoitao = @iduser)
        `)
        const data = result;
      if (result) {
        res.json({
          message:"ok",
          result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/rerender-hd", upload.none(), async function (req, res, next) {
    try {
      const token = req.body.token;
          let decoded = null;
          jwt.verify(token, 'mk', (err, result) => {
            if (err) {
              console.log(err);
              return res.sendStatus(403);
            }
            decoded = result;
          });
      // const  iduser  = req.body.id;
      // console.log(iduser);
      await pool.connect();
      const result = await pool
        .request()
        .input('iduser',mssql.Int,+(decoded.idUser))
        // .input('avatar',mssql.NVarChar,setUploadpic.filename)
        .query(`
        SELECT dbo.NguoiQuanLi.MaNguoiQL, dbo.SuDungSan.MaSan, dbo.SuDungSan.NgayDatSan, dbo.SuDungSan.GioBatDau, dbo.SuDungSan.Hinhthucthanhtoan, dbo.SuDungSan.TinhTrang, dbo.SuDungSan.MaHD, dbo.SuDungSan.GioKetThuc, dbo.SuDungSan.MaKhachHang, 
              dbo.ThongTin_TK.sdt
  FROM   dbo.SuDungSan INNER JOIN
              dbo.San ON dbo.SuDungSan.MaSan = dbo.San.MaSan INNER JOIN
              dbo.CumSan ON dbo.San.MaCS = dbo.CumSan.MaCumSan INNER JOIN
              dbo.NguoiQuanLi ON dbo.CumSan.MaNguoiQL = dbo.NguoiQuanLi.MaNguoiQL INNER JOIN
              dbo.ThongTin_TK ON dbo.SuDungSan.MaKhachHang = dbo.ThongTin_TK.MA_Taikhoang
WHERE (dbo.NguoiQuanLi.MaNguoiQL = @iduser)
        `)
        const data = result;
      if (result) {
        res.json({
          message:"ok",
          result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/rerender-cs", upload.none(), async function (req, res, next) {
    try {
      const token = req.body.token;
          let decoded = null;
          jwt.verify(token, 'mk', (err, result) => {
            if (err) {
              console.log(err);
              return res.sendStatus(403);
            }
            decoded = result;
          });
      // const  iduser  = req.body.id;
      // console.log(iduser);
      await pool.connect();
      const result = await pool
        .request()
        .input('iduser',mssql.Int,+(decoded.idUser))
        .query(`
        SELECT dbo.CumSan.MaCumSan, dbo.CumSan.MaNguoiQL, dbo.CumSan.TenCumSan, dbo.CumSan.TinhTrang, dbo.NguoiQuanLi.TenNguoiQL
        FROM   dbo.CumSan INNER JOIN
                    dbo.NguoiQuanLi ON dbo.CumSan.MaNguoiQL = dbo.NguoiQuanLi.MaNguoiQL
        WHERE (dbo.CumSan.MaNguoiQL = @iduser)
        `)
        const data = result;
      if (result) {
        res.json({
          message:"ok",
          result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/rerender-ls", upload.none(), async function (req, res, next) {
    try {
      await pool.connect();
      const result = await pool
        .request()
        .query(`
        SELECT TenLoaiSan, MaLoaiSan, Mon
FROM   dbo.LoaiSan
        `)
        const data = result;
      if (result) {
        res.json({
          message:"ok",
          result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/rerender-cs-fix", upload.none(), async function (req, res, next) {
    try {
      const token = req.body.token;
          let decoded = null;
          jwt.verify(token, 'mk', (err, result) => {
            if (err) {
              console.log(err);
              return res.sendStatus(403);
            }
            decoded = result;
          });
      // const  iduser  = req.body.id;
      // console.log(iduser);
      await pool.connect();
      const result = await pool
        .request()
        .input('iduser',mssql.Int,+(decoded.idUser))
        .input('id',mssql.Int,Number(req.body.id))
        .query(`
        SELECT dbo.CumSan.MaCumSan, dbo.CumSan.MaNguoiQL, dbo.CumSan.TenCumSan, dbo.CumSan.TinhTrang, dbo.NguoiQuanLi.TenNguoiQL
FROM   dbo.CumSan INNER JOIN
            dbo.NguoiQuanLi ON dbo.CumSan.MaNguoiQL = dbo.NguoiQuanLi.MaNguoiQL
WHERE (dbo.CumSan.MaNguoiQL = @iduser) AND (dbo.CumSan.MaCumSan = @id)
        `)
        const data = result;
      if (result) {
        res.json({
          message:"ok",
          result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/rerender-ls-fix", upload.none(), async function (req, res, next) {
    try {
      const token = req.body.token;
          let decoded = null;
          jwt.verify(token, 'mk', (err, result) => {
            if (err) {
              console.log(err);
              return res.sendStatus(403);
            }
            decoded = result;
          });
      // const  iduser  = req.body.id;
      // console.log(iduser);
      await pool.connect();
      const result = await pool
        .request()
        .input('iduser',mssql.Int,+(decoded.idUser))
        .input('id',mssql.Int,Number(req.body.id))
        .query(`
        SELECT TenLoaiSan, MaLoaiSan, Mon
        FROM   dbo.LoaiSan
        `)
        const data = result;
      if (result) {
        res.json({
          message:"ok",
          result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/nguoiquanly", upload.none(), async function (req, res, next) {
    try {
      await pool.connect();
      const result = await pool
        .request()
        .query(`
        SELECT MaNguoiQL, TenNguoiQL
        FROM   dbo.NguoiQuanLi
        `)
        const data = result;
      if (result) {
        res.json({
          message:"ok",
          result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/update-cumsanmini", upload.none(), async function (req, res, next) {
    try {
      const a =req.body.IdngQL;
      console.log(a);
      await pool.connect();
      const result = await pool
        .request()
        .input('id',mssql.Int,+(req.body.id))
        .input('maql', mssql.Int, +(a))
        .input('tencs',mssql.NVarChar,req.body.namecumsan)
        .input('ttcs',mssql.NVarChar,req.body.ttcs)
        .query(`
        Update CumSan 
        set MaNguoiQL =@maql ,TenCumSan =@tencs,TinhTrang =@ttcs  
        WHERE (MaCumSan = @id)
        `)
        // const data = result;
      if (result) {
        res.json({
          message:"ok",
          // result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.post("/update-cumsanminiz", upload.none(), async function (req, res, next) {
    try {
      await pool.connect();
      const result = await pool
        .request()
        .input('id',mssql.Int,+(req.body.id))
        .input('tencs',mssql.NVarChar,req.body.namecumsan)
        .input('ttcs',mssql.NVarChar,req.body.ttcs)
        .query(`
        Update LoaiSan
        Set Mon=@ttcs,TenLoaiSan=@tencs
        where MaLoaiSan = @id
        `)
        // const data = result;
      if (result) {
        res.json({
          message:"ok",
          // result : data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  });
router.get("/arena",async  function (req, res, next) {
    // const Ac=req.body;
    try {
      await pool.connect();
      const result = await pool
        .request()
        .query(`
        SELECT dbo.San.Logo_1, dbo.San.TenSan, dbo.LoaiSan.TenLoaiSan, dbo.CumSan.TenCumSan
        FROM   dbo.CumSan INNER JOIN
                    dbo.San ON dbo.CumSan.MaCumSan = dbo.San.MaCumSan INNER JOIN
                    dbo.LoaiSan ON dbo.San.MaLoaiSan = dbo.LoaiSan.MaLoaiSan
        `);
      const sanbong = result.recordset[0];
      if (sanbong) {
        res.json({
          text: "success",
          // token:token,,
          sanbong:sanbong,
        });
      } 
    } catch (error) {
      res.status(500).json({text: "fail"});
    }});
router.post("/getdata_withQuery",async  function (req, res, next) {
  const Ac=req.body;
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("tk", Ac.name)
      .input("mk",Ac.pass)
      .query(`
      SELECT dbo.TaiKhoang.MK AS pass, dbo.TaiKhoang.TK AS tk, dbo.TaiKhoang.Ma_TK AS id, dbo.ThongTin_TK.name_ten AS name, dbo.ThongTin_TK.autolocation AS ATlocation
      FROM   dbo.TaiKhoang INNER JOIN
                  dbo.ThongTin_TK ON dbo.TaiKhoang.Ma_TK = dbo.ThongTin_TK.MA_Taikhoang
      WHERE (TK = @tk) AND (MK = @mk)
      `);
      const user = result.recordset[0];
      if (user) {
        const token = jwt.sign({
          idUser:user.id,
          nameUser:user.name,
          Rule:user.ATlocation,
        },'mk'); 
        // console.log(result.recordset[0]);
    // console.log(token);
      res.json({
        text: "success",
        token:token,
      });
    } 
  } catch (error) {
    res.status(500).json({text: "fail"});
  }});
router.post("/getdata_register", async(req, res)=> {
  var dateOfBirth = new Date(req.body.ngaysinh).toLocaleString();
  try{
    await pool.connect();
    const result = await pool
    .request()
    .input('tk', mssql.NVarChar,req.body.name)
    .input('mk', mssql.NVarChar,req.body.pass)
    .input('cccd', mssql.BigInt,req.body.cccd)
    .input('sdt', mssql.BigInt,req.body.sdt)
    .input('nganhang', mssql.BigInt,req.body.nganhang)
    .input('name', mssql.NVarChar,req.body.ten)
    .input('ngaysinh', mssql.DateTime,dateOfBirth)
    .input('diachi', mssql.NVarChar,req.body.diachi)
    .input('motabanthan', mssql.NVarChar,req.body.motabanthan).query(`ProcedureName @tk,@mk,@cccd,@ngaysinh,@nganhang,@motabanthan,@sdt,@diachi,@name`);
    res.status(200).json({
        text: "success",
      });
  } catch(error) {
    console.log("error :" + error);
    res.json({
      text: "fail",
    });
  }
});
router.post("/createduel",upload.none(), async(req, res)=> {
  var dateduel = new Date(req.body.ngaythachdau).toLocaleString();
  var datefight = new Date(req.body.ngaythidau).toLocaleString();
  try{
    await pool.connect();
    const result = await pool
    .request()
    .input('idntd', mssql.Int,+(req.body.idnguoithachdau)) 
    .input('idndtd', mssql.Int,+(req.body.idnguoiduocthachdau))
    .input('tt', mssql.Int,+(req.body.trongtai))
    .input('dd', mssql.NVarChar,req.body.diadiem)
    .input('ngaythach', mssql.DateTime,dateduel)
    .input('ngaythi', mssql.DateTime,datefight)
    .query(`
    insert into ThachDau(NguoiGiamSat,NguoiThachDau,NguoiDuocThachDau,NgayThachDau,NgayThiDau,DiaDiem) 
    values(@tt,@idntd,@idndtd,@ngaythach,@ngaythi,@dd)
    `);
    res.status(200).json({
        text: "success",
      });
  } catch(error) {
    console.log("error :" + error);
    res.json({
      text: "success",
    });
  }
});
router.post('/upload-info-san',upload.fields([
  { name: 'images_review', maxCount: 4 },
  { name: 'uploadsanlogo', maxCount: 1 },
]), (req, res) => {
  try {
    const idnguoiupload = +(req.body.id);
    const Idloaisan = +(req.body.uploadsanmaloaisan);
    const Idcumsan = +(req.body.uploadsanmacumsan);
    const Trangthai = req.body.uploadsantrangthai;
    const thongbao = req.body.uploadsanthongbao;
    const tinhtrang = req.body.uploadsantinhtrang;
    const tensan = req.body.uploadsantensan;
    const images_review = req.files.images_review;
    const studentImgPaths = images_review.map((img) => img.path);
    const uploadsanlogo = req.files.uploadsanlogo[0];
  
    // Thực hiện truy vấn để cập nhật thông tin vào cơ sở dữ liệu
    // const pool = new mssql.ConnectionPool(config);
    pool.connect().then(() => {
      const request = new mssql.Request(pool);
      request.input('Idloaisan', mssql.Int, Idloaisan);
      request.input('Id', mssql.Int, idnguoiupload);
      request.input('Idcumsan', mssql.Int, Idcumsan);
      request.input('Trangthai', mssql.NVarChar, Trangthai);
      request.input('thongbao', mssql.NVarChar, thongbao);
      request.input('tinhtrang', mssql.NVarChar, tinhtrang);
      request.input('tensan', mssql.NVarChar, tensan);
      request.input('uploadsanlogo', mssql.Text, uploadsanlogo.filename);
      request.input('studentImgs', mssql.Text, studentImgPaths.join(','));
      request.query(`Insert into San (MaLoaiSan,MaCS,TrangThai,ThongBao,Logo_1,TinhTrang,TenSan,AnhReview,Manguoitao) 
      values(@Idloaisan,@Idcumsan,@Trangthai,@thongbao,@uploadsanlogo,@tinhtrang,@tensan,@studentImgs,@Id)
      `)
        .then(() => {
          res.json({message:'Đã cập nhật thông tin thành công'});
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
        })
        .finally(() => {
          pool.close();
        });
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Không thể kết nối tới cơ sở dữ liệu');
    });
  } catch (error) {
    console.log(error);
  }

});
router.post('/fix-infosan', upload.none(), (req, res) => {
      try {
        const idnguoiupload = +(req.body.idUerupdate);
        const idsan = +(req.body.id);
        const Idloaisan = +(req.body.uploadsanmaloaisan);
        const Idcumsan = +(req.body.uploadsanmacumsan);
        const thongbao = req.body.uploadsanthongbao;
        const tinhtrang = req.body.uploadsantinhtrang;
        const tensan = req.body.uploadsantensan;
        const money = req.body.uploadsangia;
        pool.connect().then(() => {
          const request = new mssql.Request(pool);
          request.input('Id', mssql.Int, idnguoiupload);
          request.input('Idsan', mssql.Int, idsan);
          request.input('Idloaisan', mssql.Int, Idloaisan);
          request.input('Idcumsan', mssql.Int, Idcumsan);
          request.input('thongbao', mssql.NVarChar, thongbao);
          request.input('tinhtrang', mssql.NVarChar, tinhtrang);
          request.input('tensan', mssql.NVarChar, tensan);
          request.input('date', mssql.DateTime, req.body.date);
          request.input('money', mssql.Money, money);
          request.query(`
            UPDATE San
            SET MaLoaiSan=@Idloaisan,MaCS=@Idcumsan,TinhTrang=@tinhtrang,ThongBao=@thongbao,TenSan=@tensan,Ngaysuachua=@date,Manguoiupdate=@Id,Gia=@money
            WHERE MaSan = @Idsan
            `)
            .then(() => {
              res.json({ message: 'Đã cập nhật thông tin thành công' });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send('Lỗi trong quá trình cập nhật thông tin');
            })
            .finally(() => {
              pool.close();
            });
        }).catch((err) => {
          console.error(err);
          res.status(500).send('Không thể kết nối tới cơ sở dữ liệu');
        });
      } catch (error) {
        console.log(error);
      } 
    });
router.post('/thamgiagiadau', upload.none(), (req, res) => {
      try {
        const idnguoijohn = +(req.body.token);
        const idmand = +(req.body.id);
    
        pool.connect().then(() => {
          const request = new mssql.Request(pool);
          request.input('Id', mssql.Int, idnguoijohn);
          request.input('Idsan', mssql.Int, idmand);
          request.input('date', mssql.DateTime, req.body.datetime);
          request.query(`
          insert into DangKiThiDau(MaPlayer,NgayDangKi,MaNoiDung) values(@Id,@date,@Idsan)
            `)
            .then(() => {
              res.json({ message: 'Đã thêm thông tin thành công' });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send('Lỗi trong quá trình cập nhật thông tin');
            })
            .finally(() => {
              pool.close();
            });
        }).catch((err) => {
          console.error(err);
          res.status(500).send('Không thể kết nối tới cơ sở dữ liệu');
        });
      } catch (error) {
        console.log(error);
      }
    });
module.exports = router;
