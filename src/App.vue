<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { actionsMixin } from "@/mixins/actionsMixin.js";
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  mixins: [actionsMixin],
  methods: {
  },
  watch: {
    $route(to) {
      this.setPageNameOnVuex(to.path);
    },
  },
};
</script>

<style lang="scss"></style>
