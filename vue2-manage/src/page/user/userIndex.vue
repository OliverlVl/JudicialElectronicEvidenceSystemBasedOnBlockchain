<template>
  <div class="totalDiv fillcontain">
    <head-top></head-top>
<<<<<<< HEAD
    <div style="display: flex; height: 50%; margin-top: 1.5%">
      <div style="width: 30%; margin-left: 1.5%">
        <div style="height: 35%">
          <el-form style="padding-left: 25%">
            <el-form-item label="公证总次数:" class="demo-table-expands">
              <span class="demo-table-expands">2222</span>
            </el-form-item>
            <el-form-item label="公证成功次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: #00af17"
                >1111</span
              >
            </el-form-item>
            <el-form-item label="公证失败次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: red">1111</span>
=======
    <div class="top-set">区块链电子存证平台</div>
    <div style="display: flex; height: 50%; margin-left: 0.5%">
      <div style="width: 29%" class="div-set">
        <i class="el-icon-s-data title-set">交易统计</i>
        <div style="height: 30%">
          <el-form style="margin-left: 20%; width: 200%">
            <el-form-item label="公证总次数:" class="demo-table-expands">
              <span class="demo-table-expands">{{
                this.noNumber.totalNum
              }}</span>
            </el-form-item>
            <el-form-item label="公证成功次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: #00af17">{{
                this.noNumber.successNum
              }}</span>
            </el-form-item>
            <el-form-item label="公证驳回次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: red">{{
                this.noNumber.notSuccessNum
              }}</span>
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
            </el-form-item>
          </el-form>
        </div>
        <!--公证员列表-->
<<<<<<< HEAD
        <div style="height: 65%">
          <el-table
            :data="noRank"
            height="100%"
            border
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              label=""
              width="50%"
=======
        <div style="height: 65%; width: 90%; margin-top: 3%; margin-left: 7%">
          <el-table
            :data="noRank"
            height="210px"
            border
            stripe
            :header-cell-style="{
              background: '#eef1f6',
              color: '#606266',
              fontSize: '15px',
            }"
          >
            <el-table-column
              label="No."
              width="70%"
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
              prop="notaryRank"
              align="center"
            ></el-table-column>
            <el-table-column
              label="公证员"
<<<<<<< HEAD
              width="150%"
=======
              width="120%"
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
              prop="notaryName"
              align="center"
            ></el-table-column>
            <el-table-column
              label="公证数量"
<<<<<<< HEAD
              width="150%"
=======
              width="120%"
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
              prop="notarizationCount"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
<<<<<<< HEAD
      <!--饼状图-->
      <div id="myChart" style="width: 39%" class="no-div"></div>
      <!--组织列表-->
      <div style="width: 30%">
        <el-table
          :data="orgName"
          stripe
          height="100%"
          border
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column
            label="公证机构"
            prop="organization_name"
=======

      <!--组织列表-->
      <div style="width: 30%" class="noTableRow div-set">
        <i class="el-icon-s-flag title-set">机构信息</i>
        <el-table
          :data="orgName"
          height="100%"
          border
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            fontSize: '23px',
            align: 'center',
          }"
          :show-header="status"
          :cell-style="{ 'text-align': 'left' }"
        >
          <el-table-column
            label="公证机构"
            prop="organizationName"
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
            align="center"
            width="330%"
          ></el-table-column>
        </el-table>
      </div>
<<<<<<< HEAD
    </div>
    <div style="width: 100%; height: 39%; position: relative; display: flex">
      <div class="tryy">
        <el-table
          :data="notPay"
          border="1px soild #000000"
          height="100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' , height: '55px'}"
        >
          <el-table-column
            label="公证类型"
            prop="notarizationType"
=======
      <!--饼状图-->
      <div
        id="myChart"
        style="width: 39%; margin-left: 0.5%"
        class="div-set"
      ></div>
    </div>
    <div class="down-div-set div-set">
      <div class="tryy">
        <el-table
          :data="noPay"
          height="210px"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            height: '55px',
          }"
        >
          <el-table-column
            label="公证类型"
            prop="notarizationTypeName"
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
            align="center"
            width="180%"
          ></el-table-column>
          <el-table-column
            label="公证金额（元）"
            prop="notarizationMoney"
            align="center"
            width="180%"
          ></el-table-column>
        </el-table>
      </div>
      <div style="width: 30%; position: relative" class="button-set-no">
        <div>
<<<<<<< HEAD
        <el-button
          type="danger"
          @click="addEvidence()"
          style="width: 60%; margin-bottom: 15px; height: 80px"
        >
          <span style="font-size:25px;">我要公证</span>
        </el-button>
        </div>
        <div>
          <el-button
          type="primary"
          @click="querySpace()"
          style="width: 60%; height: 80px"
        >
          <span style="font-size:25px;">查询剩余空间</span>
        </el-button>
=======
          <el-button
            type="danger"
            @click="addEvidence()"
            style="width: 60%; margin-bottom: 15px; height: 80px"
          >
            <span style="font-size: 25px">我要公证</span>
          </el-button>
        </div>
        <div>
          <el-button
            type="primary"
            @click="querySpace()"
            style="width: 60%; height: 80px"
          >
            <span style="font-size: 25px">查询剩余空间</span>
          </el-button>
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import "echarts";
import { baseUrl, baseImgPath } from "@/config/env";
<<<<<<< HEAD
import { orgaQuery, rankStasQue, notPayQuery } from "@/api/getData";
export default {
  data() {
    return {
=======
import { orgaQuery, rankStasQue, notPayQuery, noNumQuery, noTypeQuery } from "@/api/getData";
export default {
  data() {
    return {
      status:false,
      //公证数量
      noNumber: {
        successNum: 7651,
        notSuccessNum: 1246,
        totalNum: 8897,
      },
      //公证类型及数量
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
      noType: [
        {
          name: "房产证公证",
          value: 222,
        },
        {
          name: "驾驶证公证",
          value: 444,
        },
        {
          name: "学历公证",
          value: 666,
        },
      ],
<<<<<<< HEAD
      noRank: [
        {
          notaryName: "张三",
          notarizationCount: 10,
=======
      //公证员排名
      noRank: [
        {
          notaryName: "张三",
          notarizationCount: 108,
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
          notaryRank: 1,
        },
        {
          notaryName: "李四",
<<<<<<< HEAD
          notarizationCount: 10,
=======
          notarizationCount: 97,
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
          notaryRank: 2,
        },
        {
          notaryName: "王五",
<<<<<<< HEAD
          notarizationCount: 10,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 10,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 10,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 10,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 10,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 10,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 10,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 10,
          notaryRank: 3,
        },
      ],
      orgName: [
        {
          organization_name: "111111",
        },
        {
          organization_name: "111111",
        },
        {
          organization_name: "111111",
        },
        {
          organization_name: "111111",
        },
        {
          organization_name: "111111",
        },
        {
          organization_name: "111111",
        },
        {
          organization_name: "111111",
        },
        {
          organization_name: "111111",
        },
        {
          organization_name: "111111",
        },
      ],
      notPay: [
        {
          notarizationType: "房产证公证",
          notarizationMoney: 100,
        },
        {
          notarizationType: "房产证公证",
          notarizationMoney: 100,
        },
        {
          notarizationType: "房产证公证",
          notarizationMoney: 100,
        },
        {
          notarizationType: "房产证公证",
          notarizationMoney: 100,
        },
        {
          notarizationType: "房产证公证",
          notarizationMoney: 100,
        },
      ],
      userId:"",
    };
  },
  created() {
    this.userId= sessionStorage.getItem("userID"),
    this.initData();
=======
          notarizationCount: 96,
          notaryRank: 3,
        },
        {
          notaryName: "甲",
          notarizationCount: 91,
          notaryRank: 4,
        },
        {
          notaryName: "乙",
          notarizationCount: 87,
          notaryRank: 5,
        },
        {
          notaryName: "丙",
          notarizationCount: 79,
          notaryRank: 6,
        },
        {
          notaryName: "丁",
          notarizationCount: 78,
          notaryRank: 7,
        },
        {
          notaryName: "戊",
          notarizationCount: 76,
          notaryRank: 8,
        },
        {
          notaryName: "王五",
          notarizationCount: 73,
          notaryRank: 9,
        },
        {
          notaryName: "王五",
          notarizationCount: 70,
          notaryRank: 10,
        },
      ],
      //组织名列表
      orgName: [
      ],
      //公证费用
      noPay: [
      ],
      nota_Num: [{}],
      userId: "",
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userID");
    this.initData();
    this.getNoPay();
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
  },
  mounted() {
    this.drawLine();
  },
  computed: {},
  components: {
    headTop,
  },
  methods: {
    // 初始化数据
    async initData() {
      const orgQuery = {
        organizationId: "none",
        organizationIdNameWildcard: "none",
        addressWildcard: "none",
        phoneNumberWildcard: "none",
        legalPeopleWildcard: "none",
        emailWildcard: "none",
      };
<<<<<<< HEAD
      try {
        await orgaQuery(orgQuery).then((result) => {
          if (result.status) {
            this.orgName = [];
            result.data.forEach((item) => {
              this.orgName.push(item);
            });
          } else {
            throw new Error("获取数据失败");
          }
        });
        const noRankQuery = {
          timeFlag: 1,
          decryptFlag: 1,
          sort: 0,
        };
        await rankStasQue(noRankQuery).then((result) => {
          if (result.status) {
=======
      const noRankQuery = {
        timeFlag: 1,
        decryptFlag: 1,
        sort: 0,
      };
      try {
        //公证数量查询
        await noNumQuery().then((result) => {
          if (result.status) {
            this.noNumber = result.data;
          } else {
            console.log("获取数据失败");
          }
        });
        //公证员排名
        await rankStasQue(noRankQuery).then((result) => {
          if (result.status) {
            console.log(result.data)
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
            this.noRank = [];
            result.data.forEach((item, index) => {
              if (index <= 10) {
                this.noRank.push(item);
              }
            });
          } else {
<<<<<<< HEAD
=======
            console.log("获取排名失败");
          }
        });
        //获取组织名
        await orgaQuery(orgQuery).then((result) => {
          if (result.status) {
            this.orgName = [];
            result.data.forEach((item) => {
              this.orgName.push(item);
            });
          } else {
            console.log("获取机构名失败失败");
          }
        });
        /*
        //获取公证类型及数量
        await noTypeQuery().then((result) => {
          console.log("获取公证类型及数量开始");
          typeRes = {};
          if (result.status) {
            this.noType = [];
            console.log(result.data);
            typeRes = {};
            result.data.forEach((item) => {
              typeRes.name = item.data.notarTypeName;
              typeRes.value = item.data.Num;
              this.noType.push(typeRes);
            });
          } else {
            console.log("获取数据失败");
          }
        });*/
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getNoPay() {
      try {
        //公证费用查询
        await notPayQuery().then((result) => {
          if (result.status) {
            console.log(result.data);
            this.noPay = [];
            result.data.forEach((item) => {
              this.noPay.push(item);
            });
          } else {
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
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
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        title: {
          text: "公证类型及其数量",
          left: "center",
<<<<<<< HEAD
=======
          padding: 30,
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
          textStyle: {
            fontSize: 25,
          },
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "65%",
            center: ["50%", "60%"],
            label: {
              //饼图图形上的文本标签
              normal: {
                textStyle: {
                  fontSize: 16, //文字的字体大小
                },
                //formatter: "{d}%",
              },
            },

            data: this.noType,
            textStyle: {
              fontSize: 15,
            },
          },
        ],
      });
    },
    tableRowClassName({ row, rowIndex }) {
      return "noTableRow";
    },
    // 新增存证路由跳转
    addEvidence() {
      this.$router.push("/addEvidence");
    },
    querySpace() {
      this.$router.push("/capacityPackage");
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.totalDiv {
  background: url("../image/123.jpg") no-repeat;
  background-size: 100% 100%;
}
.search_container {
  // padding: 10px;
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.demo-table-expands {
  font-size: 20px;
  margin-bottom: 0%;
<<<<<<< HEAD
=======
  font-weight: bolder;
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
}
.demo-table-expands label {
  width: 120px;
  color: #000000;
  font-size: 15px;
}

.el-table-set {
  background: "#eef1f6";
  color: "#606266";
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
<<<<<<< HEAD
  border: 1px dashed #d9d9d9;
=======
  //border: 1px dashed #d9d9d9;
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
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
<<<<<<< HEAD
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent !important; /* 背景透明 */
  border: 1px solid #ffffff;
  color: #000000;
  height: 30px;
  line-height: 30px;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
.tryy {
  width: 30%;
  position: absolute;
  height: 80%;
  top: 7%;
  left: 21%;
=======
.top-set {
  width: 100%;
  font-size: 23px;
  margin-bottom: 0.5%;
  text-align: center;
  height: 3.5%;
  padding-top: 0.5%;
  font-weight: bolder;
}
.noTableRow {
  margin-left: 0.5%;
}
.noTableRow .el-table {
  margin-left: 7%;
}
.div-set .el-table th,
.div-set .el-table tr,
.div-set .el-table td {
  background-color: transparent !important; /* 背景透明 */
  border: 1px solid #000000;
  color: #000000;
  line-height: 30px;
}
.div-set .el-table,
.div-set .el-table__expanded-cell {
  background-color: transparent;
}
.div-set {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  box-shadow: 10px 0px 39px 0px rgb(219, 217, 217) inset;
  display: flex;
  flex-direction: column;

  //align-items: center;
}
.title-set {
  margin-top: 2%;
  margin-left: 3%;
  font-size: 20px;
  font-weight: bolder;
  height: 10%;
  //text-align: left;
}
.tryy {
  width: 35%;
  position: absolute;
  height: 93%;
  top: 5%;
  left: 15%;
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
  //background: #20a0ff;
}
.tryy .el-table th,
.tryy.el-table tr,
.tryy .el-table td {
  background-color: transparent !important; /* 背景透明 */
  border: 1px solid #000000;
  color: #000000;
<<<<<<< HEAD
  height: 50px;
  line-height: 15px;
  font-size: 20px;
=======
  height: 35px;
  line-height: 15px;
  font-size: 19px;
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
}
.tryy .el-table,
.tryy .el-table__expanded-cell {
  background-color: transparent;
<<<<<<< HEAD
}
.button-set-no {
  position: absolute;
  height:60%;
=======
  margin-left: 10%;
  margin-top: 2%;
}
.button-set-no {
  position: absolute;
  height: 60%;
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
  top: 15%;
  left: 55%;
  //background:red
}
<<<<<<< HEAD
=======
.down-div-set {
  width: 99.5%;
  height: 36%;
  position: relative;
  display: flex;
  margin-top: 0.5%;
  margin-left: 0.2%;
}
>>>>>>> parent of 93ea081 (Merge branch 'main' of https://github.com/OliverlVl/JudicialElectronicEvidenceSystemBasedOnBlockchain into main)
</style>
