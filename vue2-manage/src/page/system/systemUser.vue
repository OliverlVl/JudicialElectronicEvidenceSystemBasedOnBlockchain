<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <el-input
        v-model="userInfo.usernameWildcard"
        placeholder="请输入用户名"
        style="width: 390px; margin-left: 3%"
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
        <el-form-item label="用户编号:">
          <el-input
            v-model="userInfo.userId"
            placeholder="请输入用户编号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号:">
          <el-input
            v-model="userInfo.phoneNumberWildcard"
            placeholder="请输入手机号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号:">
          <el-input
            v-model="userInfo.idCard"
            placeholder="请输入身份证号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱:">
          <el-input
            v-model="userInfo.emailWildcard"
            placeholder="请输入邮箱"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别:">
          <el-select
            v-model="userInfo.sex"
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
        <el-table-column
          label="用户编号"
          align="center"
          width="160px"
          prop="userId"
        ></el-table-column>
        <el-table-column
          label="用户名"
          width="160px"
          align="center"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="手机号"
          align="center"
          prop="phoneNumber"
        ></el-table-column>
        <el-table-column
          label="性别"
          align="center"
          width="100px"
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
        <el-table-column
          label="已用空间"
          align="right"
          width="100px"
          prop="hasUsedStorage"
        ></el-table-column>
        <el-table-column
          label="/"
          align="center"
          width="20px"
        >/</el-table-column>
        <el-table-column
          label="存储空间"
          align="left"
          width="100px"
          prop="storageSpace"
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
import { userQuery } from "@/api/getData";
export default {
  data() {
    return {
      searchVisible: false,
      decrypt_flag: true,
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      //用户信息
      userInfo: {
        userId: "",
        usernameWildcard: "",
        phoneNumberWildcard: "",
        idCard: "",
        emailWildcard: "",
        sex: "",
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
      manId: "",
      // 加解密
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
          userId: "none",
          usernameWildcard: "none",
          phoneNumberWildcard: "none",
          idCard: "none",
          emailWildcard: "none",
          sex: "none",
          decryptFlag: 1,
        };
        await userQuery(query).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
          } else {
            console.log("获取数据失败");
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
      if (this.userInfo.userId == "") {
        this.userInfo.userId = "none";
      }
      //用户名
      if (this.userInfo.usernameWildcard == "") {
        this.userInfo.usernameWildcard = "none";
      }
      //电话号码
      if (this.userInfo.phoneNumberWildcard == "") {
        this.userInfo.phoneNumberWildcard = "none";
      }
      //身份证号
      if (this.userInfo.idCard == "") {
        this.userInfo.idCard = "none";
      }
      //邮箱
      if (this.userInfo.emailWildcard == "") {
        this.userInfo.emailWildcard = "none";
      }
      //性别
      if (this.userInfo.sex == "") {
        this.userInfo.sex = "none";
      }
      //加解密
      if (this.decrypt_flag) {
        this.userInfo.decryptFlag = 1;
      } else {
        this.userInfo.decryptFlag = 0;
      }
      //alert(this.userInfo.decryptFlag);
    },
    // 搜索
    async handleSearch() {
      try {
        this.dealData();
        await userQuery(this.userInfo).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
          } else {
            console.log("获取数据失败");
          }
        });
        this.resetData();
      } catch (error) {
        console.log(error.message);
      }
    },
    resetData() {
      //用户编号
      if (this.userInfo.userId == "none") {
        this.userInfo.userId = "";
      }
      //用户名
      if (this.userInfo.usernameWildcard == "none") {
        this.userInfo.usernameWildcard = "";
      }
      //电话号码
      if (this.userInfo.phoneNumberWildcard == "none") {
        this.userInfo.phoneNumberWildcard = "";
      }
      //身份证号
      if (this.userInfo.idCard == "none") {
        this.userInfo.idCard = "";
      }
      //邮箱
      if (this.userInfo.emailWildcard == "none") {
        this.userInfo.emailWildcard = "";
      }
      //性别
      if (this.userInfo.sex == "none") {
        this.userInfo.sex = "";
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
  background:rgba(196, 196, 196, 0.5)
}
</style>
