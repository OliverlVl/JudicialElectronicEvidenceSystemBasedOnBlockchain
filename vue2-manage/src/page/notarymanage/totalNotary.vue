<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <el-input
        v-model="notaryInfo.notaryNameWildcard"
        placeholder="请输入公证员名"
        style="width: 390px; margin-left: 3%"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getNotaryData()"
        ></el-button>
      </el-input>
      <el-button
        type="danger"
        @click="searchVisible = true"
        icon="el-icon-search"
        style="margin-left: 18px"
        plain
      >
        高级搜索
      </el-button>

      <el-switch
        v-model="decrypt_flag"
        active-text="明文"
        inactive-text="密文"
        active-color="#13ce66"
        inactive-color="#ff4949"
        style="margin-left: 300px"
      >
      </el-switch>
    </div>
    <el-dialog
      title="高级搜索"
      :visible.sync="searchVisible"
      style="width: 100%"
      :append-to-body="true"
    >
      <el-form label-width="35%">
        <el-form-item label="公证员名:">
          <el-input
            v-model="notaryInfo.notaryNameWildcard"
            placeholder="请输入公证员名"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="公证员编号:">
          <el-input
            v-model="notaryInfo.notaryId"
            placeholder="请输入公证员编号"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="公证类型:">
          <el-select
            v-model="notaryInfo.notarizationType"
            style="width: 240px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in notarization_type"
              :key="item.notarizationTypeId"
              :label="item.notarizationType"
              :value="item.notarizationType"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号:">
          <el-input
            v-model="notaryInfo.phoneNumberWildcard"
            placeholder="请输入手机号"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="工号:">
          <el-input
            v-model="notaryInfo.jobNumberWildcard"
            placeholder="请输入工号"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号:">
          <el-input
            v-model="notaryInfo.idCard"
            placeholder="请输入身份证号"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱:">
          <el-input
            v-model="notaryInfo.emailWildcard"
            placeholder="请输入邮箱"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="性别:">
          <el-select
            v-model="notaryInfo.sex"
            style="width: 240px"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in sex_state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button
          @click="
            getNotaryData();
            searchVisible = false;
          "
          type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div class="table_container">
      <el-table :data="pageData" stripe style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          :index="indexMethod"
          width="60px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="公证员编号"
          align="center"
          prop="notaryId"
        ></el-table-column>
        <el-table-column
          label="公证员"
          align="center"
          prop="notaryName"
        ></el-table-column>

        <el-table-column
          label="公证类型"
          align="center"
          prop="notarizationType"
        ></el-table-column>
        <el-table-column
          label="性别"
          width="50px"
          align="center"
          prop="sex"
        ></el-table-column>
        <el-table-column
          label="手机号"
          align="center"
          prop="phoneNumber"
        ></el-table-column>
        <el-table-column
          label="身份证号"
          align="center"
          prop="idCard"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          align="center"
          prop="email"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop"; 
import { notaQuery, noTypeQuery } from "@/api/getData";
export default {
  data() {
    return {
      pageData: [], // 分页数据
      searchVisible: false,
      decrypt_flag: true,
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      telephone: "",
      //用户信息
      notaryInfo: {
        decryptFlag: 1,
        organizationId: sessionStorage.getItem("organizationId"),
      },
      sex_state: [
        {
          label: "男",
          value: "0",
        },
        {
          label: "女",
          value: "1",
        },
      ],
      notarization_type: [
        {
          notarizationTypeId: "none",
          notarizationType: "不限",
        },
      ],
      autManId: "",
      // 加解密
    };
  },
  created() {
    this.getNotaryData();
    this.getNotarizationType();
  },
  computed: {},
  components: {
    headTop,
  },
  methods: {
    // 序号
    indexMethod(index) {
      // index 从 0 开始的
      return (this.pageIndex - 1) * this.pageSize + index + 1;
    },

    // 获取公证类型
    getNotarizationType() {
      noTypeQuery().then((typeres) => {
        if (typeres.status) {
          typeres.data.forEach((item) => {
            this.notarization_type.push(item);
          });
          console.log(this.notarization_type);
        }
      });
    },

    // 处理导航页
    handlePageChange(val) {
      this.pageIndex = val;
      if (val * this.pageSize > this.pageTotal) {
        this.pageData = this.tableData.slice((val - 1) * this.pageSize);
      } else {
        this.pageData = this.tableData.slice(
          (val - 1) * this.pageSize,
          val * this.pageSize
        );
      }
    },

    dealData() {
      //性别
      if (this.notaryInfo.sex == "") {
        this.notaryInfo.sex = "none";
      }
      //公证类型
      if (
        this.notaryInfo.notarizationType == "" ||
        this.notaryInfo.notarizationType == "不限"
      ) {
        this.notaryInfo.notarizationType = "none";
      }
      //加解密
      if (this.decrypt_flag) {
        this.notaryInfo.decryptFlag = 1;
      } else {
        this.notaryInfo.decryptFlag = 0;
      }
    },
    // 获取数据
    async getNotaryData() {
      try {
        this.dealData();
        await notaQuery(this.notaryInfo).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              if (this.notaryInfo.decryptFlag == 0) {
                var str = item.idCard.split(":");
                item.idCard = str[2].substring(0, 6) + "******";
              }
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
            this.handlePageChange(1);
          } else {
            throw new Error("获取数据失败");
          }
        });
        this.resetData();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    resetData() {
      //性别
      if (this.notaryInfo.sex == "none") {
        this.notaryInfo.sex = "";
      }
      //公证类型
      if (this.notaryInfo.notarizationType == "none") {
        this.notaryInfo.notarizationType = "";
      }
    },
    handleDel() {
      this.$message.success("审核成功");
    },
  },
};
</script>
<style lang="less">
@import "../../style/mixin";
.search_container {
  padding: 20px;
}
.table_container {
  padding: 20px;
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

.top-div-set {
  background: rgba(196, 196, 196, 0.5);
}
</style>
