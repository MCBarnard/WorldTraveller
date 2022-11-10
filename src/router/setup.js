import * as VueRouter from 'vue-router';
import routes from './routes';
import setup from "../store/setup";

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name !== "travel-listing" || setup.getters.mySavedCountries.length > 0) {
        next();
    } else if (to.name === "travel-listing" && setup.getters.mySavedCountries.length === 0) {
        // User has no countries bookmarked yet
        setup.dispatch("ACTION_SET_LOADING", false);
        setup.dispatch("ACTION_SET_TOAST_STATE", "error");
        next("/");
    } else {
        next()
    }
})

export default router;