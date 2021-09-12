<template>
  <div class="totalDiv fillcontain">
    <head-top></head-top>
    <div class="top-set">区块链电子存证平台</div>
    <div style="display: flex; height: 45%; margin-left: 0.5%">
      
      <!--饼状图-->
      <div
        id="myChart"
        style="width: 32%; margin-left: 0.5%"
        class="div-set"
      ></div>
      <!-- 交易统计-->
      <div style="width: 23%" class="div-set">
        <i class="el-icon-s-data title-set">交易统计</i>
        <div style="height: 30%">
          <el-form style="margin-left: 20%; width: 200%">
            <el-form-item label="公证总次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: #ffffff">{{
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
            </el-form-item>
          </el-form>
        </div>
        <br />
        <div style="height: 30%" class="notar-set">
          <label style="color: white">公证类型:&emsp;</label>
          <el-select
            v-model="noreqType"
            placeholder="请选择"
            @change="selChange"
          >
            <el-option
              v-for="item in notarType"
              :key="item.notarizationType"
              :label="item.notarizationTypeName"
              :value="item.notarizationType"
            >
            </el-option>
          </el-select>
          <el-form style="margin-left: 20%; width: 200%">
            <el-form-item label="公证总次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: #ffffff">{{
                this.noTypeNum.totalCount
              }}</span>
            </el-form-item>
            <el-form-item label="公证成功次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: #00af17">{{
                this.noTypeNum.successCount
              }}</span>
            </el-form-item>
            <el-form-item label="公证驳回次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: red">{{
                this.noTypeNum.failedCount
              }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 公证员列表 -->
      <div style="width: 23%" class="noTableRow notary-tabel-set">
        <i class="el-icon-s-flag title-set">公证员信息</i>
        <el-scrollbar wrap-style="overflow-x:hidden;">
          <el-table
            :data="noRank"
            height="100%"
            :header-cell-style="{
              background: '#eef1f6',
              color: '#d1d0d0',
              fontSize: '15px',
            }"
          >
            <el-table-column
              label="No."
              prop="notaryRank"
              align="center"
              width="60%"
            ></el-table-column>
            <el-table-column
              label="公证员"
              prop="notaryName"
              align="center"
              width="90%"
            ></el-table-column>
            <el-table-column
              label="公证次数"
              prop="notarizationCount"
              align="center"
              width="90%"
            ></el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <!--组织列表-->
      <div style="width: 23%" class="noTableRow div-set">
        <i class="el-icon-s-flag title-set">机构信息</i>
        <el-scrollbar wrap-style="overflow-x:hidden;">
          <el-table
            :data="orgName"
            height="100%"
            :show-header="status"
            :cell-style="{ 'text-align': 'left' }"
          >
            <el-table-column
              label="公证机构"
              prop="organizationName"
              align="center"
              width="250%"
            ></el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>

    <div style="display: flex; height: 39%; margin-left: 0.5%">
      <div
        
        style="width: 32%; margin-left: 0.5%"
        class="div-set"
      ></div>
      <!--公证金额显示 -->
      <!-- <div class="down-div-set">
        <div class="tryy div-set">
          <el-scrollbar wrap-style="overflow-x:hidden;">
            <el-table
              :data="noPay"
              height="195px"
              :header-cell-style="{
                background: '#eef1f6',
                color: '#d1d0d0',
                fontSize: '15px',
              }"
            >
              <el-table-column
                label="公证类型"
                prop="notarizationTypeName"
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
          </el-scrollbar>
        </div>
        <div style="width: 30%; position: relative" class="button-set-no">
          <div>
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
              <span style="font-size: 25px">我的公证</span>
            </el-button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import "echarts";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  orgaQuery,
  rankStasQue,
  notPayQuery,
  noNumQuery,
  noTypeQuery,
} from "@/api/getData";
export default {
  data() {
    return {
      status: false,
      noreqType: "",
      //公证数量
      noNumber: {
        successNum: 7651,
        notSuccessNum: 1246,
        totalNum: 8897,
      },
      //公证类型及数量
      noType: [
        {
          name: "房产证公证",
          value: 222,
          successCount: 217,
          failedCount: 5,
        },
        {
          name: "驾驶证公证",
          value: 444,
          successCount: 440,
          failedCount: 4,
        },
        {
          name: "学历公证",
          value: 666,
          successCount: 615,
          failedCount: 51,
        },
      ],
      //公证员排名
      noRank: [
        {
          notaryName: "张三",
          notarizationCount: 108,
          notaryRank: 1,
        },
        {
          notaryName: "李四",
          notarizationCount: 97,
          notaryRank: 2,
        },
        {
          notaryName: "王五",
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
        {
          organizationName: "fuzhou",
        },
        {
          organizationName: "fuzhou",
        },
        {
          organizationName: "fuzhou",
        },
        {
          organizationName: "fuzhou",
        },
        {
          organizationName: "fuzhou",
        },
        {
          organizationName: "fuzhou",
        },
        {
          organizationName: "fuzhou",
        },
        {
          organizationName: "fuzhou",
        },
        {
          organizationName: "fuzhou",
        },
        {},
      ],
      notarType: [
        {
          notarizationType: 0,
          notarizationTypeName: "房产证公证",
        },
        {
          notarizationType: 1,
          notarizationTypeName: "驾驶证公证",
        },
      ],
      //公证费用
      noPay: [
        {
          notarizationTypeName: "出生",
          notarizationMoney: 100,
        },
        {
          notarizationTypeName: "房产证",
          notarizationMoney: 100,
        },
        {
          notarizationTypeName: "驾驶证",
          notarizationMoney: 100,
        },
        {
          notarizationTypeName: "学历",
          notarizationMoney: 100,
        },
        {
          notarizationTypeName: "出生",
          notarizationMoney: 100,
        },
      ],
      nota_Num: [{}],
      userId: "",
      noTypeNum: {
        totalCount: 0,
        successCount: 0,
        failedCount: 0,
      },
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userID");
    this.initData();
    this.getNoPay();
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
            console.log(result.data);
            this.noRank = [];
            result.data.forEach((item, index) => {
              if (index <= 10) {
                this.noRank.push(item);
              }
            });
          } else {
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
        tooltip: {
          formatter: function (params) {
            return (
              params.marker +
              "类型：" +
              params.name +
              "<br/>公证次数：" +
              params.value
            );
          },
        },
        title: {
          text: "公证类型及其数量",
          left: "center",
          padding: 30,
          textStyle: {
            fontSize: 20,
            color: "#d1d0d0",
          },
        },
        color: [
          "#426ab3",
          "#5c7a29",
          "#78cdd1",
          "red",
          "#228fbd",
          "#6f60aa",
          "#6a6da9",
          "#78a355",
          "#abc88b",
          "#deab8a",
        ],
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "45%",
            center: ["50%", "55%"],
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
    // 新增存证路由跳转
    addEvidence() {
      this.$router.push("/addEvidence");
    },
    querySpace() {
      this.$router.push("/notarizationListCopy");
    },
    async selChange() {
      /*
      await notarizationTypeNum().then((result) => {
        if (result.status) {
          console.log(result.data);
          this.noTypeNum = {};
          result.data.forEach((item) => {
            if (item.notarizationType == this.noreqType) {
              this.noTypeNum = item.data;
            }
          });
        } else {
          alert("选择出错");
        }
      });*/

      if (this.noreqType == 0) {
        this.noTypeNum = {
          totalCount: 100,
          successCount: 99,
          failedCount: 1,
        };
      } else if (this.noreqType == 1) {
        this.noTypeNum = {
          totalCount: 100,
          successCount: 98,
          failedCount: 2,
        };
      }
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";
.totalDiv {
  background: url("../image/dark-1.jpg") no-repeat;
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
  font-weight: bolder;
}
.demo-table-expands label {
  width: 120px;
  color: #ffffff;
  font-size: 15px;
}

.el-table-set {
  background: #eef1f6;
  color: #606266;
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
  //border: 1px dashed #d9d9d9;
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
.top-set {
  width: 100%;
  font-size: 23px;
  margin-bottom: 0.5%;
  text-align: center;
  height: 3.5%;
  padding-top: 0.5%;
  font-weight: bolder;
  color: #ddd9d9;
}
.noTableRow {
  margin-left: 0.5%;
}
.noTableRow .el-table {
  padding-left: 7%;
}
.div-set .el-table th,
.div-set .el-table tr,
.div-set .el-table td {
  background-color: transparent !important; /* 背景透明 */
  border-top: 1px solid #ffffff;
  color: #ffffff;
  line-height: 30px;
}
.div-set .el-table,
.div-set .el-table__expanded-cell {
  background-color: transparent;
}
.div-set {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  box-shadow: 5px 0px 29px 0px rgb(228, 247, 255) inset;
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
  color: #d1d0d0;
}
.tryy {
  width: 35%;
  position: absolute;
  height: 93%;
  top: 7%;
  left: 17%;
  //background: #20a0ff;
}
.tryy .el-table th,
.tryy.el-table tr,
.tryy .el-table td {
  background-color: transparent !important; /* 背景透明 */
  border: 1px solid #5e5e5e;
  color: #ffffff;
  height: 35px;
  line-height: 15px;
  font-size: 19px;
}
.tryy .el-table,
.tryy .el-table__expanded-cell {
  background-color: transparent;
  //margin-left: 10%;
  //margin-top: 2%;
  //color: #ffffff;
}
.el-table::before {
  height: 0px;
}
.button-set-no {
  position: absolute;
  height: 60%;
  top: 15%;
  left: 55%;
  //background:red
}
.down-div-set {
  width: 99.5%;
  height: 35.5%;
  position: relative;
  display: flex;
  margin-top: 0.5%;
  margin-left: 0.2%;
}
.el-scrollbar__bar {
  &.is-vertical {
    width: 5px; //滚动条宽度
  }
}
.el-scrollbar__wrap {
  overflow-y: auto;
  overflow-x: hidden;
}
.el-scrollbar__thumb {
  ////可设置滚动条颜色
  background: #94949c;
}
.show-tabel {
  height: 205px;
  overflow: auto;
}
.notary-tabel-set .el-table th,
.notary-tabel-set .el-table tr,
.notary-tabel-set .el-table td {
  background-color: transparent !important; /* 背景透明 */
  border: 1px solid #ffffff;
  color: #ffffff;
  line-height: 30px;
}
.notary-tabel-set .el-table,
.notary-tabel-set .el-table__expanded-cell {
  background-color: transparent;
}
.notary-tabel-set {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  box-shadow: 5px 0px 29px 0px rgb(228, 247, 255) inset;
  display: flex;
  flex-direction: column;

  //align-items: center;
}
.notar-set .el-select {
  width: 50%;
}
</style>
