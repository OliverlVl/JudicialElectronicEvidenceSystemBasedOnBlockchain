<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- 头部查询-->
    <div class="search_container top-div-set">
      <el-input
        placeholder="请输入存证名称"
        v-model="evidence.evidenceName"
        style="margin-left: 3%; width: 390px"
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
    <!-- 记录列表-->
    <div class="table_container">
      <el-table
        v-loading="loading"
        element-loading-text="公证申请上链"
        element-loading-spinner="el-icon-loading"
        :data="pageData"
        style="width: 100%"
        stripe
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand">
              <el-form-item label="文件目录:">
                <span>{{ props.row.filePath }}</span>
              </el-form-item>
              <el-form-item label="文件大小(KB):">
                <span>{{ props.row.fileSize }}</span>
              </el-form-item>
              <el-form-item label="存证区块链交易ID:">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="上链时间:">
                <span>{{ props.row.blockchainTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
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
          width="300px"
          prop="evidenceId"
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
          prop="evidenceTime"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="220px">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handlePublic(scope.row)"
              >申请公证</el-button
            >
            <el-button size="small" type="danger" @click="handleDown(scope.row)"
              >下载文件</el-button
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
    <!-- 申请公证弹窗-->
    <el-dialog
      title="公证申请"
      :visible.sync="dialogVisible_notarization"
      size="tiny"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form ref="notarization" :model="notarization" label-width="30%">
        <el-form-item label="公证类型">
          <el-select
            v-model="notarization.notarizationType"
            style="width: 50%"
            placeholder="请选择公证类型"
          >
            <el-option
              v-for="item in notarizationType"
              :key="item.notarizationTypeId"
              :label="item.notarizationType"
              :value="item.notarizationType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公证机构">
          <el-select
            v-model="notarization.organizationId"
            style="width: 50%"
            placeholder="请选择公证机构"
          >
            <el-option
              v-for="item in organization"
              :key="item.organizationId"
              :label="item.organizationName"
              :value="item.organizationId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请事项">
          <el-input
            placeholder="请输入申请事项描述"
            v-model="notarization.notarizationMatters"
            style="width: 50%"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_notarization = false">取 消</el-button>
        <el-button type="primary" @click="notarReq()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 申请缴费弹窗-->
    <el-dialog
      title="公证缴费"
      :visible.sync="notarPayVisible"
      size="tiny"
      :append-to-body="true"
    >
      <p style="">
        所需公证金额为：{{ notarization.notarizationMoney }}元，是否支付？
      </p>
      <div slot="footer">
        <el-button @click="notarPayCancel()">取 消</el-button>
        <el-button type="primary" @click="notarPay()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 高级搜索弹窗-->
    <el-dialog
      title="高级搜索"
      :visible.sync="searchVisible"
      style="width: 100%"
      :append-to-body="true"
    >
      <el-form ref="evidence" :model="evidence" label-width="25%">
        <el-form-item label="存证名称">
          <el-input
            v-model="evidence.evidenceName"
            placeholder="请输入存证名称"
            style="width: 30%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="存证类型" prop="evidenceType">
          <el-select
            v-model="evidence.evidenceType"
            style="width: 30%"
            placeholder="请选择存证类型"
          >
            <el-option
              v-for="item in evidenceType"
              :key="item.evidenceType"
              :label="item.evidenceTypeName"
              :value="item.evidenceType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存证时间">
          <el-date-picker
            v-model="evidenceTime"
            type="datetimerange"
            align="left"
            unlink-panels
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="至"
            :picker-options="pickerOptions"
            @change="selectEvidenceTime"
            style="width: 55%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上链时间">
          <el-date-picker
            v-model="blockchainTime"
            type="datetimerange"
            align="left"
            unlink-panels
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="至"
            :picker-options="pickerOptions"
            @change="selectBlockchainTime"
            style="width: 55%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button type="primary" @click="getEvidenceData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { baseUrl } from "@/config/env";
import {
  getEvidenceType,
  orgaQuery,
  noTypeQuery,
  notarReq,
  notarPay,
  userEvidenceQuery,
  downloadUserFile,
} from "@/api/getData";
export default {
  data() {
    return {
      loading: false,
      pageData: [],
      searchVisible: false,
      notarPayVisible: false,
      decrypt_flag: true,
      evidence: {
        evidenceId: "none",
        userId: sessionStorage.getItem("userId"),
        usernameWildcard: "none",
        fileSizeFloor: -1,
        fileSizeUpper: -1,
        evidenceName: "",
        evidenceType: "",
        evidenceTimeStart: "none",
        evidenceTimeEnd: "none",
        blockchainTimeStart: "none",
        blockchainTimeEnd: "none",
        notarizationStatus: "0",
        evidenceBlockchainId: "none",
        decryptFlag: 1,
      },
      // 存证类型
      evidenceType: [],

      //时间选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      evidenceTime: "",
      blockchainTime: "",

      // 申请公证数据
      notarization: {
        userId: sessionStorage.getItem("userId"),
        //userId: "1",
        evidenceId: "",
        notarizationType: "",
        organizationId: "",
        notarizationMoney: "",
        notarizationMatters: "",
        transactionPeople: "",
      },

      // 公证机构
      organization: [],

      // 公证类型
      notarizationType: [],

      // 复合搜索框
      input_search: "",
      select: "",
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,

      // 公证申请弹窗
      dialogVisible_notarization: false,
      value_apply: "",
      options_apply: "",
      param_notarization: {
        id: "",
        notarization_id: "",
        notarization_status: 2,
        agent: "",
      },
      value_notarization: "",
      options_notarization: [],
      form: {},
    };
  },
  created() {
    this.getEvidenceData();
    this.getNotarizationType();
    this.getAgent();
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
      try {
        getEvidenceType().then((result) => {
          if (result.status == true) {
            //成功
            console.log(result.data);
            result.data.forEach((item) => {
              this.evidenceType.push(item);
            });
          } else {
            //失败
            console.log("获取失败");
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 获取公证机构列表
    async getAgent() {
      try {
        const query = {
          organizationId: "none",
          organizationIdNameWildcard: "none",
          addressWildcard: "none",
          phoneNumberWildcard: "none",
          legalPeopleWildcard: "none",
          emailWildcard: "none",
        };
        orgaQuery(query).then((result) => {
          console.log("获取公证机构状态：" + result.status);
          if (result.status == true) {
            //成功
            console.log(result.data);
            result.data.forEach((item) => {
              this.organization.push(item);
            });
          } else {
            //失败
            console.log(result.message + "获取公证机构列表失败");
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
          console.log("获取公证类型");
          console.log(result);
          result.data.forEach((item) => {
            this.notarizationType.push(item);
            console.log(item);
          });
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 申请公证按钮
    async handlePublic(row) {
      this.dialogVisible_notarization = true;
      this.notarization.evidenceId = row.evidenceId;
    },

    // 发送公证请求
    async notarReq() {
      try {
        notarReq(this.notarization).then((result) => {
          console.log(result);
          if (result.status == true) {
            //成功
            console.log(result.notarizationMoney);
            //缴费
            this.notarization.notarizationMoney = result.notarizationMoney;
            // this.$message({
            //   type: "success",
            //   message: "请缴费",
            // });

            //
            this.dialogVisible_notarization = false;
            this.getEvidenceData();
            //
            this.notarPayVisible = true;
          } else {
            //失败
            alert("公证申请失败,请补全所有信息");
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 公证缴费
    async notarPay() {
      try {
        this.notarization.transactionPeople = this.notarization.organizationId;
        this.notarPayVisible = false;
        this.loading = true;
        this.$message({
          type: "info",
          message: "公证申请及缴费信息上链中，请耐心等待!",
        });
        notarPay(this.notarization).then((result) => {
          console.log(result);
          this.loading = false;
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "公证申请成功！可在公证列表中查看具体信息",
            });
          } else {
            if (result.message == "余额不足，无法进行公证缴费") {
              this.$message({
                type: "error",
                message: "余额不足，请先充值!",
              });
            } else {
              this.$message({
                type: "error",
                message: "公证申请失败!",
              });
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    notarPayCancel() {
      this.notarPayVisible = false;
      this.$message({
        type: "error",
        message: "公证失败",
      });
    },

    // 文件下载
    async handleDown(row) {
      this.$message({
        type: "info",
        message: "文件下载中，请耐心等待！",
      });

      window.location.href =
        baseUrl + "/downloadUserFile?evidenceId=" + row.evidenceId;
    },

    // 存证时间赋值
    selectEvidenceTime() {
      let start = this.evidenceTime[0];
      let end = this.evidenceTime[1];
      this.evidence.evidenceTimeStart = start.getTime();
      this.evidence.evidenceTimeEnd = end.getTime();
      // console.log(start.getTime());
      // this.start_time = this.fmtDate(start.getTime());
      // this.end_time = this.fmtDate(end.getTime());
    },

    // 上链时间赋值
    selectBlockchainTime() {
      let start = this.blockchainTime[0];
      let end = this.blockchainTime[1];
      this.evidence.blockchainTimeStart = start.getTime();
      this.evidence.blockchainTimeEnd = end.getTime();
    },

    // 搜索
    async getEvidenceData() {
      if (this.decrypt_flag) {
        this.evidence.decryptFlag = 1;
      } else {
        this.evidence.decryptFlag = 0;
      }
      this.searchVisible = false;
      console.log(this.evidence.userId);
      //判断
      if (this.evidence.evidenceName == "") {
        // 为空时后端所需的参数
        this.evidence.evidenceName = "none";
      }
      if (this.evidence.evidenceType == "") {
        // 为空时后端所需的参数
        this.evidence.evidenceType = "none";
      }
      // 请求数据
      try {
        console.log("请求数据");
        console.log(this.evidence);
        userEvidenceQuery(this.evidence).then((result) => {
          console.log(result);
          if (result.status == true) {
            this.tableData = [];
            result.data.forEach((item) => {
              if (this.evidence.decryptFlag == 0) {
                var str = item.evidenceName.split(":");
                item.evidenceName = str[2].substring(0, 6) + "******";
                str = item.fileSize.split(":");
                item.fileSize = str[2].substring(0, 6) + "******";
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
            console.log("获取数据失败");
          }
        });
      } catch (error) {
        throw new Error(error.message);
      }
      this.evidence.evidenceName = "";
      this.evidence.evidenceType = "";
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

    //关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  watch: {
    $route() {
      this.getEvidenceData();
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.search_container {
  padding: 20px;
}
// .el-select .el-input {
//   width: 130px;
// }
// .input-with-select .el-input-group__prepend {
//   background-color: #fff;
// }
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
