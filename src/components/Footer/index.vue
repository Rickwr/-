<template>
  <!-- footer底部模块 start -->
    <footer class="footer" v-show="!$route.meta.isFooter">
        <div class="w">
            <div class="mod_service">
                <ul>
                    <li>
                        <h5></h5>
                        <div>
                            <h4>正品保障</h4>
                            <p>正品保障，提供发票</p>
                        </div>
                    </li>
                    <li>
                        <h5 class="icon2"></h5>
                        <div>
                            <h4>极速物流</h4>
                            <p>极速物流，急速送达</p>
                        </div>
                    </li>
                    <li>
                        <h5 class="icon3"></h5>
                        <div>
                            <h4>无忧售后</h4>
                            <p>7天无理由退换货</p>
                        </div>
                    </li>
                    <li>
                        <h5 class="icon4"></h5>
                        <div>
                            <h4>特色服务</h4>
                            <p>私人订制家电套餐</p>
                        </div>
                    </li>
                    <li>
                        <h5 class="icon5"></h5>
                        <div>
                            <h4>帮助中心</h4>
                            <p>您的购物指南</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="mod_help">
                <dl>
                    <dt>购物指南</dt>
                    <dd><a href="#">购物流程</a></dd>
                    <dd><a href="#">会员介绍</a></dd>
                    <dd><a href="#">生活旅行/团购</a></dd>
                    <dd><a href="#">常见问题</a></dd>
                    <dd><a href="#">大家电</a></dd>
                    <dd><a href="#">联系客服</a></dd>
                </dl>
                <dl>

                    <dt>配送方式</dt>
                    <dd><a href="#">上门自提</a></dd>
                    <dd><a href="#">211限时达</a></dd>
                    <dd><a href="#">配送服务查询</a></dd>
                    <dd><a href="#">配送费收取标准</a></dd>
                    <dd><a href="#">海外配送</a></dd>
                </dl>
                <dl>
                    <dt>支付方式</dt>
                    <dd><a href="#">货到付款</a></dd>
                    <dd><a href="#">在线支付</a></dd>
                    <dd><a href="#">分期付款</a></dd>
                    <dd><a href="#">邮局汇款</a></dd>
                    <dd><a href="#">公司转账</a></dd>
                </dl>
                <dl>
                    <dt>售后服务</dt>
                    <dd><a href="#">售后政策</a></dd>
                    <dd><a href="#">价格保护</a></dd>
                    <dd><a href="#">退款说明</a></dd>
                    <dd><a href="#">返修/退换货</a></dd>
                    <dd><a href="#">取消订单</a></dd>
                </dl>
                <dl>
                    <dt>特色服务</dt>
                    <dd><a href="#">夺宝岛</a></dd>
                    <dd><a href="#">DIY装机</a></dd>
                    <dd><a href="#">延保服务</a></dd>
                    <dd><a href="#">品优购E卡</a></dd>
                    <dd><a href="#">品优购通信 </a></dd>
                </dl>
                <dl>
                    <dt>帮助中心</dt>
                    <dd>
                        <img src="./images/wx_cz.jpg" alt="">
                        品优购客户端
                    </dd>
                </dl>
            </div>
            <div class="mod_copyright">
                <div class="links">
                    <a href="#">关于我们</a>|
                    <a href="#">联系我们</a>|
                    <a href="#">联系客服</a>|
                    <a href="#">商家入驻</a>|
                    <a href="#">营销中心</a>|
                    <a href="#">手机品优购</a>|
                    <a href="#">友情链接</a>|
                    <a href="#">销售联盟</a>|
                    <a href="#">品优购社区</a>|
                    <a href="#">品优购公益</a>|
                    <a href="#">English Site</a>|
                    <a href="#">Contact U</a>
                </div>
                <div class="copyright">
                    地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096 电话：400-618-4000 传真：010-82935100 邮箱: zhanghj+itcast.cn<br />
                    京&nbsp;ICP&nbsp;备&nbsp;08001421&nbsp;号京公网安备&nbsp;110108007702
                </div>

            </div>
        </div>
    </footer>
    <!-- footer底部模块 end -->
</template>

<script>
export default {
    name:'Footer',
    mounted() {
        // console.log(this);
    }   
    
}
</script>

<style scoped>
/* footer底部模块 start */
.footer {
    height: 417px;
    padding-top: 30px;
    background-color: #f5f5f5;
}
.mod_service {
    height: 80px;
    border-bottom: 1px solid #ededed;
}
.mod_service ul li {
    float: left;
    width: calc(100% / 5);
    height: 50px;
    padding-left: 35px;
}
.mod_service ul li h5 {
    float: left;
    display: block;
    width: 50px;
    height: 50px;
    margin-right: 6px;
    background: url(~@/assets/images/icons.png) no-repeat -252px -2px;
}
.mod_service ul li .icon2 {
    background-position-x: -255px;
    background-position-y: -53px;
}
.mod_service ul li .icon3 {
    background-position-x: -256px;
    background-position-y: -105px;
}
.mod_service ul li .icon4 {
    background-position-x: -257px;
    background-position-y: -156px;
}
.mod_service ul li .icon5 {
    background-position-x: -258px;
    background-position-y: -208px;
}
.mod_service ul li h4 {
    margin-top: 5px;
    font-size: 14px;
    color: #333;
}
.mod_service ul li p{
    margin-top: 3px;
    font-size: 12px;
    color: #666;
}
.mod_help {
    height: 188px;
    border: 1px solid #ededed;
    padding-top: 20px;
    padding-left: 50px;
}
.mod_help dl {
    float: left;
    width: 195px;
}
.mod_help dl:last-child {
    width: 90px;
    text-align: center;
    margin-left: -15px;
}
.mod_help dl dt {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
}
.mod_help dl dd {
    margin-bottom: 5px;
}
.mod_help dl dd a {
    font-size: 12px;
    color: #333;
}
.mod_copyright {
    text-align: center;
    padding-top: 20px;
}
.links {
    margin-bottom: 15px;
}
.links a {
    margin: 0 10px;
}
.copyright {
    line-height: 20px;
}
/* footer底部模块 end */

</style>