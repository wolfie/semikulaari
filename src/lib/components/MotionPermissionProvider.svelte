<script lang="ts" context="module">
	export type MotionPermissionContext = {
		motionPermissionResult: Readable<'skipped' | 'allowed'>;
	};
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import { setContext } from 'svelte';
	import { writable, type Readable } from 'svelte/store';
	import simikulaari from '$lib/images/simikulaari.jpeg';

	let error: 'not-supported' | 'denied' | undefined;

	const result = writable<'skipped' | 'allowed'>();
	$: console.log({ result: $result });
	setContext<MotionPermissionContext['motionPermissionResult']>('motionPermissionResult', result);

	if (
		typeof DeviceMotionEvent === 'undefined' ||
		!('requestPermission' in DeviceMotionEvent) ||
		typeof DeviceMotionEvent.requestPermission !== 'function'
	) {
		error = 'not-supported';
	}

	const requestPermission = () =>
		error !== 'not-supported' &&
		(DeviceMotionEvent as any).requestPermission().then((result: 'granted' | 'denied') => {
			if (result === 'denied') error = 'denied';
			else $result = 'allowed';
		});
</script>

{#if !$result}
	<div class="overlay" style="background-image: url({simikulaari})">
		{#if error}
			<div class="error">
				<div>{error}</div>
				<button on:click={() => ($result = 'skipped')}>Ohita: klikkaus on läimäsy</button>
			</div>
		{:else}
			<button on:click={requestPermission}>Käynnistä Semikulaari</button>
		{/if}
	</div>
{:else}
	<slot />
{/if}

<style lang="scss">
	.overlay {
		background-color: white;
		background-size: cover;
		background-position: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		> button {
			height: 80%;
			width: 80%;
			font-size: 70pt;
			background-color: rgba(255, 255, 255, 0.2);
		}

		.error {
			background-color: red;
			height: 50%;
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 50pt;
			color: rgb(255, 203, 203);
			box-shadow: 0 0 50px white;
			border-radius: 10px;
		}
	}
</style>
