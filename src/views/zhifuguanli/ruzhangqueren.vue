<template>
  <div v-if="userName=='config'?false:true">
    <div class="topBanner">
      
      <el-tooltip class="item" effect="dark" content="展开缩进" placement="bottom">
      <p class='tog' @click="togglemenu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhankai1"></use>
        </svg></p>
      </el-tooltip>

      <p class='left'>入账确认</p>

      <el-tooltip class="item" effect="dark" content="安全退出" placement="bottom">
      <p class='right' @click="goBack">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>安全退出</p>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="用户名" placement="bottom">
      <p class='right' title="用户名">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-character"></use>
        </svg>{{userName}}</p>
      </el-tooltip>
      <p class='right' @click="screenfull">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-quanping4"></use>
      </svg>全屏显示</p>

    </div>

        <div class="searcharea">
          <el-form ref="searchform" :model="searchform" label-width="100%" size="mini">
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
                  <el-form-item label="进件渠道" prop="channelCd">
                  <el-select v-model="searchform.channelCd" placeholder="请选择进件渠道"
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
                  <el-form-item label="渠道产品" prop="productCd">
                  <el-select v-model="searchform.productCd" placeholder="请选择渠道产品">
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
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="还款日期" prop="startDate">
                  <div class="grid-content bg-purple">
                    <el-date-picker v-model="searchform.beginDate"  class="shi"
                    value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="开始日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="至" prop="endDate">
                  <el-date-picker v-model="searchform.endDate"  class="shi"
                  value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <div class="di">
                  <span class="wrapper">
                    <el-button :type="status=='none'?'primary':''" @click="search()" size="mini">
                      搜索</el-button>
                    <el-button :type="status=='done'?'primary':''" @click="resetForm('searchform')" size="mini">
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
                 <el-tag type="seccess" size="mini">还款入账确认总金额（元）：{{allmoney}}</el-tag>
          </el-col>
        </div>
        </div>

          <el-table :data="tableData" border stripe
          v-loading="listLoading" size="medium"
          element-loading-text="拼命加载中" style="width: 100%;height:100%;"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)" >
            <el-table-column prop="name" label="客户姓名" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="gouserdetail(scope.row.loan_id)">
                  {{scope.row.name}}</el-button>
              </template>
            </el-table-column>

            <el-table-column prop="channelCd" label="进件渠道" align="center">
            </el-table-column>
            <el-table-column prop="productCd" label="渠道产品" align="center">
            </el-table-column>
            <el-table-column prop="payAmt" label="还款本金" align="center">
            </el-table-column>
            <el-table-column prop="way_return" label="还款利息" align="center">
            </el-table-column>
            <el-table-column prop="loan_total" label="还款金额合计" align="center">
            </el-table-column>
            <el-table-column prop="loanExpireDate" label="应还款日期" align="center">
            </el-table-column>

            <!-- 后来新增一个数据 -->
            <el-table-column prop="loanstate" label="还款状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.loanstate == '1'">正常还款</span>
                <span v-else-if="scope.row.loanstate == '2'">代偿还款</span>
              </template>
            </el-table-column>

            <el-table-column prop="" label="操作" align="center">
                <template slot-scope="scope">
                  <!-- scope.loanstate拿到每一行的还款状态 -->
                    <el-button size="small" @click="handleEdit(scope.row)">
                      编辑</el-button>
                </template>
            </el-table-column>
          </el-table>

          <div class="block">
            <el-pagination background style="text-align:center" 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :current-page="pageIndex" 
            :page-sizes="[20,50,100]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next" 
            :total="tableData.length">
            </el-pagination>
          </div>

     <!--编辑界面-->
          <el-dialog  title="编辑" :visible.sync="editFormVisible" 
          :close-on-click-modal="false" width="30%">
          <div class="el-dia">
            <el-form :model="changeform" ref="changeform" >
              <el-form-item label="还款状态" prop="loanstate" >
                  <el-select v-model="changeform.loanstate" placeholder="请选择还款状态">
                    <el-option label="正常还款" value="1"></el-option>
                    <el-option label="代偿还款" value="2"></el-option>
                  </el-select>
              </el-form-item>
              </el-form>
          </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit()">确 定</el-button>
              </div>
           </el-dialog>
  </div>
</template>

<script>
import {formatDate} from '../../common/date.js';
import screenfull from 'screenfull'

//引入vuex
import {mapState} from 'vuex'

export default {
  data() {
    return {
      isFullscreen: false,
      userName: "",
      status: "none",
      listLoading: false,
      pageIndex:1,//初始页
      pageSize: 50,//显示当前行的条数
      editFormVisible: false,//编辑界面是否显示
      allmoney:0,
      
      //渠道数据容器
      channellist:[],

      //产品接口容器
      productlist:[],

      tableData: [
      ],
      //搜索表单
      searchform: {
        name: "",
        channelCd: "",//进件渠道
        productCd: "",//渠道产品
        payAmt:"",//还款本金
        way_return:"",//还款利息
        loan_total:"",//还款金额合计
        loanExpireDate: "",//还款日期
        loanstate:"",//还款状态
        pageIndex: "1",
        pageSize: 50,
      },

      //修改表单
      changeform: {
        name: "",
        channelCd: "",//进件渠道
        productCd: "",//渠道产品
        payAmt:"",//还款本金
        way_return:"",//还款利息
        loan_total:"",//还款金额合计
        loanExpireDate: "",//还款日期
        loanstate:"",//还款状态
      },
      
    };
  },
  mounted() {
     window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          };
    this.getName();
    this.getchannellist();//获取搜索框渠道接口列表

    this.getproductlist();//获取渠道产品接口方法
    // this.getlist();
  },
  methods: {
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

    //显示编辑界面
			handleEdit(rows) {
        this.editFormVisible = true;
        this.changeform = Object.assign({}, rows);//获得该行所有数据显示在编辑信息模态框里面
      },
      //编辑
			editSubmit() {
        let tableList=this.changeform;
				this.$refs.changeform.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.changeform);
							editUser(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['changeform'].resetFields();
								this.editFormVisible = false;
								this.getlist();
							});
						});
					}
				});
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
    changepage(val) {
      this.searchform.pageIndex = val;
      this.getlist();
    },
    search() {
      this.searchform.pageIndex = 1;
      this.listLoading = true;//刷新进度图标
      this.getlist();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.productlist="";
    },
    // 初始每页数据数pagesize
    handleSizeChange(psize) {
      this.pageSize = psize;
      this.getlist();
    },
    // 初始页currentPage
    handleCurrentChange(pindex) {
      this.searchform.pageIndex = pindex;
      this.getlist();
    },
    gouserdetail(loan_id) {
      this.$router.push("/users/detail?loan_id=" + loan_id);
    },
    getlist() {
      this.$http
        .get(
          this.$store.state.domain +"/loanManage/loanPay",  //url
          {
            params: this.searchform
          }
        )
        .then(
          response => {
            if (response.data.code == 0) {
              //请求成功回调函数
            //请求返回的数据赋给tableData
            this.tableData = response.data.detail.resultList;
            //请求返回的数据数量赋给total_count
            this.total_count = response.data.detail.count;
            // this.allmoney = response.data.detail.totalMoney;
            } else {
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

//  导入统一样式less样式
@import '../users/index.css';


</style>
