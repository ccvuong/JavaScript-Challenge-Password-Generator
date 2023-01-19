// DOM elements
var results = document.getElementById('resultLocation');
var passowrdLength = document.getElementById('pw-length');
// selection id's
var uppercaseLetters = document.getElementById('includeUppercase');
var lowercaseLetters = document.getElementById('includeLowercase');
var numbersIncluded = document.getElementById('includeNumbers');
var symbolsIncluded = document.getElementById('includeSymbols');
// btn id=generate
var generateEl = document.getElementById('generate-btn');

var randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};




// The Event Listener looks for what the user checkboxes;
generateEl.addEventListener('click', function () {
  var length = +passowrdLength.value;
  var lower = uppercaseLetters.checked;
  var upper = lowercaseLetters.checked;
  var number = numbersIncluded.checked;
  var symbol = symbolsIncluded.checked;

  results.innerText = generatePassword(lower, upper, number, symbol, length);
});




// Generates the password 
function generatePassword (lower, upper, number, symbol, length) {
  var generatePassword = '';

  var typesCount = lower + upper + number + symbol;
  
  // Checks to see which checkboxes were not marked and filters them out;
  var typesArray = [{lower}, {upper}, {number}, {symbol}].filter (function(item) { return Object.values(item) [0]});

  if (typesCount === 0) {
    return '';
  }

  // Then it will generate the different characters/letters;
  // The for loop will look for what the user checkboxed and the filters then make the password;
  for (let i = 0; i < length; i += typesCount) {

    for(let j = 0; j < typesArray.length; j++) {
      var funcName = Object.keys(typesArray[j]) [0];
      
      generatePassword += randomFunc[funcName] ();
    };
    
  }

  var finalPassword = generatePassword.slice(0, length);

  return finalPassword;

}



// Fuctions will use ASCII to represent the corresponding numbers to letters, numbers, and symbols on the browser;

// Math.floor will round DOWN a number, making it a whole number;
// Example: the generated result is 9.5 and with Math.floor that will = 9 (a whole intergar instead);

// Math.floor(Math.random() * 26(amount of letters in the alphabet) + (ASCII number for the letter); 
// The Lower,Upper functions will grab a random letter from 26 letters, starting from the ASCII letter;


function getRandomLower () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Math.floor(Math.random() * 10(numbers 0-9) + (ASCII number for the number); 
// The number function will grab a random number from 10 numbers, starting from the ASCII number;

function getRandomNumber () {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Math.floor(Math.random() * symbols.length; 
// The symbol function will grab a random symbol from the var symbols listed;

function getRandomSymbol () {
  var symbols = '!@#$%^&*(){}+<>/,';
  return symbols [Math.floor(Math.random() * symbols.length)];
}