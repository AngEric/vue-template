<template>
  <div id="pageUserList">
    <a-page-header
      title="Role">
      <template slot="extra">
        <a-button key="1" type="primary" @click="openRolePanel">
          <a-icon type="plus" />
          Add New Role
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
        :color="status.toString() === '1' ? 'blue' : 'volcano'">
          {{ status.toString() === '1' ? 'Active' : 'Inactive' }}
        </a-tag>
      </template>
      <template slot="action" slot-scope="record">
        <a-switch 
          v-bind:class="record.status.toString() === '1' ? null : 'switch-inactive'"
          :default-checked="record.status.toString() === '1' ? true: false"
          @change="updateUserStatus(record)"/>
      </template>
    </a-table>
    <PanelRole/>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MODULE_ROLE } from '../general/constant';
import PanelRole from '../components/drawer/PanelRole';

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
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

const data = [];

const localeOptions = {
  emptyText: 'There is no role yet'
};

export default {
  name: 'RolePage',
  computed: {
    ...mapState(MODULE_ROLE,['opened']),
  },
  components: {
    PanelRole,
  },
  data() {
    return {
      data,
      columns,
      localeOptions,
    };
  },
  methods: {
    ...mapMutations(MODULE_ROLE, [
      'handleDrawer',
    ]),
    updateUserStatus(record) {
      // Hit update user status API
      if (record.status === 1) {
        record.status = 0;
        this.$snotify.success('You have disabled this user');
      } else {
        record.status = 1;
        this.$snotify.success('You have enabled this user');
      }
    },
    openRolePanel() {
      this.handleDrawer(true);
    },
  },
}
</script>

<style>

</style>