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

      <p class='left'>审核管理 >> 案件信息</p>

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
                  <el-form-item label="案件号" prop="processNo">
                    <el-input v-model="searchform.processNo" clearable></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="客户姓名" prop="name">
                    <el-input v-model="searchform.name" clearable></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="手机号" prop="cellphone">
                    <el-input v-model="searchform.cellphone" clearable></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="身份证号" prop="idNo">
                    <el-input v-model="searchform.idNo" clearable></el-input> 
                  </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :span="6">
                  <el-form-item label="产品" prop="channelCd">
                    <el-select v-model="searchform.channelCd" placeholder="请选择产品" 
                    @change="selChange($event)" clearable>
                    <el-option v-for="item in channellist"
                        :key="item.channelCode"
                        :label="item.channelCode"
                        :value="item.channelCode"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="子产品" prop="productCd">
                    <el-select v-model="searchform.productCd" placeholder="请选择子产品" clearable>
                      <el-option v-for="item in productlist"
                        :key="item.productCode"
                        :label="item.productCode"
                        :value="item.productCode"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>

              <el-col :span="6">
                  <el-form-item label="审批结果" prop="approveStatusType">
                    <el-select v-model="searchform.approveStatusType" placeholder="请选择审批结果" clearable>
                    <!-- 从后台要的数据 -->
                    <el-option v-for="item in approvalStatusCodelist"
                              :label="item.desc"
                              :key="item.type"
                              :value="item.type"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="审批日期" prop="beginDate">
                    <el-date-picker class="shi" clearable
                      v-model="searchform.beginDate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="开始日期"
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
                      placeholder="结束日期"
                      default-time="23:59:59">
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
            <el-table-column prop="processNo" label="案件号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="客户姓名" width="80" align="center">
              <!-- 点击某个客户姓名查看详情 -->
              <template slot-scope="scope">
                <el-button type="text" size="small"
                 @click="gouserdetail(scope.row.processNo,scope.row.channelCode)">
                  {{scope.row.name}}</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="channelCode" label="渠道" width="100" align="center">
            </el-table-column> -->
            <el-table-column prop="productCode" label="子产品" width="100" align="center">
            </el-table-column>
            <el-table-column prop="preApproveMoney" label="审批额度" width="100" align="center">
            </el-table-column>
            <el-table-column prop="preApproveTerm" label="审批借款期限" width="110" align="center">
            </el-table-column>
            <el-table-column prop="preApproveMonthRate" label="月利率" width="90" align="center">
            </el-table-column>
            <el-table-column prop="preApproveRepayMethod" label="还款方式" width="170" align="center">
            </el-table-column>
            <el-table-column prop="status" label="审批结果" width="80" align="center">
            </el-table-column>
            <el-table-column prop="refuseReason" label="拒绝原因" width="210" align="center">
            </el-table-column>
            <el-table-column prop="approveTime" label="审批时间"  align="center">
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

      //渠道数据容器
      channellist:[],

      //产品接口容器
      productlist:[],

      //审批结果接口容器
      approvalStatusCodelist:[],

      //表格数据
      tableData: [],

      searchform: {
        // processNo:"",//案件号
        // name:"",//客户姓名
        // cellphone:"",//手机号
        // idNo:"",//身份证号
        channelCd: "",//进件渠道
        productCd: "",//渠道产品
        approveStatusType:"",//审批结果
        beginDate: "",//开始时间
        endDate: "",//至
        pageIndex:1,//初始页
        pageSize: 50,//显示当前行的条数
      }
    };
  },
  // mounted只执行一次,在模板渲染成html后调用
  mounted() {
    this.getName();//获取管理员用户名
    
    this.getchannellist();//获取搜索框渠道接口列表

    this.getapprovalStatusCodelist();//获取审批结果接口方法
    window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          }

    // this.getlist();//获取用户列表
    
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

    //获取审批结果方法
    getapprovalStatusCodelist(){
        let data = {
        approveStatusType: this.searchform.approveStatusType
      };
      this.$http
        .post(this.$store.state.domain +"/loanManage/getStatusType", data)
          .then(
          //成功
          response => {
            if (response.data.code == 0) { 
                this.approvalStatusCodelist = response.data.detail.result;
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

    //实现下拉框二级联动
    selChange(val){
      let data = {
        productCd: this.searchform.productCd
      };
      this.$http
        .post(this.$store.state.domain +"/loanManage/product/query", data)
          .then(
          //成功
          response => {
            if (response.data.code == 0) { 
                let productlists = response.data.detail.result;
                //遍历
                for (var vals of productlists){
                  if (val == vals.channelCd){
                    this.productlist=vals.list;
                  }
                }
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

    //独自获取所有渠道产品列表
      getproductlist(){
      let data = {
        productCd: this.searchform.productCd
      };
      this.$http
        .post(this.$store.state.domain +"/loanManage/product/query", data)
          .then(
          //成功
          response => {
            if (response.data.code == 0) { 
                let productlists = response.data.detail.result;
                //遍历
                for (var vals of productlists){
                  for(var x of vals.list){
                    this.productlist.push(x);
                  }
                }
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
        this.productlist="";
        // this.getlist();
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

      // 点击用户名跳转至详情页
      gouserdetail(processNo,channelCode) {
        //判断跳转
        if(channelCode=="WHZHWS"){
            this.$router.push("/users/detailwanshang?processNo=" + processNo);
        }
        else if(channelCode=="SDLY"){
            this.$router.push("/users/detaillinyi?processNo=" + processNo);
        }else if(channelCode=="BJHY"){
            this.$router.push("/users/detailhuayu?processNo=" + processNo);
        }else if(channelCode=="BJZH"){
            this.$router.push("/users/detailzhonghe?processNo=" + processNo);
        }else if(channelCode=="M008"){
            this.$router.push("/users/detailhuayu?processNo=" + processNo);
        }else if(channelCode=="M012"){
            this.$router.push("/users/detailshenshengrong?processNo=" + processNo);
        }else if(channelCode=="M015"){
            this.$router.push("/users/detailguhe?processNo=" + processNo);
        }else if(channelCode=="M016"){
            this.$router.push("/users/detailqianhai?processNo=" + processNo);
        }
        else if(channelCode=="M017"){
            this.$router.push("/users/detailyunkedai?processNo=" + processNo);
        }
        else if(channelCode=="M019"){
            this.$router.push("/users/detailxiaoye?processNo=" + processNo);
        }
        else if(channelCode=="M018"){
            this.$router.push("/users/detailbaiduo?processNo=" + processNo);
        }
        else if(channelCode=="M009"){
            this.$router.push("/users/detailjiarongbao?processNo=" + processNo);
        }
        else if(channelCode=="M020"){
            this.$router.push("/users/detailchangsheng?processNo=" + processNo);
        }else{
            this.$router.push("/users/detaillinyi?processNo=" + processNo);
        }
      },

      // ajax异步数据交互：Vue 实例提供了 this.$http 服务可用于发送 HTTP 请求
      getlist() {
        this.listLoading=true
        this.$http
          .post(
            this.$store.state.domain +"/loanManage/caseList",this.searchform 
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
