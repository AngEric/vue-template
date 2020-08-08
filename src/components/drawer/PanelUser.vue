<template>
  <a-drawer
    title="Create New User"
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
                  rules: [{ required: true, message: 'Please input name' }],
                },
              ]"
              placeholder="User name"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Email">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [{ required: true, message: 'Please input email' }],
                },
              ]"
              placeholder="User email"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Role">
            <a-select
              v-decorator="[
                'role',
                {
                  rules: [{ required: true, message: 'Please select user role' }],
                },
              ]"
              placeholder="User role">
              <a-select-option
                 v-for="(item, idx) in roleList"
                 :key="idx"
                 :value="item.id">
                 {{ item.name }}
              </a-select-option>
            </a-select>
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
import { mapMutations, mapState, mapActions } from 'vuex';
import { MODULE_USER, MODULE_ROLE } from '../../general/constant';

export default {
  name: 'UserPanel',
  computed: {
    ...mapState(MODULE_USER,['opened']),
    ...mapState(MODULE_ROLE,['roleList']),
  },
  data() {
    return {
      form: this.$form.createForm(this, {
      }),
      visible: false,
    };
  },
  mounted(){
    this.loadRole();
  },
  methods: {
    ...mapMutations(MODULE_USER, [
      'handleDrawer',
    ]),
    ...mapActions(MODULE_ROLE, [
      'loadRole',
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
  },
}
</script>

<style>

</style>