<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imageUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Carsousel",
  props: ["list"],

  watch: {
    list: {
      //立即监听：不管数据有无变化，上来立即监听一次
      // 为什么watch监听不到list: 因为这个数据从来没有发生变化（数据是父亲给的。父亲给的时候就是一个对象，对象里面该有的数据都是有的）
      immediate: true,
      handler() { 
        // 只能监听到数据已经有了，但是v-for 动态渲染结构还是没有办法确定，因此还是需要nextTick
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          let mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>