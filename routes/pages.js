const express= require('express');
const router =express.Router();
const mysql =require("mysql");
const bcrypt = require('bcryptjs');
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs');
const { connect } = require("http2");
const { parseConnectionUrl } = require("nodemailer/lib/shared");
const { dirname } = require("path");
const { once } = require('events');



const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});
function updater(stat,data){
    var sql = "UPDATE users SET status  = ? WHERE email =? ";
    for (x of data){
        db.query(sql,[stat,x],(err,rows)=>{
            // db.relase()
            if (!err){
                console.log("Changed")
            }
            else{
                console.log("not Succes")
                console.log(err)

                
    
            }
            // console.log("Datas from users:\n",rows)
        })
    }
}
function tableCreate(data,res,oper="none"){
    var sql = "SELECT * FROM users ";
    db.query(sql,(err,rows)=>{
        // db.relase()
        if (!err){
            if(rows.length==data.length&&oper!="none"){
                console.log("Here")
                res.render("index")
                console.log("Succes")
            }
            else {
                res.render("home",{rows})
                console.log(oper)

            }
        }
        else{
            console.log("not Succes")
            console.log(err)
            

        }
        // console.log("Datas from users:\n",rows)
    }   )
}
function deleter(data){
    var sql = "DELETE FROM users WHERE email =?";
    for (x of data){
        db.query(sql,[x],(err,rows)=>{
        
    if (!err){
        console.log("Deleted")
    }
    else{
        console.log("not Succes")
        console.log(err)
      }
     }
    )
   }
}
router.get('/',(req,res)=>{
    res.render("index")
});
router.get('/register',(req,res)=>{
    res.render("register")
});
router.get('/login',(req,res)=>{
    res.render("index")
});
router.get('/home',(req,res)=>{
    data = Object.keys(req.body)
    tableCreate(data,res)

});
router.get('/home',(req,res)=>{
    res.render("home")
    console.log("home")
});
router.post('/unblock',(req,res)=>{
        data = Object.keys(req.body)
        updater("Active",data)
        tableCreate(data,res)
}

   
);

router.post('/block',(req,res)=>{                        
        let data = Object.keys(req.body)
        updater("Blocked",data)
        tableCreate(data,res,oper="Block")  
}  

);
router.post('/delete',(req,res)=>{
    let data = Object.keys(req.body)
    deleter(data)
    tableCreate(data,res,oper="Delete")


    }
)






    ;

module.exports=router;