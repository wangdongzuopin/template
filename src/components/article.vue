<template>
    <div>
      <!-- 视频显示组件 -->
      <v-articlevic @click.native="handleClick(form)" v-if="form.video_link" :form="form"></v-articlevic> 
      <!-- 图片显示组件 -->
      <v-articlepic @click.native="handleClick(form)" v-else :form="form"></v-articlepic>
    </div>
</template>

<script>
import articlePic from '@/components/articlePic'
import articleVic from '@/components/articleVic'
export default {
  props: {
    form: {
      type: Object,
    },
  },
  components:{
    'v-articlepic':articlePic,
    'v-articlevic':articleVic,
  },
  methods:{
    handleClick(item){
      setTimeout(() => {
        this.$router.push({ path: "/articledetails?pcid=" + item.pcid+'&pcpoid='+item.pcpoid });
      }, 300);
    }
  }
};
</script>

<style>
</style>