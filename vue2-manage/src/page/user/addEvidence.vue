<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="2">
        <el-form
          :model="uploadData"
          :rules="rules"
          ref="uploadData"
          label-width="200px"
          class="demo-formData"
        >
          <el-form-item label="存证类型" prop="evidenceType">
            <el-select
              v-model="uploadData.evidenceType"
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
          <el-form-item class="button_submit">
            <el-button type="primary" @click="addEvidence()"
              >确定上传</el-button
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
import axios from 'axios'
export default {
  data() {
    return {
      uploadData: {
        evidenceType: "",
        evidenceName: "",
        fileList: [],
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
      console.log(444444444)
      this.formData.append('file', file.file);
      this.isuploadfile = true;
      console.log(333333)
    },

    addEvidence() {
      this.formData = new FormData();
      this.$refs.upload.submit(); // 必须设置，这样才会上次文件，触发uploadFile()函数
      this.formData.append('evidenceType',this.uploadData.evidenceType);
      this.formData.append('evidenceName',this.uploadData.evidenceName);
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
            console.log(1111111111)
            console.log(this.formData.file)
            this.formData.append("userId", sessionStorage.getItem("userId"));
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            axios.defaults.baseURL = "http://127.0.0.1:8080"; 
            axios.post("/user/addEvidence", this.formData, config).then((res) => {
              let data = res.data;
              if (data.status) {
                // 清空数据
                this.uploadData.evidenceType='';
                thi.uploadData.evidenceName='';
                thi.uploadData.fileList=[];

                this.$message({
                  type: "success",
                  message: "存证上传成功",
                });
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
      this.$refs[formData].resetFields();
      this.$refs.upload.clearFiles()
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.button_submit {
  margin-left: 100px;
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
