<template>
  <main class="page">
    <h1 class="mb-0 text-h2 tablet:text-h1">Submissions</h1>
    <form method="post" @submit="handleSubmit" name="submit_project" class="mx-auto tablet:w-3/5" autocomplete="off" ref="submitForm">
      <h3 class="mt-1 text-h4 tablet:text-h3">About</h3>

      <!-- Title -->
      <div class="formField mb-1">
        <label class="formField__label" for="titleField" data-required>Title</label>
        <input type="text" name="project_title" autofocus id="titleField" required>
      </div>

      <!-- Description -->
      <div class="formField mb-1">
        <label class="formField__label" for="descriptionField" data-required>Description</label>
        <textarea name="project_description" id="descriptionField" rows="5" required></textarea>
        <span class="formField__caption">A description of the project, consider including what it does, why it was built, how successful it was etc.</span>
      </div>

      <!-- Tech Used -->
      <div class="formField mb-1">
        <label class="formField__label" for="techField">Tech used</label>
        <input type="text" name="project_tech" id="techField" placeholder="eg. Unity, C#, Blender">
        <span class="formField__caption">A comma-seperated list: eg. Unity, C#, Blender</span>
      </div>

      <!-- Content Warnings -->
      <div class="formField mb-1">
        <label class="formField__label" for="contentWarningsField">Content Warnings (if any)</label>
        <input type="text" name="project_contentWarnings" id="contentWarningsField">
      </div>

      <h3 class="mt-2 text-h4 tablet:text-h3">Creators</h3>
      <!-- Author names -->
      <MultiTextInput
        fieldName="project_authors"
        placeholder="Hammy the hamster"
        ref="authorsField"
        v-model="authors"
        required
      />

      <!-- Contact email -->
      <div class="formField mb-1">
        <label for="authorEmailField" class="formField__label" data-required>Contact email</label>
        <input type="email" name="author_email" id="authorEmailField" pattern="^[\w\.-]+@york\.ac\.uk$" required>
        <span class="formField__caption">A University of York email in case we need to contact you.</span>
      </div>

      <!-- Author year of study -->
      <div class="formField mb-1">
        <label class="formField__label" for="studyYearField" data-required>Year of study</label>
        <input type="number" max="4" value="1" name="project_authorStudyYear" id="studyYearField" required>
        <span class="formField__caption">If multiple authors, provide the years of </span>
      </div>

      <!-- Author links -->
      <div class="formField mb-1">
        <label for="authorLinksField" class="formField__label">Author links</label>
        <ol style="padding: 0">
          <li class="mb-1" v-for="(project, i) in authors" :key="i" style="display: flex;align-items:stretch">
            <input type="url" name="author_twitter" id="authorsField" class="w-2/5 mr-1" placeholder="Twitter username">
            <input type="url" name="author_linkedin" id="authorsField" class="w-2/5 mr-1" placeholder="LinkedIn username">
            <input type="url" name="author_portfolio" id="authorsField" class="w-2/5" placeholder="Portfolio url">
          </li>
        </ol>
        <span class="formField__caption">Add usernames for each author's social networks, and a url to their portfolio</span>
      </div>
      <h3 class="mt-2 text-h4 tablet:text-h3">Project</h3>

      <!-- Thumbnail -->
      <div class="formField mb-1">
        <label class="formField__label" for="thumbnailField" data-required>Thumbnail</label>
        <!-- Limited to web-compatible formats only -->
        <input type="file" name="project_thumbnail" id="thumbnailField" accept="image/jpeg,.png,.gif,.webp,.svg,.tiff,.bmp" required>
        <span class="formField__caption">Will be shown as the thumbnail for the project on the portfolio page.</span>
      </div>

      <!-- Media -->
      <div class="formField mb-1">
        <label class="formField__label" for="mediaField" data-required>Project Media</label>
        <input type="file" name="project_media" id="mediaField" accept=".pdf,.docx,.doc,video/*,image/*" multiple required>
        <span class="formField__caption">We recommend uploading at least one image or video which can be displayed on the portfolio page. <br> PDFs and MS Word documents are also supported</span>
      </div>

      <!-- Year developed -->
      <div class="formField mb-1">
        <label class="formField__label">Year developed</label>
        <span>
          <input class="mr-1" type="checkbox" name="project_yearConfirmation" id="yearConfirmationField" required>
          <label for="yearConfirmationField">"I confirm this project has been developed during the 2020-2021 academic year."</label>
        </span>
      </div>

      <!-- Social Media Promotion -->
      <div class="formField mb-1">
        <label class="formField__label" for="promotionConfirmationField">Social media promotion</label>
        <span>
          <input class="mr-1" type="checkbox" name="project_promotionConfirmation" id="promotionConfirmationField">
          <label for="promotionConfirmationField">"I do not want my project displayed on the IM Showcase social media accounts"</label>
        </span>
      </div>
      <button class="button button--blue" :disabled="isSubmitting">Submit</button>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      statusToast: null,
      isSubmitting: false,
      authors: [""]
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      let form = document.forms.submit_project;
      let fieldData = new FormData(form);

      this.isSubmitting = true;
      this.statusToast = this.$toast("Please wait...", {
        position: "top-center",
        timeout: false,
        draggable: false,
        // bad naming means these are technically true
        hideProgressBar: false,
        closeOnClick: false,
        closeButton: false,
      })

      //for every peice of media, send a request to the get-signed-url function
      //that function creates an asset in storyblok and returns a url we can post the file to.
      let thumbnailField = fieldData.get("project_thumbnail"), mediaField = fieldData.getAll("project_media");

      let isthumbnail = (file) => file.name === thumbnailField.name && file.size === thumbnailField.size && file.lastModified === thumbnailField.lastModified && file.type === thumbnailField.type;
      let nameFn = a => `${Date.now()}-${a.name}`;

      let nonDuplicates = mediaField.filter(file => !(isthumbnail(file)));

      let thumbnail, media = [];

      this.$toast.update(this.statusToast, { content: "Uploading thumbnail..." })
      try {
        thumbnail = await this.uploadAsset(thumbnailField, nameFn)
      } catch (err) {
        this.$toast.error("Failed to upload thumbnail.");
        console.error("Failed to upload thumbnail:", err);
        return;
      }
      this.$toast.success("Uploaded thumbnail.");

      // Upload media files
      this.$toast.update(this.statusToast, { content: "Uploading media files..." });
      try {
        for (let i = 0; i < nonDuplicates.length; i++) {
          await this.uploadAsset(nonDuplicates[i], nameFn)
          console.log("Uploaded media asset", i)
        }
      } catch (err) {
        this.$toast.error("Failed to upload media asset.");
        console.error("Failed to upload media asset: ", err);
        return;
      }
      this.$toast.success("Uploaded media assets.");

      if (mediaField.findIndex(isthumbnail) !== -1) {
        media.push(thumbnail);
      }

      console.log("Assets: ", thumbnail, media);

      this.$toast.update(this.statusToast, { content: "Creating project..." })

      let author = (a, i) => ({
        name: a,
        yearOfStudy: fieldData.get("project_authorStudyYear"),
        twitter: fieldData.getAll("author_twitter")[i],
        linkedin: fieldData.getAll("author_linkedin")[i],
        portfolio: fieldData.getAll("author_portfolio")[i],
      })

      // send a request to the create-project function with the form data

      let project;
      try {
        project = await this.$http.post("https://storyblok2021.netlify.app/.netlify/functions/create-project", {
          title: fieldData.get("project_title"),
          author: fieldData.getAll("project_authors").map(author),
          email: fieldData.get("author_email"),
          description: fieldData.get("project_description"),
          tech: fieldData.get("project_tech"),
          contentWarnings: fieldData.get("project_contentWarnings"),
          thumbnail,
          media,
          year: fieldData.get("project_yearConfirmation") === "on" ? true : false,
          promotion: fieldData.get("project_promotionConfirmation"),
        });
      } catch (err) {
        // this.$toast.error("Error submitting project!");
        this.$toast.update(this.statusToast, { content: "Failed to send project.", options: { type: "error", timeout: 9000 }});
        console.error("Error creating project:", err);
        return;
      }

      if (project.ok) {
        // this.$toast.success("Successfully submitted project!");
        this.$toast.update(this.statusToast, {
          content: "Successfully submitted project!.",
          options: {
            type: "success",
            draggable: true,
            timeout: 5000,
            // Again, bad names mean these are true
            hideProgressBar: false,
            closeOnClick: false,
          }
        });
        console.log("Project was ok!", await project.json());
      }
    },
    /**
     * Errors are unhandled, put this in a trycatch block
     * @param {File} file
     * @param {() => String} nameFn
     * @returns {Asset}
     */
    async uploadAsset(file, nameFn = () => file.name) {
      let formData = new FormData();
      let signed = await this.$http.$post("https://storyblok2021.netlify.app/.netlify/functions/get-signed-url", {
          filename: nameFn(file)
      });

      for (let key in signed.fields) {
        formData.append(key, signed.fields[key]);
      }

      formData.append("file", file);

      let resp = await this.$http.post(signed.post_url, formData, {
        clientTimeout: false,
      });

      if (!resp.ok) {
        this.$toast.error("Error: Hammy ate something important.")
        console.log(resp);
        throw Error("Response was not ok.")
      }

      let a = new Asset(signed.id, `https:${signed.pretty_url}`, file.type, file.size);
      a._shortname = file.name;
      a._public_url = signed._public_url;
      return a;
    },
  }
}

class Asset {
	constructor(id, filename, content_type, content_length, options = {
		alt: "",
		copyright: "",
		title: "",

		asset_folder_id: null,
		focus: null,
		ext_id: null
	}) {
		this.id = id,
    this.filename = filename,
    this.asset_folder_id = options.asset_folder_id,
    this.content_length = content_length,
    this.content_type = content_type,

    this._shortname = null;
		this._public_url = null;

		Object.assign(this, options);
	}
}
</script>

<style lang="scss" scoped>
$cols: 5;
</style>
