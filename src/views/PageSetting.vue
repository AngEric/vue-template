<template>
  <a-tabs default-active-key="2">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="lock" />
        Password
      </span>
      <ChangePasswordPage />
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="solution" />
        Role
      </span>
      <RolePage/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import ChangePasswordPage from './PageChangePassword';
import RolePage from './PageRole';

export default {
  name: 'SettingPage',
  components: {
    ChangePasswordPage,
    RolePage,
  },
}
</script>

<style>

</style>