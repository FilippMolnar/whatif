import { createStore } from 'vuex';

const store = createStore({
    state: {
      sharedData: 'Initial Data',
      modifiedGames: [],
      games: []
    },
    mutations: {
      REMOVE_MODIFIED_GAME(state, gameId) {
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
      }
    },
    getters: {
      modifiedGames: (state) => state.modifiedGames,
      getModifiedGameById: state => id => state.modifiedGames.get(id)
    },
  });

export default store;