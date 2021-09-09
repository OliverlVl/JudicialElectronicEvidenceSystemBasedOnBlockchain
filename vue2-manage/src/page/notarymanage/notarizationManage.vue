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
          <el-menu-item index="NMIndex"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >

          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-document"></i>公证管理</template
            >
            <el-menu-item index="totalNotarization">待处理列表</el-menu-item>
            <el-menu-item index="totalNotarizationApply">已处理列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-date"></i>证据管理</template
            >
            <el-menu-item index="totalEvidenceList">证据列表</el-menu-item>
            <!-- <el-menu-item index="materialCopy">我的材料</el-menu-item>
						<el-menu-item index="reservation">我的预约</el-menu-item> -->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-setting"></i>人员管理</template
            >
            <!-- <el-menu-item index="adminSet">用户设置</el-menu-item> -->
            <el-menu-item index="totalUser">用户列表</el-menu-item>
            <el-menu-item index="totalNotary">公证员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-setting"></i>信息管理</template
            >
            <el-menu-item index="notaryManageInfo">个人信息</el-menu-item>
            <el-menu-item index="notaryInformation">公证信息</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"
              ><i class="el-icon-warning"></i>系统说明</template
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
.manage_page {
}
</style>
