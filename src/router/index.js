import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
var routes = [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    // 登陆页面
    path: '/login',
    name: '登录页面',
    component: require('../views/login/index.vue').default,
  },
  {
    // 主页
    path: '/home',
    component: require('../views/index/index.vue').default,
    name: '主页',
    meta: {
      auth: true
    },

    // home中的嵌套路由
    children: [{
        // 审核管理
        path: '/shenheguanli/anjianxinxi',
        name: '武汉万商',
        component: require('../views/shenheguanli/anjianxinxi.vue').default,
        meta: {
          auth: true
        }
      }, {
        // 合同管理
        path: '/hetongguanli/zaikuheyue',
        name: '在库合约',
        component: require('../views/hetongguanli/zaikuheyue.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/hetongguanli/jieqingheyue',
        name: '结清合约',
        component: require('../views/hetongguanli/jieqingheyue.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/hetongguanli/qianzhangjilu',
        name: '签章记录',
        component: require('../views/hetongguanli/qianzhangjilu.vue').default,
        meta: {
          auth: true
        }
      }, {
        // 支付管理
        path: '/zhifuguanli/fangkuanjilu',
        name: '放款记录',
        component: require('../views/zhifuguanli/fangkuanjilu.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/zhifuguanli/huankuanjilu',
        name: '还款记录',
        component: require('../views/zhifuguanli/huankuanjilu.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/zhifuguanli/ceshi',
        name: '测试',
        component: require('../views/zhifuguanli/ceshi.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/zhifuguanli/ruzhangqueren',
        name: '入账记录',
        component: require('../views/zhifuguanli/ruzhangqueren.vue').default,
        meta: {
          auth: true
        }
      }, {
        // 数据监控
        path: '/shujujiankong/yuejiankong',
        name: '余额监控',
        component: require('../views/shujujiankong/yuejiankong.vue').default,
        meta: {
          auth: true
        }
      }, {
        // 对账审核
        path: '/duizhangshenhe/tiqianjieqing',
        name: '提前结清',
        component: require('../views/duizhangshenhe/tiqianjieqing.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/duizhangshenhe/zhengchanghuankuan',
        name: '正常还款',
        component: require('../views/duizhangshenhe/zhengchanghuankuan.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/yonghuguanli/mimaxiugai',
        name: '密码修改',
        component: require('../views/yonghuguanli/mimaxiugai.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/jingqueshuke/jingqueshuju',
        name: '精确数据',
        component: require('../views/jingqueshuke/jingqueshuju.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/yonghuguanli/duilieguanli',
        name: '队列管理',
        component: require('../views/yonghuguanli/duilieguanli.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/biaogeguanli/caiwubaobiao',
        name: '财务报表',
        component: require('../views/biaogeguanli/caiwubaobiao.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/biaogeguanli/shujubaobiao',
        name: '数据报表',
        component: require('../views/biaogeguanli/shujubaobiao.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detaillinyi',
        name: '临沂详情页',
        component: require('../views/users/detaillinyi.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailwanshang',
        name: '万商详情页',
        component: require('../views/users/detailwanshang.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailhuayu',
        name: '华域详情页',
        component: require('../views/users/detailhuayu.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/users/detailzhonghe',
        name: '众禾详情页',
        component: require('../views/users/detailzhonghe.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailshenshengrong',
        name: '深盛融详情页',
        component: require('../views/users/detailshenshengrong.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailguhe',
        name: '固赫详情页',
        component: require('../views/users/detailguhe.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailqianhai',
        name: '前海微贷详情页',
        component: require('../views/users/detailqianhai.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailxiaoye',
        name: '小业详情页',
        component: require('../views/users/detailxiaoye.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailyunkedai',
        name: '云科贷详情页',
        component: require('../views/users/detailyunkedai.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailbaiduo',
        name: '百多详情页',
        component: require('../views/users/detailbaiduo.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/detailjiarongbao',
        name: '佳融宝详情页',
        component: require('../views/users/detailjiarongbao.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/users/detailchangsheng',
        name: '昌盛详情页',
        component: require('../views/users/detailchangsheng.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/users/detailweirong',
        name: '微融详情页',
        component: require('../views/users/detailweirong.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/users/detailhairong',
        name: '海融详情页',
        component: require('../views/users/detailhairong.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbasewanshang',
        name: '智慧商城基础信息',
        component: require('../views/users/userbasewanshang.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbaselinyi',
        name: '山东临沂基础信息',
        component: require('../views/users/userbaselinyi.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbasehuayu',
        name: '北京华域基础信息',
        component: require('../views/users/userbasehuayu.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbasezhonghe',
        name: '众禾基础信息',
        component: require('../views/users/userbasezhonghe.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbaseshenshengrong',
        name: '深盛融基础信息',
        component: require('../views/users/userbaseshenshengrong.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbaseguhe',
        name: '固赫基础信息',
        component: require('../views/users/userbaseguhe.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbaseqianhai',
        name: '前海微贷基础信息',
        component: require('../views/users/userbaseqianhai.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbasexiaoye',
        name: '小业基础信息',
        component: require('../views/users/userbasexiaoye.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/users/userbaseyunkedai',
        name: '云科贷基础信息',
        component: require('../views/users/userbaseyunkedai.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbasebaiduo',
        name: '百多基础信息',
        component: require('../views/users/userbasebaiduo.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userbasejiarongbao',
        name: '佳融宝基础信息',
        component: require('../views/users/userbasejiarongbao.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/users/userbasechangsheng',
        name: '昌盛基础信息',
        component: require('../views/users/userbasechangsheng.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/users/userbaseweirong',
        name: '微融基础信息',
        component: require('../views/users/userbaseweirong.vue').default,
        meta: {
          auth: true
        }
      }, {
        path: '/users/userbasehairong',
        name: '海融基础信息',
        component: require('../views/users/userbasehairong.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/hetongbase',
        name: '合同基本信息',
        component: require('../views/users/hetongbase.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/users/userpics',
        name: '影像信息',
        component: require('../views/users/userpics.vue').default,
        meta: {
          auth: true
        }
      },
      {
        path: '/shuloudaiguanli/shuloudai',
        name: '赎楼贷列表',
        component: require('../views/shuloudaiguanli/shuloudai.vue').default,
        meta: {
          auth: true
        }
      },
    ],
  },
  //赎楼贷
  //赎楼贷登录
  {
    path: '/sld/login',
    name: 'login',
    component: require('../components/sld/login.vue').default,
    meta: {
      title: '赎楼贷管理系统'
    }
  },
  //赎楼贷注册
  {
    path: '/sld/register',
    name: 'register',
    component: require('../components/sld/register.vue').default,
    meta: {
      title: '赎楼贷管理系统'
    }
  },
  //赎楼贷展示
  {
    path: '/sld/home',
    name: 'home',
    component: require('../components/sld/index.vue').default,
    meta: {
      title: '赎楼贷管理系统'
    }
  }
]
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  // 根据路由元信息设置文档标题
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
  next()
})

export default router