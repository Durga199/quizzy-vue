<template>
<div>
    <div class="
          container
          max-w-100%
          max-h-100%
          mx-auto
          flex-1 flex flex-col
          items-center
          justify-center
          px-2
          
        ">
        <div class="title font-bold text-red-700 bg-gray-300 text-3xl mt-12">
           -- INSTRUCTIONS FOR THE QUIZ TEST --

        </div>
       

    </div><br><br>
     <div class="float-left text-indigo-900 text-xl ml-24 border">
            1. &ensp;This is a Multiple Choice based Quiz test.<br>
            2. &ensp;There are Different Categories or Subjects like Math,History,Science etc. in this test <br>
            3. &ensp;There are <b> 10 Multiple Choice Questions </b> in each category .<br>
            4. &ensp;Each Correct answer carries <b>1 point</b> and there is <b>no Negitive point</b> for Wrong Answer. <br>
            5. &ensp;You have to Score minimum<b> 5 Points to Qualify</b>. <br>
            6. &ensp;In each category there is a <b>"Take Quiz"</b> button to start the test. <br>
            7. &ensp;You have to Choose one Option to see the next question. <br>
            8. &ensp;<b>Once You choose any of the Options then you can't Change that.</b> <br>
            9. &ensp;If your Selected Option turns into Green then Your is Correct and if it turns Red then your answer is Wrong. <br>
            10.&ensp;After Selecting One Option , The Next Button Appear by which You can Proceed for Next Question. <br>
            11.&ensp;After Last Question The "Finish" Button Will appear. After Click That You can See your Result. <br>

         <div class="text-center text-2xl text-red-700"> <br>  <strong>Best Of Luck</strong></div><br>
         <div class="text-center">
             <button
        class="
          bg-blue-700
          hover:bg-green-500
          text-white
          text-xl
          font-bold
          py-2
          px-4
          hover:border-blue-500
          rounded
          ml-52
        "
      >
       <router-link to="/category"> NEXT &gt;</router-link>
      </button>&emsp;&emsp;&emsp;
              <button @click="logout" class="rounded float-right  mr-12  bg-red-700 text-white font-bold py-2 px-4 hover:bg-blue-900">
       LOG OUT
      </button>
         </div>

        </div>
         
     
    </div>
</template>
<script>
export default {
    name:'instruction',
    methods:{
      logout() {
      this.$store.commit("removeToken");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    }
}
</script>