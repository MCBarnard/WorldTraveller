<template>
  <div class="travel-listing">
    <div class="heading-intro">
      <div class="text-center">
        <div class="text-center__text">
          <div class="travel-listing__pre">
            <div class="small-line-pre"></div>
            <p>Take your first steps to freedom</p>
            <div class="small-line-sub"></div>
          </div>
        </div>
        <div class="text-center__text">
          <div class="travel-listing__title">
            <h2>Travel Planner Listing</h2>
          </div>
        </div>
        <div class="text-center__text">
          <div class="travel-listing__sub">
            <p><small>Who knows what you'll find, who you'll meet!</small></p>
            <div class="big-line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="travel-listing__listing-box">
      <big-card-component v-for="(item, index) in mySavedCountriesComputed"
                          :key="index"
                          :id="item.name.common"
                          :country="item.name.common"
                          :region="item.region"
                          :subRegion="item.subregion"
                          :flag="item.flags.png"
                          :maps="item.maps.googleMaps"
                          :rawItem="{
                            id: item.name.common,
                            country: item.name.common,
                            region: item.region,
                            subRegion: item.subregion,
                            flag: item.flags.png,
                            lat: item.latlng[0],
                            long: item.latlng[1],
                            maps: item.maps.googleMaps,
                          }"
      />
    </div>
  </div>
</template>

<script>
import {GeneralMixin} from "@/mixins/GeneralMixin";
import BigCardComponent from "@/components/BigCardComponent";

export default {
  components: {BigCardComponent},
  mixins: [GeneralMixin],
  mounted() {
    this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", true);
  },
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.travel-listing {
  padding: 40px;
  min-height: 100vh;
  position: relative;

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

  &__listing-box {
    max-width: 895px;
    margin: 30px auto auto;
    background: $bgGrey;
    width: 100%;
    position: relative;
    display: flex;
    padding: 25px;
    border-radius: 25px;
    flex-wrap: wrap;
  }
}
</style>