import Vue from "nativescript-vue";
import routes from '~/router';
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import RadChart from 'nativescript-ui-chart/vue';
import VueDevtools from 'nativescript-vue-devtools';

Vue.use(VueDevtools);
Vue.use(RadSideDrawer);
Vue.use(RadChart);
Vue.config.silent = (TNS_ENV === 'production');

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$hostname = 'https://office.yescnc.co.kr';
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
