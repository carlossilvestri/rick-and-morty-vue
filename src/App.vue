<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      setPageName: "setPageName",
    }),
  },
  watch: {
    $route(to) {
      this.setPageName(to.path);
    },
  },
};
</script>

<style lang="scss"></style>
