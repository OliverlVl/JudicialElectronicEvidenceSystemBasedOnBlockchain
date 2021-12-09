<template>
  <div id="app" class="fillcontain">
    <router-view></router-view>
    <div class="version" v-if="this.$route.path != '/'">序列号：YC-21-03</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "./style/common";

.version {
  position: fixed;
  right: 10px;
  bottom: 20px;
  font-style: italic;
  font-weight: bold;
}
</style>
