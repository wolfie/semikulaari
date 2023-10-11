<script lang="ts">
	import callOutline from '@iconify/icons-ion/call-outline';
	import Icon from '@iconify/svelte';
</script>

<div class="root">
	<div class="icon">
		<Icon icon={callOutline} />
	</div>
</div>

<style lang="scss">
	.root {
		position: absolute;
		background-color: rgba(255, 255, 255, 0.5);
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		.icon {
			display: flex;
			height: 300pt;
			width: 300pt;
			justify-content: center;
			align-items: center;
			font-size: 200pt;
			color: green;
			border: 15px solid green;
			border-radius: 50%;
			filter: drop-shadow(0 0 5px white) drop-shadow(0 0 5px white) drop-shadow(0 0 5px white);
		}
	}
</style>
