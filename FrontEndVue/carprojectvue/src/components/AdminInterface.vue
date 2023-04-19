
<template>
  <div class="admininterfac">
    <div class="button-container">
      <RouterLink to="/add">
        <button class="button">Add product</button>
      </RouterLink>
      <RouterLink to="/">
      <button class="button" @click="signOut">Signout</button>
    </RouterLink>
    </div>
    <div>
      
    </div>
    <div class="product-container">
      <div v-for="prod in product" :key="prod.id" class="product">
        <img class="img" :src="prod.imageUrl" :alt="prod.name" />
        <h2>{{ prod.name }}</h2>
        <span>${{ prod.price }}</span>
        <button class="delete" @click="deleteProduct(prod.id)">Delete</button>
        <button class="update">
          <router-link :to="{name:update,path:'/update/:id',params:{id:prod.id}}" style="color: inherit; text-decoration: none;">Update</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script> 
import { reactive } from 'vue' 
import { RouterLink, useRouter } from 'vue-router' 
import axios from 'axios' 


export default {
    props: {
        product: {
            type: Array,
            required: true,
        },
        
    },
    setup(props, { router }) {
        console.log(props, "ronaldo");
        const buyProduct = (product) => {
            router.push("/admin");
            props.handle(product);
        };
        return { buyProduct };
    },
    methods: {
        deleteProduct: async (id) => {
            try {
                await axios.delete(`http://localhost:5002/api/rent/delete/${id}`);
                window.location.reload();
            }
            catch (err) {
                console.log(err);
            }
        },
        signOut: () => {
            router.push("/");
        }
    },
    components: { RouterLink }
} 
</script>


<style scoped>
/* Global Styles */
.admininterface {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-container {
  margin-bottom: 20px;
}

.button {
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #030f04;
  color: white;
  font-size: 16px;
}

.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

h2 {
  font-size: 24px;
  margin-top: 10px;
}

span {
  font-size: 18px;
}

.delete {
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #f44336;
  color: white;
  font-size: 16px;
}

.update {
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #2196F3;
  color: white;
  font-size: 16px;
}

/* Dark mode */
.product {
  background-color: #222;
  color: white;
}

.dark-mode .product {
  background-color: #444;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.dark-mode .img {
  filter: brightness(50%);
}

</style>
