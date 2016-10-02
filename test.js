const crypt = require("./");

const server = new crypt.Server();

server.on("connection", socket => {
	socket.on("message", message => {
		console.log(message);

		socket.emit("message", "hi client!");
	});
});

server.listen(3000);

const socket = new crypt.Socket({ port: 3001 });

socket.emit("message", "hi server!");

socket.on("message", message => console.log(message));
