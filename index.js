'use strict';

playGame();

function getComputerChoice(userChoice, computerChoice, gameMoves,) {
    let computerChoiceLabel = document.createElement("p")
    let randomNumber = Math.floor(Math.random() * (Object.keys(gameMoves).length));
    computerChoice = Object.keys(gameMoves)[randomNumber];
    document.querySelector(".userInputText").appendChild(computerChoiceLabel).textContent = `The computer used ${computerChoice}`
    
    playRound(userChoice, computerChoice, gameMoves)
}



function getHumanChoice(userChoice, computerChoice, gameMoves) {

    let rockButton = document.createElement("button")
    let paperButton = document.createElement("button")
    let scissorsButton = document.createElement("button")
    let dragonButton = document.createElement("button")
    let ufoButton = document.createElement("button")
    let humanChoiceLabel = document.createElement("p")
    humanChoiceLabel.classList.add('userInputText')
    let gamefield = document.querySelector("body")

    gamefield.appendChild(rockButton).textContent = "Rock 🪨";
    gamefield.appendChild(paperButton).textContent = "Paper 📄";
    gamefield.appendChild(scissorsButton).textContent = "Scissors ✂️"
    gamefield.appendChild(dragonButton).textContent = "Dragon 🐉"
    gamefield.appendChild(ufoButton).textContent = "Ufo 🛸"

    let buttons = gamefield.querySelectorAll("button")
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            gamefield.appendChild(humanChoiceLabel).textContent = `You used ${button.textContent}`
            userChoice = button.textContent.toLowerCase().slice(0, button.textContent.length - 3)
            getComputerChoice(userChoice, computerChoice, gameMoves)
            // return (button.textContent)
        })
    })
}


function playRound(userChoice, computerChoice, gameMoves) {
    
    let gamefield = document.querySelector("body")
    let resultLabel = document.createElement("p")

    if (gameMoves[userChoice].wins.includes(computerChoice)) {
        gamefield.appendChild(resultLabel).textContent = `you won :) ${userChoice} beats ${computerChoice}`
        humanScore++;
    } else if (gameMoves[userChoice].loses.includes(computerChoice)) {
        gamefield.appendChild(resultLabel).textContent = `you lost :( ${computerChoice} beats ${userChoice}`
        computerScore++;
    } else if (gameMoves[userChoice].tie.includes(computerChoice)) {
        gamefield.appendChild(resultLabel).textContent = 'tie!'
    }

    round++
}


function playGame() {
    let humanScore = 0
    let computerScore = 0
    let rounds = 5
    let round = 0
    let userChoice = ''
    let computerChoice = ''


    const gameMoves = {
        'rock': { wins: ['scissors'], loses: ['paper', 'dragon', 'ufo'], tie: ['rock'] },
        'paper': { wins: ['rock'], loses: ['scissors', 'dragon', 'ufo'], tie: ['paper'] },
        'scissors': { wins: ['paper'], loses: ['rock', 'dragon', 'ufo'], tie: ['scissors'] },
        'dragon': { wins: ['scissors', 'rock', 'paper', 'ufo'], loses: [], tie: ['dragon'] },
        'ufo': { wins: ['scissors', 'rock', 'paper'], loses: ['dragon'], tie: ['ufo'] },
    };

    if (round == 4) {
        if (humanScore > computerScore) {
            console.log(`you won by ${humanScore} to ${computerScore}`);
        } else if (humanScore < computerScore) {
            console.log(`you lost by ${computerScore} to ${humanScore}`);
        } else if (humanScore == computerScore) {
            console.log(`tie`);
        }
    }

    getHumanChoice(userChoice, computerChoice, gameMoves)

}