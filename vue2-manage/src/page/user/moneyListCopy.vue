<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- 高级搜索-->
    <div class="search_container">
      <el-select v-model="value_protocal" placeholder="请选择">
        <el-option
          v-for="item in options_protocal"
          :key="item.value_protocal"
          :label="item.label_protocal"
          :value="item.value_protocal"
        >
        </el-option>
      </el-select>
      <el-button type="warning">交易时间</el-button>

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
         <el-select v-model="value_protocal2" placeholder="请选择"   style="padding-left: 30px">
        <el-option
          v-for="item in options_protocal2"
          :key="item.value_protocal2"
          :label="item.label_protocal2"
          :value="item.value_protocal2"
        >
        </el-option>
      </el-select>
       <el-button type="warning">交易类型</el-button>
       <el-input
        v-model="inputMF"
        placeholder="请输入交易类型（默认无）"
        style="width: 220px"
      ></el-input>
    </div>
    <div class="search_container">
      <el-select v-model="value_protocal" placeholder="请选择">
        <el-option
          v-for="item in options_protocal"
          :key="item.value_protocal"
          :label="item.label_protocal"
          :value="item.value_protocal"
        >
        </el-option>
      </el-select>
      <el-button type="warning">交易金额</el-button>
      <el-input
        v-model="inputMF"
        placeholder="请输入交易金额下限"
        style="width: 192px"
      ></el-input>
      ~
      <el-input
        v-model="inputMF"
        placeholder="请输入交易金额上限"
        style="width: 195px"
      ></el-input>
     
      <el-select v-model="value_protocal2" placeholder="请选择" style="padding-left: 30px"  >
        <el-option
          v-for="item in options_protocal2"
          :key="item.value_protocal2"
          :label="item.label_protocal2"
          :value="item.value_protocal2"
        >
        </el-option>
      </el-select>
       <el-button type="warning">交易类型</el-button>
       <el-input
        v-model="inputMF"
        placeholder="请输入交易类型（默认无）"
        style="width: 220px"
      ></el-input>
    </div>
    <div class="search_container">
      <el-select v-model="value_protocal" placeholder="请选择" >
        <el-option
          v-for="item in options_protocal"
          :key="item.value_protocal"
          :label="item.label_protocal"
          :value="item.value_protocal"
        >
        </el-option>
      </el-select>
       <el-button type="warning">交易状态</el-button>
        <el-select v-model="value_trade" placeholder="请选择"  >
        <el-option
          v-for="item in options_trade"
          :key="item.value_trade"
          :label="item.label_trade"
          :value="item.value_trade"
        >
        </el-option>
      </el-select>
       
        <el-switch
        v-model="value_crypto"
        on-text="解密"
        off-text="加密"
        style="margin-left: 30px"
      ></el-switch>
      <el-button
        type="primary"
        @click="handleSearch()"
        style="margin-left: 30px"
        >搜索</el-button
      >
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
  delReservation,
  tradeList,
} from "@/api/getData";
export default {
  data() {
    return {
      // 协议选择器
      options_protocal: [
        {
          value_protocal: "选项1",
          label_protocal: "AND",
        },
        {
          value_protocal: "选项2",
          label_protocal: "OR",
        },
        {
          value_protocal: "选项3",
          label_protocal: "NOT",
        },
      ],
       options_protocal2: [
        {
          value_protocal2: "选项1",
          label_protocal2: "AND",
        },
        {
          value_protocal2: "选项2",
          label_protocal2: "OR",
        },
        {
          value_protocal2: "选项3",
          label_protocal2: "NOT",
        },
      ],
      value_protocal2: "OR",
      value_protocal: "AND",
      //时间选择器
      valuedate1:"",
      valuedate2:"",
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
      // 是否解密
      value_crypto: true,
      // 交易状态选择器
      options_trade: [
        {
          value_trade: "选项1",
          label_trade: "交易成功",
        },
        {
          value_trade: "选项2",
          label_trade: "交易失败",
        },
        {
          value_trade: "选项3",
          label_trade: "交易进行中",
        },
      ],
      value_trade: "全部状态",
    };
  },
  created() {
    this.telephone = localStorage.getItem("telephone");
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
          telephone: this.telephone,
          limit: this.pageSize,
          page: this.pageIndex,
        };
        await tradeList(query).then((result) => {
          if (result.error_code == 0) {
            this.tableData = [];
            this.pageTotal = result.meta.total;
            result.data.forEach((item, index) => {
              let tableData = {};

              (tableData.id = result.data[index].id),
                (tableData.type = result.data[index].type),
                (tableData.time = result.data[index].time),
                (tableData.money = result.data[index].money),
                (tableData.left_money = result.data[index].left_money),
                (tableData.status = result.data[index].status),
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
