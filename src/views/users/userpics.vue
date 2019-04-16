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
          <span class="tspan">身份证正面</span>
              <div class="pic"><img :src="detail.idCardFront"></div>
            </div>
            <div class="itempic">
          <span class="tspan">身份证反面</span>
              <div class="pic"><img :src="detail.idCardBack"></div>
            </div>
            <div class="itempic">
            <span class="tspan">客户半身照</span>
              <div class="pic"><img :src="detail.imageHalfBody"></div>
              <!-- <div class="name">{{item.name}}</div> -->
            </div>
            </td>
        </tr>
        
        <tr>
          <td>
            <div class="itempic" v-for="item in detail.urlimg" :key="item.id">
            <span class="tspan">客户照片</span>
              <div class="pic"><img :src="item"></div>
            </div>
          </td>
        </tr>
        
        <tr>
          <td class="othertd">
            <div v-if="show">
            <div class="itempic itempics" v-for="item in detail.otherimg" :key="item.id" >
            <span class="tspan">其他影像资料</span>
              <div class="picother"> 
              <img :src="item">
              </div>
            </div>
            </div>

            <div class="itempic itempics" v-if="shows">
            <span class="tspan">其他影像资料</span>
              <div class="picother"> 
              <img :src="detail.othimge">
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="itempic">
          <span class="tspan">ocr照片</span>
              <div class="pic"><img :src="detail.ocrImage"></div>
              <!-- <div class="name">{{item.name}}</div> -->
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
      show:false,
      shows:false,
      detail: {
        urlimg:"",
        otherimg:"",
        othimge:""
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
              this.detail.urlimg = response.data.detail.result.customerImage.split(";");
              var oth = response.data.detail.result.imageOther;
              if(oth==null){
                this.detail.otherimg=""
                console.log("空的")
              }
              else if(oth.indexOf(";") != -1){
                this.detail.otherimg=oth.split(";");
                this.show=true;
                console.log("多张")
              }
              else{
                this.detail.othimge = oth;
                this.shows=true;
                console.log("1张")
              }
              console.log(this.detail.urlimg)
              console.log(this.detail.otherimg)
              console.log(this.detail.othimge)
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
  float: left;

  height: 320px;
  margin: 10px;
  padding: 10px;

  text-align: center;

  .pic {
    img {
      width: 330px;
      height: 230px;

      border: 1px solid rgb(131, 124, 124);
      border-radius: 15px;
    }
  }

  //其他影像
  .picother {
    img {
      width: 330px;
      height: 230px;

      border: 1px solid rgba(197, 194, 194, .418);
      border-radius: 15px;
    }
  }
}

.tspan {
  font-size: 14px;

  display: block;

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

  border: 1px solid rgb(153, 150, 150);
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
