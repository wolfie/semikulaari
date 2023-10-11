<script lang="ts">
	import BrokenOverlay from '$lib/components/BrokenOverlay.svelte';
	import PassengerMode from '$lib/components/PassengerMode/PassengerMode.svelte';
	import { getContext, onMount } from 'svelte';
	import { StorySoundSprites, type SoundContext } from '$lib/components/SoundsProvider.svelte';
	import type { MotionPermissionContext } from '$lib/components/MotionPermissionProvider.svelte';
	import type { I18nContext, Language } from '$lib/components/I18nProvider.svelte';
	import { SLAP_PROMPT_WAIT_TIME_MS } from '$lib/configs';
	import Timeout from '$lib/components/Timeout.svelte';
	import Bomb from '$lib/components/Call/Bomb.svelte';
	import Car from '$lib/components/Call/Car.svelte';
	import Cctv from '$lib/components/Call/Cctv.svelte';
	import Cockpit from '$lib/components/Call/Cockpit.svelte';
	import Elevator from '$lib/components/Call/Elevator.svelte';
	import Scifi from '$lib/components/Call/Scifi.svelte';
	import ShowAfterNoise from '$lib/components/ShowAfterNoise.svelte';

	const AUDIO_TIMING_MARKS: Record<Language, number[]> = {
		finnish: [8600, 8000, 6800],
		turku: [8600, 8000, 6800],
		english: [11000, 7200, 8000],
		swedish: [12800, 7800, 8400]
	};

	const motionPermissionResult =
		getContext<MotionPermissionContext['motionPermissionResult']>('motionPermissionResult');

	const sound = getContext<SoundContext['sound']>('sound');
	const language = getContext<I18nContext['language']>('language');
	const getHowl = () =>
		sound(
			$language === 'english'
				? 'story-english'
				: $language === 'swedish'
				? 'story-swedish'
				: 'story-finnish'
		).howl;

	let stage:
		| 'waitForCall'
		| 'preGlitch'
		| 'glitch'
		| 'postGlitch'
		| 'bomb'
		| 'car'
		| 'cctv'
		| 'cockpit'
		| 'elevator'
		| 'scifi'
		| 'postCall' = 'waitForCall';

	let slapPrompt = 0;
	let timeout: NodeJS.Timeout;
	const queueSlapPrompt = () => {
		timeout = setTimeout(() => {
			console.log({ stage });
			if (stage !== 'glitch') return;

			const sprites = [StorySoundSprites.Slap1, StorySoundSprites.Slap2, StorySoundSprites.Slap3];
			getHowl().stop().play(sprites[slapPrompt++]);
			if (slapPrompt >= 3) slapPrompt = 0;

			queueSlapPrompt();
		}, SLAP_PROMPT_WAIT_TIME_MS);
	};

	onMount(() => {
		return () => clearTimeout(timeout);
	});
</script>

{#if stage === 'waitForCall'}
	<PassengerMode
		waitingForCall={true}
		onDone={() => {
			stage = 'preGlitch';
			getHowl().stop().play(StorySoundSprites.Start);
			getHowl().once('end', () => queueSlapPrompt());
			setTimeout(() => (stage = 'glitch'), AUDIO_TIMING_MARKS[$language][0]);
		}}
	/>
{:else if stage === 'preGlitch'}
	<PassengerMode waitingForCall={false} />
{:else if stage === 'glitch'}
	<BrokenOverlay
		clickToFix={$motionPermissionResult === 'skipped'}
		on:fixed={() => {
			stage = 'postGlitch';
			getHowl().stop().play(StorySoundSprites.End);
			getHowl().once('end', () => (stage = 'waitForCall'));
		}}
		on:timeout={() => (stage = 'waitForCall')}
	/>
{:else if stage === 'postGlitch'}
	<Timeout time={AUDIO_TIMING_MARKS[$language][1]} on:afterTimeout={() => (stage = 'bomb')}>
		<PassengerMode waitingForCall={false} />
	</Timeout>
{:else if stage === 'bomb'}
	<Timeout time={AUDIO_TIMING_MARKS[$language][2]} on:afterTimeout={() => (stage = 'car')}>
		<ShowAfterNoise>
			<Bomb />
		</ShowAfterNoise>
	</Timeout>
{:else if stage === 'car'}
	<Timeout time={1000} on:afterTimeout={() => (stage = 'cctv')}>
		<ShowAfterNoise>
			<Car />
		</ShowAfterNoise>
	</Timeout>
{:else if stage === 'cctv'}
	<Timeout time={1000} on:afterTimeout={() => (stage = 'cockpit')}>
		<ShowAfterNoise>
			<Cctv />
		</ShowAfterNoise>
	</Timeout>
{:else if stage === 'cockpit'}
	<Timeout time={1000} on:afterTimeout={() => (stage = 'elevator')}>
		<ShowAfterNoise>
			<Cockpit />
		</ShowAfterNoise>
	</Timeout>
{:else if stage === 'elevator'}
	<Timeout time={1000} on:afterTimeout={() => (stage = 'scifi')}>
		<ShowAfterNoise>
			<Elevator />
		</ShowAfterNoise>
	</Timeout>
{:else if stage === 'scifi'}
	<Timeout time={1000} on:afterTimeout={() => (stage = 'postCall')}>
		<ShowAfterNoise>
			<Scifi />
		</ShowAfterNoise>
	</Timeout>
{:else if stage === 'postCall'}
	<ShowAfterNoise>
		<PassengerMode waitingForCall={false} />
	</ShowAfterNoise>
{/if}
