import db from './database.js';

import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();
 
export const home = (req,res)=>{
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
        console.log(result.length)
        if(result.length===0){
            db.query(`SELECT userEmail FROM Users WHERE userEmail = '${req.body.userEmailId}'`,async(err,result)=>{
                if(err) console.log(err);
                if(result.length === 0){
                    const hash = bcrypt.hashSync(req.body.userPassword, parseInt(process.env.SALTROUNDS));
                    const avatar = generator.generateRandomAvatar()
                    db.query(`INSERT INTO Users(userName, userEmail,userPassword,userAvatar) VALUES('${req.body.userName}','${req.body.userEmailId}','${hash}','${avatar}');`,(err,result)=>{
                        if(err) console.log(err)
                        console.log("Inserted successfully");
                    })

                }else{
                    console.log('Email already used');
                }
            })
        }else{
            console.log('user name already exist');
        }
    })

    res.redirect('/login')

}