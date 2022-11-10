import Vuex from 'vuex';
import DefaultData from "./modules/Defaults";
import CountriesApi from "@/store/modules/CountriesApi";
import Toast from "@/store/modules/Toast";

const setup = new Vuex.Store({
    modules: {
        DefaultData,
        CountriesApi,
        Toast
    }
});

export default setup;