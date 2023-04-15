
<template>
  <div class="update">
    <h1>Update</h1>
    <input
      type="text"
      label="Name"
      v-model="updateProduct.name"
      placeholder="Enter name"
    />
    <textarea
      class="textarea"
      rows="5"
      type="text"
      placeholder="Enter Description"
      name="Description"
      v-model="updateProduct.description"
    ></textarea>

    <input
      class="input"
      type="number"
      label="Price"
      v-model="updateProduct.price"
      placeholder="Enter Price"
    />
    <input
      class="input"
      type="text"
      label="image"
      v-model="updateProduct.imageUrl"
      placeholder="Enter Image"
    />
    <input
      class="input"
      type="text"
      label="Category"
      v-model="updateProduct.category"
      placeholder="Enter Category"
    />
    <button class="button" @click="handleClick">Update</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Update',
  props: {
    handeltoggle: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      updateProduct: {
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        category: ""
      }
    }
  },
  methods: {
    async handleClick() {
      const productId = this.$route.params.id;
      try {
        await axios.put(
          `http://localhost:5002/api/rent/update/${productId}`,
          this.updateProduct
        );
        this.$router.push("/adminSpace");
        this.handeltoggle()
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>
