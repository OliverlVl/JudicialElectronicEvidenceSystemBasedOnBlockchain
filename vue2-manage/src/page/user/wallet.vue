<template>
  <div class="fillcontain">
    <!--个人信息栏-->
    <head-top></head-top>
    <div class="info_container" style="margin-top: 30px">
      <p>
        余额:
        <span>
          ￥<span class="money">{{ remains }}</span>
        </span>
      </p>

      <div class="button">
        <el-button type="warning" @click="rechargeVisible = true"
          >充值</el-button
        >
        <el-button type="danger" @click="withdrawalVisible = true"
          >提现</el-button
        >
        <el-button type="success" @click="transferVisible = true"
          >转账</el-button
        >
      </div>
    </div>
    <!-- 充值 -->
    <el-dialog
      title="充值"
      :visible.sync="rechargeVisible"
      style="width: 60%; margin: 0 auto"
      :append-to-body="true"
    >
      <el-form
        ref="formData"
        :model="formData"
        label-width="100px"
        id="recharge"
      >
        <el-form-item label="充值金额">
          <el-input
            v-model="formData.transactionMoney"
            placeholder="请输入充值金额"
            style="width: 90%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="rechargeVisible = false">取 消</el-button>
        <el-button type="danger" @click="recharge()">确定支付</el-button>
      </div>
    </el-dialog>
    <!-- 提现 -->
    <el-dialog
      title="提现"
      :visible.sync="withdrawalVisible"
      style="width: 60%; margin: 0 auto"
      :append-to-body="true"
    >
      <el-form
        ref="formData"
        :model="formData"
        label-width="100px"
        id="recharge"
      >
        <el-form-item label="提现金额">
          <el-input
            v-model="formData.transactionMoney"
            placeholder="请输入提现金额"
            style="width: 90%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="withdrawalVisible = false">取 消</el-button>
        <el-button type="danger" @click="withdrawal()">确定提现</el-button>
      </div>
    </el-dialog>
    <!-- 转账 -->
    <el-dialog
      title="转账"
      :visible.sync="transferVisible"
      style="width: 60%; margin: 0 auto"
      :append-to-body="true"
    >
      <el-form
        ref="formData"
        :model="formData"
        label-width="100px"
        id="recharge"
      >
        <el-form-item label="转账对象">
          <el-input
            v-model="formData.transactionPeople"
            placeholder="请输入转账对象"
            style="width: 90%"
          ></el-input>
        </el-form-item>
        <el-form-item label="转账金额">
          <el-input
            v-model="formData.transactionMoney"
            placeholder="请输入充值金额"
            style="width: 90%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="transferVisible = false">取 消</el-button>
        <el-button type="danger" @click="transfer()">确定转账</el-button>
      </div>
    </el-dialog>

    <div class="info_container">
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="充值记录">
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
            style="margin-left: 30%"
          ></el-date-picker>
          <el-button type="primary" @click="getTransactionData()">
            搜索
          </el-button>
          <el-table :data="pageData" style="width: 100%" stripe>
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
              prop="transactionId"
            ></el-table-column>
            <el-table-column
              label="充值金额(￥)"
              align="center"
              prop="transactionMoney"
            ></el-table-column>
            <el-table-column
              label="充值时间"
              align="center"
              prop="transactionTime"
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
        </el-tab-pane>
        <el-tab-pane label="提现记录">
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
            style="margin-left: 30%"
          ></el-date-picker>
          <el-button type="primary" @click="getTransactionData()">
            搜索
          </el-button>
          <el-table :data="pageData" style="width: 100%" stripe>
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
              prop="transactionId"
            ></el-table-column>
            <el-table-column
              label="提现金额(￥)"
              align="center"
              prop="transactionMoney"
            ></el-table-column>
            <el-table-column
              label="提现时间"
              align="center"
              prop="transactionTime"
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
        </el-tab-pane>
        <el-tab-pane label="转账记录">
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
            style="margin-left: 30%"
          ></el-date-picker>
          <el-button type="primary" @click="getTransactionData()">
            搜索
          </el-button>
          <el-table :data="pageData" style="width: 100%" stripe>
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
              prop="transactionId"
            ></el-table-column>
            <el-table-column
              label="转账金额(￥)"
              prop="transactionMoney"
              align="center"
            ></el-table-column>
            <el-table-column
              label="转账时间"
              align="center"
              prop="transactionTime"
            ></el-table-column>
            <!-- <el-table-column
              label="区块链ID"
              align="center"
              prop="transactionBlockchainId"
            ></el-table-column> -->
            <el-table-column
              label="转账对象"
              align="center"
              prop="transactionPeople"
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { charge, withdraw, give, userQuery, transQuery } from "@/api/getData";
export default {
  data() {
    return {
      pageData: [],
      remains: "50",
      rechargeVisible: false,
      withdrawalVisible: false,
      transferVisible: false,
      //充值转账提现
      formData: {
        userId: sessionStorage.getItem("userId"),
        transactionMoney: "",
        transactionPeople: "",
      },

      transaction: {
        userId: sessionStorage.getItem("userId"),
        // 交易类型
        transactionType: "0",
        decryptFlag: 1,
      },

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

      // 表格
      tableData: [
        {
          transactionTime: "",
          transactionPeople: "",
        },
        {},
        {},
      ],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },

  mounted() {},
  components: {
    headTop,
  },
  created() {
    this.getTransactionData();
    this.searchInfo();
  },

  methods: {
    // 序号
    indexMethod(index) {
      // index 从 0 开始的
      return (this.pageIndex - 1) * this.pageSize + index + 1;
    },

    // 交易时间赋值
    selectTransactionTime() {
      let start = this.transactionTime[0];
      let end = this.transactionTime[1];
      this.transaction.transactionTimeStart = start.getTime();
      this.transaction.transactionTimeEnd = end.getTime();
      console.log();
    },

    //充值
    async recharge() {
      try {
        this.rechargeVisible = false;
        charge(this.formData).then((result) => {
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "充值成功",
            });
            // location.reload(); // 刷新页面
            // this.$router.go(0); // 刷新页面
            this.searchInfo();
            this.getTransactionData();
          } else {
            //失败
            this.$message({
              type: "error",
              message: "充值失败",
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    //提现
    async withdrawal() {
      try {
        this.withdrawalVisible = false;
        withdraw(this.formData).then((result) => {
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "提现成功",
            });
            this.searchInfo();
            this.getTransactionData();
          } else {
            //失败
            this.$message({
              type: "error",
              message: "提现失败",
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    //转账
    async transfer() {
      try {
        this.transferVisible = false;
        give(this.formData).then((result) => {
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "转账成功",
            });
            this.searchInfo();
            this.getTransactionData();
          } else {
            //失败
            this.$message({
              type: "error",
              message: "转账失败",
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // tab 被选中时触发
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.label == "充值记录") {
        this.transaction.transactionType = "0";
        this.getTransactionData();
      } else if (tab.label == "提现记录") {
        this.transaction.transactionType = "2";
        this.getTransactionData();
      } else if (tab.label == "转账记录") {
        this.transaction.transactionType = "1";
        this.getTransactionData();
      }
    },
    // 获取数据
    async getTransactionData() {
      try {
        // 请求数据
        await transQuery(this.transaction).then((result) => {
          console.log(this.transaction);
          if (result.status == true) {
            this.tableData = [];
            console.log(result);
            result.data.forEach((item) => {
              item.transactionTime =
                item.transactionTime.substring(0, 10) +
                " " +
                item.transactionTime.substring(11, 19);
              this.tableData.push(item);
              console.log(item);
            });
            this.pageTotal = this.tableData.length;
            this.handlePageChange(1);
          } else {
            console.log("获取交易数据失败");
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    //获取余额
    async searchInfo() {
      const query = {
        userId: sessionStorage.getItem("userId"),
        decryptFlag: 1,
      };
      console.log("获取用户数据");
      userQuery(query).then((result) => {
        if (result.status) {
          result.data.forEach((item) => {
            console.log(item);
            this.remains = item.remains;
            this.hasUsedStorage = item.hasUsedStorage;
            this.storageSpace = item.storageSpace;
          });
        }
      });
      //this.storageSpace = this.userInfo.storageSpace;
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
      this.getNotarizationData();
    },
  },

};
</script>

<style lang="less" scoped>
.info_container {
  padding: 20px;
  margin: 20px;
  border: 1px solid #dfdfdf;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
  overflow: auto;
}
.button {
  // margin: 20px;
  text-align: center;
  button {
    font-size: 20px;
    margin: 20px;
  }
}

.money {
  color: rgb(255, 0, 0);
}
p {
  text-align: center;
  font-size: 30px;
}
span {
  font-size: 30px;
}
</style>


