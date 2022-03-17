<template>
  <div class="forum-class" v-show="false">
    <div
      class="forum-classlist"
      v-for="(item, index) in classfly"
      :key="index"
      @click="handleClick(item, index)"
      :class="{ curclassname: curclassIndex === index }"
    >
      <div>{{ item.classname }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["classfly", "unload"],
  data() {
    return {
      curclassIndex: 0,
    };
  },
  methods: {
    handleClick(a, b) {
      if (this.curclassIndex === b) {
        return;
      }
      this.curclassIndex = b;
      var str = { ...a };
      if (this.unload) {
        this.$emit("getcurClass", str);
      } else {
        if (str.id === "82") {
          str.id = "";
          this.$emit("getcurClass", str);
          return
        }
        this.$emit("getcurClass", str);
      }
    },
  },
  mounted() {
    if (this.unload) {
      this.$emit("getcurClass", this.classfly[0]);
    }
  },
};
</script>

<style>
</style>