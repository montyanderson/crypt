const net = require("net");
const EventEmitter = require("events");

const KeyPair = require("./KeyPair.js");

const emit = EventEmitter.prototype.emit;

module.exports = class Client extends EventEmitter {
	constructor() {
		super();

		this.key = new KeyPair();
	}
}
