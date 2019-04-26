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

      <p class='left'>表格管理 >> 数据报表</p>

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
        <div class="searcharea" style="margin-top:20px;">
            <div class="lostitle">
            『 日统计报表 』
            </div>
            
          <!-- el-form接收一个model，必须配合el-form-item一起使用，并且在el-form-item上绑定prop属性 -->
          <el-form ref="searchform" :model="searchform" label-width="80px" size="mini">

            <el-row :gutter="30">
              <el-col :span="6">
                  <el-form-item label="产品" prop="channelCd">
                    <el-select v-model="searchform.channelCd" multiple collapse-tags placeholder="请选择产品" @change="changeSelectDay">
                    <el-option v-for="item in channellist"
                        :key="item.channelCode"
                        :label="item.channelCode"
                        :value="item.channelCode"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
              
              <el-col :span="6">
                <el-form-item label="案件日期" prop="beginDate">
                    <el-date-picker class="shi"
                      v-model="searchform.beginDate"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="至" prop="endDate">
                  <el-date-picker class="shi"
                      v-model="searchform.endDate"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div class="di">
                  <div class="wrapper">
                    <el-button type="primary" plain @click="outputdaylist('日报表')" size="mini">
                      导出日报表</el-button>
                    <!-- <el-button type="primary" plain @click="resetForm('searchform')" size="mini">
                      导出当日报表
                    </el-button> -->
                    <el-button type="primary" plain @click="resetForm('searchform')" size="mini">
                      重置
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="searcharea" style="margin-top:20px;">
            <div class="lostitle">
            『 各项目月累计情况 』
            </div>
            
          <!-- el-form接收一个model，必须配合el-form-item一起使用，并且在el-form-item上绑定prop属性 -->
          <el-form ref="dbform" :model="dbform" label-width="80px" size="mini">

            <el-row :gutter="30">
              <el-col :span="6">
                  <el-form-item label="产品" prop="channelCd">
                    <el-select v-model="dbform.channelCd"  @change="changeSelectMonth" multiple collapse-tags placeholder="请选择产品">
                    <el-option v-for="item in channellist"
                        :key="item.channelCode"
                        :label="item.channelCode"
                        :value="item.channelCode"></el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
              
              <el-col :span="6">
                <el-form-item label="案件日期" prop="beginDate">
                    <el-date-picker class="shi"
                      v-model="dbform.beginDate"
                      value-format="yyyy-MM-01"
                      type="date"
                      placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="至" prop="endDate">
                  <el-date-picker class="shi"
                      v-model="dbform.endDate"
                      value-format="yyyy-MM-01"
                      type="date"
                      placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div class="di">
                  <div class="wrapper">
                    <el-button type="primary" plain @click="outputmonthlist('月报表')" size="mini">
                      导出月报表</el-button>
                    <el-button type="primary" plain @click="resetForm('dbform')" size="mini">
                      重置
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
</div>

<!-- 小猪佩奇 -->
<img src="http://dingyue.nosdn.127.net/Y0b2B9MCCaqZBGTEhdix78AECPqwFsEiezuc0kwhYeDxL1536463553265.jpeg"/>
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
      oldOption: [],//日报
      oldOptions: [],//月报
      userName: "",

      //渠道数据容器
      channellist:[],

      //日报表
      searchform: {
        channelCd: "",//进件渠道
        beginDate: "",//开始时间
        endDate: "",//至
      },

      //月报表
      dbform:{
        channelCd: "",//进件渠道
        beginDate: "",//开始时间
        endDate: "",//至
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
    //日报表全选设置
    changeSelectDay(val){
      let allValues = []
        //保留所有值
        for (let item of this.channellist) {
            allValues.push(item.channelCode)
        }

        // 用来储存上一次的值，可以进行对比
        const oldVal = this.oldOption.length === 0 ? [] : this.oldOption[1]

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
        this.oldOption[1] = this.searchform.channelCd
    },

    //月报表全选设置
    changeSelectMonth(val) {
        let allValues = []
        //保留所有值
        for (let item of this.channellist) {
            allValues.push(item.channelCode)
        }

        // 用来储存上一次的值，可以进行对比
        const oldVal = this.oldOptions.length === 0 ? [] : this.oldOptions[1]

        // 若是全部选择
        if (val.includes('全部产品')) this.dbform.channelCd = allValues 

        // 取消全部选中  上次有 当前没有 表示取消全选
        if (oldVal.includes('全部产品') && !val.includes('全部产品')) this.dbform.channelCd = []

        // 点击非全部选中  需要排除全部选中 以及 当前点击的选项 
        // 新老数据都有全部选中 
        if (oldVal.includes('全部产品') && val.includes('全部产品')) {
            const index = val.indexOf('全部产品')
            val.splice(index, 1) // 排除全选选项
            this.dbform.channelCd = val
        }

        //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        if (!oldVal.includes('全部产品') && !val.includes('全部产品')) {
            if (val.length === allValues.length - 1) this.dbform.channelCd = ['全部产品'].concat(val)
        }

        //储存当前最后的结果 作为下次的老数据 
        this.oldOptions[1] = this.dbform.channelCd
      },


    //导出月统计报表
    outputmonthlist(filename){
      //判断用户是否选择渠道
      if(this.dbform.channelCd=='' || this.dbform.channelCd==null){
        this.$message({
                      message: '查询月报表必须选择至少一种产品！',
                      type: "warning"
                    });
      }else{

      //去除全部字段
      const index = this.dbform.channelCd.indexOf('全部产品')

      //必须要进行判断
      if(index!=-1){
        this.dbform.channelCd.splice(index, 1) // 排除全选选项
      }

      const url = this.$store.state.domain +"/loanManage/reportFormMonthExport";
                this.$http.post(url, this.dbform , {
                    responseType: 'blob'
                }).then(res => {
                  // 成功
                    this.$message({
                      message: '月统计报表下载成功！',
                      type: "success"
                    });
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
                  // 异常
                    this.$message({
                      message: err.body.message,
                      type: "error"
                    });
                    // console.warn(err);
                });
      }
    },


    // 导出日报表
    outputdaylist(filename){
      //判断用户是否选择渠道
      if(this.searchform.channelCd=='' || this.searchform.channelCd==null){
        this.$message({
                      message: '查询日报表必须选择至少一种产品！',
                      type: "warning"
                    });
      }else{
        
      //去除全部字段
      const index = (this.searchform.channelCd).indexOf('全部产品')

      //必须要进行判断
      if(index!=-1){
        this.searchform.channelCd.splice(index, 1) // 排除全选选项
      }

      const url = this.$store.state.domain +"/loanManage/reportFormDayExport";

      this.$http.post(url, this.searchform , 
      { responseType: 'blob'
                }).then(res => {
                  // 成功
                    this.$message({
                      message: '日统计报表下载成功！',
                      type: "success"
                    });
                    let blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    })

                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob);
                    } else {
                        let elink = document.createElement('a');

                        //延时
                        let num = ''
                        for(let i=0;i < 10;i++){
                          num += Math.ceil(Math.random() * 10)
                        }

                        elink.download = filename+'_'+this.getdate()+".xls";
                        // console.log(this.getdate())
                        elink.style.display = 'none';
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click();
                        document.body.removeChild(elink);
                    }

                }).catch(err => {
                  // 异常
                    this.$message({
                      message: err.body.message,
                      type: "error"
                    });
                    // console.warn(err);
                });
                
      }
    },

    //获取时间戳
    getdate() {
          var now = new Date(),
              y = now.getFullYear(),
              m = now.getMonth() + 1,
              d = now.getDate();
          return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
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

      // 重置功能
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
