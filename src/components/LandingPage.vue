<template>
  <div
    class="min-h-[90vh] flex flex-col items-center justify-center max-w-md mx-auto text-center overflow-hidden bg-white px-4 rounded-[2rem]"
  >
    <div
      class="bg-primary rounded-full h-[150px] w-[150px] flex justify-center items-center"
    >
      <i class="fas fa-dice text-gray-700 text-[4rem]"></i>
    </div>

    <div class="py-4 text-gray-600 italic">Learn, Play, and Conquer!</div>

    <h1 class="text-3xl font-bold mb-8 mt-[2rem]">Choose Your Game Mode</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <router-link
        to="/drag-drop-game"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg shadow-lg text-center transition duration-300 w-[100%]"
      >
        Drag & Drop Game
      </router-link>

      <router-link
        to="/multi-choice-game"
        class="bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg shadow-lg text-center transition duration-300 w-[100%]"
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
