import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAMap from 'vue-amap';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
import App from './App';
import store from '../../vuex/store';
import routes from '../../router/routes';

Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '8120b756a0a5a0cc9a543412fc5b2613',
  // 插件集合
  plugin: ['AMap.Geocoder','AMap.Geolocation','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

const router = new VueRouter({
  routes:routes
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')