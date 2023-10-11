const runTimeline = (timeline: Record<number, () => void> & { start: () => void }) => {
	timeline.start();
	const sortedKeys = Object.keys(timeline)
		.filter((key) => key !== 'start')
		.map((key) => parseFloat(key))
		.sort();
	const timeouts = sortedKeys.map((key) => setTimeout(timeline[key], key));

	return () => timeouts.forEach((timeout) => clearTimeout(timeout));
};

export default runTimeline;
