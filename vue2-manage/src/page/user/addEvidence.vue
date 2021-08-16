<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="200px"
          class="demo-formData"
        >
          <el-form-item label="存证类型" prop="evidenceType">
            <el-select
              v-model="formData.evidenceType"
              style="width: 50%"
              placeholder="请选择存证类型"
            >
              <el-option
                v-for="item in evidenceType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存证名称" prop="evidenceName">
            <el-input
              v-model="formData.evidenceName"
              placeholder="请输入存证名称"
              style="width: 50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="avatar-uploader"
              :action="no"
              :http-request="uploadFile"
              :show-file-list="true"
              :auto-upload="false"
              drag
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="submitForm('formData')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { getEvidenceType, addEvidence } from "@/api/getData";
export default {
  data() {
    return {
      formData: {
        evidenceType: "",
        evidenceName: "",
      },

      rules: {
        evidenceName: [{ required: true, message: "请输入存证名称" }],
        evidenceType: [
          { required: true, message: "请选择存证类型", trigger: "change" },
        ],
      },

      evidenceType: [],
      //判断文件是否上传
      isuploadfile: false,
    };
  },
  components: {
    headTop,
  },
  created() {
    console.log("eeeeeeeeeee");
    this.getEvidenceType();
  },
  mounted() {},
  methods: {
    //获取存证类型
    getEvidenceType() {
      try {
        getEvidenceType().then((result) => {
          if (result.status == true) {
            //成功
            console.log(result.data);
            result.data.forEach((item) => {
              this.evidenceType.push(item);
            });
          } else {
            //失败
            console.log("获取失败");
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    //添加文件时触发
    uploadFile(file) {
      this.formDate.append("file", file.file);
      this.isuploadfile = true;
    },

    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          if (!this.isuploadfile) {
            this.$message({
              type: "error",
              message: "请先上传文件",
            });
            return false;
          }
          // 开始上传
          try {
            this.formDate.append("userId", sessionStorage.getItem("userId"));
            addEvidence(this.formDate).then((result) => {
              if (result.status == true) {
                //成功
                this.$message({
                  type: "success",
                  message: "存证成功",
                });
              } else {
                //失败
                console.log("存证失败");
              }
            });
          } catch (e) {
            console.log(e);
          }
        } else {
          this.$message({
            type: "error",
            message: "请输入存证名称",
          });
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formData) {
      this.$refs[formData].resetFields();
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.button_submit {
  text-align: center;
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
</style>
