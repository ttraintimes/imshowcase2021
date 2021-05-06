<template>
	<div class="page">
		<div id="page-background"></div>
		<h1>Sponsorship Packages</h1>

		<div class="package_holder">
			<div class="package">
				<h2>Gold £200</h2>
				<div class="package_body">
					<div class="img_holder">
						<img src="~assets/images/goldhand.png" alt="Gold Package Hand Icon"/>
					</div>
					<p>
						<ul>
							<li>Large prominent logo on promotional materials, including: social media, videos, posters, flyers, University of York campus screens, the showcase website and any other materials produced.</li>
							<li>Large logo feature on certificates sent to University of York Interactive Media students who submitted projects to the showcase.</li>
							<li>Video advert (maximum 1 minute duration) displayed during our live event (to be provided by the sponsor).</li>
							<li>Exclusive social media post featuring logo on Showcase Accounts.</li>
							<li>Logo inclusion on all emails sent by the Showcase Team.</li>
							<li>Opportunity to sponsor an award.</li>
							<li>Special recognition from the Interactive Media Course during the event speech.</li>
						</ul>
					</p>
				</div>
			</div>
		</div>

		<div class="package_holder">
			<div class="package">
				<h2>Silver £100</h2>
				<div class="package_body">
					<div class="img_holder">
						<img src="~assets/images/silverhand.png" alt="Silver Package Hand Icon"/>
					</div>
					<p>
						<ul>
							<li>Medium logo on promotional materials, including: social media, videos, posters, flyers, University of York campus screens, the showcase website and any other materials produced.</li>
							<li>Medium logo feature on certificates sent to University of York Interactive Media students who submitted projects to the showcase.</li>
							<li>Image advert displayed during our live event (to be provided by the sponsor).</li>
							<li>Social media post featuring logo on Showcase Accounts.</li>
							<li>Logo inclusion on all emails sent by the Showcase Team.</li>
						</ul>
					</p>
				</div>
			</div>
		</div>

		<div class="package_holder">
			<div class="package">
				<h2>Bronze £50</h2>
				<div class="package_body">
					<div class="img_holder">
						<img src="~assets/images/bronzehand.png" alt="Bronze Package Hand Icon"/>
					</div>
					<p>
						<ul>
							<li>Small logo on promotional materials, including: social media, videos, posters, flyers, University of York campus screens, the showcase website and any other materials produced.</li>
							<li>Small logo feature on certificates sent to University of York Interactive Media students who submitted projects to the Showcase.</li>
							<li>Small logo projected during the broadcast of the event.</li>
							<li>Logo inclusion on all emails sent by the Showcase Team.</li>
						</ul>
					</p>
				</div>
			</div>
		</div>

        <p>If you would like to provide any other service or non-financial support, we are also interested in working with you. We invite all forms of partnership, so contact us at hello@imshowcase.co.uk and let us know!</p>
	</div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
$package-height: 25em;
$package-width: 20em;

h1 {
	margin-bottom: 0.7em;
	margin-top: 1em;

    @media (min-width: map-get($breakpoints, "laptop")) {
		margin-bottom: 1em;
		margin-top: 2em;
	}
}

.package_holder {
	display: flex;
    padding: 0;
}

.package h2 {
	margin-top: 0.2em;
	margin-bottom: 0.3em;

    @media (max-width: map-get($breakpoints, "laptop")) {
		align-self: left;
	    justify-self: left;
	}

	@media (min-width: map-get($breakpoints, "laptop")) {
		margin-top: 0.7em;
		margin-bottom: 0.3em;
	}
}

.package {
	margin: auto;
	margin-bottom: 6em;
	display: flex;
	flex-direction: column;
	min-width: $package-width;
	min-height: $package-height;
	background: url("~assets/images/sponsorship-background.png");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center bottom;

	@media (max-width: map-get($breakpoints, "laptop")) {
		background: none;
	}
}

.package li {
    text-align: left;
    max-width: 90%;
	margin-left: 1em;

	@media (max-width: map-get($breakpoints, "laptop")) {
		margin: 0;
	}
}

.package ul {
	@media (max-width: map-get($breakpoints, "laptop")) {
		max-height: $package-height;
		overflow-y: auto;
		max-width: 95%;
	}

	@media (min-width: map-get($breakpoints, "laptop")) {
		padding-left: 0;
	}
}

.package_body {
	display: flex;
	flex-direction: row;
	justify-content: left;

	@media (max-width: map-get($breakpoints, "laptop")) {
		flex-direction: column;
	}
}

.img_holder {
	min-width: 18em;
	height: $package-height;
	overflow: hidden;
	display: flex;
	align-self: center;
	justify-self: center;
	max-height: 80%;

    @media (min-width: map-get($breakpoints, "laptop")) {
		align-self: left;
	    justify-self: left;
	}
}

.img_holder img {
	margin: auto;
	margin-top: 0.7em;
	margin-right: 0em;
	object-fit: cover;
	display: flex;
	align-self: center;
	max-height: 80%;

    @media (max-width: map-get($breakpoints, "laptop")) {
		align-self: left;
	    justify-self: left;

		margin-bottom: 0;
	}

	@media (min-width: map-get($breakpoints, "laptop")) {
		margin-left: -0.8em;
	}
}
</style>