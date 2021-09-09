<template>
  <div>
    <section class="cont-modal-main">
      <div class="tajeta" style="height: auto;">
        <div class="container-elements-tarjeta diferencias-1">
          <div class="flex-elemts">
            <div class="cont-img-background">
              <div class="cont-x-icon" @click="close()">
                <img src="@/assets/img/modal/x-icon.svg?data" />
              </div>
              <img src="@/assets/img/modal/bg.jpg" alt="Img Background" />
            </div>
            <div class="cont-img-main">
              <img
                :src="data.image"
                alt="Img Main Character"
                class="img-character"
              />
              <div class="cont-start">
                <img src="@/assets/img/modal/star-sm.svg" alt="Star" />
              </div>
              <div class="cont-other-text">
                <p class="soft-text">{{ data.status }}</p>
                <h3 class="strong-text">{{ data.name }}</h3>
                <p class="soft-text">{{ data.species }}</p>
              </div>
            </div>
            <div class="cont-relleno"></div>
            <div class="cont-info">
              <div class="cont-title-info">
                <h4>Información</h4>
              </div>
              <div class="cont-info-balls">
                <div class="cont-ball">
                  <p class="soft-text">
                    <span
                      ><img src="@/assets/img/modal/info.jpg" alt="Info"/></span
                    >Gender:
                  </p>
                  <h3 class="strong-text">{{ data.gender }}</h3>
                </div>
                <div class="cont-ball">
                  <p class="soft-text">
                    <span
                      ><img src="@/assets/img/modal/info.jpg" alt="Info"/></span
                    >Origin:
                  </p>
                  <h3 class="strong-text">{{ data.origin.name }}</h3>
                </div>
                <div class="cont-ball">
                  <p class="soft-text">
                    <span
                      ><img src="@/assets/img/modal/info.jpg" alt="Info"/></span
                    >Type:
                  </p>
                  <h3 class="strong-text">{{ data.type }}</h3>
                </div>
              </div>
            </div>
            <div class="cont-info">
              <div class="cont-title-info">
                  <h4>Episodios</h4>
                </div>
              <div v-for="(episode, index) in arrayOfEpisodesLoaded" v-bind:key="`Episode-${index}`">
                <div class="cont-info-balls">
                  <div class="cont-ball">
                    <p class="soft-text">{{ episode.name }}</p>
                    <h3 class="strong-text">{{ episode.episode }}</h3>
                    <p class="soft-text">{{ episode.air_date }}</p>
                  </div>
                  <div class="cont-ball">
                    <p class="soft-text">Pilot</p>
                    <h3 class="strong-text">S01E01</h3>
                    <p class="soft-text">DECEMBER 2, 2013</p>
                  </div>
                  <div class="cont-ball">
                    <p class="soft-text">Pilot</p>
                    <h3 class="strong-text">S01E01</h3>
                    <p class="soft-text">DECEMBER 2, 2013</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="cont-info">
              <div class="cont-title-info">
                <h4>Personajes interesantes</h4>
              </div>
              <div class="cont-cards-modal">
              <CardVue
                @openModal="openModal(character.id)"
                :info="character"
                v-for="(character, index) in characters"
                v-bind:key="`Character-modal-${index}`"
              />
              </div>
              <div class="cont-btn-share">
                <button class="btn-1">Compartir personaje</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CardVue from "@/components/Card.vue";
import clienteAxios from "@/config/axios";

export default {
  name: "Modal",
  props: ["data"],
  data() {
    return {
      SVGXIcon: require("@/assets/img/modal/x-icon.svg?data"),
      arrayOfEpisodesLoaded: [],
      characters: []
    };
  },
  mounted() {
    this.searchEpisodesInfo(this.data.episode);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    openModal(idCard) {
      this.$emit("openModal", idCard);
    },
    /**
     * searchEpisodesInfo(arrayOfEpisodes : string[]) : void
     */
    searchEpisodesInfo(arrayOfEpisodes) {
      arrayOfEpisodes.forEach(async (episode, index) => {
        let res = await clienteAxios.get(episode);
        this.arrayOfEpisodesLoaded.push(res.data);
        if(index == 0){
          this.searchCharacters(this.arrayOfEpisodesLoaded[0]);
        }
      });
    },
    /**
     * searchCharacters(objEpisode : Object ) : void
     */
    searchCharacters(objEpisode){
      console.log("objEpisode ", objEpisode);
      
      objEpisode.characters.forEach( async (character, index) => {
        if(index < 3 ){
          let res = await clienteAxios.get(character)
          this.characters.push(res.data);
        }
      } )
    }
  },
  components: {
    CardVue,
  },
};
</script>

<style lang="scss">
@import "~@/scss/_variables.scss";

.cont-modal-main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .tajeta {
    height: 200px;
    max-width: 698px;
    margin: 25px auto;
    text-align: center;
    background: #ffffff;
    border-radius: 10px;
    @media (max-width: 1125px) {
      height: auto;
    }
    @media (max-width: 730px) {
      margin: 25px 10px;
    }
    .container-elements-tarjeta {
      // height: 75%;
      height: 531px;
      width: 718px;
      overflow-y: auto;
      // max-width: 80%;
      // margin: 25px auto;
      text-align: center;
      background: #ffffff;
      border-radius: 10px;
      overflow-y: auto;
      scroll-behavior: smooth;
      &::-webkit-scrollbar {
        width: 0px;
        height: 12px;
      }
      &::-webkit-scrollbar-thumb {
        background: #e5e5e5;
        border-radius: 10px;
        height: 0;
        width: 0;
        @media (max-width: 425px) {
          background: transparent;
        }
      }
      .flex-elemts {
        position: relative;
        .cont-img-background {
          height: 208px;
          width: 718px;
          img {
            width: 100%;
          }
          .cont-x-icon {
            width: 29px;
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
          }
        }
        .cont-relleno {
          background-color: #f2f2f2;
          height: 179px;
        }
        .cont-img-main {
          position: absolute;
          top: 115px;
          right: 39%;
          max-width: 200px;
          .img-character {
            border: 4px solid #fffbfb;
            box-sizing: border-box;
            border-radius: 155px;
            max-width: 155px;
          }
          .cont-start {
            border: 4px solid #fffbfb;
            box-sizing: border-box;
            border-radius: 155px;
            max-width: 30px;
            margin: 0 auto;
          }
          .cont-other-text {
            margin: 0 auto;
          }
        }
        .cont-info {
          min-height: 140px;
          border: 1px solid #e0e0e0;
          .cont-title-info {
            font-family: $main-font;
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: #4f4f4f;
            margin-left: 15px;
            text-align: left;
            h4 {
              margin: 20px 0;
            }
          }
          .cont-cards-modal {
            display: flex;
            overflow-y: auto;
            text-align: center;
            background: #ffffff;
            border-radius: 10px;
            overflow-y: auto;
            scroll-behavior: smooth;
            &::-webkit-scrollbar {
              width: 10px;
              height: 10px;
            }
            &::-webkit-scrollbar-thumb {
              background: #e5e5e5;
              border-radius: 10px;
              // height: 0;
              // width: 0;
              @media (max-width: 425px) {
                background: transparent;
              }
            }
          }
          .cont-btn-share {
            display: flex;
            justify-content: flex-end;
            padding: 20px;
          }
        }
        .cont-info-balls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px 15px;
          .cont-ball {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            border: 1px solid #bdbdbd;
            box-sizing: border-box;
            border-radius: 8px;
            width: 163px;
            height: 68px;
            text-align: left;
            padding: 5px;
            .soft-text {
              font-size: 11px;
              margin: 0;
              span {
                margin-right: 4px;
              }
            }
            .strong-text {
              font-size: 14px;
              margin: 1px;
            }
          }
        }
      }
    }
  }
}
.diferencias-1 {
  @media (max-width: 420px) {
    padding: 20px 20px !important;
  }
}
.cont-btn-salir {
  text-align: right;
  height: 10px;
  @media (max-width: 720px) {
    height: auto;
  }
  img {
    width: 20px;
    cursor: pointer;
  }
}
.img-decoration {
  max-width: 270px;
  @media (max-width: 420px) {
    max-width: 170px;
  }
  @media (max-width: 365px) {
    max-width: 150px;
  }
}

/* Utilidades */

.soft-text {
  font-family: $main-font;
  color: #4f4f4f;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  margin: 7px 0;
}
.strong-text {
  font-family: $main-font;
  margin: 5px 0;
  color: #081f32;
}
</style>
