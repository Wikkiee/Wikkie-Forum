import express from 'express';

import ejs from 'ejs';
import path from 'path';


const PORT = 3000
const app = express();
const __dirname = path.resolve();

app.set('view engine', 'ejs',path)
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.render('index');
})






app.listen(PORT, err =>{
    if(err) console.log(err)
    console.log('Server started on: http://localhost:3000/');
})