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
      showFilters: true,
      timeout: null
    };
  },
  computed: {
    ...mapGetters({
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
  },

  methods: {
    ...mapActions({
      setCharactersAsync: "setCharactersAsync",
      setFilterName: "setFilterName",
      setSearchBar: "setSearchBar",
      setIsLoadingCharacters: "setIsLoadingCharacters",
      setPage: "setPage",
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
    /** Othher functions */
    /**
     * searchCharacterByText() : void
     * Search characters by text on v-model searchCharacterText
     */
    async searchCharacterByText() {
      try {
        let stringFilter = this.getStringFilter();
        let stringFilters = `/character/?page=${this.page}&name=${this.searchBar}${stringFilter}`;
        const store = {
          endPointString: stringFilters,
          pageName: this.pageNameFromVuex,
        };
        await this.setAllActions(store);
      } catch (error) {
        console.log("error ", error);
      }
    },
    /**
     * getStringFilter() : string
     * Get the string to filter gender or status. If all, should return ''
     */
    getStringFilter() {
      let stringToReturn = "";
      if (this.gender === "All" || this.status === "All") {
        stringToReturn = "";
      } else if (this.gender.length > 0) {
        stringToReturn = `&${this.filterName.toLowerCase()}=${this.gender}`;
      } else if (this.status.length > 0) {
        stringToReturn = `&${this.filterName.toLowerCase()}=${this.status}`;
      }
      return stringToReturn;
    },
    goTo(refName) {
      let element = this.$refs[refName];
      let top = element.offsetTop;
      window.scrollTo(0, top);
    }
  },
};