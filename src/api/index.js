// API统一管理
import requests from './ajax'
import mockRequests from './mockAjax'


// 三级联动接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'});

// 获取Banner（home首页轮播图接口）
export const reqGetBannerList=()=>mockRequests({url:'/banner',method:'get'});

// 获取Floor（楼层接口）
export const reqGetFloorList=()=>mockRequests({url:'/floor',method:'get'});

// 获取Search搜索数据（搜索接口）
export const reqProductList=(searchParams)=>requests({url:'/list',method:'post',data:searchParams});

// 获取Detail商品详情数据（商品详情接口）
export const reqGetDetailList=(skuId)=>requests({url:`/item/${skuId}`,method:'get'});

// 将加入购物车商品提交给服务器存储(更新购物车接口)
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqUpdateCartList=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

// 获取购物车数据（购物车接口）
// /api/cart/cartList
export const reqGetCartList=()=>requests({url:'/cart/cartList',method:'get'});

// 删除购物车商品（删除购物车商品接口）
// /api/cart/deleteCart/{skuId}
export const reqDeleteCart=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//  修改购物车商品选中状态（修改购物车商品选中接口）
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqCheckCart=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码
// /api/user/passport/sendCode/{phone}  get
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册用户
// /api/user/passport/register  post
export const reqRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'});

// 用户登录
// /api/user/passport/login  post
export const reqLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'});

// token验证（获取用户信息）
// /api/user/passport/auth/getUserInfo  get
export const reqGetUserInfo=()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});

// 退出登录
// /api/user/passport/logout  get
export const reqLogout=()=>requests({url:`/user/passport/logout`,method:'get'});

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList  get
export const reqGetUserAddressList=()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});

// 获取用户订单交易信息
// /api/order/auth/trade  get
export const reqGetTrade=()=>requests({url:`/order/auth/trade`,method:'get'});

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId}  get
export const reqGetCreateNative=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// 查询支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqQueryPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

// 获取我的订单列表
// /api/order/auth/{page}/{limit}  get
export const reqGetMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});