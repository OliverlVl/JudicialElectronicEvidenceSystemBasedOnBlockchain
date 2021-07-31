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
      <el-button type="warning">上链时间</el-button>

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
       <el-button type="warning">证据类型</el-button>
       <el-input
        v-model="inputMF1"
        placeholder="请输入证据类型"
        style="width: 120px"
      ></el-input>
      ~
       <el-input
        v-model="inputMF2"
        placeholder="请输入证据类型）"
        style="width: 120px"
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
      <el-button type="warning">公证机构</el-button>
      <el-input
        v-model="inputMF3"
        placeholder="请输入公证机构名称"
        style="width: 408px"
      ></el-input>
     
    <el-select v-model="value_protocal" placeholder="请选择" style="padding-left:30px">
        <el-option
          v-for="item in options_protocal"
          :key="item.value_protocal"
          :label="item.label_protocal"
          :value="item.value_protocal"
        >
        </el-option>
      </el-select>
       <el-button type="warning">用户名称</el-button>
       <el-input
        v-model="inputMF4"
        placeholder="请输入用户名称（默认全部）"
        style="width: 260px"
      ></el-input>
    </div>
    <div class="search_container">
      
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
      <el-button type="warning">证据编号</el-button>
      <el-input
        v-model="inputMF5"
        placeholder="请输入电子证据编号(默认全部)"
        style="width: 408px"
      ></el-input> 
      <el-select v-model="value_save" placeholder="请选择" style="padding-left:30px">
        <el-option
          v-for="item in options_save"
          :key="item.value_save"
          :label="item.label_save"
          :value="item.value_save"
        >
        </el-option>
      </el-select>
       <el-button type="warning">保管状态</el-button>
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

  <!-- 列表 -->
  <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户">
                <span>{{ props.row.evidence_source }}</span>
              </el-form-item>
              <el-form-item label="证据类型">
                <span>{{ props.row.evidence_type }}</span>
              </el-form-item>
              <el-form-item label="所属区块链">
                <span>{{ props.row.block_chain }}</span>
              </el-form-item>
              <el-form-item label="证据hash">
                <span>{{ props.row.evidence_hash }}</span>
              </el-form-item>
              <el-form-item label="区块交易ID">
                <span>{{ props.row.transaction_hash }}</span>
              </el-form-item>
              <el-form-item label="公证服务提供方">
                <span>{{ props.row.notarization_institute }}</span>
              </el-form-item>
              <el-form-item label="证据保管状态">
                <span>{{ props.row.save_status }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="证据编号" prop="id"></el-table-column>
        <el-table-column label="证据名称" prop="evidence_name"></el-table-column>
        <el-table-column label="上链时间" prop="block_time"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button size="small" type="primary" @click="handlePublic(scope.row)">申请公证</el-button> -->
            <el-button size="small" type="primary" @click="handleDown(scope.row)">在线查看</el-button>
            <!-- <el-button size="small" type="primary" @click="handleShare(scope.$index, scope.row)">分享</el-button> -->
            <!-- <el-button size="small" @click="shareDetail(scope.row)">分享详情</el-button> -->
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
    <!-- 共享对象弹窗-->
    <el-dialog
      title="存证共享对象详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-table :data="tableData3" height="250" border style="width: 100%">
        <el-table-column prop="id" label="分享id" width="180"></el-table-column>
        <el-table-column prop="share_telephone" label="分享对象手机号" width="180"></el-table-column>
        <el-table-column prop="share_time" label="分享时间"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 申请公证弹窗-->
    <el-dialog
      title="公证申请"
      :visible.sync="dialogVisible_notarization"
      size="tiny"
      :before-close="handleClose"
    >
      <el-select v-model="value_apply" filterable placeholder="选择申请类型">
        <el-option
          v-for="item in options_apply"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value_notarization" filterable placeholder="选择公证机构">
        <el-option
          v-for="item in options_notarization"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_notarization = false">取 消</el-button>
        <el-button type="primary" @click="handlePublic2()">确 定</el-button>
      </span>
    </el-dialog>
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
      options_save:[ {
          value_save: "选项1",
          label_save: "AND",
        },
        {
          value_save: "选项2",
          label_save: "OR",
        },
        {
          value_save: "选项3",
          label_save: "NOT",
        },],
      value_protocal2: "OR",
      value_protocal: "AND",
      value_save:"NOT",
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
      // 保管状态选择器
      options_trade: [
        {
          value_trade: "选项1",
          label_trade: "即将过期",
        },
        {
          value_trade: "选项2",
          label_trade: "未过期",
        },
        {
          value_trade: "选项3",
          label_trade: "已过期",
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
                (tableData.block_time = result.data[index].time),
                (tableData.evidence_name = result.data[index].evidence_name),
                (tableData.evidence_type = result.data[index].evidence_type),
                (tableData.evidence_hash = result.data[index].evidence_hash),
                (tableData.block_chain = "司法链"),
                (tableData.notarization_institute = result.data[index].notarization_institute),
                (tableData.evidence_source = result.data[index].user),
                (tableData.transaction_hash = result.data[index].trade_hash),
                (tableData.save_status = "未过期"),
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
