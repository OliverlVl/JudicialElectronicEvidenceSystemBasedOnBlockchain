<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="head">信息修改</div>
    <el-form label-width="200px" style="margin-left: 20%; margin-top: 35px">
      <el-form-item label="用户名:" style="margin-bottom: 3.5%">
        <el-input
          v-model="initInfor.autName"
          placeholder="请输入用户名"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>

      <el-form-item label="编号:" style="margin-bottom: 3.5%">
        <el-input
          v-model="initInfor.autManId"
          placeholder="请输入编号"
          style="width: 440px"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="所属机构:" style="margin-bottom: 3.5%">
        <el-input
          v-model="initInfor.organizationName"
          placeholder="请选择所属机构"
          style="width: 440px"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="手机号:" prop="phone" style="margin-bottom: 3.5%">
        <el-input
          v-model="initInfor.phoneNumber"
          placeholder="请输入手机号"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>

      <el-form-item label="新密码:" prop="pass" style="margin-bottom: 3.5%">
        <el-input
          v-model="initInfor.newPassword"
          placeholder="请输入密码"
          style="width: 440px"
          show-password
          :disabled="update"
        ></el-input>
      </el-form-item>

      <el-form-item label="邮箱:" prop="emails" style="margin-bottom: 3.5%">
        <el-input
          v-model="initInfor.email"
          placeholder="请输入邮箱"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="sex" style="margin-bottom: 3.5%">
        <el-select
          :popper-append-to-body="false"
          v-model="initInfor.sex"
          placeholder="请选择"
          :disabled="update"
           style="width: 440px"
        >
          <el-option
            v-for="item in sex"
            :key="item.label"
            :label="item.key"
            :value="item.key"
          >
          </el-option>
        </el-select>
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
import { autUpdate, autmanQuery } from "@/api/getData";
export default {
  data() {
    return {
      autManId: "",
      changeVisible: false,
      update: true,
      oldPass: "",
      newPass: "",
      /*
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
      },*/
      initInfor: {},
      sex: [
        { label: "0", key: "男" },
        { label: "1", key: "女" },
      ],
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
    //this.manId = localStorage.getItem("manId");
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
          autManId: sessionStorage.getItem("autManId"),
          decryptFlag: this.decryptFlag,
        };
        console.log(query);
        await autmanQuery(query).then((result) => {
          if (result.status) {
            console.log(result);
            this.initInfor = {};
            this.initInfor = result.data[0];
            console.log(this.initInfor);
          } else {
            console.log("获取数据失败");
          }
        });
      } catch (error) {
        console.log("获取信息失败");
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
        
        await autUpdate(this.initInfor).then((result) => {
          if (result.status) {
            alert("修改成功");
          } else {
            console.log(result.message);
          }
        });
      } catch (error) {
        console.log(error.message);
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
