"use strict";

export const GeneralMixin = {
  methods: {
    async goToRoute(route) {
        this.$store.dispatch("ACTION_SET_LOADING", true);
        // Wait for animation to trigger then push route
        setTimeout(() => {
            this.$router.push({...route});
        }, 1000);

        setTimeout(() => {
            this.$store.dispatch("ACTION_SET_LOADING", false);
        }, 1200);
    }
  }
}