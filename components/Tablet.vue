<template>
	    <div  class="tablet" v-editable="blok">

        <div class="tabletInner">
          <!--tablet-->
          <div id="tablet-left">
            <!-- <div class="videoWrapper"> -->
              <video class="tabletVideo" width="100%" controls autoplay muted v-if="blok.video.filename" >
                <source :src="blok.video.filename" type="video/mp4">
              </video>
              <!-- <iframe width="560" height="349" src="https://www.youtube.com/embed/A9eFlLXqQ9w?autoplay=1&mute=1&playlist=A9eFlLXqQ9w&loop=1" frameborder="0" allowfullscreen></iframe> -->
            <!-- </div> -->
            <!--<img class="tabletVideo" src="~/assets/images/video.png" alt="" />-->

            <!--Link address and link name defined in Tablet component on storyblok.-->
            <nuxt-link :to="`/${blok.linkAddress}`" id="past-projects-button" class="button button--blue">
              {{blok.linkName}}
            </nuxt-link>
          </div>
          <!---make commment its own component, then a thing in the tablet on storyblok, then like loopy to display
          like li v-for comment in comments {{blok.something.comment}}-->
          <div class="commentContainer">
            <h4 class="mt-1">Comment Log</h4>
            <ul class="commentLog">
              <li class="comment" v-for="comment in blok.comments" :key="comment._uid" ><span>"{{comment.body}}"<br>- {{comment.commentAuthor}}</span></li>
            </ul>
            <img
              src="/input-underline.svg"
              width="106%"
              style="position: relative; left: -3%; top: -6px"
            />
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}

</script>

<style lang="scss" scoped>

//------------tablet section----------------------------
.videoWrapper {
  position: relative;
  padding-bottom: 70%; /* 16:9 */ //Change this to a smaller number when the button is shown!!!
  height: 0;
}

.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tabletVideo {
 // width: 100%;
  margin-bottom: 24px;
  height:349px;
}

.tablet {
  //Only show background and enforce aspect ratio on laptop screens and up
  @media (min-width: map-get($breakpoints, "laptop")) {
    padding-top: 52.38%; //aspect ratio of the tablet background in %
    position: relative;
    background-image: url("~assets/images/tablet-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
}

//keep it at the same aspect ratio
.tabletInner {
  @media (min-width: map-get($breakpoints, "laptop")) {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 40px;
  }
}

#tablet-left {
  display: flex;
  flex-direction: column;
  margin: 0 0 30px 0;
  //100% width on mobile
  width: columns(12, 0px);
  //66% on desktop
  @media (min-width: map-get($breakpoints, "laptop")) {
    width: columns(8, 20px);
  }
}

#past-projects-button {
  margin-right: auto;
  //display: none;
}

.commentContainer {
  //parent div to all comment elements
  display: flex;
  flex-direction: column;
  margin: 0 0 0 auto;
  max-height: 100%;
  width: columns(12, 0px);
  @media (min-width: map-get($breakpoints, "laptop")) {
    width: columns(4, 0px);
  }

  ::-webkit-scrollbar {
    display: block;
    border: 1px solid #fff;
    border-left: none;
    border-right: none;
  }

  /* Track */
  ::-webkit-scrollbar-track {
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
}

.commentLog {
  //the ul to the comment li s
  overflow-y: scroll;
  text-align: center;
  padding: 0 10px 0 0;
}

.comment {
  //comment li element
  list-style: none;
  //text-transform: uppercase;
  margin: 0 0 1rem 0; //gap between comment
  padding: 4.5% 7%;

  //set the image as a background for the border instead of the whole thing
  border-style: solid;
  border-image-source: url("~assets/images/neon-comment-bg.png");
  border-image-slice: 55;
  border-image-width: 28px;
  border-image-outset: 2px;
  @include effect-text-glow-white;
  @media (min-width: map-get($breakpoints, "tablet")) {
    padding: 1.3rem;
  }
}
</style>
