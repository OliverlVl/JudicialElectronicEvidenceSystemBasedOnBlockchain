<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <label>请选择公证机构:&emsp;</label>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in orgName"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- <el-button
        type="primary"
        @click="searchVisible = true"
        style="margin-left: 18px"
        >高级搜索
      </el-button> -->
      <!--<el-button @click="tryy()">尝试</el-button>-->
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        stripe
        border
        :show-header="status"
        style="width: 100%"
      >
        <el-table-column
          label="材料"
          align="left"
          width="1080px"
          prop="fileName"
        ></el-table-column>

        <el-table-column label="操作" align="center">
          <el-button type="primary" size="small">下载文件 </el-button>
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
  notarRecord,
  eviTypeQuery,
  noTypeQuery,
  notarmanageRecord,
} from "@/api/getData";
export default {
  data() {
    return {
      //解密
      status: false,
      // 表格
      tableData: [
        {
          fileName: "出生证公证",
        },
        {
          fileName: "房产证公证",
        },
        {
          fileName: "法人委托书公证",
        },
        {
          fileName: "寄养保证书公证",
        },
        {
          fileName: "生存公证",
        },
      ],
      orgName: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      //公证员ID
      notary_id: "",
      searchQuery: {
        usernameWildcard: "",
        evidenceNameWildcard: "",
        notarizationStatus: "3",
        notarizationType: "",
        paymentStatus: "",
        evidenceType: "",
        decryptFlag: 1,
        notarizationMoneyUpper: -1,
        notarizationMoneyFloor: -1,
      },
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
          notarizationTypeName: "不限",
          notarizationType: "none",
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
      ],
      money_choose: [
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
        {
          label: "不限",
          value: "none",
        },
      ],
      notarization_status: [
        {
          label: "审核通过",
          value: "3",
        },
        {
          label: "审核不通过",
          value: "4",
        },
      ],
    };
  },
  created() {
    this.notary_id = localStorage.getItem("notaryId");
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
        if (this.decrypt_flag) {
          this.decryptFlag = 1;
        } else {
          this.decryptFlag = 0;
        }
        const query = {
          decryptFlag: this.decryptFlag,
          notaryId: this.notary_id,
          dealType: "2",
        };
        await notarRecord(query).then((result) => {
          if (result.status == true) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
          } else {
            console.log("获取数据失败");
          }
        });
        //获取存证类型
        await eviTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.evidence_type.push(item);
            });
          } else {
            console.log("存证类型获取失败");
          }
        });
        //获取公证类型
        await noTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.notarization_type.push(item);
            });
          } else {
            console.log("公证类型获取失败");
          }
        });
      } catch (error) {
        throw new Error(result.message);
      }
    },
    // 处理导航页
    handlePageChange(val) {
      console.log(val);
      this.pageIndex = val;
      this.initData();
    },
    // 搜索
    async handleSearch() {
      try {
        this.dealData();
        if (this.searchQuery.notarizationStatus == "none") {
          this.searchQuery.notarizationStatus = "3";
          await notarmanageRecord(this.searchQuery).then((result) => {
            if (result.status) {
              this.tableData = [];
              result.data.forEach((item) => {
                this.tableData.push(item);
              });
            } else {
              throw new Error("获取数据失败");
            }
          });
          this.searchQuery.notarizationStatus = "4";
          await notarmanageRecord(this.searchQuery).then((result) => {
            if (result.status) {
              result.data.forEach((item) => {
                this.tableData.push(item);
              });
              this.pageTotal = this.tableData.length;
            } else {
              throw new Error("获取数据失败");
            }
          });
          this.searchQuery.notarizationStatus = "none";
        } else {
          await notarmanageRecord(this.searchQuery).then((result) => {
            if (result.status) {
              this.tableData = [];
              result.data.forEach((item) => {
                this.tableData.push(item);
              });
              this.pageTotal = this.tableData.length;
            } else {
              throw new Error("获取数据失败");
            }
          });
        }
        this.resetData();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    dealData() {
      try {
        //用户名
        if (this.searchQuery.usernameWildcard == "") {
          this.searchQuery.usernameWildcard = "none";
        }
        //存证名称
        if (this.searchQuery.evidenceNameWildcard == "") {
          this.searchQuery.evidenceNameWildcard = "none";
        }
        //公证类型
        if (this.searchQuery.notarizationType == "") {
          this.searchQuery.notarizationType = "none";
        }
        //支付状态
        if (this.searchQuery.paymentStatus == "") {
          this.searchQuery.paymentStatus = "none";
        }
        //存证类型
        if (this.searchQuery.evidenceType == "") {
          this.searchQuery.evidenceType = "none";
        }
        //公证状态
        if (this.searchQuery.notarizationStatus == "") {
          this.searchQuery.notarizationStatus = "none";
        }
        //公证金额
        if (this.moneyState == "0") {
          this.searchQuery.notarizationMoneyUpper = 100;
          this.searchQuery.notarizationMoneyFloor = -1;
        } else if (this.moneyState == "1") {
          this.searchQuery.notarizationMoneyUpper = 300;
          this.searchQuery.notarizationMoneyFloor = 100;
        } else if (this.moneyState == "2") {
          this.searchQuery.notarizationMoneyUpper = -1;
          this.searchQuery.notarizationMoneyFloor = 300;
        } else {
          this.searchQuery.notarizationMoneyUpper = -1;
          this.searchQuery.notarizationMoneyFloor = -1;
        }
        //加解密
        if (this.decrypt_flag) {
          this.searchQuery.decryptFlag = 1;
        } else {
          this.searchQuery.decryptFlag = 0;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    resetData() {
      try {
        //用户名
        if (this.searchQuery.usernameWildcard == "none") {
          this.searchQuery.usernameWildcard = "";
        }
        //存证名称
        if (this.searchQuery.evidenceNameWildcard == "none") {
          this.searchQuery.evidenceNameWildcard = "";
        }
        //公证类型
        if (this.searchQuery.notarizationType == "none") {
          this.searchQuery.notarizationType = "";
        }
        //支付状态
        if (this.searchQuery.paymentStatus == "none") {
          this.searchQuery.paymentStatus = "";
        }
        //存证类型
        if (this.searchQuery.evidenceType == "none") {
          this.searchQuery.evidenceType = "";
        }
        //公证状态
        if (this.searchQuery.notarizationStatus == "none") {
          this.searchQuery.notarizationStatus = "";
        }
      } catch (error) {
        throw new Error(error.message);
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
