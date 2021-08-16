<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container" style="margin-left: 30%">
      申请人:
      <el-input
        v-model="searchQuery.userId"
        placeholder="请输入申请人"
        style="width: 280px"
      ></el-input>
      <el-button type="primary" @click="handleSearch()">搜索</el-button>
      <el-button
        type="primary"
        @click="searchVisible = true"
        style="margin-left: 18px"
        >高级搜索
      </el-button>
    </div>
    <el-dialog
      title="高级搜索"
      :visible.sync="searchVisible"
      style="width: 100%"
    >
      <el-form label-width="100px">
        <el-form-item label="申请人编号:">
          <el-input
            v-model="searchQuery.userId"
            placeholder="请输入申请人编号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="存证名称:">
          <el-input
            v-model="searchQuery.evidenceNameWildcard"
            placeholder="请输入存证名称"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="存证编号:">
          <el-input
            v-model="searchQuery.evidenceId"
            placeholder="请输入存证编号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="存证类型:">
          <el-select v-model="searchQuery.evidenceType" placeholder="请选择">
            <el-option
              v-for="item in evidence_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公证状态:">
          <el-select
            v-model="searchQuery.notarizationStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in notarization_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公证类型:">
          <el-select
            v-model="searchQuery.notarizationType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in notarization_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="支付状态:">
          <el-select v-model="searchQuery.paymentStatus" placeholder="请选择">
            <el-option
              v-for="item in payment_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公证金额:">
          <el-select v-model="moneyState" placeholder="请选择">
            <el-option
              v-for="item in money_choose"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button
          @click="
            handleSearch();
            searchVisible = false;
          "
          type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文件大小">
                <span>{{ props.row.fileSize }}</span>
              </el-form-item>
              <el-form-item label="文件哈希值">
                <span>{{ props.row.fileHash }}</span>
              </el-form-item>
              <el-form-item label="存证时间">
                <span>{{ props.row.evidenceTime }}</span>
              </el-form-item>
              <el-form-item label="上链时间">
                <span>{{ props.row.blockchainTime }}</span>
              </el-form-item>
              <el-form-item label="存证区块链交易ID">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="公证状态">
                <span>{{ props.row.notarizationStatus }}</span>
              </el-form-item>
              <el-form-item label="公证金额">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
              <el-form-item label="交易支付状态">
                <span>{{ props.row.transactionStatus }}</span>
              </el-form-item>
              <el-form-item label="公证申请时间">
                <span>{{ props.row.notarizationStartTime }}</span>
              </el-form-item>
              <el-form-item label="公证完成时间">
                <span>{{ props.row.notarizationEndTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="存证编号" prop="evidenceId"></el-table-column>
        <el-table-column label="申请人" prop="userId"></el-table-column>
        <el-table-column label="存证类型" prop="evidenceType"></el-table-column>
        <el-table-column label="存证名称" prop="evidenceName"></el-table-column>
        <el-table-column label="申请事项" prop="notarizationMatters"></el-table-column>
        <el-table-column label="公证类型" prop="notarizationType"></el-table-column>
      </el-table>
      <div class="search_container">
        <el-switch v-model="decrypt" on-text="解密" off-text="加密" @change="initData()"></el-switch>
      </div>
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
      searchVisible: false,
      decrypt: true,
      moneyState: "",
      // 表格
      tableData: [{}],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      //公证员ID
      notary_id: "",
      searchQuery: {
        evidenceId: "",
        userId: "",
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
          label: "不限",
          value: "none",
        },
      ],
      //公证类型选择器
      notarization_type: [
        {
          label: "不限",
          value: "none",
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
      notarization_status:[
        {
          label: "审核通过",
          value: "3",
        },
        {
          label: "审核不通过",
          value: "4",
        },
      ]
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
        if (this.decrypt) {
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
            throw new Error("获取数据失败");
          }
        });
        //获取存证类型
        await eviTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.evidence_type.push(item);
            });
          }
        });
        //获取公证类型
        await noTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.notarization_type.push(item);
            });
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
      } catch (error) {
        throw new Error(error.message);
      }
    },
    dealData() {
      try {
        //存证编号
        if (this.searchQuery.evidenceId == "") {
          this.searchQuery.evidenceId = "none";
        }
        //用户编号
        if (this.searchQuery.userId == "") {
          this.searchQuery.userId = "none";
        }
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
        if (this.decrypt) {
          this.searchQuery.decryptFlag = 1;
        } else {
          this.searchQuery.decryptFlag = 0;
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
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
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
</style>
