<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manageNotarization"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-date"></i>公证中心</template>
						<el-menu-item index="bookDeal">可公证列表</el-menu-item>
						<el-menu-item index="notDeal2">待处理列表</el-menu-item>
						<el-menu-item index="haveDeal">已处理列表</el-menu-item>
						<!-- <el-menu-item index="myReservation">我的预约</el-menu-item> -->
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-setting"></i>个人中心</template>
						<el-menu-item index="myInfoReset">信息修改</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-warning"></i>系统说明</template>
						<!-- <el-menu-item index="explain">说明</el-menu-item> -->
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
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
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../../style/mixin';
	.manage_page{
		
	}
</style>
