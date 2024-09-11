<template>
    <!-- <div v-if="getModifiedGames.length > 0"> -->
    <div>
      <h3>Modified games</h3>
      <table border="1">
        <thead>
          <tr>
            <th>X</th>
            <th>id</th>
            <th>Counted</th>
            <th>Team 1</th>
            <th>Score</th>
            <th>Team 2</th>
            <th>Tournament</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in getModifiedGames" :key=index>
            <td @click="removeModifiedGame(game)">X</td>
            <td>{{ game.Id_Game }}</td>
            <td @click="flipResult(game)">
              {{ game.Counted ? 'YES' : 'NO' }}
            </td>
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
           </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import { editScore, flipResult, handleClickOutside, saveGame, saveScore } from '@/utils/edit';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'TeamGamesModified',
  props: ['teamName'],
  data() {
    return {
      games: []
    };
  },
  created() {
    this.fetchTeamGames();
  },
  computed: {
    ...mapGetters(['modifiedGames']),
    getModifiedGames() {
      console.log('here')
      return this.modifiedGames;
    },
  },
  methods: {
    editScore,
    saveScore,
    saveGame,
    flipResult,
    handleClickOutside,
    ...mapActions(['updateGame', 'removeGame']),
    removeModifiedGame(game){
      this.removeGame(game.Id_Game);
    },
    storeUpdateGame(game) {
      this.updateGame(game);
    },
    fetchTeamGames() {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('game:'));
      const games_data = []
      for(const k of keys){
        const game = JSON.parse(localStorage.getItem(k));
        if(game.SwithTeams){
            game.SwithTeams = !game.SwithTeams;
            const t1 = game.Team_1;
            const s1 = game.Score_1;
            game.Team_1 = game.Team_2; 
            game.Team_2 = t1; 
            game.Score_1 = game.Score_2; 
            game.Score_2 = s1; 
        }
        const entry = {
            "Team_1": game.Team_1,
            "Team_2": game.Team_2,
            "Score_1": game.Score_1,
            "Score_2": game.Score_2,
            "Date": game.Date,
            "Tournament": game.Tournament,
            "Id_Game": game.Id_Game
        };
        games_data.push(entry);
      }
      this.games = games_data;
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
  