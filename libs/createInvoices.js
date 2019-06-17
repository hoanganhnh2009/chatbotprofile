var request = require("request");
var rp = require("request-promise");
let defaultState = {
  name: "",
  telephone: "",
  name_receiver: "",
  invoicestatus: "",
  city: "",
  district: "",
  ward: "",
  address: "",
  note: "",
  hinhthucvc: "",
  discount_percent: "0",
  discount_amount: "0",
  s_h_amount: "0",
  ghichu1: "",
  ghichu2: "",
  notevanchuyen: "",
  giamgia: "0",
  phuthu: "0",
  phivanchuyen: "0",
  adjustment: "0.000",
  taxtype: "individual",
  deposits: 0,
  subtotal: 0,
  taxtotal_invoice: "0",
  total: 0,
  list_clientgroup: "",
  accountid: 0,
  productstoreid: 0,
  list_pageitem: "",
  listProduct: []
};
function createInvoices(item) {
  console.log("TCL: createInvoices -> item", item);
  const headers = {
    "Content-Type": "application/json"
  };
  let url =
    "https://new.abit.vn/invoices/create?dynamic_key=MTU2MDg3NzQyMXw4ODg2ZTczMmNkYWU2YzBiM2Y4MjliZjVmYzRiNDVkM3wxNzY2OXwyfGNvbm5lY3RfMjM0";
  let formData = {
    ...defaultState,
    ...item
  };
  console.log("TCL: createInvoices -> formData", formData);
  let body = JSON.stringify([formData]);
  request(
    {
      headers: headers,
      uri: url,
      body: body,
      method: "POST"
    },
    function(error, response, body) {
      if (error) {
        console.log(error);
      } else {
        if (body.status === "success") {
          console.log("Create Invoices Success");
        }
      }
    }
  );
  return true;
}
// createInvoiceAbitStore();
module.exports = createInvoices;
