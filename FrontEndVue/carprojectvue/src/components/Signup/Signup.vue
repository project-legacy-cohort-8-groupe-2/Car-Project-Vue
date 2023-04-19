<template>
  <div class="container">
    <div class="inner-box">
      <h1 class="heading">Signup</h1> 
       <label>name</label>
      <input  placeholder="Enter your name"  @input="log" v-model="values.name" /> 
      <label>email</label>
      <input  placeholder="Enter email address" v-model="values.email" />
      <label>password</label> 
      <input  placeholder="Enter password" v-model="values.pass" /> 

      <div class="footer">
        <b class="error">{{ errorMsg }}</b> 
        <button @click="handleSubmission" :disabled="submitButtonDisabled">Signup</button> 
        <p> 
          Already have an account? 
          <span>
            <router-link to="/login">Login</router-link> 
          </span> 
        </p> 
      </div> 
    </div> 
  </div> 
</template> 

<script> 
import InputControl from "../InputControl/InputControl.vue"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { auth } from "../../firebase";
export default { 
  name: "Signup", 
  components: { 
    InputControl, 
  }, 
  
  setup() {
   const router=useRouter()
    const values = reactive({
      email: "",
      name:"",
      pass: "",
    });
    const errorMsg = ref("");
    const submitButtonDisabled = ref(false);

   const handleSubmission=()=> { 
      if (!values.name || !values.email || !values.pass) { 
        errorMsg.value = "Fill all fields"; 
        return; 
      } 
      errorMsg.value = ""; 

      submitButtonDisabled.value = true; 
      createUserWithEmailAndPassword(auth, values.email, values.pass) 
        .then(async (res) => { 
          submitButtonDisabled.value = false; 
          const user = res.user; 
          await updateProfile(user, { 
            displayName: values.name, 
          }); 
          router.push("/login"); 
        }) 
        .catch((err) => { 
          submitButtonDisabled.value = false; 
          errorMsg.value = err.message; 
        }); 
    }
    return { values, errorMsg, submitButtonDisabled, handleSubmission };
  },
  methods:{
    log(){
      console.log(this.values.name,'hhh');
    }
  } 
}

</script>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
  color: #fff;
}

.inner-box {
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  padding: 30px;
  width: 400px;
}

.heading {
  font-size: 36px;
  margin-bottom: 20px;
  color: #fff;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #fff;
}

input {
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
  background-color: #2e2e2e;
  color: #fff;
}

button {
  background-color: #1db954;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  transition: background-color 0.2s ease;
  width: 100%;
}

button:hover {
  background-color: #1ed760;
}

.error {
  color: #f44336;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.footer {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  margin-top: 10px;
  font-size: 14px;
  color: #fff;
}

span {
  margin-left: 5px;
}

.router-link {
  color: #1db954;
  text-decoration: none;
}

.router-link:hover {
  text-decoration: underline;
}

.dark-mode {
  background-color: #000;
  color: #fff;
}

.dark-mode .inner-box {
  background-color: #222;
}

.dark-mode label,
.dark-mode input,
.dark-mode .router-link {
  color: #fff;
}

.dark-mode button {
  background-color: #1db954;
  color: #fff;
}

.dark-mode button:hover {
  background-color: #1ed760;
}

</style>