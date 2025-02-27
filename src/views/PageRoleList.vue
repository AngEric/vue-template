<template>
  <div id="pageUserList">
    <a-page-header>
      <template slot="title">
        <span>Role</span>
        <br/>
        <span class="header-subtitle">Manage role and access permission</span>
      </template>
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
      :data-source="roleList"
      :locale="localeOptions">
      <template slot="permissions" slot-scope="record">
        <a-tag
          v-for="tag in record.active_permissions"
          :key="tag.id"
          color="#108ee9">
          {{ convertSlugToName(tag.slug) }}
        </a-tag>
      </template>
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
          @change="updateRoleStatus(record)"/>
        <a-button type="link">Edit</a-button>
      </template>
    </a-table>
    <PanelRole/>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import { MODULE_ROLE } from '../general/constant';
import PanelRole from '../components/drawer/PanelRole';
import Helper from '../general/helper';
import Converter from '../mixin/converter';

// Table column
const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    width: 250,
  },
  {
    key: 'permissions',
    title: 'Permissions',
    scopedSlots: { customRender: 'permissions' },
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    width: 150,
    scopedSlots: { customRender: 'status' },
  },
  {
    key: 'action',
    title: 'Action',
    scopedSlots: { customRender: 'action' },
  },
];

const localeOptions = {
  emptyText: 'There is no role yet'
};

export default {
  name: 'RolePage',
  mixins: [Converter],
  computed: {
    ...mapState(MODULE_ROLE,['opened', 'roleList']),
  },
  components: {
    PanelRole,
  },
  data() {
    return {
      columns,
      localeOptions,
    };
  },
  mounted() {
    this.loadRole();
  },
  methods: {
    ...mapMutations(MODULE_ROLE, [
      'handleDrawer',
    ]),
    ...mapActions(MODULE_ROLE, [
      'loadRole',
      'updateStatus'
    ]),
    openRolePanel() {
      this.handleDrawer(true);
    },
    updateRoleStatus(record) {
      const data = {
        id: record.id,
      };
      this.updateStatus(data).then((res) => {
        this.$snotify.success(res.message);
      }).catch(err => {
        let message = err.message;
        if (err.response && err.response.data) {
          message = err.response.data.message;
        }
        this.$snotify.error(message);
      });
    }
  },
}
</script>

<style>

</style>