<script>
    let { active } = $props();
    let home = $state('inactive');
    let services = $state('inactive');
    let about = $state('inactive');

    if (active == "home") {
        home = "active"
    }
    else if (active == "services") {
        services = "active"
    }
    else if (active == "about") {
        about ="active"
    }
    else {
        console.log("Invalid navbar item!")
    }

</script> 

<div id="nav">
	<a id={home} href="/">Home</a>
	<a id={services} href="services">Services</a>
	<a id={about} href="about">About</a>
</div>