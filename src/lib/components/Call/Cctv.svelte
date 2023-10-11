<script lang="ts">
	import cctv from '$lib/images/cctv.jpeg';
</script>

<img src={cctv} alt="car" />

<style lang="scss">
	img {
		position: fixed;
		top: 0;
		left: 0;
		transform-origin: top left;
		transform: translate(-70px, -80px) scale(1.15);
	}
</style>
