import { createStore } from 'vuex';

const store = createStore({
    state: {
      division: 'mixed',
      modifiedGames: [],
      games: [],
      ranking: []
    },
    mutations: {
      REMOVE_MODIFIED_GAME(state, gameId) {
        console.log(state.games[0])
        state.modifiedGames = state.modifiedGames.filter(game => game.Id_Game !== gameId);
      },
      MODIFY_GAME(state, updatedGame) {
        const index = state.modifiedGames.findIndex(game => game.Id_Game === updatedGame.Id_Game);
        if (index !== -1) {
          state.modifiedGames.splice(index, 1, updatedGame);
        } else {
          state.modifiedGames.push(updatedGame);
        }
      },
      SET_GAMES(state, games) {
        state.games = games;
      },
      SET_RANKING(state, ranking) {
        state.ranking = ranking;
      },
      SET_DIVISION(state, div) {
        state.division = div;
      }
    },
    actions: {
      removeGame({ commit }, gameId) {
        commit('REMOVE_MODIFIED_GAME', gameId);
      },
      updateGame({ commit }, updatedGame) {
        commit('MODIFY_GAME', updatedGame);
      },
      setGames({ commit }, games) {
        commit('SET_GAMES', games);
      },
      setRanking({ commit }, ranking) {
        commit('SET_RANKING', ranking);
      },
      setDivision({ commit }, div) {
        commit('SET_DIVISION', div);
      }
    },
    getters: {
      modifiedGames: (state) => state.modifiedGames,
      getModifiedGameById: state => id => state.modifiedGames.get(id),
      getGames: (state) => state.games,
      getDivision: (state) => state.division,
      getRanking: (state) => state.ranking,
      getRankingNumberByTeam: state => teamName => {
        const t = state.ranking.findIndex(team => team.Team === teamName);
        console.log('ranking', t)
        return t;
      },
      getRankingUSAUByTeam: state => teamName => {
        const t = state.ranking.find(team => team.Team === teamName)
        return t.Rating_USAU;
      }

    },
  });

export default store;