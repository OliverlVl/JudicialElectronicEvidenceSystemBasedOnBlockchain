<template>
  <div class="totalDiv fillcontain">
    <head-top></head-top>
    <div style="display: flex; height: 50%; margin-top: 1.5%">
      <div style="width: 30%; margin-left: 1.5%">
        <div style="height: 35%">
          <el-form style="padding-left: 25%;font-weight:bold">
            <el-form-item label="公证总次数:" class="demo-table-expands">
              <span class="demo-table-expands">53626</span>
            </el-form-item>
            <el-form-item label="公证成功次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: #00af17"
                >49260</span
              >
            </el-form-item>
            <el-form-item label="公证失败次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: red">4366</span>
            </el-form-item>
          </el-form>
        </div>
        <!--公证员列表-->
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
              prop="notaryRank"
              align="center"
            ></el-table-column>
            <el-table-column
              label="公证员"
              width="150%"
              prop="notaryName"
              align="center"
            ></el-table-column>
            <el-table-column
              label="公证数量"
              width="150%"
              prop="notarizationCount"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
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
            label="公证机构列表"
            prop="organization_name"
            align="center"
            width="330%"
          ></el-table-column>
        </el-table>
      </div>
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
        <el-button
          type="danger"
          @click="addEvidence()"
          style="width: 60%; margin-bottom: 15px; height: 80px"
        >
          <span style="font-size:25px;">我要存证</span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import "echarts";
import { baseUrl, baseImgPath } from "@/config/env";
import { orgaQuery, rankStasQue, notPayQuery } from "@/api/getData";
export default {
  data() {
    return {
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
      noRank: [
        {
          notaryName: "张三",
          notarizationCount: 121,
          notaryRank: 1,
        },
        {
          notaryName: "李四",
          notarizationCount: 102,
          notaryRank: 2,
        },
        {
          notaryName: "王五",
          notarizationCount: 101,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 90,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 89,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 88,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 88,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 86,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 84,
          notaryRank: 3,
        },
        {
          notaryName: "王五",
          notarizationCount: 83,
          notaryRank: 3,
        },
      ],
      orgName: [
        {
          organization_name: "公证机构1",
        },
        {
          organization_name: "公证机构2",
        },
        {
          organization_name: "公证机构3",
        },
        {
          organization_name: "公证机构4",
        },
        {
          organization_name: "公证机构5",
        },
        {
          organization_name: "公证机构6",
        },
        {
          organization_name: "公证机构7",
        },
        {
          organization_name: "公证机构8",
        },
        {
          organization_name: "公证机构9",
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
            this.noRank = [];
            result.data.forEach((item, index) => {
              if (index <= 10) {
                this.noRank.push(item);
              }
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
  //background: #20a0ff;
}
.tryy .el-table th,
.tryy.el-table tr,
.tryy .el-table td {
  background-color: transparent !important; /* 背景透明 */
  border: 1px solid #000000;
  color: #000000;
  height: 50px;
  line-height: 15px;
  font-size: 20px;
}
.tryy .el-table,
.tryy .el-table__expanded-cell {
  background-color: transparent;
}
.button-set-no {
  position: absolute;
  height:60%;
  top: 15%;
  left: 55%;
  //background:red
}
</style>
