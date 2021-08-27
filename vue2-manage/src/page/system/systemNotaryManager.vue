<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container">
      <el-input
        v-model="autMInfo.autNameWildcard"
        placeholder="请输入机构管理员名称"
        style="width: 390px; margin-left: 30%"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch()"
        ></el-button>
      </el-input>
      <el-button
        type="primary"
        @click="searchVisible = true"
        style="margin-left: 18px"
        >高级搜索
      </el-button>
    </div>
    <el-dialog
      title="高级搜索"
      :visible.sync="searchVisible"
      style="width: 100%"
    >
      <el-form label-width="200px">
        <el-form-item label="机构管理员编号:">
          <el-input
            v-model="autMInfo.autManId"
            placeholder="请输入公证员编号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号:">
          <el-input
            v-model="autMInfo.phoneNumberWildcard"
            placeholder="请输入手机号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号:">
          <el-input
            v-model="autMInfo.idCard"
            placeholder="请输入身份证号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱:">
          <el-input
            v-model="autMInfo.emailWildcard"
            placeholder="请输入邮箱"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="机构:">
          <el-select
            v-model="autMInfo.organizationId"
            style="width: 240px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in org_info"
              :key="item.organization_id"
              :label="organization_name"
              :value="item.organization_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="性别:">
          <el-select
            v-model="autMInfo.sex"
            style="width: 240px"
            placeholder="请选择"
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

        <el-form-item label="明文/密文显示">
          <el-switch
            v-model="decrypt_flag"
            active-text="明文"
            inactive-text="密文"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="机构ID">
                <span>{{ props.row.organizationId }}</span>
              </el-form-item>
              <el-form-item label="身份证号">
                <span>{{ props.row.idCard }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="机构管理员编号" prop="autManId"></el-table-column>
        <el-table-column label="机构管理员" prop="autNameWildcard"></el-table-column>
        <el-table-column label="手机号" prop="phoneNumber"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
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
import { notaQuery, orgaQuery } from "@/api/getData";
export default {
  data() {
    return {
      manId:"",
      searchVisible: false,
      decrypt_flag: true,
      // 表格
      tableData: [{}],
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
      org_info:[],
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
    // 初始化数据
    async initData() {
      try {
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
        await notaQuery(query).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
          } else {
            throw new Error("获取数据失败");
          }
        });
        //获取机构
        await orgaQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.org_info.push(item);
            });
          }
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // 处理导航页
    handlePageChange(val) {
      console.log(val);
      this.pageIndex = val;
      this.initData();
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
      //alert(this.autMInfo.decryptFlag);
    },
    // 搜索
    async handleSearch() {
      try {
        this.dealData();
        await userQuery(this.autMInfo).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
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
</style>
