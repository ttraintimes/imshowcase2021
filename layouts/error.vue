<template>
  <div class="page grid align-center">
    <div class="column column--justify-center">
      <h1 style="margin: 2rem 0 0 0">{{error.statusCode === 404 ? "Page not Found" : "There was an error!"}}</h1>
      <h4  v-if="error.statusCode === 404">We couldn't find that page.. <br> {{fourOhFourExcuse}}</h4>
      <nuxt-link to="/" class="button button--pink">Home</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["error"],
    computed: {
      fourOhFourExcuse() {
        let excuses = [
          "It may have been deleted by malicious AI.",
          "It may have been eaten by a rogue robot.",
          "You might be lost in cyberworld.",
          "These aren't the pages you're looking for..."
          //Add more excuses here
        ]
        return excuses[Math.floor(Math.random() * excuses.length)] //Return random entry
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
