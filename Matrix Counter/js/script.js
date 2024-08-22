const game = {
  matrix: [],
  result: Math.floor(Math.random() * 10),
  guessInput: 0,
};

const getResultElement=()=>    document.querySelector('.result');

const getInputAnswerElement=()=>document.querySelector('.guess-input');

const setNumberToCount=()=>  document.querySelector('.number').innerHTML = ` ${game.result}`;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayGrid(matrixSize) {
  // Calculate the grid dimension (e.g., 3 for 3x3, 6 for 6x6)
  const gridDimension = Math.sqrt(matrixSize);

  // Set up the grid layout based on the matrix size
  const matrixContainer = document.querySelector('.matrix');
  matrixContainer.style.gridTemplateColumns = `repeat(${gridDimension}, 1fr)`;
  matrixContainer.style.gridTemplateRows = `repeat(${gridDimension}, 1fr)`;
  return matrixContainer;
}

function fillMatrixAndReturnNumberCount(matrixSize) {
  let html = '';
  let count = 0;

  // Clear previous matrix data
  game.matrix = [];
  
  const matrixContainer = displayGrid(matrixSize);

  for (let i = 0; i < matrixSize; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    game.matrix.push(randomNumber);

    if (randomNumber === game.result) {
      count++;
    }

    const randomColor = getRandomColor();
    html += `
      <div class="choces" style="background-color: ${randomColor};">
        ${randomNumber}
      </div>
    `;
  }

  matrixContainer.innerHTML = html;

  return count;
}

function getGuessInput() {
  const guessInput = getInputAnswerElement()?.value;
  const guess = parseInt(guessInput, 10);

  // Check if the input is a valid number
  if (isNaN(guess)) {
    document.querySelector('.result').textContent = 'Please enter a valid number.';
    return 0;
  }

  return guess; // Return the parsed input
}

function showResult(count) {
  const guessInput = getGuessInput();
  const resultElement = getResultElement();

  // Check the result
  if (guessInput === count) {
    resultElement.innerHTML = ` <img src ="../imgs/correct.png"> Correct`;
  } else {
    resultElement.innerHTML = ' <img src ="../imgs/Wrong.png">  Wrong';
  }
}

function startGame() {
  setNumberToCount();
  const matrixSize = parseInt(document.querySelector('.level').value, 10);

  if (isNaN(matrixSize)) {
    console.error('Matrix size is not a valid number.');
    return;
  }

  // Fill matrix and get the count of target numbers
  const count = fillMatrixAndReturnNumberCount(matrixSize);

  // Store the count for later use
  game.numberCount = count;
}

function reset() {
  const resultElement = getResultElement();
  const inputElement = getInputAnswerElement();

  if (resultElement) {
    resultElement.innerHTML = '';
  }

  if (inputElement) {
    inputElement.value = '';
  }
  game.matrix = [];
  game.result= Math.floor(Math.random() * 10);
  startGame();
}
// Attach event listeners
document.querySelector('.level').addEventListener('change', () => {
  startGame(); // Start the game when the level changes
});

// Attach event listener to submit button
document.querySelector('.submit-btn').addEventListener('click', () => {
  // Use the stored count
  const count = game.numberCount;
  showResult(count);
});

// Attach event listener to result button
document.querySelector('.reset-btn').addEventListener('click', () => {
  reset(); // Start the game when the level changes
});

// Initialize the game
startGame();