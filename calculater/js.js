let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldReset = false;

const screen = document.getElementById('numscreen');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');

function updateScreen() {
    screen.textContent = currentInput;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldReset = false;
    updateScreen();
}

function appendNumber(number) {
    if (currentInput === '0' || shouldReset) {
        currentInput = number;
        shouldReset = false;
    } else {
        currentInput += number;
    }
    updateScreen();
}

function chooseOperation(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    shouldReset = true;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = computation.toString();
    operation = null;
    shouldReset = true;
    updateScreen();
}

function addDecimal() {
    if (shouldReset) {
        currentInput = '0.';
        shouldReset = false;
        return;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateScreen();
}

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.textContent);
    });
});

equalsButton.addEventListener('click', () => {
    calculate();
});

clearButton.addEventListener('click', () => {
    clearAll();
});

decimalButton.addEventListener('click', () => {
    addDecimal();
});

// Initialize
updateScreen();