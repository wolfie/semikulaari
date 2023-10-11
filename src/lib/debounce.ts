// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => void>(fn: T): T => {
	let nextInvocation = 0;

	const debouncedFn = (...args: Parameters<T>) => {
		const now = Date.now();
		if (now >= nextInvocation) {
			nextInvocation = now + 250;
			fn(...args);
		}
	};

	return debouncedFn as T;
};

export default debounce;
