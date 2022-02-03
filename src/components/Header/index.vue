<template>
  <div>
       <!-- 快捷导航模块 start -->
    <section class="shortcut">
        <div class="w">
            <div class="fl">
                <ul>
                    <li>品优购欢迎您！&nbsp;</li>
                    <li v-if="!userName">
                        <router-link to="/login">请登录&nbsp;</router-link>
                        <router-link to="/register" class="style_red">免费注册</router-link>
                    </li>
                    <li v-else>
                        <a>{{userName}}</a>
                        <a class="style_red" @click="userLogout">退出登录</a>
                    </li>
                </ul>
            </div>
            <div class="fr">
                <ul>
                    <li><router-link to="/center/myorder">我的订单</router-link></li>
                    <li class="spacer"></li>
                    <li class="arrow-icon">我的品优购</li>
                    <li class="spacer"></li>
                    <li>品优购会员</li>
                    <li class="spacer"></li>
                    <li>企业采购</li>
                    <li class="spacer"></li>
                    <li class="arrow-icon">关注品优购</li>
                    <li class="spacer"></li>
                    <li class="arrow-icon">客户服务</li>
                    <li class="spacer"></li>
                    <li class="arrow-icon">网站导航</li>
                </ul>
            </div>
        </div>
    </section>
    <!-- 快捷导航模块 end -->

    <!-- header头部模块 start -->
    <header class="header w">
        <!-- logo -->
        <div class="logo">
            <h1>
                <router-link to="/home">品优购商城</router-link>
            </h1>
        </div>
        <!-- search -->
        <div class="search">
            <input type="search" placeholder="语言开发" v-model="keyword">
            <button @click="goSearch">搜索</button>
        </div>
        <!-- hotwords -->
        <div class="hotwords">
            <a class="style_red" href="#">优惠购首发</a>
            <a href="#">亿元优惠</a>
            <a href="#">9.9元团购</a>
            <a href="#">每满99减30</a>
            <a href="#">办公用品</a>
            <a href="#">电脑</a>
            <a href="#">通信 </a>
        </div>
        <!-- 购物车 -->
        <div class="shopcar" @click="goShopCart">
            我的购物车
            <i class="count">{{cartInfoList.length}}</i>
        </div>
    </header>
    <!-- header头部模块 end -->
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
export default {
    name:'Header',
    data() {
        return {
            keyword:""
        }
    },
    methods: {
        // 搜索
        goSearch(){
            let location={name:'search',params:{keyword:this.keyword||undefined}};
            if(this.$route.query){
                location.query=this.$route.query;
            }
            this.$router.push(location)
        },
        // 购物车
        goShopCart(){
            this.$router.push('/shopcart');
        },
        // 退出登录
        async userLogout(){
            // 退出登录需要做的事情
            // 1.发请求，通知服务器退出登录（清除一些数据如token）
            // 2.清除前台中的数据（userInfo,token）
            try {
            await this.$store.dispatch('user/userLogout');
                // 如果成功退出登录，需要跳转到首页游客浏览
                this.$router.push('/home');
            } catch (error) {
                alert(error.message);
            }

        }
    },
    mounted () {
        // 全局事件总线清除input框内容
        this.$bus.$on("clear",()=>{
            this.keyword=""
        })
    },
    computed: {
        ...mapGetters('shopcart',['shopCartList']),
        cartInfoList(){
        return this.shopCartList.cartInfoList||[]
      },
    //   用户名信息
    userName(){
        return this.$store.state.user.userInfo.name;
    }
    }
}
</script>

<style scoped>
/* 声明字体图标 */
@font-face {
    font-family: "iconfont"; /* Project id 2688874 */
    src: url('../../assets/iconfont.woff2') format('woff2'),
         url('../../assets/iconfont.woff') format('woff'),
         url('../../assets/iconfont.ttf') format('truetype');
  }
/* 版心 */
.w {
    width: 1200px;
    margin: 0 auto;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.style_red {
    color: #c81623;
}
/* 快捷导航模块 start */
.shortcut {
    height: 31px;
    line-height: 31px;
    background-color: #f1f1f1;
}
.shortcut ul li {
    float: left;
}
/* 快捷导航里面的竖线样式 */
.shortcut .fr ul li:nth-child(even) {
    width: 1px;
    height: 12px;
    background-color: #666;
    margin: 9px 15px 0;
}
.arrow-icon::after {
    content: "\e638";
    font-family: "iconfont";
    margin-left: 6px;
}
/* 快捷导航模块 end */
/* header头部模块 start */
.header {
    position: relative;
    height: 106px;
}
.logo {
    position: absolute;
    top: 25px;
    width: 171px;
    height: 61px;
}
.logo a {
    display: block;
    width: 171px;
    height: 61px;
    background: url(./images/logo.png) no-repeat;
    font-size: 0;
}
/* search */
.search {
    position: absolute;
    top: 25px;
    left: 346px;
    width: 538px;
    height: 36px;
    border: 2px solid #b1191a;
}
.search input {
    /* 行内块元素之间有缝隙，所以要浮动 */
    float: left;
    width: 454px;
    height: 32px;
    padding:10px;
}
.search button {
    float: left;
    width: 80px;
    height: 32px;
    background-color:#b1191a;
    font-size: 16px;
    color: #fff;
}
.hotwords {
    position: absolute;
    top: 69px;
    left: 346px;
}
.hotwords a {
    margin: 0 10px;
}
.shopcar {
    position: absolute;
    top: 25px;
    right: 64px;
    width: 140px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border: 1px solid #dfdfdf;
    background-color: #f7f7f7;
}
.shopcar::before {
    content: "\e604";
    font-family: "iconfont";
    color: #da5555;
    margin: 5px;
}
.shopcar::after {
    content: "\e630";
    font-family: "iconfont";
    margin-left: 10px;
}
.shopcar .count {
    position: absolute;
    top:-4px;
    left: 105px;
    height: 14px;
    line-height: 14px;
    color: #fff;
    background-color: #b1191a;
    padding: 0 5px;
    border-radius: 7px 7px 7px 0;
}
/* header头部模块 end */
</style>