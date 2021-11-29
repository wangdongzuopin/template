<template>
  <div class="back-img">
    <div><img src="../assets/img/GAMA@2x.png" alt="" /></div>
    <div><img src="../assets/img/hanssen.png" alt="" /></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.back-img {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  > div {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  > div:first-child {
    width: 96px;
    height: 39px;
    margin: 5px 0 0 0;
  }
  > div:last-child {
    width: 96px;
    height: 39px;
  }
}
</style>