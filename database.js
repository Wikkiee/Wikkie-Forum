import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection(
    {
        host     : process.env.DATABASE_HOST,
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
      indexId INT NOT NULL AUTO_INCREMENT,
      userId varchar(255),
      PRIMARY KEY(indexId),
      userName varchar(255),
      userEmail varchar(255),
      userPassword varchar(255),
      userAvatar LONGTEXT,
      userPost json
  )`,(err,result)=>{
      if(err) console.log(err);
      db.query(`CREATE TABLE IF NOT EXISTS Post(
        postIndexId INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY(postIndexId),
        indexId INT,
        userId varchar(255),
        FOREIGN KEY (indexId) REFERENCES Users(indexId),
        userPost json,
        votes INT
    )`,(err,result)=>{
        if(err) console.log(err);
        db.query(`CREATE TABLE IF NOT EXISTS Vote(
          voteIndexId INT NOT NULL AUTO_INCREMENT,
          PRIMARY KEY(voteIndexId),
          userId varchar(255),
          postVotes json
      )`,(err,result)=>{
        if(err) console.log(err);
        console.log(result);
      })
    })
  })
  });

export default db;