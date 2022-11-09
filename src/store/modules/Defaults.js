const defaultData = {
    state: {
        loader: {
            loading: false,
            readyToOpen: true
        },
        quotes: {
            travel: [
                "Jobs fill your pockets, adventures fill your soul",
                "Not all those who wander are lost.",
                "The world is a book and those who do not travel read only one page.",
                "In the end, we only regret the chances we didn't take",
                "The goal is to die with memories not dreams."
            ],
            // Very bad attempt at inserting some humor
            authors: [
                "Someone said this once",
                "Google..",
                "author unknown",
                "AI generated",
                "[Insert your name here to sound cool]"
            ],
            activeQuote: "",
            activeAuthor: "",
        }
    },
    getters: {
        loading: state => state.loader.loading,
        canGoToNextPage: state => state.loader.readyToOpen,
        randomTravelQuote: state => state.quotes.activeQuote,
        randomAuthor: state => state.quotes.activeAuthor,
    },
    mutations: {
        SET_LOADING (state, loading) {
            state.loader.loading = loading;
        },
        SET_READY_FOR_NEXT_PAGE (state, ready) {
            state.loader.readyToOpen = ready;
        },
        SET_CHANGE_TRAVEL_QUOTE (state) {
            state.quotes.activeQuote = state.quotes.travel[Math.floor(Math.random()*state.quotes.travel.length)];
        },
        SET_CHANGE_ACTIVE_AUTHOR (state) {
            state.quotes.activeAuthor = state.quotes.authors[Math.floor(Math.random()*state.quotes.authors.length)];
        },
    },
    actions: {
        ACTION_SET_LOADING ({ commit }, loading) {
            commit("SET_LOADING", loading);
        },
        ACTION_SET_READY_FOR_NEXT_PAGE ({ commit }, ready) {
            commit("SET_READY_FOR_NEXT_PAGE", ready);
        },
        ACTION_SET_CHANGE_TRAVEL_QUOTE ({ commit }) {
            commit("SET_CHANGE_TRAVEL_QUOTE");
        },
        ACTION_SET_CHANGE_ACTIVE_AUTHOR ({ commit }) {
            commit("SET_CHANGE_ACTIVE_AUTHOR");
        },
    }
};

export default defaultData;