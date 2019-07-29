<template>
  <div class="wrapper-inner" id="app">
    <div id="dtop" class="gotop" title="返回顶部" @click="movetop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhuidingbu" />
      </svg>
    </div>

    <div class="side-container" :class="{'layout-menu' : this.$store.state.isLeftHiden}">
      <side-menu></side-menu>
    </div>
    <div class="main-container" :class="{'container-width':this.$store.state.isLeftHiden}">
      <!-- 路由页面 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import sideMenu from "../../components/SideMenu.vue";

//引入vuex
// import {mapState} from 'vuex'

export default {
  data() {
    return {
      userName: ""
    };
  },
  mounted() {
    this.getName();
    //登陆成功提示
    this.openCenter();
    window.addEventListener("scroll", this.returntop, true); // 监听（绑定）滚轮滚动事件
  },
  methods: {
    //返回顶部
    returntop() {
      //返回顶部
      var htop = document.body.scrollTop; //获取滚动高度
      var dtops = document.getElementById("dtop"); //获取图标
      // console.log(dtops.style.display);
      //判断滚动条滚动长度
      if (htop > 350) {
        dtops.style.display = "block";
      } else {
        dtops.style.display = "none";
      }
    },
    movetop() {
      window.scrollTo(0, -1);
      document.body.scrollTop = 0;
    },

    openCenter() {
      if (this.userName != null) {
        this.$message({
          dangerouslyUseHTMLString: true, //表示提示的是html片段
          message:
            '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-jiqiren"></use> </svg> ' +
            "欢迎  " +
            this.userName +
            "  登陆民盛业务系统！",
          type: "success",
          center: true
        });
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message:
            '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-shengqi"></use> </svg> ' +
            "请先登录！",
          type: "warning",
          center: true
        });
        this.$router.push("/login");
      }
    },

    //获取用户名，vue 本地存储数据 sessionStorage
    getName() {
      let userName = sessionStorage.getItem("name");
      this.userName = userName;
    }
  },
  watch: {},
  components: {
    sideMenu
    // headBanner
  }
};
</script>

<style lang='less'>
@import url("//unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css");
</style>
