<script lang="ts">
	import runTimeline from '$lib/runTimeline';
	import { getContext, onMount } from 'svelte';
	import bombJpg from '$lib/images/bomb.jpeg';
	import type { SoundContext } from '../SoundsProvider.svelte';
	import { PAD } from '$lib/configs';

	const tone = getContext<SoundContext['sound']>('sound')('khzTone');

	let blip = false;
	const setLed = (b: boolean) => () => {
		blip = b;

		if (b) tone.play();
		else tone.stop();
	};

	onMount(() => {
		const stopIntervalHandle = { current: (): void => undefined };
		const i = setInterval(
			() =>
				(stopIntervalHandle.current = runTimeline({
					start: setLed(true),
					100: setLed(false),
					200: setLed(true),
					300: setLed(false)
				})),
			1000
		);

		return () => {
			clearInterval(i);
			stopIntervalHandle.current();
			setLed(false);
			tone.stop();
		};
	});
</script>

<div class="root" class:ipad6={PAD === 'ipad6'}>
	<img src={bombJpg} alt="cockpit" />
	<div class="blip" class:visible={blip} />
</div>

<style lang="scss">
	.root {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(0deg, rgb(40, 40, 40) 0%, rgb(49, 49, 49) 100%);

		.blip {
			visibility: hidden;
			position: absolute;
			top: 370px;
			left: 540px;
			height: 100px;
			width: 100px;
			background: rgb(255, 0, 0);
			background: radial-gradient(circle, rgba(255, 0, 0, 1) 0%, rgba(228, 228, 228, 0) 75%);

			&.visible {
				visibility: visible;
			}
		}

		img {
			position: absolute;
			top: 0;
			left: 0;
			transform-origin: top left;
			transform: scale(0.95) translate(110px, -90px);
		}

		&.ipad6 {
			.blip {
				top: 335px;
				left: 490px;
				height: 80px;
				width: 80px;
			}

			img {
				transform: scale(0.85) translate(110px, -90px);
			}
		}
	}
</style>
