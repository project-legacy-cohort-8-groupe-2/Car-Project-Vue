<template>
  <div>
    <div>
      <div class='nav'>
        <router-link to="/" class="logo">home</router-link>
        <router-link to="/signup" class="logo">Sign-up</router-link>
        <router-link to="/login" class="logo">login</router-link>
      </div>
      <div>
        <RouterView />
        
        <RouterView>
          <template v-if="$route.path === '/'">
            <form @submit.prevent="searchProducts" class="searchForm">
      <div style="display: flex">
        <input @input="log" v-model="productfiltred" type="text" class="search" placeholder="Looking for..." />
        <button @click="filtred" class="searchButton" >Search</button>
      </div>
    </form>
            <Home :product="product" />

          </template>
        </RouterView>
      
   
      </div>
    </div>
    <div class="App">
    
      <RouterView>
        <template v-if="$route.path === '/admin'">
          <AdminInterface :product="product" />
        </template>
      </RouterView>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { auth } from "./firebase";
import AdminInterface from '../src/components/AdminInterface.vue';
import UserInterface from '../src/components/UserInterface.vue';
import Add from './components/Add.vue';
import Update from '../src/components/Update.vue';
import Home from './Components/home/Home.vue';
// import Card from './Components/Card.vue';
import Signup from './Components/Signup/Signup.vue';
import Login from './Components/Login/Login.vue';
import Search from './components/Search.vue';

export default {
  name: 'App',
  components: {
    AdminInterface,
    UserInterface,
    Add,
    Update,
    Home,
    // Card,
    Signup,
    Login,
    Search
  },
  data() {
    return {
      product: [],
      toggle: false,
      userName: "",
      productfiltred: "",
      Cardprod: []
    }
  },
  computed: {
    // filtred() {
    //   return this.product.filter(e => e.name.toLowerCase().includes(this.productfiltred.toLowerCase()));
    // }
  },
  methods: {
    log(){
  console.log(this.productfiltred,"filter");
},
    filtred() {
      return this.product = this.product.filter(e => e.name.toLowerCase().includes(this.productfiltred.toLowerCase()));
    },

    async fetchProduct() {
      try {
        const res = await axios.get("http://localhost:5002/api/product")
        console.log("Axios response:", res)
        this.product = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    handleSearch(searchInput) {
      this.productfiltred = searchInput;
    },
    // handleFilter() {
    //   const productfilt = this.product.filter((e, i) => {
    //     return (e.name.toLowerCase()).indexOf(this.productfiltred.toLowerCase()) !== -1;
    //   })
    //   this.product = productfilt;
    // },
    handleToggle() {
      this.toggle = !this.toggle;
    },
    handleCard(prod) {
      this.Cardprod = prod;
    }
  },
  mounted() {
    this.fetchProduct();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName;
      } else {
        this.userName = "";
      }
    });
  },
  watch: {
    toggle() {
      this.fetchProduct();
    }
  }
}
</script>
<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 0 20px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
    color: #f60;
  }
  .logo:hover {
    color: #f60;
  }
  .logo {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    color: #333;
    text-decoration: none;
    margin-right: 20px;
  }
  *{
  font-family:Arial, Helvetica, sans-serif;
  }
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