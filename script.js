const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

uptadeDisplay();

function uptadeDisplay() {
  display.value = displayValue;
}

// sadece buttonlara bastığımızda çalışsın;
keys.addEventListener("click", function (e) {
  const element = e.target;

  if (!element.matches("button")) return; // burası ile sadece buttonlara ulaşıyoruz

  if (element.classList.contains("operator")) {
    handleOperator(element.value); 
    uptadeDisplay() 
    return; // kodumuz çalıştı diğerlerini çalıştırma ondan dolayı return koyuyoruz
  }

  if (element.classList.contains("decimal")) {
    inputDecimal(element.value);
    uptadeDisplay();
    return;
  }

  if (element.classList.contains("clear")) {
    clear();
    uptadeDisplay();
    return;
  }
  inputNumber(element.value);
  uptadeDisplay();
});

// Number
function inputNumber(num) {
    // sayı yazdıktan sonra ikinci sayıyı yazdığımızda ilk sayının gitmesi için yaptığımız işlem
    if(waitingForSecondValue) {
        displayValue = num
        waitingForSecondValue = false;
    } else {
         displayValue = displayValue === "0" ? num : displayValue + num; // sayıları yaz yana yazdırmak için
    }

    console.log(displayValue , firstValue , operator , waitingForSecondValue);
 
}

// Noktaya tıklanması
function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
// AC tuşuna bastığımızda temizlenmesi
function clear() {
  displayValue = "0";
}


// Hesaplamanın yapılması

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue,value,operator);

        displayValue = String(result);
        firstValue = result;

    }

    waitingForSecondValue = true;
    operator = nextOperator;
    console.log(displayValue , firstValue , operator , waitingForSecondValue); // operatore tıkladığımızda false true olur

}

//İşlermlerin yapılması için;

function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if ( operator === '-' ) {
        return first - second ; 
    } else if ( operator === '*' ) {
        return first * second ; 
    } else if ( operator === '/' ) {
        return first / second ; 
    }

    return second;
} 