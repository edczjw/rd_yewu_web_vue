<template>
  <div class="topBanner">
    <p class='left'>民盛业务系统</p>
    <p class='right' @click="goBack">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuichu"></use>
      </svg>安全退出</p>
    <!-- <el-button class='right' @click="goBack">退出</el-button> -->
    <p class='right'>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-user"></use>
      </svg>用户名</p>
    <p class='right' @click="screenfull">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-quanping3"></use>
      </svg>全屏显示</p>
  </div>
</template>
<script>

import screenfull from 'screenfull'
export default {
  methods: {

    goBack() {
      this.$router.push("/login");
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

  },
   mounted() {
      window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          }
       },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.topBanner {
  line-height: 40px;

  width: 100%;
  height: 40px;

  background-color: #fff;
}

p {
  padding-left: 20px;
}

.left {
  float: left;
}

.right {
  float: right;

  margin-right: 22px;

  cursor: pointer;
}

p:hover {
  color: skyblue;
}

svg {
  padding: 3px 8px;
}




</style>
