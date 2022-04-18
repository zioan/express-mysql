const express = require('express');
const mysql = require('mysql');
const app = express();

//Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test-db',
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log('MySQL connected...');
});

//create DB
// app.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE nodemysql';
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//       console.log(result);
//     } else {
//       res.send('database created');
//     }
//   });
// });

//create table
app.get('/createpostsatable', (req, res) => {
  let sql =
    'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send('Posts table created');
    }
  });
});

//insert data
app.get('/add', (req, res) => {
  let post = {
    title: 'Post 2',
    body: 'This is post 2 body.',
  };
  let sql = 'INSERT INTO posts set ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//get all data
app.get('/getall', (req, res) => {
  let sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

//get data by id
app.get('/get/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//update
app.get('/update/:id', (req, res) => {
  let newData = {
    title: 'data from req.body.title 2',
    body: 'data from req.body.body 22',
  };
  let sql = `UPDATE posts SET title = '${newData.title}', body = '${newData.body}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//delete
app.get('/delete/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.listen('3001', () => {
  console.log('server started on port 3001');
});
