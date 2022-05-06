/*
  landing.js
  Scripts for landing
  Updated December 2021, Maria DeCesare
*/

$(main)

function main(){
  $("#pushme").click(recordName);
}

function recordName() {
  //get username and put in session storage
  let userName = $("#name").val();
  sessionStorage.setItem("currentUser", userName);
  console.log("user name is " + userName);

  //declare array to put the users into
  let users = {
      userName: userName,
      attemptsTotal: "0"
    }

  console.log(JSON.stringify(users));
  //check to see if username is already in local sessionStorage
  //if it isn't in local storage
  if(localStorage.getItem(users.userName) == null) {
    console.log("No Item found in local storage. Saving to session storage");
    localStorage.setItem(userName, JSON.stringify(users));

  }
}
