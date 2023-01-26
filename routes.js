import db from './database.js';
import {v4 as uuidv4 } from 'uuid'
import { AvatarGenerator } from 'random-avatar-generator';
import bcrypt from 'bcrypt'
const generator = new AvatarGenerator();
 
export const home = (req,res)=>{
    db.query(`SELECT * FROM Post`,(err,result)=>{

        res.render('index',{avatar:{link:req.session.passport.user.userAvatar},post:result});
    })
}

export const login = (req,res)=>{

    res.render('login');
}

export const register = (req,res)=>{
    res.render('register',{data:{error:{type:'username',state:false},message:''}});
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
                    res.render('register',{data:{error:{type:'email',state:true},message:'Email already used'}})
                    console.log('Email already used');
                }
            })
        }else{
            res.render('register',{data:{error:{type:'username',state:true},message:'Username is already taken'}})
            console.log('Username is already taken');
        }
    })



}


export const post = (req,res)=>{
    db.query(`SELECT userAvatar from Users WHERE userId ='${req.session.passport.user}'`,(err,result)=>{
        if(err) throw err
    res.render('create-post',{avatar:{link:req.session.passport.user.userAvatar}});
    })
}

export const Post = (req,res)=>{
    console.log(req.body);
    const data = {
        postTitle:req.body.postTitle,
        postContent:req.body.postContent,
        userAvatar:req.session.passport.user.userAvatar,
        userName:req.session.passport.user.userName
    }
    db.query(`INSERT INTO Post(userId,userPost) VALUES('${req.session.passport.user.userId}','${JSON.stringify(data)}')`,(err,result)=>{
        if(err) throw err
        console.log(result);
        res.redirect('/')
    })
}