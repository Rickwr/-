import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'

import store from '@/store'

let originPush = VueRouter.prototype.push;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {}, () => {});
  }
}


const router = new VueRouter({
  routes,
  // 跳转路由滚动行为
  scrollBehavior(to, from, savedPosition) {
    return {
      y: 0
    }
  }
})


// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 获取仓库中的token，判断用户是否登录
  let token = store.state.user.token;
  // 获取仓库中用户信息的用户名
  let userName=store.state.user.userInfo.name;
  // 用户已登录
  if (token) {
    // 已登录状态不能进入登录注册页面
    if(to.path=='/login'||to.path=='/registar'){
      // 直接返回来时路由
      next(false);
    }else{
      // 已登录状态跳转其他路由
      // 如果不存在用户信息，则需要重新发送请求
      if(userName){
        next();

      }else{
        next();
        try {
                  // 发送请求
        await store.dispatch('user/getUserInfo');
        } catch (error) {
          // 请求失败，token失效，需要退出登录，清空信息且跳转登录页面
          store.dispatch('user/userLogout');
          next('/login');
        }
      }

    }
  } else {
    // 用户未登录，不能去交易相关的页面，不能去支付相关页面，不能去个人中心
    // 未登录去上述页面，需要跳转到登录页面
    if(to.path.indexOf('/trade')!=-1||to.path.indexOf('/pay')!=-1||to.path.indexOf('/center')!=-1){
      // 跳转到登录页面需要注意把原本跳转路径当成query参数带上，等登录成功后重新跳转
      next('login?redirect='+to.path);
    }else{
      // 用户未登录，跳转非上述页面路由，放行
      next();
    }
  }
})

export default router