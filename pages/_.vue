<template>
  <div>
    <div id="page-background" v-if="story.content.show_background"/>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      story: { content: {} }
    }
  },
  mounted () {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content
      }
    })
    // Use the bridge to listen the events
    this.$storybridge.on(['published', 'change'], (event) => {
      window.location.reload()
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      })
    })
  },
  asyncData (context) {
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    const fullSlug = (context.route.path == '/' || context.route.path == '') ? 'home' : context.route.path
    const excludedSlugs = [/^\/?past-projects\/.+/, /^\/?committee-members\/.+/]

    //If the slug matches either a regex or string in the excludedSlugs array, return a 404 error
    if (excludedSlugs.some(e => e instanceof RegExp ? (e.test(context.route.path)) : (e == context.route.path))) {
      //Good solution? idk but it works.
      context.error({ statusCode: 404, message: "This page does not exist" })
    }
    // Otherwise Load the JSON from the API - loading the story for the current page
    else return context.app.$storyapi.get('cdn/stories/' + fullSlug, {
      version,
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}
</script>
