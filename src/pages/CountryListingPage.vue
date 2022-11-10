<template>
  <div class="home">
    <div class="toast-holder">
      <toast-component />
    </div>
    <div class="flex-container">
      <div class="flex-container__left">
        <div class="home__countries">
          <card-table-component
              pre="Done and Dusted, what's next"
              title="Countries of the World"
              sub="The world is waiting, take the leap and venture on to explore the unknown!"
              :cards="countryList"
          />
          <div class="home__countries__pagination-section">
            <button @click="() => {handlePaginationButtonClick('back')}"
              :class="[{'disabled': !paginationHasPrevious}]"
            >Back</button>
            <button @click="() => {handlePaginationButtonClick('next')}"
              :class="[{'disabled': !paginationHasNext}]"
            >Next</button>
          </div>
        </div>
      </div>
      <div class="flex-container__right">
        <div class="home__genex">
          <div class="home__genex__quote">
            <p><span>{{ quote }}</span> <br><small> - {{ author }}</small></p>
          </div>
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
                name="My Travel List"
                color="#FF971D"
            >
              View <button class="travel-button" @click="goToRoute({name: 'travel-listing'})">My Travel List</button>
            </smart-function>
          </div>

          <h4>Filter</h4>
          <div class="smart-block-holding">
            <smart-function
                class="smart-block-item"
                name="Search By Name"
                color="#08779d"
            >
              <label for="name-search-filter">
                <small>Click out or press enter to search</small>
              </label>
              <input id="name-search-filter" type="text" v-model="nameFilter" placeholder="Enter a country name" @change="nameEntered">
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
import ToastComponent from "@/components/ToastComponent";

export default {
  data() {
    return {
      nameFilter: "",
      countryList: []
    }
  },
  components: {
    CardTableComponent,
    GenexSvg,
    SmartFunction,
    ToastComponent
  },
  mixins: [GeneralMixin],
  async mounted() {
    // Cater for landing on a fresh page or moving into it
    await this.$store.dispatch("ACTION_SET_LOADING", true);
    await this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", false);

    if (this.allCountries === undefined || this.allCountries.length === 0) {
      // Fetch data from countries endpoint
      await this.fetchFreshCountryData();
    } else {
      // Intentionally also don't pass page so that it resets to 1 on page load
      this.paginatedResults(this.allCountries);
    }
    await this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", true);
  },
  computed: {
    paginationHasNext() {
      return this.$store.getters.countryPaginationHasNext;
    },
    paginationHasPrevious() {
      return this.$store.getters.countryPaginationHasPrevious;
    },
    allCountries() {
      return this.$store.getters.allCountries;
    },
    quote() {
      return this.$store.getters.randomTravelQuote;
    },
    author() {
      return this.$store.getters.randomAuthor;
    },
    paginatedCountries() {
      return this.$store.getters.paginatedCountries;
    },
    // Is being watched so it is being used
    activeCountriesComputed() {
      return this.$store.getters.activeCountries;
    },
  },
  methods: {
    clearFlippedCards() {
      const items = document.getElementsByClassName("flipped");
      for(let i = 0; i < items.length; i++) {
        this.flipCard(items[i].id);
      }
    },
    handlePaginationButtonClick(direction) {
      // Clear all the flipped cards first
      this.clearFlippedCards();

      const page = this.currentPageComputed;
      if (direction === "next" && this.paginationHasNext) {
        this.paginatedResults(this.allCountries, page + 1);
      } else if (direction === "back" && this.paginationHasPrevious && page > 1) {
        this.paginatedResults(this.allCountries, page - 1);
      }
    },
    async nameEntered() {
      if (this.nameFilter) {
        // Check if we need to do new calls to the db
        if (!this.eagerLoadCountries) {
          await this.fetchFreshCountryData("name", this.nameFilter);
        } else {
          // preparing to filter
          this.paginatedResults(this.allCountries, this.currentPageComputed);
          this.filterThroughData("country", this.nameFilter);
        }
      } else {
        this.resetFilters();
      }
    },
    async resetFilters() {
      // Passing the original data will reset the pagination
      if (!this.eagerLoadCountries) {
        await this.fetchFreshCountryData();
      } else {
        this.paginatedResults(this.allCountries);
      }
    },
    // Built in a way we can easily reuse for future filters
    filterThroughData(filter, value) {
      // Fetch all the countries to search through and
      // init a clean array for filling
      let data = this.allCountries;

      // Loop through them checking if the name matches a substring value
      const filteredArray = data.filter(item => item.name.common === value);

      // call the this.paginatedResults(filtered data); which
      // sets the active array this should also automatically take care of the rest
      this.paginatedResults(filteredArray);
    },
    packagedCountriesDataSet() {
      const formatted = [];
      let data = this.paginatedCountries.data;
      data.forEach((item) => {
        formatted.push({
          id: item.name.common,
          country: item.name.common,
          region: item.region,
          subRegion: item.subregion,
          flag: item.flags.png,
          lat: item.latlng[0],
          long: item.latlng[1],
        });
      })
      return formatted;
    },
  },
  watch: {
    activeCountriesComputed(val) {
      if (val !== undefined && val.length > 0) {
        this.countryList = this.packagedCountriesDataSet();
      }
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

  .toast-holder {
    position: absolute;
    top: 50px;
    right: 0;
    height: 70px;
    z-index: 3;
  }

  &__genex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

    &__quote {
      background: $bgGrey;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 0 50px -40px #625a5a;

      p {
        font-size: 12px;
        max-width: 190px;
        text-align: start;
        color: $main-text-color;
        font-weight: 600;

        small {
          text-align: end;
          font-size: 10px;
          color: $sub-text-color;
        }
      }
    }

    &__item {
      background: radial-gradient($lightBlue 20%, $genexBlue 100%);
      border-radius: 15px;
      height: 50px;
      width: 100px;
      display: flex;
      transition: all 0.4s ease;
      -webkit-transition: all 0.4s ease;
      -moz-transition: all 0.4s ease;
      -o-transition: all 0.4s ease;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px -2px $lightBlue;
      }
    }
  }

  &__contact {
    background: $bgGrey;
    padding: 40px;
    border-radius: 20px 0 0 20px;
    margin-top: 45px;
    width: 360px;
    box-shadow: 0 0 50px -40px #625a5a;

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
        box-shadow: 0 0 50px -40px #625a5a;
      }

      input {
        outline: 0;
        border-radius: 10px;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 10px 0 15px;
        padding: 5px 15px;
        box-sizing: border-box;
        font-size: 18px;
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

  &__countries {
    &__pagination-section {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 0;

      button {
        background: radial-gradient(#0070ff 10%, $genexBlue 100%);
        color: $white;
        outline: none!important;
        border: none!important;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0 0 50px -40px #625a5a;

        &:hover {
          background: radial-gradient(#0070ff 10%, #073e52 100%);
          box-shadow: 0 0 11px -2px #09697e;
        }

        &.disabled {
          background: radial-gradient(#989898 10%, #3f3f3f 100%);
          cursor: default!important;
          opacity: 0;
          pointer-events: none!important;

          &:hover {
            background: radial-gradient(#989898 10%, #3f3f3f 100%);
            box-shadow: 0 0 50px -40px #625a5a;
          }
        }
      }
    }
  }

  .flex-container {
    display: flex;
    height: calc(100% - 140px);

    &__left {
      width: 100%;
    }

    &__right {
      margin-left: 45px;
      height: 100%;
    }
  }
}
</style>