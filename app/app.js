import Vue from "nativescript-vue";
import routes from '~/router';
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import VueDevtools from 'nativescript-vue-devtools';
import moment from "moment";
import VueMomentJS from "vue-momentjs";

// import Vuex from 'vuex';

// Vue.use(Vuex);
Vue.use(VueDevtools);
Vue.use(RadSideDrawer);
Vue.use(VueMomentJS, moment);
Vue.config.silent = (TNS_ENV === 'production');

// Set up routes as a prototype to use throuhout the app.

// Vue.prototype.$hostInfo = 'https://office.yescnc.co.kr';
Vue.prototype.$hostInfo = 'http://200.100.1.140:8081';
Vue.prototype.$routes = routes;

new Vue({
  render (h) {
    return h(
      routes.App,
      [
        h(routes.DrawerContent, { slot: 'drawerContent' }),
        h(routes.Login, { slot: 'mainContent' })
      ]
    )
  },
  store : routes.Store
}).$start();