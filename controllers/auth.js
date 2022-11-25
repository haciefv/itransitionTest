const mysql =require("mysql");
const bcrypt = require('bcryptjs');
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs');
const { connect } = require("http2");
const { parseConnectionUrl } = require("nodemailer/lib/shared");
const { dirname } = require("path");


// import crypto from 'crypto';

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});
function exactTime(){
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    
// prints date & time in YYYY-MM-DD HH:MM:SS format
    let last_date=(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    return last_date
}

exports.register=(req,res)=>{
    // console.log(req.body)
    // const name= req.body.regUname
    // const email= req.body.regUemail
    // const password= req.body.regUpassword
    // const confirmPassword= req.body.regUpasswordConfirm
    const {regUname,regUemail,regUpassword,regUpasswordConfirm}=req.body

     db.query("SELECT email FROM users WHERE email = ?",[regUemail],(error,results)=>{
        if (error) {console.log(error)}
        if (results.length>0){
            return res.render("register",{
                message:"That email is already use"
            })
        }
        else  if(regUpassword!==regUpasswordConfirm){
            return res.render("register",{
                message:'Password dont match',
                  
            });
        }
        else if(regUname.length==0||regUemail.length==0||regUpassword.length==0||regUpasswordConfirm.length==0){
            return res.render("register",{
                message:'Every input must fill',

                  
            },console.log("Okay"))
        }
        var hash1 = crypto.createHash("sha3-256")
        var hashedPassword = hash1.update(regUpassword).digest("hex")
        console.log(hashedPassword)
        console.log(regUpassword)
        db.query('INSERT INTO users SET ?',{name:regUname,email:regUemail,password:hashedPassword,status:"Active",lastlog:"Not loged",register:exactTime()},(error,results)=>{
            if (error){console.log(error)}
            else{
                console.log(results)
                return res.render("register",{
                    message:'User Registred',
                      
                })

            }
        })


     });
}
exports.index=(req,res)=>{
    let {email,password,}=req.body
    email = email.trim();

    if (email==""||password==""){
        return res.render("index",{
            message:'! Empty credentials supplied'
        })
    }

    else {
        var hash1 = crypto.createHash("sha3-256")
        var hashedPassword = hash1.update(password).digest("hex")

        db.query("SELECT email FROM users WHERE email = ? AND password=? AND status=? ",[email,hashedPassword,"Active"],(error,results)=>{
            if (error) {console.log(error)}
            if (results.length==0){
                return res.render("index",{
                    message:"Email or password is wrong OR You are blocked~"
                },console.log(results))
            }
            else{
                var sqlUpdate = "UPDATE users SET lastlog = ? WHERE email =? "
                db.query(sqlUpdate,[exactTime(),email],(err,rows)=>{
                    // db.relase()
                    if (!err){
                        console.log("Update Succes")
                    }
                    else{
                        console.log(err)
                    }

                })



                var sql = "SELECT * FROM users ";
                db.query(sql,(err,rows)=>{
                    // db.relase()
                    if (!err){
                        res.render("home",{ rows })
                        console.log("Succes")
                    }
                    else{
                        console.log("not Succes")
                        console.log(err)
                        
            
                    }
                    // console.log("Datas from users:\n",rows)
                })
            }
        })


    }
    var sql = "SELECT email FROM users ";
    db.query(sql,(err,mails,fields)=>{
        // db.relase()
        if (!err){
            // for (x of mails){
            //     console.log(x,)
            // }
            let result = Object.values(JSON.parse(JSON.stringify(mails)));
            for (x of result){
                // k=Object.values(x)
                // z =JSON.stringify(x)
                k=x.email
                console.log(req.body.table)
            }
            
            // console.log(result)
            // for(key in result) {
            //     if(data.hasOwnProperty(result)) {
            //         var value = result[key];
            //         //do something with value;
            //     }
            // }

        }
        else{
            console.log("not Succes")
            console.log(err)
        }
        // console.log("Datas from users:\n",rows)
    })

}
exports.block=(req,res)=>{
    if (err){throw err}
    else{
        console.log("okai")

    }
    
    var sql = "SELECT * FROM users ";
    db.query(sql,(err,rows)=>{
        // db.relase()
        if (!err){
            res.render("home",{ rows })
            console.log("Succes")
        }
        else{
            console.log("not Succes")
            console.log(err)
            

        }
        // console.log("Datas from users:\n",rows)
    })

    res.render("home",{ rows })



}
exports.unblock=(req,res)=>{
    console.log("asd")
    const data=req.body
    if (err){throw err}
    else{
        console.log("okai")
        var sql = "UPDATE users SET status  = ? WHERE email =? ";
        for (x of data){
            db.query(sql,["Active",x],(err,rows)=>{
                // db.relase()
                if (!err){
                    res.render("home",{ rows })
                    console.log(rows)
                }
                else{
                    console.log("not Succes")
                    console.log(err)
                    
        
                }
                // console.log("Datas from users:\n",rows)
            })
        }


    }
    
    
    var sql = "SELECT * FROM users ";
    db.query(sql,(err,rows)=>{
        // db.relase()
        if (!err){
            res.render("home",{ rows })
            console.log("Succes")
        }
        else{
            console.log("not Succes")
            console.log(err)
            

        }
        // console.log("Datas from users:\n",rows)
    })




}