<template>
<div class="loader">
  <div :class="['loader__action-box', {'should-hide': closedDoors}, {'no-interaction': loading}]">
    <div id="door-left"></div>
    <div id="door-right"></div>
    <div id="loading-icon" :class="[{'hidden-icon': hiddenIcon}]">
      <div id="loading-spinner" :class="[{'show-spinner': showSpinner}, {'spinning': spinSpinner}]"></div>
      <div class="loader-icon">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 462.78 115.31"><defs>
          <clipPath id="clip-path"><rect class="cls-1" x="-69.89" y="2" width="602.95" height="192.1"/></clipPath></defs>
          <g class="cls-2">
            <path class="cls-3" d="M364.93,110.49V88.7H315.84V66.77h43.87V46.36H315.84v-20h46.41V4.84h-71V110.49Zm-89.83,0v-46a44.85,44.85,0,0,0-1.42-11,27.62,27.62,0,0,0-4.63-9.78,24.32,24.32,0,0,0-8.43-6.94,27.52,27.52,0,0,0-12.68-2.68,25.05,25.05,0,0,0-7.31,1,31.26,31.26,0,0,0-6.31,2.73,21.11,21.11,0,0,0-5.07,4,24.81,24.81,0,0,0-3.51,4.7h-.29V36.18H201.68v74.31h24.64V70.2a21.72,21.72,0,0,1,.82-6,16,16,0,0,1,2.46-5.15,11.51,11.51,0,0,1,4.11-3.51,12.39,12.39,0,0,1,5.74-1.27,10.68,10.68,0,0,1,5.45,1.27A9,9,0,0,1,248.26,59,16.73,16.73,0,0,1,250,64a32.65,32.65,0,0,1,.53,6v40.59ZM187.43,57.22a36.8,36.8,0,0,0-7.69-12.69,32.84,32.84,0,0,0-11.78-8,40.15,40.15,0,0,0-15.08-2.76,43.31,43.31,0,0,0-15.81,2.83,37.62,37.62,0,0,0-12.69,8,37,37,0,0,0-8.5,12.53,41.82,41.82,0,0,0-3.14,16.49A41.09,41.09,0,0,0,116,90.36a35.35,35.35,0,0,0,8.8,12.32,38.3,38.3,0,0,0,13.06,7.61,47.51,47.51,0,0,0,15.82,2.61,45.62,45.62,0,0,0,19.92-4.11,34.39,34.39,0,0,0,13.77-11.73l-17-10.7A19.52,19.52,0,0,1,163.76,92a20.65,20.65,0,0,1-9.85,2.17,19.85,19.85,0,0,1-11.87-4,15.84,15.84,0,0,1-4-4.4,12.87,12.87,0,0,1-1.87-5.67H190a26.87,26.87,0,0,0,.15-2.84v-3a48.92,48.92,0,0,0-2.76-17m-51.26,7.61a13.33,13.33,0,0,1,1.49-5.46,15.07,15.07,0,0,1,3.58-4.55,17.21,17.21,0,0,1,5.23-3.06A18.33,18.33,0,0,1,153,50.63q7.32,0,11,4.18a14.71,14.71,0,0,1,3.66,10Zm-35.52,39.24v-56H57.08v20.6H77.23V88a32,32,0,0,1-7.47,2.16,51.55,51.55,0,0,1-8.5.67,36.33,36.33,0,0,1-13.8-2.43,28.08,28.08,0,0,1-10.14-6.89A28.8,28.8,0,0,1,31.13,71,40.92,40.92,0,0,1,29,57.51a36.64,36.64,0,0,1,2.28-13.15,31,31,0,0,1,6.49-10.45,29.65,29.65,0,0,1,9.85-6.86,30.63,30.63,0,0,1,12.39-2.46,33.44,33.44,0,0,1,13.87,2.76,28,28,0,0,1,9.87,7L99.91,16A48.25,48.25,0,0,0,82.45,5.79,69.35,69.35,0,0,0,59.17,2,64.35,64.35,0,0,0,36.64,5.86,53.82,53.82,0,0,0,18.43,17,51.16,51.16,0,0,0,6.32,34.53a57.78,57.78,0,0,0-4.4,23A57.84,57.84,0,0,0,6.24,80.29a51.71,51.71,0,0,0,12,17.54,53.93,53.93,0,0,0,18.35,11.34,65.73,65.73,0,0,0,23.36,4,95.07,95.07,0,0,0,22.6-2.54,80.76,80.76,0,0,0,18.13-6.57"/></g>
          <polygon class="cls-3" points="402.11 35.1 375.04 35.1 434.11 110.7 461.18 110.7 402.11 35.1"/>
          <polygon class="cls-3" points="404.58 72.9 431.64 72.9 402.11 110.7 375.04 110.7 404.58 72.9"/>
          <polygon class="cls-4" points="434.55 35.1 461.18 35.1 444.78 56.08 418.16 56.08 434.55 35.1"/>
        </svg>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "LoadAnimationComponent",
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
    }
  },
  methods: {
    showContent() {
      // Stop Spinning
      this.spinSpinner = false;

      // Hide the loader and spinner
      setTimeout(() => {
        this.hiddenIcon = true;
        this.showSpinner = false;
      }, 500);

      // Open the doors
      setTimeout(() => {
        this.closedDoors = false;
      }, 1000);

      setTimeout(() => {
        this.$emit('open-doors');
      }, 1200);
    },
    hideContent() {
      // Emit early to disable scrolling
      this.$emit('closed-doors');

      // Close the doors
      this.closedDoors = true;

      // Show the loader
      setTimeout(() => {
        this.hiddenIcon = false;
      }, 1000);

      // Show the spinner
      setTimeout(() => {
        this.showSpinner = true;
      }, 1200);

      // Start spinning the spinner
      setTimeout(() => {
        this.spinSpinner = true;
      }, 1500);
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
      }

      .show-spinner {
        opacity: 1!important;
      }

      .spinning {
        animation: 0.5s linear spin infinite;
      }

      svg {
        width: 80%;
        display: block;
        margin: auto;
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

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(360deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

// SVG styles
.cls-1{fill:none;}.cls-3{fill:#fff;}.cls-4{fill:#00729a;}
</style>