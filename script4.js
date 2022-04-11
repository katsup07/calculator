
function runCalculator() {

let txt='';//inputs are stored as strings. number strings are converted to numbers before math operations.
let x;//first number in computation
let y;//second number in computation
let operator;//operator between x and y

let onScreen = true;//answer is on screen
let negativeX = false;//becomes true when x is negative

const operators = ['+', '-', 'x', '/'];
const buttons = document.querySelectorAll("button");
const screen = document.querySelector('.screen');

//math operations
function add(x,y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

function multiply(x,y){
    return x*y;
}

function divide(x,y){
    return y!==0 ? x/y : 'Error';
}

//function that chooses the correct operation to call
function operate(x,y,operator){
    x = +x;//convert x and y from string to number before calculations
    y = +y;
    switch(operator){
        case "+":
            return add(x,y);
            
        case "-":
           return subtract(x,y);
           
        case "x":
           return multiply(x,y);
 
        case "/":
            return divide(x,y);
         
        default:
            return "Ooops!"
    }
 
 }

 //set screen to '0' and reset global variable values;
function clear() {
    txt='';
    x=null;
    y=null;
    operator=null;
    negativeX = false;
    screen.textContent = 0;
}

//display answer on screen after an operation is called
function displayAnswerOnScreen() {
    negativeX ? x='-'+x : '';//when negative, include sign infront of x before computations
    screen.textContent = operate(x,y, operator);
    onScreen = true;
}


function handleClick(e) {
    const input = e.currentTarget.textContent;

    e.currentTarget.classList.add('highlight');//highlight button when clicked
    
    setTimeout(()=> {
        this.classList.remove('highlight');
    }, 500);
    
    if(onScreen){//if answer is displayed on screen from previous calculation, clear before next begins.
        clear();
        onScreen = false;
    }
    
    if(input === 'C'){//clear screen when someone clicks 'C'
        return clear();
    }    
    
    if (txt.includes('-') || txt.includes('+') || txt.includes('x') || txt.includes('/')){
        operators.forEach(oper => txt.includes(oper) ? operator = oper : '');//stores the operator
       if(txt[0] === '-') {//checks if negative number is being input
           negativeX = true;
           txt = txt.slice(1,txt.length);//remove the negative sign from start of the string and keep track with negativeX.
       } 
       else {
       [x,emptyString] = txt.split(operator);//store the x value when there is no y yet.
       }
     }
   
     if(input !== '=') {//when no equals clicked, concatenate to string
       txt+=input;
       negativeX ? screen.textContent = '-'+txt : screen.textContent=txt;//Add negative sign to screen for negative x values
    } 
    else if(input === '='){//when equals is clicked, do one of the following
        
        if(!x && operator){//shows error when someone only has operator on screen
            clear();
            screen.textContent = 'Error';
        }
        if(x && operator) {
           [x,y] = txt.split(operator);//store x=a and y=b when someone inputs 'a+b'
           if(!y) {//if no y has been input, then reset operator and display x on screen
            txt=x;
            operator = null;
            screen.textContent = txt;
           } 
           else {
           displayAnswerOnScreen();
          
           x = operate(x,y, operator).toString();//convert number answer back to string
           y=null;//reset
           txt = x;
           operator=null;
           negativeX=false;
           screen.textContent = txt;

        }
    }
  }
}

 buttons.forEach((button) => button.addEventListener("click", handleClick));
}

runCalculator();