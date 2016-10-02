const net = require("net");
const EventEmitter = require("events");
const emit = EventEmitter.prototype.emit;

const Socket = require("./Socket.js");

class Server extends EventEmitter {
	constructor(rsaOptions) {
		super();

		this.sockets = [];

		this.server = net.createServer(netSocket => {
			const socket = new Socket(netSocket);
			this.sockets.push(socket);

			socket.on("disconnect", () => {
				this.sockets.splice(socket, 1);
			});

			emit.call(this, "connection", socket);
		});
	}

	listen(port) {
		this.server.listen(port);
	}

	emit() {
		this.sockets.forEach(socket => {
			socket.emit(...arguments);
		});
	}
};

module.exports = Server;
