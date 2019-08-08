<template>
  <!-- true显示，false不显示 -->
  <div v-if="userName==this.$store.state.nameler?false:true">
    <div class="topBanner">
      <el-tooltip class="item" effect="light" content="展开缩进" placement="bottom">
        <p class="tog" @click="togglemenu">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhankai1" />
          </svg>
        </p>
      </el-tooltip>
      <p class="left">赎楼贷管理 >> 赎楼贷列表</p>
      <p class="right" @click="goBack">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye" />
        </svg>安全退出
      </p>

      <p class="right" title="用户名">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-character" />
        </svg>
        {{userName}}
      </p>

      <p class="right" @click="screenfull">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-quanping4" />
        </svg>全屏显示
      </p>

      <p class="right" title="密码修改">
        <router-link to="/yonghuguanli/mimaxiugai" class="roulink">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mimazhongzhi" />
          </svg>密码修改
        </router-link>
      </p>

      <p class="right" @click="lastpage">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui2" />
        </svg>返回上一页
      </p>
    </div>

    <div class="page-human">
      <el-card>
        <el-form :model="searchform" ref="searchform" label-width="130px">
          <el-row type="flex" class="human-form">
            <el-col :span="8">
              <el-form-item label="标识编号" prop="uniqueId">
                <el-input size="mini" v-model.trim="searchform.uniqueId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" prop="userName">
                <el-input size="mini" v-model.trim="searchform.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="phone">
                <el-input size="mini" v-model.trim="searchform.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="期限类别" prop="timeType">
                <el-select size="mini" v-model="searchform.timeType" placeholder="请选择期限类别">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请开始日期" prop="beginDate">
                <el-date-picker
                  size="mini"
                  v-model="searchform.beginDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择开始日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="至" prop="endDate">
                <el-date-picker
                  size="mini"
                  v-model="searchform.endDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item>
                <el-button size="mini" type="primary" @click="submitForm()">搜索</el-button>
                <el-button size="mini" @click="resetForm('searchform')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="human-table">
        <el-table
          :data="tableData"
          border
          size="mini"
          stripe
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%; height:100%;"
        >
          <el-table-column prop="uniqueId" label="标识编号" align="center"></el-table-column>
          <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="idCardNum" label="身份证号码" align="center"></el-table-column>
          <el-table-column prop="amount" label="贷款本金（元）" align="center"></el-table-column>
          <el-table-column prop="interest" label="总利息（元）" align="center"></el-table-column>
          <el-table-column prop="rate" label="贷款年化利率（%）" align="center"></el-table-column>
          <el-table-column prop="timeType" label="期限类别" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.timeType == 0">天</span>
              <span v-if="scope.row.timeType == 1">月</span>
            </template>
          </el-table-column>
          <el-table-column prop="deadline" label="借款期限" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="human-pagination">
          <el-pagination
            background
            style="text-align:center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.searchform.pageIndex"
            :page-sizes="[20,50,100]"
            :page-size="this.searchform.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="count"
          >
            <!--这是显示总共有多少数据-->
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
// 时间格式化：数据库中往往存储的是时间的毫秒形式，这样在页面上可以操控显示时间的格式
import { formatDate } from "../../common/date.js";
import screenfull from "screenfull";
//引入vuex
// import {mapState} from 'vuex'

export default {
  data() {
    return {
      isFullscreen: false,
      userName: "",
      listLoading: false, //加载样式
      options: [
        {
          value: '0',
          label: "天"
        },
        {
          value: '1',
          label: "月"
        }
      ],
      //表格数据
      count: 0,
      searchform: {
        timeType: "", //期限类别
        uniqueId: "", //标识编号
        userName: "", //甲方姓名
        phone: "", //甲方手机号
        beginDate: "", //申请开始时间
        endDate: "", //至
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      },
      tableData: []
    };
  },
  // mounted只执行一次,在模板渲染成html后调用
  mounted() {
    this.getName(); //获取管理员用户名
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false;
      }
    };
    this.load(this.searchform);
  },

  methods: {
    submitForm() {
      this.load(this.searchform);
    },
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.getlist();
    },
    handleSizeChange(psize) {
      // 改变每页显示的条数
      this.searchform.pageSize = psize;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.searchform.pageIndex = 1;
      this.load(this.searchform);
    },

    // 初始页currentPage
    handleCurrentChange(pindex) {
      this.searchform.pageIndex = pindex;
      this.load(this.searchform);
    },
    //表单操作
    handleClick() {},
    godetail(id) {
      this.$router.push({
        path: "/details/applyDetail",
        query: {
          id: id
        }
      });
    },
    //初始化数据
    load(data) {
      this.tableData = [];
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/loanManage/yfloanlist",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            if (
              res.detail.result.pageList &&
              res.detail.result.pageList.length > 0
            ) {
              res.detail.result.pageList.forEach(data => {
                this.tableData.push(data);
              });
            }
            this.count = res.detail.result.total;
            this.searchform.pageIndex = res.detail.result.pageIndex;
            this.searchform.pageSize = res.detail.result.pageSize;
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        },
        error => {}
      );
    },
    //返回上一页
    lastpage() {
      window.history.go(-1);
    },
    /**
     * 全屏事件
     */
    screenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: "Your browser does not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = true;
    },
    /**
     * 是否全屏并按键ESC键的方法
     */
    checkFull() {
      var isFull =
        document.fullscreenEnabled ||
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled;
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },

    //展开缩进
    togglemenu() {
      this.$store.state.isLeftHiden = !this.$store.state.isLeftHiden;
      console.log(this.$store.state.isLeftHiden);
    },

    //获取用户名，vue 本地存储数据 sessionStorage
    getName() {
      let userName = sessionStorage.getItem("name");
      this.userName = userName;
    },

    // 退出，跳转至登陆页面
    goBack() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem("name"); //清除session中name
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  //过滤器，用于格式化时间格式
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

 <style lang='less'>
//  导入统一样式less样式
@import "../users/index.css";
.human-pagination {
  margin-top: 30px;
}
/deep/ .el-card {
  // background: rgba(255, 255, 255, 0.1);
  /deep/ .el-table tr,
  .el-table th {
    background: rgba(173, 173, 173, 0.3);
    // background: rgb(248, 246, 246);
    color: rgb(118, 104, 104);
    font-family: "苹方";
  }
  /deep/ .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #fff;
  }
  .el-form-item__content {
    margin-left: 130px !important;
  }
}
.page-human {
  padding: 25px 50px;
  // background: rgb(202, 201, 201);
  .human-table {
    margin-top: 40px;
  }
  .human-pagination {
    margin-top: 30px;
  }
}
</style>
