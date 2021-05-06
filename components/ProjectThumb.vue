<template>
  <div
    class="project-thumb" :class="{active: toggled}"
    v-editable="blok"
  >
    <div class="project-thumb__inner">
      <img class="project-thumb__thumbnail" v-lazy="resize(blok.thumbnail.filename, '500x300')" :alt="blok.thumbnail.alt">
      <h6 class="project-thumb__heading">{{blok.title}}</h6>
      <p>by {{blok.author}}</p>
      <button class="button button--blue button--small" @touchend.prevent="toggle" @mouseup.left="toggle">Display {{toggled ? "Less" : "More"}}</button>
    </div>
    <p class="project-thumb__description" v-if="expandable">{{blok.description}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        required: true
      },
      expandable: {
        type: Boolean
      }
    },
    data() {
      return {
        toggled: false
      }
    },
    methods: {
      toggle() {
        //Set to toggled
        this.toggled = !this.toggled;
      },
      resize(image, option) {
        var imageService = 'https://img2.storyblok.com/'
        let path = image.replace("https://a.storyblok.com", "")
        return imageService + option + path
      },
    }
  }
</script>

<style lang="scss" scoped>
.project-thumb {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: 1s width;
  transition-delay: 0, 2s;
  border-style: solid;
  border-image-source: url("@/assets/images/project-border.png");
  border-image-slice: 20;
  border-image-width: 10px;
  border-image-outset: 7px;
  border-style: solid;

  .project-thumb__heading {
    font-size: 1rem;
  }
  .project-thumb__thumbnail {
    width: 100%;
    min-height: 200px;//This stops the images starting out really tiny and looking a bit funny. I think it makes the anim a bit cleaner too tbh
    max-width:500px;//Stops the images being absolutely gigantic when hiding the text back
    object-fit: cover;
  }
  .project-thumb__description {
    display: none;
  }
  &.active {
    .project-thumb__description {
      display: inline-block;
      height:300px;
      overflow-y: auto;
    }
  }
  @media (min-width: map-get($breakpoints, "tablet")) {
    &.active {
      flex-direction: row;
      align-items: center;
      width: 100%;
      .project-thumb__inner {
        width: 50%;
        margin-right: 20px;
      }
      .project-thumb__description {
        width: 50%;
        text-align: left;
      }
    }
  }
}

/* Track */
  ::-webkit-scrollbar {
    background: rgba(255, 255, 255, 0.21);
    width: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: url("~assets/images/scrollbar-inner-blue.svg");
    background-size: 100%;
    width: 6px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-image: url("~assets/images/scrollbar-inner-blue-hover.svg");
  }
</style>
