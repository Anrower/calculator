class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        this.readyToReset = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (operation === "-") {
            this.currentOperand = "-";
            return;
        }
        if (this.currentOperand === "") return;
        if (this.currentOperand !== "" && this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) && isNaN(current) && this.operation !== "√") {
            return;
        } else {
            switch (this.operation) {
                case "+":
                    computation = prev + current;
                    computation = computation.toFixed(15);
                    let string1 = "";
                    let rounding = 0;
                    // string1 = String.valueOf(computation).split(".");
                    for (let j = 0; j < computation.length; j++) {
                        if (computation[j] === ".") {
                            string1 = computation.substring(j, computation.lenght);
                        }
                    }
                    for (let i = 0; i < string1.length; i++) {
                        if (string1[i] !== "0") {
                            rounding = i;
                        }
                    }
                    console.log(computation);
                    computation = parseFloat(computation).toFixed(rounding);
                    break;
                case "-":
                    computation = prev - current;
                    break;
                case "*":
                    computation = prev * current;
                    break;
                case "÷":
                    computation = prev / current;
                    break;
                case "^":
                    computation = prev ** current;
                    break;
                case "√":
                    if (prev < 0) {
                        let error = 'error: cannot calculate the square root of a negative number, please press the AC button';
                        computation = error;
                        break;
                    } else {
                        computation = Math.sqrt(prev);
                        break;
                    }
                default:
                    return;
            }
            this.readyToReset = true;
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = "";
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 2,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        console.log(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
            )} ${this.operation}`;
        } else if (this.currentOperand === "-") {
            this.currentOperandTextElement.innerText = `${this.getDisplayNumber(this.currentOperand)}`;
        } else if (this.currentOperand === "error: cannot calculate the square root of a negative number, please press the AC button") {
            this.previousOperandTextElement.innerText = "";
            this.currentOperandTextElement.innerText = this.currentOperand;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const sqrtButton = document.querySelector("[data-sqrt]");
const negativeButton = document.querySelector("[data-negative]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
);

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (
            calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset
        ) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
});

sqrtButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updateDisplay();
});