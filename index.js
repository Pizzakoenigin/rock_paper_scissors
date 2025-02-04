'use strict';

initGame();

function getComputerChoice(userChoice, computerChoice, gameMoves, gameData) {
    let computerChoiceLabel = document.createElement("p")
    let randomNumber = Math.floor(Math.random() * (Object.keys(gameMoves).length));
    computerChoice = Object.keys(gameMoves)[randomNumber];
    document.querySelector(".userInputText").appendChild(computerChoiceLabel).textContent = `The computer used ${computerChoice}`
    playRound(userChoice, computerChoice, gameMoves, gameData)
}



function playRound(userChoice, computerChoice, gameMoves, gameData) {
    if (gameMoves[userChoice].wins.includes(computerChoice)) {
        document.querySelector(".finalResult").textContent = `you won :) ${userChoice} beats ${computerChoice}`
        gameData.humanScore++;
    } else if (gameMoves[userChoice].loses.includes(computerChoice)) {
        document.querySelector(".finalResult").textContent = `you lost :( ${computerChoice} beats ${userChoice}`
        gameData.computerScore++;
    } else if (gameMoves[userChoice].tie.includes(computerChoice)) {
        document.querySelector(".finalResult").textContent = 'tie!'
    }

    gameData.round++

    if (gameData.round == 4) {
        if (gameData.humanScore > gameData.computerScore) {
            document.querySelector(".finalResult").textContent = `you won by ${gameData.humanScore} to ${gameData.computerScore}`;
        } else if (gameData.humanScore < gameData.computerScore) {
            document.querySelector(".finalResult").textContent = `you lost by ${gameData.computerScore} to ${gameData.humanScore}`;
        } else if (gameData.humanScore == gameData.computerScore) {
            document.querySelector(".finalResult").textContent = `tie`;
        }
    }
}


function initGame() {
    let gameData = {
        humanScore: 0,
        computerScore: 0,
        rounds: 5,
        round: 0
    }

    const gameMoves = {
        'rock': { wins: ['scissors'], loses: ['paper', 'dragon', 'ufo'], tie: ['rock'] },
        'paper': { wins: ['rock'], loses: ['scissors', 'dragon', 'ufo'], tie: ['paper'] },
        'scissors': { wins: ['paper'], loses: ['rock', 'dragon', 'ufo'], tie: ['scissors'] },
        'dragon': { wins: ['scissors', 'rock', 'paper', 'ufo'], loses: [], tie: ['dragon'] },
        'ufo': { wins: ['scissors', 'rock', 'paper'], loses: ['dragon'], tie: ['ufo'] },
    };

    let userChoice = ''
    let computerChoice = ''
    let gamefield = document.querySelector("body")
    let resultLabel = document.createElement("p")
    let rockButton = document.createElement("button")
    let paperButton = document.createElement("button")
    let scissorsButton = document.createElement("button")
    let dragonButton = document.createElement("button")
    let ufoButton = document.createElement("button")
    let humanChoiceLabel = document.createElement("p")

    gamefield.appendChild(rockButton).textContent = "Rock 🪨";
    gamefield.appendChild(paperButton).textContent = "Paper 📄";
    gamefield.appendChild(scissorsButton).textContent = "Scissors ✂️"
    gamefield.appendChild(dragonButton).textContent = "Dragon 🐉"
    gamefield.appendChild(ufoButton).textContent = "Ufo 🛸"

    gamefield.appendChild(resultLabel)
    humanChoiceLabel.classList.add('userInputText')
    resultLabel.classList.add('finalResult')

    let buttons = gamefield.querySelectorAll("button")
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            gamefield.appendChild(humanChoiceLabel).textContent = `You used ${button.textContent}`
            userChoice = button.textContent.toLowerCase().slice(0, button.textContent.length - 3)
            getComputerChoice(userChoice, computerChoice, gameMoves, gameData)
        })
    })
}