<template>
  <TeamGamesModified/>
  <div>
    <h1>All Games</h1>
    <table border="1">
      <thead>
        <tr>
          <th>id</th>
          <th>Team 1</th>
          <th>Score</th>
          <th>Team 2</th>
          <th>Tournament</th>
          <th>Date</th>
          <th>Counted</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in getAllGames" :key=index>
          <td>{{ game.Id_Game }}</td>
          <td>
            <router-link :to="{ name: 'TeamGames', params: { teamName: game.Team_1 } }">
              {{  game.Team_1 }}
            </router-link>
          </td>
          <td>
            <div v-if="!game.isEditing">
              <span @click="editScore(game)">{{ game.Score_1 }} - {{ game.Score_2 }}</span>
            </div>
            <div v-else>
              <input 
                v-model="game.Score_1" 
                type="number" 
                style="width: 40px;"
                @blur="saveScore(game)"
                ref="score11"
              >
              <span> - </span>
              <input 
                v-model="game.Score_2" 
                type="number" 
                style="width: 40px;"
                @blur="saveScore(game)"
                ref="score2"
              >
            </div>
          </td>
          <td>
            <router-link :to="{ name: 'TeamGames', params: { teamName: game.Team_2 } }">
              {{  game.Team_2 }}
            </router-link>
          </td>
          <td>{{ game.Tournament }}</td>
          <td>{{ game.Date }}</td>
          <td @click="flipResult(game)">
            {{ game.Counted ? 'YES' : 'NO' }}
          </td>
        </tr>
      </tbody>
    </table>

  </div>
    
  </template>
  
  <script>
import TeamGamesModified from './TeamGamesModified.vue';
import { mapActions, mapGetters } from 'vuex';
import { editScore, flipResult, handleClickOutside, saveGame, saveScore } from '@/utils/edit';

export default {
  components: {
    TeamGamesModified,
  },
  props: ['teamName'],
  data() {
    return {
      games: [],
    };
  },
  created() {
      this.fetchAllGames();
  },
  computed: {
    ...mapGetters(['getGames']),
    getAllGames() {
      console.log('here')
      return this.getGames;
    },
  },
  watch: {
    $route(to, from) {
      if (to.params.teamName !== from.params.teamName) {
        console.log(this.teamName)
        this.fetchTeamGames();
      }
    }
  },
  methods: {
    editScore,
    saveScore,
    saveGame,
    flipResult,
    handleClickOutside,
    ...mapActions(['updateGame', 'setGames']),
    ...mapGetters(['getDivision']),
    storeUpdateGame(game) {
      console.log('updating game in all games')
      this.updateGame(game);
    },
    async fetchAllGames() {
      try {
        const response = await fetch('/api/games?division='+this.getDivison());
        const data = await response.json();
        this.games = data;
        this.setGames(this.games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },
  },

};

</script>
  
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

  </style>
  