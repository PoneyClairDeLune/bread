"use strict";

/*
Template {
	id: String, // ID of the algorithm
	win: [enc, dec], // Operation window size
	init: [enc, dec], // Blueprint for persistent data per encoding session
	block: [enc, dec], // Functions to encode/decode blocks
	pre: [enc, dec], // Before encoding/decoding
	post: [enc, dec], // After encoding/decoding
	len: [enc, dec], // If present, would override the length estimator
}
*/

import stockAlgorithms from "../xp_bread/stockAlgo.js";

stockAlgorithms.push({
	id: `qb36`,
	win: [9, 14],
	block: [function (source, target) {
		let blockVal = 0n, encodeLength = BigInt(this.encodeLength(source.length));
		source.forEach((e, i) => {
			blockVal |= BigInt(e) << (BigInt(i) << 3n);
		});
		for (let i = 0n; i < encodeLength; i ++) {
			target[i] = Number(blockVal % 36n + 32n);
			blockVal /= 36n;
		};
	}, function (source, target) {
		let blockVal = 0n, decodeLength = BigInt(this.decodeLength(source.length));
		source.forEach((e, i) => {
			blockVal += (BigInt(e) - 32n) * (36n ** BigInt(i));
		});
		for (let i = 0n; i < decodeLength; i ++) {
			target[i] = Number(blockVal & 255n);
			blockVal = blockVal >> 8n;
		};
	}]
});
stockAlgorithms.push({
	id: `qb85`,
	win: [4, 5],
	block: [function (source, target) {
		let blockVal = 0n, encodeLength = BigInt(this.encodeLength(source.length));
		source.forEach((e, i) => {
			blockVal |= BigInt(e) << (BigInt(i) << 3n);
		});
		for (let i = 0n; i < encodeLength; i ++) {
			target[i] = Number(blockVal % 85n + 36n);
			blockVal /= 85n;
		};
	}, function (source, target) {
		let blockVal = 0n, decodeLength = BigInt(this.decodeLength(source.length));
		source.forEach((e, i) => {
			blockVal += (BigInt(e) - 36n) * (85n ** BigInt(i));
		});
		for (let i = 0n; i < decodeLength; i ++) {
			target[i] = Number(blockVal & 255n);
			blockVal = blockVal >> 8n;
		};
	}]
});
stockAlgorithms.push({
	id: `qb94`,
	win: [9, 11],
	block: [function (source, target) {
		let blockVal = 0n, encodeLength = BigInt(this.encodeLength(source.length));
		source.forEach((e, i) => {
			blockVal |= BigInt(e) << (BigInt(i) << 3n);
		});
		for (let i = 0n; i < encodeLength; i ++) {
			target[i] = Number(blockVal % 94n + 32n);
			blockVal /= 94n;
		};
	}, function (source, target) {
		let blockVal = 0n, decodeLength = BigInt(this.decodeLength(source.length));
		source.forEach((e, i) => {
			blockVal += (BigInt(e) - 32n) * (94n ** BigInt(i));
		});
		for (let i = 0n; i < decodeLength; i ++) {
			target[i] = Number(blockVal & 255n);
			blockVal = blockVal >> 8n;
		};
	}]
});
stockAlgorithms.push({
	id: `qb95`,
	win: [9, 11],
	block: [function (source, target) {
		let blockVal = 0n, encodeLength = BigInt(this.encodeLength(source.length));
		source.forEach((e, i) => {
			blockVal |= BigInt(e) << (BigInt(i) << 3n);
		});
		for (let i = 0n; i < encodeLength; i ++) {
			target[i] = Number(blockVal % 95n + 32n);
			blockVal /= 95n;
		};
	}, function (source, target) {
		let blockVal = 0n, decodeLength = BigInt(this.decodeLength(source.length));
		source.forEach((e, i) => {
			blockVal += (BigInt(e) - 32n) * (95n ** BigInt(i));
		});
		for (let i = 0n; i < decodeLength; i ++) {
			target[i] = Number(blockVal & 255n);
			blockVal = blockVal >> 8n;
		};
	}]
});

export default stockAlgorithms;
