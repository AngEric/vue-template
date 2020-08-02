<template>
  <div id="pageUserList">
    <a-page-header
      title="User">
      <template slot="extra">
        <a-button key="1" type="primary">
          <a-icon class="align-icon" type="plus" />
          Add New User
        </a-button>
      </template>
    </a-page-header>
    <a-table class="data-table" :columns="columns" :data-source="data">
      <template slot="userStatus" slot-scope="status">
        <a-tag
        :color="status.toString() === '1' ? 'green' : 'volcano'"
      >
        {{ status.toString() === '1' ? 'Active' : 'Non-Active' }}
      </a-tag>
      </template>
      <template slot="footer" slot-scope="currentPageData">
        Pagination 
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
    scopedSlots: { customRender: 'userStatus' },
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

export default {
  name: 'UserListPage',
  data() {
    return {
      data,
      columns,
    };
  },
}
</script>

<style>

</style>