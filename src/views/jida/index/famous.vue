<template>
  <div>
    <v-search
      :isFixed="isFixed"
      color="#f3f3f3"
      :disabled="false"
    ></v-search>

    <!-- tab -->
    <div class="wapper-content">
      <van-tabs
        animated
        v-model="active"
        swipeable
        line-width="0px"
        color="#233B89"
        title-active-color="#233B89"
        title-inactive-color="#000000"
      >
        <van-tab v-for="item in disease" :title="item.name" :key="item.id">
          <div class="wapper-item wapper-re-list">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <v-article :data="list"></v-article>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search";
import { mixin } from "@/until/mixin.js";
import Article from "@/components/article";
import { disease } from "@/until/data/disease";
export default {
  mixins: [mixin], //混入文件
  components: {
    "v-search": Search,
    "v-article": Article,
  },
  data() {
    return {
      isFixed: false,
      disease,
      active: 0,
      list: [1, 2, 3, 4, 5],
      loading: false,
      finished: false,
    };
  },
  methods: {
    // scrollSearch(isFixed) {
    //   this.isFixed = isFixed;
    // },
    onLoad() {
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
          this.finished = true;
      //   }
      // }, 1000);
    },
  },
};
</script>
<style lang="scss">
.wapper-v-search {
  // padding-top: 20px;
}
// 内容
.wapper-item {
  padding: 0 18px;
  margin-top: 10px;
  height: 100%;
}
.wapper-content {
  margin-top: 27px;
}
.van-tab--active {
  font-size: 16px !important;
}
</style>