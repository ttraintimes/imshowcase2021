<template>
  <div class="grid" :class="modifiers" v-editable="blok">
    <component
      v-for="blok in blok.columns"
      :blok="blok"
      :is="blok.component"
      :key="blok._uid"
    />
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        required: true
      }
    },
    computed: {
      modifiers() {
        let classes = [];
        const { justify, align_items, modifiers } = this.blok;
        if (justify) classes.push(`grid--${justify}`);
        if (align_items) classes.push(`grid--align-${align_items}`);
        if (modifiers) classes.push(...modifiers.split(";").map(c => c.trim()))
        return classes;
      }
    }
  }
</script>
