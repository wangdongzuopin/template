
<template>
  <!-- 搜索 -->
  <div class="wapper-search" :class="{ 'wapper-istop': isFixed }">
    <div
      class="wapper-s-item"
      :style="{ background: color }"
      @click="handleroute"
    >
      <div class="wapper-icon">
        <!-- <van-image :src="require('@/assets/img/index/a2.png')" /> -->
        <van-icon
          size="17"
          :name="require('@/assets/img/index/s1.png')"
          :color="color == '#FFFFFF' ? '#273C8F' : '#505050'"
        />
      </div>
      <div class="wapper-input">
        <!-- <input
          type="text"
          v-model="model"
          placeholder="输入关键词搜索"
          :disabled="disabled"
          :class="{ colorF: color == '#FFFFFF', colorD: color == '#f3f3f3' }"
          :style="{ background: color }"
        /> -->
        <input
          type="text"
          v-model="model"
          placeholder="输入关键词搜索"
          :class="{ colorF: color == '#FFFFFF', colorD: color == '#f3f3f3' }"
          :style="{ background: color }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isFixed: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#FFFFFF",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    poid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      model: "",
    };
  },
  methods: {
    handleroute() {
      this.$router.push({ path: "/search?id=" + this.poid });
    }
  },
};
</script>
<style lang="scss" scoped>
.colorF::-webkit-input-placeholder {
  color: #273c8f;
}
.colorD::-webkit-input-placeholder {
  color: #505050;
}
</style>