export function loadPage(component) {
// '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/pages/${component}.vue`)
}

export default [
    {path: '/', component: loadPage('Home')},
    {path: '/login', component: loadPage('Login')},
    {path: "/friends", component: loadPage("Friends")}
]