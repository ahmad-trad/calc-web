class Calculator{
    constructor(previousOperationTextElement, currentOperationTextElement){
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
        this.claer();
    }

    claer(){
        this.previousOperation = '';
        this.currentOperation = '';
        this.opreation = undefined;
    }

    delete(){

        this.currentOperation = this.currentOperation.toString().slice(0, -1);

    }

    appendNumber(number){
        if(number == "." && this.currentOperation.includes('.'))return
        this.currentOperation = this.currentOperation.toString() + number.toString();

    }

    chooseOpreation(operation){
        if(this.currentOperation === '')return
            if(this.previousOperation !== ''){
                this.compute()
            }
            this.operation = operation;
            this.previousOperation = this.currentOperation;
            this.currentOperation = '';
    }

    
    compute(){
        let computation
        const prev = parseFloat(this.previousOperation);
        const curr = parseFloat(this.currentOperation);
        if(isNaN(prev) || isNaN(curr))return
            switch (this.operation){
                case '+':
                    computation = prev + curr;
                    break;
                case '-':
                    computation = prev - curr;
                    break;
                case '*':
                    computation = prev * curr;
                    break;
                case '/':
                    computation = prev / curr;
                    break;
                default:
                    return
            }
            this.currentOperation = computation;
            this.operation = undefined;
            this.previousOperation = '';
        
    }

    getDispalyNumber(number){
        const stringNumber = number.toString();
        const digitalNumber = parseFloat(stringNumber.split('.')[0]);
        const dainamicNumber = stringNumber.split('.')[1];
        let inategarDisplay
        if(isNaN(digitalNumber)){
            inategarDisplay = '';
        }else{
            inategarDisplay = digitalNumber.toLocaleString('en',{
                maximumFractionDigits: 0
            })
        }

        if(dainamicNumber != null){
            return `${inategarDisplay} ${dainamicNumber}`
        }else{
            return inategarDisplay
        }
        
    }
    // const floatNumber = parseFloat(number);
    //     if(isNaN(floatNumber))return ''
    //     return floatNumber.toLocaleString('en');

    displayNumber(){
        this.currentOperationTextElement.innerText = this.getDispalyNumber(this.currentOperation);
        if(this.operation !== null && this.operation !== undefined){
            this.previousOperationTextElement.innerText = `${this.getDispalyNumber(this.previousOperation)} ${this.operation}`
        }else{
            this.previousOperationTextElement.innerText = '';
        }
        // this.previousOperationTextElement.innerText = this.previousOperation;
    }
}







//variables 
const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equlsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperationTextElement = document.querySelector('[data-previous]');
const currentOperationTextElement = document.querySelector('[data-current]');
const audioButton = document.getElementById("click");


let calculator  = new Calculator(previousOperationTextElement, currentOperationTextElement);

numberButton.forEach(number => {
    number.addEventListener('click', () =>{
        calculator.appendNumber(number.innerHTML);
        calculator.displayNumber();
        audioButton.play();
    })
})

operationButton.forEach(operation => {
    operation.addEventListener('click', () =>{
        calculator.chooseOpreation(operation.innerHTML);
        calculator.displayNumber();
        audioButton.play();
    })
})

equlsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.displayNumber();
    audioButton.play();
})

clearButton.addEventListener('click', () => {
    calculator.claer();
    calculator.displayNumber();
    audioButton.play();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.displayNumber();
    audioButton.play();
})


