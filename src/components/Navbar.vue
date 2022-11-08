<template>
  <div class="navbar">
    <div v-for="(item, index) in navItems"
         :key="index"
         @click="() => goToRoute({ name: item.route })"
         :class="['navbar__item', {'active': matchesCurrentRoute(item.route)}]">

      <!--  Top Corner    -->
      <div class="navbar__item__top-border">
        <div class="navbar__item__top-border__overlay"></div>
      </div>

      <!--   Component   -->
      <component :is="item.svg" :active="matchesCurrentRoute(item.route)" />

      <!--  bottom Corner    -->
      <div class="navbar__item__bottom-border">
        <div class="navbar__item__bottom-border__overlay"></div>
      </div>

    </div>
  </div>
</template>

<script>
import MapSvg from "@/components/SVGs/MapSvg";
import ListingSvg from "@/components/SVGs/ListingSvg";
import { shallowRef } from "vue";
import { GeneralMixin } from "../mixins/GeneralMixin";

export default {
  name: "NavbarComponent",
  components: {
    MapSvg,
    ListingSvg
  },
  mixins: [GeneralMixin],
  data() {
    return {
      // We need to use shallowRef(component) to avoid some issues in the console
      // regarding reactivity https://vuejs.org/api/reactivity-advanced.html
      navItems: [
        {
          route: "countries",
          svg: shallowRef(MapSvg)
        },
        {
          route: "travel-listing",
          svg: shallowRef(ListingSvg)
        }
      ]
    }
  },
  methods: {
    matchesCurrentRoute(route) {
      return this.$route.matched.some(({ name }) => name === route);
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.navbar {
  width: 100px;
  height: 100vh;
  background: $genexBlue;
  padding: 100px 0 10px 10px;

  &__item {
    position: relative;
    padding: 20px 5px;
    border-radius: 50px 0 0 50px;
  }

  &__item.active {
    background: $white;
    position: relative;
    padding: 20px 5px;
    border-radius: 50px 0 0 50px;


    .navbar__item__top-border {
      content: "";
      position: absolute;
      top: -30px;
      right: 0;
      height: 30px;
      width: 30px;
      background: $white;

      &__overlay {
        content: "";
        position:absolute;
        top: 0;
        right: 0;
        height: 30px;
        width: 30px;
        border-bottom-right-radius: 50%;
        background: $genexBlue;
      }
    }

    .navbar__item__bottom-border {
      content: "";
      position: absolute;
      bottom: -30px;
      right: 0;
      height: 30px;
      width: 30px;
      background: $white;

      &__overlay {
        content: "";
        position:absolute;
        top: 0;
        right: 0;
        height: 30px;
        width: 30px;
        border-top-right-radius: 50%;
        background: $genexBlue;
      }
    }
  }
}
</style>