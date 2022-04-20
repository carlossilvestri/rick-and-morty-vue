<template>
  <div>
    <!-- CARDS / NOT FOUND CONTAINER -->
    <div class="cont-cards">
      <div class="cont-favs-1">
        <div class="cont-favs-2 m-3">
          <button class="btn-1" @click="changeRoute('/app/home')">
            Ir a home
          </button>
        </div>
      </div>
      <div class="container-cards">
        <template v-if="isThereFavoriteCharacters">
          <CardVue
            @openModal="openModal"
            :info="character"
            v-for="(character, index) in favoriteCharacters"
            v-bind:key="index"
          />
        </template>
      </div>
      <!-- Not Found -->
      <div class="m-4">
        <no-results
          v-if="!isThereFavoriteCharacters"
          @deleteFilters="listenBar"
          :noResultsObj="noResultsObj"
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
      pageName: "/app/favorites",
      noResultsObj: {
        primaryText: "Uh-oh!",
        secondaryText: "¡Aún no tienes favoritos!",
        thirdText: "Eliminar filtros",
        showButton: false
      },
    };
  },
  components: {
    CardVue,
    "no-results": NotFoundVue,
  },
  mixins: [actionsMixin],
  methods: {},
  async mounted() {
    await this.loadCharacters();
  },
};
</script>

<style lang="scss">
@import "~@/scss/_variables.scss";
@import "~@/scss/utilities.scss";
</style>
