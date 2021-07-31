<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- 头部查询-->
    <div class="search_container">
      <el-button type="primary" @click="handleAdd()" style="margin-right:150px">新增存证</el-button>
      <el-button>上链时间</el-button>
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
      <el-input
        placeholder="请输入内容"
        v-model="input_search"
        class="input-with-select"
        style="margin-left:30px; width:390px;"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="证据编号" value="1"></el-option>
          <el-option label="证据名称" value="2"></el-option>
          <el-option label="证据类型" value="3"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" @click="handleSearch()">搜索</el-button>
    </div>
    <!-- 记录列表-->
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="存证来源">
                <span>{{ props.row.evidence_source }}</span>
              </el-form-item>
              <el-form-item label="存证类型">
                <span>{{ props.row.evidence_type }}</span>
              </el-form-item>
              <el-form-item label="所属区块链">
                <span>{{ props.row.block_chain }}</span>
              </el-form-item>
              <el-form-item label="存证hash（位置）">
                <span>{{ props.row.storage_hash }}</span>
              </el-form-item>
              <el-form-item label="区块交易ID">
                <span>{{ props.row.transaction_hash }}</span>
              </el-form-item>
              <el-form-item label="公证服务提供方">
                <span>{{ props.row.notarizaiton_institute }}</span>
              </el-form-item>
              <el-form-item label="公证申请时间">
                <span>{{ props.row.notarization_time }}</span>
              </el-form-item>
              <el-form-item label="公证费用">
                <span>{{ props.row.notarization_money }}</span>
              </el-form-item>
              <el-form-item label="公证状态">
                <span>{{ props.row.notarization_status }}</span>
              </el-form-item>
              <el-form-item label="公证交易hash">
                <span>{{ props.row.notarizaiton_transaction_hash }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="证据编号" prop="id"></el-table-column>
        <el-table-column label="存证名称" prop="evidence_name"></el-table-column>
        <el-table-column label="上链时间" prop="block_time"></el-table-column>
        <el-table-column label="操作" width="360">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handlePublic(scope.row)">申请公证</el-button>
            <el-button size="small" @click="handleDown(scope.row)">在线查看</el-button>
            <el-button size="small" type="primary" @click="handleShare(scope.$index, scope.row)">分享</el-button>
            <el-button size="small" @click="shareDetail(scope.row)">分享详情</el-button>
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
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="申请类型">
       <el-input v-model="form.type"></el-input>
      </el-form-item>
       <el-form-item label="公证机构">
       <el-input v-model="form.institute"></el-input>
      </el-form-item>
    </el-form>
    
      <!-- <el-select v-model="value_notarization" filterable placeholder="公证机构">
        <el-option
          v-for="item in options_notarization"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
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
  storageEvidenceList,
  notarizationStatus,
  evidenceShare,
  evidenceShareDetail,
  notarizationList,
  agentList
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
      // 共享详情弹窗
      dialogVisible: false,
      tableData3: [],
      // 公证申请弹窗
      dialogVisible_notarization: false,
      value_apply: "",
      options_apply: "",
      param_notarization: {
        id: "",
        notarization_id: "",
        notarization_status: 2,
        agent: ""
      },
      value_notarization: "",
      options_notarization: [],
       form: {},
    };
  },
  created() {
    this.telephone = localStorage.getItem("telephone");
    this.initData();
    this.getNotarization();
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
        this.options_notarization = [];
        result.data.forEach((item, index) => {
          let tableData = {};
          (tableData.value = result.data[index].id),
            (tableData.label = result.data[index].agent),
            this.options_notarization.push(tableData);
        });
      } else if (result.error_code != 0) {
        throw new Error("获取数据失败");
      }
    },
    // 获取公证事项列表
    async getNotarization() {
      const result = await notarizationList();
      if (result.error_code == 0) {
        this.options_apply = [];
        result.data.forEach((item, index) => {
          let tableData = {};
          (tableData.value = result.data[index].id),
            (tableData.label = result.data[index].notarization_name),
            this.options_apply.push(tableData);
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
          page: this.pageIndex
        };
        await storageEvidenceList(query).then(result => {
          if (result.error_code == 0) {
            this.tableData = [];
            this.pageTotal = result.meta.total;
            result.data.forEach((item, index) => {
              let tableData = {};
              switch (result.data[index].evidence_type) {
                case 1:
                  tableData.evidence_type = "文件存证";
                  break;
                case 2:
                  tableData.evidence_type = "内容存证";
                  break;
                case 3:
                  tableData.evidence_type = "网页取证";
                  break;
                case 4:
                  tableData.evidence_type = "录音取证";
                  break;
                case 5:
                  tableData.evidence_type = "录像取证";
                  break;
                case 6:
                  tableData.evidence_type = "拍照取证";
                  break;
                case 7:
                  tableData.evidence_type = "录屏取证";
                  break;
              }
              switch (result.data[index].notarization_status) {
                case 0:
                  tableData.notarization_status = "公证失败";
                  break;
                case 1:
                  tableData.notarization_status = "公证成功";
                  break;
                case 2:
                  tableData.notarization_status = "公证审核中";
                  break;
                default:
                  tableData.notarization_status = "未申请公证";
                  break;
              }
                (tableData.id = result.data[index].id),
                (tableData.block_chain = result.data[index].block_chain),
                (tableData.storage_hash = result.data[index].storage_hash),
                (tableData.evidence_name = result.data[index].evidence_name),
                (tableData.notarization_time = "暂无"),
                (tableData.notarization_money ="暂无"),
                (tableData.block_time = result.data[index].created_at),
                (tableData.evidence_source = "个人存证"),
                (tableData.transaction_hash = result.data[index].transaction_hash),
                (tableData.notarizaiton_institute = "福建省福州市晋安区公证处"),
                (tableData.notarizaiton_transaction_hash = "暂无"),
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
    // 申请公证
    async handlePublic(row) {
      this.dialogVisible_notarization = true;
      this.param_notarization.id = row.id;
    },
    async handlePublic2() {
      try {
        this.param_notarization.notarization_id = this.value_apply;
        this.param_notarization.agent = this.value_notarization;
        console.log(this.param_notarization);
        const res = await notarizationStatus(this.param_notarization);
        if (res.error_code == 0) {
          this.$message({
            type: "success",
            message: "申请公证成功"
          });
          // this.initData();
          // this.value_apply = "";
        } else {
          throw new Error("申请公证失败");
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: err.message
        });
      }
    },
    // 证据查看
    async handleDown(row) {
      window.open("http://localhost:8080/ipfs/" + row.storage_hash, "_blank"); // 新窗口打开外链接
      // this.$router.push("http://localhost:8080/ipfs/"+row.storage_hash);
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
      let evidence_type = "",
        id = "",
        evidence_name = "";
      switch (this.select) {
        case "1":
          id = this.input_search;
          break;
        case "2":
          evidence_name = this.input_search;
          break;
        case "3":
          switch (this.input_search) {
            case "文件存证":
              evidence_type = 1;
              break;
            case "内容存证":
              evidence_type = 2;
              break;
          }
          break;
      }
      const query = {
        start_time: this.start_time,
        end_time: this.end_time,
        id: id,
        evidence_name: evidence_name,
        evidence_type: evidence_type
      };
      //   console.log(query);
      try {
        await storageEvidenceList(query).then(result => {
          if (result.error_code == 0) {
            this.tableData = [];
            this.pageTotal = result.meta.total;
            result.data.forEach((item, index) => {
              let tableData = {};
              switch (result.data[index].evidence_type) {
                case 1:
                  tableData.evidence_type = "文件存证";
                  break;
                case 2:
                  tableData.evidence_type = "内容存证";
                  break;
                case 3:
                  tableData.evidence_type = "网页取证";
                  break;
                case 4:
                  tableData.evidence_type = "录音取证";
                  break;
                case 5:
                  tableData.evidence_type = "录像取证";
                  break;
                case 6:
                  tableData.evidence_type = "拍照取证";
                  break;
                case 7:
                  tableData.evidence_type = "录屏取证";
                  break;
              }
              switch (result.data[index].notarization_status) {
                case 0:
                  tableData.notarization_status = "公证失败";
                  break;
                case 1:
                  tableData.notarization_status = "公证成功";
                  break;
                case 2:
                  tableData.notarization_status = "公证审核中";
                  break;
                default:
                  tableData.notarization_status = "未申请公证";
                  break;
              }
              (tableData.id = result.data[index].id),
                (tableData.block_chain = result.data[index].block_chain),
                (tableData.storage_hash = result.data[index].storage_hash),
                (tableData.evidence_name = result.data[index].evidence_name),
                (tableData.notarization_time =
                  result.data[index].notarization_time),
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
    // 分享
    handleShare(index, row) {
      this.$prompt("请输入分享对象手机号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == null) {
            this.$message({
              type: "info",
              message: "请输入共享对象手机号码"
            });
            return;
          }
          evidenceShare({
            telephone: localStorage.getItem("telephone"),
            share_telephone: value,
            evidence_id: row.id
          }).then(result => {
            if (result.error_code == 0) {
              this.$message({
                type: "success",
                message: "共享证据成功"
              });
            } else if (result.error_code != 0) {
              this.$message({
                type: "error",
                message: "共享证据失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 共享对象详情
    async shareDetail(row) {
      this.dialogVisible = true;
      const query = {
        telephone: localStorage.getItem("telephone"),
        id: row.id
      };
      const result = await evidenceShareDetail(query);
      console.log(result);
      if (result.error_code == 0) {
        this.tableData3 = [];
        result.data.forEach((item, index) => {
          let tableData = {};

          (tableData.id = result.data[index].id),
            (tableData.share_telephone = result.data[index].share_telephone),
            (tableData.share_time = result.data[index].created_at),
            this.tableData3.push(tableData);
        });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
