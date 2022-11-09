<template>
  <div :class="['page-container', {'no-overflow': !allowOverflow}]">
    <div :class="['page-container__loading', {'no-interaction': !loading}]">
      <load-animation-component @closed-doors="toggleOverflow" @open-doors="toggleOverflow" :loading="loading" />
    </div>
    <div class="page-container__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LoadAnimationComponent from "@/components/LoadAnimationComponent";

export default {
  components: {
    LoadAnimationComponent
  },
  data() {
    return {
      allowOverflow: true
    }
  },
  methods: {
    toggleOverflow() {
        this.allowOverflow = !this.allowOverflow;
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.page-container {
  width: 100%;
  min-height: 100vh;
  display: block;
  position: relative;

  &__inner {
    display: block;
    width: 100%;
  }

  &__loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 999999;
  }
}

.no-overflow {
  overflow: hidden!important;
  max-height: 100vh;
}
</style>
