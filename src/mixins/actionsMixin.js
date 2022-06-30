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
      timeout: null,
      homeDirectoryPath: "/app/home",
      favoritePath: "/app/favorites",
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
    /** VUEX - RELATED FUNCTIONS: */
    /**
     * This method is used to set pageName to vuex store and move to that route.
     * returns void
     * @param string newRoute
     */
    changeRoute(newRoute) {
      this.setPageNameOnVuex(newRoute);
      this.$router.push(newRoute);
    },
    /**
     * This method calls some repeated methods like setEndPointString, setPageName and call the API using setCharactersAsync method.
     * @param { endPointString, pageName = ""}  store 
     */
    async setAllActions(store) {
      const { endPointString, pageName = ""} = store;
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
     * setlinkFilterrOnVuex() : void
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
     * @param string endPointString
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
    /**
     * setSelectedCharacterOnVuex() : void
     * @param string endPoint
     */
    setCharactersAsyncOnVuex: (endPoint) => {
      this.$store.dispatch("setCharactersAsync", endPoint);
    },
    /** Othher functions */
    /**
     * openModal() : void
     * Define setSelectedCharacter variable to show the modal after 0.3 second (For animation).
     */
    openModal() {
      this.setSelectedCharacterOnVuex({}); // Close the modal
      // After 0.3 sec open the modal.
      setTimeout(() => {
        this.setSelectedCharacterOnVuex(this.info);
      }, 300);
    },
    /**
     * This function update the search of characters, but check the route first
     */
    async updateSearch() {
      if (this.pageNameFromVuex !== this.homeDirectoryPath) return;
      await this.searchCharacterByText();
    },
    /**
     * This method is used to reset linkFilter to its original value.
     * resetLinkFilter() : void
     */
    resetLinkFilter() {
      const linkFilter = {
        filterName: "Gender",
        gender: "All",
        status: "",
      };
      this.setlinkFilterrOnVuex(linkFilter);
    },
    /**
     * deleteFilters() : void
     * This function reset all filters.
     */
    async deleteFilters() {
      // Reset filters
      this.resetLinkFilter();
      this.setPage(1); // Not auto update...
      if (this.searchBar.length === 0) {
        await this.updateSearch();
        return;
      }
      this.setSearchBar(""); // Call automatically the api if there was a change (auto update).
    },
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
     * getRandomCharacters() : void
     * @param number numberOfCharacters
     * @returns void
     */
    async getRandomCharacters(qtyOfCharacters) {
      try {
        let idCharacters = [];
        for (let index = 0; index < qtyOfCharacters; index++) {
          const randomIntNumber = this.getRandomIntNumber(1, qtyOfCharacters);
          // Check if the number is already in the array
          if (!idCharacters.includes(randomIntNumber)) {
            idCharacters.push(randomIntNumber);
          } else {
            qtyOfCharacters++;
          }
        }
        let stringFilters = `/character/${idCharacters}`;
        const store = {
          endPointString: stringFilters,
          pageName: this.pageNameFromVuex,
        };
        this.setPage(1);
        this.resetLinkFilter();
        await this.setAllActions(store);
      } catch (error) {
        console.log("error ", error);
      }
    },
    /**
     * getStringFilter() : void
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
    /**
     * This function let you scroll automatically where the refs element is.
     * @param string refName
     */
    goTo(refName) {
      let element = this.$refs[refName];
      let top = element.offsetTop;
      window.scrollTo(0, top);
    },
    /**
     * Get a random integer number from min to max.
     * @param number min
     * @param number max
     * @returns number
     */
    getRandomIntNumber(min, max) {
      let num = Math.random() * (max - min);
      let numToReturn = parseInt(num + min);
      return numToReturn;
    },
  },
};
