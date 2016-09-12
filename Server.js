const net = require("net");
const EventEmitter = require("events");
const NodeRSA = require("node-rsa");
const debug = require("debug")("Server");

const emit = EventEmitter.prototype.emit;

class Socket extends EventEmitter {
	constructor(netSocket) {
		super();
		this.netSocket = netSocket;

		this.netSocket.on("close", () => {
			emit.call(this, "disconnect");
		});
	}

	emit() {
		this.netSocket.send(...arguments);
	}
}

module.exports = class Server extends EventEmitter {
	constructor(rsaOptions) {
		super();

		this.key = new NodeRSA(rsaOptions);
		this.publicKey = this.key.exportKey("pkcs1-public-key");
		this.sockets = [];

		this.server = net.createServer(netSocket => {
			const socket = new Socket(netSocket);
			this.sockets.push(socket);

			socket.on("disconnect", () => {
				this.sockets.splice(socket, 1);
			});

			emit.call(this, "connection", socket);
			emit.call(socket, "hi", "hi man!");
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
