'use strict';

// console.log("hello world");

getComputerChoice()

function getComputerChoice() {
    let randomNumber = Math.random();


    if (randomNumber <= (1/3)) {
        console.log('rock');
    }
  
    if (randomNumber >= (1/3) && randomNumber <= (2/3)) {
        console.log('paper');
    }

    if (randomNumber >= (2/3)) {
        console.log('scissors');
    }

    console.log(randomNumber);
    
    
}