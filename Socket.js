const net = require("net");
const EventEmitter = require("events");
const emit = EventEmitter.prototype.emit;

class Socket extends EventEmitter {
	constructor(a, role) {
		super();

		if(a instanceof net.Socket) {
			this.netSocket = a;
		} else {
			this.netSocket = net.connect(a);
		}

		this.netSocket.on("close", () => {
			emit.call(this, "disconnect");
		});

		this.netSocket.on("data", data => {
			const { method, params } = JSON.parse(data);
			emit.call(this, method, params);
		});
	}

	emit(method, params) {
		this.netSocket.write(JSON.stringify({ method, params }));
	}
};

module.exports = Socket;
