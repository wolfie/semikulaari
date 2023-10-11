<script lang="ts">
	import { NOISE_TIME_MS } from '$lib/configs';
	import { onMount } from 'svelte';
	import Noise from './Call/Noise.svelte';

	let showNoise = true;
	onMount(() => {
		showNoise = true;
		setTimeout(() => (showNoise = false), NOISE_TIME_MS);
	});
</script>

{#if showNoise}
	<Noise />
{:else}
	<slot />
{/if}
