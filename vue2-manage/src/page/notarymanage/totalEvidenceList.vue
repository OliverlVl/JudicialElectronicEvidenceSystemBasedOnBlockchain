<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container">
      <el-input
        v-model="evidence.evidenceNameWildcard"
        placeholder="请输入证据名称"
        style="width: 390px; margin-left: 30%"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch()"
        ></el-button>
      </el-input>

      <el-button
        type="primary"
        @click="searchVisible = true"
        style="margin-left: 18px"
        >高级搜索
      </el-button>
      <!--<el-button @click="tryy()">尝试</el-button>-->
    </div>
    <el-dialog
      title="高级搜索"
      :visible.sync="searchVisible"
      style="width: 100%"
    >
      <el-form label-width="200px">
        <el-form-item label="存证时间:">
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

        <el-form-item label="上链时间:">
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
            v-model="evidence.usernameWildcard"
            placeholder="请输入申请人名称"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="公证状态:">
          <el-select
            v-model="evidence.notarizationStatus"
            style="width: 240px"
            placeholder="请选择"
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
            v-model="evidence.evidenceType"
            style="width: 240px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in evidence_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="明文/密文显示">
          <el-switch
            v-model="decrypt_flag"
            active-text="明文"
            inactive-text="密文"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文件哈希">
                <span>{{ props.row.fileHash }}</span>
              </el-form-item>
              <el-form-item label="证据保存区块ID">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="公证开始时间">
                <span>{{ props.row.notarizationStartTime }}</span>
              </el-form-item>
              <el-form-item label="公证状态">
                <span>{{ props.row.notarizationStatus }}</span>
              </el-form-item>
              <el-form-item label="公证金额">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="证据编号" prop="evidenceId"></el-table-column>
        <el-table-column label="证据名称" prop="evidenceName"></el-table-column>
        <el-table-column
          label="上链时间"
          prop="blockchainTime"
        ></el-table-column>
        <el-table-column label="证据类型" prop="evidenceType"></el-table-column>
        <el-table-column
          label="公证机构"
          prop="organizationName"
        ></el-table-column>
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
import { evidenceQuery, eviTypeQuery } from "@/api/getData";
export default {
  data() {
    return {
      searchVisible: false,
      //时间选择器
      timeValue1: "",
      timeValue2: "",
      timeValue3: "",
      timeValue4: "",
      //公证状态选择器
      notarization_state: [
        {
          state_value: "0",
          state_label: "未公证",
        },
        {
          state_value: "1",
          state_label: "等待公证",
        },
        {
          state_value: "2",
          state_label: "公证审核中",
        },
        {
          state_value: "3",
          state_label: "公证成功",
        },
        {
          state_value: "4",
          state_label: "公证失败",
        },
        {
          state_value: "none",
          state_label: "不限",
        },
      ],
      //存证类型选择器
      evidence_type: [
        {
          label: "不限",
          value: "none",
        },
      ],
      evidence: {
        evidenceId: "",
        userId: "",
        usernameWildcard: "",
        evidenceNameWildcard: "",
        evidenceType: "",
        evidenceTimeStart: "none",
        evidenceTimeEnd: "none",
        blockchainTimeStart: "none",
        blockchainTimeEnd: "none",
        notarizationStatus: "",
        decryptFlag: 1,
      },
      // 是否解密
      decrypt_flag: true,
      // 表格
      tableData: [
        {
          evidenceId: "123456",
          evidenceName: "房产证",
          blockchainTime: "****/**/**",
          evidenceType: "书面取证",
          fileHash: "qwffsdfsadff",
          evidenceBlockchainId: "654321",
          organizationName: "111111",
          notarizationStartTime: "****/**/**",
          notarizationStatus: "审核成功",
          notarizationMoney: 100,
        },
      ],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      autManId:"",
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
      const query = {
        evidenceId: "none",
        userId: "none",
        usernameWildcard: "none",
        fileSizeFloor: -1,
        fileSizeUpper: -1,
        evidenceNameWildcard: "none",
        evidenceType: "none",
        evidenceTimeStart: "none",
        evidenceTimeEnd: "none",
        blockchainTimeStart: "none",
        blockchainTimeEnd: "none",
        notarizationStatus: "none",
        decryptFlag: 1,
      };
      try {
        await evidenceQuery(query).then((result) => {
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
        //获取存证类型
        await eviTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.evidence_type.push(item);
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

    // 时间选择
    selectTime() {
      let start = this.value_time[0];
      let end = this.value_time[1];
      this.start_time = this.fmtDate(start.getTime());
      this.end_time = this.fmtDate(end.getTime());
      //   console.log(end);
      //   console.log(end.getTime());
    },
    // 搜索
    async handleSearch() {
      try {
        this.dealData();
        await evidenceQuery(this.evidence).then((result) => {
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
        this.resetData();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    dealData() {
      try {
        //存证编号
        if (this.evidence.evidenceId == "") {
          this.evidence.evidenceId = "none";
        }
        //用户编号
        if (this.evidence.userId == "") {
          this.evidence.userId = "none";
        }
        //用户名
        if (this.evidence.usernameWildcard == "") {
          this.evidence.usernameWildcard = "none";
        }
        //存证名称
        if (this.evidence.evidenceNameWildcard == "") {
          this.evidence.evidenceNameWildcard = "none";
        }
        //存证类型
        if (this.evidence.evidenceType == "") {
          this.evidence.evidenceType = "none";
        }
        //公证状态
        if (this.evidence.notarizationStatus == "") {
          this.evidence.notarizationStatus = "none";
        }
        //加解密
        if (this.decrypt_flag) {
          this.evidence.decryptFlag = 1;
        } else {
          this.evidence.decryptFlag = 0;
        }
        //时间
        if (this.evidenceTimeStart != "none") {
          this.evidence.evidenceTimeStart = this.timeValue1.getTime();
        }
        if (this.blockchainTimeStart != "none") {
          this.evidence.blockchainTimeStart = this.timeValue2.getTime();
        }
        if (this.evidenceTimeEnd != "none") {
          this.evidence.evidenceTimeEnd = this.timeValue3.getTime();
        }
        if (this.blockchainTimeStart != "none") {
          this.evidence.blockchainTimeEnd = this.timeValue4.getTime();
        }
        //alert(this.evidence.evidenceTimeEnd);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    resetData() {
      try {
        //存证编号
        if (this.evidence.evidenceId == "none") {
          this.evidence.evidenceId = "";
        }
        //用户编号
        if (this.evidence.userId == "none") {
          this.evidence.userId = "";
        }
        //用户名
        if (this.evidence.usernameWildcard == "none") {
          this.evidence.usernameWildcard = "";
        }
        //存证名称
        if (this.evidence.evidenceNameWildcard == "none") {
          this.evidence.evidenceNameWildcard = "";
        }
        //存证类型
        if (this.evidence.evidenceType == "none") {
          this.evidence.evidenceType = "";
        }
        //公证状态
        if (this.evidence.notarizationStatus == "none") {
          this.evidence.notarizationStatus = "";
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    //时间戳转日期
    fmtDate(timestamp) {
      if (timestamp) {
        var time = new Date(timestamp);
        var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
        var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
        var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
        var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
        var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
        var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
        return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.search_container {
  // padding: 10px;
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
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
