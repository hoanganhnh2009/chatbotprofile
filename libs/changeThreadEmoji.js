var request = require("request");
var querystring = require('querystring');

function changeThreadEmoji(message_id, cb) {
    const actor_id = "100004966144394"
    const cookie = 'sb=t32OWzL0fwfaj6ElosQZ83wt; datr=t32OW1Ruw1fwXzrPm6Reiwsd; dpr=2; m_pixel_ratio=2; ; c_user=100004966144394; xs=35%3AM6YqxkYhnQ2Hng%3A2%3A1544241245%3A13185%3A6238; pl=n; spin=r.4615159_b.trunk_t.1544241246_s.1_v.2_; x-referer=eyJyIjoiL21lc3NhZ2VzL3RocmVhZC8xMDAwMDI4MjYzOTcyMTUvIiwiaCI6Ii9tZXNzYWdlcy90aHJlYWQvMTAwMDAyODI2Mzk3MjE1LyIsInMiOiJtIn0%3D; fr=0EcLrb28aceQK3p2i.AWWKMcxUodIxbxItroD-XQEAdZlUkhieJLoh4gjQyarAzRBA.Bbjlby.cU.FwJ.0.0.BcC1yE.AWXEBfdE; act=1544249258182%2F6; wd=1440x398; presence=EDvF3EtimeF1544249740EuserFA21B04966144394A2EstateFDatF1544249673852Et3F_5bDiFA2thread_3a2026379260761810A2ErF1EoF1EfF2C_5dElm3FnullEutc3F1544249729245G544249740600CEchFDp_5f1B04966144394F8CC'
    const fb_dtsg = ''
    var appstate = require('./../appstate.json');
    // customize cookie
    const cookieTmp = ""
    // console.log(config.firstName + ' ' + config.lastName);
    Array.prototype.rand = function () {
        return this[Math.floor(Math.random() * this.length)];
    }
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
        doc_id: 1491398900900362, // id bai viết
        variables: variables,
        dpr: 2
    }
    let result = querystring.stringify(form_params)
    const uri = "https://www.facebook.com/webgraphql/mutation/?" + result
    let form = {
        fb_dtsg: 'AQEULyNrFRhE:AQEtmzyVWnnJ'
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
changeThreadEmoji('mid.$cAAAAB-rQhfZtvfeQClnjLJFrGefK', (err, res) => {
    console.log('res')
})
// module.exports = changeThreadEmoji


