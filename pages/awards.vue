<template>
	<div class="page">
		<div id="page-background"></div>
		<h1>Awards</h1>

		<div class="awards_holder">
			<div class="award">
				<h2>Best Project</h2>
				<div class="award_body">
					<div class="img_holder">
						<img
							src="~assets/images/bestprojectwhite.png"
							alt="Best Project Award Icon"
						/>
					</div>
					<p>
						The Best Project Award recognises excellence in interactive design and is awarded to a project which could demonstrate numerous qualities such as originality, technical innovation, interdisciplinarity and artistic value.
						<br/><br/>
						All projects considered for this award.
					</p>
				</div>
			</div>
		</div>

		<div class="awards_holder">
			<div class="award">
				<h2>Most Innovative Concept</h2>
				<div class="award_body">
					<div class="img_holder">
						<img
							src="~assets/images/conceptawardwhite.png"
							alt="Most Innovative Award Icon"
						/>
					</div>
					<p>
						The Most Innovative Concept Award recognises the project with the most innovative and unique concept, not taking into account its technical execution.
						<br/><br/>
						All projects considered for this award.
					</p>
				</div>
			</div>
		</div>

		<div class="awards_holder">
			<div class="award">
				<h2>Audience Favourite</h2>
				<div class="award_body">
					<div class="img_holder">
						<img
							src="~assets/images/audiencefavwhite.png"
							alt="Audience Favourite Award Icon"
						/>
					</div>
					<p>
						The Audience Favourite Award is awarded to the project which receives the most audience votes during the live broadcasted gala of the showcase.
						<br/><br/>
						All projects considered for this award.
					</p>
				</div>
			</div>
		</div>

		<div class="awards_holder">
			<div class="award">
				<h2>Spotlight</h2>
				<div class="award_body">
					<div class="img_holder">
						<img
							src="~assets/images/SpotlightAwardWhite.png"
							alt="Spotlight Award Icon"
						/>
					</div>
					<p>
						The Spotlight Award should shine a light on a project which demonstrates the talent and hard work of a first-year student; it may recognise qualities such as originality, ambition, execution or enjoyability.
						<br/><br/>
						Only first-year projects considered for this award.
					</p>
				</div>
			</div>
		</div>

		<div class="awards_holder">
			<div class="award">
				<h2>Best Critical Perspective</h2>
				<div class="award_body">
					<div class="img_holder">
						<img
							src="~assets/images/criticalawardwhite.png"
							alt="Critical Design Award Icon"
						/>
					</div>
					<p>
						The Best Critical Perspective Award recognises the project which demonstrates a compelling, comprehensive and commanding understanding of its subject matter.
						<br/><br/>
						All projects with a critical lens considered for this award.
					</p>
				</div>
			</div>
		</div>

		<div class="awards_holder">
			<div class="award">
				<h2>Best Design</h2>
				<div class="award_body">
					<div class="img_holder">
						<img
							src="~assets/images/designawardwhite.png"
							alt="Best Design Award Icon"
						/>
					</div>
					<p>
						The Best Design Award recognises accomplishments in design; the project could demonstrate excellence in visual aesthetic, user experience design, user interface design, product design or any combination of the above.
						<br/><br/>
						All projects except humanities essays considered for this award.
					</p>
				</div>
			</div>
		</div>

		<div class="awards_holder">
			<div class="award">
				<h2>Best Technical Implementation</h2>
				<div class="award_body">
					<div class="img_holder">
						<img
							src="~assets/images/TechnicalAwardwhite.png"
							alt="Technical Award Icon"
						/>
					</div>
					<p>
						The Best Technical Implementation Award recognises the project with the most ambitious, impressive and innovative execution, demonstrated through complex interactions, advanced system architecture and application robustness.
						<br/><br/>
						All projects except humanities essays considered for this award.
					</p>
				</div>
			</div>
		</div>
		<p>All the awards (except Audience Favourite Award) are shortlisted by the Interactive Media academic staff and awarded by the external judges during the live broadcasting of the gala.</p>
	</div>
</template>

<script >
export default {};
</script>


<style lang="scss" scoped>
$award-height: 15em;
$award-width: 20em;

h1 {
	margin-bottom: 0.7em;
	margin-top: 1em;

    @media (min-width: map-get($breakpoints, "laptop")) {
		margin-bottom: 1em;
		margin-top: 2em;
	}
}

.awards_holder {
	display: flex;
}
.award h2 {
	margin-top: 0.2em;
	margin-bottom: 1em;
}
.award {
	margin: auto;
	margin-bottom: 6em;
	// margin:0%,20%,0%;
	// width: 60%;
	display: flex;
	flex-direction: column;
	min-width: $award-width;
	min-height: $award-height;
	//border: 4px solid red;
	padding: 1em;

	background: url("~assets/images/award_background.png");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center bottom;

	@media (max-width: map-get($breakpoints, "laptop")) {
		background: none;
	}
}

.award p {
	max-height: $award-height;
	overflow-y: auto;
	max-width: 95%; //stops scrollbar clipping border image
	margin-left: 1em;

	@media (max-width: map-get($breakpoints, "laptop")) {
		margin: 0;
	}

	@media (min-width: map-get($breakpoints, "laptop")) {
		text-align: left;
		margin-top: 1em;
	}
}
.award_body {
	display: flex;
	flex-direction: row;
	//justify-content: left;

	@media (max-width: map-get($breakpoints, "laptop")) {
		flex-direction: column;
	}
}
.img_holder {
	//min-width: 18em;
	height: $award-height;
	overflow: hidden;

	display: flex;
	align-self: center;
	justify-self: center;

	@media (min-width: map-get($breakpoints, "laptop")) {
		min-width: 18em;
	}
}
.img_holder img {
	margin-top: 0;
	object-fit: cover;
	display: flex;
	//align-self: left;

	max-height: 80%;
}
</style>
