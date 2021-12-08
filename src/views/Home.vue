<template>
  <div class="home">
    <div class="aa">长按保存图片,可分享朋友圈</div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: "two",
      ishow: true,
    };
  },
  components: { },
  methods: {},
  mounted() {
    setTimeout(() => {
      this.ishow = true;
    }, 5000);
  },
};
</script>

<style>
.aa {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #62c3b2;
}
</style>