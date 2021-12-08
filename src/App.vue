<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      params: {},
    };
  },
  methods: {
    jump() {},
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    // 判断是否是微信浏览器
    isWeiXin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == "micromessenger"){
        console.log('是微信浏览器，可以写逻辑了');
      }else{
        console.log('不是微信浏览器，可以写逻辑了');
      }
    },
    // 设置微信接口返回数据
    getwxinfo() {
      let url = window.location.href.split("#")[0];
      this.$api.getSignature(url).then((res) => {
        this.params = res.data;
        console.log(this.params);
        this.setwx();
      });
    },
    // 获取用户信息
    setwx() {
      const { appid, noncestr, signature, timestamp, urlStr } = this.params;
      wx.config({
        debug: true,
        appId: appid,
        timestamp,
        nonceStr: noncestr,
        signature,
        jsApiList: ["updateAppMessageShareData"],
      });
      wx.ready(function () {});
    },
  },
  mounted() {
    this.isWeiXin()
    this.$nextTick(()=>{})
    this.getwxinfo();
  },
};
</script>





