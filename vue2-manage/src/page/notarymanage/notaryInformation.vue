<template>
  <div>
    <head-top></head-top>

    <div class="info_container" style="margin-top: 30px">

      <span style="margin-left:10%">新增或修改公证类型:</span>

      <el-button type="primary" @click="createTypeVisible = true"
        >点击新增</el-button
      >
      <el-button type="warning" @click="updateTypeVisible = true"
        >点击修改</el-button
      >
      <span style="margin-left:10%">修改公证金额：</span>
      <el-button type="danger" @click="updateMoneyVisible = true"
        >点击修改</el-button
      >
    </div>

        <!-- 新增公证类型 -->
    <el-dialog
      title="新增公证类型"
      :visible.sync="createTypeVisible"
      style="width: 60%; margin: 0 auto"
    >
      <el-form
        ref="updateDate"
        :model="updateDate"
        label-width="200px"
        id="recharge"
      >
        <el-form-item label="公证类型">
          <el-input
            v-model="updateDate.newNotarizationType"
            placeholder="请输入新公证类型名称"
            style="width: 55%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="createTypeVisible = false">取 消</el-button>
        <el-button type="danger" @click="createType()">确定新增</el-button>
      </div>
    </el-dialog>
    <!-- 修改公证类型 -->
    <el-dialog
      title="修改公证类型"
      :visible.sync="updateTypeVisible"
      style="width: 60%; margin: 0 auto"
    >
      <el-form
        ref="updateDate"
        :model="updateDate"
        label-width="200px"
        id="recharge"
      >
     <el-form-item label="旧公证类型" prop="notarizationType">
          <el-select
            v-model="updateDate.notarizationType"
            style="width: 55%"
            placeholder="请选择公证类型"
          >
            <el-option
              v-for="item in notarizationType"
              :key="item.notarizationType"
              :label="item.notarizationTypeName"
              :value="item.notarizationType"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="新公证类型">
          <el-input
            v-model="updateDate.newNotarizationType"
            placeholder="请输入新公证类型名称"
            style="width: 55%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="updateTypeVisible = false">取 消</el-button>
        <el-button type="danger" @click="updateType()">确定修改</el-button>
      </div>
    </el-dialog>
    <!-- 修改公证金额 -->
    <el-dialog
      title="修改公证金额"
      :visible.sync="updateMoneyVisible"
      style="width: 60%; margin: 0 auto"
    >
      <el-form
        ref="updateDate"
        :model="updateDate"
        label-width="200px"
        id="recharge"
      >
        <el-form-item label="公证类型" prop="notarizationType">
          <el-select
            v-model="updateDate.notarizationType"
            style="width: 55%"
            placeholder="请选择公证类型"
          >
            <el-option
              v-for="item in notarizationType"
              :key="item.notarizationType"
              :label="item.notarizationTypeName"
              :value="item.notarizationType"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公证金额">
          <el-input
            v-model="updateDate.NotarizationMoney"
            placeholder="请输入公证金额"
            style="width: 55%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="updateMoneyVisible = false">取 消</el-button>
        <el-button type="danger" @click="updateMoney()">确定修改</el-button>
      </div>
    </el-dialog>


    <div class="info_container">
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-width="30%"
        class="demo-formData"
      >
        <el-form-item label="公证类型" prop="notarizationType">
          <el-select
            v-model="formData.notarizationType"
            style="width: 30%"
            placeholder="请选择公证类型"
          >
            <el-option
              v-for="item in notarizationType"
              :key="item.notarizationType"
              :label="item.notarizationTypeName"
              :value="item.notarizationType"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传申报材料等相关文件">
          <el-upload
            class="avatar-uploader"
            :action="no"
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
          <el-button type="primary" @click="submitForm('formData')"
            >确定上传</el-button
          >
          <el-button @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
      <div></div>
    </div>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { createType, updateType ,updateMoney,noTypeQuery} from "@/api/getData";
export default {
  data() {
    return {
      createTypeVisible: false,
      updateTypeVisible: false,
       updateMoneyVisible: false,

      updateDate:{
        autManId:sessionStorage.getItem("autManId"),
        newNotarizationType:"", // 新增公证类型/修改后的公正类型
        notarizationType:"", // 所要修改的公证类型
        NotarizationMoney:"" // 公证金额


      },

      formData: {
        autManId:sessionStorage.getItem("autManId"),
        notarizationType: "",
        fileList: [],
      },

      rules: {
        evidenceName: [{ required: true, message: "请输入存证名称" }],
      },

      notarizationType: [],
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
    // 新增公证类型
    async createType() {
      try {
        this.createTypeVisible = false;
        createType(this.updateDate).then((result) => {
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "新增成功",
            });
          } else {
            //失败
            this.$message({
              type: "error",
              message: "新增失败",
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 修改公证类型
    async updateType() {
      try {
        this.updateTypeVisible = false;
        updateType(this.updateDate).then((result) => {
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            //失败
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 修改公证金额
    async updateMoney() {
      try {
        this.updateMoneyVisible = false;
        updateMoney(this.updateDate).then((result) => {
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            //失败
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },


    // 获取公证类型
    async getNotarizationType() {
      try {
        noTypeQuery().then((result) => {
          if (result.status == true) {
            //成功
            console.log(result.data);
            result.data.forEach((item) => {
              this.notarizationType.push(item);
            });
          } else {
            //失败
            console.log("获取公证类型失败");
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
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            axios.defaults.baseURL = "http://127.0.0.1:8080";
            axios.post("/aut/uplaodMaterial", this.formData, config).then((res) => {
              let data = res.data;
              if (data.status) {
                // 清空数据
                this.formData.evidenceType = "";
                thi.formData.fileList = [];

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
      this.$refs.upload.clearFiles();
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.info_container {
  padding: 20px;
  margin: 20px;
  border: 1px solid #dfdfdf;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
  overflow: auto;
}

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
