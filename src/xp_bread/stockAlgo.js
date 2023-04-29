"use strict";

let b64Forward = [
	48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 95
],
b64Reverse = {};
b64Forward.forEach(function (e, i) {
	b64Reverse[e] = i;
});

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
		source.forEach(function (e, i) {
			blockVal |= e << (i << 3);
		});
		for (let i = 0; i < encodeLength; i ++) {
			target[i] = b64Forward[blockVal & 63];
			blockVal = blockVal >> 6;
		};
	}, function (source, target) {
		let blockVal = 0, decodeLength = this.decodeLength(source.length);
		source.forEach(function (e, i) {
			blockVal |= b64Reverse[e] << (i * 6);
		});
		for (let i = 0; i < decodeLength; i ++) {
			target[i] = blockVal & 255;
			blockVal = blockVal >> 8;
		};
	}]
}, {
	id: `qb32`,
	win: [3, 4],
	block: [function (source, target) {
		let blockVal = 0, encodeLength = this.encodeLength(source.length);
		source.forEach(function (e, i) {
			blockVal |= e << (i * 5);
		});
		for (let i = 0; i < encodeLength; i ++) {
			target[i] = b64Forward[blockVal & 31];
			blockVal = blockVal >> 5;
		};
	}, function (source, target) {
		let blockVal = 0, decodeLength = this.decodeLength(source.length);
		source.forEach(function (e, i) {
			if (e > 64 && e < 96) {
				e |= 32;
			};
			blockVal += b64Reverse[e] << (i * 5);
		});
		for (let i = 0; i < decodeLength; i ++) {
			target[i] = blockVal & 255;
			blockVal = blockVal >> 8;
		};
	}]
}, {
	id: `qb16`,
	win: [1, 2],
	block: [function (source, target) {
		source.forEach(function (e, i) {
			let index = i << 1;
			target[index] = b64Forward[e & 15];
			target[index | 1] = b64Forward[e >> 4];
		});
	}, function (source, target) {
		source.forEach(function (e, i) {
			if (e > 64 && e < 96) {
				e |= 32;
			};
			target[i >> 1] |= b64Reverse[e] << (4 * (i & 1));
		});
	}]
}];

export default stockAlgorithms;
