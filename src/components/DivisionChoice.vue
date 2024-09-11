<template>
    <div>
      <label for="category">Division:</label>
      <select id="category" v-model="selectedCategory">
        <option value="mixed">Mixed</option>
        <option value="open">Open</option>
        <option value="women">Women</option>
      </select>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        selectedCategory: 'mixed',
      };
    },
    methods: {
      ...mapActions(['setDivision']),
      emitCategory() {
        this.setDivision(this.selectedCategory);
        this.$emit('categorySelected', this.selectedCategory);
      },
    },
    watch: {
      selectedCategory() {
        this.emitCategory();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  label {
    margin-right: 8px;
  }
  
  select {
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  </style>
  