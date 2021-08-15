<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container">
      
     <el-input
        placeholder="请输入存证名称"
        v-model="notarization.evidenceName"
        style="margin-left: 30%; width: 390px"
      >
      </el-input>
      <el-button type="primary" @click="handleSearch()">搜索</el-button>
  
      <el-button type="primary" @click="searchVisible = true">
        高级搜索
      </el-button>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文件目录">
                <span>{{ props.row.filePath }}</span>
              </el-form-item>
              <el-form-item label="文件大小">
                <span>{{ props.row.fileSize }}</span>
              </el-form-item>
              <el-form-item label="文件Hash值">
                <span>{{ props.row.fileHash }}</span>
              </el-form-item>
              <el-form-item label="存证时间">
                <span>{{ props.row.evidenceTime }}</span>
              </el-form-item>
              <el-form-item label="存证区块链交易ID">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="上链时间">
                <span>{{ props.row.blockchainTime }}</span>
              </el-form-item>
              <el-form-item label="申请事项">
                <span>{{ props.row.notarizationMatters }}</span>
              </el-form-item>
              <el-form-item label="公证申请时间">
                <span>{{ props.row.notarizationStartTime }}</span>
              </el-form-item>
              <el-form-item label="公证申请区块链交易ID">
                <span>{{ props.row.notarizationBlockchainIdStart }}</span>
              </el-form-item>
              <el-form-item label="公证状态" class="notarizationStatus">
                <span>{{ props.row.notarizationStatus }}</span>
              </el-form-item>
              <el-form-item label="公证完成区块链交易ID">
                <span>{{ props.row.notarizationBlockchainIdEnd }}</span>
              </el-form-item>
              <el-form-item label="公证金额">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
              <el-form-item label="支付状态">
                <span>{{ props.row.transactionStatus }}</span>
              </el-form-item>
              <el-form-item label="审核信息">
                <span>{{ props.row.notarizationInformation }}</span>
              </el-form-item>
              <el-form-item label="公证完成时间">
                <span>{{ props.row.notarizationEndTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="存证编号" prop="evidenceId"></el-table-column>
        <el-table-column label="存证类型" prop="evidenceType"></el-table-column>
        <el-table-column label="存证名称" prop="evidenceName"></el-table-column>
        <el-table-column
          label="公证类型"
          prop="notarizationType"
        ></el-table-column>
        <el-table-column
          label="公证机构"
          prop="organizationName"
        ></el-table-column>
        <el-table-column
          label="公证状态"
          prop="notarizationStatus"
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
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
        <el-form-item label="明文/密文显示">
          <el-switch
            v-model="decrypt_flag"
            active-text="明文"
            inactive-text="密文"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
            ></el-switch
          >
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button type="primary" @click="getNotarizationData()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import {
  notarizationList,
  reservationList,
  delReservation,
  agentList,
  notarizationApplyList,
} from "@/api/getData";
export default {
  data() {
    return {
      searchVisible: false,
      notarization: {
        userId: sessionStorage.getItem("userID"),
        evidenceName: "",
        evidenceType: "",
        notarizationType: "",
        // 支付状态
        paymentStatus: "",
        // 加解密：1 解密 0 加密
        decryptFlag: 1,
        // 公证开始时间
        // 公证完成时间
        // 公证状态
        notarizationStatus: "",
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

      // 公证机构
      value_agent: "",
      options_agent: [],
      // 订单状态
      value_order: "",
      options_order: [
        {
          value: "不限",
          label: "不限",
        },
        {
          value: "0",
          label: "失败",
        },
        {
          value: "1",
          label: "成功",
        },
        {
          value: "2",
          label: "审核中",
        },
      ],
      // 支付状态
      value_pay: "",
      options_pay: [
        {
          value: "0",
          label: "不限",
        },
        {
          value: "1",
          label: "未支付",
        },
        {
          value: "2",
          label: "已支付",
        },
        {
          value: "3",
          label: "退款中",
        },
        {
          value: "4",
          label: "已退款",
        },
        {
          value: "5",
          label: "线下支付",
        },
      ],
      // 表格
      tableData: [
        {
          filePath: "/sss/sss/ss",
          transactionStatus: "已支付",
          notarizationStatus: "待公证",
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
  created() {
    this.initData();
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
        orgaQuery().then((result) => {
          if (result.status == true) {
            //成功
            console.log(result.data);
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
    // 公证申请时间赋值
    selectNotarizationStartTime() {
      let start = this.notarizationStartTime[0];
      let end = this.notarizationStartTime[1];
      this.notarization.notarizationStartTimeStart = start.getTime();
      this.notarization.notarizationStartTimeEnd = end.getTime();
      console.log();
    },

    // 公证完成时间赋值
    selectNotarizationEndTime() {
      let start = this.notarizationEndTime[0];
      let end = this.notarizationEndTime[1];
      this.notarization.notarizationEndTimeStart = start.getTime();
      this.notarization.notarizationEndTimeEnd = end.getTime();
    },

    // 获取公证机构列表
    async getAgent() {
      const result = await agentList();
      if (result.error_code == 0) {
        this.options_agent = [];
        result.data.forEach((item, index) => {
          let tableData = {};
          (tableData.value = result.data[index].id),
            (tableData.label = result.data[index].agent),
            this.options_agent.push(tableData);
        });
      } else if (result.error_code != 0) {
        throw new Error("获取数据失败");
      }
    },
    // 初始化数据
    async initData() {
      try {
        const query = {
          telephone: this.telephone,
          limit: this.pageSize,
          page: this.pageIndex,
        };
        await notarizationApplyList(query).then((result) => {
          if (result.error_code == 0) {
            this.tableData = [];
            this.pageTotal = result.meta.total;
            result.data.forEach((item, index) => {
              let tableData = {};

              switch (result.data[index].status) {
                case 1:
                  tableData.reservation_status = "预约成功";
                  break;
                case 2:
                  tableData.reservation_status = "预约失败";
                  break;
                case 3:
                  tableData.reservation_status = "处理完毕";
                  break;
                case 4:
                  tableData.reservation_status = "预约处理中";
                  break;
                case 5:
                  tableData.reservation_status = "预约已撤销";
                  break;
              }
              (tableData.id = result.data[index].id),
                (tableData.notarization_name =
                  result.data[index].notarization_name),
                (tableData.notarization_name =
                  result.data[index].law_notarization.notarization_name),
                (tableData.reservation_time =
                  result.data[index].reservation_from +
                  "~" +
                  result.data[index].reservation_to),
                (tableData.apply_time = result.data[index].created_at),
                this.tableData.push(tableData);
            });
          } else if (result.error_code != 0) {
            throw new Error("获取数据失败");
          }
        });
      } catch (error) {
        throw new Error(error.message);
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
      const query = {
        start_time: this.start_time,
        end_time: this.end_time,
        notarization_id: this.value_apply,
      };
      //   console.log(query);
      try {
        await reservationList(query).then((result) => {
          if (result.error_code == 0) {
            this.tableData = [];
            this.pageTotal = result.meta.total;
            result.data.forEach((item, index) => {
              let tableData = {};
              switch (result.data[index].status) {
                case 1:
                  tableData.reservation_status = "预约成功";
                  break;
                case 2:
                  tableData.reservation_status = "预约失败";
                  break;
                case 3:
                  tableData.reservation_status = "处理完毕";
                  break;
                case 4:
                  tableData.reservation_status = "预约处理中";
                  break;
                case 5:
                  tableData.reservation_status = "预约已撤销";
                  break;
              }
              (tableData.id = result.data[index].id),
                (tableData.notarization_name =
                  result.data[index].notarization_name),
                (tableData.notarization_id =
                  result.data[index].notarization_id),
                (tableData.reservation_time =
                  result.data[index].reservation_from +
                  "~" +
                  result.data[index].reservation_to),
                (tableData.apply_time = result.data[index].created_at),
                this.tableData.push(tableData);
            });
          } else if (result.error_code != 0) {
            throw new Error("获取数据失败");
          }
        });
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
  width: 25%;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.notarizationStatus {
  color: red;
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
