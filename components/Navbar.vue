<template>
    <!--Contains top level links-->
    <nav class="navbar">
      <Menu class="navbar__menu">
        <slot />
      </Menu>
    </nav>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" >
.navbar {
  display: flex;
}
.navbar__menu {
  text-transform: uppercase;
  font-family: "Orbitron", sans-serif;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;

  //Hide on mobile
  .menu__item:not(.sideMenu__burger), hr { display: none; }

  &.active {
    display: flex;
  }

  @include effect-text-glow-white;

  background: rgba(37, 37, 37, 1);
  border: 2px solid $color-neon-pink;
  border-radius: 10px;
  padding: 10px 20px !important;
  position: relative;
  margin-top: 20px;
  @include effect-signboard-glow-neon-pink;
  @media (max-width: map-get($breakpoints, "laptop")) {
    &::before { @include scaffold(20px, right, center) }
  }
  @media (min-width: map-get($breakpoints, "laptop")) {
    padding: 20px 24px !important;
    //Add scaffolding
    margin-top: 56px;
    &::before { @include scaffold(56px, top, start); }
    &::after { @include scaffold(56px, top, end); }

    .menu__item:not(.sideMenu__burger), hr { display: flex; }
  }
}



@keyframes flipIn {
    0.0%{
        transform: rotate3d(1, 0, 0, -90deg);
        transform-origin: top center;
        opacity: 0;
    }
    40% {
      opacity: 1;
    }
    70%{
        transform: rotate3d(1, 0, 0, 0deg);
    }
}
</style>
