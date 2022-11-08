import Vuex from 'vuex';
import defaultData from "./modules/Defaults";

const store = new Vuex.Store({
    modules: {
        defaultData
    }
})

export default store;