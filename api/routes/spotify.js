var express = require('express');
var router = express.Router();

var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var SpotifyWebApi = require('spotify-web-api-node');


var client_id = process.env.SPOTIFY_CID; // Your client id
var client_secret = process.env.SPOTIFY_SEC; // Your secret
var redirect_uri = 'http://localhost:8889/spotify/callback'; // Your redirect uri


var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';



/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({"hello": "world"});
  });


  router.get("/spotify", function(req, res, next){
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });
  
  router.get('/callback', function(req, res) {
  
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });

          var spotifyApi = new SpotifyWebApi({
            clientId: '',
            clientSecret: '',
            redirectUri: 'http://localhost:8889/callback'
          });


spotifyApi.setAccessToken(access_token);
  
          /* Get followed artists */
spotifyApi.getFollowedArtists({ limit : 3 })
.then(function(data) {
  // 'This user is following 1051 artists!'
  console.log('This user is following ', data.body.artists.total, ' artists!');
}, function(err) {
  console.log('Something went wrong!', err);
});

spotifyApi.getMySavedAlbums({
  limit : 1,
  offset: 0
})
.then(function(data) {
  // Output items
  console.log(data.body.items);
}, function(err) {
  console.log('Something went wrong!', err);
});


spotifyApi.getMySavedTracks({
  limit : 2,
  offset: 1
})
.then(function(data) {
  console.log('Done!');
}, function(err) {
  console.log('Something went wrong!', err);
});

spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK')
.then(function(data) {
  console.log(data.body);
}, function(err) {
  done(err);
});







        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });
  
  router.get('/refresh_token', function(req, res) {
  
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

module.exports = router;