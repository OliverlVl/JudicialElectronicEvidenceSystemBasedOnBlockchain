<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>司法区块链-控制台</p>
        </div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="用户" name="first">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="telephone">
                <el-input
                  v-model="loginForm.telephone"
                  placeholder="手机号"
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
                  type="primary"
                  @click="submitForm('loginForm')"
                  class="submit_btn"
                  >登陆</el-button
                >
              </el-form-item>
              <el-button
                type="primary"
                plain
                class="submit_btn"
                @click="dialogFormVisible = true"
                >注册</el-button
              >
              <el-form-item></el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="公证员" name="second">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="telephone">
                <el-input
                  v-model="loginForm.telephone"
                  placeholder="手机号"
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
                  type="primary"
                  @click="submitForm1('loginForm')"
                  class="submit_btn"
                  >登陆</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="公证管理员" name="third">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="telephone">
                <el-input
                  v-model="loginForm.telephone"
                  placeholder="手机号"
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
                  type="primary"
                  @click="submitForm2('loginForm')"
                  class="submit_btn"
                  >登陆</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统管理员" name="fourth">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="telephone">
                <el-input
                  v-model="loginForm.telephone"
                  placeholder="手机号"
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
                  type="primary"
                  @click="submitForm3('loginForm')"
                  class="submit_btn"
                  >登陆</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <p class="tip">鄂ICP备18001612号</p>
      </section>
    </transition>
    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      style="width: 60%"
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
import { userLogin, userRegister } from "@/api/getData";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      activeName2: "first",
      // 登录
      loginForm: {
        telephone: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户手机号码", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      showLogin: false,
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
  mounted() {
    this.showLogin = true;
    // if (!this.adminInfo.id) {
    //   this.getAdminData();
    // }
  },
  computed: {
    // ...mapState(["adminInfo"])
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // ...mapActions(["getAdminData"]),
    //登录
    async submitForm(formName) {
      this.$message({
        type: "success",
        message: "登录成功",
      });
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await userLogin({
            telephone: this.loginForm.telephone,
            password: this.loginForm.password,
          })
            .then((res) => {
              if (res.error_code == 0) {
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                localStorage.setItem("system_role", res.system_role);
                localStorage.setItem("telephone", this.loginForm.telephone);
                localStorage.setItem("password", this.loginForm.password);
                sessionStorage.setItem("token", res.token);
                this.$router.push("manage");
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
    async submitForm1(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await userLogin({
            telephone: this.loginForm.telephone,
            password: this.loginForm.password,
          })
            .then((res) => {
              if (res.error_code == 0) {
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                localStorage.setItem("system_role", res.system_role);
                localStorage.setItem("telephone", this.loginForm.telephone);
                localStorage.setItem("password", this.loginForm.password);
                sessionStorage.setItem("token", res.token);
                this.$router.push("/notDeal");
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
    async submitForm2(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await userLogin({
            telephone: this.loginForm.telephone,
            password: this.loginForm.password,
          })
            .then((res) => {
              if (res.error_code == 0) {
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                localStorage.setItem("system_role", res.system_role);
                localStorage.setItem("telephone", this.loginForm.telephone);
                localStorage.setItem("password", this.loginForm.password);
                sessionStorage.setItem("token", res.token);
                this.$router.push("/totalNotarization");
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
    async submitForm3(formName) {
      this.$message({
        type: "success",
        message: "登录成功",
      });
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await userLogin({
            telephone: this.loginForm.telephone,
            password: this.loginForm.password,
          })
            .then((res) => {
              if (res.error_code == 0) {
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                localStorage.setItem("system_role", res.system_role);
                localStorage.setItem("telephone", this.loginForm.telephone);
                localStorage.setItem("password", this.loginForm.password);
                sessionStorage.setItem("token", res.token);
                this.$router.push("/notDeal");
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
.login_page {
  // background-color: #324057;
  background: url(../assets/img/login.jpg) no-repeat;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 29px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 260px);
  .ctp(5px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
