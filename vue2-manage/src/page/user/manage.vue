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
          <el-menu-item index="userIndex"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >

          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-star-on"></i>存证服务</template
            >
            <el-menu-item index="addEvidence">新增存证</el-menu-item>
            <el-menu-item index="evidenceListCopy2">存证列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-document"></i>公证服务</template
            >
            <el-menu-item index="notarizationListCopy">公证列表</el-menu-item>
            <el-menu-item index="userNotarizationInfo"
              >申报材料信息</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-user-solid"></i>个人中心</template
            >
            <el-menu-item index="capacityPackage">容量套餐</el-menu-item>
            <el-menu-item index="wallet">钱包</el-menu-item>
            <el-menu-item index="moneyListCopy">交易记录</el-menu-item>
            <el-menu-item index="userInfoReset">个人信息</el-menu-item>
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
