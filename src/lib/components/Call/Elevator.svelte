<script>
	import { PAD } from '$lib/configs';
	import elevatorJpg from '$lib/images/elevator.jpeg';
</script>

<div>
	<img src={elevatorJpg} alt="elevator" class:ipad6={PAD === 'ipad6'} />
</div>

<style>
	img {
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: top left;
		transform: scale(1.18) translate(0px, -76px);

		&.ipad6 {
			transform: scale(1.07) translate(0px, -85px);
		}
	}
</style>
