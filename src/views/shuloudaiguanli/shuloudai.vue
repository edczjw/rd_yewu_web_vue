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

    <div class="content">
      <div class="searcharea">
        <!-- el-form接收一个model，必须配合el-form-item一起使用，并且在el-form-item上绑定prop属性 -->
        <el-form ref="searchform" :model="searchform" label-width="80px" size="mini">
          <el-row :gutter="30">
            <el-col :span="6">
              <el-form-item label="法人姓名" prop="name">
                <el-input v-model="searchform.name" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="法人手机号" prop="phone">
                <el-input v-model="searchform.phone" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="法人身份证" prop="idcard">
                <el-input v-model="searchform.idcard" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="di">
                <div class="wrapper">
                  <el-button type="primary" plain @click="submitForm()" size="mini">搜索</el-button>
                  <el-button type="primary" plain @click="resetForm('searchform')" size="mini">重置</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- =============================== 展示表格数据框 =================================== -->
      <el-table
        :data="tableData"
        border
        size="medium"
        stripe
        v-loading="listLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="name" label="企业名称" align="center"></el-table-column>
        <el-table-column prop="name" label="统一社会信用代码" align="center"></el-table-column>
        <el-table-column prop="name" label="法人姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="法人手机号" align="center"></el-table-column>
        <el-table-column prop="idcard" label="法人身份证号码" align="center"></el-table-column>
        <el-table-column prop="bankid" label="企业对公账户" align="center"></el-table-column>
        <el-table-column prop="businessLicensePhoto" label="营业执照照片" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.businessLicensePhoto">
              <a
                v-for="(item, index) in scope.row.businessLicensePhoto.split(',')"
                :key="index"
                :href="item"
                target="_blank"
                class="look"
              >查看</a>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="licenceOpeningAccounts" label="开户许可证" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.licenceOpeningAccounts">
              <a
                v-for="(item, index) in scope.row.licenceOpeningAccounts.split(',')"
                :key="index"
                :href="item"
                target="_blank"
                class="look"
              >查看</a>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="assuranceShareholderCommitment" label="股东承诺函" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.assuranceShareholderCommitment">
              <a
                v-for="(item, index) in scope.row.assuranceShareholderCommitment.split(',')"
                :key="index"
                :href="item"
                target="_blank"
                class="look"
              >查看</a>
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="idcardFront" label="法人身份证照" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.idcardFront">
              <a
                v-for="(item, index) in scope.row.idcardFront.split(',')"
                :key="index"
                :href="item"
                target="_blank"
                class="look"
              >查看</a>
            </template>
          </template>
        </el-table-column>
        
        <el-table-column prop="pledgeContractImg" label="借款合同" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.loanContractImg">
              <a
                v-for="(item, index) in scope.row.loanContractImg.split(',')"
                :key="index"
                :href="item"
                target="_blank"
                class="look"
              >查看</a>
            </template>
          </template>
        </el-table-column>
      </el-table>
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
      //表格数据
      tableData: [],
      count: 0,
      searchform: {
        name: "", //姓名
        phone: "", //手机号码
        idcard: "", //身份证号码
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      }
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
    var data = {};
    this.load(data);
  },

  //在模板渲染成html前调用
  created() {
    // this.getlist();//获取用户列表
  },
  methods: {
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
    },

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
    //初始化
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/sld/user/userlist",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            this.tableData = res.detail.result.pageList;
            this.count = res.detail.result.count;
            this.searchform.pageIndex = res.detail.result.pageIndex;
            this.searchform.pageSize = res.detail.result.pageSize;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        error => {}
      );
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
.look {
  margin: 0 10px;
}
</style>
