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

      <p class='left'>对账审核 >> 提前结清</p>

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
            <el-row :gutter="30">
              <el-col :span="6">
                  <el-form-item label="产品" prop="channelCode">
                    <el-select v-model="searchform.channelCode" placeholder="请选择产品" clearable >
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
                <el-form-item label="还款日期" prop="startDate">
                    <el-date-picker class="shi" clearable
                      v-model="searchform.startDate"
                      value-format="yyyyMMdd"
                      type="date"
                      placeholder="请选择还款日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                 <el-form-item label="至" prop="endDate">
                    <el-date-picker class="shi" clearable
                      v-model="searchform.endDate"
                      value-format="yyyyMMdd"
                      type="date"
                      placeholder="请选择结束日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

              <el-row :gutter="30">
              <el-col :span="12">
                <div class="di">
                  <div class="wrapper">
                    <el-button type="primary" plain @click="search()" size="mini">
                      查询</el-button>
                      <el-button type="primary" plain @click="resetForm('searchform')" size="mini">
                      重置
                    </el-button>
                    <el-button type="primary" plain @click="getdialog()" size="mini">
                      检索
                    </el-button>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <el-button size="small" 
                :type="jiaoyan? '':'success'" 
                :loading="loadbutton" :disabled="jiaoyan"
                @click="checkfile()">校验</el-button>

                <el-button size="small" 
                :type="jiaoyanqueren? '':'success'"  
                :loading="loadbutton" :disabled="jiaoyanqueren"
                @click="checkfinish()">校验确认</el-button>

                <el-button size="small" 
                :type="ruzhangqueren? '':'success'"  
                :loading="loadbutton" :disabled="ruzhangqueren"
                @click="excute()">入账确认</el-button>
                </el-col>
            </el-row>
          </el-form>
        </div>

         <!-- 弹窗 -->
       <el-dialog title="检索" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="searchform">
           <el-form-item label="产品"
            prop="channelCode">
                    <el-select v-model="searchform.channelCode" placeholder="请选择产品" >
                      <!-- 从后台要的数据 -->
                    <el-option v-for="item in channellist" :label="item.channelCode"
                      :key="item.channelCode" :value="item.channelCode"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="结清日期">
              <el-date-picker v-model="searchform.fileDate" value-format="yyyyMMdd"
                type="date" placeholder="选择日期" style="width:140px!important;">
              </el-date-picker>
            </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="jiansuo()">确 定</el-button>
        </div>
      </el-dialog>
        <!-- =============================== 展示表格数据框 =================================== -->
       <!-- @select="handleSelectionChange" @current-change="handleCurrentChange"-->
          <el-table :data="tableData"  border size="medium" stripe ref="multipleTable"
          v-loading="listLoading" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)" 
          @row-click="showRow"  highlight-current-row 
          @current-change="handleCurrentChanges"
          style="width: 100%; height:100%;">
            <el-table-column width="35">

            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>

            </el-table-column>
            <el-table-column prop="channelCode" label="产品" width="100px" align="center">
            </el-table-column>
            <el-table-column prop="fileType" label="类型" width="100px" align="center">
            </el-table-column>
            <el-table-column prop="fileName" label="文件" align="center">
            </el-table-column>
            <el-table-column prop="totalMoney" label="还款金额" align="center">
            </el-table-column>
            <el-table-column prop="totalCount" label="还款笔数" align="center">
            </el-table-column>
            <el-table-column prop="fileDate" label="日期" align="center">
            </el-table-column>
            <el-table-column prop="fileId" label="ID" width="100px" v-if=idshow  align="center">
            </el-table-column>
            <el-table-column prop="fileStatus" label="状态"  align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.fileStatus == 'Not'">未处理</span>
                <span v-else-if="scope.row.fileStatus == 'In'">处理中</span>
                <span v-else-if="scope.row.fileStatus == 'Exception'">处理异常</span>
                <span v-else-if="scope.row.fileStatus == 'Reject'">校验拒绝</span>
                <span v-else-if="scope.row.fileStatus == 'Pass'">校验通过</span>
                <span v-else-if="scope.row.fileStatus == 'Check'">校验确认</span>
                <span v-else-if="scope.row.fileStatus == 'Fail'">入账失败</span>
                <span v-else-if="scope.row.fileStatus == 'Success'">入账成功</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="checktime" label="校验时间" align="center">
            </el-table-column> -->
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
      radio: '',
      idshow:false,//隐藏ID
      isFullscreen: false,
      loadbutton:false,//按钮加载判断
      jiaoyan:true,//校验按钮是否禁用
      jiaoyanqueren:true,//校验确认按钮是否禁用
      ruzhangqueren:true,//入账确认按钮是否禁用
      checkresult:"成功",//校验结果
      active: 0,//步骤条
      count:0,//总信息数
      pageIndex:1,//初始页
      pageSize: 50,//显示当前行的条数
      userName: "",
      status: "none",
      listLoading: false,
      dialogFormVisible:false,//弹框
      //渠道数据容器
      channellist:[],

      //表格数据
      tableData: [],

      searchform: {
        channelCode:"",//渠道
        startDate:"",//还款日期
        endDate:"",//结束日期
        fileDate:"",//结清日期
        fileId:"",//id
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
},

  methods: {
    //返回上一页
    lastpage(){
      window.history.go(-1);
    },
    //某一行被点击时
    showRow(row) {
      if(row!=""){
        
      //赋值给radio
      this.radio = this.tableData.indexOf(row); 
      //获取单选行的id  
      this.getCurrentRow(this.tableData[this.tableData.indexOf(row)].fileStatus,this.tableData[this.tableData.indexOf(row)].fileId,this.tableData[this.tableData.indexOf(row)].channelCode);
      
      }
  },
    handleCurrentChanges(currentRow, oldCurrentRow){
          this.currentRow = currentRow;
           //获取单选行的id  
      this.getCurrentRow(this.tableData[this.tableData.indexOf(currentRow)].fileStatus,this.tableData[this.tableData.indexOf(currentRow)].fileId,this.tableData[this.tableData.indexOf(currentRow)].channelCode);
      
      },
    //跳出弹框
    getdialog(){
      this.dialogFormVisible=true
    },

    getCurrentRow(val,valid,valcode) {
      // console.log(val)//描述
      // console.log(valid)
      // console.log(valcode)
      if(val!=null){
        // 校验
        //获取该行的某个数据//写到这里需要明天要再加写一个渠道
        this.searchform.fileId=valid;
        this.searchform.channelCode=valcode;
        if(val=="Not"){
            this.jiaoyan=false;
            this.jiaoyanqueren=true;
            this.ruzhangqueren=true;
          }
          else if(val=="In" || val=="Success" || val=="Exception"  || val=="Reject" ){
            this.jiaoyan=true;
            this.jiaoyanqueren=true;
            this.ruzhangqueren=true;
          }
          else if(val=="Check" || val=="Fail"){
            this.jiaoyan=true;
            this.jiaoyanqueren=true;
            this.ruzhangqueren=false;
          }
          else if(val=="Pass"){
            this.jiaoyan=true;
            this.jiaoyanqueren=false;
            this.ruzhangqueren=true;
          }
       this.searchform.fileDate="";//时间置空
      }else if(val==null){
        //获取该行的某个数据
        this.searchform.fileId = "";
        this.jiaoyan=true;//校验禁止点击
        this.jiaoyanqueren=true;//校验确认禁止点击
        this.ruzhangqueren=true;//入账确认禁止点击
      }
   },

    //校验
    checkfile(){
       this.$confirm('请确认进行校验操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
          .post(
          this.$store.state.domain +"/earlySettleFile/check", this.searchform)
          //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
          .then(  
          // Lambda写法
          response => {
               if(response.data.code == 0){
                 this.$confirm(response.data.msg, '校验结果', {
                  confirmButtonText: '确定',
                  showCancelButton:false
                }).then(() => {
                    this.jiaoyan=true;
                    this.jiaoyanqueren=true;
                    this.ruzhangqueren=true;
                  }).catch(() => {
                    //无操作          
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

    //校验确认
    checkfinish(){
      this.$confirm('请确认进行校验确认操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$http
              .post(
              this.$store.state.domain +"/earlySettleFile/checkConfirm", this.searchform)
              //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
              .then(  
              // Lambda写法
              response => {
                  if(response.data.code == 0){
                    this.$confirm(response.data.msg, '校验确认结果', {
                      confirmButtonText: '确定',
                      showCancelButton:false
                    }).then(() => {
                      this.jiaoyan=true;
                      this.jiaoyanqueren=true;
                      this.ruzhangqueren=true;
                      }).catch(() => {
                        //无操作          
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

    //入账确认
    excute(){
      this.$confirm('请确认进行入账确认操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http
                .post(
                this.$store.state.domain +"/earlySettleFile/confirm", this.searchform)
                //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
                .then(  
                // Lambda写法
                response => {
                    if(response.data.code == 0){
                      this.$confirm(response.data.msg, '校验确认结果', {
                        confirmButtonText: '确定',
                        showCancelButton:false
                      }).then(() => {
                        this.jiaoyan=true;
                        this.jiaoyanqueren=true;
                        this.ruzhangqueren=true;
                        }).catch(() => {
                          //无操作          
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
    // 初始每页数据数pagesize
      handleSizeChange(psize) {
        // 改变每页显示的条数
        this.searchform.pageSize = psize;
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.searchform.pageIndex =1;
        this.search();
      },

      // 初始页currentPage
      handleCurrentChange(pindex) {
        this.searchform.pageIndex = pindex;
        this.search();
      },
    // 搜索功能
    search() {
     this.listLoading=true;
     this.searchform.fileId=""
     this.radio=""//禁用选择
     //禁用按钮
     this.jiaoyan=true;
     this.jiaoyanqueren=true;
     this.ruzhangqueren=true;
      this.$http
          .post(
          this.$store.state.domain +"/earlySettleFile/query", this.searchform)
          //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
          .then(  
          // Lambda写法
          response => {
               if(response.data.code == 0){
                 //请求成功回调函数
                this.tableData = response.data.result;
                this.pageSize= response.data.pageSize;
                this.pageIndex=response.data.pageIndex;
                this.count= response.data.total;
                this.listLoading=false; 

                if(this.tableData==null)
                {
                    this.$notify({
                    message: '搜索失败，无此数据，请重新搜索。',
                    type: 'warning',
                    duration:"2000"//持续时间
                    });
                }
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
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 检索功能
    jiansuo(){
      if(this.searchform.channelCode=="" && this.searchform.fileDate==""){
        this.$alert('两个输入选择框都不能为空！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            //无操作
          this.dialogFormVisible=true
          }
        });
      }
      else if(this.searchform.channelCode=="" || this.searchform.fileDate==""){
        this.$alert('不能只填一个输入选择框，必须两个都填！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            //无操作
          this.dialogFormVisible=true
          }
        });
      }
      else{
            this.dialogFormVisible=false;//关闭弹窗
            //禁用按钮
            this.jiaoyan=true;
            this.jiaoyanqueren=true;
            this.ruzhangqueren=true;
            this.listLoading=true;
            this.$http
                .post(
                this.$store.state.domain +"/earlySettleFile/search", this.searchform)
                //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
                .then(  
                // Lambda写法
                response => {
                    if (response.data.code ==0) {
                    //请求成功回调函数
                    this.tableData = response.data.result;
                    
                    this.pageSize= response.data.pageSize;
                    this.pageIndex=response.data.pageIndex;
                    this.count= response.data.total;
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
                      this.listLoading=false;
                    //请求失败回调函数
                      this.$message({
                          message: response.data.msg,
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
      }

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
