<template>
  <div class="home six">
    <Back></Back>
    <Title></Title>
    <!-- <Go :item="item"></Go> -->
      <div class="five-content">
      <div class="title animate__animated animate__zoomIn">
        <img src="../../assets/img/fiveTitle.png" alt="">
      </div>
      <div class="content-btn animate__animated animate__zoomIn">
        <div class="six-content">
            <div class="content">12</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Go from "@/components/go.vue";
import Back from "@/components/back.vue";
import Title from "@/components/title.vue";
export default {
  data() {
    return {
    };
  },
  components: {
    Back,
    Go,
    Title,
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
#app,
.home {
  background-image: url("../../assets/img/six-back.png") !important;
  background-size: 100% 100%;
  overflow: hidden;
}
</style>