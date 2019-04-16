<template>
  <div>
    
      <el-tooltip class="item" effect="light" content="展开缩进" placement="bottom">
      <p class='tog' @click="togglemenu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhankai1"></use>
        </svg></p>
      </el-tooltip>
      <p class='right' @click="screenfull">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-quanping4"></use>
      </svg>全屏显示</p>

      <p class='right' @click="lastpage">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui2"></use>
      </svg>返回上一页</p>
      
    <div class="outpadding">
       <!-- <p class="xiangqingtitle"><i class="el-icon-location-outline"></i>北京华域</p> -->

      <el-tabs v-model="tabname" type="card">
        <!-- 有两大板块，分别来自不同的页面 -->
        <el-tab-pane label="基本信息" name="userbasebaiduo"></el-tab-pane>
        <el-tab-pane label="影像信息" name="userpics"></el-tab-pane>
      </el-tabs>
      <userbasebaiduo v-if="tabname=='userbasebaiduo'"></userbasebaiduo>
      <userpics v-if="tabname=='userpics'"></userpics>
    </div>
  </div>
</template>
<script>
import userbasebaiduo from "./userbasebaiduo.vue";
import userpics from "./userpics.vue";
import screenfull from 'screenfull'

export default {
  data() {
    return {
      isFullscreen: false,
      detail: {},
      tabname: "userbasebaiduo",//默认打开的是基本信息
      // caseId: this.$route.query.caseId
    };
  },
  mounted() {
    window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          };
  },
  methods: {
    //返回上一页
    lastpage(){
      window.history.go(-1);
    },
    /**
     * 全屏事件
     */
    screenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'Your browser does not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = true
    },
    /**
     * 是否全屏并按键ESC键的方法
     */
    checkFull() {
      var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
          isFull = false
      }
      return isFull
    },

    //展开缩进
    togglemenu(){
        this.$store.state.isLeftHiden=!this.$store.state.isLeftHiden;
        console.log(this.$store.state.isLeftHiden)
    },
  },
  watch: {},
  components: {
    userbasebaiduo,
    userpics
  }
};
</script>

 <style lang='less' scoped>
@import '../users/index.css';

.outpadding {
  padding: 30px 20px;

  background-color: rgb(252, 249, 249);
}








</style>
