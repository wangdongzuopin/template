<template>
  <div class="wapper-my">
    <div class="wapper-center-t1">
      <div class="t1-left">
        <div>
          <van-image width="46px" height="46px" round :src="user.headimgurl">
            <template v-slot:error>
              <van-icon width="46px" height="46px" round name="user-o" />
            </template>
          </van-image>
        </div>
        <div>{{ user.nickname }}</div>
      </div>
      <div class="t1-right">
        <div>
          <van-icon :name="require('@/assets/img/login/u3.png')" size="20px" />
        </div>
        <div @click="handleRouterCenter">编辑资料></div>
      </div>
    </div>

    <div class="wapper-main-t2">
      <van-cell is-link to="myfeedback">
        <template v-slot:title>
          <div class="font">意见反馈</div>
        </template>
        <template v-slot:icon>
          <van-icon :name="require('@/assets/img/login/u2.png')" size="22px" />
        </template>
      </van-cell>
    </div>

    <!-- 我的收藏 -->
    <div class="wapper-main-t3 Collection">
      <div class="Collectiontitle">我的收藏</div>

      <div>
        <v-classname
          :classfly="classfly"
          :unload="false"
          @getcurClass="getcurClass"
        ></v-classname>
      </div>

      <div class="list-active">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="list.length !== 0?'没有更多了':''"
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
        <!-- <van-skeleton title :row="3" v-if="!loading" /> -->
      </div>

      <div v-if="list.length === 0 && finished">
        <van-empty
          :image="require('@/assets/img/login/u1.png')"
          description="暂时没有收藏~"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ClassName from "@/components/classname";
import { classfly } from "@/until/data/disease";
import { getCollectionList } from "@/until/api/index";
import Article from "@/components/article";
export default {
  components: {
    "v-classname": ClassName,
    "v-article": Article,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      classfly,
      form: {
        page: 1,
        limit: 5,
        poid: "",
        usercode: this.$store.state.usercode,
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleRouterCenter() {
      this.$router.push({ path: "/mycenter" });
    },
    onLoad() {
      getCollectionList(this.form).then((res) => {
        // 加载状态结束
        setTimeout(() => {
          this.loading = true;

          this.form.page++;
          this.list = this.list.concat(res.data.items);

          // 数据全部加载完成
          if (this.list.length >= res.data.total) {
            this.finished = true;
          }
        }, 500);
      });
    },
    // 选择分类回调
    getcurClass(item) {
      this.form.poid = item.id;
      this.list = [];
      this.form.page = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
       this.finished = false;
      this.loading = true;
      this.onLoad();
    },
  },
  created(){
    console.log('11');
  }
};
</script>

<style lang="scss" scoped>
#app {
  background: #ececec;
}
.forum-class {
  padding: 0 17px;
}
</style>