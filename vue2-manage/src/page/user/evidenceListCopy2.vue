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

      <!-- <el-button type="primary" @click="handleSearch()">搜索</el-button> -->
      <el-button type="primary" @click="searchVisible = true">
        高级搜索
      </el-button>
      <el-button type="primary" @click="addEvidence()">新增存证</el-button>
    </div>
    <!-- 记录列表-->
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="right"
              inline
              label-width="160px"
              class="demo-table-expand"
            >
              <el-form-item label="文件目录:">
                <span>{{ props.row.filePath }}</span>
              </el-form-item>
              <el-form-item label="文件大小:">
                <span>{{ props.row.fileSize }}</span>
              </el-form-item>
              <el-form-item label="文件Hash值:">
                <span>{{ props.row.fileHash }}</span>
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
          width="70px"
        ></el-table-column>
        <el-table-column
          label="存证编号"
          align="center"
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
          prop="evidenceType"
        ></el-table-column>
        <el-table-column
          label="存证时间"
          align="center"
          prop="evidenceTime"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="360">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handlePublic(scope.row)"
              >申请公证</el-button
            >
            <el-button size="small" @click="handleDown(scope.row)"
              >在线查看</el-button
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
    >
      <el-form ref="notarization" :model="notarization" label-width="100px">
        <el-form-item label="公证类型">
          <el-select
            v-model="notarization.notarizationType"
            style="width: 50%"
            placeholder="请选择公证类型"
          >
            <el-option
              v-for="item in notarizationType"
              :key="item.notarizationType"
              :label="item.notarizationTypeName"
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
            placeholder="请输入申请事项"
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
    <el-dialog title="公证缴费" :visible.sync="notarPayVisible" size="tiny">
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
    >
      <el-form ref="evidence" :model="evidence" label-width="200px">
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
// import { baseUrl, baseImgPath } from "@/config/env";
import {
  getEvidenceType,
  orgaQuery,
  noTypeQuery,
  notarReq,
  notarPay,
  userEvidenceQuery,
} from "@/api/getData";
export default {
  data() {
    return {
      searchVisible: false,
      notarPayVisible: false,

      /*evidence: {
        //userId: sessionStorage.getItem("userID"),
        userId: "1",
        evidenceName: "",
        evidenceType: "",
        // evidenceTimeStart: "none",
        // evidenceTimeEnd: "none",
        // blockchainTimeStart: "none",
        // blockchainTimeEnd: "none",
        notarizationStatus: 0,
      },*/
      evidence: {
        evidenceId: "none",
        userId: "1",
        usernameWildcard: "none",
        fileSizeFloor: -1,
        fileSizeUpper: -1,
        evidenceName: "",
        evidenceType: "",
        evidenceTimeStart: "none",
        evidenceTimeEnd: "none",
        blockchainTimeStart: "none",
        blockchainTimeEnd: "none",
        notarizationStatus: "none",
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
        //userId: sessionStorage.getItem("userID"),
        userId: "1",
        evidenceId: "2",
        notarizationType: "",
        organizationId: "",
        notarizationMoney: "",
        notarizationMatters: "",
        transactionPeople:"",
      },

      // 公证机构
      organization: [],

      // 公证类型
      notarizationType: [],

      // 复合搜索框
      input_search: "",
      select: "",
      // 表格
      tableData: [
        {
          evidenceId: "12987122",
          evidenceName: "文凭",
          evidenceType: "文件存证",
          evidenceTime: "2021-08-09",
          filePath: "/XXX/XXX/XX",
          fileSize: "10.5MB",
          fileHash: "xjklfglksdf",
          evidenceBlockchainId: "132135465476461",
          blockchainTime: "2021-08-09",
        },
        {},
        {},
      ],
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
    // this.getEvidenceData();
    this.getNotarizationType();
    this.getAgent();
    this.getEvidenceType();
  },
  computed: {},
  components: {
    headTop,
  },
  methods: {
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
    // 新增存证路由跳转
    addEvidence() {
      this.$router.push("/addEvidence");
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
          if (result.status == true) {
            //成功
            console.log(result.data);
            result.data.forEach((item) => {
              this.notarizationType.push(item);
            });
          } else {
            //失败
            console.log("获取公证类型失败");
          }
        });
      } catch (e) {
        console.log(e);
      }
    },

    handlePageChange(val) {
      console.log(val);
      this.pageIndex = val;
      // this.initData();
    },

    // 申请公证按钮
    async handlePublic(row) {
      this.dialogVisible_notarization = true;
      this.notarization.evidenceId = row.evidenceId;
    },

    // 发送公证请求
    async notarReq() {
      try {
        this.notarization.evidenceId = "2";
        notarReq(this.notarization).then((result) => {
          console.log(result);
          if (result.status == true) {
            //成功
            console.log(result.notarizationMoney);
            //缴费
            this.notarization.notarizationMoney = result.notarizationMoney;
            //
            this.dialogVisible_notarization = false;
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
        this.notarization.transactionPeople = this.notarization.organizationId
        notarPay(this.notarization).then((result) => {
          if (result.status == true) {
            //成功
            console.log(result.data);
            this.notarPayVisible = false;
            this.$message({
              type: "success",
              message: "缴费成功，等待上链，上链成功后可在公证列表中查看",
            });
          } else {
            //失败
            console.log("公证申请失败");
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

    // 证据查看
    async handleDown(row) {
      window.open("http://localhost:8080/ipfs/" + row.storage_hash, "_blank"); // 新窗口打开外链接
      // this.$router.push("http://localhost:8080/ipfs/"+row.storage_hash);
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
      this.searchVisible = false;
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
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
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

    //时间戳转日期
    // fmtDate(timestamp) {
    //   if (timestamp) {
    //     var time = new Date(timestamp);
    //     var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
    //     var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
    //     var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
    //     var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
    //     var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
    //     var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
    //     return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
    //   } else {
    //     return "";
    //   }
    // },

    //关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
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
