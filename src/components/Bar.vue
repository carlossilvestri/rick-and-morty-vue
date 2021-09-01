<template>
  <div class="cont-barra">
    <ul>
      <router-link to="/" tag="li" class="clicked-active">All</router-link>
      <li>Unknown</li>
      <li>Female</li>
      <li>Male</li>
      <li>Genderless</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Bar",
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
