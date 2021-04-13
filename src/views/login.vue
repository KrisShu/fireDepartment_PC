<template>
  <div class="login">
    <div class="login-img">
      <div class="login-form">
        <!--        todo 登录表单-->
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item>账号登录_页面为了github提交</el-form-item>
          <!--          账号-->
          <el-form-item prop="account">
            <el-input placeholder="请输入您的用户名" v-model="form.account">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <!--          密码-->
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入您的密码"
              v-model="form.password"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <!--          验证码-->
          <el-form-item prop="verifyCode" class="login-code">
            <el-input
              @keyup.enter.native="login"
              placeholder="请输入验证码"
              v-model="form.verifyCode"
            >
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
            <img :src="imgUrl" alt="" />
            <el-button @click="getCode" type="text" class="el-icon-refresh"
              >换一张</el-button
            >
          </el-form-item>
          <!--          按钮-->
          <el-form-item>
            <el-button class="my-button" @click="login">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  // Todo: 组件注册
  components: {},
  // Todo: 特性
  props: {},
  // Todo: 双向绑定的数据
  data() {
    return {
      imgUrl: "",
      form: {},
      rules: {
        account: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入用户密码" }],
        verifyCode: [{ required: true, message: "请输入验证码" }]
      }
    };
  },
  // Todo: HTML 渲染前
  created: function() {
    this.getCode();
  },
  // Todo: HTML渲染后
  mounted: function() {},
  // Todo: 方法
  methods: {
    // todo 获取验证码、处理二进制流图片的显示问题
    getCode() {
        this.$axios.get(this.$api.GetVerifyCode, {responseType: "blob"}).then(res => {
          this.imgUrl = window.URL.createObjectURL(res);
        });
    },
    //  todo 登录验证
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios.post(this.$api.UserLogin, this.form).then(res => {
               console.log("登录成功",res)
            if (res.result.success) {
              this.$store.commit("setUserInfo", res.result);
              localStorage.setItem('userinfo',JSON.stringify(res.result))
              localStorage.setItem('firedepartment_rs',1)
              this.$router.push({
                name: "Home"
              });
            } else {
              this.$message.error(res.result.failCause);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
    width: 100%;
    height: 100vh;
    background-image: url("../assets/images/loginBack.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  &-img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../assets/images/load_img_bg01.png");
    background-repeat: no-repeat;
    background-position: center;
  }
  /*验证码样式*/
  &-code {
    & > :first-child {
      display: flex;
    }
  }
  &-form {
    /*  todo 表单的背景*/
    padding: 20px;
    position: relative;
    left: 226px;
    width: 294px;
    height: 326px;
    /*表单*/
    & > :first-child {
      /*  todo 登录头*/
      & > :first-child {
        text-align: center;
        .el-form-item__content {
          font-size: 20px;
        }
      }
      /*  todo 登录按钮*/
      & > :last-child {
        .el-button {
          color: white;
          width: 100%;
        }
      }
    }
  }
}
</style>
