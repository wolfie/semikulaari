<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import '@fontsource/vt323';
	import type { I18nContext } from './I18nProvider.svelte';
	import { GURU_MEDITATION_SCREEN_TIMEOUT_MS } from '$lib/configs';

	export let clickToFix = false;

	const dispatch = createEventDispatcher<{ fixed: void; timeout: void }>();
	const t = getContext<I18nContext['t']>('t');

	let secondsSinceMount = 0;
	onMount(() => {
		secondsSinceMount = 0;
	});

	let blinkBorder = true;
	onMount(() => {
		const i = setInterval(() => (blinkBorder = !blinkBorder), 600);
		return () => {
			clearInterval(i);
		};
	});

	onMount(() => {
		const t = setTimeout(() => {
			dispatch('timeout');
		}, GURU_MEDITATION_SCREEN_TIMEOUT_MS);
		return () => {
			clearTimeout(t);
		};
	});
</script>

<div class="broken">
	<div class="message" class:blinkBorder>
		{$t('guruMeditation')}
	</div>
	<div class="bottomBar" />
</div>
<svelte:window
	on:pointerdown={() => clickToFix && dispatch('fixed')}
	on:devicemotion={(e) => {
		/* looks like ios or safari immediately replays the last event on mount,
		 so we need to flush the garbage out and wait for actual data to start coming through
		*/
		secondsSinceMount += e.interval;
		if (secondsSinceMount < 0.1) return;

		const sum = e.acceleration
			? Math.abs(e.acceleration.x ?? 0) +
			  Math.abs(e.acceleration.y ?? 0) +
			  Math.abs(e.acceleration.z ?? 0)
			: 0;

		if (sum * e.interval > 0.1) {
			dispatch('fixed');
		}
	}}
/>

<style lang="scss">
	.broken {
		position: fixed;
		opacity: 1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: black;

		display: flex;
		justify-content: center;
		align-items: center;
		color: white;

		.message {
			transform: rotate(-2deg);
			font-size: 30pt;
			white-space: pre;
			text-align: center;
			font-family: 'VT323', monospace;
			padding: 0 20px 10px 20px;
			color: red;

			&.blinkBorder {
				border: 10px solid red;
			}
		}

		.bottomBar {
			background-color: var(--background-color);
			position: fixed;
			height: 20px;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
