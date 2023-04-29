"use strict";

// Syntax in this file would be conservative to minimize headaches for legacy porting

import {typeCheck} from "./typeSec.mjs";
import {
	toByteArray,
	windowMove
} from "./utils.mjs";
import stockAlgos from "./stockAlgo.js";

let Breadcrumb = class Breadcrumb {
	#template;
	#name;
	#chunkSizeEnc;
	#chunkSizeDec;
	options = {};
	get name() {
		return this.#name;
	};
	get template() {
		return this.#template;
	};
	encodeLength(length, raw) {
		typeCheck(length, Number);
		if (this.#template?.len) {
			return this.#template?.len[0](length, raw);
		};
		return Math.ceil(length * this.#chunkSizeDec / this.#chunkSizeEnc);
	};
	decodeLength(length, raw) {
		typeCheck(length, Number);
		if (this.#template?.len) {
			return this.#template?.len[1](length, raw);
		};
		return Math.floor(length * this.#chunkSizeEnc / this.#chunkSizeDec);
	};
	encodeBytes(source, target) {
		typeCheck(source, Uint8Array);
		typeCheck(target, Uint8Array);
		if (target.length < this.encodeLength(source.length, source)) {
			throw(new Error(`Target isn't sufficient for encoding`));
		};
		target.fill(0);
		let upThis = this, session = JSON.parse(JSON.stringify(this.#template.init && this.#template.init[0] || "null"));
		windowMove(source, this.#chunkSizeEnc, target, this.#chunkSizeDec, function (s, t) {
			upThis.#template?.block[0]?.call(upThis, s, t, session);
		});
	};
	decodeBytes(source, target) {
		typeCheck(source, Uint8Array);
		typeCheck(target, Uint8Array);
		if (target.length < this.decodeLength(source.length, source)) {
			throw(new Error(`Target isn't sufficient for decoding`));
		};
		target.fill(0);
		let upThis = this, session = JSON.parse(JSON.stringify(this.#template.init && this.#template.init[1] || "null"));;
		windowMove(source, this.#chunkSizeDec, target, this.#chunkSizeEnc, function (s, t) {
			upThis.#template?.block[1]?.call(upThis, s, t, session);
		});
	};
	constructor(template, opt) {
		if (!template?.id) {
			throw(new Error(`Invalid algorithm ID`));
		};
		if (template?.block.length != 2) {
			throw(new Error(`Invalid codec`));
		};
		this.#name = template.name;
		this.#template = template;
		this.#chunkSizeEnc = template.win[0];
		this.#chunkSizeDec = template.win[1];
		this.options = opt || this.options;
	};
};

let Bread = class Bread {
	#algo = {};
	setAlgo(template) {
		if (!template?.id) {
			throw(new Error(`Invalid algorithm ID`));
		};
		this.#algo[template.id] = template;
	};
	delAlgo(id) {
		if (this.#algo[id]) {
			delete this.#algo[id];
		};
	};
	use(id, opt) {
		return new Breadcrumb(this.#algo[id], opt);
	};
	constructor(algos) {
		typeCheck(algos, Array, true);
		let upThis = this;
		algos?.forEach(function (e) {
			upThis.setAlgo(e);
		});
	};
};

let Loaf = new Bread(stockAlgos);

export {
	Bread,
	Loaf
};
