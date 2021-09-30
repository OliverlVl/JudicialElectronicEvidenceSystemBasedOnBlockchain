<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="head">信息修改</div>
    <el-form label-width="25%" style="margin-left: 20%; margin-top: 35px">
      <el-form-item label="编号:">
        <el-input
          v-model="initInfor.notaryId"
          placeholder="请输入编号"
          style="width: 440px"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="工号:">
        <el-input
          v-model="initInfor.jobNumber"
          placeholder="请输入工号"
          style="width: 440px"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="公证机构:">
        <el-input
          v-model="initInfor.organizationName"
          placeholder="请输入工号"
          style="width: 440px"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input
          v-model="initInfor.notaryName"
          placeholder="请输入姓名"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作年限:">
        <el-input
          v-model="initInfor.workYear"
          placeholder="请输入编号"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>

      <el-form-item label="职位:">
        <el-input
          v-model="initInfor.position"
          placeholder="请输入编号"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>

      <el-form-item label="手机号:" prop="phone">
        <el-input
          v-model="initInfor.phoneNumber"
          placeholder="请输入手机号"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号:" prop="idCard">
        <el-input
          v-model="initInfor.idCard"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="emails">
        <el-input
          v-model="initInfor.email"
          placeholder="请输入邮箱"
          style="width: 440px"
          :disabled="update"
        ></el-input>
      </el-form-item>

      <el-form-item label="公证类型:" prop="notarizationType">
        <el-select
          v-model="initInfor.notarizationType"
          placeholder="请选择公证类型"
          style="width: 440px"
          :disabled="update"
        >
          <el-option
            v-for="item in notarization_type"
            :key="item.notarizationType"
            :label="item.notarizationTypeName"
            :value="item.notarizationType"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新密码:" prop="pass">
        <el-input
          v-model="initInfor.newPassword"
          placeholder="请输入新密码"
          style="width: 440px"
          show-password
          :disabled="update"
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
import { notaQuery, noTypeQuery, notaryUpdate } from "@/api/getData";
export default {
  data() {
    return {
      update: true,
      oldPass: "",
      newPass: "",
      info: {
        password: "",
        phoneNumber: "",
        email: "",
        notarizationType: "",
      },
      initInfor: {},
      notarization_type: [
        {
          notarizationTypeName: "不限",
          notarizationType: "none",
        },
      ],
      notary_id: "",
    };
  },
  created() {
    this.decryptFlag = 1;
    (this.notary_id = sessionStorage.getItem("notaryId")), this.initData();
    this.getNotarizationType();
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
          notaryId: sessionStorage.getItem("notaryId"),
          decryptFlag: 1,
          //notaryId: "1",
        };
        console.log(query);
        await notaQuery(query).then((result) => {
          if (result.status) {
            console.log(result.data[0]);
            this.initInfor = result.data[0];
          } else {
            console.log("获取数据失败");
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
        console.log(error.message);
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

        await notaryUpdate(this.initInfor).then((result) => {
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
            console.log(result.message);
          }
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },


    tryy() {
      alert("1");
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
