<template>
  <div class="popup_index">
    <van-popup
      closeable
      v-model="popupshow"
      :style="{ height: '272px', width: '83%' }"
      :close-on-click-overlay="false"
      @click-close-icon="closepop"
    >
      <div class="logo">
        <img :src="require('@/assets/img/index/logo.png')" alt="" />
      </div>
      <div class="pop_wapper">
        <div class="pop-title">内容仅对医学医药专业人士开放</div>
        <div class="pop-title">
          <van-checkbox
            v-model="isMedical"
            icon-size="15px"
            checked-color="#233B89"
          >
            <div>我是医学药学专业人士</div>
          </van-checkbox>
        </div>
        <div class="pop-submit">
          <van-button
            round
            block
            type="info"
            @click="handleClick"
            color="#233B89"
            >确认</van-button
          >
        </div>
        <div class="pop-statement">
          <van-checkbox
            v-model="checked"
            icon-size="15px"
            checked-color="#233B89"
          >
            <div>
              我已阅读并同意<span
                class="statement"
                @click.stop="Mentshow = true"
                >[隐私声明]</span
              >
            </div>
          </van-checkbox>
        </div>
      </div>
    </van-popup>
    <v-statement
      :Mentshow="Mentshow"
      @handlecolse="handlecolse"
      @handleagree="handleagree"
    ></v-statement>
  </div>
</template>

<script>
import Statement from "@/components/statement";
export default {
  props: {
    popupshow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      Mentshow: false,
      checked: false,
      isMedical: true,
    };
  },
  methods: {
    handleClick() {
      if (!this.isMedical) {
        this.$notify({
          message: "是否为医学药学专业人士",
          color: "#FFFFFF",
          background: "#233B89",
        });
        return;
      }
      if (!this.checked) {
        this.$notify({
          message: "请先同意隐私声明",
          color: "#FFFFFF",
          background: "#233B89",
        });
        return;
      }
      this.$store.commit("SETISPOPUPANDTOKEN", false);
      this.$store.dispatch("getH5user");
    },
    handlecolse(data) {
      this.Mentshow = data;
    },
    handleagree(data) {
      this.checked = data;
    },
    closepop() {
      //这个可以关闭安卓系统的手机，顺序不要反
      document.addEventListener(
        "WeixinJSBridgeReady",
        function () {
          WeixinJSBridge.call("closeWindow");
        },
        false
      );
      //这个可以关闭ios系统的手机
      WeixinJSBridge.call("closeWindow");
    },
  },
  components: {
    "v-statement": Statement,
  },
};
</script>

<style lang="scss">
.popup_index {
  .van-popup--center {
    border-radius: 5px !important;
  }
  .pop_wapper {
    margin-top: 40px;
    padding: 0px 10px;
    > div {
      display: flex;
      justify-content: center;
    }
  }
  .pop-title {
    font-size: 16px;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC;
    font-weight: 500;
    color: #000000;
    // margin-top: 40px;
    padding-top: 20px;
  }
  .pop-submit {
    margin-top: 44px;
  }
  .pop-statement {
    margin-top: 21px;
    font-size: 14px;
    .statement {
      color: red;
    }
  }
  .van-popup {
    overflow-y: inherit;
  }
  .logo {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: -45px;
    img {
      width: 100px;
      height: 78px;
    }
  }
}
</style>