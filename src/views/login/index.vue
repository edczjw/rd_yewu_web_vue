<template>
  <div class="wrapper">
    <div class="main-content  login-container">
          <!-- 流星 -->
      <div class="star"></div>
      <div class="star pink"></div>
      <div class="star blue"></div>
      
      <div class="login-inner">
        <div class="login-box">
          <div class="form-container" :class="{ 'is-error' : is_error }">
            <h1 class="login-title">民盛业务系统</h1>
            
            <el-form ref="form" :model="form">
              <div class="login-content">
                <el-input class="ell" placeholder="请输入帐号" v-model.trim="form.mobile">
                  <template slot="prepend">
                    <i class="el-icon-edit"></i>
                  </template>
                </el-input>
              </div>
              <div class="login-content">
                <el-input class="ell" type="password" show-password placeholder="请输入密码" v-model.trim="form.password">
                  <template slot="prepend">
                    <i class="el-icon-view"></i>
                  </template>
                </el-input>
              </div>
              <div class="button-content">
                <el-button type="primary" @click="login()" >登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Router from "vue-router";
export default {
  data() {
    return {
          form: {
              mobile: "",
              password: ""
          },
          tips: "提示信息",
          tips_show: false,
          is_error: false
    };
  },
  mounted() {
  //安全退出后，阻止浏览器返回原有页面
    history.pushState(null, null, document.URL); 
      window.addEventListener('popstate', function() { 
      history.pushState(null, null, document.URL); 
    });

  },
  methods: {
     //读取cookie，需要注意的是cookie是不能存中文的，如果需要存中文，解决方法是后端先进行编码encode()，前端取出来之后用decodeURI('string')解码。（安卓可以取中文cookie，IOS不行）
            getCookie(name) {
                if (name == document.cookie){
                return true;
               // return (arr[2]);
              }else{
              return false
             }
        },
        //设置cookie   name为cookie的名字，value是值，expiredays为过期时间（天数）
           setCookie (value) {
            document.cookie = value;
           },
           
    login() {
      let _this = this;
      let data = {
        mobile: _this.form.mobile,
        password: _this.form.password
      };
      // 校验账号密码
      this.$http
        .post(this.$store.state.domain+"/qdzj/user/login", data,)
          .then(
          //成功
          response => {
            if (response.data.code == 0) { 

              var str = response.data.detail.name;  
              var strid=response.data.detail.auditor_id;
              
              for(var x=0; x<response.data.detail.role.length;x++){
                if((response.data.detail.role[x].roleName)=="systemOperator"){
                 var rolename="showtrue";
                 sessionStorage.setItem("role",rolename);//本地存储角色
                }else{
                  console.log(response.data.detail.role[x].roleName)
                 sessionStorage.setItem("role",null);
                }
              }
              
              sessionStorage.setItem("name", str);//本地存储用户名

              // if(str=='陈春松'){
              //   this.setCookie('admint=bdd6df454ac00feece272c0f2c8e53a252dabba4;')
              //   this.setCookie('adminhostid=3')
              // }
              // else if(str=='林中林'){
              //   this.setCookie('admint=91b5e4269fb5564aadca6982d9bf2c0b47469dde;')
              //   this.setCookie('adminhostid=10')
              // }else if(str=='刘建平'){
              //   this.setCookie('admint=677a0e45cfa3a9e49f9a06d82863b276cdcbc6d6;')
              //   this.setCookie('adminhostid=2')
              // }else if(str=='邓永枢'){
              //   this.setCookie('admint=8a0056d7ef024b4055c0a33a4c56176e3c96dd0c;')
              //   this.setCookie('adminhostid=1')
              // }else if(str=='何稳'){
              //   this.setCookie('admint=4fe5e00d51d8edeec543ddf2cb939c70dc131b87;')
              //   this.setCookie('adminhostid=4')
              // }else if(str=='菜小池'){
              //   this.setCookie('admint=5825152c96d4aeadbe002c4c6cdcc27283828a54;')
              //   this.setCookie('adminhostid=5')
              // }else if(str=='闫勇'){
              //   this.setCookie('admint=941a7eb3a3186ad643dc31b3dd058aa485799b31;')
              //   this.setCookie('adminhostid=6')
              // }else if(str=='廖凯璇'){
              //   this.setCookie('admint=b384cd26f0f8484bbd99593a16cc56cae5086dba;')
              //   this.setCookie('adminhostid=7')
              // }else if(str=='朱雪玲'){
              //   this.setCookie('admint=5960ab324eccd7ed4bd01912c969fe3e51dbcf16;')
              //   this.setCookie('adminhostid=8')
              // }else if(str=='傅羿方'){
              //   this.setCookie('admint=55c08dbd3775245f0cef1f50ac7bca46655a2130;')
              //   this.setCookie('adminhostid=9')
              // } else{
              //   this.setCookie('admint=1213;')
              //   this.setCookie('adminhostid=120')
              // }

              sessionStorage.setItem("userId", strid);//本地存储用户ID
              _this.$router.push("/home");//跳转
            } 
            //失败
            else {
              _this.$message({
                message: response.data.msg,
                type: "error"
              });
              _this.tips_show = true;
              _this.tips = response.data.description;
              _this.is_error = true;
            }
          },
          //打印
          response => {
            console.log(response);
          }
        );
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang='less' scoped>
@import '../users/index.css';

.wrapper {
  height: 100%;
}

.login-container {
  height: 100%;

  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546952368746&di=412dbb3775756904ec05b2e0cb8e8d4c&imgtype=0&src=http%3A%2F%2Fphotos.tuchong.com%2F233870%2Ff%2F4486134.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .login-title {
    font-size: 20px;

    margin-bottom: 24px;

    text-align: center;

    color: #617283;
  }

  .login-inner {
    position: relative;

    width: 322px;
    margin: 0 auto;
    padding-top: 100px;
  }

  .form-container {
    width: 250px;
    margin: 0 auto;
  }

  .tips {
    margin-bottom: 16px;

    text-align: left;

    .el-alert--error {
      color: #be504c;
      border: 1px solid #eed1d5;
      background: #efd3d7;
    }
  }

  .login-box {
    position: relative;

    padding: 36px 0;

    border-radius: 4px;
    background: rgba(255, 255, 255, .698039215686274);
  }

  .login-content {
    margin-bottom: 8px;
  }

  .ell {
    width: 250px!important;
  }

  .el-input-group__append {
    cursor: pointer;
  }

  .button-content {
    position: relative;

    margin-top: 24px;

    button {
      width: 100%;
    }
  }

  .is-error {
    .icon-password {
      color: #ff5722;
    }

    .icon-user {
      color: #ff5722;
    }
  }
}

.logo {
  position: absolute;
  right: 24px;
  bottom: 24px;

  width: 43px;
  height: 64px;

  img {
    width: 100%;
  }
}

//流星雨
.star {
  position: relative;
  z-index: 2;
  top: 100px;
  left: 500px;

  display: block;

  width: 5px;
  height: 5px;

  transform-origin: 100% 0;
  -webkit-animation: star-ani 5s linear infinite;
          animation: star-ani 4s linear infinite;

  opacity: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 5px 5px rgba(255, 255, 255, .3);
}

.star:after {
  top: 0;
  left: 4px;

  display: block;

  content: '';
  transform: rotate(-45deg) translate3d(1px, 3px, 0);
  transform-origin: 0 100%;

  border: 0 solid #fff;
  border-width: 0 90px 2px 90px;
  border-color: transparent transparent transparent rgba(255, 255, 255, .3);
  box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
}

.pink {
  top: 100px;
  left: 800px;

  -webkit-animation-delay: 3s;
     -moz-animation-delay: 3s;
          animation-delay: 3s;

  background: #fff;
}

.pink:after {
  -webkit-animation-delay: 3s;
     -moz-animation-delay: 3s;
          animation-delay: 3s;

  border-color: transparent transparent transparent #fff;
}

.blue {
  top: 120px;
  left: 1200px;

  -webkit-animation-delay: 7s;
     -moz-animation-delay: 7s;
          animation-delay: 7s;

  background: fff;
}

.blue:after {
  -webkit-animation-delay: 7s;
     -moz-animation-delay: 7s;
          animation-delay: 7s;

  border-color: transparent transparent transparent fff;
}

@keyframes star-ani {
  0% {
    transform: scale(0) translate3d(0, 0, 0);

    opacity: 0;
  }

  20% {
    transform: scale(.2) translate3d(-100px, 100px, 0);

    opacity: .8;
  }

  40% {
    transform: scale(.4) translate3d(-200px, 200px, 0);

    opacity: .8;
  }

  60% {
    transform: scale(.6) translate3d(-300px, 300px, 0);

    opacity: .8;
  }

  80% {
    transform: scale(1) translate3d(-350px, 350px, 0);

    opacity: 1;
  }

  100% {
    transform: scale(1.2) translate3d(-400px, 380px, 0);

    opacity: 1;
  }
}

</style>
