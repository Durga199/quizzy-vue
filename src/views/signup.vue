<template>
  <!-- component -->
  <div>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
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
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Sign up</h1>
          <div class="text-red-700" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">
              {{ error }}
            </p>
          </div>
          <form @submit.prevent="register">
            <input
              type="text"
              class="
                block
                border border-gray-400
                w-full
                p-3
                rounded
                mb-4
                bg-gray-100
              "
              name="first_name"
              placeholder="First Name"
              v-model="first_name"
              required
            />
            <input
              type="text"
              class="
                block
                bg-gray-100
                border border-gray-400
                w-full
                p-3
                rounded
                mb-4
              "
              name="last_name"
              placeholder="Last Name"
              v-model="last_name"
              required
            />

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
              required
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
              Create New Account
            </button>
          </form>
        </div>

        <div class="text-gray-900 mt-6">
          Already have an account?
          <router-link
            class="no-underline border-b border-blue text-blue-900"
            to="/login"
          >
            Log in
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "signup",
  data() {
    return {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    register(e) {
      const formData = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        password: this.password,
      };
      axios
        .post("/api/quiz/users/", formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
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