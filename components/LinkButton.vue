<template >
	<component
		class="button"
		:class="modifiers"
		:is="type"
		:to="btn.link.cached_url"
		:href="btn.link.url"
		v-editable="blok || body"
		>{{ btn.text }}</component
	>
</template>

<script>
export default {
  //Blok is our normal one for storyblok, but when it is inside a richtext component it uses body instead. Just to be difficult. :|
	props: ["blok", "body"],
	computed: {
    //Just to make everything more readable, just use btn instead of blok or body in most places.
    btn() {
      return this.body || this.blok;
    },
		modifiers() {
			let classes = [];
			let { color, small, modifiers } = this.btn;
			if (color) classes.push(`button--${color}`);
			if (small) classes.push("button--small");
      if (modifiers) classes.push(...modifiers.split(";").map(c => c.trim()))
			return classes;
		},
		type() {
			return this.btn.link.linktype == "story" ? "nuxt-link" : "a";
		},
	},
};
</script>
