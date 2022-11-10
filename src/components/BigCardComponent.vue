<template>
  <div class="big-card">
    <div class="big-card__top">
      <img :src="flag">
    </div>
    <div class="big-card__bottom">
      <h4>{{ country }}</h4>
      <p>{{ subRegion }}</p>
      <a :href="maps" target="_blank" rel="noreferrer">
        {{ maps }}
      </a>
      <button @click="() => {handleRemoveClick(country)}">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import {GeneralMixin} from "@/mixins/GeneralMixin";
export default {
  name: "BigCardComponent",
  mixins: [GeneralMixin],
  props: {
    id: String,
    country: String,
    subRegion: String,
    flag: String,
    maps: String,
    rawItem: Object
  },
  methods: {
    handleRemoveClick(country) {
      const lastItem = this.mySavedCountriesComputed.length === 1;
      this.$store.dispatch("ACTION_SET_REMOVE_ITEM_FROM_SAVED_COUNTRIES", country);
      if (lastItem) {
        this.$router.push("/");
      }

    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.big-card {
  margin: 20px;
  max-width: 240px;
  width: 100%;
  display: block;
  position: relative;
  border-radius: 15px;
  box-shadow: 0 0 50px -30px #626262;

  &__top {
    background: $white;
    width: 100%;
    height: 150px;
    overflow: hidden;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }
  &__bottom {
    background: $white;
    width: 100%;
    height: 190px;
    padding: 10px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    word-break: break-word;

    button {
      width: 100%;
      padding: 10px 15px;
      outline: none!important;
      border: none!important;
      cursor: pointer;
      margin-top: 16px;
      color: $white;
      background: $orange;

      &:hover {
        box-shadow: 0 0 50px -40px #625a5a;
        background: #ff9f3d;
      }
    }
  }
}
</style>