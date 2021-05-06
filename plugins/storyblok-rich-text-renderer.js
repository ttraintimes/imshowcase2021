import Vue from "vue";
import VueRichTextRenderer from "@marvr/storyblok-rich-text-vue-renderer";
import LinkButton from "@/components/LinkButton.vue";

// https://storyblok-rich-text-renderer.netlify.app/vue-plugin/examples/#render-custom-components
Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      "link-button": LinkButton
    }
  }
});
