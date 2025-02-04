'use strict';

initGame();

function getComputerChoice(userChoice, computerChoice, gameMoves, gameData) {
    let randomNumber = Math.floor(Math.random() * (Object.keys(gameMoves).length));
    computerChoice = Object.keys(gameMoves)[randomNumber];
    document.querySelector(".computerInputText").textContent = `The computer used ${computerChoice}`
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
    document.querySelector(".score").textContent = `Round ${gameData.round} out of ${gameData.rounds} | Human: ${gameData.humanScore} Computer ${gameData.computerScore} `

    if (gameData.round == 5) {
        if (gameData.humanScore > gameData.computerScore) {
            document.querySelector(".finalResult").textContent = `you won by ${gameData.humanScore} to ${gameData.computerScore}`;
            finishGame();
        } else if (gameData.humanScore < gameData.computerScore) {
            document.querySelector(".finalResult").textContent = `you lost by ${gameData.humanScore} to ${gameData.computerScore}`;
            finishGame();
        } else if (gameData.humanScore == gameData.computerScore) {
            document.querySelector(".finalResult").textContent = `tie`;
            finishGame();
        }
    }

    function finishGame() {
        let rstButton = document.createElement('button')
        document.querySelector(".computerInputText").remove()
        document.querySelector(".userInputText").remove()
        document.querySelectorAll("button").forEach((button) => {
            button.disabled = true
        })
        document.querySelector(".gamefield").appendChild(rstButton).textContent = 'Restart'
        rstButton.addEventListener('click', () => {
            document.querySelector("body").removeChild(document.querySelector(".gamefield"));
            initGame()
        })
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
    let gamefield = document.createElement("div")
    let resultLabel = document.createElement("p")
    let rockButton = document.createElement("button")
    let paperButton = document.createElement("button")
    let scissorsButton = document.createElement("button")
    let dragonButton = document.createElement("button")
    let ufoButton = document.createElement("button")
    let humanChoiceLabel = document.createElement("p")
    let computerChoiceLabel = document.createElement("p")
    let score = document.createElement("p")

    document.querySelector("body").appendChild(gamefield)
    gamefield.classList.add('gamefield')

    gamefield.appendChild(score).textContent = `Round ${gameData.round} out of ${gameData.rounds} | Human: ${gameData.humanScore} Computer ${gameData.computerScore} `
    gamefield.appendChild(rockButton).textContent = "Rock 🪨";
    gamefield.appendChild(paperButton).textContent = "Paper 📄";
    gamefield.appendChild(scissorsButton).textContent = "Scissors ✂️"
    gamefield.appendChild(dragonButton).textContent = "Dragon 🐉"
    gamefield.appendChild(ufoButton).textContent = "Ufo 🛸"
    gamefield.appendChild(resultLabel)
    gamefield.appendChild(computerChoiceLabel)
    
    humanChoiceLabel.classList.add('userInputText')
    computerChoiceLabel.classList.add('computerInputText')
    resultLabel.classList.add('finalResult')
    score.classList.add('score')

    let buttons = gamefield.querySelectorAll("button")
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            gamefield.appendChild(humanChoiceLabel).textContent = `You used ${button.textContent}`
            userChoice = button.textContent.toLowerCase().slice(0, button.textContent.length - 3)
            getComputerChoice(userChoice, computerChoice, gameMoves, gameData)
        })
    })
}