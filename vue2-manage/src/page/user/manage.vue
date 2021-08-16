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
          <el-menu-item index="manage"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >

          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-document"></i>存证服务</template
            >
            <!-- <el-menu-item index="evidenceList">存证列表</el-menu-item> -->
            <el-menu-item index="addEvidence">新增存证</el-menu-item>
            <!-- <el-menu-item index="evidenceListCopy">存证列表</el-menu-item> -->
            <el-menu-item index="evidenceListCopy2">存证列表</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>取证服务</template>
						<el-menu-item index="getEvidenceList">取证列表</el-menu-item>
						<el-menu-item index="getEvidence">新增取证</el-menu-item>
					</el-submenu> -->
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-date"></i>公证服务</template
            >
            <el-menu-item index="notarizationListCopy">公证列表</el-menu-item>
            <!-- <el-menu-item index="materialCopy">我的材料</el-menu-item>
						<el-menu-item index="reservation">我的预约</el-menu-item> -->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-setting"></i>个人中心</template
            >
            <!-- <el-menu-item index="adminSet">用户设置</el-menu-item> -->
            <el-menu-item index="integralShop">积分商店</el-menu-item>
            <el-menu-item index="infoReset">信息修改</el-menu-item>
            <!-- <el-menu-item index="moneyList">收支记录</el-menu-item> -->
            <el-menu-item index="moneyListCopy">交易记录</el-menu-item>
            <el-menu-item index="infoShow">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-warning"></i>说明</template
            >
            <el-menu-item index="explain">说明</el-menu-item>
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
