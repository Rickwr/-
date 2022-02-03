<template>
  <div class="spec-preview">
    <!-- vue请求是异步的，当页面刚开始渲染时没有拿到这个值所以会报错，
    而当渲染完成之后，请求已经完成，拿到值了，所以会出现页面正常显示而开发者工具会报错 -->
    <!-- 第一种方法 -->
    <img v-if="skuImageList" :src="skuImageList&&skuImageList[imgIndex].imgUrl" />
    <!-- 第二种方法 -->
    <!-- <img :src="skuImageList&&skuImageList[0].imgUrl" /> -->
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img v-if="skuImageList" :src="skuImageList&&skuImageList[imgIndex].imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        // 当前图片索引值
        imgIndex:0
      }
    },
    props:['skuImageList'],
    mounted() {
      this.$bus.$on('changeImg',(index)=>{
        this.imgIndex=index;
      })
    },
    methods: {
      handler(event){
        // 捕获mask元素
        let mask=this.$refs.mask;
        let big=this.$refs.big;

        // mask元素坐标
        let left=event.offsetX-(mask.offsetWidth/2);
        let top=event.offsetY-(mask.offsetHeight/2);
        // mask左上范围
        if(left<0)left=0;
        if(top<0)top=0;
        if(left>mask.offsetWidth)left=mask.offsetWidth;
        if(top>mask.offsetHeight)top=mask.offsetHeight;
        // 修改元素的left，top值
        mask.style.left=left+"px";
        mask.style.top=top+"px";
        // 修改大图的left,top值
         big.style.left=left*-2+"px";
        big.style.top=top*-2+"px";
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>