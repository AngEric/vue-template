<template>
  <a-layout-header> 
    <a-icon
      class="trigger"
      :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
      @click="triggerCollapse()"/>
    <span class="header-title">Olahama</span>
    <div id="right-header">
      <a-dropdown class="header-menu">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <a-icon type="user" />
          <span>Hi, {{ $credential.name }} </span><a-icon type="down" />
        </a>
        <a-menu id="header-menu" slot="overlay">
          <a-menu-item
            v-for="(item, idx) in menuList"
            :key="idx"
            :index="item.path"
            @click="goToPage(item.name)">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
import { mapActions } from 'vuex';
import { MODULE_LOGIN } from '../general/constant';

export default {
  name: 'Header',
  props: ['isCollapsed'],
  data() {
    const menuList = [
      {
        path: 'setting',
        name: 'setting',
        icon: 'setting',
        title: 'Setting'
      },
      {
        path: 'login',
        name: 'login',
        icon: 'logout',
        title: 'Logout'
      },
    ];
    return {
      menuList,
    };
  },
  methods: {
    ...mapActions(MODULE_LOGIN, [
      'logout',
    ]),
    triggerCollapse(){
      this.$emit('onCollapsed');
    },
    goToPage(pageName) {
      if(this.$route.path !== `/dashboard/${pageName}`) {
        if (pageName === 'login') {
          // Clear all storage before logout
          this.logout();
          this.$snotify.success('Logout successful', 'Success');
          this.$router.push({ path: `/${pageName}`});
        } else {
          this.$router.push({name: pageName});
        }
      }
    },
  },
}
</script>

<style lang="scss">
#right-header {
  float: right !important;
  margin-right: 15px;
  .header-menu >span {
    color: #fff;
  }
}
</style>