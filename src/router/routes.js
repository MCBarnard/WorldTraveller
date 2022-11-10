const routes = [
    {
        path: '/',
        component: () => import('../pages/CountryListingPage.vue'),
        name: 'countries'
    },
    {
        path: '/Travel-Listing',
        component: () => import('../pages/TravelListingPage.vue'),
        name: 'travel-listing'
    },
    // {
    //     path: '/Cookie-Settings',
    //     component: () => import('../pages/CookieSettingsPage.vue'),
    //     name: 'cookie-settings'
    // },
]

export default routes;