<template>
  <div>
    <div v-for="item in category" v-bind:key="item.id">
      <div class="div2">
        <div class="title text-white text-2xl bg-red-900">
          {{ item.category }}
        </div>
        <br />
        <div><strong>FULL MARK : 10</strong></div>
        <div>NO. Of Questions : 10</div>
        <br /><br />
        <div>
          <button
            v-on:click="$router.push('/dashboard/' + item.id)"
            type="button"
            class="
              bg-blue-900
              text-white
              px-6
              py-2
              rounded
              font-medium
              mx-3
              hover:bg-red-700
              transition
              duration-200
              each-in-out
            "
          >
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "category",
  data() {
    return {
      category: [],
    };
  },
  async mounted() {
    let res = await axios.get("api/quiz/category/");
    this.category = res.data;
    
  },
};
</script>
<style>
.div2 {
  width: 300px;
  height: 300px;
  padding: 20px;
  border: 3px solid red;
  float: left;
  margin-left: 90px;
  margin-bottom: 20px;
  margin-top: 30px;
  background-color: rgb(56, 247, 247);
  text-align: center;
}
.nv {
  float: initial;
}
</style>
