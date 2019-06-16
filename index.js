//***********************************
//*			Install Modules			*
//*---------------------------------*
//*		Install with command		*
//*									*
//* npm install request				*
//* npm install facebook-chat-api	*
//*									*
//***********************************
// Facebook Chat API By MR.Thanh
// Git_URL: https://github.com/Schmavery/facebook-chat-api
// URL: https://github.com/hoanganhnh2009/chatbotprofile
// Code: Nguyen Huu Thanh - thanhnh2509@gmail.com

var request = require("request");
var rp = require("request-promise");
var querystring = require("querystring");
var login = require("facebook-chat-api");
const fs = require("fs");
const cheerio = require("cheerio");
var except = {};
var answeredThreads = {};
console.log("Server running at http://127.0.0.1:5000/");
var express = require("express");
var app = express();
// time
var today = new Date();
var day = today.getDate();
var h = today.getHours();
var phut = today.getMinutes();
// end time
let port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`App listening port: ${port}`);
});

app.get("/", function(req, res) {
  res.send(`Hello, Tôi là chat bot của Nguyễn Hữu Thành`);
});
login(
/*   {
    email: "",
    password: ""
  }, */
  { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
  function callback(err, api) {
    if (err) return console.error(err);
    // fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    api.listen(function callback(err, message) {
      console.log(message);
      api.getUserInfo(message.senderID, function(err, ret) {
        console.log("TCL: callback -> ret", ret)
        if (err) return console.error(err);
        for (var prop in ret) {
          if (ret.hasOwnProperty(prop) && ret[prop].name) {
            console.log("TCL: callback -> ret[prop].name", ret[prop].name);
          }
        }
      });
      return;
    });
  }
);
