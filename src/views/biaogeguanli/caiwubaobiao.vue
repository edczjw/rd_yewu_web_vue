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

      <p class='left'>表格管理 >> 财务报表</p>

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
        <div class="searcharea">
          <!-- el-form接收一个model，必须配合el-form-item一起使用，并且在el-form-item上绑定prop属性 -->
          <el-form ref="searchform" :model="searchform" label-width="80px" size="mini">

            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="生成日期" prop="date">
                    <el-date-picker class="shi"
                      v-model="searchform.date"
                      clearable
                      value-format="yyyyMMdd"
                      type="date"
                      placeholder="生成日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <div class="di">
                  <div class="wrapper">
                    <el-button type="primary" plain @click="search()" size="mini">
                      搜索</el-button>
                    <el-button type="primary" plain @click="resetForm('searchform')" size="mini">
                      重置
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!-- =============================== 展示表格数据框 =================================== -->
       
          <el-table :data="tableData"  border size="medium"
          stripe v-loading="listLoading" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%; height:100%;">
            <el-table-column prop="reportName" label="报表名称" align="center">
            </el-table-column>
            <el-table-column prop="reportDate" label="更新日期" align="center">
            </el-table-column>
            <el-table-column prop="reportType" label="报表类型" align="center" v-if="false">
            </el-table-column>
            <el-table-column prop="" label="操作"  align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.reportName,scope.row.reportDate,scope.row.reportType)" type="text" size="small">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
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
      listLoading: false,//加载样式

      //表格数据
      tableData: [],

      searchform: {
        date: "",//开始时间
      }
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
          }
  },

  //在模板渲染成html前调用
created() {
    // this.getlist();//获取用户列表
},
  methods: {
    //下载
    handleClick(reportName,reportDate,reportType){
          let data={
            date:reportDate,
            financeType:reportType
          }
          const url = this.$store.state.domain +"/financeFile/download";
                this.$http.post(url, data , {
                    responseType: 'blob',
                    emulateJSON:true
                }).then(res => {
                let blob = new Blob([res.data], {
                    type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                })
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob);
                } else {
                    let elink = document.createElement('a');
                    elink.download = reportDate+"_"+reportName;
                    console.log(this.getdate())
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                }
            }).catch(err => {
                console.warn(err);
            });     
    },

    //获取时间戳
    getdate() {
          var now = new Date(),
              y = now.getFullYear(),
              m = now.getMonth() + 1,
              d = now.getDate();
          return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
      },
      
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

    
      //获取用户名，vue 本地存储数据 sessionStorage
      getName() {
        let userName = sessionStorage.getItem("name");
        this.userName = userName;
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
    
      // 搜索功能
      search() {
        this.getlist();
      },

      // 重置功能
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      // ajax异步数据交互：Vue 实例提供了 this.$http 服务可用于发送 HTTP 请求
      getlist() {
        this.listLoading=true
        this.$http
          .post(
            this.$store.state.domain +"/financeFile/financeList",this.searchform 
          )
          //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
          .then(  
            // Lambda写法
            response => {
              if (response.body.code == 0) {
                //请求成功回调函数
                this.tableData = response.body.detail;
                this.listLoading=false;

                if(this.tableData=='')
                {
                  this.$notify({
                    message: '搜索失败，无此数据，请重新搜索。',
                    type: 'warning',
                    duration:"2000"//持续时间
                  });
                }
              } else {
              //请求失败回调函数
                this.listLoading=false;
                this.$message({
                    message: response.body.msg,
                    type: "error"
                  });
              }
              
            },
            response => {
              //请求失败回调函数
                this.listLoading=false;
                this.$message({
                    dangerouslyUseHTMLString: true,//表示提示的是html片段
                    message: '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-shengqi"></use> </svg> '+
                    response.body.message,
                    type: "error"
                  });
              console.log(response);
            }
          );
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











































































































































</style>
