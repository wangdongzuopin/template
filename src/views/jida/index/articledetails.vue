<template>
  <div class="articledetailsMain" style="height: 100%">
    <div class="articledetails">
      <v-title></v-title>
      <div class="ad-video" v-if="playerOptions.sources[0].src">
        <video-player
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @timeupdate="updateTime"
        >
        </video-player>
      </div>
      <!-- 作者信息 -->
      <div class="artic_author" v-if="detailform.pctitle">
        <div class="ar-au-left">
          <div class="wapper-l-title">
            <div>{{ detailform.pctitle }}</div>
            <div>
              <img
                v-if="detailform.hot"
                :src="require('@/assets/img/index/i9.png')"
                alt=""
              />
            </div>
          </div>
          <div class="wapper-l-info">
            <div class="wapper-l-author">
              <div>
                <img :src="require('@/assets/img/index/i6.png')" alt="" />
              </div>
              <div>{{ detailform.author }}</div>
            </div>
            <div class="wapper-l-author" v-show="detailform.author_affiliation">
              <div>
                <img :src="require('@/assets/img/index/i5.png')" alt="" />
              </div>
              <div>{{ detailform.author_affiliation }}</div>
            </div>
          </div>
          <div class="wapper-l-info wapper-l-time">
            <div class="wapper-l-author">
              <div>
                <img :src="require('@/assets/img/index/i7.png')" alt="" />
              </div>
              <div>{{ detailform.createtime }}</div>
            </div>
            <div></div>
          </div>
          <div class="wapper-icon-sim">
            <div class="wapper-span" v-if="detailform.typeName">
              <div class="wapper-span-back"></div>
              <div>{{ detailform.typeName }}</div>
            </div>
            <div class="wapper-span" v-show="detailform.video_link">
              <div class="wapper-span-back"></div>
              <div>科普类视频</div>
            </div>
          </div>
        </div>
        <div class="ar-au-right">
          <van-image
            @click="handleCollection"
            :src="require('@/assets/img/index/d1.png')"
            v-if="!detailform.collection_status"
          />
          <van-image
            @click="handleCollection"
            :src="require('@/assets/img/index/d1-active.png')"
            v-if="detailform.collection_status"
          />
        </div>
      </div>
      <van-skeleton title :row="3" v-if="!detailform.pctitle" />

      <!-- 医生信息 -->
      <div
        class="doc-wapper"
        v-if="detailform.head_sculpture && detailform.video_link"
      >
        <div class="doc-person">
          <div v-show="detailform.head_sculpture">
            <van-image
              width="55px"
              height="55px"
              :src="detailform.head_sculpture"
            ></van-image>
          </div>
          <div v-show="detailform.doctor_name">
            <div>{{ detailform.doctor_name }}</div>
            <div class="department">
              <div>{{ detailform.department }}</div>
              <div>{{ detailform.doctor_title }}</div>
            </div>
          </div>
        </div>
        <!-- 医师介绍 -->
        <div class="introduce" v-show="detailform.introductions">
          <div>医师介绍</div>
          <div v-html="detailform.introductions"></div>
        </div>
      </div>

      <div
        class="doccontent"
        v-if="!detailform.video_link"
        v-html="detailform.content"
      ></div>
      <div class="docTitle">以上内容仅限医学药学人士查看</div>

      <div class="returnIndex" @click="$router.push({ path: '/' })">
        返回首页
      </div>
    </div>
    <!-- 评论 -->
    <v-comment
      :form="detailform"
      @handlelike_status="handlelike_status"
    ></v-comment>
  </div>
</template>

<script>
import {
  getarticledetail,
  addCollection,
  delCollection,
  saveVideoDuration,
} from "@/until/api/index";
import Title from "@/components/title";
import Comment from "@/components/comment";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import playerOptions from "@/componentoperation/videoplayer";
import {getwxready} from '@/componentoperation/wxShare'
export default {
  data() {
    return {
      pcform: {
        pcid: "",
        poid: "",
        usercode: this.$store.state.usercode,
      },
      detailform: {},
      playerOptions,
      // 记录视频浏览时长
      timeform: {
        pcid: "",
        usercode: this.$store.state.usercode,
        videoStartTime: "",
        videoDuration: "",
        videoLength: "",
      },
      str: 0,
      strtemp: 0,
      firstclick: true,
    };
  },
  methods: {
    updateTime() {},
    // 播放回调
    onPlayerPlay(player) {
      this.str++;
      this.str = this.timer(1000);
      this.timeform.videoLength = Number(player.cache_.duration.toFixed(0)); //赋值视频总时长

      // 第一次点击视频开始按键
      if (this.firstclick) {
        this.timeform.videoStartTime = this.$moment().format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.firstclick = false;
      }

      console.log(this.timeform);
    },
    // 暂停回调
    onPlayerPause(player) {
      clearInterval(this.str);
    },
    // 离开前获取时间
    getleavetime() {
      if (this.strtemp) {
        this.timeform.videoDuration = this.$moment
          .utc(this.strtemp * 1000)
          .format("s");
      }
      !this.timeform.videoDuration ? (this.timeform.videoDuration = "1") : "";
      saveVideoDuration(this.timeform);
    },
    timer(time) {
      return setInterval(() => {
        this.strtemp++;
      }, time);
    },
    toDub(n) {
      //补0操作
      if (n < 10) {
        return "0" + n;
      } else {
        return "" + n;
      }
    },

    getlist() {
      getarticledetail(this.pcform).then((res) => {
        this.detailform = res.data;
        const { video_link, cover_img } = res.data;
        if (video_link) {
          this.playerOptions.sources[0].src = video_link;
          this.playerOptions.poster = res.data.cover_img;
        }
        this.$nextTick(() => {
          document.title = this.detailform.pctitle;
          this.handleforward()
        });
      });
    },
    handleforward() {
      const { pctitle, pcpicurl,pcid, pcpoid,cover_img,video_link } = this.detailform;
      const sharedata = {
        title: pctitle,
        desc: "欢迎加入积大慢病学院",
        link: `https://jd.unithought.com/#/articledetails?pcid=${pcid}&pcpoid=${pcpoid}`,
        imgUrl: video_link?cover_img:pcpicurl,
        pcid:pcid,
        pcpoid:pcpoid
      };
      getwxready(sharedata);
    },
    // 收藏或取消收藏
    handleCollection() {
      const collform = {
        usercode: this.$store.state.usercode,
        pcid: this.detailform.pcid,
        poid: this.detailform.pcpoid,
      };

      if (this.detailform.collection_status) {
        this.$dialog
          .confirm({
            message: "是否取消收藏",
            confirmButtonColor: "#233B89",
          })
          .then(() => {
            delCollection(collform).then((res) => {
              this.$toast({
                message: res.message,
                position: "bottom",
              });
              this.detailform.collection_status =
                !this.detailform.collection_status;
            });
          })
          .catch(() => {});
      } else {
        addCollection(collform).then((res) => {
          this.$toast({
            message: res.message,
            position: "bottom",
          });
          this.detailform.collection_status =
            !this.detailform.collection_status;
        });
      }
    },
    handlelike_status(data) {
      this.detailform.like_status = data;
    },
  },
  created() {
    this.pcform.pcid = (this.$route.query && this.$route.query.pcid) || "";
    this.pcform.poid = (this.$route.query && this.$route.query.pcpoid) || "";
    // 设置时间参数对象下的文章id
    this.timeform.pcid = (this.$route.query && this.$route.query.pcid) || "";

    this.getlist();
    this.playerOptions.sources[0].src = "";
  },
  beforeDestroy() {
    if (!this.firstclick) {
      this.getleavetime();
    }
  },
  components: {
    "v-title": Title,
    "v-comment": Comment,
    videoPlayer,
  },
};
</script>

<style>
</style>