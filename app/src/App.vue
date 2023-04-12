<template>
  <div>
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
// 引入
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: {
    // KV 一致省略 V
    Header,
    Footer,
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中
    // 派发一个 action，获取商品分类的三级列表
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
