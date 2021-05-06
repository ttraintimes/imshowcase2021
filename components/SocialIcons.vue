<template>
  <Menu class="socialIcons menu--responsive-desktop">
    <slot>
      <li class="menu__item"><a href="mailto:hello@imshowcase.co.uk" mailto="" target="_blank"><Icon icon="mail"/></a></li>
      <li class="menu__item"><a href="https://www.instagram.com/imshowcaseyork/" target="_blank"><Icon icon="instagram"/></a></li>
      <li class="menu__item"><a href="https://www.facebook.com/IMShowcaseYork" target="_blank"><Icon icon="facebook"/></a></li>
      <li class="menu__item"><a href="https://www.linkedin.com/company/imshowcase/" target="_blank"><Icon icon="linkedin"/></a></li>
      <li class="menu__item"><a href="https://twitter.com/IMShowcaseYork" target="_blank"><Icon icon="twitter"/></a></li>
    </slot>
  </Menu>
</template>

<style lang="scss" scoped>
.socialIcons {
  display: flex;
  padding: 20px;
  border: 2px solid $color-neon-pink;
  border-radius: 10px;
  position: absolute;
  right: 0;
  color: #fff;
  margin: 20px 56px 20px auto;
  z-index: 2;
  background: $color-signboard-background;

  a { color: inherit; height: 24px; }
  @include effect-signboard-glow-neon-pink;
  &::after { @include scaffold(56px, right); }

  @media (min-width: map-get($breakpoints, "desktop")) {
    position: fixed;
    top: 22vh;
    left: 56px;
    right: unset;
    flex-direction: column;

    &:before { @include scaffold(56px, left, start); }
    &:after { @include scaffold(56px, left, end); }
  }
}
</style>
