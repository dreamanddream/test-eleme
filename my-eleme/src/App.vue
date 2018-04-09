<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <v-header></v-header>
    <router-view/>
  </div>
</template>
<script type="text/ecmascript-6">
import header from './components/header/header.vue'
// 通过export default导出一个对象
export default {
  name: 'App',
  components: {
    'v-header': header
  }
}
</script>
<style>
#app{
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
