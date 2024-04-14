let targetNumber = generateRandomNumber();
let guessCount = 0;

function generateRandomNumber() {
    let number = "";
    while (number.length < 4) {
        let digit = Math.floor(Math.random() * 10);
        if (!number.includes(digit.toString())) {
            number += digit;
        }
    }
    return number;
}

function checkGuess() {
    let guess = document.getElementById("guess-input").value;
    if (isValidGuess(guess)) {
        guessCount++;
        let result = calculateResult(guess);
        logResult(guess, result);
        displayResult(result);

        if (result.hits === 4) {
            alert(`おめでとう！答えは、${targetNumber} でした！🎉`);
            logResult("おめでとう！🎉");
        }
    } else {
        alert("4桁の数字を被らないように入力してください。");
    }
}

function isValidGuess(guess) {
    return /^\d{4}$/.test(guess) && new Set(guess).size === 4;
}

function calculateResult(guess) {
    let hits = 0;
    let blows = 0;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === targetNumber[i]) {
            hits++;
        } else if (targetNumber.includes(guess[i])) {
            blows++;
        }
    }
    return { hits, blows };
}

function displayResult(result) {
    let resultDiv = document.getElementById("result");
    resultDiv.textContent = `Hits: ${result.hits}, Blows: ${result.blows}`;
}

function logResult(guess, result) {
    let logDiv = document.getElementById("log");
    let logItem = document.createElement("div");
    logItem.textContent = `[${guessCount}] ${guess} Hit: ${result.hits} & Blow: ${result.blows}`;
    logDiv.appendChild(logItem);
}
