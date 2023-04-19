
<template>
    <div class="form">
      <h1>Add</h1>
      <form @submit.prevent="handleSubmit">
        <label>
          Name:
          <input v-model="addProduct.name" type="text" placeholder="Enter name" />
        </label>
        
        <label>
          Price:
          <input v-model.number="addProduct.price" type="number" placeholder="Enter Price" />
        </label>
        <label>
          Image:
          <input v-model="addProduct.imageUrl" type="text" placeholder="Enter Image" />
        </label>
        <label>
          Category:
          <input v-model="addProduct.category" type="text" placeholder="Enter Category" />
        </label>
        <button type="submit">Add product</button>
      </form>
    </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const addProduct = reactive({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: '',
      });
  
      const handleSubmit = async () => {
        try {
          await axios.post('http://localhost:5002/api/product/add', addProduct);
          // Navigate to admin space
        } catch (err) {
          console.log(err);
        }
      };
  
      return { addProduct, handleSubmit };
    },
  };
  </script>
  