<template>
  <transition name="fade">
    <div class="modal__wrapper" v-if="isOpen" ref="wrapper" @click.prevent.stop.left.self="hide" @keyup.esc="hide">
      <div class="modal container" ref="modal">
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    head() {
      return {
        bodyAttrs: {
          class: [this.$store.state.openModals.length > 0 ? "modal-open" : ""]
        }
      }
    },
    props: {
      // Name is an identifier for the modal, it doesn't have to be unique,
      // but any modals with the same name will disappear together
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      isOpen() {
        return this.$store.state.openModals.includes(this.name)
      }
    },
    methods: {
      toggle() {
        this.$store.commit("TOGGLE_MODAL", this.name);
      },
      show() {
        this.$store.commit("OPEN_MODAL", this.name);
      },
      hide() {
        this.$store.commit("CLOSE_MODAL", this.name);
      }
    },
  }
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.modal__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(6, 18, 27, 0.8);
  z-index: 20;
}

@media (max-width: map-get($breakpoints, "mobile")) {
  .modal {
    max-width: calc(100vw - 40px);
  }
}
</style>

<style lang="scss">
.no-scroll, .modal-open { overflow: hidden; }
</style>
