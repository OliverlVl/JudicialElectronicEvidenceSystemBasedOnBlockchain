<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <el-input
        v-model="searchQuery.usernameWildcard"
        placeholder="请输入申请人"
        clearable
        style="width: 390px; margin-left: 3%"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getNotaryRecord()"
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
      <el-form label-width="35%">
        <el-form-item label="存证名称:">
          <el-input
            v-model="searchQuery.evidenceName"
            placeholder="请输入存证名称"
            style="width: 240px"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="存证类型:">
          <el-select
            v-model="searchQuery.evidenceType"
            filterable
            style="width: 240px"
            placeholder="请选择"
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
            v-model="searchQuery.notarizationType"
            placeholder="请选择"
            style="width: 240px"
            filterable
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
          <el-col :span="6">
            <el-input v-model="MoneyFloor" placeholder="最低金额" clearable>
            </el-input>
          </el-col>
          <el-col class="line" :span="1" align="middle">-</el-col>
          <el-col :span="6">
            <el-input v-model="MoneyUpper" placeholder="最高金额" clearable>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button
          @click="
            getNotaryRecord();
            searchVisible = false;
          "
          type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!--公证成功弹窗-->
    <el-dialog
      title="提示信息"
      :visible.sync="notarySuccessVisible"
      size="tiny"
      style="width: 60%; margin: 0 auto"
      :append-to-body="true"
    >
      <spam
        style="text-align: center; display: block; font-size: 20px; color: red"
        >是否确定通过该公证申请?</spam
      >
      <div slot="footer">
        <el-button @click="notarySuccessVisible = false">取 消</el-button>
        <el-button type="primary" @click="notarySuccess()">确 定</el-button>
      </div>
    </el-dialog>

    <!--公证失败弹窗-->
    <el-dialog
      title="公证失败"
      :visible.sync="notaryRefuseVisible"
      size="tiny"
      style="width: 80%; margin: 0 auto"
      :append-to-body="true"
    >
      <span style="font-size: 18px; margin-left: 10%">回复信息：</span>
      <br />
      <br />
      <el-input
        type="textarea"
        placeholder="请输入回复给客户的信息"
        v-model="notarizationInformation"
        style="margin-left: 10%; width: 80%"
        :rows="10"
        clearable
      ></el-input>
      <div slot="footer">
        <el-button @click="notaryRefuseVisible = false">取 消</el-button>
        <el-button type="primary" @click="notaryRefuse()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="table_container">
      <el-table :data="pageData" stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand">
              <el-form-item label="文件目录:">
                <span>{{ props.row.filePath }}</span>
              </el-form-item>
              <el-form-item label="文件大小(KB):">
                <span>{{ props.row.fileSize }}</span>
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
              <el-form-item label="存证区块链交易ID:">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="公证申请区块链交易ID:">
                <span>{{ props.row.notarizationBlockchainIdStart }}</span>
              </el-form-item>
              <el-form-item label="公证金额(￥):">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
              <el-form-item label="交易支付状态:">
                <span>{{ props.row.transactionStatus }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          :index="indexMethod"
          width="60px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="申请人"
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column
          label="存证类型"
          prop="evidenceType"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="存证名称"
          prop="evidenceName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="公证类型"
          prop="notarizationType"
          align="center"
        ></el-table-column>
        <el-table-column
          label="公证申请时间"
          width="160px"
          prop="notarizationStartTime"
          align="center"
        ></el-table-column>
        <el-table-column label="公证文件" width="140px" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleDown(scope.row)"
              >下载公证材料</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="success"
              @click="notarySuccessHandler(scope.row.evidenceId)"
              >通过</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="notaryRefuseHandler(scope.row.evidenceId)"
              >拒绝</el-button
            >
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
import {
  notarRecord,
  audit,
  eviTypeQuery,
  noTypeQuery,
  notarmanageRecord,
} from "@/api/getData";
export default {
  data() {
    return {
      MoneyUpper: "",
      MoneyFloor: "",
      pageData: [], // 分页数据
      // 公证成功失败弹窗可视化
      notarySuccessVisible: false,
      notaryRefuseVisible: false,
      evidenceId: "", // 存证id
      notarizationInformation: "", // 回复信息
      //解密
      searchVisible: false,
      decrypt_flag: true,
      moneyState: "",
      // 表格
      tableData: [],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      searchQuery: {
        notarizationStatus: "2",
        decryptFlag: 1,
      },
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
    };
  },
  created() {
    this.getNotaryType();
    this.getEvidenceType();
    this.getNotaryRecord();
  },
  computed: {},
  components: {
    headTop,
  },
  methods: {
    // 序号
    indexMethod(index) {
      // index 从 0 开始的
      return (this.pageIndex - 1) * this.pageSize + index + 1;
    },
    //获取公证类型
    async getNotaryType() {
      await noTypeQuery().then((typeres) => {
        if (typeres.status) {
          typeres.data.forEach((item) => {
            this.notarization_type.push(item);
          });
        } else {
          console.log("公证类型获取失败");
        }
      });
    },
    //获取存证类型
    async getEvidenceType() {
      await eviTypeQuery().then((typeres) => {
        if (typeres.status) {
          typeres.data.forEach((item) => {
            this.evidence_type.push(item);
          });
        } else {
          console.log("存证类型获取失败");
        }
      });
    },
    // 处理导航页
    handlePageChange(val) {
      this.pageIndex = val;
      if (val * this.pageSize > this.pageTotal) {
        this.pageData = this.tableData.slice((val - 1) * this.pageSize);
      } else {
        this.pageData = this.tableData.slice(
          (val - 1) * this.pageSize,
          val * this.pageSize
        );
      }
      this.dealDataGet(); //处理得到的数据
    },
    // 成功弹窗
    async notarySuccessHandler(evidenceId) {
      this.notarySuccessVisible = true;
      this.evidenceId = evidenceId;
    },
    // 通过
    async notarySuccess() {
      const query = {
        evidenceId: this.evidenceId,
        notaryId: sessionStorage.getItem("notaryId"),
        acceptFlag: 1, // 成功标志
        notarizationInformation: "公证成功",
      };
      let result = await audit(query);
      if (result.status == true) {
        this.notarySuccessVisible = false;
        this.$message({
          type: "success",
          message:
            "您已通过该公证申请，已生成公证证书，可在个人已完成列表中下载查看！",
        });
        this.getNotaryRecord();
      } else {
        alert("操作失败");
      }
    },
    // 拒绝弹窗
    async notaryRefuseHandler(evidenceId) {
      this.notaryRefuseVisible = true;
      this.evidenceId = evidenceId;
    },
    // 拒绝
    async notaryRefuse() {
      const query = {
        evidenceId: this.evidenceId,
        notaryId: sessionStorage.getItem("notaryId"),
        acceptFlag: 0, // 拒绝标志
        notarizationInformation: this.notarizationInformation,
      };
      let result = await audit(query);
      if (result.status == true) {
        this.notaryRefuseVisible = false;
        this.$message({
          type: "success",
          message: "您已拒绝该申请，可在个人已完成列表中查看！",
        });
        this.getNotaryRecord();
      } else {
        alert("操作失败" + result.message);
      }
    },
    // 文件下载
    handleDown(row) {
      window.location.href =
        "http://localhost:8080/downloadUserFile?evidenceId=" + row.evidenceId;
    },
    async getNotaryRecord() {
      try {
        this.dealData();
        console.log(this.searchQuery);
        this.tableData = [];
        await notarmanageRecord(this.searchQuery).then((result) => {
          if (result.status) {
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
          } else {
            throw new Error("获取数据失败");
          }
        });
        this.pageTotal = this.tableData.length;
        this.handlePageChange(1); //分页
        this.resetData(); //重置传参
      } catch (error) {
        throw new Error(error.message);
      }
    },
    dealData() {
      try {
        this.searchQuery.notaryId = sessionStorage.getItem("notaryId");
        //公证类型
        if (
          this.searchQuery.notarizationType == "" ||
          this.searchQuery.notarizationType == "不限"
        ) {
          this.searchQuery.notarizationType = "none";
        }
         //存证名称
        if (this.searchQuery.evidenceName == "") {
          delete this.searchQuery.evidenceName;
        }
        //存证类型
        if (this.searchQuery.evidenceType == "") {
          this.searchQuery.evidenceType = "none";
        }
        // 加解密
        if (this.decrypt_flag) {
          this.searchQuery.decryptFlag = 1;
        } else {
          this.searchQuery.decryptFlag = 0;
        }
        //金额
        if (this.MoneyFloor != "" && this.MoneyUpper != "") {
          if (isNaN(this.MoneyFloor) || isNaN(this.MoneyUpper)) {
            this.$message({
              type: "error",
              message: "交易金额必须为数字",
            });
            return;
          }
          if (this.MoneyFloor > this.MoneyUpper) {
            this.$message({
              type: "error",
              message: "最低金额需小于等于最高金额",
            });
            return;
          }
          this.searchQuery.notarizationMoneyFloor = this.MoneyFloor;
          this.searchQuery.notarizationMoneyUpper = this.MoneyUpper;
        } else {
          delete this.searchQuery.notarizationMoneyUpper;
          delete this.searchQuery.notarizationMoneyFloor;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    dealDataGet() {
      this.pageData.forEach((item) => {
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
        if (item.notarizationBlockchainIdStart == null) {
          item.notarizationBlockchainIdStart = "暂无数据";
        }
        if (this.searchQuery.decryptFlag == 0) {
          var str = item.evidenceName.split(":");
          item.evidenceName = str[2].substring(0, 6) + "******";
          str = item.notarizationMoney.split(":");
          item.notarizationMoney = str[2].substring(0, 6) + "******";
          str = item.fileSize.split(":");
          item.fileSize = str[2].substring(0, 6) + "******";
        }
      });
    },
    resetData() {
      try {
        //公证类型
        if (this.searchQuery.notarizationType == "none") {
          this.searchQuery.notarizationType = "";
        }
        //存证类型
        if (this.searchQuery.evidenceType == "none") {
          this.searchQuery.evidenceType = "";
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  // 监听路由跳转，刷新数据
  watch: {
    $route() {
      this.getNotaryRecord();
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
  width: 160px;
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
.top-div-set {
  background: rgba(196, 196, 196, 0.5);
}
</style>
