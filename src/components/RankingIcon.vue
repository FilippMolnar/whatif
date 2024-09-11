<template>
    <div>
      <!-- Conditionally display SVG icons based on the ranking comparison -->
        <svg v-if="iconType === 0" data-v-09fff935="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="icon text-info" style="transform-origin: 0.4375em 0.5em;"><g data-v-09fff935="" transform="translate(224 256)" class=""><g data-v-09fff935="" transform="translate(0, 0)  scale(0.8125, 0.8125)  rotate(0 0 0)" class=""><path data-v-09fff935="" fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" transform="translate(-224 -256)" class=""></path></g></g></svg>
        <svg v-else-if="iconType > 0" data-v-09fff935="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="icon text-success" style="transform-origin: 0.4375em 0.5em;"><g data-v-09fff935="" transform="translate(224 256)" class=""><g data-v-09fff935="" transform="translate(0, 0)  scale(0.8125, 0.8125)  rotate(0 0 0)" class=""><path data-v-09fff935="" fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" transform="translate(-224 -256)" class=""></path></g></g></svg>
        <svg v-else-if="iconType < 0" data-v-09fff935="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="icon text-danger" style="transform-origin: 0.4375em 0.5em;"><g data-v-09fff935="" transform="translate(224 256)" class=""><g data-v-09fff935="" transform="translate(0, 0)  scale(0.8125, 0.8125)  rotate(0 0 0)" class=""><path data-v-09fff935="" fill="currentColor" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z" transform="translate(-224 -256)" class=""></path></g></g></svg>
        <span v-if="iconType !== 0" class="icon-text">{{ Math.abs(iconType) }}</span>
    </div>
  </template>
  
  <script>
import { mapGetters } from 'vuex';
export default {
    name: 'RankingIcon',
    props: ['team', 'index'],
    computed: {
      ...mapGetters(['getRankingNumberByTeam']),
      originalRanking() {
        return this.$store.state.original_ranking;
      },
      iconType() {
        const teamName = this.team.Team;
        const rankingNumber = this.getRankingNumberByTeam(teamName)
        return rankingNumber - this.index;
      },
    },
  };
  </script>
  
<style scoped>
.text-danger {
    color: #ed5314 !important;
}
.text-success {
    color: #2cb300 !important;
}
.text-info {
    color: #6c757d !important;
}
.icon {
  display: inline-block;
  vertical-align: middle;
  width: 0.8em;
  height: 1em;
}

.icon-text {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.1em; /* Adjust as needed for spacing */
}
  </style>
  