<template>
  <van-popup
    v-model="isshow"
    closeable
    :style="{ height: '63%', width: '83%' }"
    round
    get-container="app"
    @click-overlay="handleColse"
    @click-close-icon="handleColse"
  >
    <div class="Privacy">
      <div class="title">隐私声明</div>
      <div class="pv-content" v-html="list.introductions">
       
      </div>

      <div class="pv-btn">
         <van-button
            round
            block
            type="info"
            @click="handleClick"
            color="#233B89 "
            >我已了解</van-button>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { getpositionData } from "@/until/api/index";
export default {
  props: {
    Mentshow: {
      type: Boolean,
    },
  },
  data() {
    return {
      isshow: false,
      form: {
        page: 1,
        limit: 5,
        poid: this.$store.state.position.privacy,
      },
      list:[]
    };
  },
  methods: {
    handleColse() {
      this.$emit("handlecolse", false);
    },
    handleClick(){
      this.$emit("handlecolse", false);
      this.$emit("handleagree", true);
    },
    getprivacy(){
      getpositionData(this.form).then(res=>{
        this.list = res.data.items[0]
      })
    }
  },
  watch: {
    Mentshow: {
      handler: function (val) {
        this.isshow = val;
      },
    },
  },
  created(){
    this.getprivacy()
  }
};
</script>

<style lang="scss" scoped>
.Privacy {
  padding: 20px 16px;
  font-size: 14px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #233b89;
  text-align: center;
  .pv-content {
    margin-top: 17px;
    font-size: 14px;
    font-family: SourceHanSansSC-Regular, SourceHanSansSC;
    font-weight: 400;
    color: #000000;
    line-height: 22px;
    text-align: left;
  }
  .pv-btn{
    // margin-top: 15px;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 20px 0;
    padding: 0 15px;
    width: 100%;
  }
}
</style>