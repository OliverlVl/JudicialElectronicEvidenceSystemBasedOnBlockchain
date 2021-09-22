<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container top-div-set">
      <el-input
        v-model="this.searchQuery.usernameWildcard"
        placeholder="请输入申请人"
        style="width: 390px; margin-left: 3%"
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
          <el-select
            v-model="moneyState"
            style="width: 240px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in money_choose"
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

    <!--公证成功弹窗-->
    <el-dialog
      title="公证成功"
      :visible.sync="notarySuccessVisible"
      size="tiny"
    >
      <span>回复信息：</span>
      <el-input
        placeholder="请输入内容"
        v-model="notarizationInformation"
        clearable
        style="width: 80%"
      ></el-input>
      <div slot="footer">
        <el-button @click="notarySuccessVisible = false">取 消</el-button>
        <el-button type="primary" @click="notarySuccess()">确 定</el-button>
      </div>
    </el-dialog>

    <!--公证失败弹窗-->
    <el-dialog title="公证失败" :visible.sync="notaryRefuseVisible" size="tiny">
      <span>回复信息：</span>
      <el-input
        placeholder="请输入内容"
        v-model="notarizationInformation"
        clearable
        style="width: 80%"
      ></el-input>
      <div slot="footer">
        <el-button @click="notaryRefuseVisible = false">取 消</el-button>
        <el-button type="primary" @click="notaryRefuse()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="table_container">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="right"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="文件目录:">
                <span>{{ props.row.filePath }}</span>
              </el-form-item>
              <el-form-item label="文件大小:">
                <span>{{ props.row.fileSize }}</span>
              </el-form-item>
              <el-form-item label="文件哈希值:">
                <span>{{ props.row.fileHash }}</span>
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
              <el-form-item label="公证金额:">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
              <el-form-item label="交易支付状态:">
                <span>{{ props.row.transactionStatus }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!--<el-table-column label="存证编号" prop="evidenceId"></el-table-column>-->
        <el-table-column
          label="申请人编号"
          width="140px"
          prop="userId"
          align="center"
        ></el-table-column>
        <el-table-column
          label="存证类型"
          width="140px"
          prop="evidenceType"
          align="center"
        ></el-table-column>
        <el-table-column
          label="存证名称"
          prop="evidenceName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="公证类型"
          width="140px"
          prop="notarizationType"
          align="center"
        ></el-table-column>
        <el-table-column
          label="公证申请时间"
          prop="notarizationStartTime"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" label-width="240px">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="Watch(scope.row.evidenceId)"
              >查看</el-button
            >
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
import { baseUrl, baseImgPath } from "@/config/env";
import {
  notarRecord,
  audit,
  eviTypeQuery,
  noTypeQuery,
  notarmanageRecord,
  watchFile,
} from "@/api/getData";
export default {
  data() {
    return {
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
      tableData: [{}],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      //公证员ID
      notary_id: "",
      searchQuery: {
        usernameWildcard: "",
        evidenceName: "",
        notarizationStatus: "1",
        notarizationType: "",
        dealType: "1",
        evidenceType: "",
        decryptFlag: 1,
        notarizationMoneyUpper: -1,
        notarizationMoneyFloor: -1,
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
      payment_type: [
        {
          label: "未支付",
          value: "0",
        },
        {
          label: "已支付",
          value: "1",
        },
      ],
      money_choose: [
        {
          label: "小于100元",
          value: "0",
        },
        {
          label: "100~300元",
          value: "1",
        },
        {
          label: "大于300元",
          value: "2",
        },
        {
          label: "不限",
          value: "none",
        },
      ],
    };
  },
  created() {
    this.decryptFlag = 1;
    this.notary_id = localStorage.getItem("notaryId");
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
        if (this.decrypt_flag) {
          this.decryptFlag = 1;
        } else {
          this.decryptFlag = 0;
        }
        const query = {
          decryptFlag: this.decryptFlag,
          notaryId: sessionStorage.getItem("notaryId"),
          dealType: "1",
        };
        //获取公证列表
        await notarRecord(query).then((result) => {
          if (result.status == true) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            }); //foreach结束
            this.pageTotal = this.tableData.length;
          } else {
            console.log("获取数据失败");
          } //if结束
        }); //await结束
        //获取存证类型
        await eviTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.evidence_type.push(item);
            });
          } else {
            console.log("存证类型获取失败");
          }
        });
        //获取公证类型
        await noTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.notarization_type.push(item);
            });
          } else {
            console.log("公证类型获取失败");
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
        notarizationInformation: this.notarizationInformation,
      };

      let result = await audit(query);
      if (result.status == true) {
        this.notarySuccessVisible = false;
        this.$message({
          type: "success",
          message: "您已通过该公证申请，可在个人已完成列表中查看！",
        });

        this.initData();
      } else {
        alert("操作失败" + result.message);
      }
    },

    // 成功弹窗
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
        this.initData();
      } else {
        alert("操作失败" + result.message);
      }
    },
    // 下载查看
    async Watch(evidenceId) {
      let result = await watchFile(evidenceId);
      if (result.status == true) {
      } else {
        alert("操作失败" + result.message);
      }
    },
    async handleSearch() {
      try {
        this.dealData();
        await notarRecord(this.searchQuery).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
          } else {
            console.log("获取数据失败");
          }
        });
        this.resetData();
      } catch (error) {
        console.log(error.message);
      }
    },
    dealData() {
      try {
        this.searchQuery.notaryId = sessionStorage.getItem("notaryId");

        //用户名
        if (this.searchQuery.usernameWildcard == "") {
          this.searchQuery.usernameWildcard = "none";
        }
        //存证名称
        if (this.searchQuery.evidenceName == "") {
          this.searchQuery.evidenceName = "none";
        }
        //公证类型
        if (this.searchQuery.notarizationType == "") {
          this.searchQuery.notarizationType = "none";
        }
        //存证类型
        if (this.searchQuery.evidenceType == "") {
          this.searchQuery.evidenceType = "none";
        }
        //公证金额
        if (this.moneyState == "0") {
          this.searchQuery.notarizationMoneyUpper = 100;
          this.searchQuery.notarizationMoneyFloor = -1;
        } else if (this.moneyState == "1") {
          this.searchQuery.notarizationMoneyUpper = 300;
          this.searchQuery.notarizationMoneyFloor = 100;
        } else if (this.moneyState == "2") {
          this.searchQuery.notarizationMoneyUpper = -1;
          this.searchQuery.notarizationMoneyFloor = 300;
        } else {
          this.searchQuery.notarizationMoneyUpper = -1;
          this.searchQuery.notarizationMoneyFloor = -1;
        }
        // 加解密
        if (this.decrypt_flag) {
          this.searchQuery.decryptFlag = 1;
        } else {
          this.searchQuery.decryptFlag = 0;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    resetData() {
      try {
        //用户名
        if (this.searchQuery.usernameWildcard == "none") {
          this.searchQuery.usernameWildcard = "";
        }
        //存证名称
        if (this.searchQuery.evidenceName == "none") {
          this.searchQuery.evidenceName = "";
        }
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
  watch:{
    '$route' () {
      this.initData();
    }
  }
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
