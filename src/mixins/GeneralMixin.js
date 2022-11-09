"use strict";

export const GeneralMixin = {
    methods: {
        async goToRoute(route) {
            this.$store.dispatch("ACTION_SET_LOADING", true);
            this.$store.dispatch("ACTION_SET_READY_FOR_NEXT_PAGE", false);

            // Wait for animation to trigger then push route
            setTimeout(() => {
                this.$router.push({...route});
            }, 1000);

            // We Intentionally leave the state in a closed state, this allows
            // us to make async calls on the page and let the component tell
            // us when they have fetched the data
        },
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
        }
    },
    computed: {
        allCountries() {
            return this.$store.getters.allCountries;
        },
        readyToGoToNextPage() {
            return this.$store.getters.canGoToNextPage;
        }
    },
    watch: {
        // This serves as our re-opening of the page watcher
        readyToGoToNextPage(val) {
            if (val) {
                this.$store.dispatch("ACTION_SET_LOADING", false);
            }
        }
    }
}