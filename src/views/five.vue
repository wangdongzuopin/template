<template>
  <div class="home five">
    <Title></Title>
    <Back></Back>
    <div class="five-content">
      <div class="title animate__animated animate__zoomIn">
        <img src="../assets/img/fiveTitle.png" alt="">
      </div>
      <div class="content-btn animate__animated animate__zoomIn">
        <div @click="handleTo(1)"><img src="../assets/img/t1.png" alt=""></div>
        <div @click="handleTo(2)"><img src="../assets/img/t2.png" alt=""></div>
        <div @click="handleTo(3)"><img src="../assets/img/t3.png" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from "@/components/back.vue";
import Title from "@/components/title.vue";
export default {
  name: "home",
  data(){
    return{
      item:'six'
    }
  },
  components: { Back, Title },
  methods:{
    handleTo(item){
      switch(item){
        case 1:
          this.$router.push({ name: this.item});
      }
    }
  }
};
</script>
<style lang="less" scoped>
#app,
.home {
  background-image: url("../assets/img/fiveback.png") !important;
  background-size: 100% 100%;
  overflow: hidden;
}
</style>