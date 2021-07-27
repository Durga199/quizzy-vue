<template>
  <div>
    <div class="bg-grey-300 min-h-screen flex flex-col">
      <div
        class="
          container
          max-w-sm
          mx-auto
          flex-1 flex flex-col
          items-center
          justify-center
          px-2
        "
      >
        <div class="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">LogIn</h1>
          <div class="text-red-700" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">
              {{ error }}
            </p>
          </div>
          <form @submit.prevent="loginForm">
            <input
              type="email"
              class="
                block
                bg-gray-100
                border border-gray-400
                w-full
                p-3
                rounded
                mb-4
              "
              name="username"
              placeholder="Email"
              v-model="username"
            />

            <input
              type="password"
              class="
                block
                bg-gray-100
                border border-gray-400
                w-full
                p-3
                rounded
                mb-4
              "
              name="password"
              placeholder="Password"
              v-model="password"
            />

            <button
              type="submit"
              class="
                border-2 border-gray-100
                focus:outline-none
                bg-blue-600
                text-white
                font-bold
                tracking-wider
                block
                w-full
                p-2
                rounded-lg
                focus:border-gray-700
                hover:bg-green-700
              "
            >
              LogIn
            </button>
          </form>
        </div>

        <div class="text-gray-900 mt-6">
          Are You A New User?
          <router-link
            class="no-underline border-b border-blue text-blue-900"
            to="/signup"
          >
            Create an Account
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    async loginForm(e) {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      const formData = {
        username: this.username,
        password: this.password,
      };
      await axios
        .post("/api/quiz/token/login/", formData)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);

          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          this.$router.push("/instruction");
          
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
            console.log(JSON.stringify(error.response.data));
          } else if (error.message) {
            console.log(JSON.stringify(error.message));
          } else {
            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>