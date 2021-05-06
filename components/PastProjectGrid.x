<template>
	<div class="grid" v-editable="blok">
		<h4 v-if="$fetchState.pending">Fetching projects</h4>
		<h4 v-else-if="$fetchState.error">Error! Couldn't get projects</h4>
		<ProjectThumb
      v-for="{content:project} in projects"
      :key="project._uid"
      :project="project"
      class="column" :class="columnWidth"
    />
	</div>
</template>

<script>
export default {
	props: {
		blok: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			projects: [],
		};
	},
	computed: {
		columnWidth() {
			let classes = [];
			const { xsmall: mobile, small: tablet, medium: laptop, large: desktop, } = this.blok.column_width;
			if (mobile) classes.push(`column--mobile-${mobile}`);
			if (tablet) classes.push(`column--tablet-${tablet}`);
			if (laptop) classes.push(`column--laptop-${laptop}`);
			if (desktop) classes.push(`column--desktop-${desktop}`);
			return classes;
		},
	},
	async fetch() {
    //Get the projects from the graphql api, could use the rest one but there are a few more challenges
		let res = await fetch("https://gapi.storyblok.com/v1/api", {
			method: "POST",
			headers: {
				Token: this.$storyapi.accessToken,
				Version: "draft",
			},
			body: JSON.stringify({
				query: `{
            projects: ProjectItems(by_uuids: "${this.blok.projects.join(",")}") {
              items {
                content {
                  _uid
                  _editable
                  component
                  description
                  author
                  year
                  thumbnail {
                    filename
                    alt
                    copyright
                  }
                }
              }
              total
            }}`,
			}),
		});
    this.projects = (await res.json()).data.projects.items;
	}
};
</script>

<style lang="scss" scoped>
.pastProjectGrid {
  transition: 1s width;
}
</style>
