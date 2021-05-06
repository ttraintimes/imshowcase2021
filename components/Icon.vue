<template>
  <svg class="feather">
    <use :xlink:href="`${path}#${icon}`"/>
  </svg>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true
      },
      path: {
        type: String,
        default: () => "/feather-icons.svg"
      }
    }
  }
</script>

<style lang="scss">
.feather {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
