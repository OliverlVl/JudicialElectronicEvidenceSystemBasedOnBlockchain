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
                @click="submitForm()"
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
          <el-form
            :model="notaryLoginForm"
            :rules="rulesNotaryLogin"
            ref="notaryLoginForm"
          >
            <el-form-item prop="notaryName">
              <el-input
                v-model="notaryLoginForm.notaryName"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="notaryLoginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="submitForm()"
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
                @click="dialogFormNotaryVisible = true"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公证管理员" name="third">
          <el-form
            :model="autManagerLoginForm"
            :rules="rulesAutManagerLogin"
            ref="autManagerLoginForm"
          >
            <el-form-item prop="autName">
              <el-input
                v-model="autManagerLoginForm.autName"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="autManagerLoginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="submitForm()"
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
                @click="dialogFormAutVisible = true"
                >注册</el-button
              >
              <el-form-item></el-form-item>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统管理员" name="fourth">
          <el-form
            :model="sysManagerLoginForm"
            :rules="rulesSysManagerLogin"
            ref="sysManagerLoginForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="sysManagerLoginForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="sysManagerLoginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                @click="submitForm()"
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
                @click="dialogFormSysVisible = true"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <p class="tip">© 2021 福州大学</p>
    </div>
    <!-- 用户注册 -->
    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      style="width: 100%"
    >
      <el-form
        :model="formRegister"
        :rules="rulesRegister"
        ref="formRegister"
        label-width="100px"
        inline
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formRegister.username"
            placeholder="请输入用户名"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formRegister.password"
            placeholder="请输入密码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input
            v-model="formRegister.phoneNumber"
            placeholder="请输入手机号码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input
            v-model="formRegister.idCard"
            placeholder="请输入身份证号码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formRegister.email"
            placeholder="请输入邮箱"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formRegister.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerForm()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 公证员注册 -->
    <el-dialog
      title="公证员注册"
      :visible.sync="dialogFormNotaryVisible"
      style="width: 100%"
    >
      <el-form
        :model="notaryForm"
        :rules="rulesNotaryForm"
        ref="notaryForm"
        label-width="100px"
        inline
      >
        <el-form-item label="用户名" prop="notaryName">
          <el-input
            v-model="notaryForm.notaryName"
            placeholder="请输入用户名"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="notaryForm.password"
            placeholder="请输入密码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input
            v-model="notaryForm.phoneNumber"
            placeholder="请输入手机号码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input
            v-model="notaryForm.idCard"
            placeholder="请输入身份证号码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="notaryForm.email"
            placeholder="请输入邮箱"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="notaryForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公证类型" prop="notarizationType">
          <el-select
            v-model="notaryForm.notarizationType"
            style="width: 100%"
            placeholder="请选择公证类型"
          >
            <el-option
              v-for="item in notarizationType"
              :key="item.notarizationTypeId"
              :label="item.notarizationType"
              :value="item.notarizationTypeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公证机构" prop="organizationId">
          <el-select
            v-model="notaryForm.organizationId"
            style="width: 100%"
            placeholder="请选择公证机构"
          >
            <el-option
              v-for="item in organization"
              :key="item.organizationId"
              :label="item.organizationName"
              :value="item.organizationId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input
            v-model="notaryForm.position"
            placeholder="请输入您的职位"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工作年限" prop="workYear">
          <el-input
            v-model="notaryForm.workYear"
            placeholder="请输入您的工作年限"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormNotaryVisible = false">取 消</el-button>
        <el-button type="primary" @click="notaryRegist()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 机构管理员注册 -->
    <el-dialog
      title="机构管理员注册"
      :visible.sync="dialogFormAutVisible"
      style="width: 100%"
    >
      <el-form
        :model="autManagerForm"
        :rules="rulesAutManagerForm"
        ref="autManagerForm"
        label-width="100px"
        inline
      >
        <el-form-item label="用户名" prop="autName">
          <el-input
            v-model="autManagerForm.autName"
            placeholder="请输入用户名"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="autManagerForm.password"
            placeholder="请输入密码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input
            v-model="autManagerForm.phoneNumber"
            placeholder="请输入手机号码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input
            v-model="autManagerForm.idCard"
            placeholder="请输入身份证号码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="autManagerForm.email"
            placeholder="请输入邮箱"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="autManagerForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公证机构" prop="organizationId">
          <el-select
            v-model="autManagerForm.organizationId"
            style="width: 100%"
            placeholder="请选择公证机构"
          >
            <el-option
              v-for="item in organization"
              :key="item.organizationId"
              :label="item.organizationName"
              :value="item.organizationId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAutVisible = false">取 消</el-button>
        <el-button type="primary" @click="autManagerRegist()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 系统管理员注册 -->
    <el-dialog
      title="系统管理员注册"
      :visible.sync="dialogFormSysVisible"
      style="width: 100%"
    >
      <el-form
        :model="sysManagerForm"
        :rules="rulesSysManagerForm"
        ref="sysManagerForm"
        label-width="100px"
        inline
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="sysManagerForm.username"
            placeholder="请输入用户名"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="sysManagerForm.password"
            placeholder="请输入密码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input
            v-model="sysManagerForm.phoneNumber"
            placeholder="请输入手机号码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input
            v-model="sysManagerForm.idCard"
            placeholder="请输入身份证号码"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="sysManagerForm.email"
            placeholder="请输入邮箱"
            style="width: 100%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="sysManagerForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormSysVisible = false">取 消</el-button>
        <el-button type="primary" @click="sysManagerRegist()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  // 登入
  userLogin,
  notaryLogin,
  autManagerLogin,
  sysManagerLogin,
  // 注册
  regist,
  notaryRegist,
  autManagerRegist,
  sysManagerRegist,
  orgaQuery,
  noTypeQuery,
  notaStasGen
} from "@/api/getData";

export default {
  data() {
    return {
      activeName: "first",
      //---------------------------------- 登录 ----------------------------------
      // 用户登录
      loginForm: {
        username: "",
        password: "",
      },
      // 用户表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },

      // 公证员登录
      notaryLoginForm: {
        notaryName: "",
        password: "",
      },
      // 公证员表单验证
      rulesNotaryLogin: {
        notaryName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },

      // 机构管理员登录
      autManagerLoginForm: {
        autName: "",
        password: "",
      },
      // 机构管理员表单验证
      rulesAutManagerLogin: {
        autName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      // 系统管理员登录
      sysManagerLoginForm: {
        username: "",
        password: "",
      },
      // 系统管理员表单验证
      rulesSysManagerLogin: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },

      //---------------------------------- 注册 ----------------------------------
      dialogFormVisible: false, //用户
      dialogFormNotaryVisible: false, // 公证员
      dialogFormAutVisible: false, // 机构管理员
      dialogFormSysVisible: false, // 系统管理员

      //用户
      formRegister: {
        username: "",
        password: "",
        phoneNumber: "",
        idCard: "",
        email: "",
        sex: "0",
      },

      rulesRegister: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
      },
      // 公证员
      notaryForm: {
        notaryName: "",
        password: "",
        phoneNumber: "",
        idCard: "",
        email: "",
        sex: "0",
        organizationId: "",
        notarizationType: "",
        jobNumber: "123",
        workYear: "",
        position: "",
      },
      rulesNotaryForm: {
        notaryName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
        organizationId: [
          {
            required: true,
            message: "请选择您所在的公证机构",
            trigger: "change",
          },
        ],
        notarizationType: [
          { required: true, message: "请选择公证类型", trigger: "change" },
        ],
        position: [
          { required: true, message: "请输入您的职位", trigger: "blur" },
        ],
        workYear: [
          { required: true, message: "请输入您的工作年限", trigger: "blur" },
        ],
      },
      // 机构管理员
      autManagerForm: {
        autName: "",
        password: "",
        phoneNumber: "",
        idCard: "",
        email: "",
        sex: "0",
        organizationId: "",
      },
      rulesAutManagerForm: {
        autName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
        organizationId: [
          {
            required: true,
            message: "请选择您所在的公证机构",
            trigger: "change",
          },
        ],
      },
      // 系统管理员
      sysManagerForm: {
        username: "",
        password: "",
        phoneNumber: "",
        idCard: "",
        email: "",
        sex: "0",
      },

      rulesSysManagerForm: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
      },

      // 公证机构
      organization: [],

      // 公证类型
      notarizationType: [],

      //发送验证码
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: true, //添加canClick
    };
  },
  mounted() {},
  created() {
    this.getNotarizationType();
    this.getAgent();
    this.notaStasGen();
  },

  methods: {
    // 获取公证机构列表
    async getAgent() {
      try {
        const query = {
          organizationId: "none",
          organizationIdNameWildcard: "none",
          addressWildcard: "none",
          phoneNumberWildcard: "none",
          legalPeopleWildcard: "none",
          emailWildcard: "none",
        };
        orgaQuery(query).then((result) => {
          if (result.status == true) {
            //成功
            result.data.forEach((item) => {
              this.organization.push(item);
            });
          } else {
            //失败
            console.log(result.message + "获取公证机构列表失败");
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 获取公证类型
    async getNotarizationType() {
      try {
        noTypeQuery().then((result) => {
          console.log("获取公证类型");
          console.log(result);
          result.data.forEach((item) =>{
            this.notarizationType.push(item);
            console.log(item);
          })
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 切换tab
    handleClick(tab, event) {
      console.log(tab, event);
    },

    //登录
    async submitForm() {
      try {
        if (this.activeName == "first") {
          await userLogin(this.loginForm).then((result) => {
            if (result.status) {
              sessionStorage.setItem("userId", result.userId);
              this.$message({
                type: "success",
                message: "登入成功",
              });
              //alert(sessionStorage.getItem("userId"));
              // 路由跳转
            this.$router.push("/userIndex")
            } else {
              this.$message({
                type: "error",
                message: "登入失败",
              });
            }
          });
        } else if (this.activeName == "second") {
          await notaryLogin(this.notaryLoginForm).then((result) => {
            if (result.status) {
              sessionStorage.setItem("notaryId", result.notaryId);
              alert(sessionStorage.getItem("notaryId"));
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
          await autManagerLogin(this.autManagerLoginForm).then((result) => {
            if (result.status) {
              sessionStorage.setItem("autManId", result.autManId);
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
          await sysManagerLogin(this.sysManagerLoginForm).then((result) => {
            if (result.status) {
              sessionStorage.setItem("manId", result.manId);
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

    //用户注册
    async registerForm() {
      try {
        this.$refs.formRegister.validate(async (valid) => {
          if (valid) {
            await regist(this.formRegister).then((result) => {
              if (result.status) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                });
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: "注册失败",
                });
              }
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "请填写正确的信息",
              offset: 100,
            });
            return false;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    //公证员注册
    async notaryRegist() {
      try {
        this.$refs.notaryForm.validate(async (valid) => {
          if (valid) {
            await notaryRegist(this.notaryForm).then((result) => {
              if (result.status) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                });
                this.dialogFormNotaryVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: "注册失败",
                });
              }
            });
          } else {
            this.$message({
              type: "error",
              message: "请输入完整信息",
            });
            return false;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 机构管理员注册
    async autManagerRegist() {
      try {
        this.$refs.autManagerForm.validate(async (valid) => {
          if (valid) {
            await autManagerRegist(this.autManagerForm).then((result) => {
              if (result.status) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                });
                this.dialogFormAutVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: "注册失败",
                });
              }
            });
          } else {
            this.$message({
              type: "error",
              message: "请输入完整信息",
            });
            return false;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 系统管理员注册
    async sysManagerRegist() {
      try {
        this.$refs.sysManagerForm.validate(async (valid) => {
          if (valid) {
            await sysManagerRegist(this.sysManagerForm).then((result) => {
              if (result.status) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                });
                this.dialogFormSysVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: "注册失败",
                });
              }
            });
          } else {
            this.$message({
              type: "error",
              message: "请输入完整信息",
            });
            return false;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 公证员统计生成
    async notaStasGen(){
      try {
        console.log("公证员统计生成")
       await notaStasGen().then((result) => {
          if (result.status) {
            //成功
            console.log(result.data);
            console.log("生成成功");
          } else {
            //失败
            console.log("生成失败");
          }
        });
      } catch (error) {
        console.log(e);
      }
    } 
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
