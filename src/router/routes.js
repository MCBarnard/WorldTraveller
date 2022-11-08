const routes = [
    {
        path: '/',
        component: () => import('../pages/HomePage.vue'),
        name: 'countries'
    },
    {
        path: '/Travel-Listing',
        component: () => import('../pages/AnotherPage.vue'),
        name: 'travel-listing'
    },
]

export default routes;