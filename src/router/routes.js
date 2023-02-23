export function loadPage(component) {
// '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/pages/${component}.vue`)
}

export default [
    {path: '/', component: loadPage('Login')},
    {path: "/home", component: loadPage("Home")},
    {path: "/friends", component: loadPage("Friends")},
    {path: "/create" , component: loadPage("Create")},
    {path: "/timetable" , component: loadPage("Timetable")}
]