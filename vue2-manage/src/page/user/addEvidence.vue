<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="2">
        <el-form
          v-loading="loading"
          element-loading-text="拼命上传中"
          element-loading-spinner="el-icon-loading"
          :model="uploadData"
          :rules="rules"
          ref="uploadData"
          label-width="200px"
          class="demo-formData"
        >
          <el-form-item label="存证类型" prop="evidenceType">
            <el-select
              v-model="uploadData.evidenceType"
              id="uploadDataId"
              style="width: 50%"
              placeholder="请选择存证类型"
            >
              <el-option
                v-for="item in evidenceType"
                :key="item.evidenceType"
                :label="item.evidenceTypeName"
                :value="item.evidenceType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存证名称" prop="evidenceName">
            <el-input
              v-model="uploadData.evidenceName"
              placeholder="请输入存证名称"
              style="width: 50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="avatar-uploader"
              action="/addEvidence"
              :http-request="uploadFile"
              :show-file-list="true"
              :auto-upload="false"
              :file-list="fileList"
              ref="upload"
              multiple
              drag
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">可以选个多个文件上传</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addEvidence()"
              >确定上传</el-button
            >
            <el-button @click="resetForm('uploadData')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { baseUrl } from "@/config/env";
import { getEvidenceType, addEvidence } from "@/api/getData";
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      uploadData: {
        evidenceType: "",
        evidenceName: "",
      },

      rules: {
        evidenceName: [
          { required: true, message: "请输入存证名称", trigger: "blur" },
        ],
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
              console.log(item);
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
      this.formData.append("file", file.file);
      this.isuploadfile = true;
    },

    addEvidence() {
      this.formData = new FormData();
      this.$refs.upload.submit(); // 必须设置，这样才会上次文件，触发uploadFile()函数
      this.formData.append("evidenceType", this.uploadData.evidenceType);
      this.formData.append("evidenceName", this.uploadData.evidenceName);
      this.$refs.uploadData.validate((valid) => {
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
            this.formData.append("userId", sessionStorage.getItem("userId"));
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            axios.defaults.baseURL = baseUrl;
            this.$message("文件开始上传，请稍等！");
            this.loading = true;
            axios
              .post("/user/addEvidence", this.formData, config)
              .then((res) => {
                let data = res.data;
                if (data.status == true) {
                  this.loading = false;
                  this.$message({
                    type: "success",
                    message: "存证上传成功",
                  });
                  this.isuploadfile = false;
                  this.$refs.upload.clearFiles(); // 清除文件
                } else {
                  this.$message({
                    type: "error",
                    message: "存证上传失敗",
                  });
                }
              });
          } catch (e) {
            console.log(e);
          }
        } else {
          this.$message({
            type: "error",
            message: "请输入完整信息",
          });
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formData) {
      this.$nextTick(() => {
        this.$refs[formData].resetFields(); // 清除字段
        this.$refs.upload.clearFiles(); // 清除文件
      });
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";

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
