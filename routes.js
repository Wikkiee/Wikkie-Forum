import db from './database.js';
import {v4 as uuidv4 } from 'uuid'
import { AvatarGenerator } from 'random-avatar-generator';
import bcrypt from 'bcrypt'
const generator = new AvatarGenerator();
 
export const home = (req,res)=>{
    console.log(req.session.passport);
    db.query(`SELECT userAvatar from Users WHERE userId ='${req.session.passport.user}'`,(err,result)=>{
        if(err) throw err
        res.render('index',{avatar:{link:result[0].userAvatar}});
    })

}

export const login = (req,res)=>{

    res.render('login');
}

export const register = (req,res)=>{
    res.render('register');
}

export const Register = (req,res)=>{
    
    db.query(`SELECT userName FROM Users WHERE userName = '${req.body.userName}'`,(err,result)=>{
        if(result.length===0){
            db.query(`SELECT userEmail FROM Users WHERE userEmail = '${req.body.userEmailId}'`,async(err,result)=>{
                if(err) console.log(err);
                if(result.length === 0){
                    const hash = bcrypt.hashSync(req.body.userPassword, parseInt(process.env.SALTROUNDS));
                    const avatar = generator.generateRandomAvatar()
                    const uuid = uuidv4()
                    db.query(`SELECT * FROM Users WHERE userId='${uuid}'`,(err,result)=>{
                        if(err) throw err
                        if(result.length === 0){
                            db.query(`INSERT INTO Users(userId,userName, userEmail,userPassword,userAvatar) VALUES('${uuid}','${req.body.userName}','${req.body.userEmailId}','${hash}','${avatar}');`,(err,result)=>{
                                if(err) console.log(err)
                                console.log("Inserted successfully");
                                res.redirect('/login')
                            })
                        }else{
                            res.redirect('/register')
                        }
                    })


                }else{
                    res.redirect('/register')
                    console.log('Email already used');
                }
            })
        }else{
            res.redirect('/register')
            console.log('user name already exist');
        }
    })



}