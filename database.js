import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection(
    {
        host     : process.env.DATABASE_HOST,
        port     : process.env.DATABASE_PORT,
        user     : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_DATABASE,
      }
)

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
    db.query(`CREATE TABLE IF NOT EXISTS Users(
      userId INT NOT NULL AUTO_INCREMENT,
      PRIMARY KEY(userId),
      userName varchar(255),
      userEmail varchar(255),
      userPassword varchar(255),
      userAvatar LONGTEXT
  )`,(err,result)=>{
      if(err) console.log(err);
      console.log(result);
  })
  });

export default db;