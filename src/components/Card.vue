<template>
  <div>
    <div class="cont-card pointer" v-if="info">
      <div class="cont-img-card">
        <img
          data-testId="image"
          loading="lazy"
          :src="info.image"
          alt="Morty"
          class="character-show"
          @click="openModal()"
        />
        <img
          v-if="isActiveFavorite"
          src="@/assets/img/home/active-star.svg"
          alt="Star"
          class="star-inside-card"
          @click="deleteFavoriteCharaterOnVuex(info)"
        />
        <img
          v-else
          src="@/assets/img/home/no-active-star.svg"
          alt="Star"
          class="star-inside-card"
          @click="addFavoriteCharaterOnVuex(info)"
        />
      </div>
      <div
        data-testId="cont-text-card"
        class="cont-card-text"
        @click="openModal()"
      >
        <p class="soft-text-1">
          <span
            :class="{
              alive: info.status === 'Alive',
              death: info.status === 'Dead',
            }"
            >●</span
          >
          {{ info.status }} - {{ info.species }}
        </p>
        <h5 data-testId="info-name" class="name-text">{{ info.name }}</h5>
        <p class="soft-text-2">Last known location:</p>
        <p data-testId="info-location-name" class="intermediate-text-1 margin">
          {{ info.location.name }}
        </p>
        <p class="soft-text-2">First seen in:</p>
        <p data-testId="info-created" class="intermediate-text-1">
          {{ showDate(info.created) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {actionsMixin} from "@/mixins/actionsMixin.js";
export default {
  name: "Card",
  props: ["info"],
  data() {
    return {
      isActiveFavorite: false
    };
  },
  mixins: [actionsMixin],
  mounted() {
    this.checkFavorite();
  },
  methods: {
    /**
     * checkFavorite() : void
     * Check if character is favorite.
     */
    checkFavorite() {
      const favorite = this.favoriteCharacters.find(
        (character) => character.id === this.info.id
      );
      if (favorite) {
        this.isActiveFavorite = true;
      } else {
        this.isActiveFavorite = false;
      }
    },
    /**
     * showDate(dateGiven : Date) : string
     * @param dateGiven : Date.
     * This function return a better formarted date to show to the user.
     */
    showDate(dateGiven) {
      let date = [];
      date.push(new Date(dateGiven).getFullYear());
      date.push(new Date(dateGiven).getMonth());
      date.push(new Date(dateGiven).getDay());
      let dateToReturn = `${date[2]}/${date[1]}/${date[0]}`;
      return dateToReturn;
    },
    /**
     * addFavoriteCharaterOnVuex() : void
     * @param {} character
     */
    addFavoriteCharaterOnVuex(character) {
      this.$store.dispatch("addFavoriteCharater", character);
      this.isActiveFavorite = true;
    },
    /**
     * deleteFavoriteCharaterOnVuex() : void
     * @param {} character
     */
    deleteFavoriteCharaterOnVuex(character) {
      this.$store.dispatch("deleteFavoriteCharater", character);
      this.isActiveFavorite = false;
    },
  },
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
  display: flex;
  justify-content: flex-start;
  width: 95vw;
  @media (min-width: 420px) {
    width: 380px;
  }
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
      font-family: $main-font;
      font-weight: normal;
      font-size: 10px;
      color: #4f4f4f;
      margin: 1px 0;
      span {
        font-size: 15px;
      }
    }
    .name-text {
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      margin: 6px 0;
      font-family: $main-font;
    }
    .soft-text-2 {
      font-family: $main-font;
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      color: #828282;
      margin: 5px 0;
    }
    .intermediate-text-1 {
      font-family: $main-font;
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
