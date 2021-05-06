<template>
  <ul class="tabs">
    <li :class="{ active: value ? value == tab : current == tab }" v-for="(tab, i) in tabs" :key="i">
      <a @click="changeTab(tab)" target="_blank" rel="noopener noreferrer">
        {{tab}}
      </a>
    </li>
  </ul>
</template>

<script>
// Recommended usage is <Tabs :tabs="['All', 'Tab 1', 'Tab 2']" v-model="someDataProperty" />
// To do something every time the tab changes, change v-model to: v-bind:value="someDataProperty" v-on:input="coolFunction($event)"
export default {
  props: {
    value: {
      type: String,
      required: false
    },
    // Eg. [ "All", "2020", "2019", "2018" ]
    tabs: {
      type: Array,
      required: true
    },
  },
  methods: {
    changeTab(tab) {
      this.$emit("input", tab);
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
	list-style: none;
	padding: 0;
	display: flex;
	justify-content: center;
	font-family: "Orbitron", monospace;
	font-weight: bold;
	margin: 20px;
	> li {
		&.active {
			@include effect-text-glow-white;
			text-decoration: underline;
		}
		padding: 10px 17px;

	}
	li a:hover{
		cursor: pointer;
	}
}
</style>
