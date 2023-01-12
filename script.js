// DOM elements
var resultsEl = document.getElementById('result');
var lengthEl = document.getElementById('pw-length');
// selection id's
var uppercaseEl = document.getElementById('includeUppercase');
var lowercaseEl = document.getElementById('includeLowercase');
var numbersEl = document.getElementById('includeNumbers');
var symbolsEl = document.getElementById('includeSymbols');
// btn id=generate
var generateEl = document.getElementById('generate');

var randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Event Listener to see if the checkboxes are marked/not
generateEl.addEventListener('click', () => {
  var length = +lengthEl.value;
  var lower = lowercaseEl.checked;
  var upper = uppercaseEl.checked;
  var number = numbersEl.checked;
  var symbol = symbolsEl.checked;

  resultsEl.innerText = generatePassword(lower, upper, number, symbol, length);
});

// Generate PW function
function generatePassword (lower, upper, number, symbol, length) {
  let generatePassword = '';

  var typesCount = lower + upper + number + symbol;
  
  // Filters out unchecked items
  var typesArray = [{lower}, {upper}, {number}, {symbol}].filter (item => Object.values(item) [0]);

  if (typesCount === 0) {
    return '';
  }

  // Generating the different characters
  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      var funcName = Object.keys(type) [0];

      generatePassword += randomFunc[funcName] ();
    });
  }

  var finalPassword = generatePassword.slice(0, length);

  return finalPassword;

}

// Generate functions! 26 Letters, 10 numbers
function getRandomLower () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber () {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol () {
  var symbols = '!@#$%^&*(){}+<>/,';
  return symbols [Math.floor(Math.random() * symbols.length)];
}