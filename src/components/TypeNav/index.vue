<template>
  <div class="type-nav">
    <div class="container" @mouseenter="showList" @mouseleave="hiddenList">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              :class="{ cur: selectIndex == index }"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="changeIndex(index)"
            >
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" v-show="selectIndex == index">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      selectIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕后向服务器发送请求
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
    // console.log(this.$route);
  },
  computed: {
    // 对象写法
    // ...mapState({
    //     categoryList:state=>state.home.categoryList
    // })
    // 数组写法
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    // 改变鼠标选中元素下标
    // changeIndex(index){
    //     this.selectIndex=index;
    //     console.log(index);
    // },
    changeIndex: throttle(function (index) {
      this.selectIndex = index;
      // console.log(index);
    }, 50),
    // 路由跳转
    goSearch(event) {
      /* 
            使用方法为编程式导航+事件委派
            存在问题：1.事件委派是把全部的子节点的事件委派给父节点，
            而需求为点到a标签的时候才会跳转，因此需要确定点击元素为a标签            
            2.需要区分点击的a标签为一级二级三级标签
             */
      // 获取当前触发事件的节点
      let node = event.target;
      // dataset属性可以获取节点的自定义属性和属性值，结构赋值
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      // 如果拥有categoryname属性，则一定是a标签
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name:'search' };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        // 如果有params参数则带上
        if(this.$route.params){
          location.params=this.$route.params;
        }
        // console.log(location);
        this.$router.push(location);
      }
    },
    // 鼠标移入指定区域显示三级联动
    showList() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    hiddenList() {
      // 重置鼠标选中元素下标
      this.selectIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 471px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
    //   overflow: hidden;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态
    .sort-enter{
        opacity: 0;
    }
    // 过渡动画结束状态
    .sort-enter-to{
        opacity: 1;
    }
    // 定义动画时间，速率
    .sort-enter-active{
        transition: all .3s linear;
    }
  }
}
</style>