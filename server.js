const express = require("express");
const app = new express();

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "repaso"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("BASE DE DATOS CONECTADA!");
});

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/registro", (req, res) => {
  const email = req.body.email; 
  const sql1 = "select * from usuario where email ='" + email + "'";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      res.json("Email en uso");
    } else {
      // registro mysql
      const sql2 = "insert into usuario values (default,'" + email + "')";
      con.query(sql2, function (err, result) {
        if (err) throw err;
        res.json("Email registrado correctamente!");
      });
    }
  });
});

app.listen(3000, () => {
  console.log("SERVER INICIADO!");
});