export default [
    {
        path: '/exception-404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "Exception404" */ '@/views/exception/404'),
    },
    {
        path: '/exception-403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "Exception403" */ '@/views/exception/403'),
    },
    {
        path: '/exception-500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "Exception500" */ '@/views/exception/500'),
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: () => import(/* webpackChunkName: "NetworkError" */ '@/views/exception/network-error'),
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: () => import(/* webpackChunkName: "Maintenance" */ '@/views/exception/maintenance'),
    },
];
