/*
  Game.js
  Scripts for client-side javascript that makes an ajax call.
  Updated December 2021, Maria DeCesare
*/


//registers the startup function to be called when
//the DOM is finished loading.
$(main);


//startup registers the addButtonListeners function to be called
//when the element with id=button is clicked.
function main() {
  //reads user's name out of session storage and displays
  let userName = sessionStorage.getItem("currentUser");
    getRandomNumber();
  //register events
  $("#name").text(userName);
  $("#button").click(enterGuess);
  $("#playAgain").click(playAgain);
}

//get a random number
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let randomNumber = 0;
console.log("Random number: " + randomNumber);

//sends out request to server to get random number
function getRandomNumber() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", randomNumberRecieved)
    xhr.open("GET", "http://45.79.221.107:3100/random")
    xhr.send();
}

//recieves random number from server
function randomNumberRecieved() {
    let response = JSON.parse(this.response);
    console.log(response);
    randomNumber = response;
}

//declare global variables
var attempts = 0;
let guesses = [];

//define function for when enter button is clicked
function enterGuess() {
  console.log("enterGuess called")
  let guess = $("#number").val();
  //add guess value to guesses array
  guesses.push(guess);
  console.log("Guesses: " + guesses);
  $("#guess").html("Guesses: " + guesses);
  //store userobject in local storage
  let userObject = JSON.parse(localStorage.getItem($("#name").text()));
  console.log("Current user object: ", userObject);
    console.log("Current user name: ", userObject.userName);

  if(guess < 100 && guess > 0) {
    //if guess is correct
    if(guess == randomNumber) {
      attempts++;
      $("#guessResponse").html("Correct!");
      $("#number").attr("readonly", true);
      //add attempts to attempts each game array
      console.log(attempts);
      //update local storage object
      userObject.attemptsTotal = userObject.attemptsTotal + ", " + attempts;
      localStorage.setItem($("#name").text(), JSON.stringify(userObject));
    }
    //if guess is wrong - give hint and increase attempts count
    else if (guess > randomNumber) {
      $("#guessResponse").html("Too high");
      console.log("Too high");
      attempts++;
    }
    else {
      $("#guessResponse").html("Too low");
      console.log("Too low");
      attempts++;
    }
  }
  else {
    $("#guessResponse").html("Make sure your guess is in between 0 and 100");
  }
  //get attempts each game from user object
  let pastAttempts = userObject.attemptsTotal;
  console.log("Attempts: " + attempts);
  $("#attempts").html("Attempts: " + attempts);
  console.log("Current user object: ", userObject);
  $("#attemptsEachGame").html("Attempts each game: " + pastAttempts);
}

//define function for when play again button is clicked
function playAgain() {
  console.log("Play again called");
  //change attempts back to 0
  attempts = 0;
  $("#attempts").html("Attempts: " + attempts);
  //change guesses back to none
  guesses = [];
  $("#guess").html("Guesses: ");
  //get new random number
  randomNumber = getRandomInt(100)
  console.log("New random number: " + randomNumber);
  $("#number").val("");
  $("#number").attr("readonly", false);
}
