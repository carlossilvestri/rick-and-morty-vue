<template>
  <div class="cont-not-fount">
    <h4>{{ noResultsObj.primaryText }}</h4>
    <p>{{ noResultsObj.secondaryText }}</p>
    <button v-if="noResultsObj.showButton" class="btn-1" @click="deleteFilters">
      {{ noResultsObj.thirdText }}
    </button>
  </div>
</template>

<script>
import { actionsMixin } from "@/mixins/actionsMixin.js";
export default {
  name: "NotFoundVue",
  props: ["noResultsObj"],
  mixins: [actionsMixin],
  methods: {
    /**
     * deleteFilters() : void
     * This function emits an event to its parent ('deleteFilters').
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
  },
};
</script>

<style lang="scss">
@import "~@/scss/_variables.scss";
@import "~@/scss/utilities.scss";
.cont-not-fount {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  h4 {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 43px;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 40px 0 10px 0;
  }
  p {
    font-family: $secondary-font;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
    color: #5e5e5e;
  }
}
</style>
