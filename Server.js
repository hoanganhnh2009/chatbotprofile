var request = require("request");
// var botkey = "http://www.simsimi.com/getRealtimeReq?uuid=UwmPMKoqosEETKleXWGOJ6lynN1TQq18wwvrmCy6IRt&lc=vn&ft=0&reqText=";
var login = require("facebook-chat-api");
const fs = require("fs");

var except = {};
var answeredThreads = {};
console.log('Server running at http://127.0.0.1:5000/');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

app.listen(process.env.PORT || 5000, function () {
    console.log('Node server running @ http://localhost:3000')
});

app.get('/', function (req, res) {
    res.send(`Hello, Tôi là chat bot của Nguyễn Hữu Thành`)
})
app.get('/spam', function (req, res) {
    var token = 'EAACW5Fg5N2IBABZAsTSqhIhPzqRdCOD7pX1yVssDZBPOMXY130FA6jShfeZAqMcSTfwMD4Qtv5dAaXSPwunKlgKfa19J75cv36OOoxzXfAttpgPYLZCBXauH5gbCu2cZASo2jiRfQ17oHe0rmgXFRfFfJEmJ3WJnhZC0H2ZAV3ZCPPGMuoVRcuN4'
    request("https://graph.facebook.com/me/posts?fields=id&limit=9999&access_token=" + token, function (err, result, body) {
        if (err)
            throw err;
        console.log(body);
        // res.send(body)
        res.send(JSON.parse(body))
    })
})

app.get('/send', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Test đây là tin nhắn tự động :D :D :D :D :D", 100009934114000);
            res.send('da gui')
        })
})
// 6h30
app.get('/chaobuoisang', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Đến giờ rồi, dậy đánh răng rửa mặt ăn sáng đê êm ơi.\n Ngủ lười quá rồi đấy \n  😎😎😎😎😎😎😎", 100009934114000);
            res.send('da gui buoi sang')
        })
})

app.get('/chaobuoitrua', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Đến giờ rồi em ăn uống gì chưa.\n Ăn hết không hay đổ thừa cho chó \n Rep anh đi xin đừng bỏ bỏ \n Anh chỉ hỏi chứ không phải tỏ tình đâu \n 😎😎😎😎😎😎😎",
                // 100009934114000);
                100003257982076);
            res.send('da tin buoi trua')
        })
})

app.get('/chaobuoitoi', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Khuya rồi em, nhắm mắt ngủ đi thôi!\nĐêm buông rơi sao sáng cả một trời\nAnh hái gửi cho em vào mơ mộng \nĐể giấc nồng không lạc lõng chơi vơi\n😎😎😎😎😎😎😎",
                100009934114000);
                // 100003257982076);
            res.send('da tin buoi toi')
        })
})



function getListFriends() {
    var http3 = new XMLHttpRequest()
    var token = 'EAACW5Fg5N2IBABZAsTSqhIhPzqRdCOD7pX1yVssDZBPOMXY130FA6jShfeZAqMcSTfwMD4Qtv5dAaXSPwunKlgKfa19J75cv36OOoxzXfAttpgPYLZCBXauH5gbCu2cZASo2jiRfQ17oHe0rmgXFRfFfJEmJ3WJnhZC0H2ZAV3ZCPPGMuoVRcuN4'
    http3.open('GET', 'https://graph.facebook.com/me/posts?fields=id&limit=9999&access_token=' + token);
    http3.send();
    http3.onreadystatechange = function () {
        if (http3.readyState == 4 && http3.status == 200) {
            graphData = JSON.parse(http3.responseText);
            console.log(graphData)
            return graphData
            // graphData.data.forEach((pdata) => {

            // })
        }
    }

}

function getToDay() {
    var today = new Date();
    var day = today.getDate();
    var h = today.getHours();
    var phut = today.getMinutes();
    console.log(day)
}
getToDay()