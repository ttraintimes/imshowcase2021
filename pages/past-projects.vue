<template>
	<main class="page">
		<div id="page-background" />
		<h1>Past Projects</h1>
    <Tabs :tabs="['All', '2020', '2019', '2018']" v-bind:value="tab" v-on:input="changeTab($event)"/>
		<!-- Past Projects catalog -->
		<div id="projects-grid">
			<div v-if="$fetchState.pending" class="infoScreen">
				<h3>Fetching projects, hang on...</h3>
			</div>
			<div v-else-if="$fetchState.error" class="infoScreen">
				<h3 style="margin: 2rem 0 0 0">There was an error!</h3>
				<h4 style="margin-top: 0">
					We couldn't find any past-projects
				</h4>
				<nuxt-link to="/" class="button button--pink">Home</nuxt-link>
			</div>
			<div v-else-if="totalProjects == 0" class="infoScreen">
				<h3 style="margin: 2rem 0 0 0">There's nothing here!</h3>
				<p>
					This could be an error, or maybe the projects just haven't
					been added yet. <br>
				</p>
				<button class="button button--pink" @click="changeTab(null)">
					View All Projects
				</button>
			</div>
			<ProjectThumb
				v-for="project in projects"
				:key="project.content._uid"
				:blok="project.content"
				:expandable="true"
				v-else
			/>
		</div>
		<Pagination
			:totalPages="totalPages"
			:currentPage="currentPage"
			:backForwardNav="true"
			v-if="!$fetchState.pending && totalPages > 0"
			v-on:pagination-setPage="changePage($event)"
		/>
	</main>
</template>

<script>
export default {
	data() {
		return {
			projects: [],
			tab: "All",
			currentPage: 1,
			totalProjects: 0,
		};
	},
	computed: {
		totalPages() {
			return Math.ceil(this.totalProjects / 24);
		},
	},
	methods: {
		changeTab(newTab) {
			this.tab = newTab;
			this.$fetch();
		},
		async changePage(e) {
			console.log(e);
			this.currentPage = e;
			await this.$fetch();
			window.scrollTo(0, 0);
		},
		getPage(page) {
			return this.$storyapi.get("cdn/stories", {
				starts_with: "past-projects/",
				page,
				per_page: 24,
				sort_by: "content.year_submitted:desc",
				filter_query: {
					component: {
						in: "project",
					},
					year_submitted:
						this.tab === "All"
							? undefined
							: {
									in: this.tab,
							  },
				},
			});
		},
	},
	async fetch() {
		let res = await this.getPage(this.currentPage);
		this.projects = res.data.stories;
		this.totalProjects = res.headers.total;
	},
};
</script>

<style lang="scss" scoped>
#projects-grid {
	display: grid;
	gap: 1rem;
  margin-bottom: 2rem;
	// flex-wrap: wrap;
	grid-template-columns: 1fr;
	@media (min-width: map-get($breakpoints, "tablet")) {
		grid-template-columns: 1fr 1fr;
		> .project-thumb.active {
			grid-column: span 2;
		}
	}

}

.infoScreen {
	grid-column: span 2;
	min-height: 200px;
}
</style>
