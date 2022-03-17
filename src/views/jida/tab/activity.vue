
<template>
  <div class="Forum wapper-home activity" style="height: 100%">
    <!-- 标题 -->
    <v-title></v-title>
    <!-- 搜索 -->
    <div class="wapper-home-search" v-if="list.length !== 0">
      <v-search
        @click.native="handleSearch('home')"
        class="wapper-v-search"
        color="#FFFFFF"
        :disabled="true"
        :poid="this.$store.state.position.activity"
      ></v-search>
    </div>
    <!-- <v-classname @getcurClass="getcurClass"></v-classname> -->
    <div class="wapper-home-banner ac-banner" v-if="list.length !== 0">
      <v-banner :bannerlist="bannerlist"></v-banner>
    </div>
    <div class="list-active" v-if="list.length !== 0">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="list.length === 0 ? '' : '没有更多了'"
        @load="onLoad"
      >
        <div class="active-content" v-for="(item,index) in list" :key="index">
          <div class="active-img">
             <van-image  :src="item.pcpicurl">
            <template v-slot:error>
              <van-icon  name="user-o" />
            </template>
          </van-image>
          </div>
          <div class="active-header">
            <div class="ac-title">骨质疏松的药物治疗活动</div>
            <div class="ac-time">活动时间：2020年2月26日16：00</div>
            <div class="ac-person">专家：李好人</div>
          </div>
          <div class="active-icon">
           <van-icon :name="require('@/assets/img/index/h2.png')" /><div>直播中</div>
          </div>
        </div>
      </van-list>
      <van-skeleton title :row="3" v-if="list.length === 0 && finished" />
    </div>
    <van-empty
      :image="require('@/assets/img/index/h1.png')"
      v-if="list.length === 0 || bannerlist.length === 0"
    />
  </div>
</template>

<script>
// 活动专区
import Search from "@/components/search";
import Title from "@/components/title";
import ClassName from "@/components/classname";
import Article from "@/components/article";
import { getpositionData } from "@/until/api/index";
import Banner from "@/components/banner";
export default {
  data() {
    return {
      form: {
        page: 1,
        limit: 20,
        poid: this.$store.state.position.activity,
      },
      bannerform: {
        page: 1,
        limit: 20,
        poid: this.$store.state.position.activitybanner,
      },
      bannerlist: [],
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
    "v-banner": Banner,
  },
  methods: {
    handleSearch() {},
    // 选择分类回调
    getcurClass(item) {
    },
    onLoad() {
      getpositionData(this.form).then((res) => {
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= res.data.total) {
          this.finished = true;
        }
        this.form.page++;
        this.list = this.list.concat(res.data.items);
      });
    },

    getacbanner() {
      getpositionData(this.bannerform).then((res) => {
        this.bannerlist = res.data.items;
      });
    },
  },
  created() {
    this.getacbanner();
  },
};
</script>

