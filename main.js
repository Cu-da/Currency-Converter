// Fetch data from API
async function getData() {
  let response = await fetch(
    "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=27068682e6004e139bce53b5b39f9d04"
  );
  let data = response.json();
  return data;
}

// Main Elements
let inputOne = document.getElementById("input-one");
let inputTwo = document.getElementById("input-two");
let currOne = document.querySelector(".curr-one");
let currTwo = document.querySelector(".curr-two");
let switchCurr = document.querySelector(".switch");

// Add currencies options
function create(parent, obj) {
  let arr = Object.keys(obj);
  arr = arr.sort().slice(1);
  for (let i = 0; i < arr.length; i++) {
    let opt = document.createElement("option");
    opt.setAttribute("value", arr[i]);
    opt.innerHTML = arr[i];
    parent.appendChild(opt);
  }
}

let rates;
getData()
  .then((data) => {
    rates = data.rates;
    return rates;
  })
  .then((obj) => {
    create(currOne, obj);
    create(currTwo, obj);
    inputOne.value = "1";
    currOne.value = "USD";
    currTwo.value = "EGP";
    update();
  });

function update() {
  inputTwo.value =
    (inputOne.value * rates[currTwo.value]) / rates[currOne.value];
}

switchCurr.onclick = () => {
  [currOne.value, currTwo.value] = [currTwo.value, currOne.value];
  [inputOne.value, inputTwo.value] = [inputTwo.value, inputOne.value];
};

inputOne.addEventListener("input", () => {
  update();
});
[currOne, currTwo].forEach((select) => {
  select.addEventListener("change", () => {
    update();
  });
});
