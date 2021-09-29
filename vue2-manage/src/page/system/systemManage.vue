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
          <el-menu-item index="systemIndex"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >

          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-document"></i>成员管理</template
            >
            <el-menu-item index="systemUser">用户列表</el-menu-item>
            <el-menu-item index="systemNotaryManager"
              >机构管理员列表</el-menu-item
            >
            <el-menu-item index="systemNotary">公证员列表</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-date"></i>记录查询</template
            >
            <el-menu-item index="systemNotarization"
              >处理中公证记录</el-menu-item
            >
            <el-menu-item index="systemNotarizationApply"
              >已处理公证记录</el-menu-item
            >
            <el-menu-item index="systemEvidence">存证记录</el-menu-item>
            <el-menu-item index="systemTrace">交易记录</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-setting"></i>信息管理</template
            >
            <el-menu-item index="systemManageInfo">个人信息</el-menu-item>
            <el-menu-item index="systemNarizationInfo"
              >申报材料信息</el-menu-item
            >
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
