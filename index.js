'use strict';

playGame();

function getComputerChoice(gameMoves) {
    let randomNumber = Math.floor(Math.random() * (Object.keys(gameMoves).length));
    let computerChoice = Object.keys(gameMoves)[randomNumber];

    console.log(computerChoice);

    return computerChoice

}

// function getRandomIntInclusive(min, max) {
//     const minCeiled = Math.ceil(min);
//     const maxFloored = Math.floor(max);
//     return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
//   }
  

function getHumanChoice() {
    let humanChoice = window.prompt("Rock, paper or scissors?")
    humanChoice.toLowerCase

    console.log(humanChoice);

    return humanChoice

}



function playGame() {
    let humanScore = 0
    let computerScore = 0

    let rounds = 5
    let round = 0

    const gameMoves = {
        'rock': {wins: ['scissors'], loses: ['paper', 'dragon', 'tank'], tie: ['rock']},
        'paper': {wins: ['rock'], loses: ['scissors', 'dragon', 'tank'], tie: ['paper']},
        'scissors': {wins: ['paper'], loses: ['rock', 'dragon', 'tank'], tie: ['scissors']},
        'dragon': {wins: ['scissors', 'rock', 'paper', 'tank'], loses: [], tie: ['dragon']},
        'tank': {wins: ['scissors', 'rock', 'paper'], loses: ['dragon'], tie: ['tank']},
    };

    // getComputerChoice();
    // getHumanChoice();

    // console.log(computerChoice);
    // console.log(humanChoice);

    for (round; round < rounds; round++) {
        playRound(getHumanChoice(), getComputerChoice(gameMoves), gameMoves)

        if (round == 4) {
            if (humanScore > computerScore) {
                console.log(`you won by ${humanScore} to ${computerScore}`);

            }

            if (humanScore < computerScore) {
                console.log(`you lost by ${computerScore} to ${humanScore}`);
            }

            if (humanScore == computerScore) {
                console.log(`tie`);
                
            }
        }
    }



    function playRound(humanChoice, computerChoice, gameMoves) {

        if (!Object.keys(gameMoves).includes(humanChoice)) {
            console.log("you must write rock, paper, dragon, tank or scissors. Zero points for you");
            computerScore++
        } else {
            if (gameMoves[humanChoice].wins.includes(computerChoice)) {
                console.log(`you won :) ${humanChoice} beats ${computerChoice}`);
                humanScore++;
            } else if (gameMoves[humanChoice].loses.includes(computerChoice)) {
                console.log(`you lost :( ${computerChoice} beats ${humanChoice}`);
                computerScore++;
            } else if (gameMoves[humanChoice].tie.includes(computerChoice)) {
                console.log('tie!');
            }
        }
    }
}