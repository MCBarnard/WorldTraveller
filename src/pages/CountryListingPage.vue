<template>
  <div class="home">
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
            <button @click="() => {handlePaginationButtonClick('back')}">Back</button>
            <button @click="() => {handlePaginationButtonClick('next')}">Next</button>
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
      nameFilter: "",
      countryList: []
    }
  },
  components: {
    CardTableComponent,
    GenexSvg,
    SmartFunction
  },
  mixins: [GeneralMixin],
  async mounted() {
    // Cater for landing on a fresh page or moving into it
    await this.$store.dispatch("ACTION_SET_LOADING", true);
    await this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", false);

    if (this.allCountries === undefined || this.allCountries.length === 0) {
      // Fetch data from countries endpoint
      await this.$axios.get(this.countriesApiEndpoint).then(async response => {
        await this.$store.dispatch("ACTION_SET_COUNTRIES", response.data).then(() => {
          this.paginatedResults(response.data);
        });
      });
    } else {
      // Intentionally also don't pass page so that it resets to 1 on page load
      this.paginatedResults(this.allCountries);
    }
    await this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", true);
  },
  computed: {
    allCountries() {
      return this.$store.getters.allCountries;
    },
    quote() {
      return this.$store.getters.randomTravelQuote;
    },
    author() {
      return this.$store.getters.randomAuthor;
    },
    countriesApiEndpoint() {
      return `${this.$store.getters.countriesApiHost}/all`;
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
    paginatedResults(data, page=1, perPage=10) {
      const formattedResults = {
        data: [],
        page: page,
        totalItems: data.length,
        itemsPerPage: perPage
      };

      // Set the page in the store to update visually for user
      this.$store.dispatch("ACTION_SET_CURRENT_PAGE", page);

      // Get our current active data items
      const currentLowerActiveIndex = (perPage * page) - perPage;
      const currentUpperActiveIndex = (perPage * page) - 1;

      for (let index = currentLowerActiveIndex; index <= currentUpperActiveIndex; index++) {
        // Push required Docs
        if (index >= currentLowerActiveIndex && index <= currentUpperActiveIndex) {
          formattedResults.data.push(data[index]);
        }
      }

      this.$store.dispatch("ACTION_SET_PAGINATED_COUNTRIES", formattedResults);
    },
    handlePaginationButtonClick(direction) {
      const page = this.$store.getters.countryCurrentPage;
      if (direction === "next") {
        this.paginatedResults(this.allCountries, page + 1);
      } else {
        // Default Page starts at 1
        if (page > 1) {
          this.paginatedResults(this.allCountries, page - 1);
        }
      }
    },
    nameEntered() {
      // preparing to filter
      this.filterThroughData("country", this.nameFilter);
    },
    filterThroughData(filter, value) {
      console.log("Filtering by " + filter + " for " + value);
      // Fetch all the countries to search through and
      // init a clean array for filling
      const data = this.allCountries;

      // Loop through them checking if the name matches a substring value
      const filteredArray = data.filter(item => item.name.common === value);
      console.log(filteredArray)

      // call the this.paginatedResults(filtered data); which
      // sets the active array this should also automatically take care of the rest
      this.paginatedResults(filteredArray);
    },
    packagedCountriesDataSet() {
      const formatted = [];
      const data = this.paginatedCountries.data;
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