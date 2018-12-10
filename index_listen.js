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
app.get('/cookie', function (req, res) {
    var appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8')).map((e, i) => { return { ...e, index: i } })
    // c_user=100004966144394;xs=31:6buTziuxWwYKEw:2:1544417391:13185:6238;fr=14E6RCpLCQU6T4TIi.AWXBEfUzW-8EqlCoedKRdF6iuF0.BcDfBv..AAA.0.0.BcDfBv.AWWzBUwr;datr=b_ANXLVAKFzKiP6DXzt6X33P
    var cookie = `sb=${appState[1].value}; datr=${appState[2].value}; dpr=2; locale=vi_VN; c_user=${appState[3].value}; xs=${appState[4].value}; pl=n; spin=${appState[6].value}; fr=${appState[0].value}; m_pixel_ratio=2; wd=1440x714;act=1544371921469%2F52; presence=${appState[7].value}`
    res.send(cookie)
})
// update dtsg when 12 hour
app.get('/dtsg', function (req, res) {
    // const token = "EAACW5Fg5N2IBAFHL4Rel4ArbYAIvtm3qOpE0T6DCD51A82DOjYYubn2RxyQg7JF1rTZBtZCt9FlIyZBJQ9xCOZAyf8XKG9DxKCEmPw8XW5cS2QB6FyHmcGJXYbRfBtuvM3iOu9Hw5PfRo7V2cblEsPmT09TVeNWE24ZB3BXHnidskkggZChIFG"
    // request("https://graph.facebook.com/me/posts?fields=id&limit=999&access_token=" + token, function (loi, kq, kq_body) {
    //     //nếu có lỗi
    //     if (loi)
    //         throw loi;
    //     const { data } = JSON.parse(kq_body)
    //     res.send(data)
    // })
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
function bot(cb) {

}
function comment(data, cb) {
    // const fb_dtsg = 'AQH5taqddzup:AQFomZUKR2J6'
    var fb_dtsg = JSON.parse(fs.readFileSync('./app.json', 'utf8'))[1].value;

    // const cookie = 'sb=HMUIXMfa_8ZFjvlBFU7-QXTD; datr=HMUIXEK2Igz2skWvyxztq_wA; dpr=2; locale=vi_VN; c_user=100004966144394; xs=21%3Ad0ccOZ2RAl4vpg%3A2%3A1544078621%3A13185%3A6238; pl=n; spin=r.4605837_b.trunk_t.1544078622_s.1_v.2_; fr=146EMYzezVNdImrBS.AWUTWBjoe3ougwqoAXqeX-gB12o.BcCMUc.SV.AAA.0.0.BcCMUd.AWV4YcXv; m_pixel_ratio=2; wd=1440x714;act=1544371921469%2F52; presence=EDvF3EtimeF1544078628EuserFA21B04966144394A2EstateFDutF0Et2F_5b_5dElm2FnullEuct2F1544078628040EtrFnullEtwF1334402740EatF1544078628040CEchFDp_5f1B04966144394F0CC'
    var appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8')).map((e, i) => { return { ...e, index: i } })
    var cookie = `sb=${appState[1].value}; datr=${appState[2].value}; dpr=2; locale=vi_VN; c_user=${appState[3].value}; xs=${appState[4].value}; pl=n; spin=${appState[6].value}; fr=${appState[0].value}; m_pixel_ratio=2; wd=1440x714;act=1544371921469%2F52; presence=${appState[7].value}`
    var url = `https://m.facebook.com/a/comment.php?`
    let { parent_comment_id, parent_redirect_comment_token, bot_id, ft_ent_identifier } = data
    // notifications_seen
    var access_token = "EAACW5Fg5N2IBALlO56LDR2jAUjZBNRLsbZCFQl6nBooobnCS7e4zlKeE2ZCqSTZCxjUV4WX0e3KpcQPWtVwInxlNYMm3dqGd97APZA1wue94HvkgH9ZAM6I5TZA34S3eST8S9ZC7No6HLKz1kEfSOFMCMve9ppelZApSgUL9hcnimEZAZBYC14ihFAg"
    // var bot_url = `https://graph.facebook.com/${parent_redirect_comment_token}?access_token=${access_token}`
    // botkey
    // get comment content

    request(`https://graph.facebook.com/${bot_id}?access_token=${access_token}`,
        function (error, response, body) {
            const message = JSON.parse(body).message
            console.log(botkey + encodeURI(message))
            console.log(body)
            // #enc comment content
            request(botkey +
                encodeURI(message),
                function (error, response, body) {
                    if (error) return;
                    if (body.indexOf("502 Bad Gateway") > 0 || body.indexOf("509") > 0 || body.indexOf('401') > 0) {
                        return;
                    }
                    text = JSON.parse(body);
                    console.log(text)
                    if (text.status == "200" || text.result === 100) {
                        SimsimiAnswered = text.response;
                        SimsimiAnswered = text.response;
                        console.log("Answered:" + SimsimiAnswered);
                        // comment
                        Array.prototype.rand = function () {
                            return this[Math.floor(Math.random() * this.length)];
                        }
                        let comment_text = text.response
                        let form = {
                            comment_text,
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
                        const form_params = {
                            parent_comment_id,
                            parent_redirect_comment_token,
                            fs: 0,
                            comment_logging: "",
                            inline_reply: 1,
                            // reply_fbid: 1078393502336178,
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
                                console.log('thanh cong')
                                cb(null, body)
                            }
                        })
                        // #comment
                    }
                });
            // #botkey
        }
    )


}
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
app.get('/comment', function (req, res) {
    comment({
        ft_ent_identifier: '1078375745671287',
        parent_comment_id: '1078499128992282',
        parent_redirect_comment_token: '1078375745671287_1078375745671287',
        reaction_comment_id: '1078499128992282'
    }, (loi, kq) => {
        res.send(kq)
        return;
    })
    reaction({}, (loi, kq) => {
        res.send(kq)
        return;
    })
})

login(
    // {
    //     email: "MAIL",
    //     password: "PWD"
    // },
    { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) },
    function callback(err, api) {
        if (err) return console.error(err);
        // console.log(api.getAppState())
        // fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
        api.listen(function callback(err, message) {
            console.log('hahahaa da nhan dc thong bao xu ly o day nhe')
            console.log(message);
            // notifications_sync
            if (message.type && message.type === "m_notification") {
                console.log(message)
                const { data } = message
                const { content_id, href, type } = data
                if (type === "feed_comment") {
                    // var fbid = url.match(/fbid=([0-9]+)&/)[1]
                    // var type = url.match(/type=([0-9]+)&/)[1]

                    // var reply_comment_id = url.match(/reply_comment_id=([0-9]+)&/)[1]
                    // var notif_id = url.match(/notif_id=([0-9]+)/)[1]
                    // var notif_t = url.match(/notif_t=([a-z]+)&/)
                    // chua tra loi nick khac
                    let parent_comment_id = href.match(/reply_comment_id=([0-9]+)&/) ? href.match(/reply_comment_id=([0-9]+)&/)[1] : null
                    let comment_id = href.match(/comment_id=([0-9]+)&/) ? href.match(/comment_id=([0-9]+)&/)[1] : null
                    let ft_ent_identifier = href.match(/posts\/([0-9]+)?/) ? href.match(/posts\/([0-9]+)?/)[1] : null
                    let story_fbid = "" //th tag theo name 
                    // href.match(/story_fbid==([0-9]+)&/) ? href.match(/comment_id=([0-9]+)&/)[1] : null
                    // let obj = {
                    //     ft_ent_identifier: ft_ent_identifier + "",
                    //     parent_comment_id: parent_comment_id ? content_id : comment_id,
                    //     parent_redirect_comment_token: ft_ent_identifier + "_" + content_id,
                    //     reaction_comment_id: parent_comment_id ? content_id : comment_id
                    // }
                    // type: 'feed_comment',
                    // if (data.type = "comment_mention") {
                    //     // chua xu ly tra loi coment boi nguoi dung
                    //     console.log('dadasdsas')
                    // } else {
                    var bot_id = parent_comment_id || comment_id
                    let obj = {
                        ft_ent_identifier: ft_ent_identifier || story_fbid,
                        parent_comment_id: comment_id,
                        parent_redirect_comment_token: (ft_ent_identifier || story_fbid) + "_" + content_id,
                        reaction_comment_id: parent_comment_id ? parent_comment_id : comment_id,
                        bot_id: ft_ent_identifier + "_" + bot_id,
                    }
                    console.log('result')
                    // console.log(parent_comment_id)
                    // console.log(comment_id)
                    // console.log(content_id)
                    console.log(obj)
                    comment(obj, (loi, kq) => {
                        console.log(kq)
                        console.log('da tra loi binh luan ' + obj.parent_redirect_comment_token)
                    })
                    reaction(obj, (loi, kq) => {
                        console.log('da like binh luan ' + obj.parent_redirect_comment_token)
                    })
                }

            }
            // data.comment_id = parent_comment_id ? content_id : comment_id

            // }
        })
    });
