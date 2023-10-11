<script lang="ts">
	import Icon from '@iconify/svelte';
	import humanWalk from '@iconify/icons-mdi/human-walk';
	import { getContext } from 'svelte';
	import ReaktorWordmarkBlack from '$lib/images/Reaktor_Wordmark_Black.svg';
	import menuIcon from '@iconify/icons-ion/menu';
	import personIcon from '@iconify/icons-ion/person';
	import desktopOutline from '@iconify/icons-ion/desktop-outline';
	import leftSolid from '@iconify/icons-teenyicons/left-solid';
	import rightSolid from '@iconify/icons-teenyicons/right-solid';
	import homeSolid from '@iconify/icons-teenyicons/home-solid';
	import GlitchOverlay from './GlitchOverlay.svelte';
	import Button from './Button.svelte';
	import LanguageSelector from './LanguageSelector.svelte';
	import OutboundCallOverlay from './OutboundCallOverlay.svelte';
	import type { I18nContext } from '../I18nProvider.svelte';
	import IdleCallouts from './IdleCallouts.svelte';
	import { STOP_IDLE } from '$lib/configs';
	import logo from '$lib/images/logo.png';

	export let waitingForCall: boolean;
	export let onDone: () => void = () => undefined;

	const pad = (n: number) => String(n).padStart(2, '0');
	let now = new Date();
	setInterval(() => (now = new Date()), 1000);
	$: date = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
	$: time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

	const t = getContext<I18nContext['t']>('t');
</script>

<header>
	<div class="icon-container">
		<div class="icon">
			<Icon icon={menuIcon} />
		</div>
		<div class="icon shrink">
			<Icon icon={leftSolid} />
		</div>
		<div class="icon shrink">
			<Icon icon={rightSolid} />
		</div>
		<div class="icon shrink">
			<Icon icon={homeSolid} />
		</div>
		<span>LR15 TURKU</span>
	</div>
	<div class="datetime">
		<span>{date}</span>
		<span>{time}</span>
	</div>
</header>
<main>
	<div class="main">
		<h1>
			<div class="icon"><Icon icon={humanWalk} /></div>
			{$t('matkustajan.toiminta')}
		</h1>
		<div style:align-self="flex-end" style:margin="10px">
			<LanguageSelector paused={!waitingForCall} />
		</div>
		<div class="divider" />
		<div class="call">{$t('soita.mokille')}</div>
		<Button on:end={onDone} />
		<div class="level">{$t('taso')} 0</div>
	</div>
</main>

<footer>
	<div class="icon-container">
		<div class="icon white"><Icon icon={desktopOutline} /></div>
		<div class="icon white"><Icon icon={personIcon} /></div>
	</div>
	<img src={logo} alt="Reaktor" />
</footer>

{#if waitingForCall}
	<GlitchOverlay />
	{#if !STOP_IDLE}
		<IdleCallouts />
	{/if}
{:else}
	<OutboundCallOverlay />
{/if}

<style lang="scss">
	@use 'sass:color';

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;

		.divider {
			flex: 1;
		}

		h1 {
			display: flex;
			align-items: center;
			gap: 0.3em;
			justify-content: center;
			width: 100%;
			margin: 0;
			background-color: black;
			color: white;
			border-top-left-radius: var(--border-radius);
			border-top-right-radius: var(--border-radius);
			font-weight: lighter;
			font-size: 48pt;

			.icon {
				background-color: white;
				color: black;
				width: 64px;
				height: 64px;
				border-radius: 50%;
			}
		}

		.call {
			font-size: 42pt;
			margin-bottom: 1em;
		}

		.level {
			font-size: 70pt;
		}
	}

	.icon-container {
		display: flex;
		gap: 0.75em;
		margin: 0.5em 0;

		.icon {
			background-color: black;
			color: var(--background-color);
			height: 24px;
			width: 24px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			&.shrink {
				font-size: 80%;
			}

			&.white {
				color: white;
			}
		}
	}

	header,
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	header {
		.datetime {
			display: flex;
			flex-direction: row;
			gap: 1em;
		}
	}

	main {
		flex: 1;
		background-color: white;
		border-radius: var(--border-radius);
	}

	footer {
		img {
			height: 2em;
			/* margin: 0.5em 0; */
		}
	}
</style>
