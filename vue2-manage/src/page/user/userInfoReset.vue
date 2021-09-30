<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="head">信息修改</div>
    <div class="info-set">
      <el-row style="margin-top: 35px">
        <el-col :span="12" :offset="4">
          <el-form
            :model="formData"
            :rules="rules"
            ref="formData"
            label-width="25%"
          >
            <el-form-item label="用户名:">
              <el-input
                v-model="formData.username"
                style="width: 100%"
                :disabled="update"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="formData.sex" :disabled="update">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input
                v-model="formData.phoneNumber"
                style="width: 100%"
                :disabled="update"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
              <el-input
                v-model="formData.idCard"
                style="width: 100%"
                :disabled="update"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input
                v-model="formData.email"
                style="width: 100%"
                :disabled="update"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码:">
              <el-input
                v-model="formData.newPassword"
                style="width: 100%"
                placeholder="请输入新密码"
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
                  updateVisible();
                "
                style="display: inline; width: 100%"
                >修改</el-button
              >
              <el-button
                id="cancelId"
                type="primary"
                @click="
                  update = true;
                  cancelAndSubmitVisible();
                "
                style="display: none; width: 45%"
                >取消</el-button
              >
              <el-button
                id="submitId"
                type="primary"
                @click="
                  update = true;
                  cancelAndSubmitVisible();
                  submit();
                "
                style="display: none; width: 45%"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { userQuery, userUpdate } from "@/api/getData";
export default {
  data() {
    return {
      formData: {},
      update: true,
      visibleUpdate: "",
      visibleCancel: "none",
      visibleSubmit: "none",
      userId: "",
    };
  },
  components: {
    headTop,
  },
  created() {
    (this.userId = sessionStorage.getItem("userId")), this.initData();
  },
  mounted() {
    this.initData();
  },
  watch: {
    $route() {
      this.initData();
    },
  },
  methods: {
    // 按钮可视化
    updateVisible() {
      document.getElementById("updateId").style.display = "none";
      console.log(2222222);
      document.getElementById("cancelId").style.display = "inline";
      document.getElementById("submitId").style.display = "inline";
    },
    cancelAndSubmitVisible() {
      document.getElementById("updateId").style.display = "inline";
      document.getElementById("cancelId").style.display = "none";
      document.getElementById("submitId").style.display = "none";
    },
    initData() {
      const query = {
        userId: sessionStorage.getItem("userId"),
        decryptFlag: 1,
      };
      console.log("开始获取数据");
      userQuery(query).then((result) => {
        console.log("函数内");
        if (result.status) {
          //成功
          console.log(result.data);
          console.log(result.data[0]);
          console.log(result.data[0].username);
          this.formData = result.data[0];
          console.log(this.formData);
        } else {
          //失败
          console.log("获取失败");
        }
      });
    },
    // 数据提交
    submit() {
      if (this.formData.sex == "男") {
        this.formData.sex = "0";
      } else {
        this.formData.sex = "1";
      }
      console.log(this.formData);
      userUpdate(this.formData).then((result) => {
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
.info-set {
  margin-left: 10%;
}
.info-set .el-form-item {
  margin-bottom: 3.5%;
}
</style>
