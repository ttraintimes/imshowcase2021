<template>
  <div class="projectThumb" @click="toggle" :class="{ active: toggled }">
    <img :src="resize(project.thumbnail.filename, '500x300')" :alt="project.thumbnail.alt || project.title" class="projectThumb__thumbnail">
    <span class="projectThumb__heading"><h5>{{project.title}}</h5>/<h5>{{project.author}}</h5></span>
    <button class="button button--blue button--small projectThumb__button">See details</button>
  </div>
</template>

<script>
//This only works with data from the "project" storyblok component
export default {
  props:{
    project: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      toggled: false
    }
  },
  methods: {
    toggle() {
      this.toggled = !this.toggled;
    },
    resize(image, option) {
      var imageService = 'https://img2.storyblok.com/'
      let path = image.replace("https://a.storyblok.com", "")
      return imageService + option + path
    }
  }
}
</script>

<style lang="scss" scoped>
.projectThumb {
  position: relative;
  padding: 1rem 1rem 10px;
  border: 4px solid;
  border-image-source: url("@/assets/images/project-border.png");
  border-image-slice: 20;
  border-image-width: 10px;
  border-image-outset: 7px;
  img {
    max-width: 100%;
    height: 200px;
  }
  &__heading {
    display: block;
    h5 {
      margin: 0 5px;
      display: inline;
    }
  }
  &__button {
    margin-bottom: -1em;
  }
  &.active {
    width: columns(12, 0px);
  }
}
</style>
