"use strict";

import {typeCheck} from "./typeSec.mjs";

let toByteArray = function (buffer) {
	let byteArr;
	switch (buffer?.constructor) {
		case Uint8Array: {
			byteArr = buffer;
			break;
		};
		case Int8Array:
		case Uint8ClampedArray:
		case Int16Array:
		case Uint16Array:
		case Int32Array:
		case Uint32Array:
		case Float32Array:
		case BigInt64Array:
		case BigUint64Array:
		case Float64Array: {
			byteArr = new Uint8Array(buffer.buffer, buffer.buffer.byteOffset, buffer.buffer.byteLength);
		};
		default: {
			throw(new TypeError(`Unaccepted type for conversion`));
		};
	};
	return byteArr;
};
let windowMove = function (inBuf, inBufWin = 1, outBuf, outBufWin = 1, callback) {
	typeCheck(inBuf, Uint8Array);
	typeCheck(outBuf, Uint8Array);
	typeCheck(inBufWin, Number);
	typeCheck(outBufWin, Number);
	for (let inPtr = 0, outPtr = 0; inPtr < inBuf.length; inPtr += inBufWin, outPtr += outBufWin) {
		callback(inBuf.subarray(inPtr, inPtr + inBufWin), outBuf.subarray(outPtr, outPtr + outBufWin));
	};
};

export {
	toByteArray,
	windowMove
};
