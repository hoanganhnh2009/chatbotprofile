#!/usr/bin/env node
// var args = process.argv.slice(2)

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var querystring = require('querystring');


app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello , I am a chat bot tdz')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    console.log('web hook get')
    if (req.query['hub.verify_token'] === 'Aha_Moment_Labs') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})


// Spin up the server
app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})
// API get old member
app.get('/member', function (req, res) {
    const result = listMember((error, response) => {
        if (error) {
            res.send(error)
        } else {
            res.send(response)
        }
    })
})

app.get('/getcookie', function (req, res) {
    const access_token = "EAACW5Fg5N2IBAHa7NCpLJ54yAqDYdBrcIPyerJ1S9EDwZBUrKUH6RvFBoUPXEu3RCpV7ZB1rN0p72A7lBQdBCitbItV8cNgxzrTYpxVItKjOTzuhg7vA5TcWU3YDfZAOnomcZBuDN5tZBih84I1Ec0Q5ZB2Dc5rtSidZB9FFmZBUOEpyjo2hTUUC"
    // $html = json_decode(file_get_contents("https://api.facebook.com/method/auth.getSessionforApp?access_token=$token&format=json&new_app_id=6628568379&generate_session_cookies=1"), true);

    // $cookie = $html['session_cookies'][0]['name']."=".$html['session_cookies'][0]['value'].";".$html['session_cookies'][1]['name']."=".$html['session_cookies'][1]['value'].";".$html['session_cookies'][2]['name']."=".$html['session_cookies'][2]['value'].";".$html['session_cookies'][3]['name']."=".$html['session_cookies'][3]['value'];
    // return $cookie;
    const url = `https://api.facebook.com/method/auth.getSessionforApp?access_token=${access_token}&format=json&new_app_id=6628568379&generate_session_cookies=1`
    request({
        uri: url,
        method: 'GET'
    }, function (error, response, body) {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            console.log(body)
            const { session_cookies } = JSON.parse(body)
            var cookie = `${session_cookies[0].name}=${session_cookies[0].value};${session_cookies[1].name}=${session_cookies[1].value};${session_cookies[2].name}=${session_cookies[2].value};${session_cookies[3].name}=${session_cookies[3].value}`
            // start
            //         $html =  curl_post('https://m.facebook.com', 'GET' , "" , $cookie);
            // $re = "/<input type=\"hidden\" name=\"fb_dtsg\" value=\"(.*?)\" autocomplete=\"off\" \\/>/"; 
            // preg_match($re, $html, $dtsg);
            // $dtsg = $dtsg[1];
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
                    // const { body } = response2
                    // const result = response2.body.match(re)
                    let result = body2.match(/<input type=\"hidden\" name=\"fb_dtsg\" value=\"(.*?)\" autocomplete=\"off\" \/>/);
                    const dtsg = result[1]
                    // da co dtsg :D
                    console.log(result)
                    res.send(dtsg)
                }
            })
            // end
        }
    })
})

app.get('/getid', function (req, res) {
    gettids((error, response) => {
        re = "/tids=(.*?)\&/"
        // const { body } = response2
        const result = response.match(/tids=(.*?)\&/)
        // let result = response.match(/<input type=\"hidden\" name=\"fb_dtsg\" value=\"(.*?)\" autocomplete=\"off\" \/>/);
        var tid = result[1]
        tid = encodeURIComponent(tid) //encode mã tids lại
        // [
        //     "tids=cid.c.100004966144394&",
        //     "cid.c.100004966144394"
        //     ]
        res.send(tid)
    })
})

function gettids(cb) {
    const cookie = "c_user=100004966144394;xs=8:wGw-p0PHImL_6Q:2:1544189880:13185:6238;fr=1ymikwd9HLJWv56r3.AWUijN_EvfDdsHfEDoW41c6Ze5I.BcCne4..AAA.0.0.BcCne4.AWVKSaRk;datr=uHcKXJgJOKYt-cd4fhxH5TXo"
    const headers = {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        cookie,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    }
    const idNguoiNhan = "100004966144394"
    request({
        headers: headers,
        uri: 'https://m.facebook.com/messages/read/?fbid=' + idNguoiNhan + '&_rdr',
        method: 'GET'
    }, function (error, response, body) {
        if (error) {
            console.log(error)
            cb(error)
        } else {
            cb(null, body)
        }
    })

}
app.get('/sendmessage', function (req, res) {
    sendMessage((error, response) => {
        // $re = preg_match("/send_success/", $html, $rep); //bắt kết quả trả về
        // const kq = response.match(/send_success/)
        res.send(response)
    })

})

app.get('/reaction/:id', function (req, res) {
    const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; dpr=2; m_pixel_ratio=2; x-referer=eyJyIjoiL3Bob3RvLnBocD9mYmlkPTYxOTA2OTc3MTg1NTgwMSZpZD0xMDAwMTI1ODM1MDM3NTImc2V0PWEuNDc5OTU5MjI5MTAwMTkwIiwiaCI6Ii9waG90by5waHA%2FZmJpZD02MTkwNjk3NzE4NTU4MDEmaWQ9MTAwMDEyNTgzNTAzNzUyJnNldD1hLjQ3OTk1OTIyOTEwMDE5MCIsInMiOiJtIn0%3D; ; wd=1440x714; c_user=100004966144394; xs=35%3AM6YqxkYhnQ2Hng%3A2%3A1544241245%3A13185%3A6238; fr=0EcLrb28aceQK3p2i.AWXVGbZF8UEXza8rAGvu92_4hWo.Bbjlby.cU.FwJ.0.0.BcC0Bd.AWUX3crP; pl=n; spin=r.4615159_b.trunk_t.1544241246_s.1_v.2_; presence=EDvF3EtimeF1544241439EuserFA21B04966144394A2EstateFDutF1544241439171CEchFDp_5f1B04966144394F17CC'
    // preg_match("/c_user=([0-9]+);/", $cookie, $idNguoiGui);
    const idNguoiGui = cookie.match(/c_user=([0-9]+);/)
    // cb(null,result)
    var post_id = req.params.id || 619069771855801
    const form_params = {
        ft_ent_identifier: post_id,
        story_render_location: 'feed_mobile',
        // feedback_source: 0,
        // is_sponsored: 0,
        // ext: 1544495674,
        // hash: 'AeRpwcaelNDFU08c',
        // refid: 13,
        // __tn__: ">",
        // av: 100004966144394,
        // client_id: "1544237439449: 221795567",
        // session_id: "67421b5b"
    }
    let result = querystring.stringify(form_params)
    const uri = "https://m.facebook.com/ufi/reaction/?" + result
    let reaction_type = {
        like: 1,
        love: 2,
        wow: 3,
        haha: 4,
        // sad: 5,
        // angry: 6

    }

    let reaction_type_array = [1, 2, 3, 4]
    let form = {
        reaction_type: reaction_type.haha,
        // ft_ent_identifier: post_id,
        fb_dtsg: "AQEcreWHBEQQ:AQGYrfVBuq3p", //existed
        // __ajax__: "AYltgvrDlCYYcDspZHWRc4-TeQJiew8gB-Cgb5MY3wF2buHLm_zCPhPMrWgbE4NRqN01yQQE2nbYV15_I6Bk4qqR-7uvz3Z8ENAlbeqDcvut7A",
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
            res.send(error)
        } else {
            // console.log(body)
            console.log('Đã reaction tự động thành công')
            res.send(response)
        }
    })
})

app.get('/dangbai', function (req, res) {
    const pageID = 663791940495605
    const fb_dtsg = 'AQFk5RY5r2iV:AQFhOIStf0DB'
    // const cookie = 'c_user=100004966144394;xs=24:Vm3bCxfLwoByhA:2:1544196438:13185:6238;fr=1dsFkMY3FtjQ5RGEB.AWWYGRP4bWCFWQiXlBfzF_mz3WY.BcCpFW..AAA.0.0.BcCpFW.AWWgz8Vx;datr=VpEKXHSLgKeMZ2RgFnlO0vCz'
    const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; dpr=2; c_user=100004966144394; xs=44%3AZFrVFjHrU9OLMQ%3A2%3A1544196009%3A13185%3A6238; pl=n; spin=r.4612198_b.trunk_t.1544196010_s.1_v.2_; m_pixel_ratio=2; wd=1356x714; fr=0EcLrb28aceQK3p2i.AWU-ZErQGOd-RoFO-77gq3h7lyA.Bbjlby.cU.FwJ.0.0.BcCxnD.AWVc3MXv; x-referer=eyJyIjoiL2hvbWUucGhwP3NvZnQ9Y29tcG9zZXIiLCJoIjoiL2hvbWUucGhwP3NvZnQ9Y29tcG9zZXIiLCJzIjoibSJ9'
    let date = new Date()
    // preg_match("/c_user=([0-9]+);/", $cookie, $idNguoiGui);
    const idNguoiGui = cookie.match(/c_user=([0-9]+);/)
    // cb(null,result)



    const uri = "https://m.facebook.com/a/home.php"
    let form = {
        privacyx: 300645083384735, // <input type="hidden" name="privacyx" value="300645083384735">
        // rating: 0,
        status: 'Anh Bách đẹp trai quá cơ . (Xin lỗi em chỉ là con bot 9)',
        target: 100002826397215, // 100002826397215
        fb_dtsg: 'AQGlfvl7CP1x:AQH0wZkAMjME',
        __ajax__: 'AYltgvrDlCYYcDspZHWRc4-TeQJiew8gB-Cgb5MY3wF2buHLm_zCPhPMrWgbE4NRqN01yQQE2nbYV15_I6Bk4qqR-7uvz3Z8ENAlbeqDcvut7A', //encrypted:" "
    }
    // content-type: application/x-javascript; charset=utf-8
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
            res.send(error)
        } else {
            // console.log(body)
            console.log('Đã đăng bài tự động')
            res.send(response)
        }
    })
    // res.send('daddads')
})

function sendMessage(cb) {
    const pageID = 663791940495605
    const fb_dtsg = 'AQFk5RY5r2iV:AQFhOIStf0DB'
    const cookie = 'c_user=100004966144394;xs=24:Vm3bCxfLwoByhA:2:1544196438:13185:6238;fr=1dsFkMY3FtjQ5RGEB.AWWYGRP4bWCFWQiXlBfzF_mz3WY.BcCpFW..AAA.0.0.BcCpFW.AWWgz8Vx;datr=VpEKXHSLgKeMZ2RgFnlO0vCz'
    var url = `https://m.facebook.com/messages/send/?icm=1&pageID=${pageID}`
    let date = new Date()
    // preg_match("/c_user=([0-9]+);/", $cookie, $idNguoiGui);
    const idNguoiGui = cookie.match(/c_user=([0-9]+);/)
    // cb(null,result)
    let form = {
        fb_dtsg,
        "body": "Người đừng lặng im đế thế vì lặng im sẽ giết chết con tim. Xin lỗi em chỉ là con bot",
        "Send": "Gá»­i",
        "ids[0]": 100009934114000,
        "photo": "",
        "waterfall_source": "message"
    }
    const formData = querystring.stringify(form);

    const headers = {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    }
    var contentLength = formData.length;
    request({
        headers: headers,
        uri: 'https://m.facebook.com/messages/send/?icm=1&refid=12',
        body: formData,
        method: 'POST'
    }, function (error, response, body) {
        if (error) {
            console.log(error)
        } else {
            // console.log(body)
            console.log('Đã gửi tin nhắn đến bé vân đó: Hihi')
            cb(null, body)
        }
    })
    //Gửi tin nhắn từ fanpage
    // $html = curl_post('https://m.facebook.com/messages/send/?icm=1&refid=12', 'POST', http_build_query($data), $cookie);
    // $re = preg_match("/send_success/", $html, $rep); //bắt kết quả trả về


    // let sender_id = 100004966144394
    // let form = {
    //     body: 'Hello world ',
    //     fb_dtsg,
    //     wwwupp: 'C3',
    //     waterfall_source: 'message',
    //     tids: `cid.c.${sender_id}:${pageID}`,
    // }
    // const obj = {}
    // const key = "ids[" + sender_id + "]"
    // obj[key] = sender_id;
    // form = Object.assign({}, form, obj)
    // const formData = querystring.stringify(form);

    // const headers = {
    //     'Content-Length': contentLength,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     cookie,
    //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    // }
    // var contentLength = formData.length;
    // console.log(form)

    // request({
    //     headers: headers,
    //     uri: url,
    //     body: formData,
    //     method: 'POST'
    // }, function (error, response, body) {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log(body)
    //         console.log('Đã gửi tin nhắn đến :' + sender_id)
    //         cb(null,body)
    //     }
    // })
}

function listMember(callback) {
    const fb_dtsg = 'AQEUaZfKJAf2:AQFqBM7orm-c'
    // const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; dpr=2; c_user=100004966144394; xs=14%3Ai69NqV9VTTNE6w%3A2%3A1544089447%3A13185%3A6238; pl=n; spin=r.4612116_b.trunk_t.1544185725_s.1_v.2_; fr=0EcLrb28aceQK3p2i.AWXah6SjFvX6Xinc8qZJW8jkuEU.Bbjlby.cU.FwJ.0.0.BcCmeF.AWXjuT73; act=1544188697055%2F50; wd=1356x160; presence=EDvF3EtimeF1544189019EuserFA21B04966144394A2EstateFDsb2F1544188693320EatF1544188998032Et3F_5bDiFA2user_3a1B06424805549A2ErF1EoF8EfF9C_5dEutc3F1544188697083G544189019414CEchFDp_5f1B04966144394F248CC'
    const cookie = 'c_user=100004966144394;xs=20:jj30WqBKIJk9hg:2:1544189877:13185:6238;fr=15JTikPaCLTUSeSbC.AWW-9FIZMUNufWD_QW9sSTZ0OMw.BcCne1..AAA.0.0.BcCne1.AWUYImKH;datr=tXcKXP1i2gg99eQXYg8mc7Bl'
    const max_number_conversation = 1000
    // const timestame_start_request = 1543997687000
    let date = new Date()
    const timestame_start_request = date.getTime() * 1000
    // callback(null,timestame_start_request.toString())


    const query_params = {
        limit: 1000,
        before: '1544013992000',
        tags: ["INBOX"],
        isWorkUser: 'false',
        includeDeliveryReceipts: 'true',
        includeSeqID: 'false',
    }
    const o0 = {
        doc_id: '1730342080428132',//?
        query_params
    }
    const query = {
        o0: o0,
    }
    // 663791940495605 shopmemua
    // 569731350067780 abitgroup
    const idpage = 663791940495605
    const string_query = encodeURI(JSON.stringify(query))
    const url = 'https://www.facebook.com/api/graphqlbatch/?dpr=1'
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded, application/x-www-form-urlencoded',
        'cookie': cookie,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    }

    request.post({
        headers: headers,
        url: url,
        'body': 'batch_name=MessengerGraphQLThreadlistFetcher&__user=100008120435587&__a=1&__dyn=7AzHFx6ByKEjgDxiWJGi9FxqewRyaGeyeGyQjFG5VEy5Eqzob4q5-8QubGqK5-EqyEgCCG22cyaG4UJu9x22mi4Fp8CUuF3EeUFxi4EPz8S6UhyFe4fgix25-ufAzazpElwj8gyoC8yFUSi4o4O5EC6ui9CKl0WG5EvxibwzG6oth4dwXxyq6UpCx6WBBx6695UGEZoyqcEx68zXUSqckx8du9K6UCcBAGqdwRwGUOum4Wx23S5EKicx28Bz98OvwyQ4pEGQ4VK2eh3UNqyprx6ufxbCwOzUO48bGDz8a8lyWy8yVqJ6Ki8x6cyU998GqbK391ebhpHxy8xSHxqu8Cy8-pwzgK&__req=1mr&__be=1&__pc=PHASED%3ADEFAULT&__rev=4487303&fb_dtsg=' + fb_dtsg + '&jazoest=265817211568527810072898850586581697410995996580728755&__spin_r=4487303&__spin_b=trunk&__spin_t=1541052791&av=' + idpage + '&queries=' + string_query,
    }, function (error, response, body) {
        if (error) {
            // console.log(error);
            callback(error)
        } else {
            let pos = body.indexOf("successful_results");
            const str = body.substring(0, pos - 7)
            var graphData = JSON.parse(str)
            let data = graphData.o0.data.viewer.message_threads.nodes
            console.log(data)
            var result = data.map((e, i) => {
                const { gender, name, is_message_blocked_by_viewer } = e.all_participants.edges[0].node.messaging_actor
                let { thread_type } = e
                return {
                    user_id: e.thread_key.other_user_id,
                    thread_type,
                    is_viewer_subscribed: e.is_viewer_subscribed,
                    last_message_timestamp: e.last_message.nodes[0].timestamp_precise,
                    name_user: name,
                    gender_user: gender,
                    username_user: is_message_blocked_by_viewer,
                    is_message_blocked_by_viewer_user: is_message_blocked_by_viewer ? 1 : 0,
                    is_remarketing_default: 0,
                    // info_conversation_inbox: JSON.stringify(e)
                }
            })
            // return result
            callback(null, result)
        }
    });
}

app.get('/send_message_test', function (req, res) {
    const pageID = 663791940495605
    const fb_dtsg = 'AQFbDKGdSY5U:AQFyp9U8Pvi_'
    const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; locale=vi_VN; dpr=2; c_user=100004966144394; xs=47%3AOpjoxt_-XTCc5Q%3A2%3A1543976471%3A13185%3A6238; pl=n; spin=r.4597993_b.trunk_t.1543976472_s.1_v.2_; fr=0EcLrb28aceQK3p2i.AWXRFoW-tiB7dGVu0fBI3lEcYbc.Bbjlby.cU.FwH.0.0.BcBzYb.AWWqY8-n; act=1543976533742%2F10; presence=EDvF3EtimeF1543976539EuserFA21B04966144394A2EstateFDutF1543976539147CEchFDp_5f1B04966144394F31CC; wd=1440x285'
    var url = `https://m.facebook.com/messages/send/?icm=1&pageID=${pageID}`
    let date = new Date()
    // let sender_id = '100004966144394'
    Array.prototype.rand = function () {
        return this[Math.floor(Math.random() * this.length)];
    }
    var messages = [
        'Chào bạn',
        'Hello world',
        'Chúng tôi có thể giúp gì cho bạn',
        'Chúng tôi đang có CTKM nè',
        'Hihi',
        'Hello girl',
        'Remarketing inbox nhe'
    ]
    listMember((error, response) => {
        if (error) {
            res.send(error)
        }
        else {
            var i = 0
            var sendMessageHelper = function (response) {
                i++
                // START
                let sender_id = response[i].user_id
                let form = {
                    body: messages.rand(),
                    fb_dtsg: 'AQFbDKGdSY5U:AQFyp9U8Pvi_',
                    wwwupp: 'C3',
                    waterfall_source: 'message',
                    // action_time: 1543976602,
                    tids: `cid.c.${sender_id}:${pageID}`,
                    //user id !== sender id 
                }
                const obj = {}
                const key = "ids[" + sender_id + "]"
                obj[key] = sender_id;
                form = Object.assign({}, form, obj)
                const formData = querystring.stringify(form);
                // console.log('Đã gửi thành công tin nhắn tới ' + sender_id + 'position ' + i)
                const headers = {
                    'Content-Length': contentLength,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    cookie,
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
                }
                var contentLength = formData.length;
                console.log(form)
                request({
                    headers: headers,
                    uri: url,
                    body: formData,
                    method: 'POST'
                }, function (error, response, body) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(body)
                        console.log('Đã gửi tin nhắn đến :' + sender_id)
                    }
                })
                // END
                if (i >= response.length - 1) {
                    res.send('Đã gửi tin nhắn remarketing thành công')
                    return;
                }
                setTimeout(() => {
                    sendMessageHelper(response)
                }, 60 * 1000)

            }
            sendMessageHelper(response)
        }
    })

})


app.get('/changeThreadEmoji', function (req, res) {
    const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; dpr=2; m_pixel_ratio=2; ; c_user=100004966144394; xs=35%3AM6YqxkYhnQ2Hng%3A2%3A1544241245%3A13185%3A6238; pl=n; spin=r.4615159_b.trunk_t.1544241246_s.1_v.2_; x-referer=eyJyIjoiL21lc3NhZ2VzL3RocmVhZC8xMDAwMDI4MjYzOTcyMTUvIiwiaCI6Ii9tZXNzYWdlcy90aHJlYWQvMTAwMDAyODI2Mzk3MjE1LyIsInMiOiJtIn0%3D; fr=0EcLrb28aceQK3p2i.AWWKMcxUodIxbxItroD-XQEAdZlUkhieJLoh4gjQyarAzRBA.Bbjlby.cU.FwJ.0.0.BcC1yE.AWXEBfdE; act=1544249258182%2F6; wd=1440x398; presence=EDvF3EtimeF1544249740EuserFA21B04966144394A2EstateFDatF1544249673852Et3F_5bDiFA2thread_3a2026379260761810A2ErF1EoF1EfF2C_5dElm3FnullEutc3F1544249729245G544249740600CEchFDp_5f1B04966144394F8CC'
    // let reaction_type = {
    //     like: "👍",
    //     dislike: "👎",
    //     love: "😍",
    //     wow: "😮",
    //     haha: "😆",
    //     // sad: "😢",
    //     angry: "😠"
    // }
    Array.prototype.rand = function () {
        return this[Math.floor(Math.random() * this.length)];
    }
    const actor_id = "100004966144394"
    let reaction_types = ["😆", "😠", "😢", "😮", "😍", "👍", "👎"]
    const message_id = "mid.$cAAAAB-rQhfZtvfeQClnjLJFrGefK"
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
        __user: 100004966144394,
        __a: 1,
        __dyn: '7AgNeSUOByKEjgDBzHGyaiFGomUOqfoOmHGiWF3ozGFt9LFGA4XG6poqzob4q6oF4GbGqKi5azppEHoOqqGxSaUyGxeipi28gyElWAAzppenKtqx2AcUK4F98iGvxifGcoHAKibUSbBZ4hfDVfh4cx25-uiajzaUKqt2K8hqwVBx2XBy8Gumui4oJe9yF8mDm495UO4KK4bh4u4pFEiGfVbiKaCUOvDQ58SHu4olDh4dz8oDK9y98GqfwAhFEGWBGHDAmi4p5UBbu8uF4qmoWS8DpiU8l4xabK8AAyXzAbykbBHGry-9wgUgUkLzXnQiHjJAgS9AylldoKEKicQ8AhVoOjyF-i6_iyp9EBd4pULy4bzp49BVp5G9hbByVUVeeVEG4FWVV49yQGGnyUhACWG5aXggKiieCBh5BGVbLGQqV4u4oObz9qzF8BfgKUKu7AcArAFfVbKWxqiUWGGWyEyu8Cy49ACppHzWgK5FEOiEFxh94Kq',
        __req: '2l',
        __be: 1,
        __pc: 'PHASED:ufi_home_page_pkg',
        __rev: 4615159,
        fb_dtsg: 'AQEULyNrFRhE:AQEtmzyVWnnJ',
        jazoest: 22222,
        __spin_r: 4615159,
        __spin_b: 'trunk',
        __spin_t: 1544241246,
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
            res.send(error)
        } else {
            // console.log(body)
            console.log('Đã reaction tự động thành công')
            res.send(response)
        }
    })
    // res.send('changeThreadEmoji')
})
app.get('/send_reaction', function (req, res) {
    Array.prototype.rand = function () {
        return this[Math.floor(Math.random() * this.length)];
    }
    listPost((error, response) => {
        // console.log(response)
        const { data } = JSON.parse(response)
        var i = 0;
        // var times = [5, 15, 30, 45, 60]
        // setInterval(() => {
        //     var id = data[i].id.split('_')[1]
        //     // console.log(id)
        //     // console.log(i)
        //     action(id)
        //     i++
        //     if (i >= 23) {
        //         res.send('Da reaction tat ca')
        //     }
        // }, 15 * 1000)
        Array.prototype.rand = function () {
            return this[Math.floor(Math.random() * this.length)];
        }
        let times = [10, 20, 30, 40, 60, 75, 90]
        time = 10
        var timeFunc = () => {
            setTimeout(() => {
                var id = data[i].id.split('_')[1]
                time = times.rand()
                console.log((new Date).getSeconds())
                action(id)
                i++;
                console.log('Da react thanh cong bai viet' + data[i].id)
                if (i >= data.length - 1) {
                    res.send('da cam xuc tat ca thanh cong')
                    return
                }
                timeFunc(data[i].id)
            }, time * 1000)
        }
        timeFunc()

    })
})
function action(id, cb) {
    const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; dpr=2; m_pixel_ratio=2; x-referer=eyJyIjoiL3Bob3RvLnBocD9mYmlkPTYxOTA2OTc3MTg1NTgwMSZpZD0xMDAwMTI1ODM1MDM3NTImc2V0PWEuNDc5OTU5MjI5MTAwMTkwIiwiaCI6Ii9waG90by5waHA%2FZmJpZD02MTkwNjk3NzE4NTU4MDEmaWQ9MTAwMDEyNTgzNTAzNzUyJnNldD1hLjQ3OTk1OTIyOTEwMDE5MCIsInMiOiJtIn0%3D; ; wd=1440x714; c_user=100004966144394; xs=35%3AM6YqxkYhnQ2Hng%3A2%3A1544241245%3A13185%3A6238; fr=0EcLrb28aceQK3p2i.AWXVGbZF8UEXza8rAGvu92_4hWo.Bbjlby.cU.FwJ.0.0.BcC0Bd.AWUX3crP; pl=n; spin=r.4615159_b.trunk_t.1544241246_s.1_v.2_; presence=EDvF3EtimeF1544241439EuserFA21B04966144394A2EstateFDutF1544241439171CEchFDp_5f1B04966144394F17CC'
    const idNguoiGui = cookie.match(/c_user=([0-9]+);/)
    var post_id = id || 619305528498892
    const form_params = {
        ft_ent_identifier: post_id,
        story_render_location: 'feed_mobile'
    }
    let result = querystring.stringify(form_params)
    const uri = "https://m.facebook.com/ufi/reaction/?" + result
    Array.prototype.rand = function () {
        return this[Math.floor(Math.random() * this.length)];
    }
    let reaction_type = {
        like: 1,
        love: 2,
        wow: 3,
        haha: 4
    };

    var reaction_type_array = [1, 2, 3, 4]

    let form = {
        reaction_type: reaction_type_array.rand(),
        fb_dtsg: "AQEcreWHBEQQ:AQGYrfVBuq3p",
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
        } else {
            console.log('Đã reaction tự động thành công' + post_id)
        }
    })
}
function listPost(cb) {
    var postID = "100000351874221"
    var token = "EAAAAAYsX7TsBAGLICSFbXcV8uofNLF7froglZCaPZCKyJpeOh6YGXxjDQCn6bFfdpom4ylPLO63JbTw0UylhZA3b9hfa4opmGBK7UI6uEDHunSFx5aMS7aEXxtz9F6t9NQvYwuX0SyfMIF9cZCXJks9RZAOndDCKfF5395vGb3AZDZD"
    var url = 'https://graph.facebook.com/' + postID + '/posts?fields=id&limit=50&access_token=' + token
    const headers = {
        // 'Content-Length': contentLength,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    }
    request({
        headers: headers,
        uri: url,
        // body: formData,
        method: 'GET'
    }, function (error, response, body) {
        if (error) {
            cb(error)
        } else {
            cb(null, body)
        }
    })
}

let i = 0

function SendMessageHelper(response) {
    const pageID = 663791940495605
    let FBLoaded = true
    if (FBLoaded) {
        var messages = [
            'Chào bạn',
            'Hello world',
            'Chúng tôi có thể giúp gì cho bạn',
            'Chúng tôi đang có CTKM nè',
            'Hihi',
            'Hello girl',
            'Remarketing inbox nhe'
        ]

        console.log('i =' + i)
        // console.log(response[0])
        let sender_id = response[i].user_id
        let form = {
            body: messages.rand(),
            fb_dtsg: 'AQFbDKGdSY5U:AQFyp9U8Pvi_',
            wwwupp: 'C3', //can delete
            waterfall_source: 'message', //can delete
            // action_time: 1543976602,
            // 'ids[100004966144394]': sender_id,
            tids: `cid.c.${sender_id}:${pageID}`,
            //user id !== sender id can delete
        }
        console.log('Đã gửi thành công tin nhắn tới ' + sender_id + 'position ' + i)
        const obj = {}
        const key = "ids[" + sender_id + "]"
        obj[key] = sender_id;
        form = Object.assign({}, form, obj)

        const formData = querystring.stringify(form);
        const headers = {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded',
            cookie,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        }
        var contentLength = formData.length;
        request({
            headers: headers,
            uri: url,
            body: formData,
            method: 'POST'
        }, function (error, response, body) {
            if (error) {
                console.log(error)
                cb(error)
            } else {
                console.log('Đã gửi tin nhắn đến :' + sender_id)
                cb(null, body)
            }
        })
        callback(null, 'Gửi thành công ' + sender_id)
        if (i >= response.length) {
            FBLoaded = false
            console.log('full')
        }
        setTimeout(SendMessageHelper(response),
            2 * 1000);

    } else {
        console.log('gui tat ca thanh cong')
        return;
    }
}

// API End Point - added by Stefan

