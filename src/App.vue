<template>
  <div id="app">
    <page-container>
      <div class="split-view">
        <navbar-component/>
        <div class="split-view__content">
          <router-view></router-view>
        </div>
      </div>
    </page-container>
  </div>
</template>

<script>
import PageContainer from "./components/PageContainer.vue";
import NavbarComponent from "@/components/NavbarComponent";

export default {
  components: {
    NavbarComponent,
    PageContainer
  },
  mounted() {
    this.$store.dispatch("ACTION_SET_CHANGE_TRAVEL_QUOTE");
    this.$store.dispatch("ACTION_SET_CHANGE_ACTIVE_AUTHOR");
  }
}
</script>

<style scoped lang="scss">
.split-view {
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;

  &__content {
    overflow-y: auto;
    width: 100%;
  }
}
</style>
