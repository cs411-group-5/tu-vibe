var express = require("express");
var router = express.Router();

var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_SRV;
const client = new MongoClient(uri, { useNewUrlParser: true });

router.get("/", function(req, res, next) {
  client.connect(err => {
    const collection = client.db("test").collection("devices");

    collection.insert({ hello: "world" });

    client.close();
  });

  res.json({ hello: "world" });
});

module.exports = router;
