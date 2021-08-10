<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- 高级搜索-->
    <div class="search_container">
      &emsp; 存证时间范围: &emsp;
      <el-date-picker
        v-model="valuedate1"
        type="datetime"
        placeholder="选择起始日期时间"
      >
      </el-date-picker>
      ~
      <el-date-picker
        v-model="valuedate2"
        type="datetime"
        placeholder="选择结束日期时间"
      >
      </el-date-picker>

      &emsp; 证据文件大小范围: &emsp;
      <el-select v-model="fileSize" placeholder="请选择">
        <el-option
          v-for="item in file_size"
          :key="item.file_value"
          :label="item.file_label"
          :value="item.file_value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="search_container">
      &emsp; 上链时间范围: &emsp;
      <el-date-picker
        v-model="valuedate3"
        type="datetime"
        placeholder="选择起始日期时间"
      >
      </el-date-picker>
      ~
      <el-date-picker
        v-model="valuedate4"
        type="datetime"
        placeholder="选择结束日期时间"
      >
      </el-date-picker>

      &emsp; <span style="padding-right: 64px">公证状态:</span> &emsp;
      <el-select v-model="notarizationStatus" placeholder="请选择">
        <el-option
          v-for="item in notarization_state"
          :key="item.state_value"
          :label="item.state_label"
          :value="item.state_value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="search_container">
      &emsp; 存证区块链交易id: &emsp;
      <el-input
        v-model="usernameWildcard"
        placeholder="存证区块链交易id"
        style="width: 376px"
      ></el-input>
      &emsp; <span style="padding-right: 64px">存证类型:</span> &emsp;
      <el-select v-model="evidenceType" placeholder="请选择">
        <el-option
          v-for="item in evidence_type"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="search_container">
      &emsp; 证据名称: &emsp;
      <el-input
        v-model="evidenceNames"
        placeholder="请输入证据名称"
        style="width: 440px"
      ></el-input>

      &emsp; 存证编号: &emsp;
      <el-input
        v-model="evidenceId"
        placeholder="请输入存证编号"
        style="width: 440px; padding-left:60px"
      ></el-input>
    </div>
    <div class="search_container">
      &emsp; 申请人: &emsp;
      <el-input
        v-model="userId"
        placeholder="请输入申请人名称"
        style="width: 440px; margin-left: 15px"
      ></el-input>

      &emsp; 申请人编号: &emsp;
      <el-input
        v-model="usernameWildcard"
        placeholder="请输入申请人编号"
        style="width: 440px; padding-left:46px"
      ></el-input>
    </div>
    
    <div>
      <el-switch
        v-model="decrypt_flag"
        on-text="解密"
        off-text="加密"
        style="margin-left: 30px"
      ></el-switch>

      <el-button
        type="primary"
        @click="handleSearch()"
        style="margin-left: 238px"
        >搜索</el-button
      >
    </div>

    <!-- 列表 -->
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
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

    <!--申请公证  -->
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  notarizationList,
  reservationList,
  delReservation,
  tradeList,
} from "@/api/getData";
export default {
  data() {
    return {
      // 文件大小选择器
      file_size: [
        {
          file_value: 1,
          file_label: "1M以下",
        },
        {
          file_value: 2,
          file_label: "1~10M",
        },
        {
          file_value: 3,
          file_label: "10M以上",
        },
        {
          file_value: -1,
          file_label: "不限",
        },
      ],
      //公证状态选择器
      notarization_state: [
        {
          state_value: 0,
          state_label: "未公证",
        },
        {
          state_value: 1,
          state_label: "等待公证",
        },
        {
          state_value: 2,
          state_label: "公证审核中",
        },
        {
          state_value: 3,
          state_label: "公证成功",
        },
        {
          state_value: 4,
          state_label: "公证失败",
        },
        {
          state_value: -1,
          state_label: "不限",
        },
      ],
      //存证类型选择器
      evidence_type: [
        {
          label: "不限",
          value: -1,
        },
      ],
      //时间选择器
      valuedate1: "none",
      valuedate2: "none",
      //存证类型
      evidenceType: "不限",
      //文件大小
      fileSize: "不限",
      fileSizeFloor: -1,
      fileSizeUpper: -1,
      //文件名
      evidenceNames: "",
      //公证状态
      notarizationStatus: "不限",

      // 是否解密
      decrypt_flag: true,
      // 复合搜索框
      input_search: "",
      select: "",
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      telephone: "",
      start_time: "",
      end_time: "",
      // 弹窗
      dialogVisible: false,
      tableData3: [],
    };
  },
  created() {
    //this.telephone = localStorage.getItem("telephone");
    this.userId = localStorage.getItem("userId");
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
          fileSizeFloor: -1,
          fileSizeUpper: -1,
          evidenceNameWildcard: "none",
          evidenceType: "none",
          evidenceTimeStart: "none",
          evidenceTimeEnd: "none",
          notarizationStatus: -1,
          decrypt_flag: true,
        };
        await getEvidenceAll(query).then((result) => {
          if (result.error_code == 0) {
            this.tableData = [];
            //this.pageTotal = result.meta.total;
            var num = 0;
            result.data.forEach((item, index) => {
              let tableData = {};
              (tableData.evidenceId = result.data[index].evidenceId),
                (tableData.evidenceName = result.data[index].evidenceName),
                (tableData.blockchainTime = result.data[index].blockchainTime),
                (tableData.evidenceType = result.data[index].evidenceType),
                (tableData.fileHash = result.data[index].fileHash),
                (tableData.evidenceBlockchainId =
                  result.data[index].evidenceBlockchainId),
                (tableData.organizationName =
                  result.data[index].organizationName),
                (tableData.notarizationStartTime =
                  result.data[index].notarizationStartTime),
                (tableData.notarizationStatus =
                  result.data[index].notarizationStatus),
                (tableData.notarizationMoney =
                  result.data[index].notarizationMoney),
                this.tableData.push(tableData);
              num = num + 1;
            });
            this.pageTotal = num;
          } else if (result.error_code != 0) {
            throw new Error("获取数据失败");
          }
        });
        //获取存证类型
        await eviTypeQuery().then((typeres) => {
          this.evidence_type = [{ label: "不限", value: -1 }];
          result.data.forEach((item, index) => {
            let evidence_type = {};
            (evidence_type.value = typeres.data[index].organization_id),
              (evidence_type.label = typeres.data[index].organization_name),
              this.evidence_type.push(evidence_type);
          });
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
    tryy() {
      const query = {
        name: "none",
      };
      if (this.evidenceNames == "") {
        alert(query.name);
      } else {
        query.name = this.evidenceNames;
        alert(query.name);
      }
    },
    // 搜索
    async handleSearch() {
      const query = {
        fileSizeFloor: -1,
        fileSizeUpper: -1,
        evidenceNameWildcard: "none",
        evidenceType: "none",
        evidenceTimeStart: this.valuedate1,
        evidenceTimeEnd: this.valuedate2,
        notarizationStatus: this.notarizationStatus,
        decrypt_flag: this.decrypt_flag,
      };
      switch (this.fileSize) {
        case 1:
          query.fileSizeUpper = 1;
          break;
        case 2:
          query.fileSizeFloor = 1;
          query.fileSizeUpper = 10;
          break;
        case 3:
          query.fileSizeFloor = 10;
          break;
        default:
          query.fileSizeFloor = -1;
          query.fileSizeUpper = -1;
          break;
      }
      if (this.evidenceNames == "") {
        query.evidenceNameWildcard = "none";
      } else {
        query.evidenceNameWildcard = this.evidenceNames;
      }
      try {
        await reservationList(query).then((result) => {
          this.tableData = [];
          //this.pageTotal = result.meta.total;
          var num = 0;
          result.data.forEach((item, index) => {
            let tableData = {};
            (tableData.evidenceId = result.data[index].evidenceId),
              (tableData.evidenceName = result.data[index].evidenceName),
              (tableData.blockchainTime = result.data[index].blockchainTime),
              (tableData.evidenceType = result.data[index].evidenceType),
              (tableData.fileHash = result.data[index].fileHash),
              (tableData.evidenceBlockchainId =
                result.data[index].evidenceBlockchainId),
              (tableData.organizationName =
                result.data[index].organizationName),
              (tableData.notarizationStartTime =
                result.data[index].notarizationStartTime),
              (tableData.notarizationStatus =
                result.data[index].notarizationStatus),
              (tableData.notarizationMoney =
                result.data[index].notarizationMoney),
              this.tableData.push(tableData);
            num = num + 1;
          });
          this.pageTotal = num;
        });
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
