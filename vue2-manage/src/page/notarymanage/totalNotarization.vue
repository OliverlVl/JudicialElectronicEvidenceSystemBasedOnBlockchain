<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container">
      申办用户:
       <el-input
        v-model="inputMF4"
        placeholder="请输入申办用户名称(默认全部)"
        style="width: 280px"
      ></el-input>
      <el-switch v-model="value_crypto" on-text="解密" off-text="加密" style="padding-right:30px" ></el-switch>
      <el-button type="primary" @click="handleSearch()"  >搜索</el-button>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="公证服务机构">
                <span>{{ props.row.notarization_agent }}</span>
              </el-form-item>
              <el-form-item label="申办状态">
                <span>{{ props.row.order_status }}</span>
              </el-form-item>
              <el-form-item label="支付金额">
                <span>{{ props.row.pay_num }}</span>
              </el-form-item>
              <el-form-item label="支付状态">
                <span>{{ props.row.pay_status }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="申办编号" prop="id"></el-table-column>
        <el-table-column label="申请事项" prop="notarization_name"></el-table-column>
        <el-table-column label="申请人" prop=""></el-table-column>
        <el-table-column label="申请时间" prop="apply_time"></el-table-column>       
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button  size="small" type="primary" @click="handleDel(scope.$index, scope.row)">在线查看</el-button>
            <el-button  size="small" type="warning" @click="handleDel(scope.$index, scope.row)">审核通过</el-button>
            <el-button  size="small" type="danger" @click="handleDel(scope.$index, scope.row)">审核不通过</el-button>
          </template>
        </el-table-column>
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
      // 公证机构
      value_agent:"",
      options_agent: [],
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      telephone: "",
      // 加解密
      value_crypto: true,

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
            this.pageTotal = result.meta.total;
            result.data.forEach((item, index) => {
              let tableData = {};
              console.log(result.data[index]);
              (tableData.id = result.data[index].id),

            (tableData.notarization_agent = result.data[index].institute),

             (tableData.notarization_name = result.data[index].notarization),

              (tableData.order_status = result.data[index].orderStatus),

               (tableData.pay_status = result.data[index].payStatus),

                 (tableData.pay_num = result.data[index].money),

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
    handleDel(){
        this.$message.success('审核成功');
    }
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
