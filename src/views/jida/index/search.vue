<template>
  <div class="search-warp">
    <van-sticky :offset-top="0">
      <form action="/">
        <van-search
          v-model="form.pctitle"
          show-action
          @search="
            onSearch();
            focusshow = false;
          "
          @input="handleSearch"
          placeholder="请输入搜索关键词"
          ref="search"
          @focus="focusshow = true"
        >
          <template #action>
            <div @click="onSearch()">搜索</div>
          </template>

          <template v-slot:input>
            <van-icon width="46px" height="46px" round name="user-o" />
          </template>
        </van-search>
      </form>
    </van-sticky>
    <!-- 历史记录 -->
    <div class="warp-result" v-show="focusshow">
      <div class="title" v-if="list.length > 0">
        <div>搜索记录</div>
        <div @click="clear">
          <van-icon
            v-if="list.length > 0"
            :name="require('@/assets/img/index/s3.png')"
          />
        </div>
      </div>

      <div class="content">
        <div
          class="result-icon"
          v-for="(item, index) in list"
          :key="index"
          size="large"
          type="primary"
          @click="handlehis(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div class="list-active" v-show="!focusshow">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText()"
        @load="onLoad"
      >
        <div class="wapper-re-list">
          <v-article
            v-for="(item, index) in datalist"
            :key="index"
            :form="item"
          ></v-article>
        </div>
      </van-list>
      <!-- <van-skeleton
        title
        :row="3"
        v-if="datalist.length === 0 && !finished && loading"
      /> -->
      <van-empty
        :image="require('@/assets/img/index/s2.png')"
        description="暂未找到搜索内容~"
        v-if="datalist.length === 0 && form.pctitle && !loading"
      />
    </div>
  </div>
</template>

<script>
import { getlcoal, setlcoal, removelcoal } from "@/until/auth";
import _ from "lodash";
import { getPositionContent } from "@/until/api/index";
import Article from "@/components/article";
export default {
  components: {
    "v-article": Article,
  },
  data() {
    return {
      id: "", //路由参数
      list: [], //标签列表数组
      form: {
        page: 1,
        limit: 5,
        pctitle: "", //搜索结果
        poid: "",
      },
      datalist: [],
      loading: false,
      finished: false,
      focusshow: false,
    };
  },
  methods: {
    // 判断结果显示数据
    finishedText() {
      if (this.datalist.length !== 0) {
        return "暂无更多";
      }
      return "";
    },
    // 获取当前路由参数的本地存储
    getlocallist() {
      this.list = getlcoal(this.id);
    },
    handleSearch: _.debounce(function (val) {
      this.form.page = 1;
      this.datalist = [];
      this.form.pctitle = val;
      this.getlist();
    }),
    // 搜索历史
    getlist() {
      getPositionContent(this.form).then((res) => {
        setTimeout(() => {
          // 加载状态结束
          this.loading = false;
          this.form.page++;
          this.datalist = this.datalist.concat(res.data.items);
          // 数据全部加载完成
          if (this.datalist.length >= res.data.total) {
            this.finished = true;
          }
        }, 500);
      });
    },
    onLoad() {
      // if (this.form.pctitle.trim() == "") {
      //   this.loading = false;
      //   return;
      // }
      this.getlist();
    },

    onSearch() {
      // if (this.form.pctitle.trim() == "") {
      //   this.$toast.fail("请输入搜索关键词");
      //   return;
      // }
      if (this.list.includes(this.form.pctitle)) {
      } else {
        if (this.form.pctitle) {
          this.list.push(this.form.pctitle);
          setlcoal(this.id, this.list);
        }
      }
      this.handlehis(this.form.pctitle);
    },
    handlehis(item = "") {
      this.form.pctitle = item || "";
      this.focusshow = false;
      this.form.page = 1;
      this.datalist = [];
      this.getlist();

         // 将 loading 设置为 true，表示处于加载状态
      this.finished = false;
      this.loading = true;
    },
    // 清空结果
    clear() {
      this.$dialog
        .confirm({
          message: "是否清空浏览记录",
        })
        .then(() => {
          this.list = [];
          removelcoal(this.id);
        })
        .catch(() => {
          // on cancel
        });
    },
    close(item) {
      this.list = this.list.filter((res) => res != item);
      setlcoal(this.id, this.list);
    },
  },
  mounted() {
    this.getlocallist();
    this.$route.query.id
      ? (this.form.poid = this.$route.query.id)
      : delete this.form.poid;

    this.$nextTick(() => {
      this.$refs.search.querySelector("input").focus();
    });
  },
};
</script>

<style lang="scss" scoped>
.warp-result {
  .title {
    font-size: 14px;
    font-family: SourceHanSansSC-Regular, SourceHanSansSC;
    font-weight: 400;
    color: #1c1c1c;
    display: flex;
    justify-content: space-between;
  }
  .result-icon {
    height: 28px;
    background: #eeeeee;
    border-radius: 14px;
    padding: 5px 10px;
    font-size: 14px;
    font-family: Helvetica;
    color: #505050;
    margin-right: 20px;
    margin-top: 10px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    > span:first-child {
      margin-left: 0;
    }
    span {
      margin: 10px;
    }
  }
  padding: 0 15px;
  padding-top: 20px;
}
.van-search__content {
  background: #f3f3f3;
  border-radius: 22px;
  border: 1px solid #f3f3f3;
}
.van-search__action {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #b0b0b0;
}
</style>