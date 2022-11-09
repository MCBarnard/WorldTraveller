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
            pages: []
        }
    },
    getters: {
        eagerLoadCountries: state => state.countries.eagerLoad,
        countriesApiHost: state => state.countries.api.host,
        allCountries: state => state.countries.all,
        paginatedCountries: state => state.countries.paginatedCountries,
        activeCountries: state => state.countries.paginatedCountries.data,
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
    },
}

export default CountriesApi;