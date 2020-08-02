<template>
  <div id="app">
    <router-view/>
    <vue-snotify id="myNotification"></vue-snotify>
  </div>
</template>
<script>
import { EventBus } from './event/event-bus';
export default {
  created(){
    EventBus.$on('snotifyInfo', function (message) {
			this.$snotify.info(message, 'Information');
		})
  },
}
</script>
<style lang="scss">
@import "./assets/scss/app.scss";
</style>
