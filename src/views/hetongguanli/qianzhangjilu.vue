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

      <p class='left'>合同管理 >> 签章记录</p>

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

        <div class="searcharea">
          <!-- el-form接收一个model，必须配合el-form-item一起使用，并且在el-form-item上绑定prop属性 -->
          <el-form ref="searchform" :model="searchform" label-width="100%" size="mini">
            <el-row :gutter="30">
              <el-col :span="6">
                  <el-form-item label="签署名称" prop="signatory">
                    <el-input v-model="searchform.signatory" placeholder="名称" clearable></el-input>
                  </el-form-item>
              </el-col>

              <el-col :span="6">
                  <el-form-item label="合同号" prop="contractNo">
                    <el-input v-model="searchform.contractNo" placeholder="合同号" clearable></el-input>
                  </el-form-item>
              </el-col>

              <el-col :span="6">
                  <el-form-item label="产品" prop="channelCode">
                    <el-select v-model="searchform.channelCode" placeholder="请选择产品" 
                    @change="selChange($event)" clearable>
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
                  <el-form-item label="子产品" prop="productCode">
                    <el-select v-model="searchform.productCode" placeholder="请选择子产品" clearable>
                    <!-- 从后台要的数据 -->
                    <el-option v-for="item in productlist"
                              :label="item.productCode"
                              :key="item.productCode"
                              :value="item.productCode"
                          ></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="签署时间" prop="beginDate">
                    <!-- <el-date-picker v-model="searchform.startDate" value-format="yyyy-MM-dd" 
                    type="date" placeholder="开始日期">
                    </el-date-picker> -->
                    <el-date-picker class="shi" clearable
                      v-model="searchform.beginDate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="开始时间"
                      default-time="00:00:00">
                    </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="至" prop="endDate">
                  <!-- <el-date-picker v-model="searchform.endDate" value-format="yyyy-MM-dd" 
                  type="date" placeholder="结束日期">
                  </el-date-picker> -->
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

        <!-- <div class="cen-box">
        <div class="dl-center">
          <el-col :span="6">
            <el-tag type="danger" size="mini">查询结果客户签署次数：{{allmoney}}</el-tag>
          </el-col>
        </div>

        <div class="dr-center">
          <el-col :span="6">
                <el-tag type="danger" size="mini">查询结果企业签署次数：{{allmoney}}</el-tag>
          </el-col>
        </div>
        </div> -->

        <!-- =============================== 展示表格数据框 =================================== -->
       
          <el-table :data="tableData"  border size="medium" stripe
          v-loading="listLoading" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%; height:100%;">
            <el-table-column prop="contractNo" label="合同号" align="center">
            </el-table-column>
            <el-table-column prop="signId" label="签署ID" width="220" align="center">
            </el-table-column>
            <el-table-column prop="signatory" label="签署名称" width="110" align="center">
              <template slot-scope="scope">
                {{checkstring(scope.row.signatory)}}
              </template>
            </el-table-column>
            <el-table-column prop="channelCode" label="产品" width="190" align="center">
            </el-table-column>
            <el-table-column prop="productCode" label="子产品" width="140" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="签署时间" width="270" align="center">
            </el-table-column>
            <el-table-column prop="signDetailUrl" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" 
                @click="gotourl(scope.row.signDetailUrl)">
                  查看</el-button>
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
</template>
<script>
// 时间格式化：数据库中往往存储的是时间的毫秒形式，这样在页面上可以操控显示时间的格式
import {formatDate} from '../../common/date.js';
import screenfull from 'screenfull'

// 引入xlsx
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

//引入vuex
import {mapState} from 'vuex'

export default {
  data() {
    return {
      isFullscreen: false,

      userName: "",
      listLoading: false,
      pageIndex:1,//初始页
      pageSize: 50,//显示当前行的条数
      // allmoney:0,
      count:0,//总信息数

      //渠道数据容器
      channellist:[],

      //产品接口容器
      productlist:[],

      //表格数据
      tableData: [],

      searchform: {
        signatory:"",//名称
        contractNo:"",//合同号
        // channelCode:"",//渠道号
        productCode: "",//产品号
        beginDate: new Date().toLocaleDateString()+" 00:00:00",//开始时间
        endDate: new Date().toLocaleDateString()+" 23:59:59",//至
        pageIndex: 1,
        pageSize : 50,
      },
      
    };
  },
  // mounted只执行一次
  mounted() {
    this.getName();//获取管理员用户名
    this.getchannellist();//获取搜索框渠道接口列表

    // this.getproductlist();//获取渠道产品接口方法
    // this.checkstring();//判断字符串长度
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
    checkstring(str){
        if(str!=null || str!=""){
          if(str.length>4){
          return str.toString().substring(0,4)+"……";
        }else{
          return str;
        }
      }
    },
    gotourl(url){
      window.open(url);
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

    //实现下拉框二级联动
    selChange(val){
      let data = {
        productCd: this.searchform.productCode
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
      // let adminhostidcookie=this.$cookies.get('adminhostid');//获取本地缓存cookie1
      // let admintcookie=this.$cookies.get('admint');//获取本地缓存cookie2
      getchannellist() {
      let data = {
        channelCd: this.searchform.channelCode
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
        productCd: this.searchform.productCode
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
        this.searchform.beginDate="";
        this.searchform.endDate="";
        // this.getlist();
      },
      // 初始每页数据数pagesize
      handleSizeChange(psize) {
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
        this.listLoading=true;
        this.$http
          .post(
            this.$store.state.domain +"/loanManage/loanSignature", this.searchform 
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
                this.count=response.data.detail.result.count;
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
                this.checkstring();//判断字符串长度

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
