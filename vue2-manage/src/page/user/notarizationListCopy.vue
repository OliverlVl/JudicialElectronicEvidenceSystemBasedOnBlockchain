<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <el-input
        placeholder="请输入存证名称"
        v-model="notarization.evidenceName"
        style="margin-left: 3%; width: 390px"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getNotarizationData()"
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
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand">
              <el-form-item label="文件目录:">
                <span>{{ props.row.filePath }}</span>
              </el-form-item>
              <el-form-item label="文件大小:">
                <span>{{ props.row.fileSize }} KB</span>
              </el-form-item>
              <el-form-item label="存证时间:">
                <span>{{ props.row.evidenceTime }}</span>
              </el-form-item>
              <el-form-item label="存证区块链交易ID:">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="上链时间:">
                <span>{{ props.row.blockchainTime }}</span>
              </el-form-item>
              <el-form-item label="申请事项:">
                <span>{{ props.row.notarizationMatters }}</span>
              </el-form-item>
              <el-form-item label="公证申请区块链交易ID:">
                <span>{{ props.row.notarizationBlockchainIdStart }}</span>
              </el-form-item>
              <el-form-item label="公证完成区块链交易ID:">
                <span>{{ props.row.notarizationBlockchainIdEnd }}</span>
              </el-form-item>
              <el-form-item label="支付状态:">
                <span>{{ props.row.transactionStatus }}</span>
                <el-button
                  v-if="props.row.transactionStatus == '未支付'"
                  type="primary"
                  @click="handlePublic(props.row)"
                  >点击支付</el-button
                >
              </el-form-item>
              <el-form-item label="审核信息:">
                <span>{{ props.row.notarizationInformation }}</span>
              </el-form-item>
              <el-form-item label="公证完成时间:">
                <span>{{ props.row.notarizationEndTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="存证名称"
          align="center"
          width="140"
          prop="evidenceName"
        ></el-table-column>
        <el-table-column
          label="公证类型"
          align="center"
          width="140"
          prop="notarizationType"
        ></el-table-column>
        <el-table-column
          label="存证类型"
          align="center"
          prop="evidenceType"
        ></el-table-column>
        <el-table-column
          label="公证机构"
          align="center"
          prop="organizationName"
        ></el-table-column>
        <el-table-column
          label="公证金额"
          align="center"
          width="100"
          prop="notarizationMoney"
        ></el-table-column>
        <el-table-column
          label="公证申请时间"
          align="center"
          prop="notarizationStartTime"
        ></el-table-column>
        <el-table-column
          label="公证状态"
          align="center"
          width="120"
          prop="notarizationStatus"
        ></el-table-column>
        <el-table-column label="文件" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDown(scope.row)"
              >点击下载</el-button
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
    <el-dialog
      title="高级搜索"
      :visible.sync="searchVisible"
      style="width: 100%"
    >
      <el-form ref="notarization" :model="notarization" label-width="200px">
        <el-form-item label="存证名称">
          <el-input
            v-model="notarization.evidenceName"
            placeholder="请输入存证名称"
            style="width: 30%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="存证类型" prop="evidenceType">
          <el-select
            v-model="notarization.evidenceType"
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
        <el-form-item label="公证类型" prop="notarizationType">
          <el-select
            v-model="notarization.notarizationType"
            style="width: 30%"
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
        <el-form-item label="公证状态" prop="notarizationStatus">
          <el-select
            v-model="notarization.notarizationStatus"
            style="width: 30%"
            placeholder="请选择公证状态"
          >
            <el-option
              v-for="item in notarizationStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公证机构">
          <el-select
            v-model="notarization.organizationId"
            style="width: 30%"
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
        <el-form-item label="公证申请时间">
          <el-date-picker
            v-model="notarizationStartTime"
            type="datetimerange"
            align="left"
            unlink-panels
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="至"
            :picker-options="pickerOptions"
            @change="selectNotarizationStartTime"
            style="width: 55%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="公证完成时间">
          <el-date-picker
            v-model="notarizationEndTime"
            type="datetimerange"
            align="left"
            unlink-panels
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="至"
            :picker-options="pickerOptions"
            @change="selectNotarizationEndTime"
            style="width: 55%"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button type="primary" @click="getNotarizationData()"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 申请缴费弹窗-->
    <el-dialog title="公证缴费" :visible.sync="notarPayVisible" size="tiny">
      <p style="">
        所需公证金额为：{{ notarizationPay.notarizationMoney }}元，是否支付？
      </p>
      <div slot="footer">
        <el-button @click="notarPayVisible = false">取 消</el-button>
        <el-button type="primary" @click="notarPay()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import {
  orgaQuery,
  getEvidenceType,
  noTypeQuery,
  userNotarRecord,
  notarPay,
} from "@/api/getData";
export default {
  data() {
    return {
      searchVisible: false,
      notarPayVisible: false, //缴费

      // 搜索数据存放
      notarization: {
        userId: sessionStorage.getItem("userID"),
        evidenceName: "",
        evidenceType: "",
        notarizationType: "",
        // 支付状态
        paymentStatus: "",
        // 加解密：1 解密 0 加密
        decryptFlag: 1,
        // 公证状态
        notarizationStatus: "",
        // 公证机构
        organizationId: "",
      },
      //
      decrypt_flag: true,
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
      notarizationStartTime: "",
      notarizationEndTime: "",
      //存证类型
      evidenceType: [],
      // 公证类型
      notarizationType: [],
      // 公证状态
      notarizationStatus: [
        {
          value: "none",
          label: "不限",
        },
        {
          value: "1",
          label: "等待公证",
        },
        {
          value: "2",
          label: "公证审核中",
        },
        {
          value: "3",
          label: "公证成功",
        },
        {
          value: "4",
          label: "公证失败",
        },
      ],
      // 公证机构
      organization: [],

      // 表格
      tableData: [],

      // 公证缴费
      notarizationPay: {
        userId: sessionStorage.getItem("userId"),
        evidenceId: "",
        transactionPeople: "",
        notarizationMoney: "",
      },
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  created() {
    // 获取数据
    this.getNotarizationData();
    this.getAgent();
    this.getEvidenceType();
    this.getNotarizationType();
  },
  computed: {},
  components: {
    headTop,
  },
  methods: {
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
          if (result.status == true) {
            //成功
            result.data.forEach((item) => {
              this.organization.push(item);
            });
          } else {
            //失败
            console.log("获取公证机构列表失败");
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    //获取存证类型
    getEvidenceType() {
      try {
        getEvidenceType().then((result) => {
          if (result.status == true) {
            //成功
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

    // 获取公证类型
    async getNotarizationType() {
      try {
        noTypeQuery().then((result) => {
          result.data.forEach((item) => {
            this.notarizationType.push(item);
          });
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 公证申请时间赋值
    selectNotarizationStartTime() {
      let start = this.notarizationStartTime[0];
      let end = this.notarizationStartTime[1];
      // console.log(this.notarizationStartTime)
      this.notarization.notarizationStartTimeStart = start.getTime();
      console.log(this.notarization.notarizationStartTimeStart);
      this.notarization.notarizationStartTimeEnd = end.getTime();
      console.log(this.notarization.notarizationStartTimeEnd);
    },

    // 公证完成时间赋值
    selectNotarizationEndTime() {
      let start = this.notarizationEndTime[0];
      let end = this.notarizationEndTime[1];
      this.notarization.notarizationEndTimeStart = start.getTime();
      this.notarization.notarizationEndTimeEnd = end.getTime();
    },

    // 获取数据
    async getNotarizationData() {
      // 关闭弹窗
      this.searchVisible = false;
      this.notarization.userId = sessionStorage.getItem("userId");

      // 判断
      if (this.notarization.evidenceName == "") {
        this.notarization.evidenceName = "none";
      }
      if (this.notarization.evidenceType == "") {
        this.notarization.evidenceType = "none";
      }
      if (this.notarization.notarizationType == "") {
        this.notarization.notarizationType = "none";
      }
      if (this.notarization.notarizationStatus == "") {
        this.notarization.notarizationStatus = "none";
      }
      if (this.notarization.organizationId == "") {
        this.notarization.organizationId = "none";
      }
      if (this.notarization.paymentStatus == "") {
        this.notarization.paymentStatus = "none";
      }
      if (this.decrypt_flag) {
        this.notarization.decryptFlag = 1;
      } else {
        this.notarization.decryptFlag = 0;
      }

      // 请求数据
      try {
        console.log("传递参数:");
        console.log(this.notarization);
        await userNotarRecord(this.notarization).then((result) => {
          if (result.status == true) {
            this.tableData = [];
            console.log(result.data);
            result.data.forEach((item) => {
              if (this.notarization.decryptFlag == 0) {
                item.evidenceName = "*********";
                item.notarizationMoney = "*********";
                item.fileSize = "*********";
              }
              if (item.notarizationBlockchainIdStart == null) {
                item.notarizationBlockchainIdStart = "暂无数据";
              }
              if (item.notarizationBlockchainIdEnd == null) {
                item.notarizationBlockchainIdEnd = "暂无数据";
              }
              if (item.notarizationInformation == null) {
                item.notarizationInformation = "暂无数据";
              }
              if (item.notarizationEndTime == null) {
                item.notarizationEndTime = "暂无数据";
              } else {
                item.notarizationEndTime =
                  item.notarizationEndTime.substring(0, 10) +
                  " " +
                  item.notarizationEndTime.substring(11, 19);
              }

              if (item.transactionStatus == "未支付") {
                item.notarizationStatus = "未支付";
              }

              if (item.notarizationStartTime != null) {
                item.notarizationStartTime =
                  item.notarizationStartTime.substring(0, 10) +
                  " " +
                  item.notarizationStartTime.substring(11, 19);
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
          } else {
            console.log("获取数据失败:");
            console.log(result);
          }
        });
      } catch (error) {
        console.log(error.message);
      }
      this.notarization.evidenceName = "";
      this.notarization.evidenceType = "";
      this.notarization.notarizationType = "";
      this.notarization.decryptFlag = 1;
      this.notarization.notarizationStatus = "";
      this.notarization.organizationId = "";
    },

    // 公证缴费时先调用这个函数处理数据
    async handlePublic(row) {
      this.notarPayVisible = true;
      this.notarizationPay.evidenceId = row.evidenceId;
      this.notarizationPay.transactionPeople = row.organizationId; // 收款方 公证机构
      this.notarizationPay.notarizationMoney = row.notarizationMoney;
    },

    // 公证缴费
    async notarPay() {
      try {
        notarPay(this.notarizationPay).then((result) => {
          console.log(result);
          if (result.status == true) {
            //成功
            this.notarPayVisible = false;
            this.$message({
              type: "success",
              message: "缴费成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "缴费失败!",
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 文件下载
    async handleDown(row) {
      window.location.href =
        "http://localhost:8080/downloadUserFile?evidenceId=" + row.evidenceId;
    },

    // 处理导航页
    handlePageChange(val) {
      console.log(val);
      this.pageIndex = val;
      // this.initData();
    },
  },

  watch: {
    $route() {
      this.getNotarizationData();
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
