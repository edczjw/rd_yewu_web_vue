<template>
  <div>

    <div class="el-table">
      <table width="100%" >
        <tr colspan="6" >
          <th colspan="6" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-hetong"></use>
            </svg>合同基础信息
          </th>
        </tr>
        <ul>
          <li>
            <label >客户姓名：</label>{{detail.custName}}
          </li>
          <li>
            <label >手机号：</label>{{detail.phone}}</li>
          <li>
            <label >借款渠道：</label>{{detail.sex}}</li>
          <li>
            <label >电子合同号：</label>{{detail.age}}</li>
          <li>
            <label >产品名称：</label>{{detail.applyLimit}}</li>
          <li>
            <label >签约时间：</label>{{detail.applyTerm}}{{detail.month}}</li>
          <li>
            <label >合同金额：</label>{{detail.goods}}</li>
          <li>
            <label >计息方式：</label>{{detail.goodsMoney}}</li>
          <li>
            <label >借款期限：</label>{{detail.occupation}}</li>
          <li>
            <label >单期利率：</label>{{detail.monthSalary}}</li>
          <li>
            <label >借款用途：</label>{{detail.empName}}</li>
        </ul>
      </table>
    </div>

    <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huankuan"></use>
            </svg>还款概要</th>
        </tr>
        <ul>
          <li>
            <label >已还期数：</label>{{detail.cardNo}}</li>
          <li>
            <label >剩余期数：</label>{{detail.bankName}}</li>
          <li>
            <label >已还本金：</label>{{detail.bankMobile}}</li>
          <li>
            <label >剩余本金：</label>{{detail.cardResult}}</li>
          <li>
            <label >已还利息：</label>{{detail.cardResult}}</li>
          <li>
            <label >剩余利息：</label>{{detail.cardResult}}</li>
        </ul>
      </table>
    </div>

    <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yuqi"></use>
            </svg>逾期概要</th>
        </tr>
        <ul class="place">
          <li>
            <label >总逾期期数：</label>{{detail.preApproveResult}}</li>
          <li>
            <label >当前状态：</label>{{detail.preApproveMoney}}</li>
          <li>
            <label >总逾期天数：</label>{{detail.preApproveRepayMethod}}</li>
          <li>
            <label >最大逾期天数：</label>{{detail.preApproveMonthRate}}</li>
          <li>
            <label >累计滞纳金：</label>{{detail.preApproveTerm}}</li>
          <li>
            <label >累计罚息：</label>{{detail.preApproveRefuseReason}}</li>  
        </ul>
      </table>
    </div>

    <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jihua"></use>
            </svg>还款计划</th>
        </tr>
           <el-table :data="this.detail.contactList" size="mini" border style="color:blue; font-size:8px">
                <el-table-column prop="index" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="contactPhone" label="还款日" align="center">
                </el-table-column>
                <el-table-column prop="contactRelationship" label="本金" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="利息" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="罚息" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="合计" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="实还" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="结清" align="center">
                </el-table-column>
            </el-table>
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
  list-style: none;
  box-sizing: border-box;
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
    width: 40%;
    height: 40px;
    line-height: 40px;
    label {
      width: 130px;
      margin-right: 10px;
      text-align: right;
      float: left;
      color: #b48e3d;
    }
  }
}
.outpadding {
  padding: 30px 0px;
}
svg {
  padding: -1px 8px !important;
}
</style>
