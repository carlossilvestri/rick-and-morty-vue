<template>
  <div>
    <section class="cont-modal-main">
      <div class="tajeta" style="height: auto;">
        <div class="container-elements-tarjeta diferencias-1">
          <div class="flex-elemts">
            <div class="cont-img-background">
              <img src="@/assets/img/modal/bg.jpg" alt="Img Background" />
            </div>
            <div class="cont-img-main">
              <img
                src="@/assets/img/modal/bg.jpg"
                alt="Img Main Character"
                class="img-character"
              />
              <div class="cont-start">
                <img src="@/assets/img/modal/star-sm.svg" alt="Star" />
              </div>
              <div class="cont-other-text">
                <p class="soft-text">ALIVE</p>
                <h3 class="strong-text">Beth Smith</h3>
                <p class="soft-text">HUMAN</p>
              </div>
            </div>
            <div class="cont-relleno"></div>
            <div class="cont-info">
              <div class="cont-title-info">
                <h4>Información</h4>
              </div>
              <div class="cont-info-balls">
                <div class="cont-ball">
                  <p class="soft-text"><span><img src="@/assets/img/modal/info.jpg" alt="Info"></span>Gender:</p>
                  <h3 class="strong-text">S01E01</h3>
                </div>
                <div class="cont-ball">
                  <p class="soft-text"><span><img src="@/assets/img/modal/info.jpg" alt="Info"></span>Origin:</p>
                  <h3 class="strong-text">S01E01</h3>
                </div>
                <div class="cont-ball">
                  <p class="soft-text"><span><img src="@/assets/img/modal/info.jpg" alt="Info"></span>Type:</p>
                  <h3 class="strong-text">S01E01</h3>
                </div>
              </div>
            </div>
            <div class="cont-info">
              <div class="cont-title-info">
                <h4>Episodios</h4>
              </div>
              <div class="cont-info-balls">
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
                <div class="cont-ball">
                  <p class="soft-text">Pilot</p>
                  <h3 class="strong-text">S01E01</h3>
                  <p class="soft-text">DECEMBER 2, 2013</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
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
      height: 75%;
      .flex-elemts {
        .cont-img-background {
          img {
            max-width: 698px;
          }
        }
        .cont-relleno {
          background-color: #f2f2f2;
          max-width: 698px;
          height: 130px;
        }
        .cont-img-main {
          position: absolute;
          top: 34%;
          right: 45%;
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
        }
        .cont-info-balls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px 15px;
          .cont-ball {
            border: 1px solid #bdbdbd;
            box-sizing: border-box;
            border-radius: 8px;
            width: 163px;
            height: 59px;
            text-align: left;
            padding: 5px;
            .soft-text {
              font-size: 11px;
              margin: 0;
              span{
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
