<template>
  <div class="wapper-feed-t1">
    <v-title></v-title>
    <div class="wapper-feed">
      <div class="feedtitle">您对于健康学苑有什么意见可以反馈给我们：</div>
      <div class="feedtext">
        <van-field
          rows="6"
          v-model="form.content"
          type="textarea"
          maxlength="300"
          placeholder="请填写您的意见（限制：10-300个字）"
          :autosize="true"
        />
      </div>
      <div class="filedbtn">
        <van-button
        :disabled="form.content.trim().length < 10"
          round
          block
          type="info"
          @click="handlesubmit"
          color="#233B89"
          >提交</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/title";
import { savefeedback } from "@/until/api/user";
export default {
  components: {
    "v-title": Title,
  },
  data() {
    return {
      form: {
        content: "",
        usercode: this.$store.state.usercode,
        nickname:
          this.$store.state.user.nickname || "",
      },
    };
  },
  methods: {
    handlesubmit() {
      if (this.form.content.trim() == "") {
        this.$toast("请输入内容");
        return;
      }
      if (this.form.content.trim().length < 10) {
        this.$toast("最少请输入10个字");
        return;
      }
      savefeedback(this.form).then((res) => {
        this.$toast.success(res.message);
        setTimeout(() => {
            this.form.content = ''
        }, 500);
      });
    },
  },
};
</script>

<style>
</style>