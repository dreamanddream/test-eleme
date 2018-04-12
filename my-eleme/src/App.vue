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
// 定义全局常量，项目中如果多次使用，方便同意修改，这是一种思路
const ERR_OK = 0
// 通过export default导出一个对象
export default {
  name: 'App',
  // 在vue中当使用组件时，data被规定为函数，data方法。组件时可以被复用的，如果是对象更改了一个组件，另一个也会跟着更改
  // data函数return一个空对象，通过发送ajax请求得到数据
  // 第三方插件vue-resource
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((res) => {
      // res = res.json()
      // console.log(res.json)
      res = res.body
      if (res.errno === ERR_OK) {
        this.seller = res.data
        console.log(this.seller)
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
// 引入混合书写stylus
  @import "common/stylus/mixin.styl";
 .tab {
    display: flex;
    width: 100%;
    /* 设计图上的高度是80px */
    height: 40px;
    line-height: 40px;
    /*border: 1px solid rgba(7,17,27,0.1);*/
    border-1px(rgba(7, 17, 27, 0.1));
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
