<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container" style="margin-left: 30%">
      公证员:
      <el-input
        v-model="notaryInfo.notaryNameWildcard"
        placeholder="请输入公证员"
        style="width: 280px"
      ></el-input>
      <el-button type="primary" @click="handleSearch()">搜索</el-button>
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
      <el-form label-width="100px">
        <el-form-item label="公证员编号:">
          <el-input
            v-model="notaryInfo.notaryId"
            placeholder="请输入公证员编号"
            style="width: 50%"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号:">
          <el-input
            v-model="notaryInfo.phoneNumberWildcard"
            placeholder="请输入手机号"
            style="width: 50%"
          ></el-input>
        </el-form-item>

        <el-form-item label="工号:">
          <el-input
            v-model="notaryInfo.jobNumberWildcard"
            placeholder="请输入工号"
            style="width: 50%"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号:">
          <el-input
            v-model="notaryInfo.idCard"
            placeholder="请输入身份证号"
            style="width: 50%"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱:">
          <el-input
            v-model="notaryInfo.emailWildcard"
            placeholder="请输入邮箱"
            style="width: 50%"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别:">
          <el-select v-model="notaryInfo.sex" placeholder="请选择">
            <el-option
              v-for="item in sex_state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公证类型:">
          <el-select v-model="notaryInfo.notarizationType" placeholder="请选择">
            <el-option
              v-for="item in notarizationType_state"
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="工号">
                <span>{{ props.row.jobNumber }}</span>
              </el-form-item>
              <el-form-item label="公证类型">
                <span>{{ props.row.notarizationType }}</span>
              </el-form-item>
              <el-form-item label="身份证号">
                <span>{{ props.row.idCard }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="公证员编号" prop="notaryId"></el-table-column>
        <el-table-column label="公证员" prop="notaryName"></el-table-column>
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
        <el-switch
          v-model="decrypt_flag"
          on-text="解密"
          off-text="加密"
          style="margin-left: 30px"
        ></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import { notaQuery } from "@/api/getData";
export default {
  data() {
    return {
      searchVisible: false,
      decrypt_flag: true,
      // 表格
      tableData: [{}],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      telephone: "",
      //用户信息
      notaryInfo: {
        notaryId: "",
        notaryNameWildcard: "",
        phoneNumberWildcard: "",
        jobNumberWildcard: "",
        idCard: "",
        emailWildcard: "",
        sex: "",
        notarizationType: "",
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
      notarizationType_state: [
        {
          label: "不限",
          value: "none",
        },
      ],
      // 加解密
    };
  },
  created() {
    this.telephone = localStorage.getItem("telephone");
    this.initData();
    this.getAgent();
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
          notaryId: "none",
          notaryNameWildcard: "none",
          phoneNumberWildcard: "none",
          jobNumberWildcard: "none",
          idCard: "none",
          emailWildcard: "none",
          sex: "none",
          notarizationType: "none",
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
      if (this.notaryInfo.notaryId == "") {
        this.notaryInfo.notaryId = "none";
      }
      //用户名
      if (this.notaryInfo.notaryNameWildcard == "") {
        this.notaryInfo.notaryNameWildcard = "none";
      }
      //电话号码
      if (this.notaryInfo.phoneNumberWildcard == "") {
        this.notaryInfo.phoneNumberWildcard = "none";
      }
      //工号
      if (this.notaryInfo.jobNumberWildcard == "") {
        this.notaryInfo.jobNumberWildcard = "none";
      }
      //身份证号
      if (this.notaryInfo.idCard == "") {
        this.notaryInfo.idCard = "none";
      }
      //邮箱
      if (this.notaryInfo.emailWildcard == "") {
        this.notaryInfo.emailWildcard = "none";
      }
      //性别
      if (this.notaryInfo.sex == "") {
        this.notaryInfo.sex = "none";
      }
      //公证类型
      if (this.notaryInfo.notarizationType == "") {
        this.notaryInfo.notarizationType = "none";
      }
      //加解密
      if (this.decrypt_flag) {
        this.notaryInfo.decryptFlag = 1;
      } else {
        this.notaryInfo.decryptFlag = 0;
      }
      //alert(this.notaryInfo.decryptFlag);
    },
    // 搜索
    async handleSearch() {
      try {
        this.dealData();
        await userQuery(this.notaryInfo).then((result) => {
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
      } catch (error) {
        throw new Error(error.message);
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
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
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
