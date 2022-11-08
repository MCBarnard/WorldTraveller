const routes = [
    {
        path: '/',
        component: () => import('../pages/HomePage.vue'),
        name: 'default'
    },
    {
        path: '/Another',
        component: () => import('../pages/AnotherPage.vue'),
        name: 'another'
    },
]

export default routes;