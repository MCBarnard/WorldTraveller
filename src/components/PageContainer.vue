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
  name: 'PageContainer',
  components: {
    LoadAnimationComponent
  },
  data() {
    return {
      loading: true,
      allowOverflow: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    setTimeout(() => {
      this.loading = true;
    }, 6000);
    setTimeout(() => {
      this.loading = false;
    }, 10000);
  },
  methods: {
    toggleOverflow() {
        this.allowOverflow = !this.allowOverflow;
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
    height: 1000px;
  }

  &__loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}

.no-overflow {
  overflow: hidden!important;
  max-height: 100vh;
}
</style>
