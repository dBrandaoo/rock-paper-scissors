let playerChoice
let cpuChoice
let inGame = false
let playerScore = 0
let enemyScore = 0

const buttons = document.getElementsByClassName("choice")
const banner = document.getElementById("banner")
const playerHand = document.getElementById("playerHand")
const enemyHand = document.getElementById("enemyHand")
const textArea = document.getElementById("textArea")

// animation variables
let style = getComputedStyle(document.documentElement)
const animationDuration = style.getPropertyValue('--animation-duration').slice(0, -1)
const animationCount = style.getPropertyValue('--animation-iteration-count')

/* Defines the player move, highlights the move by changing the color of the border
*  When the player changes the move, resets every border to default color (black)
*/
function defChoice(choice, id) {
    playerChoice = choice
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.borderColor = "black"
    }
    document.getElementById(id).style.borderColor = "red"
}

// Picks a random move to use against the player
function randomChoice() {
    const CHOICES = ["rock", "paper", "scissors"]
    cpuChoice = CHOICES[Math.floor(Math.random() * 3)]
}

// Updates the score, changing the text above the game wrapper
function scoreBoardUpdate(whoScored) {
    if (whoScored == "player") {
        playerScore++
    } 
    else {
        enemyScore++
    }
    document.getElementById("scoreBoard").innerText = `PLAYER - ${playerScore} | ${enemyScore} - CPU`
}

// Changes the images of the hands according to the player and enemy moves
function changeImage(playerChoice, cpuChoice) {
    if (playerChoice == "paper") {
        playerHand.src = "images/player/playerPaper.png"
    }
    if (playerChoice == "scissors") {
        playerHand.src = "images/player/playerScissors.png"
    }

    if (cpuChoice == "paper") {
        enemyHand.src = "images/enemy/cpuPaper.png"
    }
    if (cpuChoice == "scissors") {
        enemyHand.src = "images/enemy/cpuScissors.png"
    }
}

// Resets everything (except the scoreboard) to the default value, in order to be able to continue playing
function resetGame() {
    playerChoice = " "
    inGame = false
    playerHand.src = "images/player/playerRock.png"
    enemyHand.src = "images/enemy/cpuRock.png"
    banner.innerText = "WELCOME TO ROCK-PAPER-SCISSORS"
    textArea.innerText = " "
    console.log(textArea)
    playerHand.classList.remove("playerAnimation")
    enemyHand.classList.remove("enemyAnimation")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.borderColor = "black"
        buttons[i].disabled = false
    }   
}

// Main function that calls the other functions in order to get the game moving
function game() {
    // checks if the player has picked the move
    if (playerChoice == undefined || playerChoice == " ") {
        alert("You didn't pick your move!")
    }
    else if (!inGame){
        inGame = true
        playerHand.classList.add("playerAnimation")
        enemyHand.classList.add("enemyAnimation")


        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true
        }

        // loops through the words, synced with the animation
        // just to fill empty space
        let words = ["ROCK", "PAPER", "SCISSORS", "SHOOT"]
        let i = 0
        let textChange = setInterval(() => {
            textArea.innerText = words[i]
            if (i == words.length - 1) {
                clearInterval(textChange)
            }
            i++
        }, animationDuration * 2000)


        // time out is here to wait for the animations to finish before actually rolling out the game
        setTimeout(() => {
            randomChoice()
            changeImage(playerChoice, cpuChoice)
        
            // determines the winner of the round, updates the text to say who won and updates the scoreboard
            if (playerChoice == "rock") {
                switch (cpuChoice) {
                    case "paper":
                        banner.innerText = "CPU Wins!"
                        scoreBoardUpdate("cpu")
                        break
                    case "scissors":
                        banner.innerText = "Player Wins!"
                        scoreBoardUpdate("player")
                }
            }
            else if (playerChoice == "paper") {
                switch (cpuChoice) {
                    case "rock":
                        banner.innerText = "Player Wins!"
                        scoreBoardUpdate("player")
                        break
                    case "scissors":
                        banner.innerText = "CPU Wins!"
                        scoreBoardUpdate("cpu")
                }
            }
            else {
                switch (cpuChoice) {
                    case "paper":
                        banner.innerText = "Player Wins!"
                        scoreBoardUpdate("player")
                        break
                    case "rock":
                        banner.innerText = "CPU Wins!"
                        scoreBoardUpdate("cpu")
                }
            }
            if (playerChoice == cpuChoice) {
                banner.innerText = "It's a Tie!"
            }
            
            // waits 2 seconds before reseting the game
            setTimeout(resetGame, 1250)

        }, animationDuration * animationCount * 1000)
    }
}
