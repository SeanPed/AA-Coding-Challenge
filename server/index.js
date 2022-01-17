const express = require("express");
const app = express();
const mysql = require("mysql");
var async = require("async");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "test123",
  connectionLimit: 10,
  database: "ad_alliance_coding_challenge",
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get("/", (req, res) => {
  const query1 =
    "SELECT * FROM table1 WHERE position = 1 AND hour = HOUR(NOW()) UNION SELECT * FROM table2 WHERE position = 1 AND hour = HOUR(NOW()) ORDER BY priority, views LIMIT 1";
  const query2 =
    "SELECT * FROM table1 WHERE position = 2 AND hour = HOUR(NOW()) UNION SELECT * FROM table2 WHERE position = 2 AND hour = HOUR(NOW()) ORDER BY priority, views LIMIT 1";

  const return_data = {};

  async.parallel(
    [
      function (parallel_done) {
        db.query(query1, {}, function (err, results) {
          if (err) return parallel_done(err);
          return_data.position1 = results;
          parallel_done();
        });
      },
      function (parallel_done) {
        db.query(query2, {}, function (err, results) {
          if (err) return parallel_done(err);
          return_data.position2 = results;
          parallel_done();
        });
      },
    ],
    function (err) {
      if (err) console.log(err);
      res.send(return_data);
    }
  );
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
