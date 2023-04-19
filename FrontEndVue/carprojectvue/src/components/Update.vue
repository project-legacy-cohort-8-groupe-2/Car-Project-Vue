


<template>
    <div class="update">
      <h1>Update</h1>
      <form>
        <div class="form-group">
          <label>Name:</label>
          <input v-model="updateProduct.name" type="text" class="form-control" placeholder="Enter name" />
        </div>
       
        <div class="form-group">
          <label>Price:</label>
          <input v-model="updateProduct.price" type="number" class="form-control" placeholder="Enter Price" />
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input  v-model="updateProduct.imageUrl" type="text" class="form-control" placeholder="Enter Image" />
        </div>
        <div class="form-group">
          <label>Category:</label>
          <input v-model="updateProduct.category" type="text" class="form-control" placeholder="Enter Category" />
        </div>
        <button class="btn btn-primary" @click="handleClick">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { computed, reactive } from 'vue'
  import {useRouter} from 'vue-router'
  export default {
    // name:"update",
    
    props:{
      id:{
        type : String,
        required : true
      }
    },
    
    setup(props) {
    const router=useRouter()
      const updateProduct = reactive({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: ''
      })
  
      // const handleClick = async () => {
      //   try {
          
      //     await axios.put(`http://localhost:5002/api/rent/update/${id}`, updateProduct)
      //     this.$router.push("/admin")
        
      //   } catch (err) {
      //     console.log(err)
      //   }
      // }
  
      return { updateProduct }
    },
    methods:{
      handleClick : async function (){ 
        
        try {
           await axios.put(`http://localhost:5002/api/rent/update/3`, this.updateProduct)
            router.push("/admin")
            
           }

             catch (err) {
               console.log(err) 
               alert('There was an error updating the rent. Please try again.') 
               router.push("/admin") 
              }
               },
              //  log : function (){
              //   console.log(this.router.params.id,'success');
              //  }
    }

  }
  </script>
  