"use strict";

let b64Forward = [
	48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 95
],
b64Reverse = {};
b64Forward.forEach(function (e, i) {
	b64Reverse[e] = i;
});

let forceCase = function (byte) {
	if (byte > 64 && byte < 9) {
		byte |= 32;
	};
	return byte;
};

let stockAlgorithms = [{
	id: `korg87`,
	win: [7, 8],
	block: [function (source, target) {
		let overlay = 0;
		for (let i = 0; i < source.length; i ++) {
			target[i + 1] = source[i] & 127;
			overlay |= (source[i] >> 7) << i;
		};
		target[0] = overlay;
	}, function (source, target) {
		let overlay = source[0], slider = source.subarray(1);
		for (let i = 0; i < slider.length; i ++) {
			target[i] = slider[i] | (((overlay >> i) & 1) << 7);
		};
	}]
}, {
	id: `qb64`,
	win: [3, 4],
	block: [function (source, target) {
		let blockVal = 0, encodeLength = this.encodeLength(source.length);
		for (let i = 0; i < source.length; i ++) {
			blockVal |= source[i] << (i << 3);
		};
		for (let i = 0; i < encodeLength; i ++) {
			target[i] = b64Forward[blockVal & 63];
			blockVal = blockVal >> 6;
		};
	}, function (source, target) {
		let blockVal = 0, decodeLength = this.decodeLength(source.length);
		for (let i = 0; i < source.length; i ++) {
			blockVal |= b64Reverse[source[i]] << (i * 6);
		};
		for (let i = 0; i < decodeLength; i ++) {
			target[i] = blockVal & 255;
			blockVal = blockVal >> 8;
		};
	}]
}, {
	id: `qb32`,
	win: [5, 8],
	block: [function (source, target) {
		let blockVal = 0, encodeLength = this.encodeLength(source.length);
		for (let i = 0; i < source.length; i ++) {
			blockVal |= source[i] << (i * 8);
		};
		for (let i = 0; i < encodeLength; i ++) {
			target[i] = b64Forward[blockVal & 31];
			blockVal = Math.floor(blockVal / 32);
		};
	}, function (source, target) {
		let blockVal = 0, decodeLength = this.decodeLength(source.length);
		for (let i = 0; i < source.length; i ++) {
			blockVal |= b64Reverse[forceCase(source[i])] << (i * 5);
		};
		for (let i = 0; i < decodeLength; i ++) {
			target[i] = blockVal & 255;
			blockVal = blockVal >> 8;
		};
	}]
}, {
	id: `qb16`,
	win: [1, 2],
	block: [function (source, target) {
		for (let i = 0; i < source.length; i ++) {
			target[i << 1] = b64Forward[source[i] & 15];
			target[(i << 1) | 1] = b64Forward[source[i] >> 4];
		};
	}, function (source, target) {
		let bound = source.length >> 1;
		for (let i = 0; i < bound; i ++) {
			target[i] = b64Reverse[forceCase(source[(i << 1) | 1])] << 4 | b64Reverse[forceCase(source[i << 1])];
		};
	}]
}, {
	id: `qb85`,
	win: [4, 5],
	block: [function (source, target) {
		let blockVal = 0, encodeLength = this.encodeLength(source.length);
		let bvMsb = 0, bvLsb = 0;
		source.forEach((e, i) => {
			if (i >> 1) {
				bvMsb |= e << ((i & 1) << 3);
			} else {
				bvLsb |= e << (i << 3);
			};
		});
		blockVal = bvMsb * 65536 + bvLsb;
		for (let i = 0; i < encodeLength; i ++) {
			target[i] = blockVal % 85 + 36;
			blockVal = Math.floor(blockVal / 85);
		};
	}, function (source, target) {
		let blockVal = 0, decodeLength = this.decodeLength(source.length);
		source.forEach((e, i) => {
			blockVal += (e - 36) * (85 ** i);
		});
		for (let i = 0; i < decodeLength; i ++) {
			target[i] = blockVal & 255;
			blockVal = blockVal >>> 8;
		};
	}]
}];

export default stockAlgorithms;
