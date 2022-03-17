<template>
  <div>
    <div class="comment">
      <div class="comment-f1" :class="{ 'comment-input': isfocus }">
        <div>
          <van-icon size="24" :name="require('@/assets/img/index/d4.png')" />
        </div>
        <div>
          <input
            type="text"
            placeholder="评论"
            v-model="postform.content"
            @keyup.enter="handkesend"
            @focus="isfocus = true"
            @blur="blurEvent"
          />
        </div>
      </div>
      <div class="comment-tabber" v-show="!isInputshow && !isfocus">
        <div @click="handlelikeStatus">
          <van-icon
            size="28"
            v-if="!form.like_status"
            :name="require('@/assets/img/index/d3.png')"
          />
          <van-icon
            size="28"
            v-if="form.like_status"
            :name="require('@/assets/img/index/d3-native.png')"
          />
        </div>
        <div @click="isInputshow = true">
          <van-icon size="28" :name="require('@/assets/img/index/d5.png')" />
        </div>
        <div @click="handleforward">
          <van-icon size="28" :name="require('@/assets/img/index/d2.png')" />
        </div>
      </div>

      <div v-show="isfocus" class="combtn">
        <van-button round type="info" @click="handkesend" color="#233B89"
          >发送</van-button
        >
      </div>
    </div>

    <van-popup
      :close-icon="require('@/assets/img/index/p1.png')"
      v-model="isInputshow"
      position="bottom"
      get-container="body"
      @open="inputblur"
      :style="{ height: comm.inputplocher == '评论' ? '65%' : '40%' }"
    >
      <div class="popcomment">
        <div class="line">
          <div>共{{ comm.total }}条评论</div>
          <div @click="closePopup">
            <van-icon size="24" :name="require('@/assets/img/index/p1.png')" />
          </div>
        </div>
        <div class="pop-content" ref="popscroll">
          <div class="commtent-list">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="
                comm.inputplocher == '评论' && list.length > 0
                  ? '没有更多了~'
                  : ''
              "
              @load="onLoad"
            >
              <van-cell
                v-for="(item,index) in list"
                :key="index"
                v-show="item.focusshow"
              >
                <div class="wapper-comment">
                  <div @click="handlereply(item)" class="wapper-img">
                    <van-image
                      width="18px"
                      height="18px"
                      round
                      :src="item.head_sculpture"
                    >
                      <template v-slot:error>
                        <van-icon
                          width="46px"
                          height="46px"
                          round
                          name="user-o"
                        /> </template
                    ></van-image>
                  </div>
                  <div class="wapper-item">
                    <div @click="handlereply(item)" class="wapper-i-name">
                      {{ item.nickname }}
                    </div>
                    <div @click="handlereply(item)" class="wapper-i-content">
                      {{ item.content }}
                    </div>
                    <div
                      class="wapper-children"
                      v-if="item.comments.length > 0 && !item.isshow"
                      @click="item.isshow = true"
                    >
                      展开{{ item.comments.length }}条回复
                    </div>
                    <div
                      class="wapper-childen-content wapper-comment"
                      v-show="item.isshow"
                      v-for="(ele,index) in item.comments"
                      :key="index"
                    >
                      <div class="wapper-img wapper-cimg">
                        <van-image
                          width="18px"
                          height="18px"
                          round
                          :src="$store.state.user.headimgurl"
                        >
                          <template v-slot:error>
                            <van-icon
                              width="46px"
                              height="46px"
                              round
                              name="user-o"
                            /> </template
                        ></van-image>
                        <div>回复:</div>
                      </div>
                      <div class="wapper-item" style="margin-left: 8px">
                        <div class="wapper-i-name">{{ ele.nickname }}</div>
                        <div class="wapper-i-content">{{ ele.content }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-cell>

              <div v-if="list.length === 0 && !loading">
                <van-empty
                  :image="require('@/assets/img/index/commentnone.png')"
                  description="暂无评论~"
                />
              </div>
            </van-list>
          </div>
        </div>
        <div class="pop-footer comment">
          <div class="comment-f1" :class="{ 'comment-input': isInputshow }">
            <div>
              <van-icon
                size="24"
                :name="require('@/assets/img/index/d4.png')"
              />
            </div>
            <div>
              <input
                type="text"
                :placeholder="comm.inputplocher"
                v-model="postform.content"
                @keyup.enter="handkesend"
                ref="inputplocher"
              />
            </div>
          </div>
          <div class="combtn">
            <van-button round type="info" @click="handkesend" color="#233B89"
              >发送</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 评论
import {
  addLike,
  delLike,
  addCommentById,
  commentList,
} from "@/until/api/index";
import { getwxready } from "@/componentoperation/wxShare";
export default {
  props: {
    form: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      isfocus: false, //文本框聚焦
      isInputshow: false,
      list: [],
      loading: false,
      finished: false,
      postform: {
        pcid: this.form.pcid,
        usercode: this.$store.state.usercode,
        head_sculpture: this.$store.state.user.headimgurl,
        nickname:this.$store.state.user.nickname,
        content: "",
        parent_id: "",
        status: "notApproved",
      },
      commform: {
        page: 1,
        limit: 10,
        pcid: this.form.pcid,
      },
      comm: {
        inputplocher: "评论",
        total: "",
        form: {},
      },
    };
  },
  methods: {
    onLoad() {
      this.commform.pcid = this.form.pcid;
      commentList(this.commform).then((res) => {
        // 加载状态结束
        this.comm.total = res.data.total;
        res.data.items =
          res.data.items.map((res) => {
            res.isshow = false;
            res.focusshow = true;
            return res;
          }) || [];
        // 数据全部加载完成
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
    gettotal() {
      commentList(this.commform).then((res) => {
        this.comm.total = res.data.total;
      })
    },
    // 发表评论
    handkesend() {
      if (this.postform.content.trim() == "") {
        this.$toast("请输入内容");
        setTimeout(() => {
          this.isfocus = true;
        }, 400);
        return;
      }
      this.postform.pcid = this.form.pcid;
      addCommentById(this.postform).then((res) => {
        this.$toast.success(res.message);
        this.postform.content = "";
        res.data.isshow = false;
        res.data.focusshow = true;
        res.data.state = true;
        if (this.postform.parent_id) {
          this.list.forEach((element) => {
            if (element.id == this.postform.parent_id) {
              if (!element.comments) {
                element.comments = [];
              }
              element.comments.unshift(res.data);
            }
          });
          return;
        }
        this.list.unshift(res.data);
        this.$refs.popscroll.scrollTop = 0;
        this.gettotal();
      });
    },
    blurEvent() {
      setTimeout(() => {
        this.isfocus = false;
      }, 50);
    },

    // 回复
    handlereply(item) {
      console.log(item);
      item.isshow = true;
      this.comm.inputplocher = `回复${item.nickname}:`;
      this.list.forEach((element) => {
        element.focusshow = false;
      });
      item.focusshow = true;
      this.postform.parent_id = item.id;
      this.$refs.inputplocher.focus();
    },
    // 取消回复
    inputblur() {
      if (this.list.length > 0) {
        this.list.forEach((element) => {
          element.focusshow = true;
          if (this.postform.parent_id) {
            this.postform.parent_id = "";
          }
          this.comm.inputplocher = `评论`;
        });
      }
    },
    // 关闭遮罩层
    closePopup() {
      if (this.postform.parent_id) {
        this.inputblur();
        return;
      }
      this.isInputshow = false;
    },
    // 点赞
    handlelikeStatus() {
      const collform = {
        usercode: this.$store.state.usercode,
        usercode: this.$store.state.usercode,
        pcid: this.form.pcid,
        poid: this.form.pcpoid,
      };
      if (this.form.like_status) {
        delLike(collform).then((res) => {
          this.$toast({
            message: res.message,
            position: "bottom",
          });
          this.$emit("handlelike_status", !this.form.like_status);
        });
      } else {
        addLike(collform).then((res) => {
          this.$toast({
            message: res.message,
            position: "bottom",
          });
          this.$emit("handlelike_status", !this.form.like_status);
        });
      }
    },

    // 转发
    handleforward() {
      this.$toast("点击右上按钮进行分享");
      const { pctitle, pcpicurl, video_link, cover_img } = this.form;
      const { pcid, pcpoid } = this.$route.query;
      const sharedata = {
        title: pctitle,
        desc: "欢迎加入积大慢病学院",
        link: `https://jd.unithought.com/#/articledetails?pcid=${pcid}&pcpoid=${pcpoid}`,
        imgUrl: pcpicurl,
        pcid: pcid,
        pcpoid: pcpoid,
      };
      getwxready(sharedata);
    },
  },
};
</script>

