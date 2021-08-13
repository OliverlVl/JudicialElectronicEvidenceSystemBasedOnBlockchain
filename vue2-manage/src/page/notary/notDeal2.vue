<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文件大小">
                <span>{{ props.row.fileSize }}</span>
              </el-form-item>
              <el-form-item label="文件哈希值">
                <span>{{ props.row.fileHash }}</span>
              </el-form-item>
              <el-form-item label="存证时间">
                <span>{{ props.row.evidenceTime }}</span>
              </el-form-item>
              <el-form-item label="上链时间">
                <span>{{ props.row.blockchainTime }}</span>
              </el-form-item>
              <el-form-item label="存证区块链交易ID">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="公证状态">
                <span>{{ props.row.notarizationStatus }}</span>
              </el-form-item>
              <el-form-item label="公证金额">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
              <el-form-item label="交易支付状态">
                <span>{{ props.row.transactionStatus }}</span>
              </el-form-item>
              <el-form-item label="公证申请时间">
                <span>{{ props.row.notarizationStartTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="存证编号" prop="evidenceId"></el-table-column>
        <el-table-column label="申请人" prop="userId"></el-table-column>
        <el-table-column label="存证类型" prop="evidenceType"></el-table-column>
        <el-table-column label="存证名称" prop="evidenceName"></el-table-column>
        <el-table-column label="申请事项" prop="notarizationMatters"></el-table-column>
        <el-table-column label="公证类型" prop="notarizationType"></el-table-column>     
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="notarySuccess(scope.row.evidenceId,this.notary_id)" >通过</el-button>
            <el-button size="small" type="danger" @click="notaryRefuse(scope.row.evidenceId,this.notary_id)" >拒绝</el-button>
            <!--
            <el-button  size="small" type="primary" @click="handleDel(scope.$index, scope.row)">在线查看</el-button>
            <el-button  size="small" type="warning" @click="handleDel(scope.$index, scope.row)">审核通过</el-button>
            <el-button  size="small" type="danger" @click="handleDel(scope.$index, scope.row)">审核不通过</el-button>
            -->
          </template>
        </el-table-column>
      </el-table>
      <div class="search_container">      
      <el-switch v-model="decrypt" on-text="解密" off-text="加密" @change="initData()" ></el-switch>
    </div>
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
  notarRecord,
} from "@/api/getData";
export default {
  data() {
    return {
      //解密
      decrypt: true,
      decryptFlag: 1,
      // 表格
      tableData: [{}],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      //公证员ID
      notary_id: "",

    };
  },
  created() {
    this.decryptFlag = 1;
    this.notary_id = localStorage.getItem("notaryId");
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
        if (this.decrypt) {
          this.decryptFlag = 1;
        } else {
          this.decryptFlag = 0;
        }
        const query = {
          decryptFlag: this.decryptFlag,
          notaryId: this.notary_id,
          dealType: "1",
        };
        var num = 0;
        //查询待处理列表
        await notarRecord(query).then(result => {
          if (result.state == true) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });//foreach结束
            this.pageTotal = this.tableData.length;
          }else {
            throw new Error("获取数据失败");
          }//if结束
        });//await结束
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
    async notarySuccess(evidenceId,notaryId){
        const query = {
          evidence_id: evidenceId,
          notary_id: notaryId,
          acceptFlag: 1,
        };
        let result = await audit(query);
        if (result.status == true){
          alert("你已通过该申请");
        }else{
          alert("操作失败" + result.message);
        }
    },
    async notaryRefuse(evidenceId,notaryId){
        const query = {         
          evidence_id: evidenceId,
          notary_id: notaryId,
          acceptFlag: 0,
        };
        let result = await audit(query);
        if (result.status == true){
          alert("你已拒绝该申请");
        }else{
          alert("操作失败" + result.message);
        }
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
