// 引入路由组件

export default [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/search/:keyword?',
      name: 'search',
      component:()=>import('@/views/Search'),
    },
    {
      path: '/login',
      name: 'login',
      component:()=>import('@/views/Login'),
      meta: { 
        isNFooter:true
       }
    },
    {
      path: '/register',
      name: 'register',
      component:()=>import('@/views/Register'),
      meta: { 
        isNFooter:true
       }
    },
    {
      path: '/detail/:skuId',
      name: 'detail',
      component:()=>import('@/views/Detail') 
    },
    {
      path: '/addcartsuccess',
      name: 'addcartsuccess',
      component:()=>import('@/views/AddCartSuccess') 
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component:()=>import('@/views/ShopCart') 
    },
    {
      path:'/trade',
      name:'trade',
      component:()=>import('@/views/Trade'),
      beforeEnter: (to, from, next) => {
        if(from.path=='/shopcart'){
          next();
        }else{
          next(false);
        }
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component:()=>import('@/views/Pay'),
      beforeEnter: (to, from, next) => {
        // 判断是否从订单页面进入且携带参数，未携带参数即并非点击提交订单按钮进入的，同样返回跳转
        if(from.path=='/trade'&&to.query.orderId){
          next();
        }else{
          next(false);
        }
      }
    },
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component:()=>import('@/views/PaySuccess') 
    },
    {
      path: '/center',
      name: 'center',
      component:()=>import('@/views/Center') ,
      children:[
        {
          path:'myorder',
          name:'myorder',
          component:()=>import('@/views/Center/MyOrder')
        },
        {
          path:'grouporder',
          name:'grouporder',
          component:()=>import('@/views/Center/GroupOrder')
        },
        {
          path:'/center',
          redirect:'/center/myorder'
        }
      ]
    },
    // 重定向，在项目跑起来的时候，访问/，立马定向到首页
    {
      path:'*',
      redirect: '/home'
    }
  ]