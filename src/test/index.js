"use strict";

import {Loaf} from "../bread/index.mjs";

let isSame = function (a, b) {
	if (a.length != b.length) {
		return false;
	};
	let same = true;
	a.forEach((e, i) => {
		if (same && e != b[i]) {
			same = false;
		};
	});
	return same;
};

let algorithm = Loaf.use(Deno.args[0]);
let groundBuffer = new Uint8Array(0 || Math.floor(Math.random() * 3781) + 1260);
let proxyBuffer = new Uint8Array(algorithm.encodeLength(groundBuffer.length));
let targetBuffer = new Uint8Array(algorithm.decodeLength(proxyBuffer.length));

for (let count = 0; count < 16; count ++) {
	crypto.getRandomValues(groundBuffer);
	algorithm.encodeBytes(groundBuffer, proxyBuffer);
	algorithm.decodeBytes(proxyBuffer, targetBuffer);
	let passed = isSame(groundBuffer, targetBuffer);
	console.info(`Algo ${Deno.args[0]} Test #${count + 1} ${["fail", "pass"][+passed]}ed.`);
	if (!passed) {
		console.info(`Truth: ${groundBuffer.join(", ")}`);
		console.info(`Proxy: ${proxyBuffer.join(", ")}`);
		console.info(`Proof: ${targetBuffer.join(", ")}`);
	};
};
