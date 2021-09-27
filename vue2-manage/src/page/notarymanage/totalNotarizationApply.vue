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
          @click="handleSearch()"
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
      <el-form label-width="200px">
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

        <el-form-item label="公证结束时间:">
          <el-date-picker
            v-model="timeValue3"
            type="datetime"
            placeholder="选择起始日期时间"
          ></el-date-picker>
          ~
          <el-date-picker
            v-model="timeValue4"
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
            placeholder="请选择公证状态"
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
            placeholder="请选择存证类型"
            style="width: 240px"
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
            placeholder="请选择公证类型"
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
          <el-select
            v-model="moneyState"
            style="width: 240px"
            placeholder="请选择公证金额"
            clearable
          >
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

    <!-- 列表 -->
    <div class="table_container">
      <el-table :data="tableData" stripe style="width: 100%">
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
              <el-form-item label="文件大小:">
                <span>{{ props.row.fileSize }} KB</span>
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
              <el-form-item label="审核信息:">
                <span>{{ props.row.notarizationInformation }}</span>
              </el-form-item>
              <el-form-item label="公证金额:">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
              <el-form-item label="存证区块链交易ID:">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="公证申请区块链交易ID:">
                <span>{{ props.row.notarizationBlockchainIdStart }}</span>
              </el-form-item>
              <el-form-item label="公证完成区块链交易ID:">
                <span>{{ props.row.notarizationBlockchainIdEnd }}</span>
              </el-form-item>
              <el-form-item label="公证完成时间:">
                <span>{{ props.row.notarizationEndTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
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
          label="公证类型"
          align="center"
          prop="notarizationType"
        ></el-table-column>
        <el-table-column
          label="公证申请时间"
          align="center"
          prop="notarizationStartTime"
        ></el-table-column>
        <el-table-column
          label="公证状态"
          align="center"
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
import { baseUrl, baseImgPath } from "@/config/env";
import { notarmanageRecord, eviTypeQuery, noTypeQuery } from "@/api/getData";
export default {
  data() {
    return {
      searchVisible: false,
      //时间选择器
      timeValue1: "",
      timeValue2: "",
      timeValue3: "",
      timeValue4: "",
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
        usernameWildcard: "",
        evidenceName: "",
        notarizationStatus: "",
        notarizationType: "",
        evidenceType: "",
        decryptFlag: 1,
        notarizationMoneyUpper: -1,
        notarizationMoneyFloor: -1,
        notarizationStartTimeStart: "none",
        notarizationStartTimeEnd: "none",
        notarizationEndTimeStart: "none",
        notarizationEndTimeEnd: "none",
      },
      notarization_state: [
        {
          state_value: "none",
          state_label: "不限",
        },
        {
          state_value: "3",
          state_label: "公证成功",
        },
        {
          state_value: "4",
          state_label: "公证失败",
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
    this.autManId = localStorage.getItem("autManId");
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
        const query = {
          evidenceId: "none",
          userId: "none",
          usernameWildcard: "none",
          evidenceName: "none",
          notarizationStatus: "3",
          notarizationType: "none",
          evidenceType: "none",
          decryptFlag: 1,
          notarizationMoneyUpper: -1,
          notarizationMoneyFloor: -1,
          notarizationStartTimeStart: "none",
          notarizationStartTimeEnd: "none",
          notarizationEndTimeStart: "none",
          notarizationEndTimeEnd: "none",
          notaryId: "none",
        };
        await notarmanageRecord(query).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              if (item.notarizationEndTime != null) {
                item.notarizationEndTime =
                  item.notarizationEndTime.substring(0, 10) +
                  " " +
                  item.notarizationEndTime.substring(11, 19);
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
          } else {
            throw new Error("获取数据失败");
          }
        });
        query.notarizationStatus = "4";
        await notarmanageRecord(query).then((result) => {
          if (result.status) {
            result.data.forEach((item) => {
              if (item.notarizationEndTime != null) {
                item.notarizationEndTime =
                  item.notarizationEndTime.substring(0, 10) +
                  " " +
                  item.notarizationEndTime.substring(11, 19);
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
            throw new Error("获取数据失败");
          }
        });
        console.log(this.tableData[1]);
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
      try {
        this.dealData();
        if (this.notarization.notarizationStatus == "none") {
          this.notarization.notarizationStatus = "3";
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
                if (item.notarizationEndTime != null) {
                  item.notarizationEndTime =
                    item.notarizationEndTime.substring(0, 10) +
                    " " +
                    item.notarizationEndTime.substring(11, 19);
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
            } else {
              throw new Error("获取数据失败");
            }
          });
          this.notarization.notarizationStatus = "4";

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
                if (item.notarizationEndTime != null) {
                  item.notarizationEndTime =
                    item.notarizationEndTime.substring(0, 10) +
                    " " +
                    item.notarizationEndTime.substring(11, 19);
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
                if (item.notarizationEndTime != null) {
                  item.notarizationEndTime =
                    item.notarizationEndTime.substring(0, 10) +
                    " " +
                    item.notarizationEndTime.substring(11, 19);
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
        if (this.notarization.usernameWildcard == "") {
          this.notarization.usernameWildcard = "none";
        }
        //存证名称
        if (this.notarization.evidenceName == "") {
          this.notarization.evidenceName = "none";
        }
        //公证类型
        if (
          this.notarization.notarizationType == "" ||
          this.notarization.notarizationType == "不限"
        ) {
          this.notarization.notarizationType = "none";
        }
        //存证类型
        if (this.notarization.evidenceType == "") {
          this.notarization.evidenceType = "none";
        }
        //公证状态
        if (this.notarization.notarizationStatus == "") {
          this.notarization.notarizationStatus = "none";
        }
        //公证金额
        if (this.moneyState == "0") {
          this.notarization.notarizationMoneyUpper = 100;
          this.notarization.notarizationMoneyFloor = -1;
        } else if (this.moneyState == "1") {
          this.notarization.notarizationMoneyUpper = 300;
          this.notarization.notarizationMoneyFloor = 100;
        } else if (this.moneyState == "2") {
          this.notarization.notarizationMoneyUpper = -1;
          this.notarization.notarizationMoneyFloor = 300;
        } else {
          this.notarization.notarizationMoneyUpper = -1;
          this.notarization.notarizationMoneyFloor = -1;
        }
        //时间
        if (this.timeValue1 != "") {
          this.notarization.notarizationStartTimeStart =
            this.timeValue1.getTime();
        }
        if (this.timeValue2 != "") {
          this.notarization.notarizationStartTimeEnd =
            this.timeValue2.getTime();
        }
        if (this.timeValue3 != "") {
          this.notarization.notarizationEndTimeStart =
            this.timeValue3.getTime();
        }
        if (this.timeValue4 != "") {
          this.notarization.notarizationEndTimeEnd = this.timeValue4.getTime();
        }
        //加解密
        if (this.decrypt_flag) {
          this.notarization.decryptFlag = 1;
        } else {
          this.notarization.decryptFlag = 0;
        }
        //alert(this.notarization.decryptFlag);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    resetData() {
      try {
        //用户名
        if (this.notarization.usernameWildcard == "none") {
          this.notarization.usernameWildcard = "";
        }
        //存证名称
        if (this.notarization.evidenceName == "none") {
          this.notarization.evidenceName = "";
        }
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
        "http://localhost:8080/downloadUserFile?evidenceId=" + row.evidenceId;
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
.demo-table-expands {
  font-size: 20px;
  margin-bottom: 0%;
}
.demo-table-expands label {
  width: 120px;
  font-size: 15px;
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
