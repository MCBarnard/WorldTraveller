import Vuex from 'vuex';
import defaultData from "./modules/Defaults";

const setup = new Vuex.Store({
    modules: {
        defaultData
    }
});

export default setup;