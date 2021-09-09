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
            <!-- <el-menu-item index="evidenceList">存证列表</el-menu-item> -->
            <el-menu-item index="bookDeal">可公证列表</el-menu-item>
            <el-menu-item index="notDeal2">待处理列表</el-menu-item>
            <el-menu-item index="haveDeal">已完成列表</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>取证服务</template>
						<el-menu-item index="getEvidenceList">取证列表</el-menu-item>
						<el-menu-item index="getEvidence">新增取证</el-menu-item>
					</el-submenu> -->
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-date"></i>个人中心</template
            >
            <el-menu-item index="myInfoReset">信息修改</el-menu-item>
            <!-- <el-menu-item index="materialCopy">我的材料</el-menu-item>
						<el-menu-item index="reservation">我的预约</el-menu-item> -->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-setting"></i>系统说明</template
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
