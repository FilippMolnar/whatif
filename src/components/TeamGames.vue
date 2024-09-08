<template>
    <TeamGamesModified/>
    <div>
      <h1>Games for {{ teamName }}</h1>
      <button @click="clearLocalStorage">Clear Local Storage</button>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>Opponent</th>
            <th>Result</th>
            <th>Score</th>
            <th>Tournament</th>
            <th>Date</th>
            <th>Counted</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in games" :key=index>
            <td>
              {{ game.Id_Game }}
            </td>
            <td>
              <router-link :to="{ name: 'TeamGames', params: { teamName: game.Team_2 } }">
                {{  game.Team_2 }}
              </router-link>
            </td>
            <td>{{ game.Score_1 > game.Score_2 ? "WIN" : "LOSS" }}</td>
            <td>
            <div v-if="!game.isEditing">
              <span @click="editScore(game)">{{ game.Score_1 }} - {{ game.Score_2 }}</span>
            </div>
            <div v-else>
              <input 
                v-model="game.Score_1" 
                type="number" 
                style="width: 35px;"
                @blur="saveScore(game)"
                ref="scoreSelected"
              >
              <span> - </span>
              <input 
                v-model="game.Score_2" 
                type="number" 
                style="width: 35px;"
                @blur="saveScore(game)"
                ref="scoreOpponent"
              >
            </div>
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
import { mapActions } from 'vuex';

  export default {
    components: {
      TeamGamesModified,
    },
    props: ['teamName'],
    data() {
      return {
        games: []
      };
    },
    created() {
      this.fetchTeamGames();
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
      async fetchTeamGames() {
        try {
          const response = await fetch(`/api/team-games?team=${this.teamName}`);
          const data = await response.json();
          this.games = [];
          for (let game of data) {
            game.SwithTeams = false;
            const local_storage_game = JSON.parse(localStorage.getItem(game.Id_Game));
            if(local_storage_game !== null){
              game = local_storage_game;
            }
            if(this.teamName !== game.Team_1){
              game.SwithTeams = !game.SwithTeams;
              const t1 = game.Team_1;
              const s1 = game.Score_1;
              game.Team_1 = game.Team_2; 
              game.Team_2 = t1; 
              game.Score_1 = game.Score_2; 
              game.Score_2 = s1; 
            }
            this.games.push(game);
          }
          console.log(this.games)
        } catch (error) {
          console.error('Error fetching games data:', error);
        }
      },
      clearLocalStorage() {
      localStorage.clear();
      console.log("Local storage has been cleared!");
    },
    editScore(game) {
      game.isEditing = true;
    },
    saveScore(game){

        game.isEditing = false;
        this.saveGame(game);
    },
    flipResult(game) {
      game.Counted = !game.Counted;
      this.saveGame(game);
    },
    saveGame(game){
      localStorage.setItem('game:'.concat(String(game.Id_Game)), JSON.stringify(game));
      this.saveUpdateGame(game)

    },  
    handleClickOutside(event) {
      this.games.forEach(game => {
        if (game.isEditing) {
          const scoreTeam1Input = this.$refs.Score_1;
          const scoreTeam2Input = this.$refs.Score_2;

          if (
            scoreTeam1Input && 
            !scoreTeam1Input.contains(event.target) &&
            scoreTeam2Input &&
            !scoreTeam2Input.contains(event.target)
          ) {
            this.saveGame(game);
          }
        }
      });
    },
    ...mapActions(['updateGame']),
    saveUpdateGame(game) {
      console.log('updating game TG')
      this.updateGame(game);
    },
  }
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
  