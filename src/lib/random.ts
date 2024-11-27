let values: Uint32Array | undefined;
const MAX = 512;
let count = MAX;
const LARGEST = 0x100000000;

/** Get a random integer in range [min, max) */
export function getRandomInt(min: number, max: number) {
	min = Math.floor(min);
	max = Math.floor(max);

	const range = max - min + 1;
	return getRandom(range) + min;
}

/** Get a random integer in range [0, upper) */
export function getRandom(upper: number) {
	if (values == null || count === 0) {
		values = new Uint32Array(MAX);
		crypto.getRandomValues(values);
		count = MAX;
	}
	count -= 1;
	const rnd = values[count] / LARGEST;
	return Math.floor(upper * rnd);
}
