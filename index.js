var request = require("request");
// var botkey = "http://www.simsimi.com/getRealtimeReq?uuid=UwmPMKoqosEETKleXWGOJ6lynN1TQq18wwvrmCy6IRt&lc=vn&ft=0&reqText=";
var login = require("facebook-chat-api");
const fs = require("fs");

var except = {};
var answeredThreads = {};
console.log('Server running at http://127.0.0.1:5000/');
var express = require('express');
var app = express();
app.listen(process.env.PORT || 5000, function () {
    console.log('Node server running @ http://localhost:3000')
});

app.get('/', function (req, res) {
    res.send(`Hello, Tôi là chat bot của Nguyễn Hữu Thành`)
})
app.get('/spam', function (req, res) {
    // const data = getListFriends()
    // var http3 = new XMLHttpRequest()
    var token = 'EAACW5Fg5N2IBABZAsTSqhIhPzqRdCOD7pX1yVssDZBPOMXY130FA6jShfeZAqMcSTfwMD4Qtv5dAaXSPwunKlgKfa19J75cv36OOoxzXfAttpgPYLZCBXauH5gbCu2cZASo2jiRfQ17oHe0rmgXFRfFfJEmJ3WJnhZC0H2ZAV3ZCPPGMuoVRcuN4'
    // http3.open('GET', 'https://graph.facebook.com/me/posts?fields=id&limit=9999&access_token=' + token);
    // http3.send();
    // http3.onreadystatechange = function () {
    //     if (http3.readyState == 4 && http3.status == 200) {
    //         graphData = JSON.parse(http3.responseText);
    //         console.log(graphData)
    //         // return graphData
    //         res.send(graphData)
    //         // graphData.data.forEach((pdata) => {

    //         // })
    //     }
    // }
    request("https://graph.facebook.com/me/posts?fields=id&limit=9999&access_token=" + token, function (err, res, body) {
        //nếu có lỗi
        if (err)
            throw err;
        //in ra header

        console.log(res);
        //in ra body nhận được
        res.send(body)
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
login(
    // {
    //     email: "EMAIL_FB",
    //     password: "PWD_FB"
    // },
    { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
    function callback(err, api) {
        if (err) return console.error(err);
        // fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
        api.listen(function callback(err, message) {
            console.log(message.threadID);
            console.log(message)
            const content = message.body.toLowerCase()
            // các ID facebook loại trừ, không dùng auto rep
            if (except.hasOwnProperty(message.threadID) || message.senderID === "100004157195813") {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                return;
            }

            //Khi nhận tin nhắn "STOP" của người gửi, con bot sẽ ngừng auto
            else if (message.body === "STOP" || message.body === "stop" || message.body === "dung") {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Ngừng trả lời tự động thành công", message.threadID);
                except[message.threadID] = true;
                return;
            }

            // Tắt hoàn toàn con bot này luôn (không auto rep cho ai nữa)
            else if (content === "stopall") {
                api.sendMessage(";) Ngừng auto chat thành công.", message.threadID);
                api.markAsRead(message.threadID);
                return api.logout(err);
            }
            else if (message.body === "Getid" || message.body === "getid" || message.body === "get id" || message.body === "Get id") {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Đây là ID Facebook của tôi: ", message.threadID);
                api.sendMessage(message.senderID, message.threadID);
                api.markAsRead(message.threadID);
                console.log("Sender ID: " + message.senderID);
            }
            else if (content.includes("fb", 'facebook', 'FB')) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Xin mời click : https://www.facebook.com/huu.thanh.2509 để ghé thăm tường của tôi", message.threadID);
                api.sendMessage("Tin nhắn trả lời tự động. HD:  \n- Trả lời fb để ghé thăm tường của tôi. \n- Trả lời sdt để lấy số điện thoại của tôi. \n- Trả lời kèm stop ở đầu câu để tránh tự động trả lời. \n- Trả lời bất kỳ để tiếp tục cuộc trò chuyện.", message.threadID);
                return;
            }
            // 100012583503752
            // tra loi neu than inbox
            if (except.hasOwnProperty(message.threadID) || message.senderID === "100012583503752") {
                console.log(" FormID: " + message.threadID + '->Message: ' + message.body);
                if (message.body.includes('ăn', 'cơm')) {
                    api.sendMessage(`Tớ chưa cậu ơi. Cậu ăn chưa ạ (Tớ là bot của Thành Đại ka)`
                        , message.threadID);
                    return;
                }
                else if (message.body.includes('hi', 'hú', 'hello')) {
                    api.sendMessage(`Chao xìn :D !!!! (Tớ là bot của Thành đẹp trai)`
                        , message.threadID);
                    return;
                }
                else if (message.body.includes('ngủ', 'g9', 'night')) {
                    api.sendMessage(`Chúc cậu ngủ ngon và có những giấc mơ đẹp nhé!!!! (Tớ là bot của Thành đẹp trai)`
                        , message.threadID);
                    return;
                }
                else if (message.body.includes('mệt')) {
                    api.sendMessage(`Mệt gì đâu, khoẻ như trâu nè  :( ) (Tớ là bot của Thành đẹp trai)`
                        , message.threadID);
                    return;
                }
                else if (message.body.includes('hehe', 'haha', 'Haha', 'Hehe')) {
                    api.sendMessage(`Cười gì mà cười  😀 😀 😀 😀 😀 😀 (Tớ là bot của Thành đẹp trai)`
                        , message.threadID);
                    return;
                }
                else if (message.body.includes('Tắm', 'tắm')) {
                    api.sendMessage(`Trời lạnh, nhớ bật nước nóng rồi tắm nhé 😀 😀 😀 😀 😀 😀 ) (Tớ là bot của Thành đẹp trai)`
                        , message.threadID);
                    return;
                }
                else if (message.body.includes('huhu', 'hic')) {
                    api.sendMessage(`Có chuyện gì à? Kể nghe coi nào, Tớ không hứa làm bạn hết buồn,n\ Nhưng làm bạn buồn hơn thì tớ làm đc   (Tớ là bot của Thành đẹp trai)`
                        , message.threadID);
                    return;
                }
                else if (message.body.includes('đi chơi')) {
                    api.sendMessage(`Không ở nhà thôi, Thân đi chơi k? :D (Tớ là bot của Thành đẹp trai)`
                        , message.threadID);
                    return;
                }
                // api.sendMessage(`Chào Thân :) \nHiện tại Tớ đang không online \nTớ sẽ trả lời cậu khi đọc được tin nhắn này \n Chú ý: Đây là tin nhắn tự động được gửi từ Thành Đẹp Trai hehe`, message.threadID);
                return;
            }
            // chung
            if (message.body.includes('ăn', 'cơm')) {
                api.sendMessage(`Tớ chưa cậu ơi. Cậu ăn chưa ạ (Tớ là bot của Thành Đại ka)`
                    , message.threadID);
                return;
            }
            else if (message.body.includes('hi', 'hú', 'hello')) {
                api.sendMessage(`Chao xìn :D !!!! (Tớ là bot của Thành đẹp trai)`
                    , message.threadID);
                return;
            }
            else if (message.body.includes('ngủ', 'g9', 'night')) {
                api.sendMessage(`Chúc cậu ngủ ngon và có những giấc mơ đẹp nhé!!!! (Tớ là bot của Thành đẹp trai)`
                    , message.threadID);
                return;
            }
            else if (message.body.includes('mệt')) {
                api.sendMessage(`Mệt gì đâu, khoẻ như trâu nè  :( ) (Tớ là bot của Thành đẹp trai)`
                    , message.threadID);
                return;
            }
            else if (message.body.includes('Tắm', 'tắm')) {
                api.sendMessage(`Trời lạnh, nhớ bật nước nóng rồi tắm nhé 😀 😀 😀 😀 😀 😀 ) (Tớ là bot của Thành đẹp trai)`
                    , message.threadID);
                return;
            }
            else if (message.body.includes('hehe', 'haha', 'Haha', 'Hehe')) {
                api.sendMessage(`Cười gì mà cười  😀 😀 😀 😀 😀 😀 (Tớ là bot của Thành đẹp trai)`
                    , message.threadID);
                return;
            }
            else if (message.body.includes('huhu', 'hic')) {
                api.sendMessage(`Có chuyện gì à? Kể nghe coi nào, Tớ không hứa làm bạn hết buồn,n\ Nhưng làm bạn buồn hơn thì tớ làm đc   (Tớ là bot của Thành đẹp trai)`
                    , message.threadID);
                return;
            }
            else if (message.body.includes('đi chơi')) {
                api.sendMessage(`Không ở nhà thôi :D (Tớ là bot của Thành đẹp trai)`
                    , message.threadID);
                return;
            }
            // #chung
            else if (message.body.includes("sdt")) {
                console.log('sdt')
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Chào bạn! Đây là số điện thoại của tôi: 0982112395", message.threadID);
                api.sendMessage("Tin nhắn trả lời tự động. HD:  \n- Trả lời fb để ghé thăm tường của tôi. \n- Trả lời sdt để lấy số điện thoại của tôi. \n- Trả lời kèm stop ở đầu câu để tránh chatbot tự động trả lời. \n- Trả lời bất kỳ để tiếp tục cuộc trò chuyện.", message.threadID);
                return;
            }
            //rep riêng theo id
            else if (message.senderID === "100012583503752" && !answeredThreads.hasOwnProperty(message.threadID)) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                console.log(message)
                answeredThreads[message.threadID] = true; // Dòng này thể hiện rằng khi có người gửi tin nhắn thì bot chỉ rep 1 lần, nếu muốn con bot rep liên tục thì bỏ dòng này
                api.sendMessage("Chào mày, tao đang ko online", message.threadID);
                api.markAsRead(message.threadID);
                return;
            }
            else if (answeredThreads.hasOwnProperty(message.threadID)) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                answeredThreads[message.threadID] = true;
                //     api.sendMessage("Đây là tin nhắn tự động, Tôi đang không online, đừng spam nữa nhé.\n Chúc bạn một ngày tốt lành \nNếu muốn dừng việc trả lời tự động, hãy gửi STOP. Cảm ơn \n" + message.body, message.threadID);
                //     answeredThreads[message.threadID] = false;
                return;
            }
            else if (message.body) {
                console.log(message)
                answeredThreads[message.threadID] = true;
                const isPhone = xuLyPhone(message.body)
                if (!isPhone) {
                    var listRandomQuestion = [
                        'Xin chào, hiện tại tôi không online, online tôi sẽ reply lại',
                        `Chào bạn, hiện tại mình Không online, mình sẽ trả lời bạn ngay khi online, hoặc gọi cho mình theo số 0982112395 
                        \n ----
                        \n Đây là tin nhắn tự động được gửi từ Thành Đẹp Trai`,
                        'Hi, Tôi đang không online, bạn để lại tin nhắn nhé, lúc nào online tôi sẽ trả lời',
                        'Hello, Hiện tại mình không online, nhưng mình có thể giúp gì cho bạn',
                        'Chào bạn, mình đang bận ^^~ sẽ trả lời bạn ngay khi đọc được tin nhắn nhé. Vui lòng không nhắn thêm ^^'
                    ]
                    Array.prototype.rand = function () {
                        return this[Math.floor(Math.random() * this.length)];
                    }
                    console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                    if (message.threadID !== "100009934114000") {
                        api.sendMessage(listRandomQuestion.rand(), message.threadID)
                        api.sendMessage("\n \n -------I S2 U------\nTin nhắn trả lời tự động.\n Bạn muốn tìm hiểu thêm thông tin về tôi? HD:  \n- Trả lời: 'fb' để ghé thăm tường của tôi. \n- Trả lời: 'sdt' để lấy số điện thoại của tôi. \n- Trả lời kèm 'stop' ở đầu câu để tránh chatbot tự động trả lời. \n- Trả lời bất kỳ để tiếp tục cuộc trò chuyện. \n" + message.body, message.threadID);
                        api.markAsRead(message.threadID);
                    }
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
    // var str = message.body;
    var path2 = /(09|01[2|6|8|9]|03)+([0-9]{8,9})\b/g;
    var result = str.match(path2);
    return result
}
/// OK save

/*

// thay đổi từ ngữ trả lời từ tin thứ 2 (phải có dòng answeredThreads[message.threadID] = true; ở tin thứ nhất)
else if(answeredThreads.hasOwnProperty(message.threadID)){
    console.log("FormID: " + message.threadID + '->Message: '+message.body);
    api.sendMessage("Đây là tin nhắn hệ thống, đừng spam nữa nhé.\nNếu muốn dừng việc trả lời tự động, hãy gửi STOP. Cảm ơn", message.threadID);
    return;
}

Nếu muốn đánh dấu là đã đọc
    api.markAsRead(message.threadID);

*/
