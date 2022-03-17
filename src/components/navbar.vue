<template>
  <!-- <div class="bottom animate__animated animate__bounceInUp"> -->
  <div class="bottom animate__animated">
    <div
      class="item animate__animated"
      @click="clickItem('/')"
      :class="{
        active: $route.path === '/',
        animate__fadeIn: $route.path === '/',
      }"
    >
      <van-image
        v-show="$route.path === '/'"
        class="navbar-icon"
        :src="require('@/assets/img/navbar/home_active.png')"
      />
      <van-image
        v-show="$route.path !== '/'"
        class="navbar-icon"
        :src="require('@/assets/img/navbar/home.png')"
      />
      <p >首页</p>
    </div>
    <div
      class="item animate__animated"
      @click="clickItem('/my')"
      :class="{
        active: $route.path === '/my',
        animate__fadeIn: $route.path === '/my',
      }"
    >
      <van-image
        v-show="$route.path === '/my'"
        class="navbar-icon"
        :src="require('@/assets/img/navbar/user_active.png')"
      />
      <van-image
        v-show="$route.path !== '/my'"
        class="navbar-icon"
        :src="require('@/assets/img/navbar/user.png')"
      />
      <p>个人中心</p>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "bottom",
  methods: {
    clickItem(path) {
      if (this.$route.path === path) {
        return;
      }
      this.$router.push(path);
    },
  }
};
</script>
 
<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #e9e9e9;
  background-color: #ffffff;
  width: 100%;
  height: 110rpx;
  display: flex;
  justify-content: space-evenly;
  z-index: 999;
}
.item {
  margin: 5px;
  text-align: center;
}
.item p {
  margin: 0;
  font-size: 12px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #7B7B7B;
  text-align: center;
}
.active {
  p{
    color: #233b89;
  }
}
</style>