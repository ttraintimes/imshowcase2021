<template>
  <ul class="menu" :class="{ 'menu--vertical': vertical }">
    <slot />
  </ul>
</template>

<script>
  export default {
    props: {
      vertical: { type: Boolean, default: () => false }
    }
  }
</script>

<style lang="scss">
.menu {
  display: flex;
  list-style: none;
  padding: 0;
  font-family: "Orbitron", sans-serif;

  //Seperate all except the first element by a 16px
  > li, > hr {
    &:not(:last-child) { margin: 0 1rem 0 0; }
  }

  //.menu--vertical
  @mixin vertical {
    flex-direction: column;
    padding: 20px;
    > li, > hr {
      &:not(:last-child) { margin: 0 0 1rem 0; }
    }
  }

  &--vertical {
    @include vertical;
  }

  //Apply .menu--responsive-laptop or .menu--responsive-desktop to make the menu become vertical at a certain breakpoint
  @media (min-width: map-get($breakpoints, "laptop")) {
    &--responsive-laptop {
      @include vertical;
    }
  }
  @media (min-width: map-get($breakpoints, "desktop")) {
    &--responsive-desktop {
      @include vertical;
    }
  }
}

.menu__item {
  display: flex;
  align-items: center;
  text-decoration: none;
  a {
    color: currentColor;
    text-decoration: inherit;
    &.active {
      text-decoration: underline;
    }
  }
}
</style>
