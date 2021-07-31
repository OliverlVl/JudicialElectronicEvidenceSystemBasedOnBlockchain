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
      <el-button type="warning">申请时间</el-button>
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
       <el-button type="warning">用户年龄</el-button>
       <el-select v-model="value_compare" placeholder="请选择">
        <el-option
          v-for="item in options_compare"
          :key="item.value_compare"
          :label="item.label_compare"
          :value="item.value_compare"
        >
        </el-option>
      </el-select>
       <el-input
        v-model="inputMF1"
        placeholder="请输入用户年龄"
        style="width: 145px"
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
      <el-button type="warning">申办事项</el-button>
      <el-input
        v-model="inputMF3"
        placeholder="请输入申办事项(默认全部)"
        style="width: 408px"
      ></el-input>
      <el-select v-model="value_protocal2" placeholder="请选择"   style="padding-left: 30px">
        <el-option
          v-for="item in options_protocal2"
          :key="item.value_protocal2"
          :label="item.label_protocal2"
          :value="item.value_protocal2"
        >
        </el-option>
      </el-select>
       <el-button type="warning">用户年龄</el-button>
       <el-select v-model="value_compare2" placeholder="请选择">
        <el-option
          v-for="item in options_compare"
          :key="item.value_compare"
          :label="item.label_compare"
          :value="item.value_compare"
        >
        </el-option>
      </el-select>
       <el-input
        v-model="inputMF1"
        placeholder="请输入用户年龄"
        style="width: 145px"
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
      <el-button type="warning">申办编号</el-button>
      <el-input
        v-model="inputMF5"
        placeholder="请输入公证申办编号(默认全部)"
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
       <el-button type="warning">申办状态</el-button>
        <el-select v-model="value_trade1" placeholder="请选择"  >
        <el-option
          v-for="item in options_trade"
          :key="item.value_trade"
          :label="item.label_trade"
          :value="item.value_trade"
        >
        </el-option>
      </el-select>
      ~
       <el-select v-model="value_trade2" placeholder="请选择"  >
        <el-option
          v-for="item in options_trade"
          :key="item.value_trade"
          :label="item.label_trade"
          :value="item.value_trade"
        >
        </el-option>
      </el-select>

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
       <el-button type="warning">申办用户</el-button>
       <el-input
        v-model="inputMF4"
        placeholder="请输入申办用户名称(默认全部)"
        style="width: 280px"
      ></el-input>
     <el-switch
        v-model="value_crypto"
        on-text="解密"
        off-text="加密"
      
      ></el-switch>
      <el-button
        type="primary"
        @click="handleSearch()"
        style="margin-right: 30px"
        >搜索
        </el-button>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="申办用户">
                <span>{{ props.row.user }}</span>
              </el-form-item>
              <el-form-item label="用户年龄">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="用户编号">
                <span>{{ props.row.user_num }}</span>
              </el-form-item>
              <el-form-item label="申办状态">
                <span>{{ props.row.apply_status }}</span>
              </el-form-item>
               <el-form-item label="申办区块交易ID">
                <span>{{ props.row.apply_hash }}</span>
              </el-form-item>
              <el-form-item label="审核区块交易ID">
                <span>{{ props.row.deal_hash }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="申办编号" prop="id"></el-table-column>
        <el-table-column label="申请事项" prop="notarization_name"></el-table-column>
        <el-table-column label="申请时间" prop="apply_time"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button  size="small" type="danger" @click="handleDel(scope.$index, scope.row)">撤销申办</el-button>
          </template>
        </el-table-column> -->
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
  agentList,
  notarizationApplyList,
  notarizationApplyListEncrypt,
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
         options_compare:[ {
          value_compare: "选项1",
          label_compare: "大于",
        },
        {
          value_compare: "选项2",
          label_compare: "小于等于",
        },
        {
          value_compare: "选项3",
          label_compare: "大于",
        },],
      value_protocal2: "OR",
      value_protocal: "AND",
      value_save:"NOT",
      value_compare:"大于等于",
      //时间选择器
      valuedate1:"",
      valuedate2:"",
      // 公证机构
      value_agent:"",
      options_agent: [],
      // 订单状态
      value_order:"",
      options_order: [{
          value: '不限',
          label: '不限'
        },{
          value: '0',
          label: '失败'
        }, {
          value: '1',
          label: '成功'
        }, {
          value: '2',
          label: '审核中'
        }],
      // 支付状态
      value_pay:"",
        options_pay: [{
          value: '0',
          label: '不限'
        },{
          value: '1',
          label: '未支付'
        }, {
          value: '2',
          label: '已支付'
        }, {
          value: '3',
          label: '退款中'
        }, {
          value: '4',
          label: '已退款'
        }, {
          value: '5',
          label: '线下支付'
        }],
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      telephone: "",
      // 加解密
      value_crypto: true,
      // 保管状态选择器
      options_trade: [
        {
          value_trade: "选项1",
          label_trade: "拒绝受理",
        },
        {
          value_trade: "选项2",
          label_trade: "撤销中",
        },
        {
          value_trade: "选项3",
          label_trade: "已撤回",
        },
      ],
      value_trade1: "全部状态",
      value_trade2: "全部状态",
      value_compare2: "小于",
    };
  },
  created() {
    this.telephone = localStorage.getItem("telephone");
    this.initData();
    this.getAgent();
  },
  computed: {},
  components: {
    headTop
  },
  methods: {
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
          // telephone: this.telephone,
          limit: this.pageSize,
          page: this.pageIndex
        };
        await notarizationApplyListEncrypt(query).then(result => {
          if (result.error_code == 0) {
            this.tableData = [];
            console.log(result.data);
            this.pageTotal = result.meta.total;
            result.data.forEach((item, index) => {
              let tableData = {};

              // switch (result.data[index].status) {
              //   case 1:
              //     tableData.reservation_status = "预约成功";
              //     break;
              //   case 2:
              //     tableData.reservation_status = "预约失败";
              //     break;
              //   case 3:
              //     tableData.reservation_status = "处理完毕";
              //     break;
              //   case 4:
              //     tableData.reservation_status = "预约处理中";
              //     break;
              //   case 5:
              //     tableData.reservation_status = "预约已撤销";
              //     break;
              // }
              console.log(result.data[index]);
              (tableData.id = result.data[index].id),
              (tableData.notarization_agent = result.data[index].institute),
              (tableData.notarization_name = result.data[index].notarization),
              (tableData.order_status = result.data[index].orderStatus),
              (tableData.pay_status = result.data[index].payStatus),
              (tableData.pay_num = result.data[index].money),
              (tableData.apply_time = result.data[index].created_at),
              (tableData.user = "李田"),
              (tableData.age = result.data[index].age),
              (tableData.user_num = result.data[index].user_num),
              (tableData.apply_status = result.data[index].apply_status),
              (tableData.apply_hash = result.data[index].apply_hash),
              (tableData.deal_hash = result.data[index].deal_hash),
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
