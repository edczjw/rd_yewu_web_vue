<template>

<!-- true显示，false不显示 -->
  <div v-if="userName==this.$store.state.nameler?false:true">
    

    <div class="topBanner">
      
      <el-tooltip class="item" effect="light" content="展开缩进" placement="bottom">
      <p class='tog' @click="togglemenu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhankai1"></use>
        </svg></p>
      </el-tooltip>

      <p class='left'>密码修改</p>

      <p class='right' @click="goBack" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>安全退出</p>

      <p class='right' title="用户名">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-character"></use>
        </svg>{{userName}}</p>
      
      <p class='right' @click="screenfull">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-quanping4"></use>
      </svg>全屏显示</p>

      <p class='right' title="密码修改">
      <router-link to="/yonghuguanli/mimaxiugai" class="roulink">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-mimazhongzhi"></use>
      </svg>密码修改
      </router-link>
      </p>

      <p class='right' @click="lastpage">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui2"></use>
      </svg>返回上一页</p>
    </div>

  <div class="content">
  <el-row>
  <el-col :span="24">
    <div class="changepw">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" show-password v-model="ruleForm2.oldPassword" autocomplete="off" clearable></el-input>
            </el-form-item>
            
            <el-form-item label="新密码" prop="password">
                <el-input type="password" show-password v-model="ruleForm2.password" autocomplete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" show-password v-model="ruleForm2.checkPass" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="submitForm('ruleForm2')" size="small">提交</el-button>
                <el-button type="primary" plain @click="resetForm('ruleForm2')" size="small">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</el-col>
</el-row>
  </div>
  </div>
</template>
<script>
// 时间格式化：数据库中往往存储的是时间的毫秒形式，这样在页面上可以操控显示时间的格式
import {formatDate} from '../../common/date.js';
import screenfull from 'screenfull'
//引入vuex
// import {mapState} from 'vuex'

export default {
  data() {
    //旧密码
        var validatePass = (rule, value, callback) => {
        if (value  ==='') {
          callback(new Error('旧密码不能为空!'));
        } else {
          callback();
        }
      };

    //新密码
      var validatePass1 = (rule, value, callback) => {
        if (value == this.ruleForm2.oldPassword) {
          callback(new Error('新密码和旧密码不能相同!'));
        } else if (value ==='' ) {
          callback(new Error('新密码不能为空!'));
        }else if (this.ruleForm2.oldPassword ==='' ) {
          callback(new Error('请先输入旧密码!'));
        }  else {
          callback();
        }
      };

    //确认密码
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      
    return {
        //规则
        rules2: {
        //旧密码
          oldPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
        //新密码
          password: [
            { validator: validatePass1, trigger: 'blur' }
          ],
         //确认密码
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
      isFullscreen: false,
      userName: "",

       ruleForm2: {
          uid:0,
          oldPassword:'',
          password:'',
          checkPass:''
        },
        
    };
  },
  // mounted只执行一次,在模板渲染成html后调用
  mounted() {
    this.getName();//获取管理员用户名

    window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
              // 全屏下按键esc后要执行的动作
              this.isFullscreen = false
            }
          };

    // this.getlist();//获取用户列表
  },

  methods: {
    //返回上一页
    lastpage(){
      window.history.go(-1);
    },
    //   提交密码
    submitForm(formName) {
        
        let uid = sessionStorage.getItem("userId");
        this.ruleForm2.uid = parseInt(uid);//转整型
        this.$http
          .post(
            this.$store.state.domain +"/qdzj/user/updatePassword",this.ruleForm2,{
                //表单格式
                emulateJSON: true
            }
          )
          //then()方法异步执行，就是当then()前面的方法执行完之后再执行then()里面的方法，这样就不会发生获取不到数据的问题
          .then(  
            // Lambda写法
            response => {
              if (response.data.code == 0) {
                  this.$alert(response.data.detail.result, '密码修改', {
                    confirmButtonText: '确定并返回主页',
                    type: 'success',
                    callback: action => {
                      //确定后直接跳转到home
                       this.$router.push("../home");
                    }
                    });
              } else {
              //请求失败回调函数
                this.listLoading=false;
                this.$message({
                    message: response.body.msg,
                    type: "error"
                  });
              }
              
            },
            response => {
              //请求失败回调函数
                this.$message({
                    dangerouslyUseHTMLString: true,//表示提示的是html片段
                    message: '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-shengqi"></use> </svg> '+
                    response.body.msg,
                    type: "error"
                  });
              console.log(response);
            }
          );
    },
    // 重置
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },

    /**
     * 全屏事件
     */
    screenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'Your browser does not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = true
    },
    /**
     * 是否全屏并按键ESC键的方法
     */
    checkFull() {
      var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
          isFull = false
      }
      return isFull
    },


    //展开缩进
    togglemenu(){
        this.$store.state.isLeftHiden=!this.$store.state.isLeftHiden;
        console.log(this.$store.state.isLeftHiden)
    },
    
    // 退出，跳转至登陆页面
      goBack() {
        var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
          window.sessionStorage.removeItem('name');//清除session中name
					this.$router.push('/login');
				}).catch(() => {
			});
    },
    //获取用户名，vue 本地存储数据 sessionStorage
      getName() {
        let userName = sessionStorage.getItem("name");
        this.userName = userName;
      },


  },
    //过滤器，用于格式化时间格式
    filters: {
          formatDate(time) {
              var date = new Date(time);
              return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
    },
     
};
</script>

 <style lang='less'>

//  导入统一样式less样式
@import '../users/index.css';

.changepw {
  padding: 50px 200px 50px 500px;

  background-color: rgba(238, 238, 238, .835);
}




































</style>
