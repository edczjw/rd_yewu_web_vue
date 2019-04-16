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

      <p class='left'>对账审核 >> 正常还款</p>

      <p class='right' @click="goBack">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>安全退出</p>

      <p class='right'>
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
          <el-form ref="searchform" :model="searchform" label-width="100%" size="mini">
            <el-row :gutter="24">
              <el-col :span="6">
                  <el-form-item label="产品" prop="channelCode">
                    <el-select v-model="searchform.channelCode" placeholder="请选择产品" clearable>
                      <!-- 从后台要的数据 -->
                    <el-option v-for="item in channellist"
                              :label="item.channelCode"
                              :key="item.channelCode"
                              :value="item.channelCode"
                          ></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
              
               <el-col :span="6">
                <el-form-item label="开始日期" prop="beginDate">
                    <el-date-picker class="shi" clearable
                      v-model="searchform.beginDate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="请选择还款日期"
                      default-time="00:00:00">
                    </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                 <el-form-item label="至" prop="endDate">
                    <el-date-picker class="shi" clearable
                      v-model="searchform.endDate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="请选择结束日期"
                      default-time="23:59:59">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="24">
                <div class="di">
                  <div class="wrapper">
                    <el-button type="primary" plain @click="search()" size="mini">
                      查询</el-button>
                      <el-button type="primary" plain @click="resetForm('searchform')" size="mini">
                      重置
                    </el-button>
                    <el-button type="primary" plain @click="getdialog()" size="mini">
                      生成
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
       
       <!-- 弹窗 -->
       <el-dialog title="生成" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="searchform">
           <el-form-item label="产品" prop="channelCode">
                    <el-select v-model="searchform.channelCode" placeholder="请选择产品" >
                      <!-- 从后台要的数据 -->
                    <el-option v-for="item in channellist" :label="item.channelCode"
                      :key="item.channelCode" :value="item.channelCode"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="到期日期">
              <el-date-picker v-model="searchform.settleDate" value-format="yyyy-MM-dd"
                type="date" placeholder="选择日期" style="width:140px!important;">
              </el-date-picker>
            </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="shengchengfile()">确 定</el-button>
        </div>
      </el-dialog>
        <!-- =============================== 展示表格数据框 =================================== -->
       
          <el-table :data="tableData"  border size="medium" stripe
          v-loading="listLoading" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%; height:100%;">
            <el-table-column prop="channelCode" label="产品" align="center">
            </el-table-column>
            <el-table-column prop="fileName" label="文件" align="center">
            </el-table-column>
            <el-table-column prop="repayTotal" label="还款金额" align="center">
            </el-table-column>
            <el-table-column prop="repayNum" label="还款笔数" width="100px" align="center">
            </el-table-column>
            <el-table-column prop="settleDate" label="到期日期" align="center">
            </el-table-column>
            <el-table-column prop="fileUpdateDate" label="生成时间" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="130px"  align="center">
            </el-table-column>
            <el-table-column  prop="operation" label="操作" align="center">
              <!-- 点击某个客户姓名查看详情 -->
              <template slot-scope="scope">
                <el-button type="text" size="small"
                 @click="operation(scope.row.channelCode,scope.row.settleDate)">
                  {{scope.row.operation}}</el-button>
              </template>
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
import {mapState} from 'vuex'

export default {
  data() {
    return {
      dialogFormVisible: false,//弹框判断显示
      
      count:0,//总信息数
      pageIndex:1,//初始页
      pageSize: 50,//显示当前行的条数
      isFullscreen: false,
      loadbutton:false,//按钮加载显示
      userName: "",
      status: "none",
      listLoading: false,
      //渠道数据容器
      channellist:[],

      //表格数据
      tableData: [],
      searchform: {
        channelCode:"",//渠道编码
        settleDate:"",//到期时间
        userId:"",//用户ID
        pageIndex:1,//初始页
        pageSize: 50,//显示当前行的条数
      },
    };
  },
  // mounted只执行一次
  mounted() {
    this.getName();//获取管理员用户名
    this.getchannellist();//获取搜索框渠道接口列表
     window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          };
      
  },
  //在模板渲染成html前调用
  created() {
    this.getlist();//获取用户列表
},
  methods: {
    //返回上一页
    lastpage(){
      window.history.go(-1);
    },
     //跳出弹框
    getdialog(){
      this.dialogFormVisible=true
    },
    //弹框确定生成文件
    shengchengfile(){
    this.dialogFormVisible=false;//关闭弹窗
    // 调用生成文件接口
     this.getfile();
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
    //生成文件的方法
    getfile(){
      if(this.searchform.channelCode=="" && this.searchform.settleDate==""){
        this.$alert('两个输入选择框都不能为空！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            //无操作
          this.dialogFormVisible=true
          }
        });
      }
      else if(this.searchform.channelCode=="" || this.searchform.settleDate==""){
        this.$alert('不能只填一个输入选择框，必须两个都填！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            //无操作
          this.dialogFormVisible=true
          }
        });
      }
      else{
          this.listLoading=true;
          this.searchform.userId = sessionStorage.getItem("userId");
          this.$http
            .post(
            this.$store.state.domain +"/loanManage/generateSettleFile", this.searchform 
            )
            .then(  
            // Lambda写法
            response => {
              //文件生成成功
                if (response.data.code == 0) {
                    this.$confirm(response.data.detail.result, response.data.msg, {
                    confirmButtonText: '确定',
                    showCancelButton:false
                }).then(() => {
                    // 确定的话就刷新列表
                      this.getlist();     
                  }).catch(() => {
                    this.$message({
                      type: 'warning',
                      message: '失败!'
                    });          
                  });
              }
              //  文件生成失败
              else if(response.data.code == 1){
                this.$alert(response.data.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.getlist();
                    }
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
            
          }
    },

    
    //点击推送和入账
    operation(channelCode,settleDate){
      //弹框判断
       this.$confirm('请确认进行此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             //将捕获到的channelCode赋值给searchform
              this.searchform.channelCode=channelCode;
              this.searchform.settleDate=settleDate;
              this.searchform.userId = sessionStorage.getItem("userId");
              this.$http
                .post(
                this.$store.state.domain +"/loanManage/settleOperate", this.searchform 
                )
                .then(  
                // Lambda写法
                response => {
                  //文件生成成功
                    if (response.data.code == 0) {
                        this.$alert(response.data.detail.result, response.data.msg, {
                        confirmButtonText: '确定',
                        callback: action => {
                          // 确定的话就刷新列表
                          this.searchform.channelCode=""
                          this.getlist();
                        }
                    });
                  }
                  //  文件生成失败
                  else if(response.data.code == 1){
                    this.$alert(response.data.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                          this.searchform.channelCode=""
                          this.getlist();
                        }
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
     
    },
    //获取时间戳
    getdate() {
          var now = new Date(),
              y = now.getFullYear(),
              m = now.getMonth() + 1,
              d = now.getDate();
          return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
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

    // 获取渠道接口列表数据
    getchannellist() {
    let data = {
      channelCd: this.searchform.channelCd
    };
    this.$http
      .post(this.$store.state.domain +"/loanManage/channel/query", data)
        .then(
        //成功
        response => {
          if (response.data.code == 0) { 
              this.channellist = response.data.detail.result;
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
          // console.log(response);
        }
      );
    },

    // ajax异步数据交互：Vue 实例提供了 this.$http 服务可用于发送 HTTP 请求
    getlist() {
    this.listLoading=true;
    this.$http
        .post(
        this.$store.state.domain +"/loanManage/getNormalSettle", this.searchform 
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
            //   this.listLoading=true;
            // //请求失败回调函数
            //   this.$message({
            //       message: response.data.msg,
            //       type: "error"
            //     });
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
