import Vuex from 'vuex';
import DefaultData from "./modules/Defaults";
import CountriesApi from "@/store/modules/CountriesApi";

const setup = new Vuex.Store({
    modules: {
        DefaultData,
        CountriesApi
    }
});

export default setup;