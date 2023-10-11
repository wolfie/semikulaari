<script lang="ts">
	import noiseJpg from '$lib/images/noise.jpg';
	import { getContext, onMount } from 'svelte';
	import type { SoundContext } from '../SoundsProvider.svelte';

	let rotation = 0;
	const i = globalThis.setInterval(() => {
		rotation++;
		if (rotation >= 4) rotation = 0;
	}, 50);

	const noise = getContext<SoundContext['sound']>('sound')('noise');

	onMount(() => {
		noise.play();

		return () => {
			noise.stop();
			globalThis.clearInterval(i);
		};
	});
</script>

<div>
	<img
		src={noiseJpg}
		alt="White Noise"
		class:r1={rotation === 1}
		class:r2={rotation === 2}
		class:r3={rotation === 3}
	/>
</div>

<style lang="scss">
	div {
		position: fixed;
		top: 0;
		left: 0;

		img {
			transform-origin: center;
			&.r1 {
				scale: -1 1;
			}
			&.r2 {
				scale: 1 -1;
			}
			&.r3 {
				scale: -1;
			}
		}
	}
</style>
