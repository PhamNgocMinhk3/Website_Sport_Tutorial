const sql = require("mssql");
var {pool} = require("./dbconfig");

async function getdata() {
  try {
    let poolz = await sql.connect(config);
    console.log("sql server connected...");
  } catch (error) {
console.log(" mathus-error :" + error);
  }
}



module.exports = {
  getdata:getdata,
  pool
};
