<script setup>
    import {useRoute} from 'vue-router' //Para poder capturar esa ID que estamos pasando en los parametros
    import BarChart from '../components/BarChart.vue'
    import RadarChart from '../components/RadarChart.vue'
    import { reactive, toRefs, computed, ref, onMounted, watch } from 'vue';
    
    const state = reactive({
        pokemon:null,
        stats:computed(()=> filterStats()),
        types:computed(()=> filterTypes())
    })

    function filterStats(){
        if(state.pokemon){
            return state.pokemon.stats.map((stat)=> stat.base_stat)
        }
    }

    function filterTypes(){
        if(state.pokemon){
            return state.pokemon.types.map((type)=> type.type.name)
        }
    }

    const route = useRoute()
    const {pokemon, stats, types} = toRefs(state)

    const getData = async() => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
        .then((res)=>res.json())
        .then((data)=>{
            state.pokemon = data
        })
    }


    watch(route,()=>{
        getData()
    })

    onMounted(()=>{
        getData()
    })

    //cambio de grafica
    const isBarChart = ref(true)

    const changeChart = () => {
        isBarChart.value = !isBarChart.value
    }



    //console.log(route.params.id) 
</script>

<template>
    <div>
        <div v-if="pokemon">
            <div style="width: calc(4/6 * 100%); margin: auto; border-radius: 10px; padding: 10px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
                <h1 class="md:text-3xl text-xl" style="font-weight: 900; color: #B91C1C; margin: 10px">{{pokemon.name}}</h1>

                <span v-for="type in types" :key="type" style="padding: 5px 5px 5px 5px; font-weight: 900; border-radius: 10px; background-color: red; color: white; margin: 3px; ">
                    {{ type }}
                </span>

                <div style="display: flex; flex-wrap">

                    <div style="flex-grow: 1; padding:80px">
                        <img style="width: 150px; height: 150px; display:block; margin: 0 auto" :src="pokemon.sprites.front_default" :alt="`imagen de ${pokemon.name}`">
                    </div>

                    <div style="flex-grow: 1;">
                        <button @click="changeChart()">{{isBarChart?"Radar":"Bar"}}</button>
                        <!-- {{ isBarChart }} -->
                        <!-- <bar-chart :stats="stats"/> -->
                        <component
                        :is="isBarChart ? BarChart:RadarChart"
                        :stats="stats"
                        />
                    </div>

                </div>           
            </div>
        </div>
        <div v-else>
            <p>No hay datos disponibles</p>
        </div>        
    </div>
</template>
