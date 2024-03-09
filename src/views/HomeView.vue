<script setup>
import {ref, reactive, computed } from 'vue'
import { ChevronDoubleUpIcon } from '@heroicons/vue/24/solid'
import InGameNav from '../components/icons/InGameNav.vue';


// Classes
class Game {
    constructor(id, gameName, cohort, client, date, playerCount, players, scoring){
      this.id = id;
      this.gameName = gameName;
      this.cohort = cohort;
      this.client = client;
      this.date = date;
      this.playerCount = playerCount;
      this.players = players;
      this.scoring = scoring;
    }
}

class Player {
  constructor(id, name) {
    this.id = id,
    this.name = name
  }

}

class Actions {
  constructor(name,price, products, logistics, research, improvement, blank, styleclass, hoverstate, imgclass, imgclassReversed, imgclassBlocked) {
    this.name = name,
    this.price = price,
    this.products = products,
    this.logistics = logistics,
    this.research = research,
    this.improvement = improvement,
    this.blank = blank,
    this.styleclass = styleclass,
    this.hoverstate = hoverstate,
    this.imgclass = imgclass,
    this.imgclassReversed = imgclassReversed
    this.imgclassBlocked = imgclassBlocked
  }

}

// Starting variables
const startPrice = ref(5)
const startProducts = ref(0)
const startResearch = ref(0)
const startLogistics = ref(0)
const startImprovement = ref(0)

// Objects created from classes
//Actions for all icons
const action0 = new Actions("Blank", 0, 0, 0, 0, 0, 0, "bg-green-500", "hover:ring-offset-2 hover:ring-4 hover:ring-green-500", "", "", "classBlocked")// Blank
const action1 = new Actions("2 Products & Price Reduction", -1, 2, 0, 0, 0, 0, "bg-pink-500", "hover:ring-offset-2 hover:ring-4 hover:ring-green-500", "class5", "class5reversed", "classBlocked")// Product + Price reduction
const action2 = new Actions("Research", 0, 0, 0, 1, 0, 0, "bg-purple-500", "hover:ring-offset-2 hover:ring-4 hover:ring-green-500", "class7", "class7Reversed" , "classBlocked")// Research
const action3 = new Actions("Logistics", 0, 0, 1, 0, 0, 0, "bg-blue-500", "hover:ring-offset-2 hover:ring-4 hover:ring-green-500", "class2", "class2Reversed" , "classBlocked")// Logistics
const action4 = new Actions("2 Products", 0, 2, 0, 0, 0, 0, "bg-gray-500", "hover:ring-offset-2 hover:ring-4 hover:ring-green-500", "class3", "class3reversed", "classBlocked")// 2 Products
const action5 = new Actions("Improvement", 0, 0, 0, 0, 1, 0, "bg-yellow-500", "hover:ring-offset-2 hover:ring-4 hover:ring-green-500", "class6", "class6Reversed", "classBlocked")// Improvement
const action6 = new Actions("Price Increase", 1, 0, 0, 0, 0, 0, "bg-red-500", "hover:ring-offset-2 hover:ring-4 hover:ring-green-500", "class4", "class4reversed", "classBlocked")// Price increase
const action7 = new Actions("1 Product", 0, 1, 0, 0, 0, 0, "bg-gray-300", "hover:ring-offset-2 hover:ring-4 hover:ring-green-500", "class1", "class1Reversed", "classBlocked")// 1 Product


const activeGrid = ref({ //0 is the front, 1 is the back and 2 is covered by improvement
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true
})

const activeImprovementLocation = ref({
  0: [1, 4],
  1: [0, 2, 5],
  2: [1, 3, 6],
  3: [2, 7],
  4: [0, 5, 8],
  5: [1, 4, 6, 9],
  6: [2, 5, 7, 10],
  7: [3, 6, 11],
  8: [4, 9],
  9: [5, 8, 10],
  10: [6, 9, 11],
  11: [7, 10]
})

 /*const toggleActiveGrid = (index) => {
  activeGrid.value[index] = !activeGrid.value[index];
  console.log(activeGrid.value[index])
} */



const toggleActiveGrid = (index) => {
  activeGrid.value[index] = !activeGrid.value[index]; // Toggle between True and False
  
  
  
}; 

const gridFace = ref([
  {
    action: {
      true: action7,
      false: action1 
    } // Position 1
  },
  {
    action: {
      true: action4,
      false: action7 
    } // Position 2
  },
  {
    action: {
      true: action7,
      false: action1 
    } // Position 3
  },
  {
    action: {
      true: action3,
      false: action7 
    } // Position 4
  },
  {
    action: {
      true: action3,
      false: action7 
    } // Position 5
  },
  {
    action: {
      true: action2,
      false: action3 
    } // Position 6
  },
  {
    action: {
      true: action5,
      false: action7 
    } // Position 7
  },
  {
    action: {
      true: action4,
      false: action2 
    } // Position 8
  },
  {
    action: {
      true: action7,
      false: action2 
    } // Position 9
  },
  {
    action: {
      true: action2,
      false: action3 
    } // Position 10
  },
  {
    action: {
      true: action7,
      false: action5 
    } // Position 11
  },
  {
    action: {
      true: action6,
      false: action4 
    } // Position 12
  },
  
])

const actionsGrid = ref([
  {
    active: true,
    position: 0,
    action: {
      true: action7,
      false: action1,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 0
  {
    active: true,
    position: 1,
    action: {
      true: action4,
      false: action7,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 1
  {
    active: true,
    position: 2,
    action: {
      true: action7,
      false: action1,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 2
  {
    active: true,
    position: 3,
    action: {
      true: action3,
      false: action7,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 3
  {
    active: true,
    position: 4,
    action: {
      true: action3,
      false: action7,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 4
  {
    active: true,
    position: 5,
    action: {
      true: action2,
      false: action3,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 5
  {
    active: true,
    position: 6,
    action: {
      true: action5,
      false: action7,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 6
  {
    active: true,
    position: 7,
    action: {
      true: action4,
      false: action2,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 7
  {
    active: true,
    position: 8,
    action: {
      true: action7,
      false: action2,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 8
  {
    active: true,
    position: 9,
    action: {
      true: action2,
      false: action3,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 9
  {
    active: true,
    position: 10,
    action: {
      true: action7,
      false: action5,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 10
  {
    active: true,
    position: 11,
    action: {
      true: action6,
      false: action4,
      blocked: action0,
      improvement: ref()
    }
  }, // Position 11
])

// Opening Improvement cards

const improveCards = ref([
  {
    1: action1,
    2: action2
  },
  {
    1: action3,
    2: action4
  }

])


const currentGame = new Game("id", "Smartphone Inc", "Test Group", "LearningSims", "Feb-2024", 2, ["Player 1", "Player 2"], [{}])

const updateCurrentGame = (currentGame) => {
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
 }

// Variables kept track off
const activeActions = computed(() => {
  return gridFace.value.map((actionChoice, index) => {
    return activeGrid.value[index] ? actionChoice.action.true : actionChoice.action.false;
    
  });
});

// Compute the total price effect
const totalPriceEffect = computed(() => {
  return startPrice.value + activeActions.value.reduce((total, action) => {
    return  total + action.price;
  }, 0);
});

// Compute the total products
const totalProductsEffect = computed(() => {
  return startProducts.value + activeActions.value.reduce((total, action) => {
    return  total + action.products;
  }, 0);
});

// Compute the total improvements
const totalImprovementsEffect = computed(() => {
  return startImprovement.value + activeActions.value.reduce((total, action) => {
    return  total + action.improvement;
  }, 0);
});

// Compute the total research
const totalResearchEffect = computed(() => {
  return startResearch.value + activeActions.value.reduce((total, action) => {
    return  total + action.research;
  }, 0);
});

// Compute the total research
const totalLogisticsEffect = computed(() => {
  return startLogistics.value + activeActions.value.reduce((total, action) => {
    return  total + action.logistics;
  }, 0);
});


//
// Functions for interaction



//Functions to update to the Store




</script>

<template>
  <main>

    
    <!-- Heading and Navigation-->
    <InGameNav></InGameNav>


<div class="container mx-auto m-2 w-fit">    
  
<!-- New Adjusted Board -->
<div class="md:flex md:items-center md:justify-between border-b border-gray-200 pt-5 mb-2">
        <h3 class="text-base font-semibold leading-6 text-gray-900 ">
          Actions Selection Board <span class="text-gray-400 italic">(Click cards to switch selection)</span>:
        </h3>  

        <div> </div>
      </div>
<div class="grid grid-cols-4 gap-y-2 gap-x-2 cursor-pointer">

<!-- List rendering -->

    <div
  v-for="(item, index) in actionsGrid "
  :key="index"  
  > 

  <div :class="[
    activeGrid[index] ? item.action['true'].imgclass : item.action['false'].imgclass] "
  class="p-5 w-24 h-24 md:w-44 md:h-44 rounded-lg hover:ring-4 hover:ring-green-500  text-wrap relative transition ease-in-out duration-300"
  @click="toggleActiveGrid(index)">

    <!-- reverse icon -->
    <span 
      class="absolute bottom-0 left-0 w-8 h-8 md:w-10 md:h-10 rounded-md border-white border-2 bg-gray-200 transition ease-in-out duration-300"
        :class="[activeGrid[index] ? item.action['false'].imgclass : item.action['true'].imgclass]"
        
      >  
    </span>
  </div>
  
   
 </div>




<!-- Add improvement -->
 <div id="dialog"
     class=""     
   >
 <!-- <BeakerIcon class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-80 md:h-8  text-gray-200" /> 
 <ChevronDoubleUpIcon class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-80 md:h-8  text-white " @click="console.log('Clicked')" /> -->
 </div>
</div> 

<!-- Improvement cards -->
  <div class="relative ">
      <div class="md:flex md:items-center md:justify-between border-b border-gray-200 pt-5">
        <h3 class="text-base font-semibold leading-6 text-gray-900 ">
          Your Improvement Cards:
        </h3>  

        <div> </div>
      </div>

      <div  class="mt-1">
        
        <ul class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-4 sm:gap-6 lg:grid-cols-3">
          <li  class="col-span-1 flex rounded-md shadow-sm">
            <div class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-red-500 price"></div>
            <div class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-red-500 price"></div>
          </li>

        </ul>
      </div>




    </div>


<!-- Chosen Actions -->
<div class="relative ">
      <div class="md:flex md:items-center md:justify-between border-b border-gray-200 pt-5">
        <h3 class="text-base font-semibold leading-6 text-gray-900 ">
          Summary of selected Actions:
        </h3>  

        <div> </div>
      </div>

      <div  class="mt-1">
        
        <ul class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <li  class="col-span-1 flex rounded-md shadow-sm">
            <div class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-red-500 price"></div>
            <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div class="flex-1 truncate px-4 py-2 text-base">
                Price
                <p class="text-gray-500">{{ totalPriceEffect }}</p>
              </div>
              
            </div>
          </li>

          <li  class="col-span-1 flex rounded-md shadow-sm">
            <div class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-black class1"></div>
            <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div class="flex-1 truncate px-4 py-2 text-base">
                Products
                <p class="text-gray-500">{{ totalProductsEffect }}</p>
              </div>
              
            </div>
          </li>

          <li  class="col-span-1 flex rounded-md shadow-sm">
            <div class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-yellow-500 class6"></div>
            <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div class="flex-1 truncate px-4 py-2 text-base">
                Improvement
                <p class="text-gray-500">{{ totalImprovementsEffect }}</p>
              </div>
              
            </div>
          </li>

          <li  class="col-span-1 flex rounded-md shadow-sm">
            <div class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-purple-500 class7"></div>
            <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div class="flex-1 truncate px-4 py-2 text-base">
                Research
                <p class="text-gray-500">{{ totalResearchEffect }}</p>
              </div>
              
            </div>
          </li>

          <li  class="col-span-1 flex rounded-md shadow-sm">
            <div class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-purple-500 class2"></div>
            <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div class="flex-1 truncate px-4 py-2 text-base">
                Logistics
                <p class="text-gray-500">{{ totalLogisticsEffect }}</p>
              </div>
              
            </div>
          </li>

        </ul>
      </div>




    </div>



</div> 
  </main>
</template>

<style scoped>
/* Add the following styles for the flip animation */
.rotate-180 {
  transform: rotateY(180deg);
}

.class0 {
  background-color: yellowgreen;
}

.class1 {
  background-image: url('../assets/icons/product_icon.svg'); 
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black;
  font-size: x-small;
  color:gray;
}


.class1Reversed {
  background-image: url('../assets/icons/product_iconReversed.svg'); 
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black;
  font-size: x-small;
  color:gray;
}
.class2 {
  background-image: url('../assets/icons/logistics_icon.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #3c95d1;
  font-size: x-small;
}

.class2Reversed {
  background-image: url('../assets/icons/logistics_iconReversed.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #3c95d1;
  font-size: x-small;
}

.class3 {
  background-image: url('../assets/icons/products_icon.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black;
  font-size: x-small;
  color:gray;
}

.class3reversed {
  background-image: url('../assets/icons/products_iconReversed.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black;
  font-size: x-small;
  color:gray;
}

.class4 {
  background-image: url('../assets/icons/pricing_increase_icon.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #db4125;
  font-size: x-small;
  
}
.class4reversed {
  background-image: url('../assets/icons/pricing_increase_iconReversed.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #db4125;
  font-size: x-small;
  
}

.class5 {
  background-image: url('../assets/icons/product_price_icon.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: gray;
  font-size: x-small;
}

.class5reversed {
  background-image: url('../assets/icons/product_price_iconReversed.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: gray;
  font-size: x-small;
}

.class6 {
  background-image: url('../assets/icons/improvement_icon.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f6af54;
  font-size: x-small;
}

.class6Reversed {
  background-image: url('../assets/icons/improvement_iconReversed.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f6af54;
  font-size: x-small;
}
.class7 {
  background-image: url('../assets/icons/research_icon.svg');
  background-color: #8d7fb3;
  font-size: x-small;
}

.class7Reversed {
  background-image: url('../assets/icons/research_iconReversed.svg');
  background-color: #8d7fb3;
  font-size: x-small;
}

.price {
  background-image: url('../assets/icons/pricing_icon.svg');
  background-repeat: no-repeat;
  background-size: cover;

}

.before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: inherit;  /* Use the same background color as the parent div */
  border-radius: inherit;    /* Use the same border radius as the parent div */
  transform: scaleY(2);      /* Scale vertically to form a half-circle */
}

.classBlocked {
  background-color: yellowgreen;
}
</style>
