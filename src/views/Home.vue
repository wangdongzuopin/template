<template>
  <div class="home">
    <Go :item="item" v-if="ishow"></Go>
    <Title></Title>
    <div class="main-font">
      <img src="../assets/img/font1.png" alt="">
    </div>
  </div>
</template>

<script>
import Go from '@/components/go.vue'
import Back from '@/components/back.vue'
import Title from '@/components/title.vue'
export default {
  data(){
    return{
       item:'two',
       ishow:true
    }
  },
  components: {
    Back,Go,Title
  },
  methods: {
   
  },
  mounted(){
    setTimeout(() => {
      this.ishow = true
    }, 5000);
  }
};
</script>

<style>
</style>