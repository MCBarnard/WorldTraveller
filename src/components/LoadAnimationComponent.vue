<template>
<div class="loader">
  <div :class="['loader__action-box', {'should-hide': closedDoors}, {'no-interaction': loading}]">
    <div id="door-left"></div>
    <div id="door-right"></div>
    <div id="loading-icon" :class="[{'hidden-icon': hiddenIcon}]">
      <div id="loading-spinner" :class="[{'show-spinner': showSpinner}, {'spinning': spinSpinner}]"></div>
      <div class="loader-icon">
        <genex-svg />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import GenexSvg from "../components/SVGs/GenexSvg";

export default {
  components: {
    GenexSvg
  },
  props: {
    loading: Boolean
  },
  data() {
    return {
      closedDoors: false,
      hiddenIcon: true,
      showSpinner: false,
      spinSpinner: false
    }
  },
  mounted() {
    if (this.loading) {
        this.hideContent();
    } else {
        this.showContent();
    }
  },
  methods: {
    showContent() {
      // Stop Spinning
      this.spinSpinner = false;

      // Hide the icon and spinner then open the doors
      this.hiddenIcon = true;
      this.showSpinner = false;
      this.closedDoors = false;

      // Emit late to allow animations to
      // finish before allowing user interaction
      this.$emit('open-doors');
    },
    hideContent() {
      // Emit early to disable scrolling
      this.$emit('closed-doors');

      // Close the doors
      this.closedDoors = true;

      // Show the loader and spinner
      this.hiddenIcon = false;
      this.showSpinner = true;
      this.spinSpinner = true;
    }
  },
  watch: {
    loading(val) {
      val ? this.hideContent() : this.showContent();
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.loader {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &__action-box {
    width: 100%;
    height: 100%;
    display: flex;

    #loading-icon {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background-image: radial-gradient($lightBlue 20%, $genexBlue 100%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      vertical-align: center;
      opacity: 1;
      transition: all 0.5s ease;
      -webkit-transition: all 0.5s ease;
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;

      #loading-spinner {
        width: 90%;
        height: 90%;
        position: absolute;
        top: 50%;
        left: 50%;
        border: 2px dashed $spinnerBlue;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.5s ease;
        -webkit-transition: opacity 0.5s ease;
        -moz-transition: opacity 0.5s ease;
        -o-transition: opacity 0.5s ease;
      }

      .show-spinner {
        opacity: 1!important;
      }

      .spinning {
        animation: 0.5s linear spin infinite;
      }

      &.hidden-icon {
        opacity: 0;
      }

      & .loader-icon {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }

    #door-left {
      width: 100%;
      height: 100%;
      position: absolute;
      left: -100%;
      top: 0;
    }

    #door-right {
      position: absolute;
      right: -100%;
      top: 0;
      width: 100%;
      height: 100%;
    }

    #door-left,
    #door-right {
      background: $orange;
      transition: right 1s ease, left 1s ease;
      -webkit-transition: right 1s ease, left 1s ease;
      -moz-transition: right 1s ease, left 1s ease;
      -o-transition: right 1s ease, left 1s ease;
    }

    &.should-hide {
      #door-left {
        left: -50%;
      }
      #door-right {
        right: -50%;
      }
    }
  }
}

svg {
  width: 80%;
  display: block;
  margin: auto;
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(360deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}
</style>