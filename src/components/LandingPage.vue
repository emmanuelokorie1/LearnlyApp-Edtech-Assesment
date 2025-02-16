<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 class="text-3xl font-bold mb-8">Choose Your Game Mode</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link 
          to="/drag-drop-game"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg text-center transition duration-300 w-64"
        >
          Drag & Drop Game
        </router-link>
  
        <router-link 
          to="/multi-choice-game"
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg text-center transition duration-300 w-64"
        >
          Multiple Choice Game
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LandingPage",
  };
  </script>
  