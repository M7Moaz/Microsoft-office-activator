// Set Game Name
const gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game created by Muaz | ${new Date().getFullYear()}`;

// Set Game Setting

let numberOfWords = 6;
let numberOfTries = 6;
let currentTry = 1;
let numberOfHints = 2;

const words = [
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts",
  "Saint Lucia",
  "Saint Vincent",
  "Samoa",
  "San Marino",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "UK",
  "UAE",
  "US",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

let wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageDiv = document.querySelector(".message");
let fixedWordToGuess = wordToGuess.split(" ").join("");
numberOfWords = fixedWordToGuess.length;

function generateInputs() {
  let inputContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    let myDiv = document.createElement("div");
    myDiv.classList.add(`try-${i}`);
    myDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) myDiv.classList.add("disabled-inputs");

    // Create inputs
    for (let j = 1; j <= numberOfWords; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");

      myDiv.appendChild(input);
    }

    inputContainer.appendChild(myDiv);
  }

  inputContainer.children[0].children[1].focus();

  //   Disable Inputs
  let disabledInputs = document.querySelectorAll(".disabled-inputs input");
  disabledInputs.forEach((input) => (input.disabled = true));

  let inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (currentIndex < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (currentIndex > 0) inputs[prevInput].focus();
      }
    });
  });
}

// Check Word
let checkBtn = document.querySelector(".check");
checkBtn.addEventListener("click", checkLetters);

let hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click", getHint);

function checkLetters() {
  let successGuess = true;
  for (let i = 1; i <= numberOfWords; i++) {
    let inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    let currentLetter = inputField.value.toLowerCase();
    let letter = fixedWordToGuess[i - 1];

    if (currentLetter === letter) {
      inputField.classList.add("in-place");
    } else if (
      fixedWordToGuess.includes(currentLetter) &&
      currentLetter !== ""
    ) {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  // Check If user Win or lose
  if (successGuess) {
    messageDiv.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
    let allInputs = document.querySelectorAll(".inputs > div");
    allInputs.forEach((input) => {
      input.classList.add("disabled-inputs");
    });
    checkBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");

    let currentInputTry = document.querySelectorAll(`.try-${currentTry} input`);
    currentInputTry.forEach((input) => {
      input.disabled = true;
    });

    currentTry++;

    let nextInputTry = document.querySelectorAll(`.try-${currentTry} input`);

    let element = document.querySelector(`.try-${currentTry}`);
    nextInputTry.forEach((input) => {
      input.disabled = false;
    });

    if (element) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      element.children[1].focus();
    } else {
      hintBtn.disabled = true;
      checkBtn.disabled = true;
      messageDiv.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
  moveInPlaceToNextInputs();
}
// Get Hint
hintBtn.firstChild.innerHTML = `${numberOfHints}`;
function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    hintBtn.firstChild.innerHTML = `${numberOfHints}`;
    let enableInputs = document.querySelectorAll(`input:not([disabled])`);
    let emptyInputs = Array.from(enableInputs).filter(
      (input) => input.value === ""
    );
    if (emptyInputs.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyInputs.length);
      let randomInput = emptyInputs[randomIndex];
      let letterToFill = Array.from(enableInputs).indexOf(randomInput);

      if (letterToFill >= 0) {
        randomInput.value = fixedWordToGuess[letterToFill];
        randomInput.classList.add("in-place");
      }
    }
  }
  if (numberOfHints === 0) {
    hintBtn.disabled = true;
  }
}

function moveInPlaceToNextInputs() {
  let inPlaceInputs = document.querySelectorAll(
    `.try-${currentTry - 1} .in-place`
  );
  let allInputs = document.querySelectorAll(`.try-${currentTry - 1} input`);
  let inputsValues = [];
  let indexOfValue = [];
  let nextInputs = [];

  console.log(inPlaceInputs);

  indexOfValue = Array.from(allInputs)
    .map((e, i) => {
      if (e.className == "in-place") {
        return i;
      } else {
        return null;
      }
    })
    .filter((index) => {
      return index !== null;
    });

  console.log(indexOfValue);

  inPlaceInputs.forEach((input, i) => {
    inputsValues[i] = input.value;
  });

  console.log(inPlaceInputs);

  for (let i = 0; i < indexOfValue.length; i++) {
    nextInputs[i] = document.querySelector(
      `#guess-${currentTry}-letter-${indexOfValue[i] + 1}`
    );
  }

  console.log(nextInputs);

  nextInputs.forEach((input, i) => {
    input.value = inputsValues[i];
    input.classList.add("in-place");
  });
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    let inputs = document.querySelectorAll("input:not([disabled])");
    let currentInput = Array.from(inputs).indexOf(document.activeElement);
    if (currentInput > 0) {
      let current = inputs[currentInput];
      let prev = inputs[currentInput - 1];

      current.value = "";
      prev.value = "";

      prev.focus();
    }
  }
}

document.addEventListener("keydown", handleBackspace);

// document.querySelector(".startGame").addEventListener("click", function () {
//   // Create a new instance of SpeechSynthesisUtterance
//   const utterance = new SpeechSynthesisUtterance("Lets Play");

//   // You can customize the voice if needed
//   const voices = speechSynthesis.getVoices();
//   if (voices.length > 0) {
//     // For example, you can use the first voice in the list
//     utterance.voice = voices[0];
//   }

//   // Speak the text
//   speechSynthesis.speak(utterance);
// });

window.onload = function () {
  generateInputs();
};
