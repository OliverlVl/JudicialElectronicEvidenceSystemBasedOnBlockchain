<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="head">信息修改</div>
    <el-form
      label-width="25%"
      style="margin-left: 20%; margin-top: 35px"
      :rules="rules"
    >
    <el-form-item label="编号:" style="margin-bottom: 1.5%">
        <el-input
          v-model="initInfor.manId"
          placeholder="请输入编号"
          style="width: 440px"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名:" style="margin-bottom: 1.5%">
        <el-input
          v-model="initInfor.username"
          placeholder="请输入姓名"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别:" style="margin-bottom: 1.5%">
        <el-radio-group v-model="initInfor.sex" :disabled="update">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone" style="margin-bottom: 1.5%">
        <el-input
          v-model="initInfor.phoneNumber"
          placeholder="请输入手机号"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号:" style="margin-bottom: 1.5%">
        <el-input
          v-model="initInfor.idCard"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="emails" style="margin-bottom: 1.5%">
        <el-input
          v-model="initInfor.email"
          placeholder="请输入邮箱"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="pass" style="margin-bottom: 1.5%">
        <el-input
          v-model="initInfor.newPassword"
          placeholder="请输入新密码"
          style="width: 440px"
          :disabled="update"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          id="updateId"
          type="primary"
          @click="
            update = false;
            updateVisible();
          "
          style="display: inline; width: 440px"
          >修改</el-button
        >
        <el-button
          id="cancelId"
          type="primary"
          @click="
            update = true;
            cancelAndSubmitVisible();
          "
          style="display: none; width: 205px"
          >取消</el-button
        >
        <el-button
          id="submitId"
          type="primary"
          @click="
            update = true;
            cancelAndSubmitVisible();
            SubmitInfo();
          "
          style="display: none; width: 205px"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  notaQuery,
  noTypeQuery,
  notarregist,
  sysQuery,
  sysUpdate,
} from "@/api/getData";
export default {
  data() {
    return {
      manId: "",
      changeVisible: false,
      update: true,
      oldPass: "",
      newPass: "",
      info: {
        password: "",
        phoneNumber: "",
        email: "",
        notarizationType: "",
      } /*
      initInfor: {
        notaryId: "8003117104",
        notaryName: "张三",
        jobNumber: "211020",
        password: "88888888",
        phoneNumber: "156*******",
        idCard: "35************",
        email: "29********@qq.com",
        sex: "男",
        organizationId: "1520",
        notarizationType: "none",
      },*/,
      initInfor: {},
      /*
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {type:"number", min:11, max:11, message:"请输入正确的手机号", trigger:"blur"},
        ],
        emails: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
        pass:[
          {required: true, message:"请输入密码", trigger: "blur"},
          {min:8, max:20, message:"请输入8-20位字符作为密码", trigger: "blur"},
        ]
      },*/
      notarization_type: [
        {
          label: "不限",
          value: "none",
        },
      ],
    };
  },
  created() {
    this.decryptFlag = 1;
    this.manId = localStorage.getItem("manId");
    this.initData();
    //this.oldPass = this.initInfor.password;
  },
  computed: {},
  components: {
    headTop,
  },
  methods: {
    // 按钮可视化
    updateVisible() {
      document.getElementById("updateId").style.display = "none";
      document.getElementById("cancelId").style.display = "inline";
      document.getElementById("submitId").style.display = "inline";
    },
    cancelAndSubmitVisible() {
      document.getElementById("updateId").style.display = "inline";
      document.getElementById("cancelId").style.display = "none";
      document.getElementById("submitId").style.display = "none";
    },
    // 初始化数据
    async initData() {
      try {
        const query = {
          manId: sessionStorage.getItem("manId"),
        };
        await sysQuery(query).then((result) => {
          console.log(result);
          if (result.status) {
            this.initInfor = {};
            this.initInfor = result.data;
          } else {
            throw new Error("获取数据失败");
          }
        });
        //获取公证类型
        await noTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.notarization_type.push(item);
            });
          }
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // 处理导航页
    handlePageChange(val) {
      console.log(val);
      this.pageIndex = val;
      this.initData();
    },

    // 提交
    async SubmitInfo() {
      try {
        if (this.initInfor.sex == "男") {
          this.initInfor.sex = "0";
        } else {
          this.initInfor.sex = "1";
        }
        this.initInfor.manId = sessionStorage.getItem("manId");
        console.log();
        await sysUpdate(this.initInfor).then((result) => {
          if (result.status) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.initData();
          } else {
            this.$message({
              type: "error",
              message: "修改失败!",
            });
          }
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    tryy() {
      alert(this.oldPass);
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.head {
  height: 7%;
  background-color: lightblue;
  text-align: center;
  width: 100%;
  font-size: 40px;
}
.search_container {
  padding: 20px;
}
.table_container {
  padding: 10px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.a-style {
  color: #0500ee;
  cursor: pointer;
  text-decoration: underline;
}
</style>
