<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Ranking</router-link>
      </nav>
      
    </header>
    <div class="calculate-container">
        <button @click="calculate" class="calculate-button">Calculate</button>
      </div>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { calculate } from './utils/calculate';

export default {
  name: 'App',
  methods: {
    calculate
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
</style>