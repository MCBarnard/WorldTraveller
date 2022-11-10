const CountriesApi = {
    state: {
        countries: {
            api: {
                host: "https://restcountries.com/v3.1/"
            },
            all: [],
            paginatedCountries: {
                data: [],
                itemsPerPage: undefined,
                page: undefined,
                totalItems: undefined,
            },
            eagerLoad: false,
            pages: [],
        },
        savedCountries: {
            stub: {
                inUse: false,
                host: "https://restcountries.com/v3.1/name/united"
            },
            all: [],
        }
    },
    getters: {
        // Configs
        eagerLoadCountries: state => state.countries.eagerLoad,
        countriesApiHost: state => state.countries.api.host,

        // SaveCountries Specific
        mySavedCountries: state => state.savedCountries.all,
        stupSavedCountries: state => state.savedCountries.stub.inUse,
        stupSavedCountriesURL: state => state.savedCountries.stub.host,

        // Countries Specific
        allCountries: state => state.countries.all,
        paginatedCountries: state => state.countries.paginatedCountries,
        activeCountries: state => state.countries.paginatedCountries.data,

        // Pagination Specific
        totalActiveCountries: state => state.countries.paginatedCountries.totalItems,
        currentItemsPerPage: state => state.countries.paginatedCountries.itemsPerPage,
        countryCurrentPage: state => state.countries.paginatedCountries.page,
        countryPaginationHasNext: state => {
            let page = state.countries.paginatedCountries.page;
            let totalItems = state.countries.paginatedCountries.totalItems;
            let itemsPerPage = state.countries.paginatedCountries.itemsPerPage;

            let currentItemMax = page * itemsPerPage;
            return currentItemMax < totalItems;
        },
        countryPaginationHasPrevious: state => {
            return state.countries.currentPage > 1;
        },
    },
    mutations: {
        SET_COUNTRIES (state, countries) {
            state.countries.all = countries;
        },
        SET_PAGINATED_COUNTRIES (state, countries) {
            state.countries.paginatedCountries = countries;
        },
        SET_CURRENT_PAGE (state, page) {
            state.countries.currentPage = page;
        },
        SET_MY_SAVED_COUNTRIES (state, items) {
            state.savedCountries.all = items;
        },
        SET_PUSH_TO_SAVED_COUNTRIES (state, item) {
            state.savedCountries.all.push(item);
        },
        SET_REMOVE_ITEM_FROM_SAVED_COUNTRIES (state, item) {
            let length = state.savedCountries.all.length;
            let indexToCut = undefined;

            // Find index
            for (let i =0; i <= length; i++) {
                if (state.savedCountries.all[i].name.common === item) {
                    indexToCut = i;
                    break;
                }
            }
            // splice transforms the array at the pointer
            state.savedCountries.all.splice(indexToCut, 1);
        },
    },
    actions: {
        ACTION_SET_COUNTRIES ({ commit }, countries) {
            commit("SET_COUNTRIES", countries);
        },
        ACTION_SET_PAGINATED_COUNTRIES ({ commit }, data) {
            commit("SET_PAGINATED_COUNTRIES", data);
        },
        ACTION_SET_CURRENT_PAGE ({ commit }, page) {
            commit("SET_CURRENT_PAGE", page);
        },
        ACTION_SET_MY_SAVED_COUNTRIES ({ commit }, items) {
            commit("SET_MY_SAVED_COUNTRIES", items);
        },
        ACTION_SET_PUSH_TO_SAVED_COUNTRIES ({ commit }, item) {
            commit("SET_PUSH_TO_SAVED_COUNTRIES", item);
        },
        ACTION_SET_REMOVE_ITEM_FROM_SAVED_COUNTRIES ({ commit }, item) {
            commit("SET_REMOVE_ITEM_FROM_SAVED_COUNTRIES", item);
        },
    },
}

export default CountriesApi;