<template>
    <div>
      <h1>Your Cart</h1>
      <div class="card-container">
        <div class="card-pay">
          <p class="name-product">{{ data.name }}</p>
          <p class="name-product">Description: {{ data.description }}</p>
          <p class="name-product">Price: {{ data.price }}$</p>
          <p class="price-product">Success</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style>
    /* add your styles here */
  </style>
  