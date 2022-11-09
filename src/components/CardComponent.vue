<template>
  <div :id="'card_' + id" @click="flipCard('card_' + id)" :class="['card', {'unconquered': !seen}]">
    <div class="card__front">
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
      I'm the card's back side
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    country: String,
    region: String,
    subRegion: String,
    flag: String,
    lat: Number,
    long: Number,
    seen: Boolean,
  },
  methods: {
    flipCard(id) {
      let item = document.getElementById(id);
      if (!item.classList.contains('flippit')) {
        item.classList.add('flippit');
        setTimeout(() => {
          item.getElementsByClassName('card__front')[0].style.opacity = '0'
        }, 150);
        setTimeout(() => {
          item.getElementsByClassName('card__front')[0].style.display = 'none'
          item.getElementsByClassName('card__back')[0].style.display = 'block'
          item.getElementsByClassName('card__back')[0].style.opacity = '1'
        }, 300);
      }else {
        item.classList.remove('flippit');
        setTimeout(() => {
          item.getElementsByClassName('card__back')[0].style.opacity = '0'
        }, 300);
        setTimeout(() => {
          item.getElementsByClassName('card__back')[0].style.display = 'none'
          item.getElementsByClassName('card__front')[0].style.display = 'flex'
          item.getElementsByClassName('card__front')[0].style.opacity = '1'
        }, 300);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.card {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: $orange;
    z-index: -1;
  }

  &.unconquered {
    &:after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      background: $green;
      z-index: -1;
      right: -2px;
      top: -2px;
      border-radius: 5px;
    }
  }

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
      margin: auto 20px;
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
    box-shadow: 0 0 200px 5px #f7f7f7;
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

.flippit {
  .card__front {
    transform: rotateX(-100deg);
  }
  .card__back {
    transform: rotateX(0deg);
  }
}
</style>