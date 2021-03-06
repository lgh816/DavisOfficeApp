import Vue from "nativescript-vue";
import routes from '~/router';
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import VueDevtools from 'nativescript-vue-devtools';
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import DateTimePicker from "nativescript-datetimepicker/vue";
import Store from '~/store/store'
// import application from 'tns-core-modules/application';

// import QRCodeGeneratore from "nativescript-zxing/";

import * as _ from 'lodash';

// import Vuex from 'vuex';

// Vue.use(Vuex);
Vue.use(VueDevtools);
Vue.use(RadSideDrawer);
Vue.use(VueMomentJS, moment);
Vue.use(DateTimePicker);
// Vue.use(QRCodeGeneratore);
Vue.config.silent = (TNS_ENV === 'production');

// Set up routes as a prototype to use throuhout the app.

// Vue.prototype.$hostInfo = 'https://office.yescnc.co.kr';
// Vue.prototype.$hostInfo = 'http://200.100.1.140:8081';
Vue.prototype.$routes = routes;
Vue.prototype.$store = Store;

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