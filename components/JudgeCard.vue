<template>
  <div v-editable="blok" class="judgeCard" :data-name="blok.name">
    <div class="judges_holder">
      <div class="img_holder">
        <img :src="blok.image.filename" v-lazy="resize(blok.image.filename, '280x330')"
          :alt="blok.image.alt || `Photo of ${blok.name}`" />
      </div>
      <div class="judge">
        <h4 class="judge_name">{{ blok.name }}</h4>
        <h5 class="judge_position">{{ blok.job_position }}</h5>
        <div class="judge_body">
          <p>{{ blok.description }}</p>
        </div>
        <!-- 
          Need to define social media links in storyblok
        -->
        <ul>
          <li>
            <a v-bind:href="'https://www.linkedin.com/in/' + linkedin" target="_blank"><img class="socialIcon"
                src="@/assets/images/linkedinicon.png" alt="" /><span id="socialtext">Linkedin</span></a>
          </li>
          <li>
            <a v-bind:href="'https://www.twitter.com/' + twitter" target="_blank"><img class="socialIcon"
                src="@/assets/images/twitter.png" alt="" /><span id="socialtext">Twitter</span></a>
          </li>
          <li>
            <a v-bind:href="website" target="_blank"><img class="socialIcon" src="@/assets/images/globe.png"
                alt="" /><span id="socialtext">Website</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['blok'],
    methods: {
      /**
       * @param {String} image
       * @param {String} option
       */
      resize(image, option) {
        var imageService = "https://img2.storyblok.com/";
        let path = image.replace("https://a.storyblok.com", "");
        return imageService + option + path;
      },
    },
  }

</script>

<style lang="scss" scoped>
  $judge-height: 12em;
  $judge-width: 22em;

  .judgeCard {
    cursor: pointer;
  }

  .judges_holder {
    display: flex;
    border-style: hidden;
    margin-bottom: 6em;
    margin-top: 2em;

    @media (max-width: map-get($breakpoints, "laptop")) {
      display: block;
      border-style: solid;
      border-image-source: url("@/assets/images/judge-border.png");
      border-image-slice: 20;
      border-image-width: 10px;
      border-image-outset: 7px;
    }
  }

  .judge {
    margin: auto;
    margin-bottom: 4em;
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    min-width: $judge-width;
    min-height: $judge-height;
    //border: 4px solid red;
    padding: 1rem;

    background: url("~assets/images/judge_background.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center bottom;

    @media (max-width: map-get($breakpoints, "laptop")) {
      background: none;
      margin-bottom: 1rem;
      margin-left: 0;
    }
  }

  .judge h4 {
    text-align: left;
    margin-top: -3.3rem;
    margin-left: -1rem;

    @media (max-width: map-get($breakpoints, "laptop")) {
      margin-left: 0;
      margin-top: -25rem;
    }
  }

  .judge h5 {
    text-align: right;
    margin-top: -3rem;

    @media (max-width: map-get($breakpoints, "laptop")) {
      text-align: left;
      margin-top: -1rem;
    }
  }

  .judge p {
    max-height: $judge-height;
    overflow-y: auto;
    max-width: 85%; //stops scrollbar clipping border image
    text-align: center;
    @media (min-width: map-get($breakpoints, "tablet")) {
      max-width: 95%;
      text-align: left;
    }
  }

  .judge_body {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    //justify-content: left;

    @media (max-width: map-get($breakpoints, "laptop")) {
      position: absolute;
      margin-top: -0.5rem;
    }
  }

  .img_holder {
    //min-width: 18em;
    overflow: hidden;
  //  display: flex;
    justify-self: center;
    align-self: center;

    @media (min-width: map-get($breakpoints, "laptop")) {
      min-width: 18rem;
      margin-top: -6rem;
    }
  }

  //.img_holder img {
  //  margin-top: 0;
   // object-fit: cover;
   // display: flex;
 // }

  .judges_holder ul {
    display: flex;
    list-style: none;
    padding: 1rem 0;
    padding-top: 0;
    margin: 0;

    @media (max-width: map-get($breakpoints, "laptop")) {
      display: block;
      text-align: right;
      margin-right: 1rem;
    }
  }

  .judges_holder li {
    margin: auto;
  }

  .judges_holder a {
    text-decoration: none;
    font-family: Orbitron;
    font-size: 20px;

    @media (max-width: map-get($breakpoints, "laptop")) {
      #socialtext {
        display: none;
      }
    }
  }
  .judges_holder ul img {
    width: 40px;
  }

</style>
