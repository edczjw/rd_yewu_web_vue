<template>
  <div class="login">
    <h2>民盛赎楼贷信息平台</h2>
    <p class="phone">遇到问题 ? 可拨打客服电话：010-123456221</p>

    <el-card class="box-card">
      <div class="tit">注册</div>
      <div class="insert">
        <el-form
          :model="setForm"
          status-icon
          ref="setForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name" :rules="rules.name">
            <el-input v-model.trim="setForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" :rules="rules.phone">
            <el-input v-model.trim="setForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass" :rules="rules.pass">
            <el-input type="password" v-model.trim="setForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPass" :rules="rules.confirmPass">
            <el-input type="password" v-model.trim="setForm.confirmPass"></el-input>
          </el-form-item>
        </el-form>
        <div class="but" @click="register('setForm')">立即注册</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import rules from "../../untils/rule";
export default {
  name: "",
  data() {
    // 确认密码校验
    var validatePass = (rule, value, callback) => {
      if (this.setForm.pass !== value) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        console.log("一致");
        callback();
      }
    };

    return {
      rules: Object.assign(rules, {
        confirmPass: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }),
      setForm: {
        name: "", //姓名
        phone: "", //手机号
        pass: "", //密码
        confirmPass: "" //确认密码
      }
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            name: this.setForm.name,
            phone: this.setForm.phone,
            password: this.setForm.pass
          };
          this.$axios({
            method: "post",
            url: this.$store.state.domain + "/sld/user/register",
            data: data
          })
            .then(response => {
              if (response.data.code == 0) {
                //注册成功
                this.$message({
                  message: response.data.detail.result,
                  type: "success"
                });
                this.$router.push("/sld/login");
              } else {
                this.$message.error(response.data.msg);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/deep/ .el-input {
  width: 100% !important;
}
.button {
  position: relative;
}
p {
  color: #fff;
  position: absolute;
  font-family: "黑体";
  right: 2%;
  top: 3%;
}
.forgetbtn {
  position: absolute;
  right: 0px;
  top: -30px;
}
.login {
  height: 100%;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564378774853&di=fdabc6c928f1713b623d82a3387afcf7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201512%2F11%2F20151211134624_8nTEG.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
}
h2 {
  position: absolute;
  font-family: "黑体";
  left: 2%;
  top: 3%;
  cursor: pointer;
  color: #fff;
}
p {
  color: #fff;
}
.but {
  background: rgba(0, 0, 0, 0.712);
  color: #fff;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  margin-top: 40px;
}
.but:hover {
  background: rgba(0, 0, 0, 0.747);
}
.insert {
  padding: 40px 28px 0px;
}
.box-card {
  position: relative;
  /* left: 33%; */
  margin: 0 auto;
  top: 15%;
  width: 520px;
  height: 450px;
  font-family: "黑体";
  font-size: 24px;
  padding: 20px 0 0;
}
.tit {
  width: 100%;
  text-align: center;
}
/* .login{
    background: rgb(246, 248, 248);
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
} */
</style>
