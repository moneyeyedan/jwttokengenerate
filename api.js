const express = require('express');
const app = express();
const connect = require('./databases');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var port = process.env.port || 3000;
app.use(bodyParser.json());
app.use(cors());
app.get('/authorization',(req,res)=>{
    var id = {
        key:"manikandan"
    }
    res.send(jwt.sign(id,"secretkey_123456789"));
});
app.post('/thing',jwtcheck,(req,res)=>{
            var insert = "insert into things set ?"
            var params = {
                price:req.body.price,
                ondate:"2019-09-27"
            }
            connect.connect.query(insert,params,(err,result)=>{
                if(err) throw err;
                res.send({
                    text:"the message is successfuly insert",
                    data:result,
                    status:true
                });
            })
});
app.get('/count',jwtcheck,(req,res)=>{
    var query1 = "select thingtype as ThingType,count(thingtype) from things group by thingtype";
    connect.connect.query(query1,(err,data)=>{
        if(err) throw err;
        res.send(data);
    });
});
function jwtcheck(req,res,next){
    if(typeof req.headers != undefined){
        var jwtHeader = req.headers['authorization'];
        var token = jwtHeader.split(" ");
        jwt.verify(token[1],"secretkey_123456789",(err,result)=>{
            if(err){
                res.sendStatus(403);
            }else{
                next();
            }
        });
    }else{
        res.sendStatus(403);
    }

}
app.listen(port,()=>{
    console.log('http://localhost:'+port);
});
