var express = require("express");
var router = express.Router();
const request = require("request");

const YELP_CID = process.env.YELP_CID;
const YELP_KEY = process.env.YELP_KEY;

router.get("/", function(req, res, next) {
    let rText = req.query.text;

    let resOpts = {
        url: "https://api.yelp.com/v3/businesses/search",
        headers: { Authorization: `Bearer ${YELP_KEY}` },
        json: true,
        qs: {
            latitude: "42.361145",
            longitude: "-71.057083",
            term: rText,
            limit: 20
        }
    };
    console.log("Getting ", resOpts);
    request.get(resOpts, function(error, response, body) {
        res.json(body);
    });
});

router.get("/info", function(req, res, next) {
    let id = req.query.id;

    let resOpts = {
        url: `https://api.yelp.com/v3/businesses/${id}`,
        headers: { Authorization: `Bearer ${YELP_KEY}` },
        json: true
    };
    console.log("Getting ", resOpts);
    request.get(resOpts, function(error, response, body) {
        res.json(body);
    });
});

module.exports = router;
