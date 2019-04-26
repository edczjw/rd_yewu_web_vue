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

      <p class='left'>支付管理 >> 放款记录</p>

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
                  <el-form-item label="客户姓名" prop="name">
                    <el-input v-model="searchform.name" clearable></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="产品" prop="channelCd">
                    <el-select v-model="searchform.channelCd" placeholder="请选择产品" 
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
                  <el-form-item label="子产品" prop="productCd">
                    <el-select v-model="searchform.productCd" placeholder="请选择子产品" clearable>
                    <!-- 从后台要的数据 -->
                    <el-option v-for="item in productlist"
                              :label="item.productCode"
                              :key="item.productCode"
                              :value="item.productCode"
                          ></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="放款金额" prop="payAmt">
                    <el-select v-model="searchform.payAmt" placeholder="请选择放款金额" clearable>
                      <el-option v-for="item in payamts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :span="6">
                  <el-form-item label="借款利率" prop="intRate">
                    <el-select v-model="searchform.intRate" placeholder="请选择借款利率" clearable>
                    <el-option v-for="item in rates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="借款期限" prop="term">
                    <el-select v-model="searchform.term" placeholder="请选择借款期限" clearable>
                      <el-option v-for="item in terms"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>

              <el-col :span="6">
                  <el-form-item label="计息方式" prop="loanType">
                    <el-select v-model="searchform.loanType" placeholder="请选择计息方式" clearable>
                    <!-- 从后台要的数据 -->
                    <el-option v-for="item in loantypelist"
                              :label="item.description"
                              :key="item.code"
                              :value="item.code"
                          ></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>

              <el-col :span="6">
                  <el-form-item label="放款状态" prop="payOrderStatus">
                    <el-select v-model="searchform.payOrderStatus" placeholder="请选择放款状态" clearable>
                    <!-- 从后台要的数据 -->
                    <el-option v-for="item in PayOrderStatusList"
                              :label="item.description"
                              :key="item.code"
                              :value="item.code"
                          ></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="到账日期" prop="beginDate">
                    <!-- <el-date-picker v-model="searchform.startDate" value-format="yyyy-MM-dd" 
                    type="date" placeholder="开始日期">
                    </el-date-picker> -->
                    <el-date-picker class="shi" clearable
                      v-model="searchform.beginDate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="到账日期"
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

        <div class="cen-box">
        <div class="dl-center">
          <el-col :span="6">
            <el-tag type="danger" size="mini">放款总金额（元）：{{allmoney}}</el-tag>
          </el-col>
        </div>

        <div class="dr-center">
          <a id="downlink"></a>
          <el-col :span="6">
                <el-button type="success" plain @click="exportExcel('放款记录表')" size="mini">
                  导出Excel表</el-button>
          </el-col>
        </div>
        </div>

        <!-- =============================== 展示表格数据框 =================================== -->
       
          <el-table :data="tableData"  border size="medium" stripe
          v-loading="listLoading" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%; height:100%;">
          <el-table-column prop="borrowTime" label="到账日期" align="center">
            </el-table-column>
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
            <!-- <el-table-column v-if="show" prop="processNo" label="案件号" align="center">
            </el-table-column> -->
            <!-- <el-table-column prop="channelCode" label="进件渠道" width="100" align="center">
            </el-table-column> -->
            <el-table-column prop="productCode" label="子产品" width="140" align="center">
            </el-table-column>
            <el-table-column prop="payAmt" label="放款金额" width="120" align="center">
            </el-table-column>
            <el-table-column prop="intRate" label="借款利率" width="100" align="center">
            </el-table-column>
            <el-table-column prop="term" label="借款期限" width="80" align="center">
            </el-table-column>
            
            <el-table-column prop="loanType" label="计息方式" width="140" align="center">
            </el-table-column>
            <el-table-column prop="payOrderStatus" label="放款状态" width="100" align="center">
            </el-table-column>
            <el-table-column prop="loanPmtDueDate" label="到期还款日" align="center">
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

// 引入xlsx
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

//引入vuex
import {mapState} from 'vuex'

export default {
  data() {
    return {
      isFullscreen: false,
      show:false,//隐藏案件号

      //利率范围
      rates:[{
        value:"A",
        label:"低于0.83%(含)"
      },
      {
        value:"B",
        label:"介于0.83%-1.25%(含)"
      },
      {
        value:"C",
        label:"介于1.25%-1.67%(含)"
      },
      {
        value:"D",
        label:"介于1.67%-2.08%(含)"
      },
      {
        value:"E",
        label:"高于2.08%"
      }],

      //放款金额范围
      payamts:[{
        value:"A",
        label:"5万元(含)以下"
      },
      {
        value:"B",
        label:"5万元-10万元(含)"
      },
      {
        value:"C",
        label:"10万元-50万元(含)"
      },
      {
        value:"D",
        label:"50万元-100万元(含)"
      },
      {
        value:"E",
        label:"100万元以上"
      }],

      //借款期限范围
      terms:[{
        value:"A",
        label:"3个月(含)以内"
      },
      {
        value:"B",
        label:"3-6个月(含)"
      },
      {
        value:"C",
        label:"6-12个月(含)"
      },
      {
        value:"D",
        label:"12个月以上"
      }],

      userName: "",
      status: "none",
      listLoading: false,
      pageIndex:1,//初始页
      pageSize: 50,//显示当前行的条数
      allmoney:0,
      count:0,//总信息数

      //渠道数据容器
      channellist:[],

      //产品接口容器
      productlist:[],

      //计息方式容器
      loantypelist:[],

      //放款状态容器
      PayOrderStatusList:[],

      //表格数据
      tableData: [],

      searchform: {
        // name: "",//客户姓名
        // channelCd: "",//进件渠道
        productCd: "",//渠道产品
        loanType: "",//计息方式
        term:"",//借款期限
        termBegin:"",//贷款开始期限
        termEnd:"",//贷款结束期限
        intRate:"",//借款利率
        intRateBegin:"",
        intRateEnd:"",
        payChannel:"",//支付渠道
        payAmt:"",//放款金额
        payOrderStatus:"S",//放款状态
        payAmtBegin:"",//开始放款金额
        payAmtEnd:"",//结束放款时间
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

    this.getloantypelist();//获取计息方式方法

    this.getPayOrderStatusList();//获取放款状态方法
    this.getRate();//判断利率
    this.getTerm();//判断期限
    this.getloan();//判断放款
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
    // 导出excel
    exportExcel(filename){
        const url = this.$store.state.domain +"/loanManage/loanPayExport";
                this.$http.post(url, this.searchform , {
                    responseType: 'blob'
                }).then(res => {
                    let blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    })
                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob);
                    } else {
                        let elink = document.createElement('a');
                        elink.download = filename+'_'+this.getdate()+".xls";
                        // console.log(this.getdate())
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
          return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
      },

    //获取放款状态
      getPayOrderStatusList(){
          let data = {
            payOrderStatus: this.searchform.payOrderStatus
          };
          this.$http
            .post(this.$store.state.domain +"/loanManage/getPayOrderStatus", data)
              .then(
              //成功
              response => {
                if (response.data.code == 0) { 
                    this.PayOrderStatusList = response.data.detail.result;
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
      // let adminhostidcookie=this.$cookies.get('adminhostid');//获取本地缓存cookie1
      // let admintcookie=this.$cookies.get('admint');//获取本地缓存cookie2
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

      //获取计息方式
      getloantypelist(){
          let data = {
            loanType: this.searchform.loanType
          };
          this.$http
            .post(this.$store.state.domain +"/loanManage/getLoanType", data)
              .then(
              //成功
              response => {
                if (response.data.code == 0) { 
                    this.loantypelist = response.data.detail.result;
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

      // 新版导出excel表方法
      // exportExcel () {
      //     /* generate workbook object from table */
      //     var wb = XLSX.utils.table_to_book(document.querySelector('#app'))
      //     /* get binary string as output */
      //     var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      //     try {
      //         FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '放款记录.xlsx')
      //     } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      //     return wbout
      // },

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
        this.getRate();
        this.getTerm();
        this.getloan();
        this.getlist();

      },
      // 重置功能
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.productlist="";
        this.searchform.beginDate="";
        this.searchform.endDate="";
        this.searchform.payOrderStatus="";
        this.getRate();
        this.getTerm();
        this.getloan();
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
        }else if(channelCode=="M017"){
            this.$router.push("/users/detailyunkedai?processNo=" + processNo);
        }
        else if(channelCode=="M019"){
            this.$router.push("/users/detailxiaoye?processNo=" + processNo);
        }else if(channelCode=="M018"){
            this.$router.push("/users/detailbaiduo?processNo=" + processNo);
        }
        else if(channelCode=="M009"){
            this.$router.push("/users/detailjiarongbao?processNo=" + processNo);
        }else if(channelCode=="M020"){
            this.$router.push("/users/detailchangsheng?processNo=" + processNo);
        }else{
            this.$router.push("/users/detaillinyi?processNo=" + processNo);
        }
      },

      // ajax异步数据交互：Vue 实例提供了 this.$http 服务可用于发送 HTTP 请求
      getlist() {
        this.listLoading=true;
        this.$http
          .post(
            this.$store.state.domain +"/loanManage/loanPay", this.searchform 
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
                if(response.data.detail.result.params==null){
                  this.allmoney=0;
                }
                else{
                  this.allmoney = response.data.detail.result.params.payAmtTotal;
                }
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

      //判断
    getRate(){
      if(this.searchform.intRate=="A"){
          this.searchform.intRateBegin=0;
          this.searchform.intRateEnd=0.0083;
        }
        else if(this.searchform.intRate=="B"){
          this.searchform.intRateBegin=0.0083;
          this.searchform.intRateEnd=0.0125;
        }
        else if(this.searchform.intRate=="C"){
          this.searchform.intRateBegin=0.0125;
          this.searchform.intRateEnd=0.0167;
        }
        else if(this.searchform.intRate=="D"){
          this.searchform.intRateBegin=0.0167;
          this.searchform.intRateEnd=0.0208;
        }
        else if(this.searchform.intRate=="E"){
          this.searchform.intRateBegin=0.0208;
          this.searchform.intRateEnd="";
        }
        else{
          this.searchform.intRateBegin="";
          this.searchform.intRateEnd="";
        }
        return;

    },
    getTerm(){
      if(this.searchform.term=="A"){
          this.searchform.termBegin=0;
          this.searchform.termEnd=3;
        }
        else if(this.searchform.term=="B"){
          this.searchform.termBegin=3;
          this.searchform.termEnd=6;
        }
        else if(this.searchform.term=="C"){
          this.searchform.termBegin=6;
          this.searchform.termEnd=12;
        }
        else if(this.searchform.term=="D"){
          this.searchform.termBegin=12;
          this.searchform.termEnd="";
        }
        else{
          this.searchform.termBegin="";
          this.searchform.termEnd="";
        }
    },
    getloan(){
        if(this.searchform.payAmt=="A"){
          this.searchform.payAmtBegin=0;
          this.searchform.payAmtEnd=50000;
        }
        else if(this.searchform.payAmt=="B"){
          this.searchform.payAmtBegin=50000;
          this.searchform.payAmtEnd=100000;
        }
        else if(this.searchform.payAmt=="C"){
          this.searchform.payAmtBegin=100000;
          this.searchform.payAmtEnd=500000;
        }
        else if(this.searchform.payAmt=="D"){
          this.searchform.payAmtBegin=500000;
          this.searchform.payAmtEnd=1000000;
        }
        else if(this.searchform.payAmt=="E"){
          this.searchform.payAmtBegin=1000000;
          this.searchform.payAmtEnd="";
        }
        else{
          this.searchform.payAmtBegin="";
          this.searchform.payAmtEnd="";
        }
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
