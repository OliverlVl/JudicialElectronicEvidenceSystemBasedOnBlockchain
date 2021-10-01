<template>
  <div class="fillcontain">
    <head-top></head-top>

    <!-- 搜索 -->
    <div class="search_container top-div-set">
      <el-input
        v-model="organizationInfo.organizationIdNameWildcard"
        placeholder="请输入机构名称"
        style="width: 390px; margin-left: 3%"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getOrganizationData()"
        ></el-button>
      </el-input>
      <!-- 新增机构 -->
      <el-button
        type="danger"
        @click="addOrganizationVisible = true"
        style="float: right"
        >添加机构
      </el-button>
    </div>

    <el-dialog
      title="添加机构"
      :visible.sync="addOrganizationVisible"
      style="width: 100%"
      :append-to-body="true"
    >
      <el-form
        :model="organization"
        :rules="rulesOrganization"
        ref="organization"
        label-width="35%"
      >
        <el-form-item label="机构名称:" prop="organizationName">
          <el-input
            v-model="organization.organizationName"
            placeholder="请输入机构名称"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input
            v-model="organization.address"
            placeholder="请输入地址信息"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="联系电话:" prop="phoneNumber">
          <el-input
            v-model="organization.phoneNumber"
            placeholder="请输入联系电话"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱:" prop="email">
          <el-input
            v-model="organization.email"
            placeholder="请输入邮箱"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="法人代表:" prop="legalPeople">
          <el-input
            v-model="organization.legalPeople"
            placeholder="请输入法人代表"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrganizationVisible = false">取 消</el-button>
        <el-button @click="addOrganization()" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 列表 -->
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
          label="机构编号"
          align="center"
          width="300px"
          prop="organizationId"
        ></el-table-column>
        <el-table-column
          label="机构名称"
          align="center"
          prop="organizationName"
        ></el-table-column>
        <el-table-column
          label="地址"
          align="center"
          prop="address"
        ></el-table-column>
        <el-table-column
          label="联系电话"
          width="150px"
          align="center"
          prop="phoneNumber"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          align="center"
          prop="email"
        ></el-table-column>
        <el-table-column
          label="法人"
          align="center"
          width="140px"
          prop="legalPeople"
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
import { orgaQuery,addOrganization} from "@/api/getData";
export default {
  data() {
    return {
      pageData: [], // 分页数据

      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      telephone: "",

      // 搜索机构信息
      organizationInfo: {
        organizationId: "none",
        organizationIdNameWildcard: "",
        addressWildcard: "none",
        phoneNumberWildcard: "none",
        legalPeopleWildcard: "none",
        emailWildcard: "none",
      },

      // 添加机构信息
      organization: {},

      rulesOrganization: {
        organizationName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入地址信息", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        legalPeople: [
          { required: true, message: "请输入法人代表", trigger: "blur" },
        ],
      },

      // 表格
      tableData: [],

      addOrganizationVisible: false, // 添加机构弹窗
    };
  },
  created() {
    this.getOrganizationData();
  },

  components: {
    headTop,
  },

  methods: {
    // 序号
    indexMethod(index) {
      // index 从 0 开始的
      return (this.pageIndex - 1) * this.pageSize + index + 1;
    },

    // 获取数据
    getOrganizationData() {
      orgaQuery(this.organizationInfo).then((result) => {
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
      console.log(this.tableData);
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

    // 添加机构
    addOrganization() {
      try {
        this.$refs.organization.validate(async (valid) => {
          if (valid) {
            await addOrganization(this.organization).then((result) => {
              if (result.status) {
                this.$message({
                  type: "success",
                  message: "添加成功",
                });
                this.addOrganizationVisible = false;
                this.getOrganizationData();
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败",
                });
              }
            });
          } else {
            this.$message({
              type: "error",
              message: "请输入完整信息",
            });
            return false;
          }
        });
      } catch (e) {
        console.log(e);
      }
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
  

  