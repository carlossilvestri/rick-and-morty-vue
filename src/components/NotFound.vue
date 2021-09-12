<template>
  <div class="cont-not-fount">
    <h4>Uh-oh!</h4>
    <p>¡Pareces perdido en tu viaje!</p>
    <button class="btn-1" @click="deleteFilters">Eliminar filtros</button>
  </div>
</template>

<script>
export default {
  name:"NotFoundVue",
  methods:{
    /**
     * deleteFilters() : void
     * This function emits an event to its parent ('deleteFilters').
     */
    deleteFilters(){
      this.$emit('deleteFilters', 'All');
    }
  }
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
