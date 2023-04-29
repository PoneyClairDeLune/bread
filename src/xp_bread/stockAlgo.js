"use strict";

let b64Basis = [65, 97, 48];

let stockAlgorithms = [{
	id: `korg87`,
	win: [7, 8],
	block: [function (source, target) {
		let overlay = 0;
		source.forEach(function (e, i) {
			target[i + 1] = e & 127;
			overlay |= (e >> 7) << i;
		});
		target[0] = overlay;
	}, function (source, target) {
		let overlay = source[0];
		source.subarray(1).forEach((e, i) => {
			target[i] = e | (((overlay >> i) & 1) << 7);
		})
	}]
}, {
	id: `qb64`,
	win: [3, 4],
	block: [function (source, target) {
		let blockVal = 0, encodeLength = this.encodeLength(source.length);
		source.forEach((e, i) => {
			blockVal |= e << (i << 3);
		});
		for (let i = 0; i < encodeLength; i ++) {
			let proxyCode = blockVal % 64 + 32;
			target[i] = b64Basis[Math.floor(proxyCode / 26)] + proxyCode % 26;
			blockVal = blockVal >> 6;
		};
	}, function (source, target) {
		let blockVal = 0, decodeLength = this.decodeLength(source.length);
		source.forEach((e, i) => {
			let proxyCode;
			if (e > 96) {
				proxyCode = 0;
			} else if (e > 64) {
				proxyCode = 26;
			} else if (e > 47) {
				proxyCode = 52;
			} else {
				// Invalid code point
				throw(new Error(`Invalid code point ${e}`));
			};
			proxyCode += e % 26;
			blockVal += (proxyCode - 32) * (64 ** i);
		});
		for (let i = 0; i < decodeLength; i ++) {
			target[i] = blockVal & 255;
			blockVal = blockVal >> 8;
		};
	}]
}];

export default stockAlgorithms;
