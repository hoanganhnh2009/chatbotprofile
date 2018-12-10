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
var botkey = "http://sandbox.api.simsimi.com/request.p?key=32eaa54a-bbe1-41dc-8d45-07dbe1005c64&lc=vn&ft=1.0&text=";
//thanhnh25091995@gmail.com 0ede1528-23ee-438a-b348-5494dcb1f227 expired
//thanhnh2509@gmail.com 4c6867ab-0f03-4921-8553-30214e4be8fb expired
// hoanganhnh2009@gmail.com 11a642eb-c7ba-4bfa-931f-cb85e46e6a90 expired
// nguyenviet..@gmail.com 90b328e3-975b-4a80-b4a9-bac67928c563 running
// mkt122@gmai.com 32eaa54a-bbe1-41dc-8d45-07dbe1005c64
var querystring = require('querystring');
var login = require("facebook-chat-api");
const fs = require("fs");

var except = {};
var answeredThreads = {};
console.log('Server running at http://127.0.0.1:5000/');
var express = require('express');
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
app.get('/getdate', function (req, res) {
    res.send(h + "-" + phut)
})
app.get('/test', function (req, res) {
    const a = "đasa"
    res.send(`Test url thôi nhé`)

})
app.get('/send', () => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Test đây là tin nhắn tự động :D :D :D :D :D", 100009934114000);
            res.send('oke nhe')

        })
})
// 6h30
app.get('/chaobuoisang', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Đến giờ rồi, dậy đánh răng rửa mặt ăn sáng đê êm ơi.\n Ngủ lười quá rồi đấy \n  😎😎😎😎😎😎😎",
                100009934114000);
            res.send('da gui buoi sang')
        })
})

// 11h20
app.get('/chaobuoitrua', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Đến giờ rồi em ăn uống gì chưa.\n Ăn hết không hay đổ thừa cho chó \n Rep anh đi xin đừng bỏ bỏ \n Anh chỉ hỏi chứ không phải tỏ tình đâu \n 😎😎😎😎😎😎😎",
                100009934114000);
            // 100003257982076);
            res.send('da tin buoi trua')
        })
})
// 11h
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
// #than
app.get('/chaobuoisangthan', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("Thân xinh gái ơi? Đến giờ rồi. \n Dậy đánh răng rửa mặt ăn sáng rồi đi làm thôi nào 😘😘😘😘😘😘",
                100012583503752);
            res.send('da gui than buoi sang')
        })
})
app.get('/testcron', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            Array.prototype.rand = function () {
                return this[Math.floor(Math.random() * this.length)];
            }
            const array = [
                'Muộn rồi, ngủ thôi cậu ơi. Chúc cậu ngủ ngon và có những giấc mơ đẹp',
                'Ngủ ngon nhé cậu! 😍😍😍😍',
                'Ting ting. Bây giờ là 0h. Lên giường đắp chăn, bật quạt đi ngủ thôi :) 😋😋😋😋',
                'Good night 😍😍😍😍',
                'Đến giờ đi ngủ rồi, ngủ sớm mai còn đi làm nào :) Ngủ ngon nhé :D 😜😜😜😜'
            ]
            if (err) return console.error(err);
            api.sendMessage(array.rand(),
                100012583503752);
            res.send('da gui tin nhan test thanh cong')
        })
})
app.get('/chaobuoitruathan', (req, res) => {
    login(
        { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
        function callback(err, api) {
            if (err) return console.error(err);
            api.sendMessage("\nTrăng lên đỉnh núi rồi kìa\nĂn cơm bằng đũa hay thìa vậy Thân?:v 😘😘😘😘😘😘",
                100012583503752);
            res.send('da gui than buoi trưa')
        })
})
app.get('/spam', function (req, res) {
    var token = 'EAACW5Fg5N2IBABZAsTSqhIhPzqRdCOD7pX1yVssDZBPOMXY130FA6jShfeZAqMcSTfwMD4Qtv5dAaXSPwunKlgKfa19J75cv36OOoxzXfAttpgPYLZCBXauH5gbCu2cZASo2jiRfQ17oHe0rmgXFRfFfJEmJ3WJnhZC0H2ZAV3ZCPPGMuoVRcuN4'
    request("https://graph.facebook.com/me/posts?fields=id&limit=9999&access_token=" + token, function (err, response, body) {
        //nếu có lỗi
        if (err)
            throw err;
        console.log(response);
        res.send(body)
    })
})

// comment
app.get('/cookie', function (req, res) {
    var appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8')).map((e, i) => { return { ...e, index: i } })
    // c_user=100004966144394;xs=31:6buTziuxWwYKEw:2:1544417391:13185:6238;fr=14E6RCpLCQU6T4TIi.AWXBEfUzW-8EqlCoedKRdF6iuF0.BcDfBv..AAA.0.0.BcDfBv.AWWzBUwr;datr=b_ANXLVAKFzKiP6DXzt6X33P
    var cookie = `sb=${appState[1].value}; datr=${appState[2].value}; dpr=2; locale=vi_VN; c_user=${appState[3].value}; xs=${appState[4].value}; pl=n; spin=${appState[6].value}; fr=${appState[0].value}; m_pixel_ratio=2; wd=1440x714;act=1544371921469%2F52; presence=${appState[7].value}`
    res.send(cookie)
})
// update dtsg when 12 hour
app.get('/dtsg', function (req, res) {
    var appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8')).map((e, i) => { return { ...e, index: i } })
    var cookie = `sb=${appState[1].value}; datr=${appState[2].value}; dpr=2; locale=vi_VN; c_user=${appState[3].value}; xs=${appState[4].value}; pl=n; spin=${appState[6].value}; fr=${appState[0].value}; m_pixel_ratio=2; wd=1440x714;act=1544371921469%2F52; presence=${appState[7].value}`
    const headers = {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        cookie,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    }
    request({
        headers: headers,
        uri: 'https://m.facebook.com',
        // body: formData,
        method: 'GET'
    }, function (error2, response2, body2) {
        if (error2) {
            console.log(error2)
            res.send(error2)
        } else {

            re = "/<input type=\"hidden\" name=\"fb_dtsg\" value=\"(.*?)\" autocomplete=\"off\" \\/>/"
            let result = body2.match(/<input type=\"hidden\" name=\"fb_dtsg\" value=\"(.*?)\" autocomplete=\"off\" \/>/);
            const dtsg = result[1]
            // da co dtsg :D
            var obj;
            fs.readFile('./app.json', 'utf8', function (err, data) {
                if (err) throw err;
                data = JSON.parse(data);
                data[1].value = dtsg
                // let data = JSON.stringify(student);
                fs.writeFileSync('./app.json', JSON.stringify(data));
                res.send(data)
            });
            // console.log(result)
            // res.send(dtsg)
        }
    })
})
function reaction(data, cb) {
    const fb_dtsg = 'AQEy55TVSfEQ:AQGFTPT83D4u'
    const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; dpr=2; locale=vi_VN; c_user=100004966144394; xs=42%3AHXLQHCfQdazmHg%3A2%3A1544337698%3A13185%3A6238; pl=n; spin=r.4617230_b.trunk_t.1544337699_s.1_v.2_; fr=0EcLrb28aceQK3p2i.AWWvOlhfK0xzZ3Un-9YN_NeUSjI.Bbjlby.cU.FwL.0.0.BcDTpC.AWWKtkYn; m_pixel_ratio=2; wd=1440x714; x-referer=eyJyIjoiL3N0b3J5LnBocD9zdG9yeV9mYmlkPTEwNzgwODExNDU3MDA3NDcmaWQ9MTAwMDA0OTY2MTQ0Mzk0JmZzPTEmZm9jdXNfY29tcG9zZXI9MCIsImgiOiIvc3RvcnkucGhwP3N0b3J5X2ZiaWQ9MTA3ODA4MTE0NTcwMDc0NyZpZD0xMDAwMDQ5NjYxNDQzOTQmZnM9MSZmb2N1c19jb21wb3Nlcj0wIiwicyI6Im0ifQ%3D%3D; act=1544371921469%2F52; presence=EDvF3EtimeF1544371984EuserFA21B04966144394A2EstateFDsb2F1544371539998EatF1544371587800Et3F_5bDiFA2user_3a1B03899463346A2EoF30EfF32CAcDiFA2user_3a1B12583503752A2ErF1EoF31EfF34C_5dElm3FA2user_3a1B12583503752A2Eutc3F1544371921364G544371984677CEchFDp_5f1B04966144394F75CC'
    var url = `https://m.facebook.com/a/comment.php?`
    let { parent_comment_id, parent_redirect_comment_token, reaction_comment_id, ft_ent_identifier } = data
    Array.prototype.rand = function () {
        return this[Math.floor(Math.random() * this.length)];
    }

    let form = {
        m_sess: null,
        fb_dtsg,
        // hiden wil not show reponse:
        // __ajax__: 'AYmeq9yftebnDNi6I4NJVqi6_TY80LoZEdqb8MJBOy_j7evDeTPhcR--wC9V7i8yzfwbJq-JsXaCz6vzhwJUTVCqG7Gs7CYX1a13CYB32laEJQ',
    }
    const formData = querystring.stringify(form);

    const headers = {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    }
    var contentLength = formData.length;
    var likes = [1, 2, 3, 4, 7, 8]
    const form_params = {
        parent_redirect_comment_token,
        reaction_comment_id,
        viewer_reaction: 2,
        // angry:8 like:1 love:2 haha:4 wow:3 sad:7
        snowflake: null,
        ft_ent_identifier,
    }
    console.log(form_params)
    let result = querystring.stringify(form_params)
    request({
        headers: headers,
        uri: url + result,
        body: formData,
        method: 'POST'
    }, function (error, response, body) {
        if (error) {
            console.log('loi')
            cb(error)
        } else {
            console.log('like thanh cong')
            cb(null, body)
        }
    })
}
login(
    // {
    //     email: "MAIL",
    //     password: "PWD"
    // },
    { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
    function callback(err, api) {
        if (err) return console.error(err);
        // fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
        api.listen(function callback(err, message) {
            if (message.type && message.type === "m_notification") {
                console.log(message)
                const { data } = message
                const { content_id, href, type } = data
                if (type === "feed_comment") {
                    let parent_comment_id = href.match(/reply_comment_id=([0-9]+)&/) ? href.match(/reply_comment_id=([0-9]+)&/)[1] : null
                    let comment_id = href.match(/comment_id=([0-9]+)&/) ? href.match(/comment_id=([0-9]+)&/)[1] : null
                    let ft_ent_identifier = href.match(/posts\/([0-9]+)?/) ? href.match(/posts\/([0-9]+)?/)[1] : null
                    let story_fbid = "" 
                    var bot_id = parent_comment_id || comment_id
                    let obj = {
                        ft_ent_identifier: ft_ent_identifier || story_fbid,
                        parent_comment_id: comment_id,
                        parent_redirect_comment_token: (ft_ent_identifier || story_fbid) + "_" + content_id,
                        reaction_comment_id: parent_comment_id ? parent_comment_id : comment_id,
                        bot_id: ft_ent_identifier + "_" + bot_id,
                    }
                    console.log('result')
                    console.log(obj)
                    reaction(obj, (loi, kq) => {
                        console.log('da like binh luan ' + obj.parent_redirect_comment_token)
                        return;
                    })
                }
            }
            console.log(message.threadID);
            console.log(message)
            const content = message.body ? message.body.toLowerCase() : null

            // like cai da roi tinh tiep
            changeThreadEmoji(message.messageID, (loi, kq) => {
                if (err) return;
                console.log('da like')
            })

            // các ID facebook loại trừ, không dùng auto rep
            if (except.hasOwnProperty(message.threadID) || message.senderID === "100004157195813") {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                return;
            }
            else if (message.senderID === "1000032579820761") {
                // Tài khoản clone để điều khiển bot
                if (content.includes("start")) {
                    const threadID = content.split("|")[1]
                    console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                    api.sendMessage("Bật trả lời tự động thành công cho id: " + threadID, message.threadID);
                    except[threadID] = true;
                }
                if (content.includes("stop")) {
                    const threadID = content.split("|")[1]
                    console.log(threadID)
                    console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                    api.sendMessage("Tắt trả lời tự động thành công cho id: " + threadID, message.threadID);
                    except[threadID] = false;
                }
                return;
            }
            else if (content.includes("start") || content === "batdau") {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Bật trả lời tự động thành công", message.threadID);
                except[message.threadID] = false
                return;
            }
            // else if (except.hasOwnProperty(message.threadID) || message.senderID === "100003257982076") {
            //     // bật tắt cho từng người 
            //     console.log("FormID: " + message.threadID + '->Message: ' + message.body);
            //     api.sendMessage("Ngừng trả lời tự động thành công", '');
            //     // except[message.threadID] = true;
            //     return;
            // }
            else if (content.includes("stop") || message.body === "dung") {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Ngừng trả lời tự động thành công", message.threadID);
                except[message.threadID] = true;
                return;
            }
            if (today.getDay() == 6 && (h >= 0 && h <= 23) && !answeredThreads.hasOwnProperty(message.threadID)) {
                api.getUserInfo(message.senderID, function (err, ret) {
                    console.log(ret)
                    for (var prop in ret) {
                        if (ret.hasOwnProperty(prop) && ret[prop].name) {
                            api.sendMessage("Xin lỗi " + ret[prop].name + "😰😰😰😰😰 \n, Hôm nay là thứ 7 Thành đại ca hôm nay đi chơi với ny rồi 😘😘😘😘😘😘.\n Em là con bot chat của anh ấy em được trả lời tự động ạ. Em có thể trả lời bất kỳ câu hỏi nào ạ.Cái gì em cũng biết thật ý nói gì đi. Ahihihi :D:D:D:D:D:D", prop, function () {
                                answeredThreads[message.threadID] = true;
                            });
                        }
                    }
                }); return;
            }
            if (today.getDay() == 0 && (h >= 0 && h <= 24) && !answeredThreads.hasOwnProperty(message.threadID)) {
                api.getUserInfo(message.senderID, function (err, ret) {
                    // if (err) return console.error(err);
                    for (var prop in ret) {
                        if (ret.hasOwnProperty(prop) && ret[prop].name) {
                            api.sendMessage("Xin lỗi " + ret[prop].name + ", Hôm nay là CN Thành đại ca đang ngủ. Em là con bot chat của anh ấy em được trả lời tự động ạ. Em có thể trả lời bất kỳ câu hỏi nào ạ.Cái gì em cũng biết thật ý nói gì đi. Ahihihi", prop, function () {
                                answeredThreads[message.threadID] = true;
                            });
                        }
                    }
                }); return;
            }
            if ((h >= 1 && h <= 23) && !answeredThreads.hasOwnProperty(message.threadID)) {
                api.getUserInfo(message.senderID, function (err, ret) {
                    // if (err) return console.error(err);
                    for (var prop in ret) {
                        if (ret.hasOwnProperty(prop) && ret[prop].name) {
                            api.sendMessage("Xin lỗi " + ret[prop].name + ", Giờ này đại ca Thành của em bận rồi. Em là bot chat trả lời tự động anh/chị có thể hỏi em. Cái gì em cũng biết thật ý nói gì đi. Ahihihi", prop, function () {
                                answeredThreads[message.threadID] = true;
                            });
                        }
                    }
                }); return;
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

            else if (message.body) {
                answeredThreads[message.threadID] = true;
                const isPhone = xuLyPhone(message.body)
                api.sendTypingIndicator(message.threadID)
                request(botkey +
                    encodeURI(message.body),
                    function (error, response, body) {
                        if (error) api.sendMessage("Chatbot không trả lời được :)", message.threadID);
                        if (body.indexOf("502 Bad Gateway") > 0 || body.indexOf("509") > 0 || body.indexOf('401') > 0) {
                            //         var listRandomQuestion = [
                            //             'Xin chào, hiện tại tôi không online, online tôi sẽ reply lại',
                            //             `Chào bạn, hiện tại mình Không online, mình sẽ trả lời bạn ngay khi online, hoặc gọi cho mình theo số 0982112395 
                            // \n ----
                            // \n Đây là tin nhắn tự động được gửi từ Thành Đẹp Trai`,
                            //             'Hi, Tôi đang không online, bạn để lại tin nhắn nhé, lúc nào online tôi sẽ trả lời',
                            //             'Hello, Hiện tại mình không online, nhưng mình có thể giúp gì cho bạn',
                            //             'Chào bạn, mình đang bận ^^~ sẽ trả lời bạn ngay khi đọc được tin nhắn nhé. Vui lòng không nhắn thêm ^^'
                            //         ]
                            //         Array.prototype.rand = function () {
                            //             return this[Math.floor(Math.random() * this.length)];
                            //         }
                            // api.sendMessage(listRandomQuestion.rand())
                            // api.sendMessage("\n \n --------\nTin nhắn trả lời tự động. HD:  \n- Trả lời fb để ghé thăm tường của tôi. \n- Trả lời sdt để lấy số điện thoại của tôi. \n- Trả lời kèm stop ở đầu câu để tránh chatbot tự động trả lời. \n- Trả lời bất kỳ để tiếp tục cuộc trò chuyện." + message.body, message.threadID);
                            return;
                        }
                        text = JSON.parse(body);
                        console.log('noi dung')
                        console.log(text)
                        if (text.status == "200" || text.result === 100) {
                            SimsimiAnswered = text.response;
                            if (message.body === text.response) {
                                return;
                            } else
                                SimsimiAnswered = text.response;
                            api.sendMessage(SimsimiAnswered, message.threadID);
                            api.markAsRead(message.threadID);
                            console.log("Answered:" + SimsimiAnswered);
                        }
                    });
                return;
            }
        });
    });

// changeThreadEmoji
function changeThreadEmoji(message_id, cb) {
    const fb_dtsg = 'AQEy55TVSfEQ:AQGFTPT83D4u'
    const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; dpr=2; locale=vi_VN; c_user=100004966144394; xs=42%3AHXLQHCfQdazmHg%3A2%3A1544337698%3A13185%3A6238; pl=n; spin=r.4617230_b.trunk_t.1544337699_s.1_v.2_; fr=0EcLrb28aceQK3p2i.AWWvOlhfK0xzZ3Un-9YN_NeUSjI.Bbjlby.cU.FwL.0.0.BcDTpC.AWWKtkYn; m_pixel_ratio=2; wd=1440x714; x-referer=eyJyIjoiL3N0b3J5LnBocD9zdG9yeV9mYmlkPTEwNzgwODExNDU3MDA3NDcmaWQ9MTAwMDA0OTY2MTQ0Mzk0JmZzPTEmZm9jdXNfY29tcG9zZXI9MCIsImgiOiIvc3RvcnkucGhwP3N0b3J5X2ZiaWQ9MTA3ODA4MTE0NTcwMDc0NyZpZD0xMDAwMDQ5NjYxNDQzOTQmZnM9MSZmb2N1c19jb21wb3Nlcj0wIiwicyI6Im0ifQ%3D%3D; act=1544371921469%2F52; presence=EDvF3EtimeF1544371984EuserFA21B04966144394A2EstateFDsb2F1544371539998EatF1544371587800Et3F_5bDiFA2user_3a1B03899463346A2EoF30EfF32CAcDiFA2user_3a1B12583503752A2ErF1EoF31EfF34C_5dElm3FA2user_3a1B12583503752A2Eutc3F1544371921364G544371984677CEchFDp_5f1B04966144394F75CC'
    var appstate = require('./appstate.json');
    // customize cookie
    // console.log(config.firstName + ' ' + config.lastName);
    Array.prototype.rand = function () {
        return this[Math.floor(Math.random() * this.length)];
    }
    const actor_id = "100004966144394"
    let reaction_types = ["😆", "😠", "😢", "😮", "😍", "👍", "👎"]
    // const message_id = "mid.$cAAAAB-rQhfZtvfeQClnjLJFrGefK"
    const reaction_type = reaction_types.rand()
    let variables = JSON.stringify({
        "data": {
            client_mutation_id: "2",
            actor_id,
            action: "ADD_REACTION", //REMOVE_REACTION
            message_id,
            reaction: reaction_type
        }
    })
    // variables = encodeURI(variables)
    // res.send(variables); 
    const form_params = {
        doc_id: 1491398900900362,
        variables: variables,
        dpr: 2
    }
    let result = querystring.stringify(form_params)
    const uri = "https://www.facebook.com/webgraphql/mutation/?" + result
    let form = {
        fb_dtsg
    }
    const formData = querystring.stringify(form);

    var contentLength = formData.length;
    const headers = {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    }
    request({
        headers,
        uri,
        body: formData,
        method: 'POST'
    }, function (error, response, body) {
        if (error) {
            cb(error)
        } else {
            console.log('Đã reaction tự động thành công toi ' + message_id)
            cb(null, response)
        }
    })

}


function xuLyPhone(str) {
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