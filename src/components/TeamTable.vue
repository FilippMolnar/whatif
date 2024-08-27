<template>
    <div>
      <h1>Team Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Team</th>
            <th>Rating</th>
            <th>Record (W-L)</th>
            <th>Tournaments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in teams" :key="index">
            <td>{{ index }}</td>
            <td>
              <router-link :to="{ name: 'TeamGames', params: { teamName: team.Team } }">
                {{ team.Team }}
              </router-link>
            </td>
            <td>{{ team.Rating_USAU }}</td>
            <td>{{ team.Wins }} - {{ team.Losses }}</td>
            <td>{{ team.Tournaments }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        teams: [],
      };
    },
    created() {
      this.fetchTeamData();
    },
    methods: {
      async fetchTeamData() {
        try {
          const response = await fetch('/api/ranking');
          const data = await response.json();
          this.teams = data;
        } catch (error) {
          console.error('Error fetching team data:', error);
        }
      }
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

router-link {
  color: #42b983;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
  