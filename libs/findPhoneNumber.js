/* async function find_phone_numbers(item) {
  // let pattern_message = /{{name}}/gi;
  // let message = text_long.replace(pattern_message, username);
  return item;
}
 */

function isPhoneValid(phoneNumber) {
  let patt = /(09|01[2|6|8|9]|02|03)+([0-9]{8,9})\b/g;
  let phone = phoneNumber.match(patt);
  if (phone) {
    return phone;
  } else {
    return phone;
  }
}

function find_phone_numbers(item, debug = false) {
  let { body:message } = item;
  if (message) {
    let phone = isPhoneValid(message);
    if (phone) {
      let number_phone = phone[0];
      item = {
        ...item,
        is_phone: 1,
        number_phone
      };
      return item;
    } else {
      message = message.replace("/http([^s]*)s/m", "");
      message = message.replace("/d{12,}/", "");
      message = message.replace("/ftp([^s]*)s/", "");
      message = message.split(" ").join("");
      message = message.split("-").join("");
      message = message.split("/").join("");
      message = message.split(" - ").join("");
      message = message.split("\r\n").join("");
      let phone = isPhoneValid(message);
      if (phone) {
        item = {
          ...item,
          is_phone: 1,
          number_phone: phone[0]
        };
        return item;
      }
    }
  }
  return item;
}

module.exports = find_phone_numbers;
