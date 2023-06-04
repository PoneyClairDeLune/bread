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
let groundBuffer = new Uint8Array(Math.floor(Math.random() * 3781) + 1260);
let proxyBuffer = new Uint8Array(algorithm.encodeLength(groundBuffer.length));
let targetBuffer = new Uint8Array(algorithm.decodeLength(proxyBuffer.length));

let resume = true,
count = 0;
while (resume && count < 16) {
	crypto.getRandomValues(groundBuffer);
	algorithm.encodeBytes(groundBuffer, proxyBuffer);
	algorithm.decodeBytes(proxyBuffer, targetBuffer);
	resume = isSame(groundBuffer, targetBuffer);
	console.info(`Algo ${Deno.args[0]} Test #${count + 1} ${["fail", "pass"][+resume]}ed.`);
	if (!resume) {
		let gt = [], pt = [], tt = [];
		groundBuffer.subarray(0, 32).forEach((e) => {
			gt.push(e.toString(2).padStart(8, "0"));
		});
		proxyBuffer.subarray(0, 32).forEach((e) => {
			pt.push(e.toString(2).padStart(8, "0"));
		});
		targetBuffer.subarray(0, 32).forEach((e) => {
			tt.push(e.toString(2).padStart(8, "0"));
		});
		console.info(`Truth: ${gt.join(" ")}...`);
		console.info(`Proxy: ${pt.join(" ")}...`);
		console.info(`Proof: ${tt.join(" ")}...`);
	};
	count ++;
};
