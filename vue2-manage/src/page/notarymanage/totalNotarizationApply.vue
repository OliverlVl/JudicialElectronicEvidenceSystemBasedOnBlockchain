<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container">
      &emsp; <span>证据名称:</span> &emsp;
      <el-input
        v-model="notarization.evidenceNameWildcard"
        placeholder="请输入证据名称"
        style="width: 440px"
      ></el-input>
      &emsp; <span>申请人:</span> &emsp;
      <el-input
        v-model="notarization.usernameWildcard"
        placeholder="请输入证据名称"
        style="width: 440px"
      ></el-input>
    </div>
    <div class="search_container">
      &emsp; <span>公证员:</span> &emsp;&emsp;
      <el-input
        v-model="notarization.notaryNameWildcard"
        placeholder="请输入证据名称"
        style="width: 440px"
      ></el-input>
      <el-switch
        v-model="decrypt_flag"
        on-text="解密"
        off-text="加密"
        style="margin-left: 30px"
      ></el-switch>

      <el-button
        type="primary"
        @click="handleSearch()"
        style="margin-left: 18px"
        >搜索
      </el-button>

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
      <el-form label-width="100px" inline>
        <el-form-item label="公证开始时间:">
          <el-date-picker
            v-model="timeValue1"
            type="datetime"
            placeholder="选择起始日期时间"
          ></el-date-picker>
          ~
          <el-date-picker
            v-model="timeValue2"
            type="datetime"
            placeholder="选择结束日期时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="公证结束时间:">
          <el-date-picker
            v-model="timeValue3"
            type="datetime"
            placeholder="选择起始日期时间"
          ></el-date-picker>
          ~
          <el-date-picker
            v-model="timeValue4"
            type="datetime"
            placeholder="选择结束日期时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="存证编号:">
          <el-input
            v-model="notarization.evidenceId"
            placeholder="请输入存证编号"
            style="width: 230px"
          ></el-input>
        </el-form-item>

        <el-form-item label="申请人编号:">
          <el-input
            v-model="notarization.userId"
            placeholder="请输入申请人编号"
            style="width: 240px"
          ></el-input>
        </el-form-item>

        <el-form-item label="公证员编号:">
          <el-input
            v-model="notarization.notaryId"
            placeholder="请输入公证员编号"
            style="width: 230px"
          ></el-input>
        </el-form-item>

        <el-form-item label="公证状态:">
          <el-select
            v-model="notarization.notarizationStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in notarization_state"
              :key="item.state_value"
              :label="item.state_label"
              :value="item.state_value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="存证类型:">
          <el-select
            v-model="notarization.evidenceType"
            placeholder="请选择"
            style="width: 230px"
          >
            <el-option
              v-for="item in evidence_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公证类型:">
          <el-select
            v-model="notarization.notarizationType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in notarization_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公证金额:">
          <el-select v-model="moneyState" placeholder="请选择">
            <el-option
              v-for="item in money_choose"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="searchVisible = false">取 消</el-button>
        <el-button @click="handleSearch(); searchVisible = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 列表 -->
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文件哈希">
                <span>{{ props.row.fileHash }}</span>
              </el-form-item>
              <el-form-item label="存证时间">
                <span>{{ props.row.evidenceTime }}</span>
              </el-form-item>
              <el-form-item label="上链时间">
                <span>{{ props.row.blockchainTime }}</span>
              </el-form-item>
              <el-form-item label="证据保存区块ID">
                <span>{{ props.row.evidenceBlockchainId }}</span>
              </el-form-item>
              <el-form-item label="公证完成时间">
                <span>{{ props.row.notarizationEndTime }}</span>
              </el-form-item>
              <el-form-item label="公证状态">
                <span>{{ props.row.notarizationStatus }}</span>
              </el-form-item>
              <el-form-item label="存证类型">
                <span>{{ props.row.evidenceType }}</span>
              </el-form-item>
              <el-form-item label="公证金额">
                <span>{{ props.row.notarizationMoney }}</span>
              </el-form-item>
              <el-form-item label="公证申请区块ID">
                <span>{{ props.row.notarizationBlockchainIdStart }}</span>
              </el-form-item>
              <el-form-item label="公证完成区块ID">
                <span>{{ props.row.notarizationBlockchainIdEnd }}</span>
              </el-form-item>
              <el-form-item label="审核信息">
                <span>{{ props.row.notarizationInformation }}</span>
              </el-form-item>
              <el-form-item label="申请事项">
                <span>{{ props.row.notarizationMatters }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="公证员" prop="notaryId"></el-table-column>
        <el-table-column label="申请人" prop="userId"></el-table-column>
        <el-table-column label="存证名称" prop="evidenceName"></el-table-column>
        <el-table-column label="公证类型" prop="notarizationType"></el-table-column>
        <el-table-column label="公证申请时间" prop="notarizationStartTime"></el-table-column>
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
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import { 
  notarmanageRecord,
  eviTypeQuery,
  noTypeQuery,
 } from "@/api/getData";
export default {
  data() {
    return {
      searchVisible: false,
      //时间选择器
      timeValue1: "",
      timeValue2: "",
      timeValue3: "",
      timeValue4: "",
      moneyState: "",
      // 表格
      tableData: [{}],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      // 加解密
      decrypt_flag: true,

      notarization: {
        evidenceId: "",
        userId: "",
        usernameWildcard: "",
        evidenceNameWildcard: "",
        notarizationStatus: "3",
        notarizationType: "",
        evidenceType: "",
        decryptFlag: 1,
        notarizationMoneyUpper: -1,
        notarizationMoneyFloor: -1,
        notarizationStartTimeStart: "none",
        notarizationStartTimeEnd: "none",
        notarizationEndTimeStart: "none",
        notarizationEndTimeEnd: "none",
        notaryId: "",
        notaryNameWildcard: "",
      },
      notarization_state: [
        {
          state_value: "3",
          state_label: "公证成功",
        },
        {
          state_value: "4",
          state_label: "公证失败",
        },
      ],
      //存证类型选择器
      evidence_type: [
        {
          label: "不限",
          value: "none",
        },
      ],
      //公证类型选择器
      notarization_type: [
        {
          label: "不限",
          value: "none",
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
    this.autManId = localStorage.getItem("autManId");
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
          evidenceId: "none",
          userId: "none",
          usernameWildcard: "none",
          evidenceNameWildcard: "none",
          notarizationStatus: "3",
          notarizationType: "none",
          evidenceType: "none",
          decryptFlag: 1,
          notarizationMoneyUpper: -1,
          notarizationMoneyFloor: -1,
          notarizationStartTimeStart: "none",
          notarizationStartTimeEnd: "none",
          notarizationEndTimeStart: "none",
          notarizationEndTimeEnd: "none",
          notaryId: "none",
          notaryNameWildcard: "none",
        };
        await notarmanageRecord(query).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
          } else {
            throw new Error("获取数据失败");
          }
        });
        query.notarizationStatus = "4";
        await notarmanageRecord(query).then((result) => {
          if (result.status) {
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
          } else {
            throw new Error("获取数据失败");
          }
        });
        //获取存证类型
        await eviTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.evidence_type.push(item);
            });
          }
        });
        //获取公证类型
        await noTypeQuery().then((typeres) => {
          if (typeres.status) {
            typeres.data.forEach((item) => {
              this.notarization_type.push(item);
            });
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
      try {
        this.dealData();
        await notarmanageRecord(this.notarization).then((result) => {
          if (result.status) {
            this.tableData = [];
            result.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.pageTotal = this.tableData.length;
          } else {
            throw new Error("获取数据失败");
          }
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    dealData() {
      try {
        //存证编号
        if (this.notarization.evidenceId == "") {
          this.notarization.evidenceId = "none";
        }
        //用户编号
        if (this.notarization.userId == "") {
          this.notarization.userId = "none";
        }
        //用户名
        if (this.notarization.usernameWildcard == "") {
          this.notarization.usernameWildcard = "none";
        }
        //存证名称
        if (this.notarization.evidenceNameWildcard == "") {
          this.notarization.evidenceNameWildcard = "none";
        }
        //公证类型
      if (this.notarization.notarizationType == "") {
        this.notarization.notarizationType = "none";
      }
      //存证类型
      if (this.notarization.evidenceType == "") {
        this.notarization.evidenceType = "none";
      }
      //公证员
      if (this.notarization.notaryId == "") {
        this.notarization.notaryId = "none";
      }//公证员编号
      if (this.notarization.notaryNameWildcard == "") {
        this.notarization.notaryNameWildcard = "none";
      }
      //公证金额
      if(this.moneyState == "0"){
        this.notarization.notarizationMoneyUpper = 100;
        this.notarization.notarizationMoneyFloor = -1;
      }else if(this.moneyState == "1"){
        this.notarization.notarizationMoneyUpper = 300;
        this.notarization.notarizationMoneyFloor = 100;
      }else if(this.moneyState == "2"){
        this.notarization.notarizationMoneyUpper = -1;
        this.notarization.notarizationMoneyFloor = 300;
      }else{
        this.notarization.notarizationMoneyUpper = -1;
        this.notarization.notarizationMoneyFloor = -1;
      }
      if(this.timeValue1 != ""){
        this.notarization.notarizationStartTimeStart = this.timeValue1.getTime();
      }
      if(this.timeValue2 != ""){
        this.notarization.notarizationStartTimeEnd = this.timeValue2.getTime();
      }
      if(this.timeValue3 != ""){
        this.notarization.notarizationEndTimeStart = this.timeValue3.getTime();
      }
      if(this.timeValue4 != ""){
        this.notarization.notarizationEndTimeEnd = this.timeValue4.getTime();
      }
      //加解密
      if (this.decrypt_flag) {
        this.notarization.decryptFlag = 1;
      } else {
        this.notarization.decryptFlag = 0;
      }
      } catch (error) {
        throw new Error(error.message);
      }
    },/*
    tryy() {
      this.dealData();
      alert("公证开始时间1:"+this.notarization.notarizationStartTimeStart+"\n"
      +"公证开始时间2:"+this.notarization.notarizationStartTimeEnd+"\n"
      +"公证结束时间1:"+this.notarization.notarizationEndTimeStart+"\n"
      +"公证结束时间2:"+this.notarization.notarizationEndTimeEnd+"\n");
    },*/
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
