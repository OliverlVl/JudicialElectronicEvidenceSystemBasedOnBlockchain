<template>
  <div class="login_page">
    <div class="container">
      <div class="manage_tip">
        <p>区块链电子存证系统</p>
        <br />
        <p style="font-size: 20px">Blockchain Electronic Deposit System</p>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户" name="first">
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="submitForm('loginForm')"
                class="submit_btn"
                >登陆</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                plain
                class="submit_btn"
                @click="dialogFormVisible = true"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公证员" name="second">
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="submitForm('loginForm')"
                class="submit_btn"
                >登陆</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                plain
                class="submit_btn"
                @click="dialogFormVisible = true"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公证管理员" name="third">
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="submitForm('loginForm')"
                class="submit_btn"
                >登陆</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                plain
                class="submit_btn"
                @click="dialogFormVisible = true"
                >注册</el-button
              >
              <el-form-item></el-form-item>
             </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统管理员" name="fourth">
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="submitForm('loginForm')"
                class="submit_btn"
                >登陆</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                plain
                class="submit_btn"
                @click="dialogFormVisible = true"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <p class="tip">© 2021 福州大学</p>
    </div>

    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      style="width: 100%"
    >
      <el-form :model="formRegister" :rules="rulesRegister" ref="formRegister">
        <el-form-item
          label="手机号码"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input
            v-model="formRegister.phone"
            auto-comcheckplete="off"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="短信验证"
          :label-width="formLabelWidth"
          prop="check"
        >
          <el-input
            v-model="formRegister.check"
            auto-complete="off"
            placeholder="请输入短信验证码"
          ></el-input>
          <el-button @click="countDown()">{{ content }}</el-button>
        </el-form-item>
        <el-form-item
          label="用户密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="formRegister.password"
            auto-complete="off"
            placeholder="请设置密码(不少于六位数)"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerForm('formRegister')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userLogin,
  notaryLogin,
  autManagerLogin,
  sysManagerLogin,
} from "@/api/getData";

export default {
  data() {
    return {
      activeName: "first",
      // 登录
      loginForm: {
        username: "",
        password: "",
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },

      //注册
      dialogFormVisible: false,
      formRegister: {
        phone: "",
        check: "",
        passwprd: "",
      },
      formLabelWidth: "80px",
      rulesRegister: {
        phone: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        check: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      //发送验证码
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: true, //添加canClick
    };
  },
  mounted() {},
  computed: {},

  methods: {
    // 切换tab
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // ...mapActions(["getAdminData"]),

    //登录
    async submitForm(formName) {
      try {
        if (this.activeName == "first") {
          await userLogin(this.loginForm).then((result) => {
            if (result.status) {
              sessionStorage.setItem("userId", result.userId);
              this.$message({
                type: "success",
                message: "登入成功",
              });
              // 路由跳转
              this.$router.push("/userIndex");
            } else {
              this.$message({
                type: "error",
                message: "登入失败",
              });
            }
          });
          } else if (this.activeName == "second") {
          await notaryLogin(this.loginForm).then((result) => {
            if (result.status) {
              sessionStorage.setItem("userId", result.userId);
              this.$message({
                type: "success",
                message: "登入成功",
              });
              // 路由跳转
              this.$router.push("/notaryIndex");
            } else {
              this.$message({
                type: "error",
                message: "登入失败",
              });
            }
          });
          } else if (this.activeName == "third") {
          await autManagerLogin(this.loginForm).then((result) => {
            if (result.status) {
              sessionStorage.setItem("userId", result.userId);
              this.$message({
                type: "success",
                message: "登入成功",
              });
              // 路由跳转
              this.$router.push("/NMIndex");
            } else {
              this.$message({
                type: "error",
                message: "登入失败",
              });
            }
          });
          
        } else {
          await sysManagerLogin(this.loginForm).then((result) => {
            if (result.status) {
              sessionStorage.setItem("userId", result.userId);
              this.$message({
                type: "success",
                message: "登入成功",
              });
              // 路由跳转
              this.$router.push("/systemIndex");
            } else {
              this.$message({
                type: "error",
                message: "登入失败",
              });
            }
          });
         
        }
      } catch (e) {
        console.log(e);
      }
    },

    //计时器
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      this.canClick = false;
      this.content = this.totalTime + "s后重新发送";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重新发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "重新发送验证码";
          this.totalTime = 10;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
    //注册
    async registerForm(formName) {
      this.$message({
        type: "success",
        message: "注册成功",
      });
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let param = {
            telephone: this.formRegister.phone,
            password: this.formRegister.password,
            check: this.formRegister.check,
            role: 1,
          };
          await register(param)
            .then((res) => {
              if (res.error_code == 0) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                });
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: res.message,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名密码",
            offset: 100,
          });
          return false;
        }
      });
    },
  },
  watch: {
    // adminInfo: function(newValue) {
    //   if (newValue.id) {
    //     this.$message({
    //       type: "success",
    //       message: "检测到您之前登录过，将自动登录"
    //     });
    //     this.$router.push("manage");
    //   }
    // }
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin";

// 背景样式
.login_page {
  // background-color: #324057;
  background: url(../assets/img/login.jpg) no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100%;
}

// tab
.container {
  padding: 20px;
  margin: 0px;
  .wh(375px, 320px);
  .ctp(10px, 400px);
  background: rgb(255, 255, 255);
  position: absolute;
  text-align: center;
}

// titile
.manage_tip {
  position: absolute;
  width: 100%;
  top: -110px;
  left: 0;
  p {
    font-size: 40px;
    color: rgb(255, 255, 255);
  }
}

// 底部提示
.tip {
  font-size: 12px;
  color: gray;
}
</style>
