<template>
  <div class="
          container
          max-w-100%
          max-h-100%
          mx-auto
          flex-1 flex flex-col
          items-center
          justify-center
          px-2
          home
        ">
        <div></div> <br> <br>

        <div class="text-4xl text-white bg-purple-700  tracking-widest font-bold">
        MODEL SCHOOL QUIZ APPLICATION<br>
        </div>  <br><br><br><br>
    <div>
      <button
        class="
          bg-pink-700
          hover:bg-green-500
          text-white
          text-xl
          font-bold
          py-2
          px-4
          hover:border-blue-500
          rounded
        "
      >
       <router-link to="/login">  LOG IN</router-link>
      </button>&emsp;&emsp;&emsp;
    
    
      <button
        class="
          bg-green-700
          hover:bg-blue-500
          text-white
          text-xl
          font-bold
          py-2
          px-4
          hover:border-blue-500
          rounded
        "
      >
      <router-link to="/signup">  CREATE NEW ACCOUNT</router-link>
      </button>
    </div>
    
    
    <router-view></router-view>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <br><br>
  <div></div>
  </div>
</template>

<script>


export default {
  name: "Home",
  components: {},
};
</script>
<style>
 .home{
    
   background-color: #0415fa;
   background-image: url("../assets/yellow.jpg");
   background-repeat: no-repeat;
   background-size: cover;
 }
</style>
