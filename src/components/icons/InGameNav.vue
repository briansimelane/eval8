<script setup>
import {ref, reactive, computed } from 'vue'
import { useGameStore } from '@/stores/game.js'

const gamestore = useGameStore()

/* const handleTabClick = (tabName) => { 
gamestore.$patch({
  navtabs: [
    { name: 'Planning', to: '/', current: true },
    { name: 'Pricing', to: '/', current: false },
    { name: 'Production', to: '/', current: false },
    { name: 'Improvement', to: '/', current: false },
    { name: 'Research', to: '/', current: false },
    { name: 'Logistics', to: '/', current: false },
    { name: 'Selling', to: '/', current: false },
    { name: 'Scoring', to: '/', current: false },
  ]
})
} */

const handleTabClick = (tabName) => { 
  // Update the current tab based on the clicked tab
  const updatedNavTabs = gamestore.navtabs.map(tab => ({
    ...tab,
    current: tab.name === tabName,
  }));

  // Patch the store with the updated navigation tabs
  gamestore.$patch({
    navtabs: updatedNavTabs,
  });
}

</script>

<template>
<main>
     <!-- Heading and Navigation-->
<div class="container mx-auto m-2 w-fit">    
  <div class="relative border-b border-gray-200 pb-2 mb-2 sm:pb-0">
    <div class="md:flex md:items-center md:justify-between">
      <h3 class="text-lg font-semibold leading-6 text-gray-900">
        {{ gamestore.gameDetails.gameName }}: {{ gamestore.gameDetails.gameClient }} ({{ gamestore.gameDetails.gameDate }})
      </h3>
      <div class="mt-3 flex md:absolute md:right-0 md:top-0 md:mt-0">
        
        <button type="button" class=" inline-flex items-center rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Admin</button>
      </div>
    </div>
    <div class="mt-4">
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select id="current-tab" name="current-tab" class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600">
          <option v-for="tab in gamestore.navtabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <a v-for="tab in gamestore.navtabs" :key="tab.name" :class="[tab.current ? 'bg-red-500 text-white rounded-md' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 pt-2 pb-2 mb-1 text-sm font-medium', 'cursor-pointer']" :aria-current="tab.current ? 'page' : undefined" @click="handleTabClick(tab.name)">{{ tab.name }}</a>
        </nav>
      </div>
    </div>
  </div>
</div>  

</main>

</template>

<style scoped>

</style>