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

console.error(`Generating random tests for ${Deno.args[0]}...`);
for (let count = 0; count < maxRuns; count ++) {
	let groundBuffer = new Uint8Array(groundLength);
	let proxyBuffer = new Uint8Array(proxyLength);
	crypto.getRandomValues(groundBuffer);
	groundPool[count] = groundBuffer;
	proxyPool[count] = proxyBuffer;
};
console.error(`Encoding with ${Deno.args[0]}...`);
let startTime = Date.now();
for (let count = 0; count < maxRuns; count ++) {
	algorithm.encodeBytes(groundPool[count], proxyPool[count]);
};
let endTime = Date.now();
let encTime = (endTime - startTime) / maxRuns;
console.error(`Costs ${encTime}ms per run (with overhead).`);
console.error(`Decoding with ${Deno.args[0]}...`);
startTime = Date.now();
for (let count = 0; count < maxRuns; count ++) {
	algorithm.decodeBytes(proxyPool[count], decodeSink);
};
endTime = Date.now();
let decTime = (endTime - startTime) / maxRuns;
console.error(`Costs ${decTime}ms per run (with overhead).`);
console.info(`${Deno.args[0]}	${encTime}	${decTime}`);
