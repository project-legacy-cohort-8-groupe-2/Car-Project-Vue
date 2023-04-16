<template>
  <div>
    <div>
      <div class="nav">
        <router-link to="/home" class="logo">home</router-link>
        <router-link to="/signup" class="logo">Signup</router-link>
        <router-link to="/login" class="logo">login</router-link>
        <search @submit="handelSubmit" v-model="productfiltred"/>
      </div>
    </div>
    <div class="App">
      <router-view :prod="product" :handle="hadlecard" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AdminInterface from './Component/AdminInterface.vue'
import UserInterface from './Component/UserInterface.vue'
import Add from './Component/Add.vue'
import Update from './Component/Update.vue'
import Home from './Component/home/Home.vue'
import Card from './Component/Card.vue'
import Signup from './Component/Signup/Signup.vue'
import Login from './Component/Login/Login.vue'
import Search from './Component/Search.vue'
import { auth } from "./firebase";

export default {
  name: 'App',
  components: {
    AdminInterface,
    UserInterface,
    Add,
    Update,
    Home,
    Card,
    Signup,
    Login,
    Search,
  },
  data() {
    return {
      product: [],
      toggle: false,
      userName: "",
      productfiltred: "",
      Cardprod: [],
    }
  },
  methods: {
    handelToggle() {
      this.toggle = !this.toggle
    },
    async fetchProduct() {
      try {
        const res = await axios.get("http://localhost:5002/api/product");
        this.product = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    handleSearch(event) {
      this.productfiltred = event.target.value
    },
    handelSubmit(event) {
      event.preventDefault();
      const productfilt = this.product.filter((e,i)=>{
        return (e.name.toLowerCase()).includes( this.productfiltred.toLowerCase())
      });
      this.product = productfilt
    },
    hadlecard(prod) {
      this.Cardprod = prod
    },
  },
  mounted() {
    this.fetchProduct()
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName;
      } else {
        this.userName = "";
      }
    });
  },
  router: {
    routes: [
      { path: '/adminSpace', component: AdminInterface, props: { handeltoggle: this.handelToggle, prod: this.product } },
      { path: '/add', component: Add, props: { handeltoggle: this.handelToggle } },
      { path: '/update/:id', component: Update, props: { handeltoggle: this.handelToggle } },
      { path: '/login', component: Login },
      { path: '/signup', component: Signup },
      { path: '/', component: Card, props: { data: this.Cardprod } },
      { path: '/home', component: Home, props: { handle: this.hadlecard, name: this.userName, prod: this.product } },
    ]
  },
}
</script>
