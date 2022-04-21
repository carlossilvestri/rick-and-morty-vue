<template>
  <div class="animate__animated animate__fadeIn">
    <!-- CARDS / NOT FOUND CONTAINER -->
    <div class="cont-cards">
      <div class="cont-favs-1-f">
        <div class="cont-favs-2">
          <h4>Mostrar favoritos:</h4>
          <img
            src="@/assets/img/home/active-star.svg"
            alt="Star"
            @click="changeRoute(homeDirectoryPath)"
          />
        </div>
      </div>
      <div class="container-cards">
        <template v-if="isThereFavoriteCharacters">
          <CardVue
            @openModal="openModal"
            :info="character"
            v-for="(character, index) in charactersCopy"
            v-bind:key="index"
          />
        </template>
      </div>
      <!-- Not Found -->
      <div class="m-4">
        <no-results
          v-if="!isThereFavoriteCharacters"
          :noResultsObj="noResultsObj"
        />
        <no-results
          v-if="isThereFavoriteCharacters && charactersCopy.length === 0"
          :noResultsObj="noFilterResultsObj"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
import CardVue from "@/components/Card.vue";
import NotFoundVue from "@/components/NotFound.vue";
import { actionsMixin } from "@/mixins/actionsMixin.js";

export default {
  name: "Favorites",
  data() {
    return {
      /**Obj of the button */
      noResultsObj: {
        primaryText: "Uh-oh!",
        secondaryText: "¡Aún no tienes favoritos!",
        thirdText: "Eliminar filtros",
        showButton: false,
      },
      /**Obj of the button */
      noFilterResultsObj: {
        primaryText: "Uh-oh!",
        secondaryText: "¡No hay personajes favoritos con esos filtros!",
        thirdText: "Eliminar filtros",
        showButton: false,
      },
      charactersCopy: [],
    };
  },
  components: {
    CardVue,
    "no-results": NotFoundVue,
  },
  mixins: [actionsMixin],
  methods: {
    setFavoriteCharactersCopy() {
      this.charactersCopy = JSON.parse(JSON.stringify(this.favoriteCharacters)); // Copy by value, not by reference
    },
  },
  mounted() {
    this.resetLinkFilter();
  },
  watch: {
    favoriteCharacters: function () {
      this.setFavoriteCharactersCopy();
    },
    linkFilter: function (linkFilterNew) {
      this.setFavoriteCharactersCopy(); // Reset characters.
      if (
        linkFilterNew.filterName === "Gender" &&
        linkFilterNew.gender !== "All"
      ) {
        // Filter by gender...
        this.charactersCopy = this.charactersCopy.filter(
          (characterC) =>
            characterC.gender.toLowerCase() == linkFilterNew.gender
        );
        return;
      }
      if (
        linkFilterNew.filterName === "Status" &&
        linkFilterNew.status !== "All"
      ) {
        // Filter by gender...
        this.charactersCopy = this.charactersCopy.filter(
          (characterC) =>
            characterC.status.toLowerCase() == linkFilterNew.status
        );
        return;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/scss/_variables.scss";
@import "~@/scss/utilities.scss";

.cont-cards {
  .cont-favs-1-f {
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
