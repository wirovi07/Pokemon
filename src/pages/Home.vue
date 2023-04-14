
<script setup>
    import { reactive, toRefs, computed } from 'vue';

    const state = reactive({
        pokemons: [],
        name: '',
        filterPokemon:computed(()=>searchPokemon())
    })
    
    function searchPokemon(){
        return state.pokemons.filter((pokemon)=>pokemon.name.includes(state.name.toLowerCase()))
    }

    const { name, filterPokemon } = toRefs(state) // Se utiliza esta linea para no colocar {{state.pokemos}}

    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        data.results.forEach((element, index)=>{
            const pokemon = {
                ...element,
                index: index + 1                
            }
            state.pokemons.push(pokemon)
        })
    })
</script>

<template>
    <div>
        <div style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-row-gap: 0.25rem; grid-column-gap: 0.25rem;">

            <div style="grid-column: span 1;">
                <input type="text"
                    style="margin: 3px; padding:10px;border: 2px solid #000; border-width: 2px; border-style: solid; width:150px;"
                    placeholder="Nombre del Pokemon"  v-model="name"
                >
                
                <ul style="list-style: none; padding:0; overflow-y: auto; height: 600px;">
                    <li v-for="pokemon in filterPokemon" :key="pokemon.index" style="padding:10px 0 10px 0; border-radius: 0.375rem; hover:color: #ef4444;"> 
                        <span style="font-size: small; font-weight: 700;  color: #6b7280; margin: 10px"># {{ pokemon.index }}</span>
                        <router-link :to="`/details/${pokemon.index}`">{{pokemon.name}}</router-link>                        
                    </li>
                </ul>
            </div>

            <div style="grid-column: span 5;">
                <router-view></router-view>
            </div>

        </div>
        <!-- <router-link to="/details">Detalles</router-link> -->
    </div>
</template>