<template>
  <div :id="'card_' + id" class="card">
    <div class="card__front" @click="flipCard('card_' + id)">
      <div class="card__hover-block"></div>
      <div class="card__front__country">
        <small>COUNTRY</small>
        <p>{{ country }}</p>
      </div>
      <div class="vertical-divide"></div>
      <div class="card__front__region">
        <small>REGION</small>
        <p>{{ region }}</p>
      </div>
    </div>
    <div class="card__back">
      <div class="card__hover-block"></div>
      <div class="detail">
        <h3>Details</h3>
        <div class="hr"></div>
        <div class="bottom">
          <img :src="flag">
          <div class="lines">
            <h4>Region: <small>{{ region }}</small></h4>
            <h4>Sub-Region: <small>{{ subRegion }}</small></h4>
            <h4>Latitude: <small>{{ lat }}</small></h4>
            <h4>Longitude: <small>{{ long }}</small></h4>
            <a :href="maps" target="_blank" rel="noreferrer">
              Check it out on Google maps
            </a>
          </div>
        </div>
      </div>
      <button class="close-card" @click="flipCard('card_' + id)">
        <red-close-svg />
      </button>
      <button class="add-country" @click="handleAddEvent">
        <green-plus-svg />
      </button>
    </div>
  </div>
</template>

<script>
import {GeneralMixin} from "@/mixins/GeneralMixin";
import GreenPlusSvg from "@/components/SVGs/GreenPlusSvg";
import RedCloseSvg from "@/components/SVGs/RedCloseSvg";

export default {
  mixins: [GeneralMixin],
  components: {
    GreenPlusSvg,
    RedCloseSvg
  },
  props: {
    id: String,
    country: String,
    region: String,
    subRegion: String,
    flag: String,
    lat: Number,
    long: Number,
    maps: String,
    rawItem: Object
  },
  methods: {
    handleAddEvent() {
      // Start adding to persisted state, store for now
      this.$store.dispatch("ACTION_SET_TOAST_STATE", "busy");

      // Close current card
      this.flipCard("card_" + this.id);

      // Push item to list
      this.$store.dispatch("ACTION_SET_PUSH_TO_SAVED_COUNTRIES", this.rawItem);

      // Notify user of success
      this.$store.dispatch("ACTION_SET_TOAST_STATE", "success");
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.card {
  position: relative;

  & + .card {
    margin-top: 10px;
  }

  &__front {
    background: $bgGrey;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border-radius: 15px;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 5px auto;
    overflow-x: hidden;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -o-transition: all 0.2s;

    .vertical-divide {
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      height: 50px;
      width: 3px;
      border-radius: 5px;
      background: $lightBlue;
      background: linear-gradient($lightBlue, $linkblue, $lightBlue);
    }

    &__country {
      color: $white;
      small {
        color: $sub-text-color;
        font-family: $sub-font;
        font-size: 8px;
      }

      p {
        color: $main-text-color;
        font-family: $heading-font;
        font-size: 18px;
      }
    }

    &__region {
      small {
        color: $sub-text-color;
        font-family: $sub-font;
        font-size: 8px;
      }

      p {
        color: $main-text-color;
        font-family: $heading-font;
        font-size: 18px;
      }
    }

    &:hover {
      .card__hover-block {
        display: block;
      }
    }
  }

  &__back {
    display: none;
    opacity: 0;
    transform: rotateX(-100deg);
    margin: 5px auto;
    overflow-x: hidden;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    border-radius: 15px;
    position: relative;
    box-shadow: 0 0 50px -40px #625a5a;
    background: $bgGrey;
    padding: 20px;
    width: 100%;

    &:hover {
      .card__hover-block {
        display: block;
      }
    }

    .detail {
      .hr {
        border-radius: 5px;
        background: $lightBlue;
        background: linear-gradient(to right, $lightBlue, $linkblue, $lightBlue);
        width: 100%;
        margin: 8px auto;
        height: 2px;
      }
      .bottom {
        display: flex;

        img {
          max-width: 150px;
          border-radius: 15px;
        }

        .lines {
          margin-left: 16px;
          display: block;

          h4 {
            font-family: $heading-font;
            color: $main-text-color;
            font-size: 14px;

            small {
              font-family: $sub-font;
              color: $sub-text-color;
              font-size: 12px;
            }
          }

          a {
            display: block;
            margin-top: 12px;
            color: $linkblue;
            text-decoration: none;
            outline: none!important;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    button {
      background: transparent;
      outline: none!important;
      text-decoration: none!important;
      border: none!important;
      position: absolute;
      width: 20px;
      height: 20px;
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        cursor: pointer;
        pointer-events: none;
      }

      &.close-card {
        top: 15px;
        right: 15px;
      }

      &.add-country {
        top: 15px;
        right: 45px;
      }
    }
  }

  &__hover-block {
    display: none;
    height: 100%;
    width: 6px;
    background: $linkblue;
    background: linear-gradient($lightBlue, $linkblue, $lightBlue);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    border-radius: 15px 0 0 15px;
  }
}

.flipped {
  .card__front {
    transform: rotateX(-100deg);
  }
  .card__back {
    transform: rotateX(0deg);
  }
}
</style>