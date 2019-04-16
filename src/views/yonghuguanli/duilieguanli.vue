<template>

<!-- true显示，false不显示 -->
  <div v-if="userName==this.$store.state.nameler?false:true">
    

    <div class="topBanner">
      
      <el-tooltip class="item" effect="light" content="展开缩进" placement="bottom">
      <p class='tog' @click="togglemenu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhankai1"></use>
        </svg></p>
      </el-tooltip>

      <p class='left'>系统运维 >> 队列管理</p>

      <p class='right' @click="goBack" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>安全退出</p>


      
      <p class='right' title="用户名">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-character"></use>
        </svg>{{userName}}</p>
      
      <p class='right' @click="screenfull">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-quanping4"></use>
      </svg>全屏显示</p>

      <p class='right' title="密码修改">
      <router-link to="/yonghuguanli/mimaxiugai" class="roulink">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-mimazhongzhi"></use>
      </svg>密码修改
      </router-link>
      </p>

      <p class='right' @click="lastpage">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui2"></use>
      </svg>返回上一页</p>
    </div>
  <div class="content">
        <el-alert
            title="该功能仅用于停止应用服务器，请在版本发布或其他紧急情况下使用，谨慎操作！"
            type="warning"
            show-icon
            center
            :closable="false">
        </el-alert>

    <div class="buttonshow">
        <el-button type="warning" plain icon="el-icon-warning" @click="stopduilie()">暂停队列</el-button>
        <el-button type="primary" plain icon="el-icon-refresh" @click="restart()">重启队列</el-button>
    </div>
  </div>
  </div>
</template>
<script>
// 时间格式化：数据库中往往存储的是时间的毫秒形式，这样在页面上可以操控显示时间的格式
import {formatDate} from '../../common/date.js';
import screenfull from 'screenfull'
//引入vuex
// import {mapState} from 'vuex'

export default {
  data() {
      
    return {
      isFullscreen: false,
      userName: "",
    };
  },
  // mounted只执行一次,在模板渲染成html后调用
  mounted() {
    this.getName();//获取管理员用户名

    window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          };

    // this.getlist();//获取用户列表
  },

  methods: {
    //返回上一页
    lastpage(){
      window.history.go(-1);
    },
    //停止队列
    stopduilie(){
      this.$confirm('确认暂停队列, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      this.$http
            .post(this.$store.state.domain +"/mqManage/stopMessageListener")
              .then(
              //成功
              response => {
                if (response.data.code == 0) { 
                    this.$message({
                    dangerouslyUseHTMLString: true,//表示提示的是html片段
                    message: '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-jiqiren"></use> </svg> '+
                    response.body.detail.result,
                    type: "success"
                    });
                } 
                //失败
                else {
                  this.$message({
                    message: response.data.msg,
                    type: "error"
                  });
                }
              },
              //打印
              response => {
                console.log(response);
              }
            );
            }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消'
          });  
        });
    },

    //重启队列
    restart(){
      this.$confirm('确认重启队列, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      this.$http
            .post(this.$store.state.domain +"/mqManage/restartMessageListener")
              .then(
              //成功
              response => {
                if (response.data.code == 0) { 
                    this.$message({
                    dangerouslyUseHTMLString: true,//表示提示的是html片段
                    message: '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-jiqiren"></use> </svg> '+
                    response.body.detail.result,
                    type: "success"
                    });
                } 
                //失败
                else {
                  this.$message({
                    message: response.data.msg,
                    type: "error"
                  });
                }
              },
              //打印
              response => {
                console.log(response);
              }
            );
            }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消'
          });  
        });
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
    
    // 退出，跳转至登陆页面
      goBack() {
        var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
          window.sessionStorage.removeItem('name');//清除session中name
					this.$router.push('/login');
				}).catch(() => {
			});
    },
    //获取用户名，vue 本地存储数据 sessionStorage
      getName() {
        let userName = sessionStorage.getItem("name");
        this.userName = userName;
      },


  },
    //过滤器，用于格式化时间格式
    filters: {
          formatDate(time) {
              var date = new Date(time);
              return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
    },
     
};
</script>

 <style lang='less'>

//  导入统一样式less样式
@import '../users/index.css';

.buttonshow {
  width: 100%;
  height: 80px;
  margin-top: 20px;
  padding: 20px;

  text-align: center;

  border-top: 1px dashed rgba(93, 91, 91, .61);
}





































































</style>
