<script lang="ts">
	import upSolid from '@iconify/icons-teenyicons/up-solid';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { SoundContext } from '../SoundsProvider.svelte';

	const dispatch = createEventDispatcher<{ end: void }>();

	const sound = getContext<SoundContext['sound']>('sound')('doorbell');

	onMount(() => {
		const dispatchEnd = () => dispatch('end');
		sound.howl.on('end', dispatchEnd);
		return () => sound.howl.off('end', dispatchEnd);
	});
</script>

<div
	class="buttonBg"
	on:pointerdown={(e) => {
		e.currentTarget.classList.add('pressed');
		sound.stop();
		sound.play();
	}}
	on:pointerup={(e) => e.currentTarget.classList.remove('pressed')}
>
	<div class="buttonFg"><Icon icon={upSolid} /></div>
</div>

<style lang="scss">
	.buttonBg {
		background-color: rgba(123, 146, 175, 0.5);
		height: 10em;
		width: 10em;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

		:is(&.pressed) {
			background-color: black;

			.buttonFg {
				background-color: grey;
				color: white;
			}
		}

		.buttonFg {
			background-color: white;
			height: 60%;
			width: 60%;
			border-radius: 50%;
			border: 1px solid rgba(black, 0.5);

			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 50pt;
		}
	}
</style>
