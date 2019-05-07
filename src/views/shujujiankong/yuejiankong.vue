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

      <p class='left'>数据监控 >> 余额监控</p>

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
              <el-col :span="8">
                  <el-form-item label="渠道" prop="channelCd" >
                    <el-select v-model="searchform.channelCd" class="sh"  multiple placeholder="请选择渠道" collapse-tags @change="selchange">
                    <el-option v-for="item in channellist"
                        :key="item.channelCode"
                        :label="item.channelCode"
                        :value="item.channelCode"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>

              <el-col :span="6">
                <div class="di">
                  <div class="wrapper">
                    <el-button type="primary" plain @click="search()" size="mini">
                      查询</el-button>
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
          stripe v-loading="listLoading"  border
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%; height:100%;">
            <el-table-column prop="channelCd" label="渠道" align="center">
            </el-table-column>
            <el-table-column prop="productCd" label="产品" width="280px" align="center">
            </el-table-column>
            <el-table-column prop="merchant_id" label="账户" align="center">
            </el-table-column>
            <el-table-column prop="pay_name" label="账户名称" width="410px" align="center">
            </el-table-column>
            <el-table-column prop="valid_Amount" label="实时余额" align="center">
              <template slot-scope="scope">
                <!-- 数值千分符 -->
                {{parseInt(scope.row.valid_Amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}}
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
      statuss: "none",
      oldOptions: [],
      listLoading: false,//加载样式

      //渠道数据容器
      channellist:[],

      //表格数据
      tableData: [],

      searchform: {
        channelCd: '',//进件渠道
        productCd:'',
      }
    };
  },
  // mounted只执行一次,在模板渲染成html后调用
  mounted() {
    this.getName();//获取管理员用户名
    
    this.getchannellist();//获取搜索框渠道接口列表

    window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          }

    // this.getlist();//获取用户列表
    
  },

  methods: {
    //全选设置
    selchange(val){
      let allValues = []
        //保留所有值
        for (let item of this.channellist) {
            allValues.push(item.channelCode)
        }

        // 用来储存上一次的值，可以进行对比
        const oldVal = this.oldOptions.length === 0 ? [] : this.oldOptions[1]

        // 若是全部选择
        if (val.includes('全部产品')) this.searchform.channelCd = allValues 

        // 取消全部选中  上次有 当前没有 表示取消全选
        if (oldVal.includes('全部产品') && !val.includes('全部产品')) this.searchform.channelCd = []

        // 点击非全部选中  需要排除全部选中 以及 当前点击的选项 
        // 新老数据都有全部选中 
        if (oldVal.includes('全部产品') && val.includes('全部产品')) {
            const index = val.indexOf('全部产品')
            val.splice(index, 1) // 排除全选选项
            this.searchform.channelCd = val
        }

        //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        if (!oldVal.includes('全部产品') && !val.includes('全部产品')) {
            if (val.length === allValues.length - 1) this.searchform.channelCd = ['全部产品'].concat(val)
        }

        //储存当前最后的结果 作为下次的老数据 
        this.oldOptions[1] = this.searchform.channelCd
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
                //添加全选功能
                this.channellist.push({channelCode: '全部产品'});

                for(var i=0;i<(response.data.detail.result).length;i++){

                  this.channellist.push((response.data.detail.result)[i]);
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
    
      // 搜索功能
      search() {
        this.getlist();
      },

      // 重置功能
      resetForm(formName) {
        this.$refs[formName].resetFields();
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

      // ajax异步数据交互：Vue 实例提供了 this.$http 服务可用于发送 HTTP 请求
      getlist() {

        //去除全部字段
      const index = this.searchform.channelCd.indexOf('全部产品')

      //必须要进行判断
      if(index!=-1){
        this.searchform.channelCd.splice(index, 1) // 排除全选选项
      }

        //去掉中括号
        var str=this.searchform.channelCd
        var spr=str.toString().replace(/\[|]/g,'');
        console.log(spr)
        let data={
          channelCd:spr,
          productCd:""
        }

        this.listLoading=true
        this.$http
          .post(
            this.$store.state.domain +"/MonitorFile/monitorList",data
          )
          //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
          .then(  
            // Lambda写法
            response => {
              if (response.data.code == 0) {
                //请求成功回调函数
                this.tableData = response.data.detail.result;
                // console.log(this.tableData)
                this.listLoading=false;
                if(this.tableData==null || this.tableData=="")
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
