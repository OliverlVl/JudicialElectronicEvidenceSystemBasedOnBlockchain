<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <label>请选择公证机构:&emsp;</label>
      <el-select
        v-model="organizationId"
        placeholder="请选择"
        @change="notarizationMaterialQuery()"
      >
        <el-option
          v-for="item in orgName"
          :key="item.organizationId"
          :label="item.organizationName"
          :value="item.organizationId"
        >
        </el-option>
      </el-select>
    </div>
    <div class="table_container">
      <el-table
        :data="orgMaterialList"
        stripe
        border
        :show-header="status"
        style="width: 100%"
      >
        <el-table-column
          label="材料"
          align="left"
          width="1080px"
          prop="notarizationType"
        ></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="downloadMaterial(scope.row)"
              >下载文件</el-button
            >
          </template>
        </el-table-column>
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
import {
  orgaQuery,
  downloadMaterialFile,
  notarizationMaterial,
} from "@/api/getData";
export default {
  data() {
    return {
      //解密
      status: false,
      organizationId: "",
      //MaterialId: "",
      // 表格
      orgName: [
        { organization_id: "1", organization_name: "福州公证处" },
        { organization_id: "2", organization_name: "厦门公证处" },
      ],
      orgMaterialList: [

      ],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  created() {
    this.decryptFlag = 1;
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
          organizationId: "none",
          organizationIdNameWildcard: "none",
          addressWildcard: "none",
          phoneNumberWildcard: "none",
          legalPeopleWildcard: "none",
          emailWildcard: "none",
        };
        await orgaQuery(query).then((result) => {
          if (result.status) {
            this.orgName = [];
            console.log(result);
            result.data.forEach((item) => {
              this.orgName.push(item);
            });
          } else {
            console.log("机构信息获取失败");
          }
        });
      } catch (error) {
        throw new Error(result.message);
      }
    },
    //查询申请材料
    async notarizationMaterialQuery() {
      const query = {
        organizationId: this.organizationId,
      };
      await notarizationMaterial(query).then((result) => {
        if (result.status) {
          console.log(result)
          this.orgMaterialList = [];
          result.data.forEach((item) => {
            this.orgMaterialList.push(item);
          });
        } else {
          console.log("获取材料失败");
        }
      });

    },

    downloadMaterial(row) {
      console.log(row)
      window.location.href =
        "http://localhost:8080/downloadMaterialFile?materialId=" + row.materialId;
      
    },
    // 处理导航页
    handlePageChange(val) {
      console.log(val);
      this.pageIndex = val;
      this.initData();
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
