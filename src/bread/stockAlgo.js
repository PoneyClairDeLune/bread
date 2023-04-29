"use strict";

/*
Template {
	id: String, // ID of the algorithm
	win: [enc, dec], // Operation window size
	init: [enc, dec], // Blueprint for persistent data per encoding session
	block: [enc, dec], // Functions to encode blocks
	len: [enc, dec], // If present, would override the length estimator
}
*/

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
}];

export default stockAlgorithms;
