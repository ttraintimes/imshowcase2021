<template>
  <main class="page">
    <div class="memberPopUp" v-if="!closed">
      <button class="closePopUp" v-on:click="closed = true">×</button>
      <img v-bind:src="`${image}`" v-bind:alt="'Photo of '+ name" />
      <div class="memberInfo">
        <h4 class="name">{{ name }}</h4>
        <h5>Role: {{ role }}</h5>
        <h5>Year: {{ year }}</h5>
        <ul>
          <li v-if="linkedin">
            <a
              v-bind:href="'https://www.linkedin.com/in/' + linkedin"
              target="_blank"
              ><img
                class="socialIcon"
                src="@/assets/images/linkedinicon.png"
                alt=""
              />Linkedin</a
            >
          </li>
          <li v-if="twitter">
            <a
              v-bind:href="'https://www.twitter.com/' + twitter"
              target="_blank"
              ><img
                class="socialIcon"
                src="@/assets/images/twitter.png"
                alt=""
              />Twitter</a
            >
          </li>
          <li v-if="portfolio">
            <a v-bind:href="portfolio" target="_blank"
              ><img
                class="socialIcon"
                src="@/assets/images/globe.png"
                alt=""
              />Portfolio</a
            >
          </li>
        </ul>
      </div>
    </div>
    <section class="teamSection" v-for="(team, i) of teams" :key="i">
      <h4 class="section__title">
        <a :id="`${i.toLowerCase()}`"></a> {{ i | capitalize }}
      </h4>
      <div class="grid">
        <PersonCard
          :blok="member.content"
          v-for="member in team"
          :key="member.content._uid"
          class="column column--tablet-4 margin-r margin-b"
          v-on:click.native="closed = false"
          v-on:person-clicked="personClicked"
        />
      </div>
      <!-- <pre style="text-align:left;">{{team}}</pre> -->
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      teams: {},
      closed: true, //whether popup is open or closed
      name: "",
      role: "",
      year: "",
      image: "",
      linkedin: "",
      twitter: "",
      portfolio: "",
    };
  },
  filters: {
    capitalize(v) {
      if (!v) return "";
      v = v.toString();
      return v.charAt(0).toUpperCase() + v.slice(1);
    },
  },
  async fetch() {
    let members = [];
    let paginate = (page = 1) =>
      this.getMembers(page).then((res) => {
        members.push(...res.data.stories);
        if (
          res.total > res.perPage &&
          page <= Math.ceil(res.total / res.perPage)
        )
          paginate(page + 1);
      });

    await paginate();

    let teams = new Object();

    members.forEach((member) => {
      console.log(member.content.name, member.content.team);
      member.content.team.forEach((t) => {
        if (!teams.hasOwnProperty(t) || !(teams[t] instanceof Array))
          teams[t] = new Array();
        teams[t].push(member);
      });
    });

    // TODO: sorting isn't quite done but some people are a bit wierd. the function should work but not right now so try editing the people in storyblok
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    for (let t in teams) {
      //sort team members from highest to lowest
      //  teams[t] = teams[t].sort((m1, m2) => (m1.content.sort_no || 0) < (m2.content.sort_no || 0))
      teams[t].join();
      teams[t].sort();
    }

    this.teams = teams;
  },
  methods: {
    /** @returns Promise */
    async getMembers(page = 1) {
      let res = this.$storyapi.get("cdn/stories/", {
        starts_with: "committee-members/",
        per_page: 100, //get as many results per request as possible.
        page,
        sort_by: "content.sort_no:desc,content.team:asc",
      });
      return res;
    },
    personClicked(name, role, year, image, linkedin, twitter, portfolio) {
      console.log("Handling click");
      this.name = name;
      this.role = role;
      this.year = year;
      this.image = image;
      this.linkedin = linkedin;
      this.twitter = twitter;
      this.portfolio = portfolio;
    },
  },
};
</script>

<style lang="scss">
.section__title {
  text-align: left;
  padding-left: 1rem;
  border-left: 2px solid $color-neon-blue;
}
.name {
  padding: 0.5em;
  border-style: solid;
  border-image-slice: 18%;
  border-image-outset: 8px;
  border-image-width: 18px;
  border-width: 1px;
  border-image-source: url("@/assets/images/person-name-border.svg");
  word-break: keep-all;
}
.memberPopUp {
  position: fixed;
  margin: auto; /* Will not center vertically and won't work in IE6/7. */
  width: 800px;
  max-width: 80vw;
  height: 6000px;
  height: auto;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.938);
  border: 1px solid white;
  border-radius: 7px;
  box-shadow: 0 0 10px #9ecaed;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  //grid-auto-rows: minmax(100px, auto);
}

.memberPopUp img {
  margin: auto;
  width: 400px;
  max-width: 90%;
  grid-column-start: 1;
}
.memberInfo {
  grid-column-start: 2;
  margin: 1em;
}
.memberInfo h5,
h4 {
  margin: 1em;
}
.memberInfo ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.memberInfo li{
display: flex;
align-content: center;
justify-content: center;
margin: auto;
}

.memberInfo a {
  text-decoration: none;
  font-family: Orbitron;
  font-size: 20px;
}
.closePopUp {
  align-self: end;
  margin: auto;
  margin-right: 0;
  grid-column-start: 2;
  background: none;
  border: none;
  color: white;
  text-align: center;
  font-size: 4em;
  width: 20%;
  cursor: pointer;
}
.closePopUp:hover {
  color: rgb(241, 241, 241);
}
.socialIcon {
  width: 40px !important;
  margin-right:1em!important;
}

PersonCard {
  cursor: pointer;
}
</style>
