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
        <el-button type="danger" @click="withdrawalVisibel = true"
          >提现</el-button
        >
        <el-button type="success" @click="transferVisibel = true"
          >转账</el-button
        >
      </div>
    </div>
    <!-- 充值 -->
    <el-dialog
      title="充值"
      :visible.sync="rechargeVisible"
      style="width: 60%; margin: 0 auto"
    >
      <el-form
        ref="formData"
        :model="formData"
        label-width="200px"
        id="recharge"
      >
        <el-form-item label="充值金额">
          <el-input
            v-model="formData.transactionMoney"
            placeholder="请输入充值金额"
            style="width: 50%"
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
      :visible.sync="withdrawalVisibel"
      style="width: 60%; margin: 0 auto"
    >
      <el-form
        ref="formData"
        :model="formData"
        label-width="200px"
        id="recharge"
      >
        <el-form-item label="提现金额">
          <el-input
            v-model="formData.transactionMoney"
            placeholder="请输入提现金额"
            style="width: 50%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="withdrawalVisibel = false">取 消</el-button>
        <el-button type="danger" @click="withdrawal()">确定提现</el-button>
      </div>
    </el-dialog>
    <!-- 转账 -->
    <el-dialog
      title="转账"
      :visible.sync="transferVisibel"
      style="width: 60%; margin: 0 auto"
    >
      <el-form
        ref="formData"
        :model="formData"
        label-width="200px"
        id="recharge"
      >
        <el-form-item label="转账对象">
          <el-input
            v-model="formData.transactionPeople"
            placeholder="请输入转账对象"
            style="width: 50%"
          ></el-input>
        </el-form-item>
        <el-form-item label="转账金额">
          <el-input
            v-model="formData.transactionMoney"
            placeholder="请输入充值金额"
            style="width: 50%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="transferVisibel = false">取 消</el-button>
        <el-button type="danger" @click="transfer()">确定转账</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import {
  charge,
  withdraw,
  give,
} from "@/api/getData";
export default {
  data() {
    return {
      remains: "50",
      rechargeVisible: false,
      withdrawalVisibel: false,
      transferVisibel: false,
      formData: {
        userId: sessionStorage.getItem("userId"),
        transactionMoney: "",
        transactionPeople: "",
      },
    };
  },

  mounted() {},
  components: {
    headTop,
  },

  methods: {
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
        this.withdrawalVisibel = false;
        withdraw(this.formData).then((result) => {
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "转账成功",
            });
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

    //转账
    async transfer() {
      try {
        this.transferVisibel = false;
        give(this.formData).then((result) => {
          if (result.status == true) {
            //成功
            this.$message({
              type: "success",
              message: "转账成功",
            });
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


