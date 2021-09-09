<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="head">信息修改</div>
    <el-form
      label-width="200px"
      style="margin-left: 20%; margin-top: 35px"
      :rules="rules"
    >
      <el-form-item label="姓名:" style="margin-bottom:3.5%">
        <el-input
          v-model="initInfor.username"
          placeholder="请输入姓名"
          style="width: 440px"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="编号:" style="margin-bottom:3.5%">
        <el-input
          v-model="initInfor.manId"
          placeholder="请输入编号"
          style="width: 440px"
          :disabled="true"
        ></el-input>
      </el-form-item>


      <el-form-item label="手机号:" prop="phone" style="margin-bottom:3.5%"> 
        <el-input
          v-model="initInfor.phoneNumber"
          placeholder="请输入手机号"
          style="width: 440px"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码:" prop="pass" style="margin-bottom:3.5%">
        <el-input
          v-model="initInfor.password"
          placeholder="请输入密码"
          style="width: 440px"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="邮箱:" prop="emails" style="margin-bottom:3.5%">
        <el-input
          v-model="initInfor.email"
          placeholder="请输入邮箱"
          style="width: 440px"
        ></el-input>
      </el-form-item>

    </el-form>

    <div class="table_container" style="margin-left: 45%">
      <el-button type="primary" @click="SubmitInfo()">提交</el-button>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import { notaQuery, noTypeQuery, notarregist } from "@/api/getData";
export default {
  data() {
    return {
      manId:"",
      changeVisible: false,
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
  computed: {
  },
  components: {
    headTop,
  },
  methods: {
    // 初始化数据
    async initData() {
      try {
        const query = {
          manId: this.manId,
        };
        await sysQuery(query).then((result) => {
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
        const submitInfo = {
          manId: this.manId,
          phoneNumber: this.initInfor.phoneNumber,
          email: this.initInfor.email,
          password: this.initInfor.password,
        };
        await notarregist(submitInfo).then((result) => {
          if (result.status) {
            alert("修改成功");
          } else {
            throw new Error("获取数据失败");
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
  font-size: 30px;
}
.search_container {
  padding: 20px;
}
.demo-table-expand {
  font-size: 20px;
}
.demo-table-expand label {
  width: 120px;
  color: #000000;
  font-size: 15px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
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
