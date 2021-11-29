<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  components: {
  },
  data(){
    return{
      transitionName:'slide-bottom'
    }
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      console.log(to, "to");
      console.log(from, "from");
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-bottom";
      } else {
        this.transitionName = "slide-bottom";
      }
    },
  },
  methods:{
    jump(){
      this.$router.push({name:'two'})
    },
    　_isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },
  mounted(){
    console.log(this._isMobile());
    if(!this._isMobile()){
      this.$router.push({name:'phone'})
      this.$toast.bottom('建议使用手机浏览此网页');
    }else{
       this.$router.push({name:'home'})
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
      will-change: transform;
      transition: all 500ms;
      position: absolute;
    }

    .slide-right-enter {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    .slide-right-leave-active {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    .slide-left-enter {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    .slide-left-leave-active {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>>


