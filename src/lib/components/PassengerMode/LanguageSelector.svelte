<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import TurkuVaakuna from '$lib/images/Turku.vaakuna.svg';
	import type { I18nContext } from '../I18nProvider.svelte';
	import { LANGUAGE_SWITCH_PAUSE_ON_INTERACTION_MS, LANGUAGE_SWITCH_TIME_MS } from '$lib/configs';

	export let paused: boolean;

	const lang = getContext<I18nContext['language']>('language');
	const nextLang = getContext<I18nContext['nextLanguage']>('nextLanguage');
	const t = getContext<I18nContext['t']>('t');

	let timerProgress = 0;
	let running = true;

	onMount(() => {
		let timeLeft = LANGUAGE_SWITCH_TIME_MS;
		let prevTickTime = performance.now();
		let touchPaused = false;

		lang.subscribe(() => (timeLeft = LANGUAGE_SWITCH_TIME_MS));

		const updateLanguageTimer = () => {
			const now = performance.now();
			const delta = now - prevTickTime;
			prevTickTime = now;
			timerProgress = 1 - timeLeft / LANGUAGE_SWITCH_TIME_MS;

			if (!paused && !touchPaused) timeLeft -= delta;
			if (timeLeft < 0) $lang = $nextLang;

			if (running) requestAnimationFrame(updateLanguageTimer);
		};
		updateLanguageTimer();

		let timeout: NodeJS.Timeout | undefined;
		const pauseOnTouch = () => {
			touchPaused = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				touchPaused = false;
			}, LANGUAGE_SWITCH_PAUSE_ON_INTERACTION_MS);
		};
		document.addEventListener('pointerdown', pauseOnTouch);

		return () => {
			running = false;
			document.removeEventListener('pointerdown', pauseOnTouch);
		};
	});
</script>

<div class="lang">
	<div class="container" class:highlight={$lang === 'finnish'}>
		<button on:click={() => ($lang = 'finnish')}><span class="flag">🇫🇮</span> {$t('fin')}</button>
		<div
			class="progress"
			style:width={`${(1 - timerProgress) * 100}%`}
			class:hidden={$lang !== 'finnish'}
		/>
	</div>
	<div class="container" class:highlight={$lang === 'swedish'}>
		<button on:click={() => ($lang = 'swedish')}><span class="flag">🇸🇪</span> {$t('swe')}</button>
		<div
			class="progress"
			style:width={`${(1 - timerProgress) * 100}%`}
			class:hidden={$lang !== 'swedish'}
		/>
	</div>
	<div class="container" class:highlight={$lang === 'english'}>
		<button on:click={() => ($lang = 'english')}><span class="flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span> {$t('eng')}</button>
		<div
			class="progress"
			style:width={`${(1 - timerProgress) * 100}%`}
			class:hidden={$lang !== 'english'}
		/>
	</div>
	<div class="container" class:highlight={$lang === 'turku'}>
		<button on:click={() => ($lang = 'turku')}
			><img
				src={TurkuVaakuna}
				alt="Turku vaakuna"
				style:height="18px"
				style:filter="drop-shadow(0 0 1px black)"
			/>
			{$t('tku')}</button
		>
		<div
			class="progress"
			style:width={`${(1 - timerProgress) * 100}%`}
			class:hidden={$lang !== 'turku'}
		/>
	</div>
</div>

<style lang="scss">
	.lang {
		display: flex;

		--progress-height: 5px;

		.container {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			overflow: hidden;

			background-color: black;
			button {
				color: white;
			}

			&.highlight {
				background-color: rgba(123, 146, 175, 0.5);
				button {
					color: black;
				}
			}

			.progress {
				height: var(--progress-height);
				background-color: rgba(123, 146, 175, 1);

				&.hidden {
					display: none;
				}
			}

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 5px;
				font-weight: bold;
				font-size: larger;
				background: transparent;
				border: 0;
				margin-bottom: -5px;

				width: 120px;
				height: 50px;
			}

			button .flag {
				text-shadow: 0 0 1px black;
			}

			--border-radius-width: 5px;
			&:first-of-type {
				border-radius: var(--border-radius-width) 0 0 var(--border-radius-width);
			}
			&:last-of-type {
				border-radius: 0 var(--border-radius-width) var(--border-radius-width) 0;
			}
		}
	}
</style>
