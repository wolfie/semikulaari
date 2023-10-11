<script lang="ts">
	import scifi from '$lib/images/scifi.jpeg';
</script>

<img src={scifi} alt="car" />

<style lang="scss">
	img {
		position: fixed;
		top: 0;
		left: 0;
		transform-origin: top left;
		transform: scale(1.05) translate(-20px, -20px);
	}
</style>
