<template>
  <div class="home four" @click="btn">
    <Back v-show="showicon"></Back>
    <Title></Title>
    <!-- <Go :item="item"></Go> -->

    <div
      class="animate__animated"
      :class="{
        positonImg1: curclass == 'positonImg1',
        positonImg2: curclass == 'positonImg2',
        positonImg3: curclass == 'positonImg3',
      }"
    >
      <img v-if="img" class="imgs" :src="img" alt="">
    </div>

    <div class="showimgs animate__animated" v-show="showicon" :class="{'animate__bounceIn':showicon}">
      <img src="../assets/img/EAMA.png" alt="">
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
      item: "five",
      anclass: ["positonImg1", "positonImg2", "positonImg3"],
      curclass: "",
      img:'',
      showicon:false
    };
  },
  name: "home",
  components: { Back, Go, Title },
  methods: {
    btn() {
      var num = Math.floor(Math.random() * 3);
      this.curclass = this.anclass[num];
      this.timershow()
    },
    timershow(){
      var that = this
      var time = setTimeout(() => {
        this.showicon = true
        clearInterval(time)
        this.img = ''
        // that.gonext()
      }, 3000);
    },
    gonext(){
      setTimeout(() => {
        this.$router.push({ name: this.item});
      }, 1000);
    }
  },
  mounted(){
    if(this.$route.params instanceof Object){
      const {img} = this.$route.params
      if(img){
        this.img = img
        this.btn()
      }else{
        this.showicon = true
      }
    }
  }
};
</script>

<style lang="less" scoped>
#app,
.home {
  background-image: url("../assets/img/fourback.png");
  background-size: 100% 100%;
  overflow: hidden;
}
</style>