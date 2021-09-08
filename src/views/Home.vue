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
          <input type="text" class="btn-buscar" />
          <input
            type="text"
            class="barra-buscar"
            placeholder="Buscar personaje..."
          />
          <input type="text" class="btn-filtro" />
        </div>
        <div class="cont-filters">
          <p class="filter-text">
            Filtro aplicados: <span>Status, Origin.</span>
          </p>
        </div>
      </div>
    </header>
    <BarVue />
    <!-- CARDS / NOT FOUND CONTAINER -->
    <div class="cont-cards">
      <div class="cont-favs-1">
        <div class="cont-favs-2">
          <h4>Mostrar favoritos:</h4>
          <img src="@/assets/img/home/no-active-star.svg" alt="Star" />
        </div>
      </div>
      <div class="container-cards">
        <template v-if="results">
          <CardVue
            @openModal="openModal"
            :info="character"
            v-for="(character, index) in charactersArray"
            v-bind:key="index"
          />
        </template>
        <SpinnerVue v-if="loading.loadingCharactersAtFirst || loading.loadingOtherCharacters" />
      </div>
      <!-- Not Found -->
      <no-results v-if="!loading.loadingAtLeastSomething && !results" />
    </div>
    <!-- Modal -->
    <ModalVue
      v-show="!noModal"
      class="fondo-oscuro animate__animated animate__bounceInRight"
      @close="toggleModal"
      @openModal="openModal"
    />
  </body>
</template>

<script>
import "animate.css";
import CardVue from "@/components/Card.vue";
import BarVue from "@/components/Bar.vue";
import ModalVue from "@/components/Modal.vue";
import clienteAxios from "@/config/axios";
import SpinnerVue from "@/components/Spinner.vue";
import NotFoundVue from "@/components/NotFound.vue";

export default {
  name: "Home",
  data() {
    return {
      noModal: true,
      charactersArray: [],
      loading: {
        loadingOtherCharacters: true,
        loadingCharactersAtFirst: true,
        loadingAtLeastSomething: true,
      },
      results: false,
      visibility: true,
      first: false,
      empty: false,
      page: 1,
    };
  },
  components: {
    CardVue,
    BarVue,
    ModalVue,
    SpinnerVue,
    "no-results": NotFoundVue,
  },
  computed: {
    characters() {
      return this.$store.state.characters;
    },
  },
  methods: {
    toggleModal() {
      this.noModal = !this.noModal;
    },
    /**
     * openModal() : void
     * Open the Modal even thougn it's already open.
     */
    openModal() {
      // Cerrar el modal brevemente.
      this.noModal = true;
      // After 0.5 sec open the modal.
      setTimeout(() => {
        this.noModal = false;
      }, 500);
    },
    async loadCharacters() {
      try {
        this.loading.loadingCharactersAtFirst = true;
        this.loading.loadingOtherCharacters = false;
        this.loading.loadingAtLeastSomething = true;
        const res = await clienteAxios.get("/character/?page=0");
        const characters = res.data.results;
        this.charactersArray = characters;
        this.results = true;
        console.log("characters.length ", characters.length);
        if (characters.length === 20) {
          this.page++;
        }
        console.log("this.charactersArray ", this.charactersArray);
      } catch (error) {
        console.log("error ", error);
        this.results = false;
      } finally {
        this.loading.loadingCharactersAtFirst = false;
        this.loading.loadingOtherCharacters = false;
        this.loading.loadingAtLeastSomething = false;
      }
    },
    /**
     * Tiene paginacion, ya que acumula los personajes.
     */
    async loadOtherCharacters() {
      try {
        this.loading.loadingOtherCharacters = true;
        this.loading.loadingCharactersAtFirst = false;
        this.loading.loadingAtLeastSomething = true;
        this.page++;
        const res = await clienteAxios.get(`/character/?page=${this.page}`);
        const characters = res.data.results;
        this.results = true;
        this.charactersArray = this.charactersArray.concat(characters);
        res.data.length < 20 ? (this.empty = true) : (this.empty = false);
        this.page++;
        console.log("this.charactersArray ", this.charactersArray);
      } catch (error) {
        console.log("error ", error);
        this.results = false;
      } finally {
        this.loading.loadingOtherCharacters = false;
        this.loading.loadingCharactersAtFirst = false;
        this.loading.loadingCharactersAtFirst = false;
      }
    },
    async eventScroll() {
      let vm = this;
      window.addEventListener("scroll", () => {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        /*
        console.log("scrollTop ", scrollTop);
        console.log("scrollHeight ", scrollHeight);
        console.log("clientHeight ", clientHeight);
        */
        if (scrollTop + clientHeight >= scrollHeight - 10 && !vm.empty) {
          console.log("en pagina ", vm.page);
          if (this.page === 1) {
            vm.loadCharacters();
          } else {
            vm.loadOtherCharacters();
          }
        }
      });
    },
  },
  async mounted() {
    await this.eventScroll();
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
      }
    }
  }
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
</style>
