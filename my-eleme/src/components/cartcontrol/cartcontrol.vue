<template>
  <div class="cartcontrol">
    <!-- 点击减号 -->
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
        <i class="inner icon-remove_circle_outline"></i>
    </div>
    </transition>
    <!-- 商品数量 -->
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!-- 点击加号 -->
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    // food对象
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      // event._constructed????
      if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 使用$emit触发事件，传递给父元素
      this.$emit('increment', event.target)
      // console.log("event.target")
      // console.log(event.target)
    },
    decreaseCart (event) {
      if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
      this.food.count--
    }
  }
}
</script>
<style lang="stylus">
  .cartcontrol
      font-size 0
      .cart-decrease,.cart-count,.cart-add
        display inline-block
      .cart-decrease
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.4s linear
        &.fade-enter, &.fade-leave-active
          opacity: 0
          transform translate3d(24px, 0, 0)
        .icon-remove_circle_outline
          font-size 24px
          color #00a0dc
          padding 6px
          &.inner-enter-active, &.inner-leave-active {
            transition: all 0.4s linear
            transform: rotate(0)
          }
          &.inner-enter, &.inner-leave-active {
            opacity: 0
            transform  rotate(180deg)
          }
      .icon-add_circle
        font-size 24px
        color #00a0dc
        padding 6px
      .cart-count
        font-size 10px
        color #93999f
        vertical-align top
        padding-top 6px
        width 12px
        line-height 24px
        text-align center
</style>

