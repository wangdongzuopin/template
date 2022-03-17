
<template>
  <div class="Forum wapper-home" style="height: 100%;">
    <!-- 标题 -->
    <v-title></v-title>
    <!-- 搜索 -->
    <div class="wapper-home-search">
      <v-search
        @click.native="handleSearch('home')"
        class="wapper-v-search"
        color="#F3F3F3 "
        :disabled="true"
        :poid="this.$store.state.position.realinfo"
      ></v-search>
    </div>
    <!-- <v-classname @getcurClass="getcurClass"></v-classname> -->

    <div class="list-active">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="wapper-re-list">
          <v-article
            v-for="(item, index) in list"
            :key="index"
            :form="item"
          ></v-article>
        </div>
      </van-list>
      <!-- <van-skeleton title :row="3" v-if="list.length === 0" /> -->
    </div>
  </div>
</template>

<script>
// 最新资讯
import Search from "@/components/search";
import Title from "@/components/title";
import ClassName from "@/components/classname";
import Article from "@/components/article";
import { getpositionData } from "@/until/api/index";
export default {
  data() {
    return {
      form: {
        page: 1,
        limit: 5,
        poid: this.$store.state.position.realinfo,
      },
      list: [],
      loading: false,
      finished: false,
    };
  },
  components: {
    "v-search": Search,
    "v-title": Title,
    "v-classname": ClassName,
    "v-article": Article,
  },
  methods: {
    handleSearch() {},
    // 选择分类回调
    getcurClass(item) {},
    onLoad() {
      getpositionData(this.form).then((res) => {
        setTimeout(() => {
          // 加载状态结束
          this.loading = false;
          this.form.page++;
          this.list = this.list.concat(res.data.items);
          // 数据全部加载完成
          if (this.list.length >= res.data.total) {
            this.finished = true;
          }
        }, 500);
      });
    },
  },
};
</script>

<style>
</style>