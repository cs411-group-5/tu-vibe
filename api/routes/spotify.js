var express = require("express");
var router = express.Router();

var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var SpotifyWebApi = require("spotify-web-api-node");

var client_id = process.env.SPOTIFY_CID; // Your client id
var client_secret = process.env.SPOTIFY_SEC; // Your secret
var redirect_uri = "http://localhost:8889/spotify/callback"; // Your redirect uri

var generateRandomString = function(length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = "spotify_auth_state";

/* GET home page. */
router.get("/", function(req, res, next) {
    res.json({ hello: "world" });
});

router.get("/spotify", function(req, res, next) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = [
        "user-follow-read",
        "user-top-read",
        "user-library-read",
        "user-read-email",
        "user-read-private",
        "user-read-recently-played"
    ].join(" ");
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                response_type: "code",
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            })
    );
});

router.get("/callback", function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            "/#" +
                querystring.stringify({
                    error: "state_mismatch"
                })
        );
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code"
            },
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer(client_id + ":" + client_secret).toString(
                        "base64"
                    )
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token;
                const refresh_token = body.refresh_token;

                let user = {};

                var spotifyApi = new SpotifyWebApi({
                    clientId: process.env.SPOTIFY_CID,
                    clientSecret: process.env.SPOTIFY_SEC,
                    redirectUri: "http://localhost:8889/spotify/callback"
                });

                spotifyApi.setAccessToken(access_token);

                spotifyApi.getMe().then(data => {
                    console.log(
                        "Some information about the authenticated user",
                        data.body
                    );

                    user = data.body;
                    user["accessToken"] = access_token;
                    user["refreshToken"] = refresh_token;

                    const db = req.app.locals.db;
                    const col = db.collection("users");
                    col.insertOne(user);
                });

                res.json({ spotify: user });
            } else {
                res.redirect(
                    "/#" +
                        querystring.stringify({
                            error: "invalid_token"
                        })
                );
            }
        });
    }
});

router.get("/refresh_token", function(req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization:
                "Basic " +
                new Buffer(client_id + ":" + client_secret).toString("base64")
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                access_token: access_token
            });
        }
    });
});

module.exports = router;
