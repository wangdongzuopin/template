<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default { 
  components: {
  },
  data() {
    return {
      params: {},
    };
  },
  computed: {
  },
  methods: {
    // 判断是否是微信浏览器
    isWeiXin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log("是微信浏览器，可以写逻辑了");
      } else {
        console.log("不是微信浏览器，可以写逻辑了");
        // window.location.href = "https://open.weixin.qq.com/";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  .wapper-home {
    height: calc(100% - 60px);
    overflow: auto;
  }
}
</style>





