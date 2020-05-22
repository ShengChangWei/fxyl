import Vue from 'vue';
import App from './App.vue';
import router from './router.js';

import Element from 'element-ui';
import 'font-awesome/css/font-awesome.css';
//  reset CSS
import 'normalize.css/normalize.css';
import '@/styles/index.scss'; // global css
import '@/assets/fonts/iconfont.css';
import '@/assets/fonts/sysiconfont.css';
import EVueContextmenu from 'e-vue-contextmenu';
import EVueEsrimapjs from 'e-vue-esrimapjs';
import eVueEchartsjs from 'e-vue-echartsjs';
import { messageUtils } from '@/utils/message.utils.js'
import { getUrlParsms, saveUserInfo } from '@/services/auth.service';
import configService from '@/services/config.service'
Vue.use(EVueEsrimapjs);
Vue.use(eVueEchartsjs);
Vue.use(EVueContextmenu);
Vue.use(Element);
Vue.config.productionTip = false;
Vue.prototype.$messageUtils = messageUtils;

if (getUrlParsms('userInfo')) {
    saveUserInfo(JSON.parse(decodeURIComponent(getUrlParsms('userInfo'))));
    const url = process.env.NODE_ENV === 'development' ? '/' : `${configService.domain}/`;
    // window.open(url, '_self'); // 去掉导航栏参数
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
