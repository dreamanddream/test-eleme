<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <v-header></v-header> -->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link v-bind:to="'/goods'">
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
          商家
        </router-link>
      </div>
    </div>
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
 .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    /*border: 1px solid rgba(7,17,27,0.1);*/
  /* border-1px(rgba(7, 17, 27, 0.1)); */
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
  }

  .tab .tab-item a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  .tab .tab-item .active {
    color: rgb(240, 20, 20);
  }

</style>
