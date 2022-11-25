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
});
router.get('/home',(req,res)=>{
    res.render("home")
    console.log("home")
});
router.post('/unblock',(req,res)=>{
                        // res.render("home",{ rows })
                        
        let data = Object.keys(req.body)
        console.log(data)
    
        var sql = "UPDATE users SET status  = ? WHERE email =? ";
        for (x of data){
            db.query(sql,["Active",x],(err,rows)=>{
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
        // data=[]
        var sql = "SELECT * FROM users ";
        db.query(sql,(err,rows)=>{
            // db.relase()
            if (!err){
                res.redirect('/home');
                console.log("Succes")
            }
            else{
                console.log("not Succes")
                console.log(err)
                
    
            }
            // console.log("Datas from users:\n",rows)
        }   )



    
    






}

    // var sql = "SELECT email FROM users ";
    // db.query(sql,(err,mails,fields)=>{
    //     // db.relase()
    //     if (!err){
    //         // for (x of mails){
    //         //     console.log(x,)
    //         // }

            

    //         let result = Object.values(JSON.parse(JSON.stringify(mails)));
    //         let emails=[]
    //         for (x of result){
    //             k=x.email
                
    //             if (req.body.k) {

    //                 var sqlUpdate = "UPDATE users SET status = ? WHERE email =? "
    //                 db.query(sqlUpdate,["Active",k],(err,rows)=>{
    //                     // db.relase()
    //                     if (!err){
    //                         console.log("Update Succes")
    //                     }
    //                     else{
    //                         console.log(err)
    //                     }
    
    //                 })
                    
                    
    //          } 
    //          else {
    //                 console.log(k)
    //                 console.log("not checked");
    //                 }

    //         }


    //         var sql = "SELECT * FROM users ";
    //         db.query(sql,(err,rows)=>{
    //             if (!err){
    //                 res.render("home",{ rows })
    //                 console.log("Succes")
    //             }
    //             else{
    //                 console.log("not Succes")
    //                 console.log(err)
                    
        
    //             }
    //         })
            

    //     }
    //     else{
    //         console.log("not Succes")
    //         console.log(err)
    //     }

    // })

);

router.post('/block',(req,res)=>{
                        // res.render("home",{ rows })
                        
        let data = Object.keys(req.body)
        console.log(data)
    
        var sql = "UPDATE users SET status  = ? WHERE email =? ";
        for (x of data){
            db.query(sql,["Blocked",x],(err,rows)=>{
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
        // data=[]
        var sql = "SELECT * FROM users ";
        db.query(sql,(err,rows)=>{
            // db.relase()
            if (!err){
                res.redirect('/home');
                console.log("Succes")
            }
            else{
                console.log("not Succes")
                console.log(err)
                
    
            }
            // console.log("Datas from users:\n",rows)
        }   )



    
    






}

    // var sql = "SELECT email FROM users ";
    // db.query(sql,(err,mails,fields)=>{
    //     // db.relase()
    //     if (!err){
    //         // for (x of mails){
    //         //     console.log(x,)
    //         // }

            

    //         let result = Object.values(JSON.parse(JSON.stringify(mails)));
    //         let emails=[]
    //         for (x of result){
    //             k=x.email
                
    //             if (req.body.k) {

    //                 var sqlUpdate = "UPDATE users SET status = ? WHERE email =? "
    //                 db.query(sqlUpdate,["Active",k],(err,rows)=>{
    //                     // db.relase()
    //                     if (!err){
    //                         console.log("Update Succes")
    //                     }
    //                     else{
    //                         console.log(err)
    //                     }
    
    //                 })
                    
                    
    //          } 
    //          else {
    //                 console.log(k)
    //                 console.log("not checked");
    //                 }

    //         }


    //         var sql = "SELECT * FROM users ";
    //         db.query(sql,(err,rows)=>{
    //             if (!err){
    //                 res.render("home",{ rows })
    //                 console.log("Succes")
    //             }
    //             else{
    //                 console.log("not Succes")
    //                 console.log(err)
                    
        
    //             }
    //         })
            

    //     }
    //     else{
    //         console.log("not Succes")
    //         console.log(err)
    //     }

    // })

);
router.post('/delete',(req,res)=>{
        // res.render("home",{ rows })

    let data = Object.keys(req.body)
    console.log(data)

    var sql = "DELETE FROM users WHERE email =?";
    for (x of data){
        db.query(sql,[x],(err,rows)=>{
        // db.relase()
    if (!err){
        console.log("Deleted")
    }
    else{
        console.log("not Succes")
        console.log(err)



    }
    // console.log("Datas from users:\n",rows)
    })
    }
    // data=[]
    var sql = "SELECT * FROM users ";
    db.query(sql,(err,rows)=>{
    // db.relase()
    if (!err){
    res.redirect('/home');
    console.log("Succes")
    }
    else{
    console.log("not Succes")
    console.log(err)


    }
    // console.log("Datas from users:\n",rows)
    }   )











    }

    // var sql = "SELECT email FROM users ";
    // db.query(sql,(err,mails,fields)=>{
    //     // db.relase()
    //     if (!err){
    //         // for (x of mails){
    //         //     console.log(x,)
    //         // }



    //         let result = Object.values(JSON.parse(JSON.stringify(mails)));
    //         let emails=[]
    //         for (x of result){
    //             k=x.email

    //             if (req.body.k) {

    //                 var sqlUpdate = "UPDATE users SET status = ? WHERE email =? "
    //                 db.query(sqlUpdate,["Active",k],(err,rows)=>{
    //                     // db.relase()
    //                     if (!err){
    //                         console.log("Update Succes")
    //                     }
    //                     else{
    //                         console.log(err)
    //                     }

    //                 })


    //          } 
    //          else {
    //                 console.log(k)
    //                 console.log("not checked");
    //                 }

    //         }


    //         var sql = "SELECT * FROM users ";
    //         db.query(sql,(err,rows)=>{
    //             if (!err){
    //                 res.render("home",{ rows })
    //                 console.log("Succes")
    //             }
    //             else{
    //                 console.log("not Succes")
    //                 console.log(err)


    //             }
    //         })


    //     }
    //     else{
    //         console.log("not Succes")
    //         console.log(err)
    //     }

    // })

    );

module.exports=router;