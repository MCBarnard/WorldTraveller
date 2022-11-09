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
import CookieSvg from "@/components/SVGs/CookieSvg";
import { shallowRef } from "vue";
import { GeneralMixin } from "../mixins/GeneralMixin";

export default {
  components: {
    MapSvg,
    ListingSvg,
    CookieSvg
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
        },
        {
          route: "cookie-settings",
          svg: shallowRef(CookieSvg)
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
  // We only want padding on the left to ensure we don't touch the side of the screen
  padding: 0 0 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__item {
    position: relative;
    padding: 20px 5px;
    border-radius: 50px 0 0 50px;
    cursor: pointer;
    margin-bottom: 40px;
  }

  &__item.active {
    background: $white;
    position: relative;
    padding: 20px 5px;
    border-radius: 50px 0 0 50px;


    .navbar__item__top-border {
      content: "";
      position: absolute;
      top: -50px;
      right: 0;
      height: 50px;
      width: 50px;
      background: $white;

      &__overlay {
        content: "";
        position:absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
        border-bottom-right-radius: 50%;
        background: $genexBlue;
      }
    }

    .navbar__item__bottom-border {
      content: "";
      position: absolute;
      bottom: -50px;
      right: 0;
      height: 50px;
      width: 50px;
      background: $white;

      &__overlay {
        content: "";
        position:absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
        border-top-right-radius: 50%;
        background: $genexBlue;
      }
    }
  }
}
</style>