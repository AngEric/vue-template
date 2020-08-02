<template>
  <a-drawer
    title="Create New Role"
    :width="480"
    :visible="opened"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose">
    <a-form :form="form" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Name">
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Please input role name' }],
                },
              ]"
              placeholder="Role name"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Access Permission">
            <a-checkbox-group
              v-decorator="['permissions',
              { rules: [{ required: true, message: 'Please select at least 1 permission' }] }]"
              style="width: 100%;">
              <a-row>
                <a-col 
                 v-for="(item, idx) in permissionData"
                 :key="idx"
                 :span="12">
                 <a-checkbox
                  :value="item.id"
                  :disabled="onDisabled(item)">{{ item.name }}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="drawer-submit">
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        Cancel
      </a-button>
      <a-button type="primary" @click="submitRole">
        Submit
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MODULE_ROLE } from '../../general/constant';
import _ from 'lodash';
const permissionData = [
  {
    id: 1,
    name: 'All',
    slug: 'all',
  },
  {
    id: 2,
    name: 'View User Page',
    slug: 'view-user-page',
  },
  {
    id: 3,
    name: 'Add New User',
    slug: 'add-new-user',
  },
  {
    id: 4,
    name: 'Update User',
    slug: 'update-user',
  },
  {
    id: 5,
    name: 'View Role Page',
    slug: 'view-role-page',
  },
  {
    id: 6,
    name: 'Add New Role',
    slug: 'add-new-role',
  },
  {
    id: 7,
    name: 'Update Role',
    slug: 'update-role',
  },
];
export default {
  name: 'RolePanel',
  computed: {
    ...mapState(MODULE_ROLE,['opened']),
  },
  data() {
    return {
      form: this.$form.createForm(this, {

      }),
      visible: false,
      permissionData,
    };
  },
  methods: {
    ...mapMutations(MODULE_ROLE, [
      'handleDrawer',
    ]),
    onClose() {
      this.handleDrawer(false);
      this.form.resetFields();
    },
    submitRole(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
      });
    },
    onDisabled(data) {
      const selectedPermissions = this.form.getFieldValue('permissions');
      const superPermission = _.find(permissionData, (p) => p.slug === 'all');
      if (!superPermission || !selectedPermissions) {
        return false;
      }
      const selected = selectedPermissions.indexOf(superPermission.id);
      return selected > -1 && data.id !== superPermission.id ? true : false;
    }
  },
}
</script>

<style>

</style>