<template>
  <div>
    <header id="header">
      <Logo />

      <Navbar id="main-navbar">
        <li class="menu__item"><nuxt-link to="/" exact>Home</nuxt-link></li>
        <li class="menu__item"><nuxt-link to="/#covidUpdate">Covid-19</nuxt-link></li>
        <li class="menu__item"><nuxt-link to="/contact">Contact Us</nuxt-link></li>

        <hr />
        <!-- Toggles the menu -->
        <li class="sideMenu__burger menu__item" @click.prevent="$refs.sidebar.show()">
          Menu
          <Icon icon="menu" />
        </li>
      </Navbar>
    </header>

    <Modal ref="sidebar" name="sideMenu">
      <SideMenu id="side-navigation">
        <Menu vertical>
          <li class="menu__item sideMenu__burger" @click="$refs.sidebar.hide()">
            <span>Close</span><Icon icon="x" />
          </li>
          <li class="menu__item">
            <nuxt-link to="/" exact>Home</nuxt-link>
          </li>
          <li class="menu__item">
            <nuxt-link to="/contact">Contact</nuxt-link>
          </li>
          <li class="menu__item">
            <nuxt-link to="/past-projects">Past Projects</nuxt-link>
          </li>
          <li class="menu__item">
            <nuxt-link to="/awards">Awards</nuxt-link>
          </li>
          <li class="menu__item">
            <nuxt-link to="/sponsorship-packages">Sponsorship Packages</nuxt-link>
          </li>
          <li class="menu__item">
            <nuxt-link to="/team">Team</nuxt-link>
          </li>
          <li class="menu__item">
            <nuxt-link to="/judge">Judges</nuxt-link>
          </li>
          <li class="menu__item">
            <nuxt-link to="/submissions" class="button button--blue">Submit a project</nuxt-link>
          </li>
        </Menu>
      </SideMenu>
    </Modal>
    <Nuxt />
    <SocialIcons />
    <footer><Footer/></footer>
  </div>
</template>

<style lang="scss">
#header {
  margin: 0 auto;
  max-width: 996px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  > .brand {
    position: relative;
  }
  @media (min-width: map-get($breakpoints, "laptop")) {
    padding: unset;
  }
}
#main-navbar {
  animation: flipIn 1s;
  transform-origin: top center;
  @media (min-width: map-get($breakpoints, "laptop")) {
    align-self: flex-end;
  }
}
#side-navigation{
  right: 0;
  z-index: 10;
}
</style>
