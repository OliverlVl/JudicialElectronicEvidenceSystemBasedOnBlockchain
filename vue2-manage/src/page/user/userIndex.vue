<template>
  <div class="totalDiv fillcontain">
    <head-top></head-top>
    <div class="top-set">区块链电子存证平台</div>
    <el-row>
      <el-col :span="8"
        ><div class="grid-content bg-purple div-set">
          <i class="el-icon-user-solid title-set">公证员信息</i>

          <el-scrollbar wrap-style="overflow-x:hidden;">
            <el-table
              :data="noRank"
              align="center"
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
                width="100%"
              ></el-table-column>
              <el-table-column
                label="公证员"
                prop="notaryName"
                align="center"
                width="120%"
              ></el-table-column>
              <el-table-column
                label="公证次数"
                prop="notarizationCount"
                align="center"
                width="120%"
              ></el-table-column>
            </el-table>
          </el-scrollbar></div
      ></el-col>
      <el-col :span="10"
        ><div class="grid-content bg-purple div-set" id="myChart"></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content_2 bg-purple div-set">
          <i class="el-icon-s-data title-set">各公证类型交易统计</i>
          <el-form style="width: 200%">
            <el-form-item
              label="公证类型"
              class="demo-table-expands"
              style="margin-top: 10px"
            >
              <el-select
                :popper-append-to-body="false"
                v-model="noreqType"
                placeholder="请选择"
                @change="selChange"
                class="select-style"
                popper-class="select-popper"
                style="width: 200"
              >
                <el-option
                  v-for="item in notarizationTypeQuery"
                  :key="item.notarizationTypeId"
                  :label="item.notarizationType"
                  :value="item.notarizationType"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="成功次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: #00af17">{{
                this.noTypeNum.successCount
              }}</span>
            </el-form-item>
            <el-form-item label="驳回次数:" class="demo-table-expands">
              <span class="demo-table-expands" style="color: red">{{
                this.noTypeNum.failedCount
              }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="grid-content_2 bg-purple div-set">
          <i class="el-icon-s-data title-set">平台公证统计</i>

          <el-form style="margin-left: 15%; margin-top: 10px; width: 200%">
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
        </div></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8"
        ><div class="grid-content bg-purple div-set">
          <i class="el-icon-bank-card title-set">公证金额</i>
          <el-scrollbar wrap-style="overflow-x:hidden;">
            <el-table
              :data="notarizationTypeQuery"
              align="center"
              :header-cell-style="{
                background: '#eef1f6',
                color: '#d1d0d0',
                fontSize: '15px',
              }"
            >
              <el-table-column
                label="公证类型"
                prop="notarizationType"
                align="center"
                width="170%"
              ></el-table-column>
              <el-table-column
                label="公证金额(￥)"
                prop="notarizationMoney"
                align="center"
                width="170%"
              ></el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple div-set">
          <i class="el-icon-s-flag title-set">机构信息</i>
          <el-scrollbar wrap-style="overflow-x:hidden;">
            <el-table
              :data="orgName"
              align="center"
              :show-header="status"
              :cell-style="{ 'text-align': 'left' }"
            >
              <el-table-column
                label="公证机构"
                prop="organizationName"
                width="340%"
              ></el-table-column>
            </el-table>
          </el-scrollbar></div
      ></el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple div-set">
          <i class="el-icon-view title-set">快捷按钮</i>
          <div align="center">
            <el-button
              type="warning"
              @click="addEvidence()"
              align="center"
              style="margin-top: 20px; width: 80%"
            >
              <span style="font-size: 25px">新增存证</span>
            </el-button>
            <br />
            <el-button
              type="primary"
              @click="evidenceListCopy()"
              style="margin-top: 20px; width: 80%"
            >
              <span style="font-size: 25px">存证列表</span>
            </el-button>
            <br />
            <el-button
              type="danger"
              @click="notarizationList()"
              style="margin-top: 20px; width: 80%"
            >
              <span style="font-size: 25px">公证列表</span>
            </el-button>
            <br />
            <el-button
              type="success"
              @click="notarizationInfo()"
              style="margin-top: 20px; width: 80%"
            >
              <span style="font-size: 25px">申报材料信息</span>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
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
  notarTypeAndNum,
  notaStasGen,
  notStaTimeQuery,
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
      noType: [],
      drawData: [],
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
          organizationName: "福州市公证处",
        },
        {
          organizationName: "福建省福州市中级人民法院",
        },
        {
          organizationName: "福建省福州市中级人民法院顶顶顶顶顶顶顶顶顶",
        },
        {
          organizationName: "福建省福州市中级人民法院",
        },
        {
          organizationName: "福建省福州市中级人民法院",
        },
        {
          organizationName: "福建省福州市中级人民法院",
        },
        {
          organizationName: "福建省福州市中级人民法院",
        },
        {
          organizationName: "福建省福州市中级人民法院",
        },
        {
          organizationName: "福建省福州市中级人民法院",
        },
      ],
      //公证费用
      noPay: [],
      notarizationTypeQuery: [],
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
    this.userId = sessionStorage.getItem("userId");
    this.initData();
    this.notarTypeAndNumQuery();
    this.getNotarizationType();
    this.rankQue();
  },
  mounted() {
    // this.drawLine();
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
        //公证数量查询
        await noNumQuery().then((result) => {
          if (result.status) {
            this.noNumber = result.data;
          } else {
            console.log("获取数据失败");
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
      } catch (error) {
        console.log(error.message);
      }
    },
    // 获取公证类型
    async getNotarizationType() {
      try {
        noTypeQuery().then((result) => {
          result.data.forEach((item) => {
            this.notarizationTypeQuery.push(item);
          });
          console.log("公证类型");
          console.log(this.notarizationTypeQuery);
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 获取公证类型及其总数
    async notarTypeAndNumQuery() {
      notarTypeAndNum().then((result) => {
        console.log("获取公证类型及其总数");
        console.log(result);
        result.data.forEach((item) => {
          let query = {};
          query.name = item.notarizationType;
          query.value = item.totalNum;
          this.noType.push(item);
          if (item.totalNum != 0) {
            this.drawData.push(query);
          }
        });
        //画饼图
        this.drawLine();
      });
    },
    async rankQue() {
      this.noRank = [];
      await notaStasGen().then((result) => {
        if (result.status) {
          console.log("公证员统计生成成功");
        } else {
          console.log("公证员统计生成失败");
          console.log(result.message);
        }
      });
      const query = {
        sort: 0,
        decryptFlag: 1,
        timeFlag: "",
      };
      await notStaTimeQuery().then((result) => {
        if (result.status) {
          query.timeFlag = result.data[0];
          result.data.forEach((item) => {
            if (query.timeFlag < item) {
              query.timeFlag = item;
            }
          });
          console.log(query.timeFlag);
        } else {
          console.log("公证员统计时间查询失败");
          console.log(result.message);
        }
      });
      await rankStasQue(query).then((result) => {
        if (result.status) {
          console.log(result);
          result.data.forEach((item, index) => {
            if (index < 15) {
              item["notaryRank"] = index + 1;
              if (item.notarizationCount == null) {
                item.notarizationCount = 0;
              }
              this.noRank.push(item);
            }
          });
        } else {
          console.log("公证员排名查询失败");
          console.log(result.message);
        }
      });
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

          textStyle: {
            fontSize: 30,
            color: "#d1d0d0",
          },
        },
        color: [
          "#45C2E0",
          "#C1EBDD",
          "#FFC851",
          "#5A5476",
          "#1869A0",
          "#FF9393",
          "#78a355",
          "#abc88b",
          "#deab8a",
        ],
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            label: {
              //饼图图形上的文本标签
              normal: {
                textStyle: {
                  fontSize: 20, //文字的字体大小
                },
                //formatter: "{d}%",
              },
            },
            data: this.drawData,
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
    evidenceListCopy() {
      this.$router.push("/evidenceListCopy2");
    },
    notarizationList() {
      this.$router.push("/notarizationListCopy");
    },
    notarizationInfo() {
      this.$router.push("/userNotarizationInfo");
    },
    async selChange() {
      console.log(this.noType);
      console.log(this.noreqType);
      //  清除数据
      this.noTypeNum = {
        totalCount: 0,
        successCount: 0,
        failedCount: 0,
      };
      this.noType.forEach((item) => {
        if (this.noreqType == item.notarizationType) {
          console.log(item.notarizationType);
          this.noTypeNum = {
            totalCount: item.totalNum,
            successCount: item.successNum,
            failedCount: item.failedNum,
          };
        }
      });
    },
  },
};
</script>

<style lang="less">
@import "../../style/mixin";

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  position: sticky;
}

.bg-purple {
  // background: #d3dce6;
  background-color: transparent !important;
  // position: relative;
  box-shadow: 5px 0px 29px 0px rgb(48, 131, 167) inset;
}
.el-col {
  position: center;
}

.grid-content {
  border-radius: 20px;
  height: 390px;
  padding: 20px;
  margin-left: 20px;
  margin-top: 10px;
  position: relative;
}

.grid-content_2 {
  border-radius: 20px;
  height: 190px;
  padding: 10px;
  margin-left: 20px;
  margin-top: 10px;
  position: relative;
}

.totalDiv {
  background: url("../../assets/img/dark-1.jpg") no-repeat;
  background-size: 500% 500%;
  min-height: 200%;
  position: relative;
}
.demo-table-expands {
  font-size: 20px;
  margin-bottom: 0%;
  font-weight: bolder;
}
.demo-table-expands label {
  width: 150px;
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 10px;
}

.top-set {
  width: 100%;
  font-size: 40px;
  margin: 10px;
  text-align: center;

  font-weight: bolder;
  color: #f3e306;
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
  color: #ffffff;
  line-height: 20px;
}
.div-set .el-table {
  background-color: transparent;
}
.div-set {
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 5px 0px 29px 0px rgb(48, 131, 167) inset;
  display: flex;
  flex-direction: column;
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
}
.el-table::before {
  height: 0px;
}

.down-div-set {
  width: 99.5%;
  height: 35.5%;
  position: relative;
  display: flex;
  margin-top: 0.5%;
  margin-left: 0.2%;
}

.el-scrollbar__thumb {
  ////可设置滚动条颜色
  background: #94949c;
}

.notary-tabel-set .el-table th,
.notary-tabel-set .el-table tr,
.notary-tabel-set .el-table td {
  background-color: transparent !important; /* 背景透明 */
  //border: 1px solid #ffffff;
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

.select-style {
  width: 20%;

  .el-input__inner {
    border: 1px solid rgb(48, 131, 167); // 边框
    border-left-width: 0; // 左边框
    border-right-width: 0;
    background-color: rgba(0, 0, 0, 0.8); // 背景颜色
    font-size: 0.28rem;
    color: rgb(231, 209, 13); // 字体颜色
  }
}

.select-popper {
  background-color: rgba(0, 0, 0, 0.8);
  border: solid 0.02rem rgb(48, 131, 167);

  .el-select-dropdown__item.selected {
    // 被选中选项的字体颜
    font-size: 0.28rem;
    color: rgb(231, 209, 13);
  }
  li {
    // background: transparent;
    color: rgb(255, 255, 255);
    font-size: 0.28rem;
  }
  .el-select-dropdown__item:hover,
  .el-select-dropdown__item.hover {
    // 选项背景颜色
    background-color: rgba(30, 255, 0, 0.2);
    margin-right: 1px;
  }
}
</style>
