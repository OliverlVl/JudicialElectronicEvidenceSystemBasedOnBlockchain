<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="head">信息修改</div>

    <div class="table_container">
      &emsp; <span style="margin-left: 25%">姓名:</span> &emsp;
      <el-input
        v-model="initInfor.notaryName"
        placeholder="请输入手机号"
        style="width: 440px"
        :disabled="true"
      ></el-input>
    </div>

    <div class="table_container">
      &emsp; <span style="margin-left: 25%">编号:</span> &emsp;
      <el-input
        v-model="initInfor.notaryId"
        placeholder="请输入手机号"
        style="width: 440px"
        :disabled="true"
      ></el-input>
    </div>

    <div class="table_container">
      &emsp; <span style="margin-left: 25%">工号:</span> &emsp;
      <el-input
        v-model="initInfor.jobNumber"
        placeholder="请输入手机号"
        style="width: 440px"
        :disabled="true"
      ></el-input>
    </div>

    <div class="table_container">
      &emsp; <span style="margin-left: 21%">公证机构ID：</span> &emsp;
      <el-input
        v-model="initInfor.organizationId"
        placeholder="请输入邮箱"
        style="width: 440px; margin-left: -1%"
        :disabled="true"
      ></el-input>
    </div>

    <div class="table_container">
      &emsp; <span style="margin-left: 23.5%">手机号:</span> &emsp;
      <el-input
        v-model="initInfor.phoneNumber"
        placeholder="请输入手机号"
        style="width: 440px; margin-left: 0.3%"
      ></el-input>
    </div>

    <div class="table_container">
      &emsp; <span style="margin-left: 25%">邮箱:</span> &emsp;
      <el-input
        v-model="initInfor.email"
        placeholder="请输入邮箱"
        style="width: 440px"
      ></el-input>
    </div>

    <div class="table_container">
      &emsp; <span style="margin-left: 22.5%">公证类型：</span> &emsp;
      <el-select
        v-model="initInfor.notarizationType"
        placeholder="请选择"
        filterable
        style="margin-left: -1.1%"
      >
        <el-option
          v-for="item in notarization_type"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button @click="tryy()">取 消</el-button>
    </div>

    <div class="table_container" style="margin-left: 35%">
      <el-button type="primary" @click="changeVisible = true"
        >修改密码</el-button
      >
      <el-button type="primary" @click="SubmitInfo()">提交</el-button>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="changeVisible"
      style="width: 100%"
    >
      <el-form label-width="100px">
        <el-form-item label="旧密码:" style="margin-left:25%">
          <el-input
            v-model="oldPass"
            placeholder="请输入旧密码"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="新密码:" style="margin-left:25%">
          <el-input
            v-model="this.newPass"
            placeholder="请输入新密码"
            style="width: 240px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
          <el-button @click="changeVisible = false">取 消</el-button>
          <el-button @click="ChangePass(); changeVisible = false;" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import { notaQuery, noTypeQuery, notarregist } from "@/api/getData";
export default {
  data() {
    return {
      changeVisible: false,
      oldPass: "",
      newPass: "",
      info: {
        password: "",
        phoneNumber: "",
        email: "",
        notarizationType: "",
      },
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
      },
      notarization_type: [
        {
          label: "不限",
          value: "none",
        },
      ],
      notary_id:"",
    };
  },
  created() {
    this.decryptFlag = 1;
    this.notary_id = localStorage.getItem("notaryId");
    //this.initData();
  },
  computed: {},
  components: {
    headTop,
  },
  methods: {
    // 初始化数据
    async initData() {
      try {
        const query = {
          notaryId: this.notary_id,
        };

        await notaQuery(query).then((result) => {
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
          phoneNumber: this.initInfor.phoneNumber,
          email: this.initInfor.email,
          notarizationType: this.initInfor.notarizationType,
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
    async ChangePass() {
      try{
        if (this.oldPass != this.initInfor.password){
          alert("原密码输入错误");
        }
        const query = {
          password: this.newPass,
        }
        await notarregist(query).then((result) => {
          if (result.status) {
            alert("修改成功");
          } else {
            throw new Error("获取数据失败");
          }
        });
      }catch(e){
        throw new Error(e.message)
      }
    },
    tryy(){
      alert("1");
    }
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.head {
  height: 10%;
  background-color: lightblue;
  text-align: center;
  width: 100%;
  font-size: 30px;
}
.search_container {
  padding: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
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
