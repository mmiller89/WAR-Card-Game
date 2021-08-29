class GameManager{
    constructor(){
        this.leftSideDisplay = "Player 1"
        this.rightSideDisplay = "Player 2"
        this.leftSidePoints = 0
        this.rightSidePoints = 0
        this.leftSideCards = 0
        this.rightSideCards = 0
        this.gameContinue = ""
        this.turnAmount = 0
        this.gameInitialized = false
        this.speedRound = true

    }


    standardGame(){
        if (this.gameInitialized === false){
            alert("Welcome to WAR! Let's shuffle the deck and split the cards.")
            deckHandler.randomizeDeck()
            for(let i=0; i <= deckHandler.masterDeck.length - 1; i++){
                if (i % 2 === 0){
                    playerOne.deckArray.push(deckHandler.masterDeck[i])
                } else if (i % 2 != 0){
                    playerTwo.deckArray.push(deckHandler.masterDeck[i])
                } 
            }
            
            let goCheck = false
            while (!goCheck){
                this.turnAmount = parseInt(prompt(`For a standard game, select how many turns you want the game to last. After turns expire, whoever has the most points wins!
                Please select between 5 and 99 turns.`))
                if (this.turnAmount > 4 && this.turnAmount < 100){
                    goCheck = true
                } else {
                    alert("Please input a number between 5 and 99.")
                }
            }
            
            alert(`${this.turnAmount} turns it is! Ready to go! Press the button again to start drawing cards. Good luck!`) 
            updateHTML(playerOne, playerTwo)
            this.gameInitialized = true
            this.speedRound = false

        } else if (this.gameInitialized === true) {
            if (playerOne.deckAmount > 0 && playerTwo.deckAmount > 0 && this.turnAmount != 0){
                alert("Player 1 draws a card: " + playerOne.deckArray[0] + "\n" + "Player 2 draws a card: " + playerTwo.deckArray[0])
                //If player 1 wins the draw, display it - player 1 gets a point
                //Player 2's dealt card gets pushed to the end of player 1s deck
                //Player 2 gets shift method to remove the index 0 card.
                if (playerOne.deckArray[0] > playerTwo.deckArray[0]){
                    alert("Player 1 wins this round and earns a point.")
                    playerOne.points += 1
                    playerOne.deckArray.push(playerTwo.deckArray[0])
                    playerTwo.deckArray.shift()
                    this.turnAmount -= 1
                    updateHTML(playerOne, playerTwo)
                //Same as previous method, only is Player 2 wins.
                } else if (playerOne.deckArray[0] < playerTwo.deckArray[0]){
                    alert("Player 2 wins this round and earns a point.")
                    playerTwo.points += 1
                    playerTwo.deckArray.push(playerOne.deckArray[0])
                    playerOne.deckArray.shift()
                    this.turnAmount -= 1
                    updateHTML(playerOne, playerTwo)
                } else {
                    alert("It's a draw! No points are earned.")
                    playerOne.deckArray.push(playerOne.deckArray.shift())
                    playerTwo.deckArray.push(playerTwo.deckArray.shift())
                    this.turnAmount -= 1
                    updateHTML(playerOne, playerTwo)
                 }
            } else {
                if (playerOne.points > playerTwo.points){
                    alert (`Congratulations Player 1! You have won.`)
                } else {
                    alert (`Congratulations Player 2! You have won.`)
                }
                
            }
            
       
        } 
    }


    speedGame(){
        if(this.speedRound){
            let standardGame = document.getElementById("standardGame");
            standardGame.remove();
            alert("A speed game goes through each set of cards and compares them rapidly. Opponents do not keep winning cards. After the deck is exhausted, points are tallied. Results of each round are in the console log.")
            deckHandler.randomizeDeck()
            for(let i=0; i <= deckHandler.masterDeck.length - 1; i++){
                if (i % 2 === 0){
                    playerOne.deckArray.push(deckHandler.masterDeck[i])
                } else if (i % 2 != 0){
                    playerTwo.deckArray.push(deckHandler.masterDeck[i])
                } 
            }
            for (let i=0; i <= playerOne.deckArray.length - 1; i++){
                console.log(`Player 1: ${playerOne.deckArray[i]} Player 2: ${playerTwo.deckArray[i]}`)
                if (playerOne.deckArray[i] > playerTwo.deckArray[i]){
                    playerOne.points += 1
                    console.log(`P1 Points: ${playerOne.points} P2 Points: ${playerTwo.points}`)
                } else if (playerOne.deckArray[i] < playerTwo.deckArray[i]){
                    playerTwo.points += 1
                    console.log(`P1 Points: ${playerOne.points} P2 Points: ${playerTwo.points}`)
                } 
            
               
        }  if (playerTwo.points > playerOne.points){
            alert("Congratulations Player 2, you are the winner!")
        } else if (playerTwo.points < playerOne.points){
            alert("Congratulations Player 1, you are the winner!")
        } else {
            alert("It was a tie!")
        }
        //Reset both arrays so HTML updates deck amount to 0
        playerOne.deckArray = [] 
        playerTwo.deckArray = []
        updateHTML(playerOne, playerTwo)
        this.speedRound = false
      } else {
        alert("This feature is unavailable during a Standard Game.")
        }

    }


}


class DeckHandler{
    constructor(masterDeck){
        this.masterDeck = masterDeck
    }
//I did not write method below, it was borrowed from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//This is used to randomize the deck before splitting it between P1 and P2. 
    randomizeDeck() {

        var currentIndex = this.masterDeck.length,  randomIndex;
    
        while (currentIndex != 0) {
      
          
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          
          [this.masterDeck[currentIndex], this.masterDeck[randomIndex]] = [
            this.masterDeck[randomIndex], this.masterDeck[currentIndex]];
        }    
    }   

}




class Player extends GameManager{
    constructor(deckAmount, points, deckArray){
        super()
        this.deckAmount = deckAmount
        this.points = points
        this.deckArray = deckArray
    }

    updateScoreP1(){
        this.deckAmount = this.deckArray.length
        gameManager.leftSidePoints = this.points
        gameManager.leftSideCards = this.deckAmount
    }

    updateScoreP2(){
        this.deckAmount = this.deckArray.length
        gameManager.rightSidePoints = this.points
        gameManager.rightSideCards = this.deckAmount      
    }

}


let gameManager = new GameManager()
let playerOne = new Player(0,0,[])
let playerTwo = new Player(0,0,[])
let deckHandler = new DeckHandler([1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13])




