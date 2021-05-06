<template>
  <div class="footerContent"><!---->
    <a href="#" class="footerItem backToTop">back to top &#8593;</a>  
    <p class="footerItem copyright">&#169; copyright interactive media showcase 2021</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footerContent{
  font-family: "Montserrat", sans-serif;

  padding: 10vw 0 1vw 0;//top 10 bottom 1
  display:flex;
  justify-content: space-around;//
  align-items: flex-end;//sit on the bottom of box
  text-align: center;

  //Stuff that controls the image 
  min-height:80vh;
  background-image: url("~assets/images/minster.png");
  background-size: cover;
  background-position-x: center;
  background-repeat: no-repeat;
  //
  @media (max-width: map-get($breakpoints, "laptop")) {
    //owt smaller than a laptop, no minster background + shrink height to reduce gap
   background-image:none ;
   min-height:35vh;

   
  }
}

.footerItem{//Each footer item together - the p & a tag
  margin:1em;
  text-shadow: 0px 0px 10px  white;
  text-decoration: none;
}

//Each individual items specifically
.copyright{
  text-transform: capitalize;
}
.backToTop{
  text-transform: uppercase;
}
//--------------------------------
</style>
