<template>
  <div class="countdown">
    <div class="countdown__numbers" v-if="blok && blok.deadline">
      <img
				v-for="(n, i) in images()"
				:key="i"
				:src="n"
			/>
    </div>
    <h3 class="countdown__heading">{{(timeleft / (1000 * 60 * 60)) &lt; 24 ? 'Hours' : 'Days'}} until showcase</h3>
    <p>This year's showcase starts on <b>{{formattedDeadline}}</b> and runs for <b>{{blok.duration}}</b></p>
    <a
			target="_blank"
			href="https://calendar.google.com/event?action=TEMPLATE&tmeid=MXRmZWlhc2FqdGJxZTljbWViMzVqcW5jM2EgZGNncnNzdmpwdGk4ZDNubHBmNG41dGM2MTRAZw&tmsrc=dcgrssvjpti8d3nlpf4n5tc614%40group.calendar.google.com"
			>Add to Calendar</a
		>
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        required: true
      },
    },
    computed: {
      formattedDeadline() {
        return new Date(this.blok.deadline).toLocaleDateString("en-GB", {
          weekday: this.blok.weekday_format,
          day: this.blok.day_format,
          month: this.blok.month_format
        })
      }
    },
    methods: {
      numbers() {
        let days = Math.floor(this.timeleft / (1000 * 60 * 60 * 24)),
            hours = Math.floor(this.timeleft / (1000 * 60 * 60));
        // Return the numbers in a string array
        return (hours < 24 ? hours : days).toString().split("");
      },
      images() {
        // Import the image for each number
        return this.numbers().map(n => require("@/assets/images/numbers/" + n + ".png"))
      }
    },
    data() {
      return {
        timeleft: new Date(this.blok.deadline).getTime() - new Date().getTime(),
      }
    },
    created() {
      let countdown = setInterval(() => {
        this.timeleft = new Date(this.blok.deadline).getTime() - new Date().getTime()
        console.log("Congratulations! You left the tab open overnight! 🎉");
        if (this.timeleft <= 0) {
          clearInterval(countdown);
          this.timeleft = 0;
        }
      }, 1000 * 60 * 60)
    },
    mounted() {
      let countdown = setInterval(() => {
        this.timeleft = new Date(this.blok.deadline).getTime() - new Date().getTime()
        console.log("Congratulations! You left the tab open overnight! 🎉");
        if (this.timeleft <= 0) {
          clearInterval(countdown);
          this.timeleft = 0;
        }
      }, 1000 * 60 * 60)
    }
  }
</script>

<style lang="scss">
.countdown {
  margin: 1rem;
  a {
    font-family: "Orbitron", sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    font-size: .9rem
  }
  &__heading {
    margin-top: 1rem;
  }
  &__numbers {
    display: flex;
    justify-content: center;
    img {
      max-height: 140px;
      max-width: percentage(1/3);
    }
  }
}
</style>
