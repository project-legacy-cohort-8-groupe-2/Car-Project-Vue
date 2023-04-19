import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminInterface from "../src/components/AdminInterface.vue"
import Add from "../src/components/Add.vue"
import Update from "../src/components/Update.vue"
import Login from "../src/components/Login/Login.vue"
import Signup from "../src/components/Signup/Signup.vue"
import Home from "../src/components/home/Home.vue"
import Card from "../src/components/Card.vue"
import UserInterface from '../src/components/UserInterface.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/admin', component: AdminInterface },
    { path: '/add', component: Add },
    { path: '/update/:id',name:'update', component: Update },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/card', component: Card },
    { path: '/User', component: UserInterface },
    { path: '/', component: Home },
  ],
})

createApp(App).use(router).mount('#app')