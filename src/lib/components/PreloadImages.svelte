<script lang="ts">
	import bombJpg from '$lib/images/bomb.jpeg';
	import cockpit from '$lib/images/cockpit.jpeg';
	import elevator from '$lib/images/elevator.jpeg';
	import noise from '$lib/images/noise.jpg';
	import turkuVaakuna from '$lib/images/Turku.vaakuna.svg';
	import simikulaari from '$lib/images/simikulaari.jpeg';
	import scifi from '$lib/images/scifi.jpeg';
	import car from '$lib/images/car.jpeg';
	import cctv from '$lib/images/cctv.jpeg';
	import logo from '$lib/images/logo.png';
</script>

<img class="preload" src={bombJpg} alt="preload" />
<img class="preload" src={cockpit} alt="preload" />
<img class="preload" src={elevator} alt="preload" />
<img class="preload" src={noise} alt="preload" />
<img class="preload" src={turkuVaakuna} alt="preload" />
<img class="preload" src={simikulaari} alt="preload" />
<img class="preload" src={scifi} alt="preload" />
<img class="preload" src={car} alt="preload" />
<img class="preload" src={cctv} alt="preload" />
<img class="preload" src={logo} alt="preload" />

<style lang="scss">
	.preload {
		width: 1px;
		height: 1px;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
