<template>
  <div>
    <van-swipe
      class="my-swipe"
      :height="143"
      :autoplay="3000"
      indicator-color="#233B89"
      v-if="bannerlist.length > 0"
    >
      <van-swipe-item v-for="item in bannerlist" :key="item.pcid">
        <van-image width="100%" height="100%" :src="item.pcpicurl" />
      </van-swipe-item>
    </van-swipe>
    <van-skeleton title :row="3"  v-if="bannerlist.length == 0"/>
  </div>
</template>

<script>
export default {
  props:{
    bannerlist:{
      type:Array,
      default:[]
    }
  }
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  border-radius: 6px;
}
</style>