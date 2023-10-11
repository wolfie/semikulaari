<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let time: number;
	const dispatch = createEventDispatcher<{ afterTimeout: void }>();
	onMount(() => {
		const t = setTimeout(() => dispatch('afterTimeout'), time);
		return () => clearTimeout(t);
	});
</script>

<slot />
