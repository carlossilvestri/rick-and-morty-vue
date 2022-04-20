import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import clienteAxios from "@/config/axios";

const vuexLocal = new VuexPersist({
  storage: window.sessionStorage,
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    characters: [],
    linkFilter: {
      gender: {
        isActive: true,
        name: "All"
      },
      status: {
        isActive: false,
        name: ""
      }
    },
    isLoadingCharacters: false,
    favoriteCharacters: [],
    selectedCharacter: {},
    endPointString: "",
    pageName: "",
  },
  getters: {
    characters: (state) => {
      return state.characters;
    },
    linkFilter: (state) => {
      return state.linkFilter;
    },
    gender: (state) => {
      return state.linkFilter.gender.name;
    },
    status: (state) => {
      return state.linkFilter.status.name;
    },
    isThereCharacters: (state) => {
      return state.characters.length > 0;
    },
    isLoadingCharacters: (state) => {
      return state.isLoadingCharacters;
    },
    favoriteCharacters: (state) => {
      return state.favoriteCharacters;
    },
    isThereFavoriteCharacters: (state) => {
      return state.favoriteCharacters.length > 0;
    },
    selectedCharacter: (state) => {
      return state.selectedCharacter;
    },
    pageName: (state) => {
      return state.pageName;
    },
    endPointString: (state) => {
      return state.endPointString;
    },
  },
  mutations: {
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param [{}] characters
     */
    setCharacters: (state, characters) => {
      state.characters = characters;
    },
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param string linkFilter
     */
    setlinkFilter: (state, linkFilter) => {
      state.linkFilter = linkFilter;
    },
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param boolean : isLoadingCharacters
     */
    setIsLoadingCharacters: (state, isLoadingCharacters) => {
      state.isLoadingCharacters = isLoadingCharacters;
    },
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param [{}] characters
     */
    setFavoriteCharaters: (state, characters) => {
      state.favoriteCharacters = characters;
    },
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param {} character
     */
    addFavoriteCharater: (state, character) => {
      state.favoriteCharacters = [...state.favoriteCharacters, character];
    },
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param {} character
     */
    deleteFavoriteCharater: (state, character) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        (c) => c.id !== character.id
      );
    },
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param {} character
     */
    setSelectedCharacter: (state, character) => {
      state.selectedCharacter = character;
    },
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param string endPointString
     */
    setEndPointString: (state, endPointString) => {
      state.endPointString = endPointString;
    },
    /**
     *
     * @param { characters: [{}], favoriteCharacters: [], selectedCharacter: {}, endPointString: "", pageName: ""}} state
     * @param string pageName
     */
    setPageName: (state, pageName) => {
      state.pageName = pageName;
    },
  },
  actions: {
    /**
     *
     * @param context : ActionContext<Store>
     * @param [{}] characters
     */
    setCharacters: (context, characters) => {
      context.commit("setCharacters", characters);
    },
    /**
     *
     * @param context : ActionContext<Store>
     * @param string linkFilter
     */
    setlinkFilter: (context, linkFilter) => {
      context.commit("setlinkFilter", linkFilter);
    },
    /**
     *
     * @param context : ActionContext<Store>
     * @param string : endPoint
     */
    setCharactersAsync: async (context, endPoint) => {
      context.commit("setIsLoadingCharacters", true); // Is loading data
      try {
        const res = await clienteAxios.get(endPoint);
        const characters = res.data.results;
        context.commit("setCharacters", characters);
      } catch (error) {
        console.log("error ", error);
        if (
          error.message &&
          error.message === "Request failed with status code 404"
        ) {
          context.commit("setCharacters", []);
        }
      } finally {
        context.commit("setIsLoadingCharacters", false); // Is not loading data
      }
    },
    /**
     *
     * @param context : ActionContext<Store>
     * @param {} character
     */
    setFavoriteCharaters: (context, character) => {
      context.commit("setFavoriteCharaters", character);
    },
    /**
     *
     * @param context : ActionContext<Store>
     * @param {} character
     */
    addFavoriteCharater: (context, character) => {
      context.commit("addFavoriteCharater", character);
    },
    /**
     *
     * @param context : ActionContext<Store>
     * @param {} character
     */
    deleteFavoriteCharater: (context, character) => {
      context.commit("deleteFavoriteCharater", character);
    },
    /**
     *
     * @param context : ActionContext<Store>
     * @param {} character
     */
    setSelectedCharacter: (context, character) => {
      context.commit("setSelectedCharacter", character);
    },
    /**
     *
    * @param context : ActionContext<Store>
     * @param string endPointString
     */
    setEndPointString: (context, endPointString) => {
      context.commit("setEndPointString", endPointString);
    },
    /**
    *
    * @param context : ActionContext<Store>
     * @param string pageName
     */
    setPageName: (context, pageName) => {
      context.commit("setPageName", pageName);
    },
  },
});
