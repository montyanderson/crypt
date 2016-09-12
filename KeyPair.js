const NodeRSA = require("node-rsa");

const keys = new WeakMap();

module.exports = class KeyPair {
	constructor() {
		keys.set(this, new NodeRSA({b: 2048}));
	}

	encrypt(text) {
		return keys.get(this).encrypt(text, "base64");
	}

	decrypt(base64) {
		return keys.get(this).decrypt(base64, "utf8");
	}
}
