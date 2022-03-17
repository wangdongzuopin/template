<template>
  <div class="wapper-home">
    <!-- 标题 -->
    <v-title></v-title>
    <!-- 搜索 -->
    <div class="wapper-home-search">
      <v-search
        class="wapper-v-search"
        color="#F3F3F3 "
        :disabled="true"
      ></v-search>
    </div>
    <!-- banner -->
    <div class="wapper-home-banner">
      <v-banner :bannerlist="bannerlist"></v-banner>
    </div>
    <!-- 内容 -->
    <div class="wapper-content">
      <v-tabber></v-tabber>
      <div class="wapper-recommend">
        <div class="title">推荐</div>
        <div class="wapper-re-list">
          <v-article
            v-for="(item, index) in recommenlist"
            :key="index"
            :form="item"
          ></v-article>
        </div>
        <van-skeleton title :row="3" v-if="recommenlist.length === 0" />
      </div>
    </div>
  </div>
</template>

<script>
import Tabber from "@/components/tabber";
import Search from "@/components/search";
import Article from "@/components/article";
import Title from "@/components/title";
import Banner from "@/components/banner";
import { getpositionData } from "@/until/api/index";
export default {
  components: {
    "v-search": Search,
    "v-tabber": Tabber,
    "v-article": Article,
    "v-title": Title,
    "v-banner": Banner,
  },
  data() {
    return {
      getrecommenform: {
        page: 1,
        limit: 20,
        poid: this.$store.state.position.recommendid,
      },
      recommenlist: [],
      bannerlist: [],
      bannerform: {
        page: 1,
        limit: 20,
        poid: this.$store.state.position.bannerid,
      },
    };
  },

  methods: {
    handleSearch(item) {
      this.$router.push({ path: `/search/${item}` });
    },
    // 获取推荐文章列表
    getrecommend() {
      getpositionData(this.getrecommenform).then((res) => {
        this.recommenlist = res.data.items
      });
    },
    // 获取滚动
    getbanner() {
      getpositionData(this.bannerform).then((res) => {
        this.bannerlist = res.data.items;
      });
    },
  },
  created() {
    this.getrecommend();
    this.getbanner();
  },
};
</script>
<style lang="scss" scoped>
</style>
