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
    <div class="mobile-search-container">
      <label for=""></label>
      <div class="mobile-search">
        <input id="name-search-filter" type="text" v-model="nameSearch" placeholder="Enter a country name" @change="nameEntered">
        <button>Search</button>
      </div>
    </div>
    <div class="pagination-page">
      <p>Displaying {{ currentPageComputed * currentItemsPerPageComputed }} of {{ totalItemsComputed }}</p>
    </div>
    <div class="card-holder__cards">
      <card-component v-for="(item, index) in cards" :key="index"
        :id="item.id"
        :country="item.country"
        :region="item.region"
        :subRegion="item.subRegion"
        :flag="item.flag"
        :lat="item.lat"
        :long="item.long"
        :maps="item.maps"
        :rawItem="item.rawItem"
      />
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent";
import {GeneralMixin} from "@/mixins/GeneralMixin";

export default {
  mixins: [GeneralMixin],
  components: {
    CardComponent
  },
  props: {
    title: String,
    pre: String,
    sub: String,
    cards: Array
  },
  data() {
    return {
      nameSearch: ""
    }
  },
  methods: {
    nameEntered() {
      this.$emit("search", this.nameSearch);
    }
  },
  computed: {
    currentItemsPerPageComputed() {
      return this.$store.getters.currentItemsPerPage;
    },
    totalItemsComputed() {
      return this.$store.getters.totalActiveCountries;
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.card-holder {
  .pagination-page {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 12px;
    font-family: $sub-font;
    color: $sub-text-color;

    @media (max-width: 1080px) {
      margin-top: 20px;
    }

    @media (max-width: 600px) {
      margin-top: 20px;
    }
  }
  .mobile-search {
    display: none;
    @media (max-width: 876px) {
      display: flex;
    }

    input {
      outline: 0;
      border-radius: 10px 0 0 10px;
      background: #f2f2f2;
      width: 100%;
      border: 0;
      margin: 10px 0 15px;
      padding: 15px;
      box-sizing: border-box;
      font-size: 18px;

      @media (max-width: 360px) {
        font-size: 14px;
      }
    }

    button {
      background: radial-gradient(#0070ff 10%, $genexBlue 100%);
      font-size: 18px;
      color: $white;
      outline: none !important;
      border: none !important;
      padding: 5px 20px;
      border-radius: 0 10px 10px 0;
      cursor: pointer;
      box-shadow: 0 0 50px -40px #625a5a;
      height: 51px;
      margin-top: 9px;

      &:hover {
        background: radial-gradient(#0070ff 10%, #073e52 100%);
        box-shadow: 0 0 11px -2px #09697e;
      }

      @media (max-width: 360px) {
        font-size: 14px;
        height: 47px;
      }
    }
  }

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
    @media (max-width: 1250px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
  }
}
</style>