<template>
  <div class="card-holder">
    <div class="text-center">
      <div class="text-center__text">
        <div class="card-holder__pre">
          <div class="small-line-pre"></div>
          <p>{{ pre }}</p>
          <div class="small-line-sub"></div>
        </div>
      </div>
      <div class="text-center__text">
        <div class="card-holder__title">
          <h2>{{ title }}</h2>
        </div>
      </div>
      <div class="text-center__text">
        <div class="card-holder__sub">
          <p><small>{{ sub }}</small></p>
          <div class="big-line"></div>
        </div>
      </div>
    </div>
    <div class="card-holder__cards">
      <card-component />
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent";
export default {
  components: {
    CardComponent
  },
  props: {
    title: String,
    pre: String,
    sub: String,
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.card-holder {
  .text-center {
    text-align: center;

    &__text {
      display: flex;
      justify-content: center;
    }
  }

  .small-line-pre {
    width: 25px;
    height: 3px;
    margin: 9px 30px;
    border-radius: 5px;
    background: $genexBlue;
    background: linear-gradient(to right, $lightBlue, $linkblue);
  }

  .small-line-sub {
    width: 25px;
    height: 3px;
    margin: 9px 30px;
    border-radius: 5px;
    background: $genexBlue;
    background: linear-gradient(to right, $linkblue, $lightBlue);
  }

  .big-line {
    height: 5px;
    width: 200px;
    margin: 20px auto;
    border-radius: 5px;
    background: $lightBlue;
    background: linear-gradient(to right, $lightBlue, $linkblue, $lightBlue);
  }

  &__pre {
    position: relative;
    display: flex;

    p {
      text-align: center;
      font-family: $heading-font;
      color: $main-text-color;
      font-size: 18px;
      display: block;
      max-width: 300px;
    }
  }

  &__title {
    position: relative;
    display: flex;

    h2 {
      text-align: center;
      font-family: $heading-font;
      color: $main-text-color;
      font-size: 28px;
    }
  }

  &__cards {

  }
}
</style>