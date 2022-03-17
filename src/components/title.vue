<template>
  <div class="Usercenter" @click="hadnleclick">
    <van-image width="143px" height="30px" :src="require('@/assets/img/index/i13.png')" />
  </div>
</template>

<script>
export default {
  methods:{
    hadnleclick(){
      this.$toast("清除缓存成功");
      localStorage.clear()
    }
  }
};
</script>

<style lang="scss" scoped>
.Usercenter {
  width: 375px;
  height: 54px;
  background: #233b89;
  border: 1px solid #233b89;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  >div:last-child{
      margin-left: 10px;
  }
}
</style>