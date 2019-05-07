<template>
  <div v-if="userName==this.$store.state.nameler?false:true">
    <div class="topBanner">

      <el-tooltip class="item" effect="light" content="展开缩进" placement="bottom">
      <p class='tog' @click="togglemenu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhankai1"></use>
        </svg></p>
      </el-tooltip>

      <p class='left'>支付管理 >> 还款记录</p>
      
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
          <el-form ref="searchform" :model="searchform" label-width="100%" size="mini">
            <el-row :gutter="30">

              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="客户姓名" prop="name">
                    <el-input v-model="searchform.name" clearable></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="产品" prop="channelCd">
                  <el-select v-model="searchform.channelCd" placeholder="请选择产品" clearable
                  @change="selChange($event)">
                      <!-- 从后台要的数据 -->
                    <el-option v-for="item in channellist"
                              :label="item.channelCode"
                              :key="item.channelCode"
                              :value="item.channelCode"
                          ></el-option>
                  </el-select>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content bg-purple">
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
                </div>
              </el-col>

            <!-- <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="还款渠道" prop="repayType">
                  <el-select v-model="searchform.repayType" placeholder="请选择还款渠道"> -->
                    <!-- 从后台要的数据 -->
                    <!-- <el-option v-for="item in payChannellist"
                              :label="item.desc"
                              :key="item.type"
                              :value="item.type"
                          ></el-option>
                  </el-select>
                  </el-form-item>
                </div>
              </el-col> -->
            </el-row>

            <el-row :gutter="30">

              <el-col :span="6">
                  <el-form-item label="还款状态" prop="repayStatus">
                    <el-select v-model="searchform.repayStatus" placeholder="请选择还款状态" clearable>
                    <!-- 从后台要的数据 -->
                    <el-option v-for="item in RepayStatusList"
                              :label="item.description"
                              :key="item.code"
                              :value="item.code"
                          ></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="还款日期" prop="beginDate">
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
                  <span class="wrapper">
                    <!-- 表述按钮颜色 -->
                    <el-button type="primary" plain @click="search()" size="mini">
                      搜索</el-button>
                    <el-button type="primary" plain @click="resetForm('searchform')" size="mini">
                      重置
                    </el-button>
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        
        <div class="cen-box">
        <div class="dl-center">
          <el-col :span="6">
                 <el-tag type="danger" size="mini">还款总金额（元）：{{allmoney}}</el-tag>
          </el-col>
        </div>

        <div class="dr-center">
          <a id="downlink"></a>
          <el-col :span="6">
                <el-button type="success" plain @click="exportExcel('还款记录表')" size="mini">
                  导出Excel表</el-button>
          </el-col>
        </div>

        </div>

        <!-- 展示表格数据框 -->
          <el-table :data="tableData" v-loading="listLoading" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          size="medium" stripe 
          border style="width: 100%;height:100%;">
          <el-table-column prop="processNo" label="案件号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="客户姓名" align="center">
              <!-- 点击查看详情 -->
              <template slot-scope="scope">
                <el-button type="text" size="small" 
                @click="gouserdetail(scope.row.processNo,scope.row.channelCode)">
                  {{scope.row.name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column v-if="show" prop="processNo" label="案件号" align="center">
            </el-table-column>

            <!-- <el-table-column prop="channelCode" label="进件渠道" align="center">
            </el-table-column> -->
            <el-table-column prop="productCode" label="子产品" align="center">
            </el-table-column>
            <el-table-column prop="actualPrin" label="还款本金" align="center">
            </el-table-column>
            <el-table-column prop="actualInt" label="还款利息" align="center">
            </el-table-column>
            <el-table-column prop="repayAmt" label="还款金额合计" align="center">
            </el-table-column>
            <!-- <el-table-column prop="repayType" label="还款渠道" align="center">
            </el-table-column> -->
            <!-- <el-table-column prop="statementType" label="还款方式" align="center">
            </el-table-column> -->
            <el-table-column prop="repayStatus" label="还款状态" align="center">
            </el-table-column>
            <el-table-column prop="repayTime" label="还款日期"  align="center">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination background style="text-align:center"
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :current-page="this.searchform.pageIndex" 
            :page-sizes="[20,50,100]" 
            :page-size="this.searchform.pageSize" 
            layout="total, sizes, prev, pager, next" 
            :total="count">
            </el-pagination>
          </div>
</div>
  </div>
</template>
<script>
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
      userName: "",
      listLoading: false,
      status: "none",
      allmoney:0,

      //渠道数据容器
      channellist:[],

      //产品接口容器
      productlist:[],

      //支付渠道列表
      payChannellist:[],

      //还款状态方法
      RepayStatusList:[],

      count:0,
      pageIndex:1,//初始页
      pageSize: 50,//显示当前行的条数
      tableData: [],//测试数据
      searchform: {
        name: "",//客户姓名
        channelCd: "",//进件渠道
        productCd: "",//渠道产品
        repayType:"",//支付渠道
        repayStatus:"",//还款状态
        beginDate: new Date().toLocaleDateString()+" 00:00:00",//还款日期
        endDate: new Date().toLocaleDateString()+" 23:59:59",//结束日期
        pageIndex: 1,
        pageSize: 50,
      },
    };
  },
  mounted() {
    
    this.getName();

    this.getchannellist();//获取搜索框渠道接口列表

    // this.getproductlist();//获取渠道产品接口方法

    this.getpayChannellist();//获取支付渠道列表方法

    this.getRepayStatusList();//获取还款状态列表方法

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
    this.getlist();
},
  methods: {
    //返回上一页
    lastpage(){
      window.history.go(-1);
    },
    // 导出excel
    exportExcel(filename){
        const url = this.$store.state.domain +"/loanManage/loanRepayExport";
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
          return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
      },


    // 获取还款状态
      getRepayStatusList() {
      let data = {
        RepayStatus: this.searchform.RepayStatus
      };
      this.$http
        .post(this.$store.state.domain +"/loanManage/getRepayStatus", data)
          .then(
          //成功
          response => {
            if (response.data.code == 0) { 
                this.RepayStatusList = response.data.detail.result;
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

    //获取支付渠道列表方法
    getpayChannellist(){
      let data = {
        payChannel: this.searchform.payChannel
      };
      this.$http
        .post(this.$store.state.domain +"/loanManage/getRepayType", data)
          .then(
          //成功
          response => {
            if (response.data.code == 0) { 
                this.payChannellist = response.data.detail.result;
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

        //新版导出excel表方法:只能到处当前页面
        // exportExcel () {
        //     /* generate workbook object from table */
        //     var wb = XLSX.utils.table_to_book(document.querySelector('#app'))
        //     /* get binary string as output */
        //     var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        //     try {
        //         FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '还款记录.xlsx')
        //     } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        //     return wbout
        // },

        getName() {
          let userName = sessionStorage.getItem("name");
          this.userName = userName;
        },

        goBack() {
          var _this = this;
            this.$confirm('确认退出吗?', '提示', {
              //type: 'warning'
            }).then(() => {
              sessionStorage.removeItem('name');
              this.$router.push('/login');
            }).catch(() => {

            });
        },
       
        search() {
          this.getlist();
        },

        resetForm(formName) {
          this.$refs[formName].resetFields();
          this.productlist="";
          this.searchform.beginDate="";
          this.searchform.endDate="";
          // this.getlist();
        },

        handleSizeChange(psize) {
        this.searchform.pageSize = psize;
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.searchform.pageIndex =1;
          this.getlist();
        },

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
        }else if(channelCode=="M018" || channelCode=="M023" || channelCode=="M024"){
            this.$router.push("/users/detailbaiduo?processNo=" + processNo);
        }
        else if(channelCode=="M009"){
            this.$router.push("/users/detailjiarongbao?processNo=" + processNo);
        }else if(channelCode=="M020"){
            this.$router.push("/users/detailchangsheng?processNo=" + processNo);
        }else if(channelCode=="M021"){
            this.$router.push("/users/detailweirong?processNo=" + processNo);
        }else if(channelCode=="M022"){
            this.$router.push("/users/detailhairong?processNo=" + processNo);
        }else{
            this.$router.push("/users/detaillinyi?processNo=" + processNo);
        }
      },
        
        getlist() {
        this.listLoading=true;
          this.$http
            .post(
              this.$store.state.domain +"/loanManage/loanRepay", this.searchform
            )
            .then(
              response => {
                if (response.data.code == 0) {
                //请求成功回调函数
                this.tableData = response.data.detail.result.pageList;
                this.count = response.data.detail.result.count;
                this.pageSize= response.data.detail.result.pageSize;
                this.pageIndex =response.data.detail.result.pageIndex;
                if(response.data.detail.result.params==null){
                  this.allmoney=0;
                }
                else{
                  this.allmoney = response.data.detail.result.params.repayAmtTotal;
                }
                this.listLoading = false;

                if(this.tableData==null)
                {
                  this.$notify({
                    message: '搜索失败，无此数据，请重新搜索。',
                    type: 'warning',
                    duration:"2000"//持续时间
                  });
                }
                } else {
                  // this.listLoading=true;
                  // this.$message.error(response.data.msg);
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
      filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
      },
      watch: {},
      components: {}
};
</script>

 <style lang='less'>
@import '../users/index.css';
















































</style>
