<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage,index) in skuImageList"
        :key="skuImage.id"
      >
        <img :src="skuImage.imgUrl" :class="{active:activeIndex==index}" @click="changeActive(index)"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      // 选中下标
      activeIndex:0,
    }
  },
  props: ["skuImageList"],
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.mySwiper, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 容器同时显示数量
          slidesPerView: 3,
          // 容器中的元素多少个为一组
          slidesPerGroup: 3,
        });
      });
    },
  },
  methods: {
    changeActive(index){
      // 改变选中下标
      this.activeIndex=index;
      // 全局事件总线向兄弟组件传递索引值
      this.$bus.$emit('changeImg',index);
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>