<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <v-navbar v-show="$route.meta.showFooter"></v-navbar>
    <v-popup :popupshow="popupshow"></v-popup>
  </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";
import Popup from "@/components/popup";
import wxcomponents from "@/componentoperation/wauth2";
import { getwxready } from "@/componentoperation/wxShare";

export default {
  components: {
    "v-navbar": NavBar,
    "v-popup": Popup,
  },
  data() {
    return {
      params: {},
    };
  },
  computed: {
    popupshow() {
      return this.$store.state.ispopupshow;
    },
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
  created() {
    this.isWeiXin();
    this.$store.dispatch("isUsercode").then((res) => {
      const sharedata = {
        title: "积大健康学苑",
        desc: "欢迎加入积大慢病学院",
        link: this.$store.state.admon,
        imgUrl: "",
      };
      getwxready(sharedata);
      WeixinJSBridge.call("showToolbar");
    });
  },
  watch: {
    $route(to, from) {
      //将不想有过渡动画效果的部分路由写进判断条件中
      if (
        (to.path !== "/" && to.path !== "/" && to.path !== "/") ||
        (from.path !== "/" && from.path !== "/" && from.path !== "/")
      ) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index < from.meta.index) {
          //设置动画名称
          this.transitionName = "slide-left";
        } else if (to.meta.index > from.meta.index) {
          this.transitionName = "slide-right";
        } else if (to.meta.index == 99) {
          this.transitionName = "";
        }
      } else {
        this.transitionName = "";
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





