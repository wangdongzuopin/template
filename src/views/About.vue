<template>
</template>

<script>
export default {
  methods:{
     takePhoto(e){//拍照功能---上传头像
            var file=e.target.files[0]//获取文件对象
            var fd=new FormData()//构造formdata对象
            fd.append('file',file)//向formdata里面存放键值对
           
        },
  }
}
</script>

<style>

</style>