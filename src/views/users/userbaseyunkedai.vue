<template>
  <div>

    <div class="el-table">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jibenxinxi"></use>
            </svg>基本信息
          </th>
        </tr>
        <ul>
          <li>
            <label >客户姓名：</label>{{detail.custName}}
          </li>
          <li>
            <label >身份证：</label>{{detail.idNo}}</li>
          <li>
            <label >手机号：</label>{{detail.phone}}</li>
          <li>
            <label >性别：</label>{{detail.sex}}</li>
          <li>
            <label >年龄：</label>{{detail.age}}</li>
          <li>
            <label >申请金额：</label>{{detail.applyLimit}}</li>
          <li>
            <label >申请借款期限：</label>{{detail.applyTerm}}{{detail.month}}</li>
          <li>
            <label >购买产品：</label>{{detail.goods}}</li>

          <li>
            <label >购买价格：</label>{{detail.goodsMoney}}</li>
          <li>
            <label >职业：</label>{{detail.occupation}}</li>
          <li>
            <label >月收入：</label>{{detail.monthSalary}}</li>
          <li>
            <label >单位名称：</label>{{detail.empName}}</li>
          <li>
            <label >所在省市：</label>{{detail.empProvinceCity}}</li>
          <li>
            <label >单位电话：</label>{{detail.empPhone}}</li>
          <li>
            <label >QQ：</label>{{detail.qq}}</li>        
          <li>
            <label >微信：</label>{{detail.weixin}}</li>
          <li>
            <label >学历：</label>{{detail.education}}</li>
          <li>
            <label >婚姻状况：</label>{{detail.marryStatus}}</li>
          <li>
            <label >邮箱：</label>{{detail.mail}}</li>
          <li>
            <label >车辆状况：</label>{{detail.carStatus}}</li>
          <li>
            <label >贷款用途：</label>{{detail.useFor}}</li>
          <!-- <li>
            <label >应用名称：</label>{{detail.appName}}</li>
          <li>
            <label >版本：</label>{{detail.appVersion}}</li> -->
          <!-- <li>
            <label >渠道：</label>{{detail.channelCode}}</li>
          <li>
            <label >产品：</label>{{detail.productCode}}</li> -->

          <li style="width: 100%;">
          <label>送货地址：</label>{{detail.deliveryAddress}}</li>
          <li style="width: 100%;">
          <label >居住地址：</label>{{detail.homeAddress}}</li>
          <li style="width: 100%;">
          <label>单位地址：</label>{{detail.empAddress}}</li>
          <li style="width: 100%;">
          <label >GPS地址：</label>{{detail.gps}}</li>
          <li style="width: 100%;">
          <label >身份证地址：</label>{{detail.idNoAddress}}</li>

        </ul>
      </table>
    </div>

    <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinhangqia"></use>
            </svg>银行卡信息</th>
        </tr>
        <ul>
          <li>
            <label >银行卡号：</label>{{detail.cardNo}}</li>
          <li>
            <label >开户银行：</label>{{detail.bankName}}</li>
          <li>
            <label >银行预留手机：</label>{{detail.bankMobile}}</li>
          <li>
            <label >绑卡认证结果：</label>{{detail.cardResult}}</li>
          
        </ul>
      </table>
    </div>

    <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-lianxiren"></use>
            </svg>联系人信息</th>
        </tr>
           <el-table :data="this.detail.contactList" size="mini" border style="color:blue; font-size:8px">
                <el-table-column prop="contactName" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="contactPhone" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="contactRelationship" label="关系" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center">
                </el-table-column>
            </el-table>
      </table>
    </div>


    <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shengpi"></use>
            </svg>审批信息</th>
        </tr>
        <ul class="place">
          <li>
            <label >审批结果：</label>{{detail.status}}</li>
          <li>
            <label >审批额度：</label>{{detail.preApproveMoney}}</li>
          <li>
            <label >还款方式：</label>{{detail.preApproveRepayMethod}}</li>
          <li>
            <label >月利率：</label>{{detail.preApproveMonthRate}}</li>
          <li>
            <label >审批借款期限：</label>{{detail.preApproveTerm}}</li>
          <li>
            <label >拒绝原因：</label>{{detail.refuseReason}}</li>  
        </ul>
      </table>
    </div>


  <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shengpi"></use>
            </svg>征信信息</th>
        </tr>
        <ul class="place">
          <li>
            <label >芝麻分：</label>{{detail.zmCreditScore}}</li>
          <li>
            <label >内部征信分：</label>{{detail.innerCredits}}</li> 
        </ul>
      </table>
    </div>
    
    <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shenpi3"></use>
            </svg>审批记录</th>
        </tr>
           <el-table :data="this.detail.nodeList" size="mini" border style="color:blue; font-size:8px">
                <el-table-column prop="nodeName" label="节点" align="center">
                </el-table-column>
                <el-table-column prop="beginTime" label="开始时间" align="center">
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间" align="center">
                </el-table-column>
                
                <el-table-column prop="result" label="操作结果" align="center">
                </el-table-column>
                <el-table-column prop="operater" label="操作人" align="center">
                </el-table-column>
            </el-table>
      </table>
    </div>

    <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-disanfangdanbao"></use>
            </svg>三方信息</th>
        </tr>
        <ul>
          <li style="width: 100%;" >
            <label >信用卡认证：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.creditAuthUrl)">{{detail.creditAuthUrl}}
            </el-button></li>

          <li style="width: 100%;">
            <label >社保公积金认证：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.sociSecuAuthUrl)">{{detail.sociSecuAuthUrl}}
            </el-button></li>
          <li style="width: 100%;">
            <label >京东认证：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.jdAuthUrl)">{{detail.jdAuthUrl}}
            </el-button></li>
          <li style="width: 100%;">
            <label >支付宝认证：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.zfbAuthUrl)">{{detail.zfbAuthUrl}}
            </el-button></li>
          <li style="width: 100%;">
            <label >学信认证：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.chsiAuthUrl)">{{detail.chsiAuthUrl}}
            </el-button></li>
          <li style="width: 100%;">
            <label >芝麻信用认证：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.zhimaAuthUrl)">{{detail.zhimaAuthUrl}}
            </el-button></li>
          <!-- <li style="width: 100%;">
            <label >通话详单认证：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.callAuthUrl)">{{detail.callAuthUrl}}
            </el-button></li> -->
          <li style="width: 100%;">
            <label >人行征信报告认证：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.pbccrcAuthUrl)">{{detail.pbccrcAuthUrl}}
            </el-button></li>
          <li style="width: 100%;">
            <label >运营商报告：</label><el-button type="text" size="small" class="bottonurl" @click="getLink(detail.operatorAuthUrl)">{{detail.operatorAuthUrl}}
            </el-button></li>

        </ul>
      </table>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {

      //基本信息
      detail: {},
    };
  },
  mounted() {
    this.getdetail();
  },
  methods: {
    //查看认证
    getLink(url){
      window.open(url)
    },

    getdetail() {
      let data={
        processNo:this.$route.query.processNo
      };
      this.$http
        .post(this.$store.state.domain +"/loanManage/custInfo",data)
        .then(
          response => {
            if (response.data.code == 0) {
              this.detail = response.data.detail.result;

            }
          },
          response => {
            //console.log(response);
          }
        );
    }
  },
  watch: {},
  components: {}
};
</script>

 <style lang='less' scoped>

// @import "index.less";
* {
  font-size: 14px;

  box-sizing: border-box;

  list-style: none;
}

table {
  border: none;
}

ul {
  display: flex;
  flex-wrap: wrap;

  width: 100%;

// 上左右下
  margin: 10px 0 10px;

  li {
    line-height: 40px;

    width: 40%;
    height: 40px;

    label {
      float: left;

      width: 130px;
      margin-right: 10px;

      text-align: right;

      color: #b48e3d;
    }
  }
}

.outpadding {
  padding: 30px 0;
}

svg {
  padding: -1px 8px !important;
}

















</style>
