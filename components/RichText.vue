<template>
  <div :id="blok.section_id" :class="modifierClasses" v-editable="blok">
	  <rich-text-renderer :document="blok.body"/>
  </div>
</template>

<script>
// To allow the renderer to render components, https://storyblok-rich-text-renderer.netlify.app/vue-plugin/config/#resolvers
export default {
	props: {
		blok: {
			type: Object,
			required: true,
		},
	},
	computed: {
		modifierClasses() {
			let classes = [];
			const { text_align } = this.blok;
			if (text_align) classes.push(`text--${text_align}`);
			return classes;
		},
	},
};
</script>

<style lang="scss" scoped>
.text--left { text-align: left; }
.text--center { text-align: center; }
.text--right { text-align: right; }
</style>
