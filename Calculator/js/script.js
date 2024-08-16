let calculation =localStorage.getItem('calculation') || '';

// create a function to display the calculation
function displayCalculation(Calculation){
  console.log('calculation');
document.querySelector('.result').innerHTML=Calculation;
}


//create a function to prfome the calculation and update claculation value
function updateCalculation(value) {
  calculation += value;

  displayCalculation(calculation);

  saveCalculation();
}

// create function to save last status of the calculation
function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}

function calculateResult() {
  // Note: eval() takes a string and runs it as code.
  // Avoid using eval() in real world projects since
  // it can potentially be given harmful code to run.
  // Only use eval() for learning purposes.
  calculation = eval(calculation);

  saveCalculation();

  displayCalculation(calculation);
}

function Clear(){
  calculation ='';
  localStorage.removeItem('calculation');
  displayCalculation(calculation);
}