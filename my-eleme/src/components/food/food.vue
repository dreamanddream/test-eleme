<template>
  <transition name="fade">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <!-- 图片的加载属于异步过程 -->
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <!-- 内容 -->
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <!-- 商品数量加减按钮 -->
          <div class="cartControl-wrapper">
            <!-- 同时要将food传入 -->
            <cartControl :food="food"></cartControl>
          </div>
          <!-- 购物车按钮是否显示 -->
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">
            加入购物车
          </div>
          </transition>
        </div>
        <!-- 设置分割线 -->
        <split></split>
        <!-- 商家 -->
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <div class="text">{{ food.info }}</div>
        </div>
        <split></split>
        <!-- 评论信息 -->
        <div class="rating">
          <h1 class="title">商品评价</h1>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
// 使用滚动插件
  import BScroll from 'better-scroll'
  import cartControl from '../cartcontrol/cartcontrol.vue'
  import Vue from 'vue'
  import shopcart from '../shopcart/shopcart.vue'
  import split from '../split/split.vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            // 将$el传入，可点击将click设置为true
            console.log("el")
            console.log(this.$el)
            this.scroll = new BScroll(this.$el, {
              click: true
            })
          } else {
            console.log("el")
            console.log(this.$el)
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        // alert(1)
        // console.log(this.food.count)
        Vue.set(this.food, 'count', 1)
        this.$emit('increment', event.target)
      },
      // incrementTotal (target) {
      //   this.$refs.shopcart.drop(target)
      //   // alert(this.$refs.shopcart.drop(target))
      // },
    },
    components: {
      cartControl,
      split
    }
  }
</script>
<style lang="stylus">
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    &.fade-enter-active, &.fade-leave-active
      transition all 0.2s linear
      transform translate3d(0, 0, 0)
    &.fade-enter, &.fade-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      // 这一height设置为0
      height 0
      // 同时给padding-top设置100%，相对于盒子宽度的100%
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          // 扩大按钮的点击区域
          padding 18px
          font-size 20px
          color #fff
    .content
      padding 18px
      position relative
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700px
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          font-size 10px
          color rgb(147, 153, 159)
          text-decoration line-through
      .cartControl-wrapper
        position absolute
        bottom 12px
        right 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        box-sizing border-box
        font-size 10px
        color #ffffff
        border-radius 10px
        background rgb(0, 160, 220)
        &.buy-enter-active, &.buy-leave-active
          transition: all 0.2s
          opacity: 0
        &.buy-enter, &.buy-leave-active
          opacity: 0
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(77, 85, 93)
      .text
        font-size 12px
        line-height 24px
        padding 0 8px
        color rgb(77, 85, 93)
</style>

