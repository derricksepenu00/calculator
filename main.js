const keys = document.querySelectorAll("[data-key]");
const display = document.getElementById("display");
const preview = document.getElementById("preview");
const themeSelects = document.querySelectorAll("[data-theme]");
const html = document.documentElement;

let firstOperand = null;
let secondOperand = null;
let operator = null;

keys.forEach((key) =>
  key.addEventListener("click", () => {
    const displayValue = display.textContent;
    //if the key is a number, take the number & display it on the screen
    if (key.classList.contains("number")) {
      const keyValue = key.dataset.key;
      if (displayValue === "0") {
        display.textContent = keyValue;
      } else {
        display.textContent = displayValue + keyValue;
      }
    }

    // if the key is decimal, add 1 decimal
    if (key.classList.contains("decimal")) {
      if (!displayValue.includes(".")) {
        display.textContent = `${displayValue}.`;
      }
    }

    
// if the key is reset, reset everything
    if (key.classList.contains("reset")) {
      display.textContent = "0";
      preview.textContent = "";
      firstOperand = null;
      secondOperand = null;
      operator = null;
      hasOperator = false;
    }

    
// if the key is delete, delete number
    if (key.classList.contains("delete")) {
      const numbers = displayValue.split("").slice(0, -1);
      if (numbers.length === 0) {
        display.textContent = "0";
      } else {
        display.textContent = numbers.join("");
      }
    }

  // if the key is operator, add 1 operator
    if (key.classList.contains("operator")) {
      if (operator) return;
      operator = key.dataset.key;
      const operatorSymbol = key.dataset.symbol;
      preview.textContent = `${displayValue} ${operatorSymbol}`;
      display.textContent = "0";
      firstOperand = displayValue;
    }

  
// if the key is equal, then do the calculations
    if (key.classList.contains("equal")) {
      firstOperand = parseFloat(firstOperand);
      secondOperand = parseFloat(displayValue);
      calculate();
    }
  })
);

// function to perform calculations based on the operator type
function calculate() {
  let result = "";
  switch (operator) {
    case "addition":
      result = firstOperand + secondOperand;
      break;
    case "subtraction":
      result = firstOperand - secondOperand;
      break;
    case "division":
      result = firstOperand / secondOperand;
      break;
    case "multiplication":
      result = firstOperand * secondOperand;
      break;
    default:
      return;
  }

  if (isNaN(result) || result == Infinity) return alert("tidak bisa dibagi!");

  firstOperand = Number.isInteger(result) ? result : result.toFixed(2);
  display.textContent = firstOperand;
  preview.textContent = "";
  operator = null;
}

// Handle switch theme
themeSelects.forEach((select) => {
  select.addEventListener("change", () => {
    const theme = select.value;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme-calc", theme);
  });
});

// get theme preference
const getThemePreference = () => {
  const theme = localStorage.getItem("theme-calc") ?? "default";
  const toggle = document.querySelector(`input[data-theme=${theme}]`);
  const media = matchMedia("(prefers-color-scheme: dark)");

  // set / apply the theme stored in localStorage to the app
  if (theme) {
    html.setAttribute("data-theme", theme);
    toggle.checked = true;
    return;
  }


// set the theme to the app according to the device's system theme
  if (media.matches) {
    html.setAttribute("data-theme", "dark");
    toggle.checked = true;
  } else {
    html.setAttribute("data-theme", theme);
    toggle.checked = true;
  }
};

getThemePreference();