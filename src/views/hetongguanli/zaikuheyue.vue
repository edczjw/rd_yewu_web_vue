<template>
  <div v-if="userName=='config'?false:true">
    <div class="topBanner">

      <el-tooltip class="item" effect="dark" content="展开缩进" placement="bottom">
      <p class='tog' @click="togglemenu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhankai1"></use>
        </svg></p>
      </el-tooltip>

      <p class='left'>在库合约</p>
      
      <el-tooltip class="item" effect="dark" content="安全退出" placement="bottom">
      <p class='right' @click="goBack">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>安全退出</p>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="用户名" placement="bottom">
      <p class='right'>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-character"></use>
        </svg>{{userName}}</p>
      </el-tooltip>

    </div>

    <div class="page">
      <div class="underOne">
        <div class="searcharea">
          <el-form ref="searchform" :model="searchform" label-width="80px" size="mini">
            <el-row :gutter="30">

              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="客户姓名" prop="name">
                    <el-input v-model="searchform.name"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="手机号" prop="name">
                    <el-input v-model="searchform.phone"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="身份证" prop="name">
                    <el-input v-model="searchform.idNO"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="渠道" prop="channelCd">
                  <el-select v-model="searchform.channelCd" placeholder="请选择进件渠道"
                  @change="selChange($event)">
                      <!-- 从后台要的数据 -->
                    <el-option v-for="item in channellist"
                              :label="item.channelName"
                              :key="item.channelCode"
                              :value="item.channelCode"
                          ></el-option>
                  </el-select>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="产品" prop="productCd">
                  <el-select v-model="searchform.productCd" placeholder="请选择渠道产品">
                    <!-- 从后台要的数据 -->
                    <el-option v-for="item in productlist"
                              :label="item.productName"
                              :key="item.productCode"
                              :value="item.productCode"
                          ></el-option>
                  </el-select>
                  </el-form-item>
                </div>
              </el-col>

            <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="履约状态" prop="repayType">
                  <el-select v-model="searchform.repayType" placeholder="请选择支付渠道">
                    <!-- 从后台要的数据 -->
                    <el-option v-for="item in payChannellist"
                              :label="item.desc"
                              :key="item.type"
                              :value="item.type"
                          ></el-option>
                  </el-select>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <el-form-item label="签约日期" prop="beginDate">
                    <el-date-picker
                      v-model="searchform.beginDate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="开始日期"
                      default-time="00:00:00">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">

              <el-col :span="6">
                <el-form-item label="至" prop="endDate">
                  <el-date-picker
                      v-model="searchform.endDate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="结束日期"
                      default-time="23:59:59">
                    </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <div class="di">
                  <span class="wrapper">
                    <!-- 表述按钮颜色 -->
                    <el-button :type="status=='none'?'primary':''" @click="search()" size="mini">
                      搜索</el-button>
                    <el-button :type="status=='none'?'primary':''" @click="resetForm('searchform')" size="mini">
                      重置
                    </el-button>
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        

        <!-- 展示表格数据框 -->
        <div class="table-con" id="app">
          <el-table :data="tableData" v-loading="listLoading" size="mini"
          border style="width: 100%" height="350px">

            <el-table-column prop="channelName" label="电子合同" align="center">
              <!-- 点击查看详情 -->
            <template slot-scope="scope">
              <el-button type="text" size="small" 
              @click="gouserdetail(scope.row.processNo)">
                {{scope.row.channelName}}</el-button>
            </template>
            </el-table-column>

            <el-table-column prop="name" label="客户姓名" width="100" align="center">
            <!-- 点击查看详情 -->
            <template slot-scope="scope">
              <el-button type="text" size="small" 
              @click="gouserdetail(scope.row.processNo,scope.row.channelName,scope.row.productName)">
                {{scope.row.name}}</el-button>
            </template>
            </el-table-column>

            <el-table-column prop="channelName" label="履约状态" width="90" align="center">
            </el-table-column>
            <el-table-column prop="productName" label="渠道" width="90" align="center">
            </el-table-column>
            <el-table-column prop="actualPrin" label="产品" width="90" align="center">
            </el-table-column>
            <el-table-column prop="actualInt" label="合同金额" width="90" align="center">
            </el-table-column>
            <el-table-column prop="repayAmt" label="合同期限" width="90" align="center">
            </el-table-column>
            <el-table-column prop="repayType" label="签约时间" width="90" align="center">
            </el-table-column>
            <el-table-column prop="statementType" label="合同文件" align="center">
              <!-- 点击查看详情 -->
            <template slot-scope="scope">
              <el-button type="text" size="small" 
              @click="gouserdetail(scope.row.processNoe)">
                查看</el-button>
                <el-button type="text" size="small" 
              @click="gouserdetail(scope.row.processNo)">
                下载</el-button>
            </template>
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
    </div>
  </div>
</template>
<script>
import {formatDate} from '../../common/date.js';

// 引入xlsx
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

//引入vuex
import {mapState} from 'vuex'

export default {
  data() {
    return {
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

      count:0,
      pageIndex:1,//初始页
      pageSize: 50,//显示当前行的条数

      //测试数据
      tableData: [
        {statementType:"j"}
        ],

      searchform: {
        name: "",//客户姓名
        channelCd: "",//进件渠道
        productCd: "",//渠道产品
        repayType:"",//支付渠道
        repayType:"",//还款利息
        beginDate: "",//还款日期
        endDate: "",//结束日期
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

    this.getlist();
  },
  methods: {
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

        //新版导出excel表方法
        exportExcel () {
            /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#app'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '还款记录.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
        },
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
          this.getlist();
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

        gouserdetail(processNo,channelName,productName) {
              //判断跳转
            if(channelName=="智慧万商" && productName=="智慧万商产品001"){
                this.$router.push("/users/detailwanshang?processNo=" + processNo);
            }
            else if(channelName=="山东临沂" && productName=="山东临沂产品001"){
                this.$router.push("/users/detaillinyi?processNo=" + processNo);
            }
        },
        
        getlist() {
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
                // this.allmoney = response.data.detail.result.params.repayAmtTotal;
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
                  this.listLoading=true;
                  this.$message.error(response.data.msg);
                }
              },
              response => {
                //console.log(response);
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
