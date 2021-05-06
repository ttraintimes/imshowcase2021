<template>
  <aside class="sideMenu">
    <slot />
    <div class="sideMenu__footer">
      <slot name="footer">
        <img src="~/assets/images/logo.png" height="60"><span>&copy; Copyright IM Showcase {{new Date().getFullYear()}}</span>
      </slot>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sideMenu {
  width: 100vw;
  height: 100vh;
  max-width: 360px;
  color: #000;
  background: #eee;
  float: left;

  // display: none;
  // position: fixed;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // z-index: 2;
  // font-size: 1.2rem;
  // transition: transform .4s;
  // transform: translate(105%);
  // &.active {
  //   transform: none;
  // }
  > .menu {
    padding: 40px;
  }
  &__footer {
    font-size: 1rem;
    padding: 0.8rem 1rem;
    // background-color: #0C1533;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    > *:not(:last-child) {
      margin-right: 1em;
    }
    // color: #fff;
  }
  @media (min-width: map-get($breakpoints, "laptop")) {
    width: 360px;
    position: fixed;
  }
}
</style>

<style lang="scss">
.sideMenu__burger {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  -webkit-touch-callout: none; // iOS Safari
    -webkit-user-select: none; // Safari
     -khtml-user-select: none; // Konqueror HTML
       -moz-user-select: none; // Old versions of Firefox
        -ms-user-select: none; // Internet Explorer/Edge
            user-select: none; // Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox

  .feather {
    margin: 0 0 0 0.4em;
  }
}
</style>
