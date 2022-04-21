<template>
  <body class="animate__animated animate__fadeIn">
    <header class="header-cont-home">
      <div class="cont-text-home">
        <div class="cont-img-rick-and-morty">
          <img
            class="animate__animated animate__backInDown img-rick-and-morty"
            src="@/assets/img/home/rick-and-morty-md.svg"
            alt="Rick and Morty"
          />
        </div>
        <div class="barra-container">
          <input
            type="text"
            class="btn-buscar"
            @click="updateSearch()"
          />
          <input
            type="text"
            class="barra-buscar"
            v-model="searchCharacterText"
            placeholder="Buscar personaje..."
            @keyup.enter="updateSearch()"
          />
          <input
            type="text"
            class="btn-filtro"
            @click="showFilters = !showFilters"
          />
        </div>
        <div class="cont-filters" v-show="showFilters">
          <p class="filter-text">
            Filtrar por:
            <span
              @click="setFilterName('Status')"
              :class="{ selected: filterName == 'Status' }"
              >Status,</span
            >
            <span
              @click="setFilterName('Gender')"
              :class="{ selected: filterName == 'Gender' }"
            >
              Gender.</span
            >
          </p>
        </div>
      </div>
    </header>
    <BarVue />
    <router-view />
    <!-- Modal -->
    <ModalVue
      v-if="selectedCharacter.id ? true : false"
      class="fondo-oscuro animate__animated animate__bounceInRight"
      :data="selectedCharacter"
    />
  </body>
</template>

<script>
import "animate.css";
import BarVue from "@/components/Bar.vue";
import ModalVue from "@/components/Modal.vue";
import { actionsMixin } from "@/mixins/actionsMixin.js";

export default {
  name: "ContainerMain",
  components: {
    BarVue,
    ModalVue,
  },
  mixins: [actionsMixin],
  methods: {
    /**
     * loadCharacters() : void
     * This function fills charactersArray variable, to load the characters to be shown, but loads jus the first page.
     */
    async loadCharacters() {
      // If the user is not in "/app/home", don't load call the api.
      if (this.pageNameFromVuex !== this.homeDirectoryPath) return;
      try {
        let stringFilters =
          this.endPointString.length > 0
            ? this.endPointString
            : "/character/?page=1";
        const store = {
          endPointString: stringFilters,
          pageName: this.pageNameFromVuex,
        };
        await this.setAllActions(store);
      } catch (error) {
        console.log("error ", error);
      }
    },
  },
  async mounted() {
    this.searchCharacterText = this.searchBar;
    await this.loadCharacters();
  },
  watch: {
    searchCharacterText: function (searchString) {
      this.setSearchBar(searchString);
    },
    searchBar: function (searchString) {
      this.searchCharacterText = searchString;
      if (this.pageNameFromVuex !== this.homeDirectoryPath) return;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setPage(1);
        this.updateSearch();
      }, 1000);
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
