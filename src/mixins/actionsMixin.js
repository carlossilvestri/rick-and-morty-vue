import { mapActions, mapGetters } from "vuex";
export const actionsMixin = {
  data() {
    return {
      charactersArray: [],
      loading: true,
      results: false,
      visibility: true,
      first: false,
      empty: false,
      dataForModal: {},
      searchCharacterText: "",
      filterBarText: "Gender",
      showFilters: true
    };
  },
  computed: mapGetters({
    characters: "characters",
    gender: "gender",
    status: "status",
    page: "page",
    searchBar: "searchBar",
    linkFilter: "linkFilter",
    filterName: "filterName",
    isThereCharacters: "isThereCharacters",
    isThereFavoriteCharacters: "isThereFavoriteCharacters",
    isLoadingCharacters: "isLoadingCharacters",
    favoriteCharacters: "favoriteCharacters",
    selectedCharacter: "selectedCharacter",
    pageNameFromVuex: "pageName",
    isTherePageName: "isTherePageName",
    endPointString: "endPointString",
  }),
  methods: {
    ...mapActions({
      setCharactersAsync: "setCharactersAsync",
      setFilterName: "setFilterName",
      setSearchBar: "setSearchBar",
      setPage: "setPage"
          }),
    /**
     * This method is used to set pageName to vuex store and move to that route.
     * return void
     * @param string newRoute 
     */
    changeRoute(newRoute) {
      this.setPageNameOnVuex(newRoute);
      this.$router.push(newRoute);
    },
    async setAllActions(store) {
      const {
        /*favoriteCharacters = [], selectedCharacter = {}, */ endPointString,
        pageName = "",
      } = store;
      console.log(store);
      this.setEndPointStringOnVuex(endPointString);
      this.setPageNameOnVuex(pageName);
      await this.setCharactersAsync(endPointString);
    },
    /**
     * setCharactersOnVuex() : void
     * @param [{}] characters
     */
    setCharactersOnVuex(characters) {
      this.$store.dispatch("setCharacters", characters);
    },
    /**
     * setGenderOnVuex() : void
     * @param linkFilter : linkFilter
     */
     setlinkFilterrOnVuex(linkFilter) {
      this.$store.dispatch("setlinkFilter", linkFilter);
    },
    /**
     * setFavoriteCharatersOnVuex() : void
     * @param [{}] characters
     */
    setFavoriteCharatersOnVuex(characters) {
      this.$store.dispatch("setFavoriteCharaters", characters);
    },
    /**
     * setEndPointStringOnVuex() : void
     * @param [{}] characters
     */
    setEndPointStringOnVuex(endPointString) {
      this.$store.dispatch("setEndPointString", endPointString);
    },
    /**
     * setPageNameOnVuex() : void
     * @param string pageName
     */
    setPageNameOnVuex(pageName) {
      this.$store.dispatch("setPageName", pageName);
    },
    /**
     * setSelectedCharacterOnVuex() : void
     * @param {} character
     */
    setSelectedCharacterOnVuex(character) {
      this.$store.dispatch("setSelectedCharacter", character);
    },
    setCharactersAsyncOnVuex: (endPoint) => {
      this.$store.dispatch("setCharactersAsync", endPoint);
    },
    /**
     * openModal() : void
     * Emit event 'openModal' to the parent to open the modal.
     */
    openModal() {
      this.setSelectedCharacterOnVuex({}); // Close the modal
      // After 0.5 sec open the modal.
      setTimeout(() => {
        this.setSelectedCharacterOnVuex(this.info);
      }, 300);
    },
    isObjEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
  },
};
