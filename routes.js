import db from './database.js';
import bcrypt from 'bcrypt';

export const home = (req,res)=>{
    res.render('index');
}

export const login = (req,res)=>{
    res.render('login');
}

export const register = (req,res)=>{
    res.render('register');
}

export const Register = (req,res)=>{
    console.log(req.body);
    db.query(`INSERT INTO Users(userName, userEmail,userPassword) VALUES('${req.body.userName}','${req.body.userEmailId}','${req.body.userPassword}');`,(err,result)=>{
        if(err) console.log(err)
        console.log(result)
    })
    res.redirect('/login')

}