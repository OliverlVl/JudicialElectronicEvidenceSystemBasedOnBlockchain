<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-right:1%">
      <i class="el-icon-user el-icon--right"></i><span style="font-size: 20px">欢迎： </span>
      <el-dropdown @command="handleCommand">
        <!-- <img src="..\assets\img\fzu.jpeg" class="avator"> -->
        <span class="el-dropdown-link" style="font-size: 20px">
          {{ loginName }}
        </span>
        <span> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="signout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { baseImgPath } from "@/config/env";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loginName: sessionStorage.getItem("loginName"),
      baseImgPath,
    };
  },
  created() {
    if (!this.adminInfo.id) {
      this.getAdminData();
    }
  },
  computed: {
    ...mapState(["adminInfo"]),
  },
  methods: {
    ...mapActions(["getAdminData"]),
    async handleCommand(command) {
      if (command == "home") {
        this.$router.push("/manage");
      } else if (command == "signout") {
        // const res = await signout()
        this.$router.push("/");
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "退出成功",
          });
          this.$router.push("/");
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      }
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 5px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
