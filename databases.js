const mysql = require('mysql');
const connect = mysql.createConnection({"user":process.env.user,"password":process.env.password,"database":process.env.database});
connect.connect((err,result)=>{
    if(err) throw err;
    if(err === "fatal"){
       module.export = () => {
           return null;
       }
    } else {
        a ();
    }
    console.log("database is connection"+JSON.stringify(process.env.database));
})
module.exports = {
    connect
}