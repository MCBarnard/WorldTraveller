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
        }
    },
    computed: {
        readyToGoToNextPage() {
            return this.$store.getters.canGoToNextPage;
        }
    },
    watch: {
        // This serves as our re-opening of the page watcher
        readyToGoToNextPage(val) {
            if (val) {
                setTimeout(() => {
                    this.$store.dispatch("ACTION_SET_LOADING", false);
                }, 200);
            }
        }
    }
}