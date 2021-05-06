<template>
  <nuxt-link to="/" class="brand" exact>
    <img src="~/assets/images/logo.png" height="100%"/><span>Showcase</span>
  </nuxt-link>
</template>

<style lang="scss">
.brand {
  height: 80px;
  display: block;
  margin-right: auto;

  > img {
    display: inline-block;
  }

  > span {
    display: none;
    font-family: "Orbitron", sans-serif;
    color: #fff;
    font-size: 1.4rem;
    position: relative;
    bottom: 20%;
  }
  @media (min-width: map-get($breakpoints, "laptop")) {
    top: 12px;
    font-weight: bold;
    text-transform: uppercase;
    display: inline-block;
    height: 104px;
    text-decoration: none;
    > span {
      display: unset;
      font-size: 2.5rem;
    }
  }
}
</style>
