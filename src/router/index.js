import { createRouter, createWebHistory } from 'vue-router';
import TeamTable from '../components/TeamRanking.vue';
import TeamGames from '../components/TeamGames.vue';
import AllGames from '@/components/AllGames.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TeamTable
  },
  {
    path: '/games',
    name: 'games',
    component: AllGames
  },
  {
    path: '/team/:teamName/games',
    name: 'TeamGames',
    component: TeamGames,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
