<template>
  <div id="pageUserList">
    <a-page-header>
      <template slot="title">
        <span>User</span>
        <br/>
        <span class="header-subtitle">Manage all users and assign their role</span>
      </template>
      <template slot="extra">
        <a-button key="1" type="primary" @click="openUserPanel">
          <a-icon type="plus" />
          Add New User
        </a-button>
      </template>
    </a-page-header>
    <a-table 
      class="data-table" 
      :columns="columns" 
      :data-source="userList"
      :locale="localeOptions">
      <template slot="status" slot-scope="status">
        <a-tag
        :color="status.toString() === '1' ? 'green' : 'volcano'">
          {{ status.toString() === '1' ? 'Active' : 'Inactive' }}
        </a-tag>
      </template>
      <template slot="action" slot-scope="record">
        <a-switch 
          v-bind:class="record.status.toString() === '1' ? 'switch-active' : 'switch-inactive'"
          :default-checked="record.status.toString() === '1' ? true: false"
          @change="updateUserStatus(record)"/>
        <a-button type="link">Edit</a-button>
      </template>
    </a-table>
    <PanelUser/>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import { MODULE_USER } from '../general/constant';
import PanelUser from '../components/drawer/PanelUser';

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role_name',
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    key: 'action',
    title: 'Action',
    scopedSlots: { customRender: 'action' },
  },
];

const localeOptions = {
  emptyText: 'There is no user yet'
};

export default {
  name: 'UserListPage',
  components: {
    PanelUser,
  },
  computed: {
    ...mapState(MODULE_USER,['opened', 'userList']),
  },
  data() {
    return {
      columns,
      localeOptions,
    };
  },
  mounted() {
    this.loadUser()
      .catch(err => {
        let message = err.message;
        if (err.response && err.response.data) {
          message = err.response.data.message;
        }
        this.$snotify.error(message);
      });
  },
  methods: {
    ...mapMutations(MODULE_USER, [
      'handleDrawer',
    ]),
    ...mapActions(MODULE_USER, [
      'loadUser',
    ]),
    openUserPanel() {
      this.handleDrawer(true);
    },
    updateUserStatus(record) {
      // Hit update user status API
    },
  },
}
</script>

<style lang="scss">
#pageHeader {
  margin: 0;
  padding: 16px 24px;
}
</style>