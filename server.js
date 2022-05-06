/* server.js
 * This is our express server app running on the web server.
 * Created - December 2021 - Maria DeCesare
 */

 var express = require("express");
 var app = express();

app.use(express.static("public"))

 //Register an endpoint for a random number
 app.get("/random", getRandomNumber);

 //respond to the random number request
 //will send back a number between 1 and 100
 function getRandomNumber(request,response) {
   let answer = Math.floor(Math.random() * 100) + 1;
     console.log("Random Number ", answer);
   response.send(JSON.stringify(answer));
 }
 // Now that the server is set up, it is started on the
 // specified port number, in this case on port 3100
 app.listen(3100);
