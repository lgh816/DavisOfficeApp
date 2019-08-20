import Vue from "nativescript-vue";
import routes from '~/router';
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);

Vue.config.silent = (TNS_ENV === 'production');

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes

new Vue({
  render (h) {
    return h(
      routes.App,
      [
        h(routes.DrawerContent, { slot: 'drawerContent' }),
        h(routes.Login, { slot: 'mainContent' })
      ]
    )
  }
}).$start();
