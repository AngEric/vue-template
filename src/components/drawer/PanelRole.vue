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
                 v-for="(item, idx) in permissionList"
                 :key="idx"
                 :span="12">
                 <a-checkbox
                  :value="item.id"
                  :disabled="onDisabled(item)">{{ convertSlugToName(item.slug) }}</a-checkbox>
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
import _ from 'lodash';
import { mapMutations, mapState, mapActions } from 'vuex';
import { MODULE_ROLE, MODULE_PERMISSION } from '../../general/constant';
import Converter from '../../mixin/converter';

export default {
  name: 'RolePanel',
  mixins: [Converter],
  computed: {
    ...mapState(MODULE_ROLE,['opened']),
    ...mapState(MODULE_PERMISSION,['permissionList']),
  },
  data() {
    return {
      form: this.$form.createForm(this, {
      }),
      visible: false,
    };
  },
  mounted(){
    this.loadPermission();
  },
  methods: {
    ...mapMutations(MODULE_ROLE, [
      'handleDrawer',
    ]),
    ...mapActions(MODULE_ROLE, [
      'addRole',
    ]),
    ...mapActions(MODULE_PERMISSION, [
      'loadPermission',
    ]),
    onClose() {
      this.handleDrawer(false);
      this.form.resetFields();
    },
    submitRole(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.addRole(values).then((res) => {
            this.$snotify.success(res.message);
            this.onClose();
          }).catch(err => {
            let message = err.message;
            if (err.response && err.response.data) {
              message = err.response.data.message;
            }
            this.$snotify.error(message);
          });
        }
      });
    },
    onDisabled(data) {
      const selectedPermissions = this.form.getFieldValue('permissions');
      const superPermission = _.find(this.permissionList, (p) => p.slug === 'all');
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