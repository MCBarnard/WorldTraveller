<template>
  <div id="toast-container">
    <div :class="['toast', {'showing': toastState !== 'hidden'}]">
      <div class="busy" v-show="toastState === 'busy'">
        <span></span>
      </div>
      <div class="success" v-show="toastState === 'success'"></div>
      <div v-show="toastState === 'error'">
        <svg class="checkmark error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark_circle_error" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark_check" stroke-linecap="round" fill="none" d="M16 16 36 36 M36 16 16 36"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    toastState() {
      return this.$store.getters.toastState;
    }
  },
  watch: {
    toastState(val) {
      // Only show error or success for 800 ms
      if (val === 'success' || val === 'error') {
        setTimeout(() => {
          this.$store.dispatch("ACTION_SET_TOAST_STATE", "hidden");
        }, 2000);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

#toast-container {
  width: 250px;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  pointer-events: none;

  @media (max-width: 530px) {
    width: 130px;
  }
}
.toast {
  width: 70px;
  height: 70px;
  background: $white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0 0 42px -23px #000000;
  position: absolute;
  left: 100%;
  transition: all 0.8s ease;

  &.showing {
    left: 0;
  }

  // BUSY SPECIFIC
  .busy {
    margin: auto;
    width: 45px;
    height: 45px;
    border-left: 3px solid $orange;
    border-bottom: 2px solid $orange;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  /////////////////////////////////
  // SUCCESS SPECIFIC
  // Variables
  $checkmark-width-left: 10px;
  $checkmark-width-right: 25px;
  $animation-speed: .3s;

  // Wrapper
  .success {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid #00afcf;
    position: relative;
    overflow: hidden;
    animation: wrap $animation-speed ease-in-out forwards;
    animation-delay: .1s;
    transform: scale(0);
    margin: auto;

    // Checkmark
    &::before,
    &::after {
      content: '';
      position: absolute;
      background-color: white;
      width: 0;
      height: 3px;
      transform-origin: left;
      animation-duration: $animation-speed;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }

    &::before {
      top: 19px;
      left: 10px;
      transform: rotate(45deg);
      animation-name: left;
      animation-delay: 0.8s;
    }

    &::after {
      top: 28px;
      left: 17px;
      transform: rotate(-45deg);
      animation-name: right;
      animation-delay: 1.1s;
    }
  }

  // Animation wrapper
  @keyframes wrap {
    0% {
      background-color: transparent;
      transform: scale(0);
    } 100% {
        background-color: #00afcf;
        transform: scale(1);
      }
  }

  // Checkmark keyframe mixin
  @mixin checkmark($name, $width) {
    @keyframes #{$name} {
      0% {
        width: 0;
      } 100% {
          width: $width;
        }
    }
  }

  // Checkmark keyframes
  @include checkmark(left, $checkmark-width-left);
  @include checkmark(right, $checkmark-width-right);
  /////////////////////////////////
  // ERROR SPECIFIC
  $color-success: #00C851;
  $color-error: #ff4444;
  $stroke-width: 5px;
  $size: 45px;
  $checkmark-color: white;

  .checkmark_circle_error {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: $stroke-width;
    stroke-miterlimit: 10;
    stroke: $color-error;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark {
    width: $size;
    height: $size;
    border-radius: 50%;
    display: block;
    stroke-width: $stroke-width;
    stroke: $checkmark-color;
    stroke-miterlimit: 10;
    margin: 10% auto;
    &.success {
      box-shadow: inset 0px 0px 0px $color-success;
      animation: fillsuccess .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
    }
    &.error {
      box-shadow: inset 0px 0px 0px $color-error;
      animation: fillerror .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
    }
  }

  .progress {
    transform: rotate(-90deg);
    stroke: black;
  }

  .progress circle {
    stroke-dasharray: 130;
    stroke-dashoffset: 130;
    animation: dash 1.5s infinite;
  }

  @keyframes dash {
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -130;
    }
  }


  .progress {
    position: absolute;
    top: 5%;
    left: 5%;

    &.progress--thin {
      left: auto;
      right: 5%;
    }

  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes scale {
    0%, 100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fillsuccess {
    100% {
      box-shadow: inset 0px 0px 0px $size/2 $color-success;
    }
  }

  @keyframes fillerror {
    100% {
      box-shadow: inset 0px 0px 0px $size/2 $color-error;
    }
  }
  /////////////////////////////////
}
</style>