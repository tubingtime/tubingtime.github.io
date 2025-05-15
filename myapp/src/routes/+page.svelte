	<script>
		import Nav from "$lib/nav.svelte";
		import Footer from "$lib/footer.svelte";
	</script>

	<div id="bg"></div>
	<div id="main">
		<Nav active={"home"} />
		<!-- Header -->
		<header id="header">
			<h1>Thomas de Laveaga</h1>
			<p>Hi! My name is Thomas. <br>
				<br>
				I'm a freelance computer consultant.
				<br>Use the links below to discover the services I offer.
			</p>
			<section style="margin: 1em;">
				<button type="button" class="nes-btn">Contact me</button>

			</section>
		</header>
		<Footer />
	</div>
