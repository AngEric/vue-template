<template>
  <a-layout id="dashboard-layout">
    <a-layout-sider 
      v-model="collapsed" 
      :trigger="null" 
      breakpoint="lg"
      collapsed-width="0">
      <div class="header-logo"/>
      <a-menu theme="dark">
        <a-menu-item key="1">
          <a-icon type="dashboard" />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="project" />
          <span>Game List</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="user" />
          <span>User</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="notification" />
          <span>Broadcast</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0"> 
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <span>Olahama</span>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'DashboardPage',
  data() {
    return {
      collapsed: false,
    };
  },
}
</script>

<style lang="scss"> 
#dashboard-layout {
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .header-logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>