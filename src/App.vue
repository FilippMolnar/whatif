<template>
  <div id="app">
    <header class="header">
      <nav>
        <router-link to="/">Ranking</router-link>
      </nav>
      <nav>
        <router-link to="/games">Games</router-link>
      </nav>
      <div>
        <DivisionChoice @categorySelected="handleDivisionSelected" />
      </div>
      
    </header>
    <div class="calculate-container">
      <div>
        <button @click="calculateRanking" class="calculate-button">{{ calculating ? 'Calculating...' : 'Calculate' }}</button>
      </div>
      <div>
        <button @click="toggleExpand"> {{ isExpanded ? 'Hide Ranking' : 'Show Ranking' }}</button>      
      </div>
    </div>
    <main>
      <div class="container">
        <div class="games-section" :class="{ expanded: isExpanded }">
          <router-view></router-view>
        </div>
        <div v-if="isExpanded" class="updated-rating-section">
          <CalculatedRanking :teams="this.teams"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { calculate } from './utils/calculate';
import CalculatedRanking from './components/CalculatedRanking.vue';
import store from './store/index.js'; // Adjust the path based on your project structure
import DivisionChoice from './components/DivisionChoice.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      calculating: false,
      isExpanded: false,
      teams: [],
      division: 'mixed',
    };
  },
  created() {
    this.fetchRanking();
    this.fetchAllGames();
  },
  components: {
    CalculatedRanking,
    DivisionChoice
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    handleDivisionSelected(div) {
      this.division = div;
      this.fetchRanking();
      this.fetchAllGames();
    },
    ...mapActions(['setRanking', 'setGames']),
    ...mapGetters(['getDivision']),
    async fetchRanking() {
      try {
        console.log('fetching ranking')
        const response = await fetch('/api/ranking?division='+this.division);
        const data = await response.json();
        this.teams = data;
        this.setRanking(this.teams);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    },
    async fetchAllGames() {
      try {
        console.log('fetching all games')
        const response = await fetch('/api/games?division='+this.division);
        const data = await response.json();
        this.games = data;
        this.setGames(this.games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },
    async calculateRanking(){
      this.calculating = true;
      const games = store.state.modifiedGames;
      const calculatedRanking = await calculate(games, this.getDivision());
      this.teams = calculatedRanking;
      this.calculating = false;
    },

  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #42b983;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distributes space between the items */
  padding: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}

.calculate-container {
  margin-top: 30px;
}

.calculate-button {
  padding: 20px 40px;
  font-size: 24px;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calculate-button:hover {
  background-color: #36a372;
}
.container {
  display: flex;
  height: 100vh;
  position: relative;
}

.games-section {
  flex: 1;
  padding: 20px;
  /* transition: flex 0.3s ease-in-out; */
}

.games-section.expanded {
  flex: 4;
}

.updated-rating-section {
  flex: 2;
  padding: 20px;
  border-left: 1px solid #ddd;
  /* transition: all 0.3s ease-in-out; */
}

.expand-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.expand-button:hover {
  background-color: #0056b3;
}
</style>