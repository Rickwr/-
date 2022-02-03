<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'app',
  components: {
    Header,
    Footer
  },
  mounted(){
    this.$store.dispatch("home/getCategoryList");
  }
}
</script>
<style>
/* 所有标签内外边距清零 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}
/* em和i斜体文字不倾斜 */
em,
i {
    font-style: normal
}
/* 去掉li小圆点 */
li {
    list-style: none
}

img {
    /* border 0照顾低版本浏览器 如果图片外面包含了链接会有边框的问题 */
    border: 0;
    /* 取消图片底侧有空白缝隙的问题 */
    vertical-align: middle
}

button {
    /* 鼠标经过button按钮时鼠标变成小手 */
    cursor: pointer
}
/* a链接字体颜色和去掉装饰线 */
a {
    color: #666;
    text-decoration: none
}
/* 鼠标经过a链接时的字体颜色 */
a:hover {
    color: #c81623
}
/* 按钮和input表单的字体 */
button,
input {
    font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
    border: none;
    outline: none;

}
/* 字体大小12px,行高是字体大小1.5倍 */
body {
    /* css3属性抗锯齿性，让文字显示得更加清晰（文字放大有锯齿） */
    -webkit-font-smoothing: antialiased;
    background-color: #fff;
    font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
    color: #666
}
/* 此类类名元素隐藏 */
.hide,
.none {
    display: none
}
/* 清除浮动 */
.clearfix:after {
    visibility: hidden;
    clear: both;
    display: block;
    content: ".";
    height: 0
}

.clearfix {
    *zoom: 1
}
</style>
