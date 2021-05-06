<template>
  <main class="page">
    <form id="contactForm" class="mx-auto tablet:w-3/5" name="contact" method="POST" data-netlify="true">
      <h1>Contact Us</h1>
      <p>If you have any inquiries please contact us via the form below or through our social media</p>
      <div class="formField">
        <label class="formField__label" for="nameField">Your Name</label>
        <input type="text" placeholder="Type Here" name="name" id="nameField" />
        <img src="/input-underline.svg" width="106%" class="underline">
      </div>
      <div class="formField">
        <label class="formField__label" for="emailField">Your Email Address</label>
        <input type="text" placeholder="Type Here" name="email" id="emailField" />
        <img src="/input-underline.svg" width="106%" class="underline">
      </div>
      <div class="formField">
        <label class="formField__label" for="messageField">Type a Message</label>
        <textarea name="message" placeholder="Type Here" id="messageField" cols="30" rows="10" />
        <img src="/input-underline.svg" width="106%" class="underline">
      </div>
      <button type="submit" class="button button--blue mt-1">Submit</button>
    </form>
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss">
#contactForm {
  // margin: 5% auto;
  // // width: columns(12, 0px);
  // display: flex;
  // flex-direction: column;
  // text-align: center;

  // .form__field {
  //   margin-bottom: 16px;
  //   &:last-of-type {
  //     margin-bottom: 20px
  //   }
  // }

  // label {
  //   text-align: left;
  // }
  //anything that needs to be stacked
  // input, label, textarea {
  //   display: block;
  //   width: 100%;
  // }
  // .button {
  //   margin: 0 auto;
  // }
  .underline {
    position: relative;left:-3%;top:-3%
  }
}
</style>
