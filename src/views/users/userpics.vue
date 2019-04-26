<template>
  <div>
    <div class="el-table el-table--fit  el-table--enable-row-hover el-table--enable-row-transition">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tupian1"></use>
            </svg>图片信息
          </th>
        </tr>
        
        <tr>
          <td>
          <div class="itempic">
              <div class="tspan">身份证正面</div>
              <div class="pic"><img :src="detail.idCardFront"></div>
            </div>

          <div class="itempic">
              <div class="tspan">身份证反面</div>
              <div class="pic"><img :src="detail.idCardBack"></div>
            </div>

          <div class="itempic">
              <div class="tspan">客户半身照</div>
              <div class="pic"><img :src="(detail.imageHalfBody=='' || this.detail.imageHalfBody==null)? 'https://5b0988e595225.cdn.sohucs.com/images/20180118/a0163c6be9d247918669229bed6c7280.png':detail.imageHalfBody"></div>
            </div>
            
            </td>
        </tr>
        
        <tr v-if="(this.detail.urlimg=='' || this.detail.urlimg==null)? false:true">
          <td>
            <div class="itempic" v-for="item in detail.urlimg" :key="item.id">
              <div class="tspan">客户照片</div>
              <div class="pic"><img :src="item"></div>
            </div>
          </td>
        </tr>
        
        <tr v-if="saw">
          <td class="othertd">
            <div v-if="show">
            <div class="itempic " v-for="item in detail.otherimg" :key="item.id" >
            <div class="tspan">其他影像资料</div>
              <div class="picother"> 
              <img :src="item">
              </div>
            </div>
            </div>

            <div class="itempic" v-if="shows">
            <div class="tspan">其他影像资料</div>
              <div class="picother"> 
              <img :src="detail.othimge">
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="itempic">
            <div class="tspan">ocr照片</div>
              <div class="pic"><img :src="(detail.ocrImage == null || detail.ocrImage =='')?  'https://5b0988e595225.cdn.sohucs.com/images/20180118/a0163c6be9d247918669229bed6c7280.png': detail.ocrImage"></div>
            </div>
            </td>
        </tr>

      </table>

    </div>
  </div>
  </template>
  

<script>
export default {
  data() {
    return {
      saw:false,
      show:false,
      shows:false,

      detail: {
        urlimg:"",
        otherimg:"",
        othimge:"",
        customerImage:"",
        idCardBack:"",
        idCardFront:""
      },
    };
  },
  mounted() {
    this.getdetail();
  },
  methods: {
    changetab(tab, event) {
      // //console.log(tab, event);
    },
    getdetail() {
      let data={
        processNo:this.$route.query.processNo
      };
      this.$http
        .post(this.$store.state.domain +"/loanManage/imageList",data)
        .then(
          response => {
            if (response.data.code == 0) {
              this.detail = response.data.detail.result;

              this.detail.urlimg = (response.data.detail.result.customerImage).split(";");

              var oth = response.data.detail.result.imageOther;

              if(oth==null){
                this.detail.otherimg=""
                console.log("其他影像是空的")
              }
              else if(oth.indexOf(";") != -1){
                this.detail.otherimg=oth.split(";");
                this.saw=true;
                this.show=true;
                console.log("其他影像有多张")
              }
              else {
                this.detail.othimge = oth;
                this.saw=true;
                this.shows=true;
                console.log("其他影像只有1张")
              }

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
.itempic {
  display: inline-table;

  height: 300px;
  padding: 10px;
  position: relative;

  .pic {
      margin-top: 20px;
    img {
      width: 330px;
      height: 230px;
      border: 1px solid rgba(131, 124, 124, 0.767);
      border-radius: 15px;
    }
  }

  //其他影像
  .picother {
      margin-top: 20px;
    img {
      width: 330px;
      height: 230px;
      border: 1px solid rgba(197, 194, 194, .418);
      border-radius: 15px;
    }
  }
}

.tspan {
  top:0;
  left: 40%;
  position: absolute;
  font-size: 14px;
  height: 320px;
  margin-bottom: 20px;
}

//其他影像资料高度
.itempics {
  height: 440px;
}

td {
  // display: flex;
  width: 100%;

  text-align: center;

  border-bottom: 1px solid rgb(153, 150, 150);
}

* {
  font-size: 14px;

  box-sizing: border-box;

  list-style: none;
}

table {
  border: none;
}

.outpadding {
  padding: 30px 20px;
}

</style>
