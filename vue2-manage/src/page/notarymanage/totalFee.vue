<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container">
      
      <el-button>交易时间</el-button>
      <el-date-picker
        v-model="value_time"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="selectTime"
      ></el-date-picker>
     
      <el-button type="primary" @click="handleSearch()">搜索</el-button>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="交易编号" prop="id"></el-table-column>
        <el-table-column label="交易类型" prop="type"></el-table-column>
        <el-table-column label="交易时间" prop="time"></el-table-column>
        <el-table-column label="交易金额" prop="money"></el-table-column>
        <el-table-column label="账户余额" prop="left_money"></el-table-column>
        <el-table-column label="交易状态" prop="status"></el-table-column>
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
  notarizationList,
  reservationList,
  delReservation
} from "@/api/getData";
export default {
  data() {
    return {
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
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value_time: "",
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
    this.telephone = localStorage.getItem("telephone");
    this.initData();
   
  },
  computed: {},
  components: {
    headTop
  },
  methods: {
    
    // 初始化数据
    async initData() {
      try {
        const query = {
          telephone: this.telephone,
          limit: this.pageSize,
          page: this.pageIndex
        };
        await reservationList(query).then(result => {
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
      const query = {
        start_time: this.start_time,
        end_time: this.end_time,
        notarization_id: this.value_apply
      };
      //   console.log(query);
      try {
        await reservationList(query).then(result => {
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
    
  }
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
