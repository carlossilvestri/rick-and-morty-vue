<template>
  <div>
    <!-- CARDS / NOT FOUND CONTAINER -->
    <div class="cont-cards">
      <div class="cont-favs-1">
        <div class="cont-favs-2">
          <h4 @click="changeRoute('/app/favorites')">Mostrar favoritos:</h4>
          <img
            src="@/assets/img/home/no-active-star.svg"
            alt="Star"
            @click="changeRoute('/app/favorites')"
          />
        </div>
      </div>
      <div class="container-cards">
        <template v-if="isThereCharacters">
          <CardVue
            @openModal="openModal"
            :info="character"
            v-for="(character, index) in characters"
            v-bind:key="index"
          />
        </template>
        <SpinnerVue v-if="isLoadingCharacters" />
      </div>
      <!-- Not Found -->
      <no-results
        v-if="!isLoadingCharacters && !isThereCharacters"
        @deleteFilters="listenBar"
        :noResultsObj="noResultsObj"
      />
      <!-- Pagination -->
      <div class="cont-pagination" v-if="!isLoadingCharacters">
        <button class="btn-1" @click="onChangePage('prev')">Anterior</button>
        <p>{{ page }}</p>
        <button class="btn-1" @click="onChangePage('next')">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
import CardVue from "@/components/Card.vue";
import SpinnerVue from "@/components/Spinner.vue";
import clienteAxios from "@/config/axios";
import NotFoundVue from "@/components/NotFound.vue";
import { actionsMixin } from "@/mixins/actionsMixin.js";

export default {
  name: "Home",
  data() {
    return {
      pageName: "/app/home",
      noResultsObj: {
        primaryText: "Uh-oh!",
        secondaryText: "¡Pareces perdido en tu viaje!",
        thirdText: "Eliminar filtros",
        showButton: true,
      },
    };
  },
  components: {
    CardVue,
    SpinnerVue,
    "no-results": NotFoundVue,
  },
  mixins: [actionsMixin],
  methods: {
    /**
     * searchCharacterByText() : void
     * Search characters by text on v-model searchCharacterText
     */
    async searchCharacterByText() {
      try {
        this.results = false;
        this.loading = true;
        let stringFilter = this.getStringFilter();
        let stringFilters = `/character/?page=${this.page}&name=${this.searchCharacterText}${stringFilter}`;
        const res = await clienteAxios.get(stringFilters);
        const characters = res.data.results;
        this.charactersArray = characters;
        const store = {
          endPointString: stringFilters,
          pageName: this.pageName,
          characters,
        };
        this.setAllActions(store);
        this.results = true;
      } catch (error) {
        console.log("error ", error);
        this.results = false;
      } finally {
        this.loading = false;
      }
    },
    /**
     * getStringFilter() : string
     * Get the string to filter gender or status. If all, should return ''
     */
    getStringFilter() {
      let stringToReturn = "";
      let genderOrStatusString = this.knowIfItIsByGenderOrStatus();
      if (this.gender === "All") {
        stringToReturn = "";
      } else {
        stringToReturn = `&${genderOrStatusString}=${this.gender}`;
      }
      return stringToReturn;
    },
    /**
     * onChangePage(pageAction : string) : void
     * @param pageAction : string. 2 possible strings 'prev' decrement page 'next' increment page.
     * This function is called when the user click on 'Anterior' or 'Siguiente'. This function calls other functions relying on the parameters and validations.
     */
    onChangePage(pageAction) {
      console.log("this.page ", this.page);
      console.log("pageAction", pageAction);
      // Page could not be 0
      if (!this.page || (pageAction === "prev" && this.page == 1)) {
        return;
      }
      if (pageAction === "next") {
        this.setPage(this.page + 1);
      }
      if (pageAction === "prev") {
        this.setPage(this.page - 1);
      }
      if (this.searchCharacterText.length > 0) {
        this.searchCharacterByText();
      }
      if (this.gender === "All") {
        this.loadOtherCharacters();
      } else {
        this.searchCharacterText();
      }
    },
    /**
     * toggleModal() : void
     * This function is responsible of changing variable 'noModal'. If it's true it assigns to false, if it's false it assigns to true.
     */
    toggleModal() {
      this.noModal = !this.noModal;
    },
    /**
     * listenBar(gender : string) : void
     * @param gender : string.
     * When the user click on the links of the bar, this function is responsible for calling the end points to get the info.
     */
    listenBar(gender) {
      // These variables will be used when calling the end point.
      this.gender = gender;
      this.page = 1;
      // Not a gender. Call normal end point.
      if (gender === "All") {
        this.loadCharacters();
        return;
      }
      this.searchCharacterByText();
    },
    async changeCards() {
      try {
        this.results = false;
        this.loading = true;
        let genderOrStatusString = this.knowIfItIsByGenderOrStatus();
        let stringFilters = `/character/?page=${this.page}&${genderOrStatusString}=${this.gender}`;
        const res = await clienteAxios.get(stringFilters);
        const characters = res.data.results;
        const store = {
          endPointString: stringFilters,
          pageName: this.pageName,
          characters,
        };
        this.setAllActions(store);
        this.charactersArray = characters;
        this.results = true;
      } catch (error) {
        console.log("error ", error);
        this.results = false;
      } finally {
        this.loading = false;
      }
    },
    /**
     * knowIfItIsByGenderOrStatus() : string
     * This function return 'gender' or 'status'. Useful to know what parameters to filter.
     */
    knowIfItIsByGenderOrStatus() {
      let stringDecision = "";
      if (this.filterBar == "Gender") {
        stringDecision = "gender";
      }
      if (this.filterBar == "Status") {
        stringDecision = "status";
      }
      return stringDecision;
    },
    /**
     * openModal(idCard) : void
     * Open the Modal even thougn it's already open.
     */
    openModal(idCard) {
      this.searchCardById(idCard);
      // Cerrar el modal brevemente.
      this.noModal = true;
      // After 0.5 sec open the modal.
      setTimeout(() => {
        this.noModal = false;
      }, 500);
    },
    /**
     * searchCardById(idCard : int) : void
     * @param idCard : int.
     * Call an end-point to get info of an especific card by its id.
     */
    async searchCardById(idCard) {
      let url = `/character/${idCard}`;
      let res = await clienteAxios.get(url);
      this.dataForModal = res.data;
    },
    /**
     * loadCharacters() : void
     * This function fills charactersArray variable, to load the characters to be shown, but loads jus the first page.
     */
    async loadCharacters() {
      try {
        this.loading = true;
        let stringFilters = "/character/?page=1";
        const res = await clienteAxios.get(stringFilters);
        const characters = res.data.results;
        this.charactersArray = characters;
        // const store = { endPointString: stringFilters, pageName: this.pageName, characters  }
        // this.setAllActions(store);
        this.results = true;
      } catch (error) {
        console.log("error ", error);
        this.results = false;
      } finally {
        this.loading = false;
      }
    },
    /**
     * loadOtherCharacters() : void
     * This function fills charactersArray variable, to load the characters to be shown. It loads by page.
     */
    async loadOtherCharacters() {
      try {
        this.loading = true;
        let stringFilters = `/character/?page=${this.page}`;
        const res = await clienteAxios.get(stringFilters);
        const characters = res.data.results;
        const store = {
          endPointString: stringFilters,
          pageName: this.pageName,
          characters,
        };
        this.setAllActions(store);
        this.results = true;
        this.charactersArray = characters;
      } catch (error) {
        console.log("error ", error);
        this.results = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/scss/_variables.scss";
@import "~@/scss/utilities.scss";
.header-cont-home {
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 50vh;
  background: url("../assets/img/home/bg-home.svg");
  background-position: center;
  background-size: cover;
  .cont-text-home {
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 20%;
    position: relative;
    .cont-img-rick-and-morty {
      text-align: center;
      .img-rick-and-morty {
        max-width: 100%;
        display: block;
        margin: 0 auto;
      }
    }
  }
  .cont-filters {
    background: #f2f2f2;
    border-radius: 6px;
    margin-top: 15px;
    margin-right: 24px;
    @media (max-width: 720px) {
      max-width: 393px;
      margin-right: 0;
    }
    .filter-text {
      color: #34c759;
      font-family: $main-font;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      padding: 5px;
      margin: 2px;
      width: 393px;
      @media (max-width: 720px) {
        max-width: 393px;
        width: auto;
      }
      span {
        color: $main-color;
        font-weight: normal;
        cursor: pointer;
        &:hover {
          color: #34c759;
        }
      }
    }
  }
}
.selected {
  color: #34c759 !important;
}
.cont-cards {
  .cont-favs-1 {
    .cont-favs-2 {
      max-width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      h4 {
        font-family: $main-font;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #000000;
        margin: 40px 10px 40px 20px;
      }
      img {
        cursor: pointer;
      }
    }
  }
  .container-cards {
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    align-items: center;
  }
}
.cont-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-family: $main-font;
  }
  button {
    margin: 10px;
  }
}
</style>
