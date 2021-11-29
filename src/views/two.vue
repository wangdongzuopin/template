<template>
  <div class="home">
    <Back></Back>
    <Title></Title>
    <!-- <Go :item="item"></Go> -->
    <div class="two-main">
      <div class="yuan">
        <img src="../assets/img/yuan.png" alt="" />
        <div class="font">等待每一个小伙伴的到来</div>
      </div>

      <div class="btn" @click="btn">
        <img src="../assets/img/click.png" alt="" />
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
      item: "three",
    };
  },
  components: {
    Back,
    Go,
    Title,
  },
  methods: {
    btn() {
      this.$router.push({ name: this.item });
    },
  },
};
</script>

<style>
</style>