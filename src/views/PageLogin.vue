<template>
  <div id="login">
    <div class="main">
      <div class="img-wrap">
        <img src="assets/image/login-image.gif" style="width: 350px; height: 250px;" alt="logo"/>
      </div>
      <div class="form-wrap">
        <a-form :form="form">
          <a-form-item >
            <a-input
              v-decorator="[
                'userName',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
              placeholder="Username">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item >
            <a-input
              v-decorator="[
                'userName',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
              placeholder="Password">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="loading" @click="clickLogin">
              Login
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken';
import { mapGetters, mapState, mapActions } from 'vuex';
import { MODULES_LOGIN } from '../general/constant';

export default {
  name: 'LoginPage',
  computed: {
    ...mapGetters(MODULES_LOGIN, ['isLogin']),
    ...mapState(MODULES_LOGIN,['loading']),
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
    ...mapActions(MODULES_LOGIN, [
      'login',
    ]),
    clickLogin() {
      const options = {
        email: 'eric@gmail.com',
        password: '123456',
      };

      this.login(options).then((res) => {
        this.$snotify.success('Login successful', 'Success');
        this.$router.push({path: '/'});
      }).catch(err => {
        let message = err.message;
        if (err.response && err.response.data) {
          message = err.response.data.message;
        }
        this.$snotify.error(message, 'Login Failed');
      });
    },
  }
};
</script>

<style lang="scss">

</style>