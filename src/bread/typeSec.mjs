"use strict";

let typeCheck = function (variable, type, nullable = false) {
	if (!type) {
		if (!nullable) {
			throw(new TypeError(`Type is not defined`));
		} else if (!(variable === null || variable === undefined)) {
			throw(new TypeError(`Value is not a null value`));
		};
	};
	if (variable?.constructor) {
		if (variable.constructor != type) {
			throw(new TypeError(`Value is not type ${type.name}`));
		};
	} else {
		if (!nullable) {
			throw(new TypeError(`Value is not nullable`));
		};
	};
};

export {
	typeCheck
};
