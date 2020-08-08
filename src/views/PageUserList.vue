<template>
  <div id="pageUserList">
    <a-page-header>
      <template slot="title">
        <span>User</span>
        <br/>
        <span class="header-subtitle">Manage all your users here</span>
      </template>
      <template slot="extra">
        <a-button key="1" type="primary">
          <a-icon type="plus" />
          Add New User
        </a-button>
      </template>
    </a-page-header>
    <a-table 
      class="data-table" 
      :columns="columns" 
      :data-source="data"
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
  </div>
</template>

<script>
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

const data = [
  {
    key: '1',
    name: 'Eric',
    email: 'eric.ang@gmail.com',
    status: 1,
  },
  {
    key: '2',
    name: 'Olahama',
    email: 'olahama@gmail.com',
    status: 0,
  },
];

const localeOptions = {
  emptyText: 'There is no user yet'
};

export default {
  name: 'UserListPage',
  data() {
    return {
      data,
      columns,
      localeOptions,
    };
  },
  methods: {
    updateUserStatus(record) {
      // Hit update user status API
      if (record.status === 1) {
        record.status = 0;
        this.$snotify.success('You have disabled this user', 'Success');
      } else {
        record.status = 1;
        this.$snotify.success('You have enabled this user', 'Success');
      }
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