var url = "https://m.facebook.com/photo.php?fbid=1077210372454491&set=a.229396497235887&type=3&comment_id=1077414532434075&reply_comment_id=1077912435717618&force_theater=true&ref=m_notif&notif_t=photo_comment&notif_id=1544351209588661"
// var res = url.split("&");
// res = res[3].split("=")[1]
var fbid = url.match(/fbid=([0-9]+)&/)[1]
var type = url.match(/type=([0-9]+)&/)[1]
var comment_id = url.match(/comment_id=([0-9]+)&/)[1]
var reply_comment_id = url.match(/reply_comment_id=([0-9]+)&/)[1]
var notif_id = url.match(/notif_id=([0-9]+)/)[1]
var notif_t = url.match(/notif_t=([a-z]+)&/)
// if (fbid.length == 2) {
// }
console.log('fbid: ' + fbid)
console.log('type: ' + type)
console.log('comment_id ' + comment_id)
console.log('reply_comment_id: ' + reply_comment_id)
console.log('notif_id: ' + notif_id)
console.log('notif_t: ' + notif_t)

function myFunc() {
    console.log("Hello from myFunc")
}

// export default myFunc;
module.exports = myFunc

//1: cookie.match(/c_user=([0-9]+);/)

// let result = body2.match(/<input type=\"hidden\" name=\"fb_dtsg\" value=\"(.*?)\" autocomplete=\"off\" \/>/);