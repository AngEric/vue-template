<template>
  <a-layout-sider 
    v-model="isCollapsed" 
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
        <a-icon class="align-icon" :type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'SideBar',
  props: ['isMobile', 'isCollapsed'],
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
      menuList,
    };
  },
  methods: {
    goToPage(pageName) {
      // Collapsed side bar when navigate for Mobile Only
      if (this.isMobile) {
        this.$emit('onCollapsed');
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

<style>

</style>