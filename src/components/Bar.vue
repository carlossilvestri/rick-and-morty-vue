<template>
  <div class="cont-barra">
    <ul v-show="filterBar === 'Gender'">
      <li :class="{'clicked-active': link === 'All'}" @click="changeLink('All')">All</li>
      <li :class="{'clicked-active': link === 'unknown'}" @click="changeLink('unknown')">Unknown</li>
      <li :class="{'clicked-active': link === 'female'}" @click="changeLink('female')">Female</li>
      <li :class="{'clicked-active': link === 'male'}" @click="changeLink('male')">Male</li>
      <li :class="{'clicked-active': link === 'genderless'}" @click="changeLink('genderless')">Genderless</li>
    </ul>
    <ul v-show="filterBar === 'Status'">
      <li :class="{'clicked-active': link === 'All'}" @click="changeLink('All')">All</li>
      <li :class="{'clicked-active': link === 'alive'}" @click="changeLink('alive')">Alive</li>
      <li :class="{'clicked-active': link === 'dead'}" @click="changeLink('dead')">Dead</li>
      <li :class="{'clicked-active': link === 'unknown'}" @click="changeLink('unknown')">Unknown</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Bar",
  props: ["filterBar"],
  data(){
    return{
      link: 'All'
    }
  },
  methods: {
    /**
     * changeLink(linkClicked : string) : void
     * Change link variable.
     * @param linkClicked : string. Link string to update link variable.
     */
    changeLink(linkClicked){
      this.link = linkClicked;
    }
  },
  watch: {
    link: function(newLink){
      console.log("newLink ", newLink);
      this.$emit("listenLink", newLink);
    }
  }
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
