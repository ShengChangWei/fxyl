import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
Vue.use(Router);

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
const routerReplace = Router.prototype.replace;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};
Router.prototype.replace = function replace(location) {
    return routerReplace.call(this, location).catch(error => error);
};
const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/views/index.vue')
        }
    ]
});

// 路由拦截

router.beforeEach((to, from, next) => {
    NProgress.start();
    NProgress.done();
    next();
});
export default router;
