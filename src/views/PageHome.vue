<template>
  <a-layout id="home-layout">
    <MySideBar 
      v-bind:isMobile="isMobile"
      v-bind:isCollapsed="isCollapsed"
      @onCollapsed="onCollapsed"></MySideBar>
    <a-layout>
      <MyHeader 
        v-bind:isCollapsed="isCollapsed"
        @onCollapsed="onCollapsed"></MyHeader>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SideBar from '../components/Sidebar';
import Header from '../components/Header';

export default {
  name: 'DashboardPage',
  components: {
    MySideBar: SideBar,
    MyHeader: Header,
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
      this.isCollapsed = !this.isCollapsed;
    },
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