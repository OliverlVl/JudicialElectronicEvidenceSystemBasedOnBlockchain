<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set" style="font-size: 0px">
      <el-select
        v-model="transaction.transactionType"
        style="margin-left: 3%; width: 390px"
        placeholder="请选择交易类型"
        clearable
      >
        <el-option
          v-for="item in transactionType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="getTransactionData()"
      ></el-button>
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
      <el-table
        :data="pageData"
        style="width: 100%"
        stripe
      >
        <el-table-column
          type="index"
          label="序号"
          :index="indexMethod"
          width="60px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="交易编号"
          align="center"
          width="150px"
          prop="transactionId"
        ></el-table-column>
        <el-table-column
          label="交易金额(￥)"
          align="center"
          width="120px"
          prop="transactionMoney"
        ></el-table-column>
        <el-table-column
          label="交易类型"
          align="center"
          width="140px"
          prop="transactionType"
        ></el-table-column>
        <el-table-column
          label="交易时间"
          align="center"
          width="160px"
          prop="transactionTime"
        ></el-table-column>
        <el-table-column
          label="上链时间:"
          align="center"
          width="160px"
          prop="blockchainTime"
        ></el-table-column>
        <el-table-column
          label="区块链ID"
          align="center"
          prop="transactionBlockchainId"
        ></el-table-column>
        <el-table-column
          label="交易对象"
          align="center"
          prop="transactionPeople"
        ></el-table-column>
        <el-table-column
          label="购买存储空间大小(GB)"
          align="center"
          width="170px"
          prop="storageSize"
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
        <span style="float: right">注："/"表示没有数据</span>
      </div>
    </div>
    <el-dialog
      title="高级搜索"
      :visible.sync="searchVisible"
      style="width: 100%"
      :append-to-body="true"
    >
      <el-form ref="transaction" :model="transaction" label-width="25%">
        <el-form-item label="交易类型">
          <el-select
            v-model="transaction.transactionType"
            style="width: 37.5%"
            placeholder="请选择交易类型"
            clearable
          >
            <el-option
              v-for="item in transactionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易金额">
          <el-col :span="6">
            <el-input
              v-model="transactionMoneyFloor"
              placeholder="最低金额"
              clearable
            >
            </el-input>
          </el-col>
          <el-col class="line" :span="1" align="middle">-</el-col>
          <el-col :span="6">
            <el-input
              v-model="transactionMoneyUpper"
              placeholder="最高金额"
              clearable
            >
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="交易时间">
          <el-date-picker
            v-model="transactionTime"
            type="datetimerange"
            align="left"
            unlink-panels
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="至"
            :picker-options="pickerOptions"
            @change="selectTransactionTime"
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
        <el-button type="primary" @click="getTransactionData()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { transQuery } from "@/api/getData";
export default {
  data() {
    return {
      pageData: [],
      searchVisible: false,
      transaction: {
        userId: sessionStorage.getItem("userId"),
        decryptFlag: 1,
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
      transactionTime: "",
      blockchainTime: "",
      transactionMoneyFloor: "",
      transactionMoneyUpper: "",

      // 交易类型
      transactionType: [
        {
          value: "none",
          label: "不限",
        },
        {
          value: "0",
          label: "充值",
        },
        {
          value: "1",
          label: "转账",
        },
        {
          value: "2",
          label: "提现",
        },
        {
          value: "3",
          label: "购买存储空间",
        },
        {
          value: "4",
          label: "申请司法公证",
        },
      ],

      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  created() {
    // 获取数据
    this.getTransactionData();
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

    // 交易时间赋值
    selectTransactionTime() {
      if (this.transactionTime != null) {
        let start = this.transactionTime[0];
        let end = this.transactionTime[1];
        this.transaction.transactionTimeStart = start.getTime();
        this.transaction.transactionTimeEnd = end.getTime();
      } else {
        delete this.transaction.transactionTimeStart;
        delete this.transaction.transactionTimeEnd;
      }
    },

    // 上链时间赋值
    selectBlockchainTime() {
      if (this.blockchainTime != null) {
        let start = this.blockchainTime[0];
        let end = this.blockchainTime[1];
        this.transaction.blockchainTimeStart = start.getTime();
        this.transaction.blockchainTimeEnd = end.getTime();
      } else {
        delete this.transaction.blockchainTimeStart;
        delete this.transaction.blockchainTimeEnd;
      }
    },

    dealData() {
      // 交易类型
      if (this.transaction.transactionType == "") {
        this.transaction.transactionType = "none";
      }
      // 加解密
      if (this.decrypt_flag) {
        this.transaction.decryptFlag = 1;
      } else {
        this.transaction.decryptFlag = 0;
      }
    },
    resetData() {
      if (this.transaction.transactionType == "none") {
        this.transaction.transactionType == "";
      }
    },

    // 获取数据
    async getTransactionData() {
      try {
        this.dealData();
        // 关闭弹窗
        this.searchVisible = false;
        if (
          this.transactionMoneyFloor != "" &&
          this.transactionMoneyUpper != ""
        ) {
          if (
            isNaN(this.transactionMoneyFloor) ||
            isNaN(this.transactionMoneyUpper)
          ) {
            this.$message({
              type: "error",
              message: "交易金额必须为数字",
            });
            return;
          }
          if (
            parseInt(this.transactionMoneyFloor) >
            parseInt(this.transactionMoneyUpper)
          ) {
            this.$message({
              type: "error",
              message: "最低金额需小于等于最高金额",
            });
            return;
          }
          this.transaction.transactionMoneyFloor = this.transactionMoneyFloor;
          this.transaction.transactionMoneyUpper = this.transactionMoneyUpper;
        }
        // 请求数据
        await transQuery(this.transaction).then((result) => {
          if (result.status == true) {
            this.tableData = [];
            result.data.forEach((item) => {
              if (this.transaction.decryptFlag == 0) {
                var str = item.transactionMoney.split(":");
                item.transactionMoney = str[2].substring(0, 6) + "******";
                if (item.transactionPeople != null) {
                  str = item.transactionPeople.split(":");
                  item.transactionPeople = str[2].substring(0, 6) + "******";
                } else {
                  item.transactionPeople = "/";
                }
                if (item.storageSize != null) {
                  console.log("金额" + item.storageSize);
                  str = item.storageSize.split(":");
                  item.storageSize = str[2].substring(0, 6) + "******";
                } else {
                  item.storageSize = "/";
                }
              } else {
                if (item.storageSize == null) {
                  item.storageSize = "/";
                } else {
                  item.storageSize = item.storageSize / 1024 / 1024;
                }
              }
              if (item.blockchainTime == null) {
                item.blockchainTime = "/";
              }
              if (item.blockchainTime != null) {
                item.blockchainTime =
                  item.blockchainTime.substring(0, 10) +
                  " " +
                  item.blockchainTime.substring(11, 19);
              }
              if (item.transactionBlockchainId == null) {
                item.transactionBlockchainId = "/";
              }

              if (item.transactionPeople == null) {
                item.transactionPeople = "/";
              }
              if (item.transactionTime != null) {
                item.transactionTime =
                  item.transactionTime.substring(0, 10) +
                  " " +
                  item.transactionTime.substring(11, 19);
              } else {
                item.transactionTime = "暂无数据";
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
      this.resetData();
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
  },
  watch: {
    $route() {
      this.getTransactionData();
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
