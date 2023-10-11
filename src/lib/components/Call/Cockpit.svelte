<script>
	import { PAD } from '$lib/configs';
	import cockpitJpg from '$lib/images/cockpit.jpeg';
</script>

<div>
	<img src={cockpitJpg} alt="cockpit" class:ipad6={PAD === 'ipad6'} />
</div>

<style>
	img {
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: top left;
		transform: scale(1.37) translate(-80px, -160px);

		&.ipad6 {
			transform: scale(1.23) translate(-65px, -155px);
		}
	}
</style>
