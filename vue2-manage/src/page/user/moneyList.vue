<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search_container">
     
      <el-button>上链时间</el-button>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        style="margin-left:30px; width:450px;"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择收支类型">
          <el-option label="转账" value="1"></el-option>
          <el-option label="提现" value="2"></el-option>
          <el-option label="充值" value="3"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" @click="handleSearch()">搜索</el-button>
    </div>

    <div class="table_container">
      <el-table
        :data="tableData"
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="row => row.index"
        style="width: 100%;"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="共享对象">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="存证来源">
                <span>{{ props.row.restaurant_name }}</span>
              </el-form-item>
              <el-form-item label="存证类型">
                <span>{{ props.row.item_id }}</span>
              </el-form-item>
              <el-form-item label="证据编号">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="所属区块链">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="存证hash">
                <span>{{ props.row.restaurant_address }}</span>
              </el-form-item>
              <el-form-item label="交易hash">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="公证服务提供方">
                <span>{{ props.row.category_name }}</span>
              </el-form-item>
              <el-form-item label="公证申请时间">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
              <el-form-item label="公证费用">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
              <el-form-item label="公证状态">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="name"></el-table-column>
        <el-table-column label="收支类型" prop="description"></el-table-column>
        <el-table-column label="收入" prop="rating"></el-table-column>
        <el-table-column label="支出" prop="coChainHash"></el-table-column>
        <el-table-column label="账户余额" prop="coChainHash"></el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
      <el-dialog title="修改食品信息" v-model="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="食品名称" label-width="100px">
            <el-input v-model="selectTable.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" label-width="100px">
            <el-input v-model="selectTable.description"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" label-width="100px">
            <el-select v-model="selectIndex" :placeholder="selectMenu.label" @change="handleSelect">
              <el-option
                v-for="item in menuOptions"
                :key="item.value"
                :label="item.label"
                :value="item.index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片" label-width="100px">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/food'"
              :show-file-list="false"
              :on-success="handleServiceAvatarScucess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="selectTable.image_path"
                :src="baseImgPath + selectTable.image_path"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-row style="overflow: auto; text-align: center;">
          <el-table :data="specs" style="margin-bottom: 20px;" :row-class-name="tableRowClassName">
            <el-table-column prop="specs" label="规格"></el-table-column>
            <el-table-column prop="packing_fee" label="包装费"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="deleteSpecs(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            @click="specsFormVisible = true"
            style="margin-bottom: 10px;"
          >添加规格</el-button>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateFood">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加规格" v-model="specsFormVisible">
        <el-form :rules="specsFormrules" :model="specsForm">
          <el-form-item label="规格" label-width="100px" prop="specs">
            <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="包装费" label-width="100px">
            <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="价格" label-width="100px">
            <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specsFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addspecs">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  getFoods,
  getFoodsCount,
  getMenu,
  updateFood,
  deleteFood,
  getResturantDetail,
  getMenuById
} from "@/api/getData";
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurant_id: null,
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      menuOptions: [],
      selectMenu: {},
      selectIndex: null,
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }]
      },
      specsFormVisible: false,
      expendRow: [],
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
      value2: "",
      //复合搜索框
      input3: "",
      select: ""
    };
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id;
    this.initData();
  },
  computed: {
    specs: function() {
      let specs = [];
      if (this.selectTable.specfoods) {
        this.selectTable.specfoods.forEach(item => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          });
        });
      }
      return specs;
    }
  },
  components: {
    headTop
  },
  methods: {
    async initData() {
      try {
        const countData = await getFoodsCount({
          restaurant_id: this.restaurant_id
        });
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getFoods();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getMenu() {
      this.menuOptions = [];
      try {
        const menu = await getMenu({
          restaurant_id: this.selectTable.restaurant_id,
          allMenu: true
        });
        menu.forEach((item, index) => {
          this.menuOptions.push({
            label: item.name,
            value: item.id,
            index
          });
        });
      } catch (err) {
        console.log("获取食品种类失败", err);
      }
    },
    async getFoods() {
      const Foods = await getFoods({
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      });
      this.tableData = [];
      Foods.forEach((item, index) => {
        const tableData = {};
        tableData.name = item.name;
        tableData.item_id = item.item_id;
        tableData.description = item.description;
        tableData.rating = item.rating;
        tableData.month_sales = item.month_sales;
        tableData.restaurant_id = item.restaurant_id;
        tableData.category_id = item.category_id;
        tableData.image_path = item.image_path;
        tableData.specfoods = item.specfoods;
        tableData.index = index;
        this.tableData.push(tableData);
      });
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    addspecs() {
      this.specs.push({ ...this.specsForm });
      this.specsForm.specs = "";
      this.specsForm.packing_fee = 0;
      this.specsForm.price = 20;
      this.specsFormVisible = false;
    },
    deleteSpecs(index) {
      this.specs.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getFoods();
    },
    expand(row, status) {
      if (status) {
        this.getSelectItemData(row);
      } else {
        const index = this.expendRow.indexOf(row.index);
        this.expendRow.splice(index, 1);
      }
    },
    handleEdit(row) {
      this.getSelectItemData(row, "edit");
      this.dialogFormVisible = true;
    },
    async getSelectItemData(row, type) {
      const restaurant = await getResturantDetail(row.restaurant_id);
      const category = await getMenuById(row.category_id);
      this.selectTable = {
        ...row,
        ...{
          restaurant_name: restaurant.name,
          restaurant_address: restaurant.address,
          category_name: category.name
        }
      };

      this.selectMenu = { label: category.name, value: row.category_id };
      this.tableData.splice(row.index, 1, { ...this.selectTable });
      this.$nextTick(() => {
        this.expendRow.push(row.index);
      });
      if (type == "edit" && this.restaurant_id != row.restaurant_id) {
        this.getMenu();
      }
    },
    handleSelect(index) {
      this.selectIndex = index;
      this.selectMenu = this.menuOptions[index];
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteFood(row.item_id);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "删除食品成功"
          });
          this.tableData.splice(index, 1);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: err.message
        });
        console.log("删除食品失败");
      }
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    async updateFood() {
      this.dialogFormVisible = false;
      try {
        const subData = {
          new_category_id: this.selectMenu.value,
          specs: this.specs
        };
        const postData = { ...this.selectTable, ...subData };
        const res = await updateFood(postData);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "更新食品信息成功"
          });
          this.getFoods();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      } catch (err) {
        console.log("更新餐馆信息失败", err);
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
</style>
