import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
            path: "/user",
            name: "user",
            component: () =>
                import(/* webpackChunkName: "user" */ "./views/User.vue")
        },
        {
            path: "/discover",
            name: "discover",
            component: () =>
                import(/* webpackChunkName: "discover" */ "./views/Discover.vue")
        },
        {
            path: "/categories",
            name: "categories",
            component: () =>
                import(/* webpackChunkName: "categories" */ "./views/Categories.vue")
        },
        {
            path: "/contact",
            name: "contact",
            component: () =>
                import(/* webpackChunkName: "contact" */ "./views/Contact.vue")
        }
    ]
});
