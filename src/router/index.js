import { createRouter, createWebHistory } from 'vue-router';
import TeamTable from '../components/TeamTable.vue';
import TeamGames from '../components/TeamGames.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TeamTable
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
