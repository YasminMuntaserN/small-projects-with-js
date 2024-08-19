let Score ={
    playerMove:'',
    computerMove:'',
    result :{
      wins:0,
      losses:0,
      Ties:0
    }
};
let autoPlaying = false;
let setIntervalId=0;

const displayFinalResult=()=> document.querySelector('.final-result').innerHTML =`Wins: ${Score.result.wins}, Losses: ${Score.result.losses}, Ties: ${Score.result.Ties}`;

displayFinalResultInTheStartOfGame();


const getPlayerMove = (selectedMoveName) => selectedMoveName;

function getRandomMove()
{
      // Math.random() => gets random numbers between 0 and 1. (>= 0 && < 1)
  let randomNumber =Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function getResult(myMove, computerMove)
{
  if (myMove === computerMove) {
    return 'Tie.';
  }

  if ((myMove === 'rock' && computerMove === 'scissors') ||
    (myMove === 'paper' && computerMove === 'rock') ||
    (myMove === 'scissors' && computerMove === 'paper')) {
    return 'You win.';
  }
  else {
    return 'You lose.';
  }
}

const returnImagePath =(moveName)=>  `img/${moveName}-emoji.png`;

const updateFinalResult =(gameResult) =>
  gameResult == 'You win.'?Score.result.wins ++ :
  gameResult == 'You lose.'?Score.result.losses ++ :
  Score.result.Ties++ ;


function displayFinalResultInTheStartOfGame()
{
    Score.result =getInitializedScoreResult();
    displayFinalResult();
}

function PlayGame(playerMoveName)
{
  Score.playerMove =getPlayerMove(playerMoveName) ;
  Score.computerMove =getRandomMove() ;

  let gameResult =getResult(Score.playerMove,Score.computerMove);

  document.querySelector('.result').innerHTML =
  `
    <p>${gameResult}</p>
  <div class="auto-play-container">
      <div class ='player-move'>
        <p>
            You
            <img src="${returnImagePath(Score.playerMove)}">
        </p>
      </div>

      <div class ='Computer-move'>
        <p> 
          <img src="${returnImagePath(Score.computerMove)}">
          Computer 
        </p>
      </div>
  </div>
  `;
  setFinalResult(gameResult);
}

function setFinalResult(gameResult)
{
  updateFinalResult(gameResult);
  displayFinalResult();
  localStorage.setItem('Score.result', JSON.stringify(Score.result));
}

function getInitializedScoreResult()
{
  const storedScore = localStorage.getItem('Score.result');
  let Score = null;

  // score = storedScore !== '' ? JSON.parse(storedScore) : null;
  score = storedScore ? JSON.parse(storedScore) : null;

  score = score ?? {
    wins: 0,
    loses: 0,
    ties: 0
  };

  return score;
}

const MessageBoxContent =(content)=>
  document.querySelector('.Message-Box').innerHTML =`${content}`;

function showConfirmationMessage()
{
  MessageBoxContent(`
  Are You sure you want to reset the score?
  <button class="yes-button">Yes</button>
  <button class="no-button">No</button>
  `);

  document.querySelector('.yes-button')
    ?.addEventListener('click', () => {
      resetScore();
      MessageBoxContent('');
    });

  document.querySelector('.no-button')
    ?.addEventListener('click', () => {
      MessageBoxContent('');
    });
  
}

function removeLastPlay()
{
   document.querySelector('.result').innerHTML ='';
//   const resultDiv = document.querySelector('.result');

// // Remove the class 'player-move' from the corresponding div
// resultDiv.querySelectorAll('.player-move').forEach(element => {
//     element.classList.remove('player-move');
// });

// // Remove the class 'Computer-move' from the corresponding div
// resultDiv.querySelectorAll('.Computer-move').forEach(element => {
//     element.classList.remove('Computer-move');
// });
}

function resetScore()
{
  Score.result.wins = 0;
  Score.result.losses = 0;
  Score.result.Ties = 0;

  localStorage.removeItem('score');

  removeLastPlay();
  removeLastPlay();
  displayFinalResult();
}

function autoPlay()
{
  if(!autoPlaying){
    setIntervalId=  setInterval(()=>PlayGame(getRandomMove()),1000)
    autoPlaying=true;
    document.querySelector('.Auto-Play').innerHTML='Stop';
  }else{
    clearInterval(setIntervalId);
    autoPlaying=false;
    document.querySelector('.Auto-Play').innerHTML='Auto Play';
  }
}

function handleKeydownEvent(event) {
  const keyPress = event.key.toLowerCase();
  switch (keyPress) {
    case 'r': {
      PlayGame('rock');
      break;
    }
    case 'p': {
      PlayGame('paper');
      break;
    }
    case 's': {
      PlayGame('scissors');
      break;
    }
    case 'a': {
      autoPlay();
      break;
    }
    // case 'backspace': {
    //   showConfirmationMessage();
    //   break;
    }
}

  document.querySelector('.Rest-Score')
?.addEventListener('click', showConfirmationMessage);

document.querySelector('.Auto-Play')
?.addEventListener('click', autoPlay);

  document.body.addEventListener('keydown', (event) => {
    handleKeydownEvent(event);
  });