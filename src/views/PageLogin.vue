<template>
  <div id="login">
    <div class="main">
      <div class="img-wrap">
        <img src="assets/image/login-image.gif" style="width: 350px; height: 250px;" alt="logo"/>
      </div>
      <div class="form-wrap">
        <a-form :form="form" @submit="clickLogin">
          <a-form-item >
            <a-input
              v-decorator="[
                'email',
                { rules: [{ required: true, message: 'Please input your email!' }] },
              ]"
              placeholder="Email">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item >
            <a-input-password
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your password!' }] },
              ]"
              placeholder="Password">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="loading">
              Login
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import jwt from 'jsonwebtoken';
import { mapGetters, mapState, mapActions } from 'vuex';
import { MODULE_LOGIN } from '../general/constant';
import { EventBus } from '../event/event-bus';

export default {
  name: 'LoginPage',
  computed: {
    ...mapGetters(MODULE_LOGIN, ['isLogin']),
    ...mapState(MODULE_LOGIN,['loading']),
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'form_login' }),
    };
  },
  mounted() {
    if (this.isLogin) {
      this.$router.push({path: '/'});
    }
    
  },
  methods: {
    ...mapActions(MODULE_LOGIN, [
      'login',
    ]),
    clickLogin(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login(values).then((res) => {
            this.$snotify.success('Login successful', 'Success');
            this.$router.push({path: '/'});
          }).catch(err => {
            let message = err.message;
            if (err.response && err.response.data) {
              message = err.response.data.message;
            }
            this.$snotify.error(message, 'Login Failed');
          });
        }
      });
    },
  }
};
</script>

<style lang="scss">

</style>