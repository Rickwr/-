<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shopCart,index) in cartInfoList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="shopCart.isChecked" @change="checkCart(shopCart.skuId,shopCart.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl">
            <div class="item-msg">{{shopCart.skuName}}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{shopCart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus',-1,shopCart)">-</a>
            <input autocomplete="off" type="text" :value="shopCart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,shopCart)">
            <a class="plus" @click="handler('add',1,shopCart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{shopCart.skuPrice*shopCart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(shopCart)">删除</a>
            <br>
            <a >移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @change="changeAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import throttle from "lodash/throttle";

  export default {
    name: 'ShopCart',
    mounted() {
      this.getData();
    },
    methods: {
      getData(){
      this.$store.dispatch('shopcart/getShopCartList');
      },
      // 修改商品数量(节流)
      handler:throttle(async function(type,disNum,shopCart){
        // type：区分三个标签事件
        // disNum：+1  -1  input输入的数量（非最终值）
        // skuNum：商品id
        switch (type) {
          case "minus":
            // 商品数量大于1时才能-1
            if(shopCart.skuNum>1){
              disNum=-1;
            }else{
              // 商品数量小于等于1，不变
              // disNum=0;
              // 直接结束函数
              return;
            }
            // disNum=shopCart.skuNum>1?-1:0;
            break;
          case "add":
            if(shopCart.skuNum>199){
              alert("最多只能买200件哦");
              return;
            }
            disNum=1;
            break;
          case "change":
            // 用户输入的数量为非法值（不为数字或为负数）
            if(isNaN(disNum)||disNum<1){
              disNum=0;
            }else if(disNum>200){
              disNum=0;
              alert("最多只能买200件哦");
            }else{
              disNum=parseInt(disNum)-shopCart.skuNum;
            }
            break;
          default:
            break;
        }
        try {
          // 修改成功
        await this.$store.dispatch('detail/reqUpdateCartList',{skuId:shopCart.skuId,skuNum:disNum});
        // 再一次获取服务器的数据
          this.getData();
        } catch (error) {
          
        }
      },1000),
      // 删除单个商品
      async deleteCart(shopCart){
        try {
          // 派发actions
          await this.$store.dispatch('shopcart/deleteCart',shopCart.skuId);
          // 再次获取数据
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
      // 改变商品选中状态
      async checkCart(skuId,isChecked){
        // 老师方法event获取
        // 我的直接isCHecked取反
        isChecked=isChecked?0:1;
        try {
        await this.$store.dispatch('shopcart/checkCart',{skuId:skuId,isChecked:isChecked});
        this.getData();
        } catch (error) {
          
        }
      },
      // 删除全部选中商品
      async deleteAllCheckedCart(){
        try {
          await this.$store.dispatch('shopcart/deleteAllCheckedCart');
          this.getData();     
        } catch (error) {
          alert(error.message);
        }
      },
      // 修改全部商品选中状态
      async changeAllCartChecked(event){
        // 获取全部input选中状态
        let isChecked=event.target.checked?1:0;
        try {
                  // 派发action
        await this.$store.dispatch('shopcart/changeAllCartChecked',isChecked);
        this.getData();
        } catch (error) {
          alert(error.message);
        }

      }
    },
    computed: {
      ...mapGetters('shopcart',['shopCartList']),
      cartInfoList(){
        return this.shopCartList.cartInfoList||[]
      },
      // 选中商品总价
      totalPrice(){
        let sum=0;
        // 遍历数组元素，当元素isChecked=1即选中才计入总价
        this.cartInfoList.forEach(item => {
          if(item.isChecked){
            sum+=item.skuPrice*item.skuNum;
          }
        });
        return sum;
      },
      isAllChecked(){
        // 遍历数组里面元素，只要有一个不为1则为假
        return this.cartInfoList.every(item=>item.isChecked==1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          // .cart-list-con3 {
          //   width: 20.8333%;

          //   .item-txt {
          //     text-align: center;
          //   }
          // }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 12px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>