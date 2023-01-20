import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import db from './database.js'

export const initialize = (passport)=>{
    const authenticateUser = async(email,password,done)=>{
        db.query(`SELECT * FROM Users WHERE userEmail='${email}'`,async (err,result)=>{
            if(err) throw err
            const user = result[0]
            if(user == null){
                console.log('No user with that email');
                return done(null,false,{ message: 'No user with that email' })
            }
            try{
                console.log(password);
                if(await bcrypt.compare(password,user.userPassword)){
                    console.log('logged in successfully');
                    return done(null,user)
                }else{
                    console.log('Password incorrect');
                    return done(null, false, { message: 'Password incorrect' })
                }
            }catch(e){
                done(e)
            }
        })
        
    }
    passport.use(new Strategy({usernameField:'userEmailId',passwordField:'userPassword'},authenticateUser))
    passport.serializeUser((user, done) =>{
        done(null, user.userId)
        
    })
    passport.deserializeUser((id, done) => {
        db.query(`SELECT * FROM Users WHERE userId='${id}'`,(err,result)=>{
            done(null, result[0].userId === id)
        })
    })
    

}
