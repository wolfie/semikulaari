<script lang="ts">
	import '../styles.css';
	import '@fontsource/open-sans';
	import { disableBodyScroll } from 'body-scroll-lock';
	import { browser } from '$app/environment';
	import MotionPermissionProvider from '$lib/components/MotionPermissionProvider.svelte';
	import SoundsProvider from '$lib/components/SoundsProvider.svelte';
	import I18nProvider from '$lib/components/I18nProvider.svelte';
	import PreloadImages from '$lib/components/PreloadImages.svelte';

	if (browser) {
		disableBodyScroll(document.scrollingElement ?? document.body);
		document.body.classList.add('iosFullscreenFix');
	}
</script>

<div id="root">
	<PreloadImages />
	<I18nProvider>
		<SoundsProvider>
			<MotionPermissionProvider>
				<slot />
			</MotionPermissionProvider>
		</SoundsProvider>
	</I18nProvider>
</div>

<style lang="scss">
	* {
		user-select: none;
	}

	:global(body) {
		background-color: var(--background-color);
	}

	:global(body, button) {
		font-family: 'Open Sans', sans-serif;
	}

	:global(.iosFullscreenFix) {
		right: 0;
		bottom: 0;
	}

	#root {
		margin: 0 1em;
		padding: 0;
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
</style>
