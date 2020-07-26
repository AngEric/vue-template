<template>
  <a-layout id="home-layout">
    <a-layout-sider 
      v-model="collapsed" 
      :trigger="null" 
      breakpoint="lg"
      collapsed-width="0">
      <div class="header-logo"/>
      <a-menu theme="dark" :defaultSelectedKeys="['0']">
        <a-menu-item
          v-for="(item, idx) in menuList"
          :key="idx"
          :index="item.path"
          @click="goToPage(item.name)"
          v-bind:class="isActive(item.name) ? 'ant-menu-item-selected' : ''">
          <a-icon :type="item.icon" />
          <span>{{ item.title }}</span>
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
import { TOGGLE_DEVICE_TYPE } from '../store/mutation-type';
export default {
  name: 'DashboardPage',
  data() {
    const menuList = [
      {
        path: 'index',
        name: 'index',
        icon: 'dashboard',
        title: 'Dashboard'
      },
      {
        path: 'game',
        name: 'game',
        icon: 'project',
        title: 'Project'
      },
      {
        path: 'user',
        name: 'user',
        icon: 'user',
        title: 'User'
      },
      {
        path: 'broadcast',
        name: 'broadcast',
        icon: 'notification',
        title: 'Broadcast'
      },
    ];
    return {
      collapsed: false,
      menuList,
      isMobile: false,
      selectedMenu: [],
    };
  },
  created() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     this.isMobile = true;
   } else {
     this.isMobile = false;
   }
  },
  methods: {
    goToPage(pageName) {
      // Collapsed side bar when navigate for Mobile Only
      if (this.isMobile) {
        this.collapsed = true;
      }
      if(this.$route.path !== `/dashboard/${pageName}`) {
        this.$router.push({name: pageName});
      }
    },
    isActive(pageName) {
      if(this.$route.path === `/dashboard/${pageName}`) {
        return true;
      }
      
      return false;
    }
  },
}
</script>

<style lang="scss"> 
#home-layout {
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