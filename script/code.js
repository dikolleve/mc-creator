const managers_check_form = document.getElementById("managers_check_form_id");
const payee = document.getElementById("payee_id");
const input_date = document.getElementById("date_id");
const amount = document.getElementById("amount_id");
const amount_in_wds = document.getElementById("amount_in_wds_id");
const dorel = document.getElementById("dorel_id");
const water = document.getElementById("water_id");
const clear = document.getElementById("clear_id");

const handleClear = (e) => {
  e.preventDefault();
  payee.value = "";
  amount.value = "";
  amount_in_wds.value = "";
};

const handlePayee = (e) => {
  e.preventDefault();
  let text_payee = e.target.value;
  payee.value = text_payee.toUpperCase();
};

const handleDorel = (e) => {
  e.preventDefault();
  payee.value = "DON ORESTES ROMUALDEZ ELECTRIC COOPERATIVE, INC.";
};

const handleWater = (e) => {
  e.preventDefault();
  payee.value = "ABUYOG WATER DISTRICT";
};

const handlePreview = (e) => {
  //document.querySelector('.mc_form').innerHTML = null;
  e.preventDefault();
  console.log(payee.value);
  console.log(input_date.value);
  console.log(amount.value);
  console.log(amount_in_wds.value);

  const info = {
    payee: payee.value,
    input_date: input_date.value,
    amount: amount.value,
    amount_in_wds: amount_in_wds.value,
  };

  const encodedData = encodeURIComponent(JSON.stringify(info));

  window.location.href = `print.html?data=${encodedData}`;
};

// System for American Numbering
var th_val = ["", "thousand", "million", "billion", "trillion"];
// System for uncomment this line for Number of English
// var th_val = ['','thousand','million', 'milliard','billion'];

var dg_val = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
var tn_val = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
var tw_val = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const toWordsconvert = (e) => {
  amount_in_wds.value = null;
  let s = e.target.value;
  s = s.toString();
  s = s.replace(/[\, ]/g, "");
  if (s != parseFloat(s)) return "not a number ";

  var x_val = s.indexOf(".");

  if (x_val == -1) x_val = s.length;

  if (x_val > 15) return "too big";

  var n_val = s.split("");
  var str_val = "";
  var sk_val = 0;

  for (var i = 0; i < x_val; i++) {
    if ((x_val - i) % 3 == 2) {
      if (n_val[i] == "1") {
        str_val += tn_val[Number(n_val[i + 1])] + " ";
        i++;
        sk_val = 1;
      } else if (n_val[i] != 0) {
        str_val += tw_val[n_val[i] - 2] + " ";
        sk_val = 1;
      }
    } else if (n_val[i] != 0) {
      str_val += dg_val[n_val[i]] + " ";
      if ((x_val - i) % 3 == 0) str_val += "hundred ";
      sk_val = 1;
    }
    if ((x_val - i) % 3 == 1) {
      if (sk_val) str_val += th_val[(x_val - i - 1) / 3] + " ";
      sk_val = 0;
    }
  }
  if (x_val != s.length) {
    var y_val = s.length;
    str_val += "and ";
    for (var i = x_val + 1; i < y_val; i++) {
      str_val += n_val[i] + "";
    }
    str_val += "/100";
  }
  //str_val+='/100 Pesos Only'
  str_val += " Pesos Only";

  amount_in_wds.value = str_val.toUpperCase().replace(/\s+/g, " ");
};

const runDate = () => {
  const today = new Date();

  const month = (today.getMonth() + 1).toString().padStart(2, 0);
  const date = today.getDate().toString().padStart(2, 0);
  const year = today.getFullYear().toString();

  input_date.value = `${year}-${month}-${date}`;
};

const init = () => {
  document.addEventListener("DOMContentLoaded", runDate);
};

amount.addEventListener("keyup", toWordsconvert);
managers_check_form.addEventListener("submit", handlePreview);
dorel.addEventListener("click", handleDorel);
water.addEventListener("click", handleWater);
payee.addEventListener("keyup", handlePayee);
clear.addEventListener("click", handleClear);

init();
