<template>
  <div class="sld-index">
    <div id="dtop" class="gotop" title="返回顶部" @click="movetop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhuidingbu" />
      </svg>
    </div>
    <div class="top-banner">
      <p style="cursor:pointer;">
        <i class="el-icon-location-outline"></i>
        Hi~{{this.phone}}
      </p>
      <span @click="goBack" title="安全退出" style="cursor:pointer;">
        <i class="el-icon-remove-outline"></i> 退出
      </span>
    </div>
    <div class="mo">
      <p>民盛赎楼贷信息平台</p>
    </div>

    <div class="card">
      <el-card class="card1">
        <div class="step">
          <el-steps :active="this.action" direction="vertical">
            <el-step title="基本信息" icon="el-icon-edit"></el-step>
            <el-step title="影像资料" icon="el-icon-upload"></el-step>
            <el-step title="预览提交" icon="el-icon-picture"></el-step>
          </el-steps>
        </div>
      </el-card>
      <el-card class="card2">
        <div class="cute-tip">
          <p v-if="this.action==1? true:false">基本信息</p>
          <p v-if="this.action==2? true:false">影像资料</p>
          <p v-if="this.action==3? true:false">预览提交</p>
        </div>
        <!-- 基本信息 -->
        <div v-if="this.action==1? true:false" class="mess">
          <el-form :model="setForm" status-icon ref="setForm" class="demo-ruleForm">
            <el-form-item prop="name" :rules="rules.kong">
              姓名
              <el-input size="small" v-model.trim="setForm.name" auto-complete="off"></el-input>
              <span>
                <i class="el-icon-info"></i> 请确保您的姓名与身份证上的信息保持一致
              </span>
            </el-form-item>

            <el-form-item prop="phone" :rules="rules.phone">
              电话
              <el-input size="small" v-model.trim="setForm.phone"></el-input>
              <span>
                <i class="el-icon-info"></i> 请确保输入正确格式的手机号码
              </span>
            </el-form-item>

            <el-form-item prop="idcard" :rules="rules.checkid">
              身份证号码
              <el-input size="small" v-model.trim="setForm.idcard"></el-input>
              <span>
                <i class="el-icon-info"></i> 请确保您的身份证号码与身份证上的信息保持一致
              </span>
            </el-form-item>

            <el-form-item prop="bankid" :rules="rules.kong">
              银行卡号
              <el-input size="small" v-model.trim="setForm.bankid"></el-input>
              <span>
                <i class="el-icon-info"></i> 请确保输入正确格式的银行卡号
              </span>
            </el-form-item>
          </el-form>
          <el-row class="el-row-nextbut">
            <div class="nextbut" @click="next('setForm')">下一步</div>
          </el-row>
        </div>

        <!-- 影像资料 -->
        <div v-if="this.action==2? true:false" class="mess">
          <el-button size="mini" type="primary">身份证正面照</el-button>
          <el-row class="table-row">
            <el-col :span="4">
              <el-upload
                class="avatar-uploader"
                drag
                :limit="1"
                :http-request="Upload1"
                :file-list="fileList1"
                :on-exceed="handleExceed1"
                :before-upload="beforeAvatarUpload1"
                :on-change="handleChange1"
                :on-remove="handleRemove1"
                action
              >
                <img v-if="setForm.idcardFront.length>0" :src="setForm.idcardFront" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-progress
                v-if="videoFlag1"
                :percentage="videoUploadPercent1"
                style="margin-top:30px;"
              ></el-progress>
            </el-col>
          </el-row>

          <el-button size="mini" type="primary">身份证反面照</el-button>
          <el-row class="table-row">
            <el-col :span="4">
              <el-upload
                class="avatar-uploader"
                drag
                :limit="1"
                :http-request="Upload2"
                :file-list="fileList2"
                :on-exceed="handleExceed2"
                :before-upload="beforeAvatarUpload2"
                :on-change="handleChange2"
                :on-remove="handleRemove2"
                action
              >
                <img v-if="setForm.idcardBack.length>0" :src="setForm.idcardBack" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-progress
                v-if="videoFlag2"
                :percentage="videoUploadPercent2"
                style="margin-top:30px;"
              ></el-progress>
            </el-col>
          </el-row>

          <el-button size="mini" type="primary">业务办理照片</el-button>
          <el-row class="table-row">
            <el-col :span="24">
              <el-upload
                class="avatar-uploader"
                drag
                :limit="9"
                :http-request="Upload3"
                :file-list="fileList3"
                :on-exceed="handleExceed3"
                :before-upload="beforeAvatarUpload3"
                :on-change="handleChange3"
                :on-remove="handleRemove3"
                multiple
                action
              >
                <el-row v-if="setForm.businessImg.length>0">
                  <el-col v-for="(item,index) in setForm.businessImg" :key="index">
                    <img :src="item" class="avatar" />
                  </el-col>
                </el-row>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-progress
                v-if="videoFlag3"
                :percentage="videoUploadPercent3"
                style="margin-top:30px;"
              ></el-progress>
            </el-col>
          </el-row>
          <el-button size="mini" type="primary">借款合同</el-button>
          <el-tag type="warning" size="mini" style="margin-left:10px;">只能上传jpg格式图片和zip个格式压缩包</el-tag>
          <el-row class="table-row">
            <el-col :span="4">
              <el-upload
                class="avatar-uploader"
                drag
                :limit="9"
                :http-request="Upload4"
                :file-list="fileList4"
                :on-exceed="handleExceed4"
                :before-upload="beforeAvatarUpload4"
                :on-change="handleChange4"
                :on-remove="handleRemove4"
                multiple
                action
              >
                <el-row v-if="setForm.loanContractImg.length>0">
                  <el-col v-for="(item,index) in setForm.loanContractImg" :key="index">
                    <img v-if="item.indexOf('jpg')>0" :src="item" class="avatar" />
                    <span v-else>{{item}}</span>
                  </el-col>
                </el-row>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-progress
                v-if="videoFlag4"
                :percentage="videoUploadPercent4"
                style="margin-top:30px;"
              ></el-progress>
            </el-col>
          </el-row>
          <el-button size="mini" type="primary">委托合同</el-button>
          <el-tag type="warning" size="mini" style="margin-left:10px;">只能上传jpg格式图片和zip个格式压缩包</el-tag>
          <el-row class="table-row">
            <el-col :span="4">
              <el-upload
                class="avatar-uploader"
                drag
                :limit="9"
                :http-request="Upload5"
                :file-list="fileList5"
                :on-exceed="handleExceed5"
                :before-upload="beforeAvatarUpload5"
                :on-change="handleChange5"
                :on-remove="handleRemove5"
                multiple
                action
              >
                <el-row v-if="setForm.appointmentContractImg.length>0">
                  <el-col v-for="(item,index) in setForm.appointmentContractImg" :key="index">
                    <img v-if="item.indexOf('jpg')>0" :src="item" class="avatar" />
                    <span v-else>{{item}}</span>
                  </el-col>
                </el-row>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-progress
                v-if="videoFlag5"
                :percentage="videoUploadPercent5"
                style="margin-top:30px;"
              ></el-progress>
            </el-col>
          </el-row>
          <el-button size="mini" type="primary">质押合同</el-button>
          <el-tag type="warning" size="mini" style="margin-left:10px;">只能上传jpg格式图片和zip个格式压缩包</el-tag>
          <el-row class="table-row">
            <el-col :span="4">
              <el-upload
                class="avatar-uploader"
                drag
                :limit="9"
                :http-request="Upload6"
                :file-list="fileList6"
                :on-exceed="handleExceed6"
                :before-upload="beforeAvatarUpload6"
                :on-change="handleChange6"
                :on-remove="handleRemove6"
                multiple
                action
              >
                <el-row v-if="setForm.pledgeContractImg.length>0">
                  <el-col v-for="(item,index) in setForm.pledgeContractImg" :key="index">
                    <img v-if="item.indexOf('jpg')>0" :src="item" class="avatar" />
                    <span v-else>{{item}}</span>
                  </el-col>
                </el-row>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-progress
                v-if="videoFlag6"
                :percentage="videoUploadPercent6"
                style="margin-top:30px;"
              ></el-progress>
            </el-col>
          </el-row>
          <el-row class="el-row-nextbut">
            <span class="nextbut" @click="back(1)">上一步</span>
            <span class="nextbut" @click="next2()">下一步</span>
          </el-row>
        </div>

        <!-- 预览 -->
        <div v-if="this.action==3? true:false" class="mess">
          <el-row class="messrow">
            <el-col :span="6">姓名</el-col>
            <el-col :span="18">{{setForm.name}}</el-col>
          </el-row>
          <el-row class="messrow">
            <el-col :span="6">电话号码</el-col>
            <el-col :span="18">{{setForm.phone}}</el-col>
          </el-row>
          <el-row class="messrow">
            <el-col :span="6">身份证号码</el-col>
            <el-col :span="18">{{setForm.idcard}}</el-col>
          </el-row>
          <el-row class="messrow">
            <el-col :span="6">银行卡号</el-col>
            <el-col :span="18">{{setForm.bankid}}</el-col>
          </el-row>

          <el-row class="imgrow">
            <el-col :span="6">身份证正面照</el-col>
            <el-col :span="18">
              <img :src="setForm.idcardFront" alt />
            </el-col>
          </el-row>

          <el-row class="imgrow">
            <el-col :span="6">身份证反面照</el-col>
            <el-col :span="18">
              <img :src="setForm.idcardBack" alt />
            </el-col>
          </el-row>

          <el-row class="imgrow">
            <el-col :span="6">业务办理照片</el-col>
            <el-col :span="18" class="imgrow-col">
              <img v-for="(item, index) in setForm.businessImg" :src="item" :key="index" alt />
            </el-col>
          </el-row>

          <el-row class="imgrow">
            <el-col :span="6">借款合同</el-col>
            <el-col :span="18" v-if="setForm.loanContractImg.length>0">
              <el-col
                v-for="(item,index) in setForm.loanContractImg"
                :key="index"
                class="imgrow-col"
              >
                <img v-if="item.indexOf('jpg')>0" :src="item" class="avatar" />
                <span v-else>{{item}}</span>
              </el-col>
            </el-col>
          </el-row>

          <el-row class="imgrow">
            <el-col :span="6">委托合同</el-col>

            <el-col :span="18" v-if="setForm.appointmentContractImg.length>0">
              <el-col
                v-for="(item,index) in setForm.appointmentContractImg"
                :key="index"
                class="imgrow-col"
              >
                <img v-if="item.indexOf('jpg')>0" :src="item" class="avatar" />
                <span v-else>{{item}}</span>
              </el-col>
            </el-col>
          </el-row>

          <el-row class="imgrow">
            <el-col :span="6">质押合同</el-col>
            <el-col :span="18" v-if="setForm.pledgeContractImg.length>0">
              <el-col
                v-for="(item,index) in setForm.pledgeContractImg"
                :key="index"
                class="imgrow-col"
              >
                <img v-if="item.indexOf('jpg')>0" :src="item" class="avatar" />
                <span v-else>{{item}}</span>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-nextbut">
            <div class="nextbut" @click="back(2)">上一步</div>
            <div class="nextbut" @click="next2()">提交</div>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import rules from "../../untils/rule";
export default {
  name: "",
  data() {
    return {
      rules,
      fileList1: [], //文件容器
      fileList2: [], //文件容器
      fileList3: [], //文件容器
      fileList4: [], //文件容器
      fileList5: [], //文件容器
      fileList6: [], //文件容器
      videoFlag1: false, //进度条
      videoFlag2: false, //进度条
      videoFlag3: false, //进度条
      videoFlag4: false, //进度条
      videoFlag5: false, //进度条
      videoFlag6: false, //进度条
      videoUploadPercent1: 0,
      videoUploadPercent2: 0,
      videoUploadPercent3: 0,
      videoUploadPercent4: 0,
      videoUploadPercent5: 0,
      videoUploadPercent6: 0,
      action: 1,
      phone: "",
      setForm: {
        name: "",
        phone: "",
        idcard: "",
        bankid: "",
        idcardFront: "",
        idcardBack: "",
        businessImg: [],
        loanContractImg: [],
        appointmentContractImg: [],
        pledgeContractImg: []
      }
    };
  },
  created() {
    var phone = sessionStorage.getItem("phone");
    this.phone = phone;
    //登陆成功提示
    // this.openCenter();
  },
  mounted() {
    window.addEventListener("scroll", this.returntop, true); // 监听（绑定）滚轮滚动事件
  },
  methods: {
    back(index) {
      this.action = index;
    },
    returntop() {
      //返回顶部
      var htop;
      if (document.documentElement && document.documentElement.scrollTop) {
        htop = document.documentElement.scrollTop;
      } else if (document.body) {
        htop = document.body.scrollTop;
      }
      var dtops = document.getElementById("dtop"); //获取图标
      //判断滚动条滚动长度
      if (htop > 100) {
        dtops.style.display = "block";
      } else {
        dtops.style.display = "none";
      }
    },
    movetop() {
      window.scrollTo(0, -1);
      document.documentElement.scrollTop = 0;
    },
    openCenter() {
      if (this.phone != null) {
        this.$message({
          dangerouslyUseHTMLString: true, //表示提示的是html片段
          message:
            '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-jiqiren"></use> </svg> ' +
            "欢迎登陆赎楼贷管理系统！",
          type: "success",
          center: true
        });
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message:
            '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-shengqi"></use> </svg> ' +
            "请先登录！",
          type: "warning",
          center: true
        });
        this.$router.push("/sld/login");
      }
    },

    //上传身份证正面
    Upload1(file) {
      var _that = this;
      this.videoFlag1 = true;
      const OSS = require("ali-oss");
      let _self = this;
      var bucket; //OSS文件名称
      var region;
      var extranet;
      var accessKeyId;
      var accessKeySecret;
      // 存储路径，并且给图片改成唯一名字

      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/sld/getAliyunOss"
      }).then(
        response => {
          // 向后台发请求 拉取OSS相关配置
          //后端提供数据
          const client = new OSS({
            region: "oss-cn-shenzhen", // 服务器集群地区
            extranet: response.data.extranet,
            accessKeyId: response.data.secretId, // OSS帐号
            accessKeySecret: response.data.secretKey, // OSS 密码
            bucket: response.data.bucket // 阿里云上存储的 Bucket
          });

          // this.receivables.push(fileName);
          var fileName = file.file.name;
          //时间戳
          const obj = this.timestamp();
          //时间戳
          const obj2 = this.timestamp1();
          //后缀名
          const suffix = fileName.substr(fileName.indexOf("."));

          //获取企业编号
          // const enterpriseNo = sessionStorage.getItem("enterpriseNo");
          const storeAs =
            "test/sld/userinfo/" +
            this.phone +
            "/" +
            obj +
            "-" +
            obj2 +
            "-" +
            fileName;
          //上传
          client
            .multipartUpload(storeAs, file.file, {
              progress: function(p) {
                //获取进度条的值
                _that.videoUploadPercent1 = p * 100;
              }
            })
            .then(res => {
              if (res.url != null || res.url != "") {
                this.setForm.idcardFront =
                  "http://slloan.oss-cn-shenzhen.aliyuncs.com/" + storeAs;
                //返回服务器文件url
                // this.videoFlag1 = false;
                _that.videoUploadPercent1 = 100;
                this.$notify({
                  title: "上传结果",
                  type: "success",
                  offset: 100,
                  dangerouslyUseHTMLString: true,
                  message:
                    "<strong>" + file.file.name + "文件上传成功！</strong>",
                  position: "bottom-left"
                });
              }
            })
            .catch(err => {
              this.$message.error("上传文件异常:" + err);
            });
          //失败
        },
        //打印
        response => {}
      );
    },
    handleRemove1(file, fileList) {
      this.videoFlag1 = false;
      this.setForm.idcardFront = "";
    },
    handleExceed1(files, fileList1) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList1.length} 个文件`
      );
    },
    beforeAvatarUpload1(file) {
      const length = this.fileList1.length <= 2;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!length) {
        this.$message.error("此项上传文件数量不得大于1份，上传第2份文件失败！");
      }
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return length && isLt2M && isJPG;
    },
    handleChange1(file, fileList) {
      this.fileList1 = fileList.slice(-3);
    },
    //上传身份证反面
    Upload2(file) {
      var _that = this;
      this.videoFlag2 = true;
      const OSS = require("ali-oss");
      let _self = this;
      var bucket; //OSS文件名称
      var region;
      var extranet;
      var accessKeyId;
      var accessKeySecret;
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/sld/getAliyunOss"
      }).then(
        response => {
          // 向后台发请求 拉取OSS相关配置
          //后端提供数据
          const client = new OSS({
            region: "oss-cn-shenzhen", // 服务器集群地区
            extranet: response.data.extranet,
            accessKeyId: response.data.secretId, // OSS帐号
            accessKeySecret: response.data.secretKey, // OSS 密码
            bucket: response.data.bucket // 阿里云上存储的 Bucket
          });

          // 存储路径，并且给图片改成唯一名字
          var fileName = file.file.name;

          // this.receivables.push(fileName);

          //后缀名
          const suffix = fileName.substr(fileName.indexOf("."));

          //时间戳
          const obj = this.timestamp();

          //时间戳
          const obj2 = this.timestamp1();

          //获取企业编号
          // const enterpriseNo = sessionStorage.getItem("enterpriseNo");

          const storeAs =
            "test/sld/userinfo/" +
            this.phone +
            "/" +
            obj +
            "-" +
            obj2 +
            "-" +
            fileName;

          //上传
          client
            .multipartUpload(storeAs, file.file, {
              progress: function(p) {
                //获取进度条的值
                _that.videoUploadPercent2 = p * 100;
              }
            })
            .then(res => {
              if (res.url != null || res.url != "") {
                //返回服务器文件url
                // this.videoFlag1 = false;
                _that.videoUploadPercent2 = 100;
                this.setForm.idcardBack =
                  "http://slloan.oss-cn-shenzhen.aliyuncs.com/" + storeAs;
                this.$notify({
                  title: "上传结果",
                  type: "success",
                  offset: 100,
                  dangerouslyUseHTMLString: true,
                  message:
                    "<strong>" + file.file.name + "文件上传成功！</strong>",
                  position: "bottom-left"
                });
              }
            })
            .catch(err => {
              this.$message.error("上传文件异常:" + err);
            });
          //失败
        },
        //打印
        response => {}
      );
    },
    handleRemove2(file, fileList) {
      this.videoFlag2 = false;
      this.setForm.idcardBack = "";
    },
    handleExceed2(files, fileList2) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList2.length} 个文件`
      );
    },
    beforeAvatarUpload2(file) {
      const length = this.fileList2.length <= 2;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!length) {
        this.$message.error("此项上传文件数量不得大于1份，上传第2份文件失败！");
      }
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return length && isLt2M && isJPG;
    },
    handleChange2(file, fileList) {
      this.fileList2 = fileList.slice(-3);
    },
    //业务办理照片
    Upload3(file) {
      var _that = this;
      this.videoFlag3 = true;
      const OSS = require("ali-oss");
      let _self = this;
      var bucket; //OSS文件名称
      var region;
      var extranet;
      var accessKeyId;
      var accessKeySecret;
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/sld/getAliyunOss"
      }).then(
        response => {
          // 向后台发请求 拉取OSS相关配置
          //后端提供数据
          const client = new OSS({
            region: "oss-cn-shenzhen", // 服务器集群地区
            extranet: response.data.extranet,
            accessKeyId: response.data.secretId, // OSS帐号
            accessKeySecret: response.data.secretKey, // OSS 密码
            bucket: response.data.bucket // 阿里云上存储的 Bucket
          });

          // 存储路径，并且给图片改成唯一名字
          var fileName = file.file.name;

          // this.receivables.push(fileName);

          //后缀名
          const suffix = fileName.substr(fileName.indexOf("."));

          //时间戳
          const obj = this.timestamp();

          //时间戳
          const obj2 = this.timestamp1();

          //获取企业编号
          // const enterpriseNo = sessionStorage.getItem("enterpriseNo");

          const storeAs =
            "test/sld/userinfo/" +
            this.phone +
            "/" +
            obj +
            "-" +
            obj2 +
            "-" +
            fileName;

          //上传
          client
            .multipartUpload(storeAs, file.file, {
              progress: function(p) {
                //获取进度条的值
                _that.videoUploadPercent3 = p * 100;
              }
            })
            .then(res => {
              if (res.url != null || res.url != "") {
                //返回服务器文件url
                // this.videoFlag1 = false;
                _that.videoUploadPercent3 = 100;
                this.setForm.businessImg.push(
                  "http://slloan.oss-cn-shenzhen.aliyuncs.com/" + storeAs
                );
                this.$notify({
                  title: "上传结果",
                  type: "success",
                  offset: 100,
                  dangerouslyUseHTMLString: true,
                  message:
                    "<strong>" + file.file.name + "文件上传成功！</strong>",
                  position: "bottom-left"
                });
              }
            })
            .catch(err => {
              this.$message.error("上传文件异常:" + err);
            });
          //失败
        },
        //打印
        response => {}
      );
    },
    handleRemove3(file, fileList) {
      var arr = [];
      arr = this.setForm.businessImg.filter(data => {
        return data.indexOf(file.name) < 0;
      });
      if (arr.length == 0) {
        this.videoFlag3 = false;
      }
      this.setForm.businessImg = arr;
    },
    handleExceed3(files, fileList3) {
      this.$message.warning(
        `当前限制选择 9 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList3.length} 个文件`
      );
    },
    beforeAvatarUpload3(file) {
      const length = this.fileList3.length <= 9;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!length) {
        this.$message.error(
          "此项上传文件数量不得大于9份，上传第10份文件失败！"
        );
      }
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return length && isLt2M && isJPG;
    },
    handleChange3(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    //借款合同
    Upload4(file) {
      var _that = this;
      this.videoFlag4 = true;
      const OSS = require("ali-oss");
      let _self = this;
      var bucket; //OSS文件名称
      var region;
      var extranet;
      var accessKeyId;
      var accessKeySecret;
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/sld/getAliyunOss"
      }).then(
        response => {
          // 向后台发请求 拉取OSS相关配置
          //后端提供数据
          const client = new OSS({
            region: "oss-cn-shenzhen", // 服务器集群地区
            extranet: response.data.extranet,
            accessKeyId: response.data.secretId, // OSS帐号
            accessKeySecret: response.data.secretKey, // OSS 密码
            bucket: response.data.bucket // 阿里云上存储的 Bucket
          });

          // 存储路径，并且给图片改成唯一名字
          var fileName = file.file.name;

          // this.receivables.push(fileName);

          //后缀名
          const suffix = fileName.substr(fileName.indexOf("."));

          //时间戳
          const obj = this.timestamp();

          //时间戳
          const obj2 = this.timestamp1();

          //获取企业编号
          // const enterpriseNo = sessionStorage.getItem("enterpriseNo");

          const storeAs =
            "test/sld/userinfo/" +
            this.phone +
            "/" +
            obj +
            "-" +
            obj2 +
            "-" +
            fileName;
          //上传
          client
            .multipartUpload(storeAs, file.file, {
              progress: function(p) {
                //获取进度条的值
                _that.videoUploadPercent4 = p * 100;
              }
            })
            .then(res => {
              if (res.url != null || res.url != "") {
                //返回服务器文件url
                // this.videoFlag1 = false;
                _that.videoUploadPercent4 = 100;
                this.setForm.loanContractImg.push(
                  "http://slloan.oss-cn-shenzhen.aliyuncs.com/" + storeAs
                );
                this.$notify({
                  title: "上传结果",
                  type: "success",
                  offset: 100,
                  dangerouslyUseHTMLString: true,
                  message:
                    "<strong>" + file.file.name + "文件上传成功！</strong>",
                  position: "bottom-left"
                });
              }
            })
            .catch(err => {
              this.$message.error("上传文件异常:" + err);
            });
          //失败
        },
        //打印
        response => {}
      );
    },
    handleRemove4(file, fileList) {
      var arr = [];
      arr = this.setForm.loanContractImg.filter(data => {
        return data.indexOf(file.name) < 0;
      });
      if (arr.length == 0) {
        this.videoFlag4 = false;
      }
      this.setForm.loanContractImg = arr;
    },
    handleExceed4(files, fileList4) {
      this.$message.warning(
        `当前限制选择 9 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList4.length} 个文件`
      );
    },
    beforeAvatarUpload4(file) {
      const length = this.fileList4.length <= 9;
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "application/x-zip-compressed";
      console.log(file.type);
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!length) {
        this.$message.error(
          "此项上传文件数量不得大于9份，上传第10份文件失败！"
        );
      }
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!或者是zip格式压缩包");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return length && isLt2M && isJPG;
    },
    handleChange4(file, fileList) {
      this.fileList4 = fileList.slice(-3);
    },
    //委托合同
    Upload5(file) {
      var _that = this;
      this.videoFlag5 = true;
      const OSS = require("ali-oss");
      let _self = this;
      var bucket; //OSS文件名称
      var region;
      var extranet;
      var accessKeyId;
      var accessKeySecret;
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/sld/getAliyunOss"
      }).then(
        response => {
          // 向后台发请求 拉取OSS相关配置
          //后端提供数据
          const client = new OSS({
            region: "oss-cn-shenzhen", // 服务器集群地区
            extranet: response.data.extranet,
            accessKeyId: response.data.secretId, // OSS帐号
            accessKeySecret: response.data.secretKey, // OSS 密码
            bucket: response.data.bucket // 阿里云上存储的 Bucket
          });

          // 存储路径，并且给图片改成唯一名字
          var fileName = file.file.name;

          // this.receivables.push(fileName);

          //后缀名
          const suffix = fileName.substr(fileName.indexOf("."));

          //时间戳
          const obj = this.timestamp();

          //时间戳
          const obj2 = this.timestamp1();

          //获取企业编号
          // const enterpriseNo = sessionStorage.getItem("enterpriseNo");

          const storeAs =
            "test/sld/userinfo/" +
            this.phone +
            "/" +
            obj +
            "-" +
            obj2 +
            "-" +
            fileName;

          //上传
          client
            .multipartUpload(storeAs, file.file, {
              progress: function(p) {
                //获取进度条的值
                _that.videoUploadPercent5 = p * 100;
              }
            })
            .then(res => {
              if (res.url != null || res.url != "") {
                //返回服务器文件url
                // this.videoFlag1 = false;
                _that.videoUploadPercent5 = 100;
                this.setForm.appointmentContractImg.push(
                  "http://slloan.oss-cn-shenzhen.aliyuncs.com/" + storeAs
                );
                this.$notify({
                  title: "上传结果",
                  type: "success",
                  offset: 100,
                  dangerouslyUseHTMLString: true,
                  message:
                    "<strong>" + file.file.name + "文件上传成功！</strong>",
                  position: "bottom-left"
                });
              }
            })
            .catch(err => {
              this.$message.error("上传文件异常:" + err);
            });
          //失败
        },
        //打印
        response => {}
      );
    },
    handleRemove5(file, fileList) {
      var arr = [];
      arr = this.setForm.appointmentContractImg.filter(data => {
        return data.indexOf(file.name) < 0;
      });
      if (arr.length == 0) {
        this.videoFlag5 = false;
      }
      this.setForm.appointmentContractImg = arr;
    },
    handleExceed5(files, fileList5) {
      this.$message.warning(
        `当前限制选择 9 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList5.length} 个文件`
      );
    },
    beforeAvatarUpload5(file) {
      const length = this.fileList5.length <= 9;
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "application/x-zip-compressed";
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!length) {
        this.$message.error(
          "此项上传文件数量不得大于9份，上传第10份文件失败！"
        );
      }
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!或者是zip格式压缩包");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return length && isLt2M && isJPG;
    },
    handleChange5(file, fileList) {
      this.fileList5 = fileList.slice(-3);
    },
    //质押合同照
    Upload6(file) {
      var _that = this;
      this.videoFlag6 = true;
      const OSS = require("ali-oss");
      let _self = this;
      var bucket; //OSS文件名称
      var region;
      var extranet;
      var accessKeyId;
      var accessKeySecret;
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/sld/getAliyunOss"
      }).then(
        response => {
          // 向后台发请求 拉取OSS相关配置
          //后端提供数据
          const client = new OSS({
            region: "oss-cn-shenzhen", // 服务器集群地区
            extranet: response.data.extranet,
            accessKeyId: response.data.secretId, // OSS帐号
            accessKeySecret: response.data.secretKey, // OSS 密码
            bucket: response.data.bucket // 阿里云上存储的 Bucket
          });

          // 存储路径，并且给图片改成唯一名字
          var fileName = file.file.name;

          // this.receivables.push(fileName);

          //后缀名
          const suffix = fileName.substr(fileName.indexOf("."));

          //时间戳
          const obj = this.timestamp();

          //时间戳
          const obj2 = this.timestamp1();

          //获取企业编号
          // const enterpriseNo = sessionStorage.getItem("enterpriseNo");

          const storeAs =
            "test/sld/userinfo/" +
            this.phone +
            "/" +
            obj +
            "-" +
            obj2 +
            "-" +
            fileName;

          //上传
          client
            .multipartUpload(storeAs, file.file, {
              progress: function(p) {
                //获取进度条的值
                _that.videoUploadPercent6 = p * 100;
              }
            })
            .then(res => {
              if (res.url != null || res.url != "") {
                //返回服务器文件url
                // this.videoFlag1 = false;
                _that.videoUploadPercent6 = 100;
                this.setForm.pledgeContractImg.push(
                  "http://slloan.oss-cn-shenzhen.aliyuncs.com/" + storeAs
                );

                this.$notify({
                  title: "上传结果",
                  type: "success",
                  offset: 100,
                  dangerouslyUseHTMLString: true,
                  message:
                    "<strong>" + file.file.name + "文件上传成功！</strong>",
                  position: "bottom-left"
                });
              }
            })
            .catch(err => {
              this.$message.error("上传文件异常:" + err);
            });
          //失败
        },
        //打印
        response => {}
      );
    },
    handleRemove6(file, fileList) {
      var arr = [];
      arr = this.setForm.pledgeContractImg.filter(data => {
        return data.indexOf(file.name) < 0;
      });
      if (arr.length == 0) {
        this.videoFlag6 = false;
      }
      this.setForm.pledgeContractImg = arr;
    },
    handleExceed6(files, fileList6) {
      this.$message.warning(
        `当前限制选择 9 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList6.length} 个文件`
      );
    },
    beforeAvatarUpload6(file) {
      const length = this.fileList6.length <= 9;
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "application/x-zip-compressed";
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!length) {
        this.$message.error(
          "此项上传文件数量不得大于9份，上传第10份文件失败！"
        );
      }
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!或者是zip格式压缩包");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return length && isLt2M && isJPG;
    },
    handleChange6(file, fileList) {
      this.fileList6 = fileList.slice(-3);
    },
    //  时间戳
    timestamp() {
      const time = new Date();
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const h = time.getHours();
      const mm = time.getMinutes();
      const s = time.getSeconds();
      return "" + y + "-" + this.Add0(m) + "-" + this.Add0(d);
    },
    Add0: function(m) {
      return m < 10 ? "0" + m : m;
    },

    //  时间戳1
    timestamp1() {
      const time = new Date();
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const h = time.getHours();
      const mm = time.getMinutes();
      const s = time.getSeconds();
      return (
        "" +
        y +
        "-" +
        this.Add1(m) +
        "-" +
        this.Add1(d) +
        "_" +
        this.Add1(h) +
        this.Add1(mm) +
        this.Add1(s)
      );
    },
    Add1: function(m) {
      return m < 10 ? "0" + m : m;
    },
    next2() {
      if (this.action == 2) {
        if (this.setForm.idcardFront.length == 0) {
          this.$message.error({
            message: "请上传身份证正面照"
          });
          return;
        } else if (this.setForm.idcardBack.length == 0) {
          this.$message.error({
            message: "请上传身份证反面照"
          });
          return;
        } else if (this.setForm.businessImg.length == 0) {
          this.$message.error({
            message: "请上传业务办理照片"
          });
          return;
        } else if (this.setForm.loanContractImg.length == 0) {
          this.$message.error({
            message: "请上传借款合同"
          });
          return;
        } else if (this.setForm.appointmentContractImg.length == 0) {
          this.$message.error({
            message: "请上传委托合同"
          });
          return;
        } else if (this.setForm.pledgeContractImg.length == 0) {
          this.$message.error({
            message: "请上传质押合同"
          });
          return;
        }
        this.action = 3;
      } else if (this.action == 3) {
        var data = {
          name: this.setForm.name,
          phone: this.setForm.phone,
          idcard: this.setForm.idcard,
          bankid: this.setForm.bankid,
          idcardFront: this.setForm.idcardFront,
          idcardBack: this.setForm.idcardBack,
          businessImg: this.setForm.businessImg.join(","),
          loanContractImg: this.setForm.loanContractImg.join(","),
          appointmentContractImg: this.setForm.appointmentContractImg.join(","),
          pledgeContractImg: this.setForm.pledgeContractImg.join(",")
        };

        this.$axios({
          method: "post",
          url: this.$store.state.domain + "/sld/user/pushuserinfo",
          data: data
        })
          .then(response => {
            if (response.data.code == 0) {
              this.$alert("成功!", "提交信息", {
                confirmButtonText: "确定",
                center: true,
                type: "success",
                callback: action => {
                  this.action = 1;
                  this.setForm = {
                    name: "",
                    phone: "",
                    idcard: "",
                    bankid: "",
                    idcardFront: "",
                    idcardBack: "",
                    businessImg: [],
                    loanContractImg: [],
                    appointmentContractImg: [],
                    pledgeContractImg: []
                  };
                }
              });
            } else {
              this.$message.error(response.data.msg);
            }
          })
          .catch(function(error) {});
      }
    },
    //退出登陆
    goBack() {
      this.$confirm("确认退出吗?", "提示", {})
        .then(() => {
          this.$router.push("/sld/login");
        })
        .catch(() => {});
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.action == 1) {
            this.action = 2;
          } else if (this.action == 2) {
            this.action = 3;
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/deep/ .el-input {
  width: 100% !important;
}
/deep/ .el-upload-dragger {
  // width:100% !important;
  height: auto;
}
.sld-index {
  padding: 80px 0 0;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564378774853&di=fdabc6c928f1713b623d82a3387afcf7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201512%2F11%2F20151211134624_8nTEG.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;

  .move-top {
    z-index: 9999;
    display: none;
    cursor: pointer;
    position: fixed;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background: #409eff;
    text-align: center;
    color: #fff;
    right: 15px;
    bottom: 50px;
  }
  .move-top:hover {
    background: rgb(50, 148, 228);
  }
  .bottom {
    position: fixed;
    width: 100%;
    z-index: 999;
    bottom: 0;
    background: rgb(26, 24, 24);
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
  }
  .phone {
    position: absolute;
    font-family: "苹方";
    right: 2%;
    top: 2%;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
    color: rgb(62, 72, 160);
  }
  .table-row {
    margin: 20px 20px 20px 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 368px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    padding: 10px;
    height: 178px;
    display: block;
  }
  .mess {
    padding: 20px 70px;
    span {
      font-size: 12px;
    }
    .el-row-nextbut {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .nextbut {
      display: inline-block;
      width: 300px;
      padding: 10px;
      text-align: center;
      margin: 0 auto;
      background: rgb(175, 48, 48);
      color: #fff;
      cursor: pointer;
    }
    .nextbut:hover {
      background: rgb(204, 39, 39);
    }
    .imgrow {
      text-align: center;
      border: 1px solid #ccc;
      margin-top: 20px;
      margin-bottom: 20px;
      .el-col {
        cursor: pointer;
        text-align: center;
        // height: 240px;
        line-height: 240px;

        img {
          width: 360px;
          height: 240px;
        }
      }
      .imgrow-col {
        line-height: 30px;
        img {
          margin-bottom: 10px;
        }
      }
      .el-col:hover {
        background: rgb(230, 228, 228);
      }
    }
    .messrow {
      text-align: center;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-bottom: none;
      border-right: none;
      // margin-top: 10px;
      .el-col {
        cursor: pointer;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }

      .el-col:hover {
        background: rgb(230, 228, 228);
      }
    }
  }
  .cute-tip {
    width: 100%;
    padding-left: 10px;
    height: 38px;
    line-height: 38px;
    border-left: 4px solid rgb(143, 92, 92);
    background: #eee;
    font-weight: bolder;
  }
  .mo {
    width: 100%;
    height: 50px;
    z-index: 999;
    line-height: 50px;
    background: #fff;
    position: absolute;
    top: 30px;
    padding: 0 18%;
    border-bottom: 1px solid #eee;
    p {
      font-size: 32px;
      line-height: 50px;
      font-weight: bolder;
      font-family: "Times New Roman", Times, serif;
      padding: 0 20px 0 0;
    }
  }
  .top-banner {
    width: 100%;
    z-index: 999;
    height: 30px;
    line-height: 30px;
    background: rgb(26, 24, 24);
    position: absolute;
    top: 0;
    padding: 0 20px;
    p {
      color: #fff;
      position: absolute;
      right: 18%;
      font-size: 14px;
    }
    p:hover {
      color: rgb(143, 110, 110);
    }
    span {
      color: #fff;
      font-size: 14px;
      position: absolute;
      left: 18%;
    }
    span:hover {
      color: rgb(143, 110, 110);
    }
  }
  .card {
    width: 65%;
    margin: 0 auto;
    margin-top: 10px;
    padding: 0 0 45px;
    display: flex;

    .card1 {
      width: 16%;
      margin-right: 2%;
      height: 100%;
      text-align: center;
      .step {
        height: 600px;
        width: 80%;
        text-align: center;
        .el-step__title {
          font-size: 12px !important;
        }
      }
    }
    .card2 {
      width: 80%;
      height: 100%;
      margin-bottom: 100px;
    }
  }
}
</style>
