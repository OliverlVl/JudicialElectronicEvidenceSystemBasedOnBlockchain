<template>
  <div class="fillcontain">
    <!--个人信息栏-->
    <head-top></head-top>
    <div class="info_container" style="margin-top: 30px">
      <span style="text-align: center; display: block; font-size: 25px"
        >总容量：{{ storageSpace }}G</span
      >
      <span
        >已使用：{{ hasUsedStorage }}G/{{ storageSpace }}G ({{
          ((hasUsedStorage / storageSpace) * 100) | numFilter
        }}%)</span
      >
      <el-progress
        style="margin-top: 10px"
        :text-inside="true"
        :stroke-width="24"
        :percentage="((hasUsedStorage / storageSpace) * 100) | numFilter"
        :color="customColorMethod"
        status="success"
      ></el-progress>
      <span style="margin-top: 10px; text-align: right; display: block"
        >注：1T=1024G</span
      >
      <!-- <el-button
        style="display: block; margin: 0 auto"
        type="primary"
        @click="memory()"
        >扩充存储空间</el-button
      > -->

      <span style="text-align: center; display: block; font-size: 25px"
        >---马上扩充存储容量---</span
      >
      <el-row class="info_row" :gutter="10">
        <el-col :span="6">
          <div class="area">
            <p class="title">200GB</p>
            <P class="unit">
              <span class="money">99</span>
              元/年</P
            >
            <el-button
              round
              @click="
                memoryVisible = true;
                formData.package = '200';
              "
            >
              立即购买
            </el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="area">
            <p class="title">1TB</p>
            <P class="unit">
              <span class="money">199</span>
              元/年</P
            >
            <el-button
              round
              @click="
                memoryVisible = true;
                formData.package = '1024';
              "
            >
              立即购买
            </el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="area">
            <p class="title">2TB</p>
            <P class="unit">
              <span class="money">249</span>
              元/年</P
            >
            <el-button
              round
              @click="
                memoryVisible = true;
                formData.package = '2048';
              "
            >
              立即购买
            </el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="area">
            <p class="title">5TB</p>
            <P class="unit">
              <span class="money">298</span>
              元/年</P
            >
            <el-button
              round
              @click="
                memoryVisible = true;
                formData.package = '5120';
              "
            >
              立即购买
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="容量套餐"
      :visible.sync="memoryVisible"
      style="width: 100%"
      :append-to-body="true"
    >
      <el-form ref="formData" :model="formData" label-width="25%">
        <el-form-item label="容量套餐:">
          <el-radio-group v-model="formData.package" size="medium">
            <el-radio border label="200"
              >200GB套餐&nbsp;&nbsp;&nbsp;<span class="money">99</span
              >元/年</el-radio
            >
            <el-radio border label="1024"
              >1TB套餐&ensp;&ensp;&nbsp;&nbsp;<span class="money">199</span
              >元/年</el-radio
            >
            <br />
            <el-radio border label="2048"
              >2TB套餐&ensp;&ensp;&nbsp;&nbsp;<span class="money">249</span
              >元/年</el-radio
            >
            <el-radio border label="5120"
              >5TB套餐&ensp;&ensp;&nbsp;&nbsp;<span class="money">298</span
              >元/年</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付金额:">
          <span class="money" style="font-size: 150%">{{
            transaction.transactionMoney
          }}</span
          >元
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="memoryPay()"> 确定支付 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { memPay, userQuery } from "@/api/getData";

export default {
  data() {
    return {
      storageSpace: "",
      hasUsedStorage: "",
      memoryVisible: false,

      formData: {
        // 套餐
        package: '',
      },

      transaction:{
        userId: sessionStorage.getItem("userId"),
        // 金额
        transactionMoney: -1,
        // 大小
        storageSize: -1,
      },
      userInfo: {},
    };
  },

  //监听 formData.package 字段 ，改变时执行函数
  watch: {
    $route() {
      this.searchInfo();
    },
    "formData.package": {
      handler: function () {
        switch (this.formData.package) {
          case "200":
            this.transaction.transactionMoney = 99;
            this.transaction.storageSize = 200 * 1024 * 1024;
            break;
          case "1024":
            this.transaction.transactionMoney = 199;
            this.transaction.storageSize = 1024 * 1024 * 1024;
            break;
          case "2048":
            this.transaction.transactionMoney = 249;
            this.transaction.storageSize = 2048 * 1024 * 1024;
            break;
          case "5120":
            this.transaction.transactionMoney = 298;
            this.transaction.storageSize = 5120 * 1024 * 1024;
        }
      },
    },
  },
  created() {
    this.searchInfo();
  },
  mounted() {},
  components: {
    headTop,
  },

  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    },
  },

  methods: {
    // 进度条颜色控制
    customColorMethod(percentage) {
      if (percentage < 50) {
        return "#67c23a";
      } else if (percentage < 80) {
        return "#e6a23c";
      } else {
        return "#ff0000";
      }
    },
    // 购买容量
    async memoryPay() {
      try {
        this.memoryVisible = false;
        console.log(this.transaction);
        memPay(this.transaction).then((result) => {
          console.log(result);
          if (result.status) {
            //成功
            this.$message({
              type: "success",
              message: "套餐购买成功",
            });
            this.searchInfo();
          } else {
            //失败
            this.$message({
              type: "error",
              message: "套餐购买失败",
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async searchInfo() {
      const query = {
        userId: sessionStorage.getItem("userId"),
        decryptFlag: 1,
      };
      userQuery(query).then((result) => {
        if (result.status) {
          result.data.forEach((item) => {
            console.log(item);
            this.userInfo.remains = item.remains;
            this.hasUsedStorage = item.hasUsedStorage / 1024 / 1024;
            this.storageSpace = item.storageSpace / 1024 / 1024;
          });
        }
        console.log(this.userInfo);
      });
      //this.storageSpace = this.userInfo.storageSpace;
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
.row {
  margin: 20px;
}
.info_row {
  .area {
    border: 1px solid #dfdfdf;
    height: 200px;
    margin: 20px 10px;
    overflow: hidden;
    box-shadow: #dfdfdf 0px 0px 10px 5px;
    .title {
      font-size: 200%;
      text-align: center;
      padding: 20px;
    }
    .unit {
      font-size: 100%;
      text-align: center;
      margin-bottom: 20px;
      .money {
        color: rgb(216, 152, 13);
        font-size: 150%;
      }
    }
    button {
      color: rgb(216, 152, 13);
      border-color: rgb(216, 152, 13);

      display: block;
      margin: 0 auto;
    }
  }
}
.money {
  color: rgb(255, 0, 0);
}
</style>


