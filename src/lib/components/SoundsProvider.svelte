<script lang="ts" context="module">
	export type Sound =
		| 'khzTone'
		| 'doorbell'
		| 'noise'
		| 'story-english'
		| 'story-swedish'
		| 'story-finnish'
		| 'announcer-english'
		| 'announcer-swedish'
		| 'announcer-finnish';

	export const IdlePromptSoundSprites = {
		DepartSoon: 'departSoon',
		Broken: 'broken',
		Experience: 'experience'
	};

	export const StorySoundSprites = {
		Start: 'start',
		Slap1: 'slap1',
		Slap2: 'slap2',
		Slap3: 'slap3',
		End: 'end'
	};
	export type SoundContext = {
		sound: (sound: Sound) => { howl: Howl; play: () => void; stop: () => void };
	};
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { base } from '$app/paths';
	import { Howl } from 'howler';

	const sounds = {
		khzTone: new Howl({ src: base + '/audio/1kHz.mp3', loop: true }),
		doorbell: new Howl({ src: base + '/audio/doorbell.mp3' }),
		noise: new Howl({ src: base + '/audio/pink_noise.mp3' }),
		'announcer-english': new Howl({
			src: base + '/audio/announce-english-normalized.mp3',
			sprite: {
				departSoon: [125, 5300],
				broken: [5544, 5200],
				experience: [10862, 3300]
			}
		}),
		'announcer-swedish': new Howl({
			src: base + '/audio/announce-swedish-normalized.mp3',
			sprite: {
				departSoon: [0, 5500],
				broken: [5700, 4800],
				experience: [10600, 3900]
			}
		}),
		'announcer-finnish': new Howl({
			src: base + '/audio/announce-finnish-normalized.mp3',
			sprite: {
				departSoon: [50, 5700],
				broken: [5930, 5800],
				experience: [11800, 3400]
			}
		}),
		'story-english': new Howl({
			src: base + '/audio/funi-english.mp3',
			sprite: {
				start: [0, 15_000],
				slap1: [16_000, 1674],
				slap2: [17_900, 1900],
				slap3: [20_400, 1850],
				end: [23_200, 38_800]
			}
		}),
		'story-finnish': new Howl({
			src: base + '/audio/funi-finnish.mp3',
			sprite: {
				start: [0, 11_200],
				slap1: [11_200, 1_150],
				slap2: [13_300, 1000],
				slap3: [16_100, 1_200],
				end: [19_130, 36_400]
			}
		}),
		'story-swedish': new Howl({
			src: base + '/audio/funi-swedish.mp3',
			sprite: {
				start: [0, 16_900],
				slap1: [17_300, 1_350],
				slap2: [19_400, 880],
				slap3: [21_250, 1_370],
				end: [24_000, 39_200]
			}
		})
	} satisfies Record<Sound, Howl>;

	let soundsLoaded: string[] = [];
	const totalSounds = Object.keys(sounds).length;
	Object.entries(sounds).forEach(([name, sound]) => {
		if (sound.state() === 'loaded') soundsLoaded = [...soundsLoaded, name];
		else sound.once('load', () => (soundsLoaded = [...soundsLoaded, name]));
	});

	Object.entries(sounds).forEach(([name, s]) => {
		s.on('play', () => console.log('PLAY', name));
	});

	setContext<SoundContext['sound']>('sound', (sound) => ({
		howl: sounds[sound],
		play: () => sounds[sound].play(),
		stop: () => sounds[sound].stop()
	}));

	onMount(() => {
		return () => {
			Howler.unload();
		};
	});
</script>

{#if soundsLoaded.length < totalSounds}
	...loading sounds ({soundsLoaded.length} / {totalSounds}: {soundsLoaded.join(', ')})
{:else}
	<slot />
{/if}
