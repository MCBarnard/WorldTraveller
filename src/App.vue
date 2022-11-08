<template>
  <div id="app">
    <page-container>
      <img alt="Vue logo" src="./assets/logo.png">
    </page-container>
  </div>
</template>

<script>
import PageContainer from "./components/PageContainer.vue";

export default {
  name: "App",
  components: {
    PageContainer
  },
  mounted() {
    this.$store.dispatch("ACTION_SET_LOADING", true);
    setTimeout(() => {
      this.$store.dispatch("ACTION_SET_LOADING", false);
    }, 2000);
    setTimeout(() => {
      this.$store.dispatch("ACTION_SET_LOADING", true);
    }, 6000);
    setTimeout(() => {
      this.$store.dispatch("ACTION_SET_LOADING", false);
    }, 10000);
  }
}
</script>

<style scoped lang="scss">

</style>
