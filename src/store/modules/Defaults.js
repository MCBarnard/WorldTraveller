const defaultData = {
    state: {
        loader: {
            loading: false,
        },
    },
    getters: {
        loading: state => state.loader.loading,
    },
    mutations: {
        SET_LOADING (state, loading) {
            state.loader.loading = loading;
        },
    },
    actions: {
        ACTION_SET_LOADING ({ commit }, loading) {
            commit("SET_LOADING", loading);
        },
    }
};

export default defaultData;