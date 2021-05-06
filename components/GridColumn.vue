<template>
  <div class="column" :class="columnModifiers" v-editable="blok">
    <component
      v-for="blok in blok.content"
      :key="blok._uid"
      :is="blok.component"
      :blok="blok"
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
      columnModifiers() {
        let classes = [];
        const { xsmall: mobile, small: tablet, medium: laptop, large: desktop } = this.blok.width;
        const { justify, align_items, margin } = this.blok;

        if (mobile) classes.push(`column--mobile-${mobile}`);
        if (tablet) classes.push(`column--tablet-${tablet}`);
        if (laptop) classes.push(`column--laptop-${laptop}`);
        if (desktop) classes.push(`column--desktop-${desktop}`);
        if (justify) classes.push(`column--justify-${justify}`);
        if (align_items) classes.push(`column--align-${align_items}`);

        if (margin) classes.push(...margin.map(d => `m${d}-1`))
        return classes;
      }
    }
  }
</script>
