<template>
  <div>
    <Title></Title>
    <Back></Back>
    <Go :item="item" :stop="true" @click.native="nextTo"></Go>
    <div class="three">
      <div>
        <img src="../assets/img/border.png" alt="" />
        <div class="text">
          <div v-if="!img">
            <div>点击上传图片</div>
            <div>释放能量</div>
          </div>
          <input
            type="file"
            class="input"
            accept="image/jpg, image/jpeg,image/png"
            capture="user"
            @change="takePhoto($event)"
          />
          <img v-show="img" class="img" :src="img" alt="" />

          <div class="reupload" v-if="img">
            <input
              type="file"
              class="input"
              accept="image/jpg, image/jpeg,image/png"
              capture="user"
              @change="takePhoto($event)"
            />
            重新上传
          </div>
        </div>
      </div>
      <div class="textfont">
        <p>凝聚我们的无限能量</p>
        <p>協创GAMA元宇宙</p>
      </div>
    </div>
  </div>
</template>

<script>
import Go from "@/components/go.vue";
import Back from "@/components/back.vue";
import Title from "@/components/title.vue";
import axios from "axios";
import url from "../until/base.js";
export default {
  data() {
    return {
      item: "four",
      img: "",
    };
  },
  components: {
    Back,
    Go,
    Title,
  },
  methods: {
    // next
    nextTo() {
      if(!this.img){this.$toast.bottom('请上传图片');;return}
      this.$router.push({ name: this.item,params:{img:this.img} });
    },

    canvasDataURL(path, obj, callback) {
      let img = new Image();
      img.src = path;
      img.onload = function () {
        let that = this; // 指到img
        // 默认按比例压缩
        let w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        let quality = 0.2; // 默认图片质量为0.7
        // 生成canvas
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        // 创建属性节点
        let anw = document.createAttribute("width");
        anw.nodeValue = w;
        let anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality >= 1 && obj.quality < 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL("image/jpeg", quality);
        // 回调函数返回base64的值
        callback(base64);
      };
    },
    photoCompress(file, obj, callback) {
      let that = this;
      let ready = new FileReader();
      /* 开始读取指定File对象中的内容. 读取操作完成时,返回一个URL格式的字符串. */
      ready.readAsDataURL(file);
      ready.onload = function () {
        let re = this.result;
        that.canvasDataURL(re, obj, callback); // 开始压缩
      };
    },
    base64UrlToBlob(urlData) {
      let arr = urlData.split(","),
        mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
        bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 转blob
      // return new Blob([u8arr], {type: mime})
      let filename = Date.parse(new Date()) + ".jpg";
      // 转file
      return new File([u8arr], filename, { type: mime });
    },
    takePhoto(e) {
      console.log(this.img);
      if (this.img) {
        this.img = "";
      }
      var that = this;
      //拍照功能---上传头像
      var file = e.target.files[0]; //获取文件对象
      var reader = new FileReader();
      //正式读取文件
      reader.readAsDataURL(file);
      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据
      param.append("chunk", "0"); // 添加form表单中其他数据
      // 添加请求头
      reader.onloadend = function (e) {
        //该事件在读取操作结束时（要么成功，要么失败）触发
        that.img = e.target.result;
        console.log(e.target.result);
      };
      // if (file.size / 1024 > 1025) {
      //   // 文件大于1M（根据需求更改），进行压缩上传
      //   this.photoCompress(
      //     file,
      //     {
      //       // 调用压缩图片方法
      //       quality: 0.2,
      //     },
      //     function (base64Codes) {
      //       // console.log("压缩后：" + base.length / 1024 + " " + base);
      //       let bl = that.base64UrlToBlob(base64Codes);
      //       // file.append('file', bl, 'file_' + Date.parse(new Date()) + '.jpg') // 文件对象
      //       that.uploadLice(bl); // 请求图片上传接口
      //     }
      //   );
      // } else {
      //   that.uploadLice(param);
      // }
      // that.uploadLice(param);
    },
    uploadLice(param) {
      console.log(param);
      let config = {
        headers: {
          "Content-Type":
            "multipart/form-data;boundary=----WebKitFormBoundaryTKzhikvFgWYOmN8t",
        },
      };
      axios.post(url + "file/uploadfiles1", param, config).then((res) => {
        if (res.data.code === 0) {
          that.ImgUrl = res.data.data;
        }
        console.log(res.data);
      });
    },
  },
};
</script>

<style>
</style>