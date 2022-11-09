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
      <button class="close-card" @click="flipCard('card_' + id)">Close</button>
      <button>Add to my list!</button>
      <button>Mark as visited</button>
    </div>
  </div>
</template>

<script>
import {GeneralMixin} from "@/mixins/GeneralMixin";

export default {
  mixins: [GeneralMixin],
  props: {
    id: String,
    country: String,
    region: String,
    subRegion: String,
    flag: String,
    lat: Number,
    long: Number
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
    cursor: pointer;
    background: $bgGrey;
    padding: 20px;
    width: 100%;

    &:hover {
      .card__hover-block {
        display: block;
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