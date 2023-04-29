"use strict";

import {Loaf} from "../bread/index.mjs";

const maxRuns = 10000;

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

let algorithm = Loaf.use(Deno.args[0], {noInit: true});
let groundLength = 2520;
let groundPool = [];
let proxyLength = algorithm.encodeLength(groundLength);
let proxyPool = [];
let decodeSink = new Uint8Array(groundLength);

console.info(`Generating random tests for ${Deno.args[0]}...`);
for (let count = 0; count < maxRuns; count ++) {
	let groundBuffer = new Uint8Array(groundLength);
	let proxyBuffer = new Uint8Array(proxyLength);
	crypto.getRandomValues(groundBuffer);
	groundPool[count] = groundBuffer;
	proxyPool[count] = proxyBuffer;
};
console.info(`Encoding with ${Deno.args[0]}...`);
let startTime = Date.now();
for (let count = 0; count < maxRuns; count ++) {
	algorithm.encodeBytes(groundPool[count], proxyPool[count]);
};
let endTime = Date.now();
console.info(`Costs ${(endTime - startTime) / maxRuns}ms per run (with overhead).`);
console.info(`Decoding with ${Deno.args[0]}...`);
startTime = Date.now();
for (let count = 0; count < maxRuns; count ++) {
	algorithm.decodeBytes(proxyPool[count], decodeSink);
};
endTime = Date.now();
console.info(`Costs ${(endTime - startTime) / maxRuns}ms per run (with overhead).`);
