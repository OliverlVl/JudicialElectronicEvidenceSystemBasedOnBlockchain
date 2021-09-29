<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%; background-color: #545c64">
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="notaryIndex"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-document"></i>公证中心</template
            >
            <el-menu-item index="bookDeal">可公证列表</el-menu-item>
            <el-menu-item index="notDeal2">个人待处理列表</el-menu-item>
            <el-menu-item index="haveDeal">个人已完成列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-date"></i>信息管理</template
            >
            <el-menu-item index="myInfoReset">个人信息</el-menu-item>
            <el-menu-item index="notarizationInfo">申报材料信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function () {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>


<style lang="less" scoped>
@import "../../style/mixin";
</style>
