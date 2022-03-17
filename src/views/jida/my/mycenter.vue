<template>
  <div class="UserCenter-t1">
    <v-title></v-title>
    <div class="personalData">
      <van-form @submit="onSubmit">
        <van-field
          class="field-padding"
          v-model="form.nickname"
          label="用户名"
          placeholder="用户名"
          input-align="right"
          :rules="[{ required: true, message: '' }]"
        >
          <template v-slot:label>
            <div class="personalUsername">用户名</div>
          </template>
        </van-field>
        <van-field
          class="field-select"
          v-model="form.province"
          is-link
          readonly
          label="省份"
          placeholder="请选择省份"
          input-align="right"
          @click="provinceShow = true"
        >
        </van-field>
        <van-popup v-model="provinceShow" round position="bottom">
          <van-area
            title="省市"
            :value="area.provincecode"
            :area-list="areaList"
            :columns-num="2"
            @confirm="handleprovinceAndcity"
            @cancel="provinceShow = false"
          />
        </van-popup>

        <van-field
          class="field-select"
          v-model="form.city"
          is-link
          readonly
          label="城市"
          placeholder="请选择城市"
          input-align="right"
          @click="CityShow = true"
        >
        </van-field>
        <van-popup v-model="CityShow" round position="bottom">
          <van-area
            title="省市"
            :value="area.citycode"
            :area-list="areaList"
            :columns-num="2"
            @confirm="handleprovinceAndcity"
            @cancel="CityShow = false"
          />
        </van-popup>

        <van-field
          class="field-padding"
          v-model="form.pharmacy_brand"
          label="所属药房品牌"
          placeholder="请填写品牌"
          input-align="right"
          maxlength="30"
        >
        </van-field>
        <van-field
          class="field-padding"
          v-model="form.branch_name"
          label="所属分店名称"
          placeholder="请填写店面"
          input-align="right"
          maxlength="30"
        >
        </van-field>
        <van-field
          class="field-padding"
          v-model="form.mailbox"
          label="邮箱"
          placeholder="请填写您的邮箱"
          input-align="right"
        >
        </van-field>
        <van-field
          class="field-padding"
          v-model="form.phone_number"
          label="手机号"
          placeholder="请填写您的手机号"
          input-align="right"
        >
        </van-field>
        <div class="filed_last-line"></div>

        <div class="filedbtn">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="#233B89"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Title from "@/components/title";
import { areaList } from "@vant/area-data";
import { updateUserInfo } from "@/until/api/user";
export default {
  components: {
    "v-title": Title,
  },
  data() {
    return {
      areaList,
      form: {
        usercode: this.$store.state.usercode,
        nickname: this.$store.state.user.nickname || "",
        province: this.$store.state.user.province || "",
        city: this.$store.state.user.city || "",
        pharmacy_brand: this.$store.state.user.pharmacy_brand || "",
        branch_name: this.$store.state.user.branch_name || "",
        mailbox: this.$store.state.user.mailbox || "",
        phone_number: this.$store.state.user.phone_number || "",
      },
      area: { provincecode: "", citycode: "" },
      provinceShow: false,
      CityShow: false,
    };
  },
  methods: {
    handleprovinceAndcity(item) {
      this.form.province = item[0].name;
      this.form.city = item[1].name;
      this.area.provincecode = item[0].code;
      this.area.citycode = item[1].code;
      this.$nextTick(() => {
        this.CityShow = false;
        this.provinceShow = false;
      });
    },
    onSubmit(values) {
      if (this.isphone(this.form.phone_number)) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      if (this.isemail(this.form.mailbox)) {
        this.$toast("请输入正确的邮箱");
        return;
      }

      updateUserInfo(this.form).then((res) => {
        this.$toast.success(res.message);
        setTimeout(() => {
          this.$store.dispatch("getH5user").then((res) => {
            this.$router.go(-1);
          });
        }, 1000);
      });
    },

    // 正则-手机
    isphone(value) {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!value.trim()) {
        return false;
      }
      if (!reg.test(value)) {
        return true;
      }
    },
    isemail(value) {
      const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
      if (!value.trim()) {
        return false;
      }
      if (!reg.test(value)) {
        return true;
      }
    },
  },
  created(){
    console.log(this.$store.state.user.nickname);
  }
};
</script>

<style>
</style>