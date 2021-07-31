<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="12" :offset="4">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="110px"
          class="demo-formData"
        >
          <el-form-item label="区块链配置">
            <el-select v-model="formData.blockchainSet" prop="blockchainSet">
              <el-option
                v-for="item in options_blockchain"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存证类型">
            <el-select v-model="formData.evidenceType">
              <el-option
                v-for="item in options_evidence"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存证名称" prop="evidenceName">
            <el-input v-model="formData.evidenceName" placeholder="请输入存证名称"></el-input>
          </el-form-item>

          <el-form-item label="上传文件">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/addEvidence'"
              :on-success="handleShopAvatarScucess"
              :show-file-list="true"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="共享对象">
            <el-button type="primary" @click="addShare()">
              <i class="el-icon-plus"></i>添加共享对象
            </el-button>
          </el-form-item>
          <el-table
            :data="activities"
            style="min-width: 600px;margin-bottom: 20px; "
            align="cneter"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="icon_name" label="活动标题" align="cneter" width="120"></el-table-column>
            <el-table-column prop="description" align="cneter" label="分享对象手机号"></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import {
  cityGuess,
  addShop,
  searchplace,
  foodCategoryl,
  addStorageEvidence
} from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      formData: {
        file_path: "",
        file_hash: "",
        evidence_size: "",
        file_type: "",
        file_name: "",
        evidenceType: "1",
        blockchainSet: "司法链",
        evidenceName: ""
      },
      rules: {
        evidenceName: [{ required: true, message: "请输入存证名称" }]
      },

      activities: [],
      baseUrl,
      //区块链配置选择
      options_blockchain: [
        {
          value: "司法链",
          label: "司法链"
        }
      ],

      //存证类型选择
      options_evidence: [
        {
          value: "1",
          label: "文件存证"
        },
        {
          value: "2",
          label: "内容存证"
        }
      ],

      //分享对象
      activityValue: ""
    };
  },
  components: {
    headTop
  },
  mounted() {
    // this.initData();
  },
  methods: {
    handleShopAvatarScucess(res, file) {
      console.log(res);
      if (res.error_code == 0) {
        this.$message.success("上传文件成功！");
        this.formData.file_path = res.path;
        this.formData.file_hash = res.hash;
        this.formData.evidence_size = res.evidence_size;
        this.formData.file_type = res.file_type;
        this.formData.file_name = res.file_name;
      } else {
        this.$message.error("上传文件失败！");
      }
    },

    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    addShare() {
      this.$prompt("请输入分享对象手机号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == null) {
            this.$message({
              type: "info",
              message: "请输入共享对象手机号码"
            });
            return;
          }
          let newObj = {};
          newObj = {
            icon_name: "共享证据",
            description: value
          };

          this.activities.push(newObj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    handleDelete(index) {
      this.activities.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          Object.assign(this.formData, {
            activities: this.activities,
            telephone: localStorage.getItem("telephone")
          });
          console.log(this.formData);
          try {
            let result = await addStorageEvidence(this.formData);
            if (result.error_code == 0) {
              this.$message({
                type: "success",
                message: "新增存证成功"
              });
              this.formData = {
                file_path: "",
                file_hash: "",
                evidence_size: "",
                file_type: "",
                file_name: "",
                evidenceType: "1",
                blockchainSet: "司法链",
                evidenceName: ""
              };
              this.activities = [];
            } else {
              this.$message({
                type: "error",
                message: "新增存证失败"
              });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查输入是否正确",
            offset: 100
          });
          return false;
        }
      });
    }
  }
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
