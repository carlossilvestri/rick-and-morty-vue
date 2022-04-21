<template>
  <div class="cont-barra">
    <ul v-show="filterName === 'Gender'">
      <li
        :class="{ 'clicked-active': gender === 'All' }"
        @click="changeLink('All')"
      >
        All
      </li>
      <li
        :class="{ 'clicked-active': gender === 'unknown' }"
        @click="changeLink('unknown')"
      >
        Unknown
      </li>
      <li
        :class="{ 'clicked-active': gender === 'female' }"
        @click="changeLink('female')"
      >
        Female
      </li>
      <li
        :class="{ 'clicked-active': gender === 'male' }"
        @click="changeLink('male')"
      >
        Male
      </li>
      <li
        :class="{ 'clicked-active': gender === 'genderless' }"
        @click="changeLink('genderless')"
      >
        Genderless
      </li>
    </ul>
    <ul v-show="filterName === 'Status'">
      <li
        :class="{ 'clicked-active': status === 'All' }"
        @click="changeLink('All')"
      >
        All
      </li>
      <li
        :class="{ 'clicked-active': status === 'alive' }"
        @click="changeLink('alive')"
      >
        Alive
      </li>
      <li
        :class="{ 'clicked-active': status === 'dead' }"
        @click="changeLink('dead')"
      >
        Dead
      </li>
      <li
        :class="{ 'clicked-active': status === 'unknown' }"
        @click="changeLink('unknown')"
      >
        Unknown
      </li>
    </ul>
  </div>
</template>

<script>
import { actionsMixin } from "@/mixins/actionsMixin.js";
export default {
  name: "Bar",
  mixins: [actionsMixin],
  data() {
    return {
      link: "All",
    };
  },
  methods: {
    /**
     * changeLink(linkClicked : string) : void
     * Change link variable.
     * @param linkClicked : string. Link string to update link variable.
     */
    changeLink(linkClicked) {
      let linkFilterObj = {
        filterName: this.filterName,
        gender: "All",
        status: "",
      };

      if (this.filterName === "Gender") {
        linkFilterObj = {
          filterName: this.filterName,
          gender: linkClicked,
          status: "",
        };
      }
      if (this.filterName === "Status") {
        linkFilterObj = {
          filterName: this.filterName,
          gender: "",
          status: linkClicked,
        };
      }
      console.log("linkFilterObj ", linkFilterObj);
      this.setlinkFilterrOnVuex(linkFilterObj);
      console.log("linkClicked ", linkClicked);
      this.link = linkClicked;
    },
  },
  watch: {
    link: function(newLink) {
      console.log("en watch link ", newLink);
      this.$emit("listenLink", newLink);
    },
    filterName: function() {
      this.changeLink("All");
    },
  },
};
</script>

<style lang="scss">
@import "~@/scss/_variables.scss";
@import "~@/scss/utilities.scss";
.cont-barra {
  background: #f2f2f2;
  height: 70px;
  @media (max-width: 720px) {
    height: auto;
  }
  ul {
    margin: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    font-family: $main-font;
    @media (max-width: 720px) {
      flex-direction: column;
      padding: 0;
    }
    li {
      list-style: none;
      font-weight: 400;
      cursor: pointer;
      width: 100px;
      text-align: center;
      height: 91%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 720px) {
        margin: 7px;
      }
    }
  }
}
</style>
