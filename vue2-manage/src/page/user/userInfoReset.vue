<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="2">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="200px"
        >
          <el-form-item label="用户名">
            <el-input
              v-model="formData.username"
              style="width: 50%"
              :disabled="update"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="formData.sex" :disabled="update">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              v-model="formData.phoneNumber"
              style="width: 50%"
              :disabled="update"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input
              v-model="formData.idCard"
              style="width: 50%"
              :disabled="update"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              v-model="formData.email"
              style="width: 50%"
              :disabled="update"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="formData.password"
              style="width: 50%"
              show-password
              :disabled="update"
            ></el-input>
          </el-form-item>
          <el-form-item class="button_submit">
            <el-button
              id="updateId"
              type="primary"
              @click="
                update = false;
                updateVisible()
              "
              style="display: inline"
              >修改</el-button
            >
            <el-button
              id="cancelId"
              type="primary"
              @click="update = true;cancelAndSubmitVisible()"
              style="display: none"
              >取消</el-button
            >
            <el-button
              id="submitId"
              type="primary"
              @click="update = true;cancelAndSubmitVisible();submit()"
              style="display: none"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { addEvidence } from "@/api/getData";
export default {
  data() {
    return {
      formData: {
        userId:sessionStorage.getItem("userId"),
        username: "lvl",
        sex: "0",
        phoneNumber:"18015922630",
        idCard:"350181199805061796",
        email:"12826353@fuz.com",
        password:"1321313",
      },
      update: true,
      visibleUpdate: "",
      visibleCancel: "none",
      visibleSubmit: "none",
    };
  },
  components: {
    headTop,
  },
  created() {},
  mounted() {},
  methods: {
    // 按钮可视化
    updateVisible() {
      document.getElementById("updateId").style.display = "none";
      console.log(2222222);
      document.getElementById("cancelId").style.display = "inline";
      document.getElementById("submitId").style.display = "inline";
    },
    cancelAndSubmitVisible(){
      document.getElementById("updateId").style.display = "inline";
      document.getElementById("cancelId").style.display = "none";
      document.getElementById("submitId").style.display = "none";

    },
    // 数据提交
    submit(){

    }
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
// .button_submit {
//   margin-left: 100px;
// }
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
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
</style>
