<template>
  <div class="totalDiv fillcontain">
    <head-top></head-top>
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
            <el-form-item label="公证失败次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: red">{{
                this.noNumber.notSuccessNum
              }}</span>
            </el-form-item>
          </el-form>
        </div>
        <!--公证员列表-->
        <div style="height: 65%; width: 90%; margin-top: 3%; margin-left: 7%">
          <el-table
            :data="noRank"
            height="210px"
            border
            stripe
            :header-cell-style="{
              background: '#eef1f6',
              color: '#606266',
              fontSize: '17px',
            }"
          >
            <el-table-column
              label=""
              width="50%"
              prop="notaryRank"
              align="center"
            ></el-table-column>
            <el-table-column
              label="公证员"
              width="130%"
              prop="notaryName"
              align="center"
            ></el-table-column>
            <el-table-column
              label="公证数量"
              width="130%"
              prop="notarizationCount"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>

      <!--组织列表-->
      <div style="width: 30%" class="noTableRow div-set">
        <i class="el-icon-s-flag title-set">机构信息</i>
        <el-scrollbar wrap-style="overflow-x:hidden;">
          <el-table
            :data="orgName"
            border
            :header-cell-style="{
              background: '#eef1f6',
              color: '#606266',
              fontSize: '23px',
            }"
            :cell-style="{ 'text-align': 'left' }"
          >
            <el-table-column
              prop="organizationName"
              
              width="330%"
            ></el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <!--饼状图-->
      <div
        id="myChart"
        style="width: 39%; margin-left: 0.5%"
        class="div-set"
      ></div>
    </div>
    <!-- -->
    <div class="down-div-set div-set">
      <div class="tryy">
        <el-table
          :data="notaInfo"
          stripe
          height="100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column
            label="个人公证数量"
            prop="notarizationCount"
            align="center"
            width="330%"
          ></el-table-column>
          <el-table-column
            label="个人公证成功数量"
            prop="notarizationSuccessCount"
            align="center"
            width="330%"
          ></el-table-column>
          <el-table-column
            label="个人公证收益"
            prop="notarizationTotalMoney"
            align="center"
            width="330%"
          ></el-table-column>
        </el-table>
      </div>
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
  noNumQuery,
  noTypeQuery,
  notaStasGen,
  notaStasQue,
} from "@/api/getData";
export default {
  data() {
    return {
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
          organization_name: "机构1",
        },
        {
          organization_name: "机构2",
        },
        {
          organization_name: "机构3",
        },
        {
          organization_name: "机构4",
        },
        {
          organization_name: "机构5",
        },
        {
          organization_name: "机构6",
        },
        {
          organization_name: "机构7",
        },
        {
          organization_name: "机构8",
        },
        {
          organization_name: "机构9",
        },
      ],
      notaInfo: [
        {
          notarizationCount: 50,
          notarizationTotalMoney: 5000,
          notarizationSuccessCount: 100,
        },
      ],
      // 获取数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      notary_id: "",
    };
  },
  created() {
    this.notary_id = localStorage.getItem("notaryId");
    this.initData();
    this.getNoSta();
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
            console.log("获取公证数量失败");
          }
        });
        //公证员排名
        await rankStasQue(noRankQuery).then((result) => {
          if (result.status) {
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
            console.log("获取机构名失败");
          }
        }); /*
        //获取公证类型及数量
        await noTypeQuery().then((result) => {
          if (result.status) {
            this.noType = [];
            typeRes = { name: "", value: 0 };
            result.data.forEach((item) => {
              typeRes.name = item.data.notarType;
              typeRes.value = item.data.Num;
              this.noType.push(typeRes);
            });
          } else {
            console.log("获取公证类型及数量失败");
          }
        });*/
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getNoSta() {
      try {
        const query = {
          timeFlag: 1,
          decryptFlag: 1,
        };
        //统计生成
        await notaStasGen().then((result) => {
          if (result.status) {
            console.log("统计生成成功");
          } else {
            console.log("统计生成失败");
          }
        });
        await notaStasQue(query).then((result) => {
          if (result.status) {
            console.log(result.data);
            this.notaInfo = {};
          } else {
            console.log("获取数据失败");
          }
        });
      } catch (error) {
        console.log("排名出错");
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
  font-weight: bolder;
  margin-bottom: 0%;
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
  height: 39%;
  width: 78%;
  position: absolute;
  top: 15%;
  left: 10%;
  //background: #20a0ff;
}
.tryy .el-table th,
.tryy.el-table tr,
.tryy .el-table td {
  background-color: transparent !important; /* 背景透明 */
  border: 1px solid #000000;
  color: #000000;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
.tryy .el-table,
.tryy .el-table__expanded-cell {
  background-color: transparent;
}
.down-div-set {
  width: 99.5%;
  height: 36%;
  position: relative;
  display: flex;
  margin-top: 0.5%;
  margin-left: 0.2%;
}
tabel{
  table-layout: fixed;
}
</style>
