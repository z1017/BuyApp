<template>
  <div>
    <h2>params参数：{{ $route.params.keyWord }}</h2>
    <h2>params参数：{{ $route.query.k }}</h2>
  </div>
</template>

<script>
export default {
  name: "searchIndex",
  data() {
    return {
      // keyWord:''
    }
  },
};
</script>

<style>
</style>