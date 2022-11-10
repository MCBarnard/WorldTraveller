"use strict";

export const GeneralMixin = {
    methods: {
        async fetchFreshCountryData(field=null, value=null) {
            this.$store.dispatch("ACTION_SET_TOAST_STATE", "busy");
            let endpoint = this.countriesApiEndpoint

            if (field === null) {
                endpoint = endpoint + "all";
            } else {
                endpoint = endpoint + `${field}/${value}`;
            }
            await this.$axios.get(endpoint).then(async response => {
                await this.$store.dispatch("ACTION_SET_COUNTRIES", response.data).then(() => {
                    this.paginatedResults(response.data);
                    this.$store.dispatch("ACTION_SET_TOAST_STATE", "success");
                });
            }).catch(() => {
                this.$store.dispatch("ACTION_SET_TOAST_STATE", "error");
            });
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

            for (let index = currentLowerActiveIndex; index <= currentUpperActiveIndex && data[index] !== undefined; index++) {
                // Push required Docs
                if (index >= currentLowerActiveIndex && index <= currentUpperActiveIndex) {
                    formattedResults.data.push(data[index]);
                }
            }

            this.$store.dispatch("ACTION_SET_PAGINATED_COUNTRIES", formattedResults);
        },
        flipCard(id) {
            let item = document.getElementById(id);
            if (!item.classList.contains('flipped')) {
                item.classList.add('flipped');
                setTimeout(() => {
                    item.getElementsByClassName('card__front')[0].style.opacity = '0'
                }, 150);
                setTimeout(() => {
                    item.getElementsByClassName('card__front')[0].style.display = 'none'
                    item.getElementsByClassName('card__back')[0].style.display = 'block'
                    item.getElementsByClassName('card__back')[0].style.opacity = '1'
                }, 300);
            }else {
                item.classList.remove('flipped');
                setTimeout(() => {
                    item.getElementsByClassName('card__back')[0].style.opacity = '0'
                }, 300);
                setTimeout(() => {
                    item.getElementsByClassName('card__back')[0].style.display = 'none'
                    item.getElementsByClassName('card__front')[0].style.display = 'flex'
                    item.getElementsByClassName('card__front')[0].style.opacity = '1'
                }, 300);
            }
        },
        async goToRoute(route) {
            if (this.$route.name === route.name) {
                // No need to navigate anywhere, same page
                return;
            }
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
    },
    computed: {
        mySavedCountriesComputed() {
            return this.$store.getters.mySavedCountries;
        },
        currentPageComputed() {
            return this.$store.getters.countryCurrentPage;
        },
        countriesApiEndpoint() {
            return `${this.$store.getters.countriesApiHost}/`;
        },
        eagerLoadCountries() {
            return this.$store.getters.eagerLoadCountries;
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