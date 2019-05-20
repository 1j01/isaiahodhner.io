const conjunct = function (array, conjunction) {
	if (array.length > 1) {
		const adjustedLength = Math.max(array.length, 1),
			most = array.slice(0, adjustedLength - 1),
			last = array[adjustedLength - 1];
		return `${most.join(", ")} ${conjunction} ${last}`;
	} else {
		return array[0];
	}
};

const log_divisibles = function (n, unit, ...more_info) {
	const nondivisibles = [];
	const divisibles = [];
	for (let i = 1; i <= 10; i++) {
		((n / i) === Math.floor(n / i) ? divisibles : nondivisibles).push(i);
	}
	if (typeof console === "undefined" || !console.log) {
		return;
	}
	console.log(`\
${n} ${unit}, \
divisible by ${conjunct(divisibles, "and")}, \
but not by ${conjunct(nondivisibles, "or")}\
`, ...more_info);
};

export default log_divisibles;
