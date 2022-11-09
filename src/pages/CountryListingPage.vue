<template>
  <div class="home">
    <div class="flex-container">
      <div class="flex-container__left">
        <div class="home__countries">
          <card-table-component
              pre="Done and Dusted, what's next"
              title="Countries of the World"
              sub="The world is waiting, take the leap and venture on to explore the unknown!"
          />
        </div>
      </div>
      <div class="flex-container__right">
        <div class="home__genex">
          <div class="home__genex__item">
            <a href="https://genexinstitute.com/" target="_blank" rel="noreferrer">
              <genex-svg />
            </a>
          </div>
        </div>
        <div class="home__contact">
          <h3>Explore</h3>
          <p>
            Find the perfect destination for your next visit around the globe!
          </p>

          <h4>Destinations</h4>
          <div class="smart-block-holding">
            <smart-function
                class="smart-block-item"
                :enabled="true"
                name="My Travel List"
                url="somewhere"
                color="#08779d"
            >
              View <button class="travel-button" @click="goToRoute({name: 'travel-listing'})">My Travel List</button>
            </smart-function>
          </div>

          <h4>Filter</h4>
          <div class="smart-block-holding">
            <smart-function
                class="smart-block-item"
                :enabled="true"
                name="Search By Name"
                url="somewhere"
                color="#0080c9"
            >
              <label for="name-search-filter">
                <small>Click out or press enter to search</small>
              </label>
              <input id="name-search-filter" type="text" v-model="nameFilter" @change="nameEntered">
            </smart-function>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenexSvg from "../components/SVGs/GenexSvg";
import SmartFunction from "@/components/SmartFunction";
import {GeneralMixin} from "@/mixins/GeneralMixin";
import CardTableComponent from "@/components/CardTableComponent";

export default {
  data() {
    return {
      nameFilter: ""
    }
  },
  components: {
    CardTableComponent,
    GenexSvg,
    SmartFunction
  },
  mixins: [GeneralMixin],
  mounted() {
    this.$store.dispatch("ACTION_SET_CHANGE_TRAVEL_QUOTE");
    this.$store.dispatch("ACTION_SET_CHANGE_ACTIVE_AUTHOR");
    this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", true);
  },
  computed: {
    randomQuote() {
      return this.$store.getters.randomTravelQuote;
    },
    randomAuthor() {
      return this.$store.getters.randomAuthor;
    }
  },
  methods: {
    nameEntered() {
      console.log(this.nameFilter)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.home {
  padding: 40px 0 0 40px;
  width: 100%;
  height: 100%;
  position: relative;

  &__genex {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 20px;

    a {
      color: $white;
      cursor: pointer;
      outline: none!important;
      text-decoration: none!important;
      width: 100%;
      display: flex;
      padding: 5px 10px;
    }

    &__item {
      background: radial-gradient($lightBlue 20%, $genexBlue 100%);
      border-radius: 15px;
      height: 50px;
      width: 100px;
      display: flex;
      transition: all 0.4s ease;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px -2px $lightBlue;
      }
    }
  }

  &__contact {
    height: 100%;
    background: $bgGrey;
    padding: 40px;
    border-radius: 20px 0 0 0;
    margin-top: 40px;
    width: 360px;
    box-shadow: 0 0 200px 5px #f7f7f7;

    h3 {
      font-family: $heading-font;
      font-weight: 400;
      font-size: 22px;
      color: $main-text-color;
    }

    h4 {
      font-family: $heading-font;
      font-weight: 400;
      font-size: 16px;
      color: $main-text-color;
      margin-top: 16px;
    }

    p {
      font-family: $sub-font;
      font-weight: 400;
      font-size: 14px;
      color: $sub-text-color;
    }

    .smart-block-holding {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .smart-block-item {
        margin: 10px 0;
      }
    }

    .travel-button {
      background: transparent;
      outline: none!important;
      border: none!important;
      color: $linkblue;
      text-decoration: none;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .flex-container {
    display: flex;
    height: calc(100% - 90px);

    &__left {
      width: 100%;
    }

    &__right {
      margin-left: 20px;
      height: 100%;
    }
  }
}
</style>