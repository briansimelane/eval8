import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const navtabs = ref([
    { name: 'Planning ', to: '/', current: false },
    { name: 'Pricing', to: '/', current: false },
    { name: 'Production', to: '/', current: false },
    { name: 'Improvement', to: '/', current: false },
    { name: 'Research', to: '/', current: false },
    { name: 'Logistics', to: '/', current: false },
    { name: 'Selling', to: '/', current: false },
    { name: 'Scoring', to: '/', current: false },
  ])
//constructor(id, gameName, cohort, client, date, playerCount, players, scoring)
  const gameDetails = ref({
    gameID: 'id',
    gameName: 'Smartphone Inc',
    gameCohort: 'Test Group',
    gameClient: 'LearningSims',
    gameDate: 'Feb-2024',
    gamePlayerCount: 2,
    gamePlayers: ["Player 1", "Player 2"],
    gameScoring: [{}]
  })
  

  return { navtabs, gameDetails }
})
