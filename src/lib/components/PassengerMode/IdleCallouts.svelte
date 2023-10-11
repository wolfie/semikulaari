<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { SoundContext } from '../SoundsProvider.svelte';
	import { IDLE_AUDIO_CALLOUT_INTERVAL_MS } from '$lib/configs';

	const sound = getContext<SoundContext['sound']>('sound');

	onMount(() => {
		let stopSound: () => void = () => undefined;
		const calloutInterval = setInterval(() => {
			stopSound();
			const randomAnnouncer = (
				['announcer-english', 'announcer-finnish', 'announcer-swedish'] as const
			)[Math.floor(Math.random() * 3)];
			const randomSoundSprite = ['departSoon', 'broken', 'experience'][
				Math.floor(Math.random() * 3)
			];
			const s = sound(randomAnnouncer);
			const soundId = s.howl.play(randomSoundSprite);
			stopSound = () => s.howl.stop(soundId);
		}, IDLE_AUDIO_CALLOUT_INTERVAL_MS);

		return () => {
			clearInterval(calloutInterval);
			stopSound();
		};
	});
</script>
