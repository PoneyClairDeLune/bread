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
		for (let i = 0; i < source.length; i ++) {
			target[i + 1] = source[i] & 127;
			target[0] |= (source[i] >> 7) << i;
		};
	}, function (source, target) {
		let slider = source.length - 1;
		for (let i = 0; i < slider; i ++) {
			target[i] = source[i + 1] | (((source[0] >> i) & 1) << 7);
		};
	}]
}, {
	id: `ov43`,
	win: [3, 4],
	block: [function (source, target) {
		for (let i = 0; i < source.length; i ++) {
			target[i + 1] = source[i] & 63;
			target[0] |= (source[i] >> 6) << (i << 1);
		};
	}, function (source, target) {
		let slider = source.length - 1;
		for (let i = 0; i < slider; i ++) {
			target[i] = source[i + 1] | (((source[0] >> (i << 1)) & 3) << 6);
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
		let bvLsb = 0, bvMsb = 0;
		for (let i = 0; i < source.length; i ++) {
			if (i < 3) {
				bvLsb |= source[i] << (i << 3);
			} else {
				bvMsb |= source[i] << ((i - 3) << 3);
			};
		};
		blockVal = bvMsb * 16777216 + bvLsb;
		for (let i = 0; i < encodeLength; i ++) {
			target[i] = b64Forward[blockVal & 31];
			blockVal = Math.floor(blockVal / 32);
		};
	}, function (source, target) {
		let blockVal = 0, decodeLength = this.decodeLength(source.length);
		let bvLsb = 0, bvMsb = 0;
		for (let i = 0; i < source.length; i ++) {
			if (i < 4) {
				bvLsb |= b64Reverse[forceCase(source[i])] << (i * 5);
			} else if (i == 4) {
				bvLsb |= (b64Reverse[forceCase(source[i])] & 15) << 20;
				bvMsb |= b64Reverse[forceCase(source[i])] >> 4;
			} else {
				bvMsb |= b64Reverse[forceCase(source[i])] << ((i - 5) * 5 + 1);
			};
		};
		for (let i = 0; i < decodeLength; i ++) {
			if (i < 3) {
				target[i] = bvLsb & 255;
				bvLsb = bvLsb >> 8;
			} else {
				target[i] = bvMsb & 255;
				bvMsb = bvMsb >> 8;
			};
		};
	}]
}, {
	id: `qb16`,
	win: [1, 2],
	block: [function (source, target) {
		target[0] = b64Forward[source[0] & 15];
		target[1] = b64Forward[source[0] >> 4];
	}, function (source, target) {
		target[0] = b64Reverse[forceCase(source[1] || 0)] << 4 | b64Reverse[forceCase(source[0])];
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
}, {
	id: `qb128`,
	win: [7, 8],
	block: [function (source, target) {
		let slider = 0, end = source.length - 1;
		for (let i = 0; i < source.length; i ++) {
			slider |= source[i] << i;
			target[i] = slider & 127;
			slider = slider >> 7;
			if (i == end) {
				target[i + 1] = slider;
			};
		};
	}, function (source, target) {
		let slider = 0;
		for (let i = 0; i < source.length; i ++) {
			slider |= source[i] << [0, 7, 6, 5, 4, 3, 2, 1][i];
			if (i) {
				target[i - 1] = slider & 255;
				slider = slider >> 8;
			};
		};
	}]
}];

export default stockAlgorithms;
