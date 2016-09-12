const Server = require("./Server.js");
const Client = require("./Client.js");

const server = new Server({b: 512});

server.on("connection", (socket) => {
	server.emit("new socket!");
});

const socket = new Client();

const d = socket.key.encrypt("hiiii!");
console.log(d);
console.log(socket.key.decrypt(d));

console.log(socket);

//server.listen(3000);
