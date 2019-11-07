const connect = require('./databases');
let categories = "create table things (id int not null auto_increment,thingtype varchar(250) not null,name varchar(250) not null,price int not null,ondate date not null,primary key(id))";
connect.connect.query(categories,(err,result)=>{
    if(err) throw err;
    console.log(result);
})

