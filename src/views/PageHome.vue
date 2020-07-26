<template>
  <a-layout id="home-layout">
    <MySideBar 
      v-bind:isMobile="isMobile"
      v-bind:isCollapsed="isCollapsed"
      @onCollapsed="onCollapsed"></MySideBar>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0"> 
        <a-icon
          class="trigger"
          :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (isCollapsed = !isCollapsed)"
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
import SideBar from '../components/Sidebar';
export default {
  name: 'DashboardPage',
  components: {
    MySideBar: SideBar,
  },
  data() {
    return {
      isCollapsed: false,
      isMobile: false,
    };
  },
  created() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     this.isMobile = true;
     this.isCollapsed = true;
   } else {
     this.isMobile = false;
     this.isCollapsed = false;
   }
  },
  methods: {
    onCollapsed() {
      this.isCollapsed = true;
    }
  }
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