<template>
  <div class="animate__animated animate__fadeIn">
    <!-- CARDS / NOT FOUND CONTAINER -->
    <div class="cont-cards">
      <div class="cont-favs-1 d-flex align-items-center justify-content-around">
        <div class="cont-favs-2">
          <h4>Mostrar favoritos:</h4>
          <img
            src="@/assets/img/home/no-active-star.svg"
            alt="Star"
            @click="changeRoute(favoritePath)"
          />
        </div>
        <button class="btn-1 me-2" @click="deleteFilters()">Resetear filtros</button>
        <button class="btn-1 me-2" @click="getRandomCharacters(25)">Mostrar personajes al azar</button>
      </div>
      <button class="scroll-down" @click="goTo('pagination')"  data-toggle="tooltip" data-placement="bottom" title="Ir abajo"></button>
      <div class="container-cards">
        <template v-if="isThereCharacters && !isLoadingCharacters">
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
        :noResultsObj="noResultsObj"
      />
      <!-- Pagination -->
      <div class="cont-pagination" v-if="!isLoadingCharacters" ref="pagination">
        <button class="btn-1" @click="onChangePage('prev')">Anterior</button>
        <p class="mb-0 mx-3">{{ page }}</p>
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
     * onChangePage(pageAction : string) : void
     * @param pageAction : string. 2 possible strings 'prev' decrement page 'next' increment page.
     * This function is called when the user click on 'Anterior' or 'Siguiente'. This function calls other functions relying on the parameters and validations.
     */
    async onChangePage(pageAction) {
      // Page could not be 0
      if (!this.page || (pageAction === "prev" && this.page === 1)) {
        return;
      }
      if (pageAction === "next") {
        this.setPage(this.page + 1);
      }
      if (pageAction === "prev") {
        this.setPage(this.page - 1);
      }
      await this.updateSearch();
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
