<template>
    <div>
      <h1>Calculated Ranking</h1>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Z</th>
            <th>Team</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in teams" :key="index">
            <td>{{ index+1 }}</td>
            <td>
                <RankingIcon :team="team" :index="index"/>    
            </td>
            <td>
              <router-link :to="{ name: 'TeamGames', params: { teamName: team.Team } }">
                {{ team.Team }}
              </router-link>
            </td>
            <td>{{ team.Rating_USAU }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
    
  <script>
import RankingIcon from './RankingIcon.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
props: ['teams'],
    created() {
        this.fetchTeamData();
    },
    components: {
        RankingIcon
    },
    methods: {
      ...mapActions(['setRanking']),
      ...mapGetters(['getRanking']),
        async fetchTeamData() {
            try {
                if(this.getRanking().length > 0) return;
                const response = await fetch('/api/ranking');
                const data = await response.json();
                this.setRanking(data)

            } catch (error) {
                console.error('Error fetching team data:', error);
            }
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
  
  router-link {
    color: #42b983;
    text-decoration: none;
  }
  
  router-link:hover {
    text-decoration: underline;
  }


  </style>
    