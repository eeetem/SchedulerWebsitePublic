export function loadPage(component) {
// '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/pages/${component}.vue`)
}
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../api/firebase";
function isAuth(to, from, next){
    console.log("Checking auth");
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
// User is signed in so continue to desired page
            return next();
// ...
        } else {
// User is signed out
// Send them back to the home page or maybe the login page
            return next({path : '/'});
        }
    });
}
export default [
    {path: '/', component: loadPage('Login')},
    {path: "/home", component: loadPage("Home"), beforeEnter: isAuth},
    {path: "/friends", component: loadPage("Friends"), beforeEnter: isAuth},
    {path: "/create" , component: loadPage("Create")},
    {path: "/timetable" , component: loadPage("Timetable"), beforeEnter: isAuth},
    {path: "/settings" , component: loadPage("Settings"), beforeEnter: isAuth},
    {path: "/friendsProfile" , component: loadPage("FriendsProfile"), beforeEnter: isAuth},
]