<template>
    <header class="header animate__animated animate__fadeIn">
      <div class="header-background">
        <div class="cont-text-welcome">
          <div class="cont-img-rick-and-morty">
            <img
              class="img-suazo"
              src="@/assets/img/welcome/suazo.svg"
              alt="Rick and Morty"
            />
            <img
              class="animate__animated animate__backInDown img-rick-and-morty"
              src="@/assets/img/welcome/rick-and-morty.svg"
              alt="Rick and Morty"
            />
          </div>
          <h3 class="title-welcome">Bienvenido a Rick and Morty</h3>
          <p class="subtext">
            En esta prueba, evaluaremos su capacidad para construir la
            aplicación mediante el análisis de código y la reproducción del
            siguiente diseño.
          </p>
          <div class="cont-button-welcome">
              <router-link to="/home" tag="button" class="btn-1">Continuar</router-link>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
// import "animate.css"
export default {
  name: "Welcome",
};
</script>

<style lang="scss">
@import "~@/scss/_variables.scss";
@import "~@/scss/utilities.scss";

.header {
  .header-background {
    display: block;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("../assets/img/welcome/background-welcome.svg");
    background-position: center;
    background-size: cover;
    .cont-text-welcome {
      display: flex;
      flex-direction: column;
      top: 20%;
      position: relative;
      .cont-img-rick-and-morty {
        text-align: center;
        .img-rick-and-morty {
          max-width: 100%;
          display: block;
          margin: 0 auto;
        }
        .img-suazo {
          width: auto;
          text-align: center;
        }
      }
      .title-welcome {
        font-family: $main-font;
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        line-height: 44px;
        text-align: center;
        color: #ffffff;
        margin: 0px;
      }
      .cont-button-welcome {
        margin: 0 auto;
      }
      .subtext {
        font-family: $main-font;
        font-weight: normal;
        font-size: 18px;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
}
</style>
