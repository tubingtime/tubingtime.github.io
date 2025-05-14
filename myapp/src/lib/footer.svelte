<script>
    let { active } = $props();
    let home = "inactive";
    let services = "inactive"
    let about = "inactive"

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
	<a id={home} href="home">Home</a>
	<a id={services} href="services">Services</a>
	<a id={about} href="about">About</a>
</div>