<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <el-input
        v-model="notarization.usernameWildcard"
        placeholder="请输入申请人"
        style="width: 390px; margin-left: 3%"
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
    <el-dialog
      title="高级搜索"
      :visible.sync="searchVisible"
      style="width: 100%"
      :append-to-body="true"
    >
      <el-form label-width="25%">
        <el-form-item label="公证开始时间:">
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

        <el-form-item label="申请人:">
          <el-input
            v-model="notarization.usernameWildcard"
            placeholder="请输入申请人姓名"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="存证名称:">
          <el-input
            v-model="notarization.evidenceName"
            placeholder="请输入存证名称"
            style="width: 240px"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="公证状态:">
          <el-select
            v-model="notarization.notarizationStatus"
            placeholder="请选择"
            style="width: 240px"
            clearable
          >
            <el-option
              v-for="item in notarization_state"
              :key="item.state_value"
              :label="item.state_label"
              :value="item.state_value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="存证类型:">
          <el-select
            v-model="notarization.evidenceType"
            style="width: 240px"
            placeholder="请选择"
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

        <el-form-item label="公证类型:">
          <el-select
            v-model="notarization.notarizationType"
            placeholder="请选择"
            style="width: 240px"
            clearable
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
        <el-form-item label="公证金额:">
          <el-col :span="6">
            <el-input v-model="MoneyFloor" placeholder="最低金额" clearable>
            </el-input>
          </el-col>
          <el-col class="line" :span="1" align="middle">-</el-col>
          <el-col :span="6">
            <el-input v-model="MoneyUpper" placeholder="最高金额" clearable>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button
          @click="
            getNotarizationData();
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="right"
              inline
              class="demo-table-expand"
              label-width="160px"
            >
              <el-form-item label="文件目录:">
                <span>{{ props.row.filePath }}</span>
              </el-form-item>
              <el-form-item label="文件大小(KB):">
                <span>{{ props.row.fileSize }}</span>
              </el-form-item>
              <el-form-item label="存证编号:">
                <span>{{ props.row.evidenceId }}</span>
              </el-form-item>
              <el-form-item label="存证时间:">
                <span>{{ props.row.evidenceTime }}</span>
              </el-form-item>
              <el-form-item label="上链时间:">
                <span>{{ props.row.blockchainTime }}</span>
              </el-form-item>
              <el-form-item label="申请事项:">
                <span>{{ props.row.notarizationMatters }}</span>
              </el-form-item>
              <el-form-item label="公证金额(￥):">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
              <el-form-item label="存证区块链交易ID:">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="公证申请区块链交易ID:">
                <span>{{ props.row.notarizationBlockchainIdStart }}</span>
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
          label="申请人"
          align="center"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="公证员"
          align="center"
          prop="notaryName"
        ></el-table-column>
        <el-table-column
          label="公证机构"
          align="center"
          prop="organizationName"
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
          label="公证类型"
          align="center"
          prop="notarizationType"
        ></el-table-column>
        <el-table-column
          label="公证申请时间"
          align="center"
          width="160px"
          prop="notarizationStartTime"
        ></el-table-column>
        <el-table-column
          label="公证状态"
          align="center"
          width="140px"
          prop="notarizationStatus"
        ></el-table-column>
        <el-table-column label="文件" align="center" width="140px">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDown(scope.row)"
              >下载公证材料</el-button
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
import { notarmanageRecord, eviTypeQuery, noTypeQuery } from "@/api/getData";
import { baseUrl } from "@/config/env";
export default {
  data() {
    return {
      MoneyUpper: "",
      MoneyFloor: "",
      pageData: [], // 分页数据
      searchVisible: false,
      //时间选择器
      timeValue1: "",
      timeValue2: "",
      moneyState: "",
      // 表格
      tableData: [{}],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      // 加解密
      decrypt_flag: true,

      notarization: {
        notarizationStatus: "",
        decryptFlag: 1,
      },
      notarization_state: [
        {
          state_value: "none",
          state_label: "不限",
        },
        {
          state_value: "1",
          state_label: "等待公证",
        },
        {
          state_value: "2",
          state_label: "公证审核中",
        },
      ],
      //存证类型选择器
      evidence_type: [
        {
          evidenceTypeName: "不限",
          evidenceType: "none",
        },
      ],
      //公证类型选择器
      notarization_type: [
        {
          notarizationTypeId: "none",
          notarizationType: "不限",
        },
      ],
      payment_type: [
        {
          label: "未支付",
          value: "0",
        },
        {
          label: "已支付",
          value: "1",
        },
        {
          label: "不限",
          value: "none",
        },
      ],
      money_choose: [
        {
          label: "不限",
          value: "none",
        },
        {
          label: "小于100元",
          value: "0",
        },
        {
          label: "100~300元",
          value: "1",
        },
        {
          label: "大于300元",
          value: "2",
        },
      ],
      autManId: "",
    };
  },
  created() {
    this.getNotarizationData();
    this.getEvidenceType();
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

    // 获取数据
    async getNotarizationData() {
      try {
        if (this.MoneyFloor != "" && this.MoneyUpper != "") {
          if (isNaN(this.MoneyFloor) || isNaN(this.MoneyUpper)) {
            this.$message({
              type: "error",
              message: "交易金额必须为数字",
            });
            return;
          }
          if (this.MoneyFloor > this.MoneyUpper) {
            this.$message({
              type: "error",
              message: "最低金额需小于等于最高金额",
            });
            return;
          }
          this.notarization.notarizationMoneyFloor = this.MoneyFloor;
          this.notarization.notarizationMoneyUpper = this.MoneyUpper;
        } else {
          delete this.notarization.notarizationMoneyUpper;
          delete this.notarization.notarizationMoneyFloor;
        }
        this.dealData();
        if (this.notarization.notarizationStatus == "none") {
          this.notarization.notarizationStatus = "1";
          await notarmanageRecord(this.notarization).then((result) => {
            if (result.status) {
              this.tableData = [];
              result.data.forEach((item) => {
                if (this.notarization.decryptFlag == 0) {
                  var str = item.evidenceName.split(":");
                  item.evidenceName = str[2].substring(0, 6) + "******";
                  str = item.notarizationMoney.split(":");
                  item.notarizationMoney = str[2].substring(0, 6) + "******";
                  str = item.fileSize.split(":");
                  item.fileSize = str[2].substring(0, 6) + "******";
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
                if (item.notaryName == null) {
                  item.notaryName = "待公证人员处理";
                }
                this.tableData.push(item);
              });
              this.pageTotal = this.tableData.length;
              this.handlePageChange(1);
            } else {
              throw new Error("获取数据失败");
            }
          });
          this.notarization.notarizationStatus = "2";
          await notarmanageRecord(this.notarization).then((result) => {
            if (result.status) {
              result.data.forEach((item) => {
                if (this.notarization.decryptFlag == 0) {
                  var str = item.evidenceName.split(":");
                  item.evidenceName = str[2].substring(0, 6) + "******";
                  str = item.notarizationMoney.split(":");
                  item.notarizationMoney = str[2].substring(0, 6) + "******";
                  str = item.fileSize.split(":");
                  item.fileSize = str[2].substring(0, 6) + "******";
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
              this.handlePageChange(1);
            } else {
              throw new Error("获取数据失败");
            }
          });
          this.notarization.notarizationStatus = "none";
        } else {
          await notarmanageRecord(this.notarization).then((result) => {
            if (result.status) {
              this.tableData = [];
              result.data.forEach((item) => {
                if (this.notarization.decryptFlag == 0) {
                  var str = item.evidenceName.split(":");
                  item.evidenceName = str[2].substring(0, 6) + "******";
                  str = item.notarizationMoney.split(":");
                  item.notarizationMoney = str[2].substring(0, 6) + "******";
                  str = item.fileSize.split(":");
                  item.fileSize = str[2].substring(0, 6) + "******";
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
                if (item.notaryName == null) {
                  item.notaryName = "待公证人员处理";
                }
                this.tableData.push(item);
              });
              this.pageTotal = this.tableData.length;
              this.handlePageChange(1);
            } else {
              throw new Error("获取数据失败");
            }
          });
        }
        this.resetData();
        console.log(this.tableData);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    dealData() {
      try {
        //公证类型
        if (
          this.notarization.notarizationType == "" ||
          this.notarization.notarizationType == "不限"
        ) {
          this.notarization.notarizationType = "none";
        }
        //公证状态
        if (this.notarization.notarizationStatus == "") {
          this.notarization.notarizationStatus = "none";
        }
        //存证类型
        if (this.notarization.evidenceType == "") {
          this.notarization.evidenceType = "none";
        }
        //时间
        if (this.timeValue1 != "" && this.timeValue1 != null) {
          this.notarization.notarizationStartTimeStart =
            this.timeValue1.getTime();
        } else {
          delete this.notarization.notarizationStartTimeStart;
        }
        if (this.timeValue2 != "" && this.timeValue2 != null) {
          this.notarization.notarizationStartTimeEnd =
            this.timeValue2.getTime();
        } else {
          delete this.notarization.notarizationStartTimeEnd;
        }
        //加解密
        if (this.decrypt_flag) {
          this.notarization.decryptFlag = 1;
        } else {
          this.notarization.decryptFlag = 0;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    resetData() {
      try {
        //公证类型
        if (this.notarization.notarizationType == "none") {
          this.notarization.notarizationType = "";
        }
        //存证类型
        if (this.notarization.evidenceType == "none") {
          this.notarization.evidenceType = "";
        }
        //公证状态
        if (this.notarization.notarizationStatus == "none") {
          this.notarization.notarizationStatus = "";
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // 文件下载
    async handleDown(row) {
      window.location.href =
        baseUrl + "/downloadUserFile?evidenceId=" + row.evidenceId;
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
