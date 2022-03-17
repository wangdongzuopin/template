<template>
  <div class="wapper-tab">
    <div v-for="item in tabdata" :key="item.id" @click="handleClick(item)">
      <img :src="item.img" alt="">
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
import { tabdata } from "@/until/data/tabber.js";
export default {
  data() {
    return {
      tabdata,
    };
  },
  methods: {
    handleClick(item) {
      setTimeout(() => {
        this.$router.push({
          path:item.path
        });
        document.title = item.name
      }, 300);
    }
  },
   
};
</script>

<style lang="scss" scoped>
img{
  width: 58px;
  height: 43px;
}
</style>