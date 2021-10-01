<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <el-input
        v-model="evidence.usernameWildcard"
        placeholder="请输入用户名称"
        style="width: 390px; margin-left: 3%"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getEvidenceData()"
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
      <el-form label-width="25%">
        <el-form-item label="存证时间:">
          <el-date-picker
            v-model="timeValue1"
            type="datetime"
            placeholder="选择起始日期时间"
          ></el-date-picker>
          ~
          <el-date-picker
            v-model="timeValue2"
            type="datetime"
            placeholder="选择结束日期时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="上链时间:">
          <el-date-picker
            v-model="timeValue3"
            type="datetime"
            placeholder="选择起始日期时间"
          ></el-date-picker>
          ~
          <el-date-picker
            v-model="timeValue4"
            type="datetime"
            placeholder="选择结束日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="存证名称:">
          <el-input
            v-model="evidence.evidenceName"
            placeholder="请输入存证名称"
            style="width: 240px"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="所属用户:">
          <el-input
            v-model="evidence.usernameWildcard"
            placeholder="请输入用户名称"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="存证类型:">
          <el-select
            v-model="evidence.evidenceType"
            style="width: 240px"
            placeholder="请选择存证类型"
            clearable
          >
            <el-option
              v-for="item in evidence_type"
              :key="item.evidenceType"
              :label="item.evidenceTypeName"
              :value="item.evidenceType"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button
          @click="
            getEvidenceData();
            searchVisible = false;
          "
          type="primary"
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
          label="存证编号"
          align="center"
          prop="evidenceId"
        ></el-table-column>
        <el-table-column
          label="所属用户"
          align="center"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="存证名称"
          align="center"
          prop="evidenceName"
        ></el-table-column>
        <el-table-column
          label="存证类型"
          align="center"
          width="120px"
          prop="evidenceType"
        ></el-table-column>
        <el-table-column
          label="存证时间"
          align="center"
          width="160px"
          prop="evidenceTime"
        ></el-table-column>
        <el-table-column
          label="上链时间"
          align="center"
          width="160px"
          prop="blockchainTime"
        ></el-table-column>
        <el-table-column
          label="存证区块链交易ID"
          align="center"
          prop="evidenceBlockchainId"
        ></el-table-column>
        <el-table-column label="文件" align="center" width="140px">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDown(scope.row)"
              >下载存证材料</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
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
import { evidenceQuery, eviTypeQuery } from "@/api/getData";
export default {
  data() {
    return {
      pageData: [], // 分页数据
      searchVisible: false,
      //时间选择器
      timeValue1: "",
      timeValue2: "",
      timeValue3: "",
      timeValue4: "",
      //公证状态选择器
      notarization_state: [
        {
          state_value: "0",
          state_label: "未公证",
        },
        {
          state_value: "1",
          state_label: "等待公证",
        },
        {
          state_value: "2",
          state_label: "公证审核中",
        },
        {
          state_value: "3",
          state_label: "公证成功",
        },
        {
          state_value: "4",
          state_label: "公证失败",
        },
        {
          state_value: "none",
          state_label: "不限",
        },
      ],
      //存证类型选择器
      evidence_type: [
        {
          evidenceTypeName: "不限",
          evidenceType: "none",
        },
      ],
      evidence: {
        decryptFlag: 1,
      },
      // 是否解密
      decrypt_flag: true,
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      autManId: "",
    };
  },
  created() {
    this.getEvidenceData();
    this.getEvidenceType();
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

    //获取存证类型
    getEvidenceType() {
      eviTypeQuery().then((typeres) => {
        if (typeres.status) {
          typeres.data.forEach((item) => {
            this.evidence_type.push(item);
          });
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

    // 时间选择
    selectTime() {
      let start = this.value_time[0];
      let end = this.value_time[1];
      this.start_time = this.fmtDate(start.getTime());
      this.end_time = this.fmtDate(end.getTime());
    },

    // 获取数据
    async getEvidenceData() {
      try {
        this.dealData();
        await evidenceQuery(this.evidence).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              if (this.evidence.decryptFlag == 0) {
                var str = item.evidenceName.split(":");
                item.evidenceName = str[2].substring(0, 6) + "******";
              }
              if (item.evidenceTime != null) {
                item.evidenceTime =
                  item.evidenceTime.substring(0, 10) +
                  " " +
                  item.evidenceTime.substring(11, 19);
              }
              if (item.blockchainTime != null) {
                item.blockchainTime =
                  item.blockchainTime.substring(0, 10) +
                  " " +
                  item.blockchainTime.substring(11, 19);
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
    dealData() {
      try {
        // 存证类型
        if (this.evidence.evidenceType == "") {
          this.evidence.evidenceType = "none";
        }
        // 加解密
        if (this.decrypt_flag) {
          this.evidence.decryptFlag = 1;
        } else {
          this.evidence.decryptFlag = 0;
        }
        // 时间
        if (this.timeValue1 != "" && this.timeValue1 != null) {
          this.evidence.evidenceTimeStart = this.timeValue1.getTime();
        } else {
          delete this.evidence.evidenceTimeStart;
        }
        if (this.timeValue2 != "" && this.timeValue2 != null) {
          this.evidence.evidenceTimeEnd = this.timeValue2.getTime();
        } else {
          delete this.evidence.evidenceTimeEnd;
        }
        if (this.timeValue3 != "" && this.timeValue3 != null) {
          this.evidence.blockchainTimeStart = this.timeValue3.getTime();
        } else {
          delete this.evidence.blockchainTimeStart;
        }
        if (this.timeValue4 != "" && this.timeValue4 != null) {
          this.evidence.blockchainTimeEnd = this.timeValue4.getTime();
        } else {
          delete this.evidence.blockchainTimeEnd;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    resetData() {
      // 存证类型
      if (this.evidence.evidenceType == "none") {
        this.evidence.evidenceType = "";
      }
    },

    //时间戳转日期
    fmtDate(timestamp) {
      if (timestamp) {
        var time = new Date(timestamp);
        var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
        var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
        var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
        var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
        var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
        var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
        return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
      } else {
        return "";
      }
    },

    // 文件下载
    async handleDown(row) {
      window.location.href =
        "http://localhost:8080/downloadUserFile?evidenceId=" + row.evidenceId;
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
  width: 160px;
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
