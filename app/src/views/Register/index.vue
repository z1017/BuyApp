<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <!-- <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a></span>       
      </h3>

      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg">错误提示信息</span>
      </div>

      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button style="width: 90px; height: 35px; margin-left: 2px" @click="getCode">获取验证码</button>    
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password1"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div> -->
    <div class="register">
      <h3>
        注册新用户<span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link></span
        >
      </h3>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="line-height: 25px; margin-top: 10px; margin-left: 400px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            placeholder="请输入手机号"
            v-model="ruleForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-input
            v-model="ruleForm.code"
            placeholder="请输入验证码"
          ></el-input>
          <el-button
            type="primary"
            style="margin-left: 5px"
            size="small"
            @click="getCode"
            >获取验证码</el-button
          >
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="password1">
          <el-input
            type="password"
            placeholder="请再次输入密码"
            v-model="ruleForm.password1"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="agree">
          <el-checkbox v-model="ruleForm.agree"
            >我已阅读并同意用户协议</el-checkbox
          >
        </el-form-item>

        <el-form-item style="margin-left: 50px; margin-top: 20px">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    // 自定义表单验证是否勾选协议协议
    // rule：验证的详细信息
    // value：验证是否通过，false失败，true通过
    // callback：回调函数
    var validateAgree = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请勾选同意协议"));
      }
    };

    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      callback();
      /* setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        }
      }, 1000); */
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password1 !== "") {
          this.$refs.ruleForm.validateField("password1");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      // // // 收集表单数据
      // phone: "",
      // code: "",
      // // // 密码和确认密码
      // password: "",
      // password1: "",
      // // 是否同意协议
      // agree: true,

      // el
      ruleForm: {
        phone: "",
        code: "",
        // 密码和确认密码
        password: "",
        password1: "",
        // 是否同意协议
        agree: true,
      },

      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password1: [{ validator: validatePass2, trigger: "blur" }],
        // 自定义验证是否勾选协议
        agree: [{ validator: validateAgree, trigger: "change" }],
      },
    };
  },
  methods: {
    // 获取验证码
    async getCode() {
      // 判断一下---至少有数据
      try {
        // 如果获取到验证码
        const { phone } = this;
        phone && (await this.$store.dispatch("getCode", phone));
        // 将组件的code属性值变为仓库中的验证码【验证码直接自动填写了】
        this.code = this.$store.state.user.code;
        console.log(this.code);
      } catch (error) {
        alert(error.message);
      }
    },
    // 用户注册
    async userRegister() {
      try {
        // 如果成功，路由跳转至登录界面
        const { phone, code, password, password1 } = this;
        phone &&
          code &&
          password == password1 &&
          (await this.$store.dispatch("userRegister", {
            phone,
            code,
            password,
          }));
        this.$router.push("/login");
      } catch (error) {
        alert(error.message);
      }
    },

    async resetForm(formName) {
      await this.$refs[formName].resetFields();
    },

    async submitForm(formName) {
      await this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { phone, code, password, password1 } = this;
            phone &&
            code &&
            password == password1 && 
          await this.$store.dispatch("userRegister", {
            phone,
            code,
            password,
          });
          this.$router.push("/login");
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register div[data-v-6ff38420][data-v-6ff38420]:nth-of-type(1) {
    margin-top: 0px;
  }
  .el-input {
    /* 表单页面居中，宽度50% ,legend颜色设置，legend圆角*/
    text-align: left;
    margin: 0 auto;
    width: 300px;
  }
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }
  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>