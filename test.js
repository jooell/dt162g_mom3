// Node JS REST webbjänst
// kör med node **namn**.js


// med http modul kan man skapa localhost med node
let http = require('http');

// Ladda svar
let server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello from node \n");

});

//Lyssna
server.listen(8080);

// initiera med "localhost:8080"



