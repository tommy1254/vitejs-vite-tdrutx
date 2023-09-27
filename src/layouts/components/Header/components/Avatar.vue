<template>
  <el-dropdown trigger="click">
    <div class="avatar">
      <img
        src="@/assets/images/avatar.gif"
        alt="avatar"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openDialog('infoRef')">
          个人信息
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          修改密码
        </el-dropdown-item>
        <el-dropdown-item
          divided
          @click="logout"
        >
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import message from '@/utils/message';

// 退出登录
const logout = () => {
  message.confirm('您是否确认退出登录？', { title: '温馨提示' })
    .then(() => {
      console.log(1);
      // 1.执行退出登录接口
      // 2.清除 Token
      // 3.重定向到登陆页
    }).catch(() => {
      console.log(2);
    })
}
// 打开修改密码和个人信息弹窗
const openDialog = () => { }
</script>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
