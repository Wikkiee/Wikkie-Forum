import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';

import path from 'path';
import db from './database.js'
import {home,login,Login,register,Register} from './routes.js';

const PORT = 3000
const app = express();
const __dirname = path.resolve();

app.set('view engine', 'ejs',path);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/',home);

app.get('/login',login);

app.post('/login',Login);

app.get('/register',register);

app.post('/register',Register)


app.listen(PORT, err =>{
    if(err) console.log(err)
    console.log('Server started on: http://localhost:3000/');
})