<template>
<!-- true显示，false不显示 -->
  <div v-if="userName==this.$store.state.nameler?false:true">
    

    <div class="topBanner">
      
      <el-tooltip class="item" effect="light" content="展开缩进" placement="bottom">
      <p class='tog' @click="togglemenu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href= "#icon-zhankai1"></use>
        </svg></p>
      </el-tooltip>

      <p class='left'>精确数科 >> 精确数据</p>

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
        <!-- =============================== 展示表格数据框 =================================== -->
       
          <el-table :data="tableData"  border size="medium"
          stripe v-loading="listLoading" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%; height:100%;">
            <el-table-column prop="userName" label="姓名" width="90px"  align="center">
            </el-table-column>
            <el-table-column prop="phone" label="手机号"  align="center">
            </el-table-column>
            <el-table-column prop="idCardNum" label="身份证号码"  align="center">
            </el-table-column>
            <el-table-column prop="address" label="地址"  align="center">
            </el-table-column>
            <el-table-column prop="amount" label="贷款本金(元)"  align="center">
            </el-table-column>
            <el-table-column prop="rate" label="年化利率(%)" align="center">
            </el-table-column>
            <el-table-column prop="deadline" label="借款期限" width="90px"  align="center">
            </el-table-column>
            <el-table-column prop="accountName" label="收款账户户名"  align="center">
            </el-table-column>
            <el-table-column prop="accountBank" label="收款账户银行"  align="center">
            </el-table-column>
            <el-table-column prop="accountNum" label="收款账户账号"  align="center">
            </el-table-column>
          </el-table>
      <!-- 分页 -->
          <div class="block">
            <el-pagination background style="text-align:center" 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :current-page="this.searchform.pageIndex"
             :page-sizes="[20,50,100]"  
             :page-size="this.searchform.pageSize" 
             layout="total, sizes, prev, pager, next" 
             :total="count"><!--这是显示总共有多少数据-->
            </el-pagination>
          
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
      statuss: "none",
      count:0,//总信息数
      listLoading: false,//加载样式
      pageIndex:1,//初始页
      pageSize: 50,//显示当前行的条数

      //表格数据
      tableData: [],

      searchform: {
        pageIndex:1,//初始页
        pageSize: 50,//显示当前行的条数
      }
    };
  },
  // mounted只执行一次,在模板渲染成html后调用
  mounted() {
    this.getName();//获取管理员用户名
    this.getlist();//获取用户列表
    window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          }

    
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

      // 初始每页数据数pagesize
      handleSizeChange(psize) {
        // 改变每页显示的条数
        this.searchform.pageSize = psize;
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.searchform.pageIndex =1;
        this.getlist();
      },

      // 初始页currentPage
      handleCurrentChange(pindex) {
        this.searchform.pageIndex = pindex;
        this.getlist();
      },

      // ajax异步数据交互：Vue 实例提供了 this.$http 服务可用于发送 HTTP 请求
      getlist() {
        this.listLoading=true
        this.$http
          .post(
            this.$store.state.domain +"/loanManage/passageInfo",this.searchform 
          )
          //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
          .then(  
            // Lambda写法
            response => {
              if (response.data.code == 0) {
                //请求成功回调函数
                this.tableData = response.data.detail.result.pageList;
                this.pageSize= response.data.detail.result.pageSize;
                this.pageIndex=response.data.detail.result.pageIndex;
                this.count= response.data.detail.result.count;
                this.listLoading=false;

                if(this.tableData==null)
                {
                  this.$notify({
                    message: '搜索失败，无此数据，请重新搜索。',
                    type: 'warning',
                    duration:"2000"//持续时间
                  });
                }
              } else {
              //请求失败回调函数
                // this.listLoading=false;
                // this.$message({
                //     message: response.message,
                //     type: "error"
                //   });
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
