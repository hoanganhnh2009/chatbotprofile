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
// AbitBot
var request = require("request");
var login = require("facebook-chat-api");

var except = {};
var answeredThreads = {};
console.log('Server running at http://127.0.0.1:5000/');
var express = require('express');
var fs = require('fs');
var app = express();
// time
var today = new Date();
var day = today.getDate();
var h = today.getHours();
var phut = today.getMinutes();
// end time
let port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`App listening port: ${port}`);
});

app.get('/', function (req, res) {
    res.send(`Hello, Tôi là chat bot của Nguyễn Hữu Thành`)
})
app.get('/send', () => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Test đây là tin nhắn tự động :D :D :D :D :D", 100009934114000);
        })
})
app.get('/spam', function (req, res) {
    var token = 'EAACW5Fg5N2IBABZAsTSqhIhPzqRdCOD7pX1yVssDZBPOMXY130FA6jShfeZAqMcSTfwMD4Qtv5dAaXSPwunKlgKfa19J75cv36OOoxzXfAttpgPYLZCBXauH5gbCu2cZASo2jiRfQ17oHe0rmgXFRfFfJEmJ3WJnhZC0H2ZAV3ZCPPGMuoVRcuN4'
    request("https://graph.facebook.com/me/posts?fields=id&limit=9999&access_token=" + token, function (err, res, body) {
        //nếu có lỗi
        if (err)
            throw err;
        console.log(res);
        res.send(body)
    })
})

function getListFriends() {
    return
}
login(
    // {
    //     email: "EMAIL_FB",
    //     password: "PWD_FB"
    // },
    { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
    function callback(err, api) {
        if (err) return console.error(err);
        api.setOptions({ listenEvents: true });
        // fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
        api.listen(function callback(err, message) {
            console.log(message.threadID);
            console.log(message)
            switch (message.type) {
                case "message":
                    console.log('message')
                    if (message.body === '/stop') {
                        api.sendMessage("Goodbye...", message.threadID);
                        return stopListening();
                    }
                    api.markAsRead(message.threadID, (err) => {
                        if (err) console.log(err);
                    });
                    api.sendMessage("TEST BOT: " + message.body, message.threadID);
                    break;
                case "event":
                    console.log('event')
                    console.log(message);
                    break;
                case "message_reaction":
                    console.log('message_reaction')
                    console.log(message);
                    api.sendMessage("Sao bạn lại " + message.reaction, message.threadID);
                    break;
                // case "read_receipt":
                //     console.log('dasda')
                //     break;    
                default:
                    console.log('ngoai le')
                    console.log(message);
                    break;
            }
            // các ID facebook loại trừ, không dùng auto rep
            if (except.hasOwnProperty(message.threadID) || message.senderID === "100004157195813") {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                return;
            }
            else if (message.body) {
                answeredThreads[message.threadID] = true;
                const isPhone = xuLyPhone(message.body)
                if (!isPhone) {
                    // api.changeThreadEmoji("💯", message.threadID, (err) => {
                    //     if (err) return console.error(err);
                    //     console.log('adasdsa')
                    // });
                    // api.threadColors()
                    // api.changeThreadColor("#44bec7", message.threadID, (err) => {
                    //     if (err) return console.error(err);
                    // });
                    api.sendTypingIndicator(message.threadID)
                    return;
                } else {
                    api.sendMessage('Chào bạn, Đây có phải là số điện thoại của bạn ' + isPhone[0], message.threadID)
                    api.markAsRead(message.threadID);
                    return;
                }
            }
        });
    });



function xuLyPhone(str) {
    var path2 = /(09|01[2|6|8|9]|03)+([0-9]{8,9})\b/g;
    var result = str.match(path2);
    return result
}
