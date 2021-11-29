<template>
  <div class="trans">
    <div><i  @click="gogo" class="el-icon-d-arrow-left"></i></div>
  </div>
</template>

<script>
export default {
  props:['item','stop'],
  methods:{
    gogo(){
      if(this.stop){return}
      this.$router.push({ name: this.item });
    }
  }
};
</script>

<style lang="less" scoped>
.trans {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  z-index: 1000;
  >div{
    animation: rotate 1s linear infinite;
  }
}
i {
  font-size: 50px;
  color: #FFFFFF;
   transform: rotate(-90deg);
}
@keyframes rotate {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(20px) scale(1.05, 0.95);
  }
  75% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>