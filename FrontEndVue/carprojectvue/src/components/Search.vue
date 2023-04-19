
<template>
    <form @submit.prevent="searchProducts" class="searchForm">
      <div style="display: flex">
        <input @input="log" v-model="searchTerm" type="text" class="search" placeholder="Looking for..." />
        <button class="searchButton" type="submit">Search</button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      handleSearch: Function,
    },
    data() {
      return {
        searchTerm: '',
      };
    },
    methods: {
 
      searchProducts() {
        
       const searchterm=""
       this.$emit('serached')
      },
    },
  };
  </script>
  
  <style scoped>
  .searchForm {
    margin-bottom: 20px;
  }
  
  .search {
    height: 40px;
    padding: 0 15px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    margin-right: 10px;
    width: 100%;
  }
  
  .searchButton {
    background-color: #4caf50;
    color: #fff;
    height: 40px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100px;
  }
  
  .searchButton:hover {
    background-color: #4caf50c7;
  }
  </style>
  