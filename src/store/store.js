import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        characters: []
    },
    getters: {
      characters: (state)=>{
        return state.characters;
      }
    },
    mutations: {
      
    }
});