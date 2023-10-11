<script lang="ts">
	import { browser } from '$app/environment';
	import {
		IDLE_GLITCH_ANIMATION_INTERVAL_FUZZYNESS_MS,
		IDLE_GLITCH_ANIMATION_INTERVAL_MS
	} from '$lib/configs';
	import runTimeline from '$lib/runTimeline';
	import { onMount } from 'svelte';

	let glitched = 0;
	$: if (browser) {
		document.body.classList.toggle('glitched-1', glitched === 1);
		document.body.classList.toggle('glitched-2', glitched === 2);
		document.body.classList.toggle('glitched-3', glitched === 3);
	}

	onMount(() => {
		let cancelTimeline: () => void = () => undefined;
		let timeout: NodeJS.Timeout;

		const scheduleGlitch = () => {
			timeout = setTimeout(() => {
				cancelTimeline = runTimeline({
					start: () => (glitched = 1),
					150: () => (glitched = 2),
					200: () => (glitched = 3),
					300: () => (glitched = 2),
					600: () => (glitched = 0)
				});
				scheduleGlitch();
			}, IDLE_GLITCH_ANIMATION_INTERVAL_MS + Math.random() * IDLE_GLITCH_ANIMATION_INTERVAL_FUZZYNESS_MS);
		};
		scheduleGlitch();

		return () => {
			clearInterval(timeout);
			cancelTimeline();
			document.body.classList.remove('glitched-1');
			document.body.classList.remove('glitched-2');
			document.body.classList.remove('glitched-3');
		};
	});
</script>

{#if glitched}
	<div class="glitch" />
{/if}

<style lang="scss">
	.glitch {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		backdrop-filter: blur(2px);
	}

	:global(body.glitched-1) {
		transform: translate(var(--glitch-x), var(--glitch-y)) scale(1.1) rotate(-1.2deg);
		--background-color: red;
	}
	:global(body.glitched-2) {
		transform: scale(4, 0.8);
	}
	:global(body.glitched-3) {
		transform: scale(0.5, 1.2);
	}
</style>
