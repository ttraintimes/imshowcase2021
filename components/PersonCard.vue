<template>
  <div v-editable="blok" class="personCard" :data-name="blok.name" v-on:click="getMember(`${blok.name}`,`${blok.role}`,`${blok.year}`,`${blok.image.filename}`,`${blok.linkedin}`,`${blok.twitter}`,`${blok.portfolio.url}`)">
    <!-- <span class="personCard__nameWrapper">
			<span class="personCard__name">{{ blok.name }}</span>
		</span> -->
    <!-- <div class="personCard___imageWrapper"> -->
    <div class="personCard__inner">
      <img
        class="personCard__image"
        src="@/assets/images/avatar-placeholder.png"
        :alt="`Photo of ${blok.name}`"
        v-if="!blok.image || !blok.image.filename"
      />
      <img
        class="personCard__image"
        :src="blok.image.filename"
        v-lazy="resize(blok.image.filename, '330x330')"
        :alt="blok.image.alt || `Photo of ${blok.name}`"
        v-else
      />
      <h5 class="personCard__title">{{ blok.name }}</h5>
      <p class="personCard__role">{{ blok.role }}</p>

    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
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
    getMember(name,role,year,image,linkedin,twitter,portfolio){//this is just to send the member to the team.vue page
      console.log(
      "Person clicked: \n"+
      "Name: "+name+
      "\nRole: "+role+
      "\nYear: "+year+
      "\nImage: "+image+
      "\nLinkedIn: "+linkedin+
      "\nTwitter: "+twitter+
      "\nPortfolio: "+portfolio);
      this.$emit("person-clicked",name,role,year,image,linkedin,twitter,portfolio);
    }
  },
};
</script>

// TODO: maybe improve how role and title are positioned, probably don't need relative position
<style lang="scss" scoped>
.personCard {
  cursor: pointer;
  // position: relative;
  padding-right: 20px;
  // &__imageWrapper {
  //   //keeps aspect ratio
  //   position: relative;
  //   width: 100%;
  //   padding-top: 100%;
  // }
  &__inner {
    position: relative;
  }
  &__title {
    position: relative;
    top: 1rem;
    right: -2rem;
    margin: 0;
    font-weight: 600;
    max-width: 80%;
    z-index: 1;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      display: block;
      border-style: solid;
      border-image-slice: 18%;
      border-image-outset: 8px;
      border-image-width: 18px;
      border-width: 1px;
      border-image-source: url("@/assets/images/person-name-border.svg");

      position: absolute;
      box-sizing: content-box;
      padding: 10px;
      top: -11px;
      left: -11px;
      z-index: -1;
    }
  }
  &__image {
    min-height: 100%;
    width: 100%;
    height: 330px;

    object-fit: cover;
    object-position: center center;
  }
  &__role {
    position: relative;
    top: 2rem;
  }
  // &__nameWrapper {
  // position: absolute;
  // right: -20px;
  // top: -10px;

  // width: 210px;
  // min-height: 50px;
  // max-height: 70px;
  // border-image-source: url("@/assets/images/person-name-border.svg");
  // border-image-slice: 18%;
  // border-image-outset: 11px;
  // border-image-width: 24px;
  // display: flex;
  // // align-items: center;
  // text-align: center;
  // padding: 11px;
  // z-index: 1;
  // }
  // &__name {
  // 	font-family: "Orbitron", monospace;
  // 	font-weight: 600;
  // 	margin: 0 auto;
  // 	font-size: 1.125rem;
  // 	line-height: 24px;
  // }
}
</style>
