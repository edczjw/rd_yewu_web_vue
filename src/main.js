import Vue from 'vue'
import App from './App'
import router from './router'

//axios并不像ajax或者vue-resource那样，它默认post是以Request Payload这种形式来传输的
import axios from './axios';

//需要引用vue-resource
import VueResource from 'vue-resource'
// 导入阿里图标库
import ElementUI from 'element-ui'

//引入弹出框
import { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入cookie
import VueCookies from 'vue-cookies'

//引入vuex
import store from './store'

Vue.use(VueCookies)
Vue.use(VueResource)
Vue.http.options.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
};

// 跳转后返回顶部
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$alert = MessageBox.alert
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,//使用store
    axios,
    template: '<App/>',
    components: { App },
    render: h => h(App)
})