<!-- import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
    
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/adminSpace");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login; -->

<template>
  <div class="container">
    <div class="innerBox">
      <h1 class="heading">Login</h1>

      <!-- <InputControl
        label="Email"
        :email="values.email"
        placeholder="Enter email address"
      />
      <InputControl
      :password="values.pass"
      @input="logmyinput"
        label="Password"
      
        placeholder="Enter Password"
      /> -->
      <label>email</label>
        <input type="text" v-model="values.email">
      
      <label>password</label>
        <input type="password" @input="logmyinput" v-model="values.pass">
      

      <div class="footer">
        <b class="error">{{ errorMsg }}</b>
        <button :disabled="submitButtonDisabled" @click="handleSubmission">
          Login
        </button>
        <p>
          Already have an account? <span><router-link to="/signup">Sign up</router-link></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import InputControl from "../InputControl/InputControl.vue";
import { auth } from "../../firebase";
import { reactive, ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  components: {
    InputControl,
  },
  setup() {
   const router=useRouter()
    const values = reactive({
      email: "",
      pass: "",
    });
    const errorMsg = ref("");
    const submitButtonDisabled = ref(false);

    const handleSubmission = () => {
  if (!values.email || !values.pass) {
    errorMsg.value = "Fill all fields";
    return;
  }
  errorMsg.value = "";

  submitButtonDisabled.value = true;
 
  signInWithEmailAndPassword(auth, values.email, values.pass)
  .then(async (res) => {
    submitButtonDisabled.value = false;
    router.push("/admin");
  })
  .catch((err) => {
    submitButtonDisabled.value = false;
    errorMsg.value = err.message;
  });
};

    return { values, errorMsg, submitButtonDisabled, handleSubmission };
  },
  methods:{
    logmyinput(){
      console.log(this.values.pass);
    }
  }
};
</script>
<style scoped>
.container {
  background-color: #1a1a1a;
  color: #fff;
}

.innerBox {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
}

.heading {
  color: #fff;
}

label {
  color: #fff;
}

input[type="text"],
input[type="password"] {
  background-color: #333;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  color: #ff0000;
}

p {
  color: #fff;
}

a {
  color: #4caf50;
}

a:hover {
  color: #fff;
}

</style>