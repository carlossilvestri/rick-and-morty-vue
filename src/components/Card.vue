<template>
  <div class="cont-card">
    <div class="cont-img-card">
      <img
        src="@/assets/img/home/morty.jpg"
        alt="Morty"
        class="character-show"
      />
      <img
        src="@/assets/img/home/no-active-star.svg"
        alt="Star"
        class="star-inside-card"
      />
    </div>
    <div class="cont-card-text" @click="openModal">
      <p class="soft-text-1"><span class="alive">●</span> Alive - Human</p>
      <h5 class="name-text">Morty Smith</h5>
      <p class="soft-text-2">Last known location:</p>
      <p class="intermediate-text-1 margin">Story Train</p>
      <p class="soft-text-2">First seen in:</p>
      <p class="intermediate-text-1">Never Ricking Morty</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  methods:{
    openModal() {
      this.$emit("openModal");
    },
  }
};
</script>

<style lang="scss">
@import "~@/scss/_variables.scss";
@import "~@/scss/utilities.scss";
.cont-card {
  border: 1px solid #e0e0e0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  -webkit-filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  min-height: 140px;
  margin: 0 10px 10px 10px;
  min-width: 380px;
  display: flex;
  justify-content: flex-start;
  .cont-img-card {
    .character-show {
      max-width: 140px;
      border-radius: 10px 0px 0px 10px;
    }
    .star-inside-card {
      position: absolute;
      bottom: 12px;
      left: 100px;
      cursor: pointer;
    }
  }
  .cont-card-text {
    margin: 10px 10px 0 10px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    line-height: 12px;
    color: #000000;
    text-align: left;
    cursor: pointer;
    .soft-text-1 {
      font-weight: normal;
      font-size: 10px;
      color: #4f4f4f;
      margin: 1px 0;
    }
    .name-text {
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      margin: 6px 0;
    }
    .soft-text-2 {
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      color: #828282;
      margin: 5px 0;
    }
    .intermediate-text-1 {
      font-weight: normal;
      font-size: 12px;
      line-height: 15px;
      color: #000000;
      margin: 2px 0 0 0;
    }
    .margin {
      margin: 2px 0 10px 0 !important;
    }
  }
}
</style>
