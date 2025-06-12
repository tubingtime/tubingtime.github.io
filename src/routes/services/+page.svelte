	<script>
		import Nav from "$lib/nav.svelte";
		import Footer from "$lib/footer.svelte";
		import Icon from "@iconify/svelte"

	</script>
		<!--
		 TODO: Services:
		 1. Computer Consulting
		 2. Web Design & Hosting
		 3. AI Services -> GPT wrappers ?
		 4. Remote  & In-person IT Support
		 5. Hardware Services
		 
		 -->
		 
<div id="main">
<Nav active={"services"} />

<section style="margin-left:1em; margin-right:1em">
	<h1>Services</h1>
	<div class="center-row">
			<div class="service">
				<div class="flex-row service-header">
					<Icon icon="streamline-pixel:interface-essential-question-help-square" width="3em" height="3em" class="icon" />
					<h2>Consulting Services</h2>
				</div>
				<p>Not sure what you need? Email me for a free consultation!</p>
			</div>
			<div class="service">
				<div class="flex-row service-header">
					<Icon icon="streamline-pixel:internet-network-wifi-monitor" width="3em" height="3em" class="icon" />
					<h2>Web Design & Hosting</h2>
				</div>
				<p>Want a website like this or something more advanced? <br>
					Contact me for a free quote.</p>
			</div>
	</div>
		<div class="center-row">
			<div class="service">
				<div class="flex-row service-header">
					<Icon icon="streamline-pixel:internet-network-www" width="3em" height="3em" class="icon" />
					<h2>Remote IT Support</h2>
				</div>
				<p>Remote IT support done in a responsive and understanding way. </p>
			</div>
			<div class="service">
				<div class="flex-row service-header">
					<Icon icon="streamline-pixel:coding-apps-websites-setting-computer" width="3em" height="3em" class="icon" />
					<h2>Home IT Support</h2>
				</div>
				<p>Need help with home computers, computer hardware, printers, TVs, or routers?.</p>
			</div>
	</div>

</section>


<Footer />

</div>
