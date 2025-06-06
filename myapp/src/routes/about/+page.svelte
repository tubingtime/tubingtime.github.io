<script>
	import Nav from "$lib/nav.svelte";
	import Footer from "$lib/footer.svelte";
</script>

<div id="main">
	<Nav active={"about"} />

	<section>
		<div class="flex-row">
			<h1> About Me </h1>
			<div class="start-row">
				<img alt="Selfie of Thomas"
					src="https://res.cloudinary.com/dm4j1v9ev/image/upload/f_auto,q_auto/v1/tubingtime.github.io/dh2ip10ukup7jxepf7xx"
					width="325.5" height="403.6">
				<p>
					Thomas is a professional IT consultant with over 5 years of experience. He has built websites,
					computers, and applications for over 10 clients.
					<br><br>
					In his free time he enjoys biking, cooking potatoes, listening to jazz, and dancing.
				</p>
			
		</div>
		<div class="vertical flex">

		</div>
	</section>


	<Footer />

</div>
<!--  -->