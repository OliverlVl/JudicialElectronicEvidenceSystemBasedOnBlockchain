<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <el-input
        v-model="autMInfo.autNameWildcard"
        placeholder="请输入机构管理员名称"
        style="width: 390px; margin-left: 3%"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch()"
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
        <el-form-item label="机构管理员姓名:">
          <el-input
            v-model="autMInfo.autNameWildcard"
            placeholder="请输入机构管理员姓名"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="机构管理员编号:">
          <el-input
            v-model="autMInfo.autManId"
            placeholder="请输入公证员编号"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号:">
          <el-input
            v-model="autMInfo.phoneNumberWildcard"
            placeholder="请输入手机号"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号:">
          <el-input
            v-model="autMInfo.idCard"
            placeholder="请输入身份证号"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱:">
          <el-input
            v-model="autMInfo.emailWildcard"
            placeholder="请输入邮箱"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="所属机构:">
          <el-select
            v-model="autMInfo.organizationId"
            style="width: 240px"
            placeholder="请选择所属机构"
            clearable
          >
            <el-option
              v-for="item in orgName"
              :key="item.organizationId"
              :label="item.organizationName"
              :value="item.organizationId"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="性别:">
          <el-select
            v-model="autMInfo.sex"
            style="width: 240px"
            placeholder="请选择性别"
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
            handleSearch();
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
          label="机构管理员编号"
          align="center"
          prop="autManId"
        ></el-table-column>
        <el-table-column
          label="机构管理员姓名"
          align="center"
          prop="autName"
        ></el-table-column>
        <el-table-column
          label="机构名称"
          align="center"
          prop="organizationName"
        ></el-table-column>
        <el-table-column
          label="手机号"
          align="center"
          prop="phoneNumber"
        ></el-table-column>
        <el-table-column
          label="性别"
          align="center"
          width="50px"
          prop="sex"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          align="center"
          prop="email"
        ></el-table-column>
        <el-table-column
          label="身份证号"
          align="center"
          prop="idCard"
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
import { baseUrl, baseImgPath } from "@/config/env";
import { autmanQuery, orgaQuery } from "@/api/getData";
export default {
  data() {
    return {
      pageData: [], // 分页数据
      manId: "",
      searchVisible: false,
      decrypt_flag: true,
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      //用户信息
      autMInfo: {
        autManId: "",
        autNameWildcard: "",
        phoneNumberWildcard: "",
        idCard: "",
        emailWildcard: "",
        sex: "",
        organizationId: "",
        decryptFlag: 1,
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
      orgName: [],
    };
  },
  created() {
    this.manId = localStorage.getItem("manId");
    this.initData();
  },
  computed: {},
  components: {
    headTop,
  },
  methods: {
    // 序号
    indexMethod(index){
      // index 从 0 开始的
      return (this.pageIndex -1)* this.pageSize + index +1;
    },

    // 初始化数据
    async initData() {
      try {
        const orgQuery = {
          organizationId: "none",
          organizationIdNameWildcard: "none",
          addressWildcard: "none",
          phoneNumberWildcard: "none",
          legalPeopleWildcard: "none",
          emailWildcard: "none",
        };
        const query = {
          autManId: "none",
          autNameWildcard: "none",
          phoneNumberWildcard: "none",
          idCard: "none",
          emailWildcard: "none",
          sex: "none",
          organizationId: "none",
          decryptFlag: 1,
        };
        await autmanQuery(query).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
            this.handlePageChange(1);
          } else {
            console.log("获取数据失败");
          }
        });
        //获取组织名
        await orgaQuery(orgQuery).then((result) => {
          if (result.status) {
            this.orgName = [];
            result.data.forEach((item) => {
              this.orgName.push(item);
            });
          } else {
            console.log("获取机构名失败失败");
          }
        });
      } catch (error) {
        throw new Error(error.message);
      }
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
      //用户编号
      if (this.autMInfo.autManId == "") {
        this.autMInfo.autManId = "none";
      }
      //用户名
      if (this.autMInfo.autNameWildcard == "") {
        this.autMInfo.autNameWildcard = "none";
      }
      //电话号码
      if (this.autMInfo.phoneNumberWildcard == "") {
        this.autMInfo.phoneNumberWildcard = "none";
      }
      //身份证号
      if (this.autMInfo.idCard == "") {
        this.autMInfo.idCard = "none";
      }
      //邮箱
      if (this.autMInfo.emailWildcard == "") {
        this.autMInfo.emailWildcard = "none";
      }
      //性别
      if (this.autMInfo.sex == "") {
        this.autMInfo.sex = "none";
      }
      //机构
      if (this.autMInfo.organizationId == "") {
        this.autMInfo.organizationId = "none";
      }
      //加解密
      if (this.decrypt_flag) {
        this.autMInfo.decryptFlag = 1;
      } else {
        this.autMInfo.decryptFlag = 0;
      }
    },
    // 搜索
    async handleSearch() {
      try {
        this.dealData();
        await autmanQuery(this.autMInfo).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              if (this.autMInfo.decryptFlag == 0) {
                var str = item.idCard.split(":");
                item.idCard = str[2].substring(0, 6) + "******";
              }
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
            this.handlePageChange(1);
          } else {
            console.log(result.message);
          }
        });
        this.resetData();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    resetData() {
      //用户编号
      if (this.autMInfo.autManId == "none") {
        this.autMInfo.autManId = "";
      }
      //用户名
      if (this.autMInfo.autNameWildcard == "none") {
        this.autMInfo.autNameWildcard = "";
      }
      //电话号码
      if (this.autMInfo.phoneNumberWildcard == "none") {
        this.autMInfo.phoneNumberWildcard = "";
      }
      //身份证号
      if (this.autMInfo.idCard == "none") {
        this.autMInfo.idCard = "";
      }
      //邮箱
      if (this.autMInfo.emailWildcard == "none") {
        this.autMInfo.emailWildcard = "";
      }
      //性别
      if (this.autMInfo.sex == "none") {
        this.autMInfo.sex = "";
      }
      //机构
      if (this.autMInfo.organizationId == "none") {
        this.autMInfo.organizationId = "";
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
