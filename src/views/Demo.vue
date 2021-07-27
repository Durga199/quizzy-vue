<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div v-if="index < count">
      <div class="w-full max-w-xl">
        <h1 class="font-bold bg-red-900 text-white text-3xl text-center">
          {{ result.category }}
        </h1>
        <br />
        <div class="bg-gray-300 p-12 rounded-lg shadow-lg w-full mt-8">
          <div class="text-green-900 text-2xl font-bold bg-gray-300">
            {{ result.question }}
          </div>
          <br />
          <label
            :for="answer"
            class="
              block
              mt-4
              border border-indigo-900
              rounded-lg
              py-2
              px-6
              text-lg
            "
            v-for="answer in result.options"
            :key="answer"
            :class="
              { 'hover:bg-yellow-300 cursor-pointer': selectedAnswer == '' },
              { 'bg-red-500': selectedAnswer == answer },
              {
                'bg-green-500':
                  answer == result.correct_answer && selectedAnswer != '',
              }
            "
          >
            <input
              type="radio"
              :id="answer"
              class="hidden"
              :value="answer"
              @change="answered($event)"
              v-model="selectedAnswer"
              :disabled="selectedAnswer != ''"
            />
            {{ answer }} </label
          ><br />
          <div v-if="index < count - 1 && index != 0">
            <button
              @click="nextQuestion"
              v-show="selectedAnswer != '' && index < count - 1"
              class="
                bg-blue-500
                hover:bg-green-900
                text-white
                font-bold
                py-2
                px-4
                hover:border-blue-500
                rounded
              "
            >
              Next &gt;
            </button>
          </div>

          <div v-else>
            <button
              @click="showResults"
              v-show="selectedAnswer != '' && index == count - 1"
              class="
                bg-red-700
                hover:bg-green-900
                text-white
                font-bold
                py-2
                px-4
                hover:border-blue-500
                rounded
              "
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="index == count && count > 1">
     <div v-if="correct >= 1">
       <div class="dv1">
        <h1 class="font-bold text-2xl " >Congratulation ! You Qualified In This Round. </h1><br><br>
        <h1 class="font-bold text-xl"> Your Score :&ensp;  <strong> {{correct}}</strong>&ensp; Out Of &ensp; {{count-1}}.</h1><br>
         <h1 class="font-bold text-lg">Status :<strong> PASS</strong></h1><br><br>
         <div class="text-lg text-gray-900">
           You Completed This Quiz Test In : <strong>{{formated_time}}</strong>
         </div>
       </div>
     </div>

     <div v-if="correct < 1">
    <div class="dv2">
         <h1 class="font-bold text-2xl " >Sorry ! You didn't Qualify This Time</h1><br><br>
        <h1 class="font-bold text-xl"> Your Score :&ensp;  <strong> {{correct}}</strong>&ensp; Out Of &ensp; {{count-1}}.</h1><br>
         <h1 class="font-bold text-lg">Status :<strong> FAIL</strong></h1><br><br>
         <div class="text-lg text-white">
           You Completed This Quiz Test In : <strong> {{formated_time}}</strong>
         </div>
       </div>

     </div><br>
      <button class=" ml-9 mr-4 rounded bg-purple-700 text-white font-bold py-2 px-4  hover:bg-green-900">
        <router-link to="/welcome">GO TO Home</router-link>
      </button>
      <button @click="logout" class="rounded ml-8 bg-red-700 text-white font-bold py-2 px-4">
       Quit
      </button>
    </div>
    <div v-if="count == 1">
      <h1 class="font-bold  text-red-900 text-3xl text-center">
          Sorry ! There Is No Question In This Section.
        </h1><br>
     
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Demo",
  data() {
    return {
      results: [],
      option: {},
      index: 0,
      result: {},
      selectedAnswer: "",
      count: 0,
      correct: 0,
      wrong: 0,
      start_time :0,
      end_time:0,
      total_time:0,
      formated_time:''
      
    };
  },
  async mounted() {
    let res = await axios.get("api/quiz/question/" + this.$route.params.id);
    this.results = res.data;
    this.count = this.results.length + 1;
    console.log(res.data);
    console.warn(this.results);
    const d = new Date();
    this.start_time = d.getTime()
    console.warn(this.start_time)

    this.nextQuestion();
  },

  methods: {
    nextQuestion() {
      console.warn(this.index);
      this.result = this.results[this.index];
      this.index = this.index + 1;
      this.selectedAnswer = "";
    },
    answered(e) {
      this.selectedAnswer = e.target.value;
      console.warn(this.selectedAnswer);
      if (this.selectedAnswer == this.result.correct_answer) {
        this.correct++;
      } else {
        this.wrong++;
      }
    },

    showResults() {
      this.index++;
      const d = new Date();
      this.end_time = d.getTime()
      this.total_time = this.end_time - this.start_time
      console.warn(this.total_time)
      this.formated_time = this.msToTime(this.total_time)
      console.log(this.formated_time)

    },

    logout() {
      this.$store.commit("removeToken");
      localStorage.removeItem("token");
      this.$router.push("/");
    },

    msToTime(duration) {
  
   var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  if (hours == 0 && minutes == 0 && seconds != 0){
    return seconds +'\xa0\xa0'+ " Seconds"
  }
  if (hours == 0 && minutes != 0 && seconds != 0){
    return minutes +'\xa0\xa0'+ ' Minutes'+'\xa0\xa0'+seconds +'\xa0\xa0'+ " Seconds"
  }
  else{
  return hours +'\xa0\xa0\xa0\xa0'+ "Hours"+'\xa0\xa0\xa0\xa0' + minutes+'\xa0\xa0\xa0' + "Minutes"+'\xa0\xa0\xa0\xa0' + seconds +'\xa0\xa0\xa0\xa0' +"Seconds"
  }
}
  },
};
</script>

<style>
.dv1 {
  width: 500px;
  height: 400px;
  padding: 40px;
  border: 3px solid red;
  float: left;
  margin-left: 90px;
  margin-bottom: 20px;
  background-color: rgb(70, 240, 84);
}
.dv2 {
  width: 500px;
  height: 400px;
  padding: 40px;
  border: 3px solid rgb(61, 8, 185);
  float: left;
  margin-left: 90px;
  margin-bottom: 20px;
  background-color: rgb(182, 9, 9);
  color: white;
}

</style>