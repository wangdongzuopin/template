<template>
  <div class="wapper-list">
    <div class="wapper-l-right">
      <div class="wapper-ri-pic">
        <van-image
          style="height: 100%"
         :src="form.cover_img"
        />
        <div class="player">
          <img :src="require('@/assets/img/index/i12.png')" alt="" />
        </div>
      </div>
      <div class="recommend" v-show="form.pcorder !== 0">置顶推荐</div>
    </div>
    <div class="wapper-l-left">
      <div class="wapper-l-title">
        <div>{{form.pctitle}}</div>
        <div v-show="form.pcorder !== 0"><img v-if="form.hot" :src="require('@/assets/img/index/i9.png')" alt="" /></div>
      </div>
      <div class="wapper-l-info">
        <div class="wapper-l-author">
          <div><img :src="require('@/assets/img/index/i6.png')" alt="" /></div>
          <div>{{form.author}}</div>
        </div>
        <div class="wapper-l-author" v-show="form.author_affiliation">
          <div><img :src="require('@/assets/img/index/i5.png')" alt="" /></div>
          <div>{{form.author_affiliation}}</div>
        </div>
      </div>
      <div class="wapper-l-info wapper-l-time" v-show="form.lastMtime">
        <div class="wapper-l-author">
          <div><img :src="require('@/assets/img/index/i7.png')" alt="" /></div>
          <div>{{form.lastMtime}}</div>
        </div>
        <div></div>
      </div>
      <div class="wapper-icon-sim">
        <div class="wapper-span" v-show="form.typeName">
          <div class="wapper-span-back"></div>
          <div>{{form.typeName}}</div>
        </div>
        <div class="wapper-span">
          <div class="wapper-span-back"></div>
          <div>科普类视频</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
    },
  },
};
</script>

<style>
</style>