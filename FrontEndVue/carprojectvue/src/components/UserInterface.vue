<template>
    <div>
      <Search :handleSearch="handleSearch" />
      <div class="product">
        <div v-if="filteredProduct.length === 0" class="noResult">
          No results found.
        </div>
        <div v-else>
          <div v-for="e in filteredProduct" :key="e.id" class="product">
            <img class="img" :src="e.imageUrl" alt="img" />
            <h2>{{ e.name }}</h2>
            <p>{{ e.description }}</p>
            <span>${{ e.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Search from './Search.vue';
  
  export default {
    components: {
      Search,
    },
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        searchTerm: '',
      };
    },
    computed: {
      filteredProduct() {
        if (this.searchTerm) {
          return this.products.filter((e) => {
            return e.name.toLowerCase().includes(this.searchTerm.toLowerCase());
          });
        } else {
          return this.products;
        }
      },
    },
    methods: {
      handleSearch(term) {
        this.searchTerm = term;
      },
    },
  };
  </script>
  
  <style scoped>
  .noResult {
    margin-top: 20px;
    font-size: 20px;
  }
  </style>
  