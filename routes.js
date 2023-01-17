import db from './database.js';
import bcrypt from "bcrypt";




export const home = (req,res)=>{
    res.render('index');
}

export const login = (req,res)=>{
   
    res.render('login');
}

export const Login = (req,res)=>{
    db.query(`SELECT * FROM Users WHERE userEmail = '${req.body.userEmailId}'`,(err,result)=>{
        if(err) throw err
        if(result.length !== 0){
            console.log(result);
            const hash = bcrypt.compareSync(req.body.userPassword, result[0].userPassword);
            if(hash){
                res.redirect('/')
            }else{
                console.log('Wrong password');
                res.redirect('/login')
            }
        }else{
            console.log('Wrong email ID');
            res.redirect('/login')
        }
    })
    // res.redirect('/')
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
                    db.query(`INSERT INTO Users(userName, userEmail,userPassword) VALUES('${req.body.userName}','${req.body.userEmailId}','${hash}');`,(err,result)=>{
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