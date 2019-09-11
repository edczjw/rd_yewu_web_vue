<template>
  <div class="side-menu">
    <div class="logo">
      <h1 class="site-title">民盛业务系统</h1>
    </div>

    <!-- vue动态导航条 -->
    <el-row>
      <el-col>
        <!-- default-active="1"默认打开的菜单是1，background-color="#475669"菜单背景色，text-color="#fff"字体颜色，active-text-color="#ffd04b"当前激活的菜单颜色，
        unique-opened="true"是否保持一个子菜单展开。-->
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#146377"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
        >
          <el-submenu index="1">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shenhexiangmu" />
              </svg>
              <span>审核管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/shenheguanli/anjianxinxi">
                <el-menu-item index="1-1">案件信息</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-hetong3" />
              </svg>
              <span>合同管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/hetongguanli/qianzhangjilu">
                <el-menu-item index="2-1">签章记录</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhifu" />
              </svg>
              <span>支付管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/zhifuguanli/fangkuanjilu">
                <el-menu-item index="3-1">放款记录</el-menu-item>
              </router-link>
              <router-link to="/zhifuguanli/huankuanjilu">
                <el-menu-item index="3-2">还款记录</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zmxy" />
              </svg>
              <span>数据监控</span>
            </template>
            <el-menu-item-group>
              <router-link to="/shujujiankong/yuejiankong">
                <el-menu-item index="4-1">余额监控</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-biaogeshezhi" />
              </svg>
              <span>对账审核</span>
            </template>
            <el-menu-item-group>
              <router-link to="/duizhangshenhe/tiqianjieqing">
                <el-menu-item index="5-1">提前结清</el-menu-item>
              </router-link>
              <router-link to="/duizhangshenhe/zhengchanghuankuan">
                <el-menu-item index="5-2">正常还款</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-web-icon-" />
              </svg>
              <span>表格管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/biaogeguanli/caiwubaobiao">
                <el-menu-item index="6-1">财务报表</el-menu-item>
              </router-link>
              <router-link to="/biaogeguanli/shujubaobiao">
                <el-menu-item index="6-2">数据报表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qiyetupu" />
              </svg>
              <span>精确数科</span>
            </template>
            <el-menu-item-group>
              <!-- <router-link to="/yonghuguanli/mimaxiugai">
                <el-menu-item index="5-1">密码修改</el-menu-item>
              </router-link>-->
              <router-link to="/jingqueshuke/jingqueshuju">
                <el-menu-item index="7-1">精确数据</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8" v-if="showsystem">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-peizhi" />
              </svg>
              <span>系统运维</span>
              
            </template>
            <el-menu-item-group>
              <!-- <router-link to="/yonghuguanli/mimaxiugai">
                <el-menu-item index="5-1">密码修改</el-menu-item>
              </router-link>-->
              <router-link to="/yonghuguanli/duilieguanli">
                <el-menu-item index="8-1">队列管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qiyetupu" />
              </svg>-->
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-web-icon-" />
              </svg>
              <span>赎楼贷管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/shuloudaiguanli/shuloudai">
                <el-menu-item index="8-1">赎楼贷列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">
              <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yonghuguanli" />
              </svg>-->
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-web-icon-" />
              </svg>
              <span>永发管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/yongfaguanli/dataList">
                <el-menu-item index="9-1">数据列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//引入vuex
import { mapState } from "vuex";

export default {
  data() {
    return {
      isCollapse: true,
      showsystem: false //是否隐藏系统运维菜单
    };
  },

  // computed:mapState({
  //     roleId:function(state){
  //       if(state.roleId == ''){
  //         this.$store.commit('getroleId')
  //       }
  //       return state.roleId;
  //     },
  //     roleName:function(state){
  //       if(state.roleName == ''){
  //         this.$store.commit('getroleName')
  //       }
  //       return state.roleName;
  //     }
  //   }),

  mounted() {
    this.getrole();
  },
  methods: {
    //获取角色，vue 本地存储数据 sessionStorage
    getrole() {
      var rolename = sessionStorage.getItem("role");
      console.log(sessionStorage.getItem("role"));
      if (rolename == "showtrue") {
        this.showsystem = true;
      } else {
        this.showsystem = false;
      }
    },

    logout() {
      let _this = this;
      _this.$http
        .post("/api/v1.2/video_class/manage?action=logout")
        .then(response => {
          _this.$router.push("/login");
        });
    }
  }
};
</script>

<style scoped lang=less>
.logo {
  font-size: 20px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  text-align: center;
  color: #fff;
}
.el-submenu__title i {
  color: #fff;
}
.site-title {
  font-size: 24px;
  line-height: 44px;

  width: 90%;
  height: 44px;

  border-radius: 9px;
  background-color: rgb(154, 216, 95);
}

/* 菜单样式 */
.side-menu {
  position: relative;

  width: 200px;
  height: 100%;

  background: #146377;
}

/* 图标样式 */
svg {
  padding: 3px 10px;
}

/* 菜单里面每个大标题的样式 */
.el-menu {
  /* important的意义在于优先于它内部定义的样式 */
  margin: -0.9px !important;
}

.el-menu-item-group {
  text-align: center;
}
</style>
