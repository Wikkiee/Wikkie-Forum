import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { initialize } from './passport-config.js';
import path from 'path';
import session from 'express-session';
import flash from 'express-flash'
import {home,login,register,Register,post,Post,vote} from './routes.js';

initialize(passport)

const PORT = 3000
const app = express();
const __dirname = path.resolve();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 9000000000000
    }
  }))
app.set('view engine', 'ejs',path);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(flash())
app.use(passport.session())

app.get('/',checkAuthenticated,home)


app.get('/login',checkNotAuthenticated,login);

app.post('/login',passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash:true
  }));

app.get('/register',checkNotAuthenticated,register);

app.post('/register',checkNotAuthenticated,Register)

app.get('/post',checkAuthenticated,post)

app.post('/post',checkAuthenticated,Post)

app.post('/vote',vote)



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


app.listen(PORT, err =>{
    if(err) console.log(err)
    console.log('Server started on: http://localhost:3000/');
})

