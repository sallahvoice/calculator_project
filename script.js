let currentNumber = '0'; 
let previousNumber='';
let operator ='';
let waitingForNumber = false;
let calcHistory = [];
const historyEl = document.getElementById('history');
const display = document.getElementById('display');
const clickSound = new Audio('click.mp3');

function playClickSound() {
    clickSound.currentTime = 0; 
    clickSound.play();
}



function updateDisplay() {
    let formatNumber;
    if(currentNumber === 'error'){
       formatNumber = 'error' 
    }else if(currentNumber.includes('.')){
     const [intPart,decimalPart] = currentNumber.split('.');
     const formatInt = Number(intPart).toLocaleString('en-Us')
     formatNumber = formatInt + '.' + decimalPart;
     
    }else{
    formatNumber = Number(currentNumber).toLocaleString('en-US')
    }

    display.textContent = formatNumber;
    display.classList.remove('animate');
    void display.offsetWidth;
    display.classList.add('animate');
}

function addNumber(num){
    playClickSound();
    
    if(waitingForNumber){
       currentNumber  = num; 
       waitingForNumber = false;
    }else if(currentNumber === '0'){
        currentNumber  = num;
    }else if(currentNumber.length<=15){
        currentNumber  = currentNumber + num ;
    }else{ 
        currentNumber = currentNumber
    }
    updateDisplay();
}

function addDecimal(){
    playClickSound();
    if(waitingForNumber ){
        currentNumber = '0.';
        waitingForNumber = false;
    }else if(currentNumber.includes('.')){

    }else{
        currentNumber += '.';
    }
    updateDisplay();
}

function setOperation(op){
    playClickSound();
    if(previousNumber !== '' && !waitingForNumber) {
        calculate();
    }
    previousNumber = currentNumber;
    operator = op;
    waitingForNumber = true;
}

function calculate() {
    playClickSound();
    if(previousNumber === '' || operator === '' || waitingForNumber){
        return;
    }

    let prev = parseFloat(previousNumber);
    let current = parseFloat(currentNumber);
    let result;

    switch (operator) {
        case '+':
            result = prev+current;
            break;
        case '-':
            result = prev-current;
            break;
        case '*':
            result = prev*current;
            break;
        case '/':
            if(currentNumber === '0'){
                currentNumber = 'error';
                updateDisplay();
                return;
            }
            result = prev/current;
            break;
        default:
        return;
    }
    const expression = ` ${previousNumber} ${operator} ${currentNumber} = ${result}`
    currentNumber = result.toString();
    calcHistory.push(expression)
    if(calcHistory.length>5){
        calcHistory.shift();
    }
    operator = '';
    previousNumber = '';
    waitingForNumber = true;
    updateDisplay();
}

    function clearAll(){
    playClickSound();
    currentNumber = '0'
    previousNumber = ''
    operator = ''
    waitingForNumber = false
    calcHistory = [];
    updateDisplay()   
    }

    function clearEntry(){
     currentNumber = '0'
     playClickSound();
     updateDisplay()   
    }

    function backSpace(){
        
      if(currentNumber.length >1){
        currentNumber = currentNumber.slice(0,-1);
        updateDisplay()
      }else
     currentNumber = '0';
     playClickSound();
     updateDisplay()   
      }
//
    function history(){
    playClickSound();
    const fiveCalc = calcHistory.slice().reverse().map(doto => `${doto}<br>`).join('');
    historyEl.innerHTML = fiveCalc
    }
    
const historyBtn = document.querySelector('.history');
let isExpanded = false;

historyBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    isExpanded = !isExpanded;
    historyBtn.classList.toggle('expanded', isExpanded);
    if(!isExpanded){
        historyEl.innerHTML = 'History'
    }
});

// Click outside to close //
document.addEventListener('click', function(e) {
    if (isExpanded && !historyBtn.contains(e.target)) {
        isExpanded = false;
        historyBtn.classList.remove('expanded');
        historyEl.innerHTML = 'History';
    }
});

//
     document.addEventListener('keydown', function(event){
        const key = event.key

        if(key>='0' &&key<='9'){
            addNumber(key);
        }else if (key === '.'){
         addDecimal()   
        }else if(key === '+'||key === '-'||key === '*'||key === '/'){
            setOperation(key)
        }else if(key==='Enter'||key==='='){
            calculate()
        }else if(key==='Escape'){
            clearAll()
        }else if(key==='Backspace'){
            backSpace()
        }
     }  
     )