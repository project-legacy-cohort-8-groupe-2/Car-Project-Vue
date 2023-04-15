
<template>
  <div>
    <div>
      <button class="button" @click="navigate('/add')">Add product</button>
      <button class="button" @click="navigate('/')">Signout</button>
    </div>
    <div class="product">
      <div v-for="e in prod" :key="e.id" class="product">
        <img class="img" :src="e.imageUrl" alt="img" />
        <h2>{{ e.name }}</h2>
        <span>${{ e.price }}</span>
        <button class="delete" @click="handleDelete(e.id)">Delete</button>
        <button class="update">
          <router-link :to="`/update/${e.id}`" style="color:inherit;text-decoration:none;">Update</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  name: 'AdminInterface',
  props: {
    prod: {
      type: Array,
      required: true
    }
  },
  setup() {
    const route = useRoute();

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5002/api/rent/delete/${id}`);
        window.location.reload();
      } catch (err) {
      }
    };

    const navigate = (path) => route.push(path);

    return {
      handleDelete,
      navigate
    }
  }
}
</script>

