<!--  -->
<template>
  <div class="shopcart">
    <div class="content" @click="toggleList($event)">
      <div class="content-left">
        <div class="logo-wrapper">
          <!-- 购物车以及高亮显示 -->
          <div class="logo" :class="{'highlight': totalCount> 0}">
            <span class="icon-shopping_cart" :class="{'highlight': totalCount> 0}"></span>
          </div>
          <!-- 购物车上的红色小图标显示总量 -->
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <p class="price">￥{{minPrice}}起送</p>
      </div>
    </div>
    <!-- 购物车列表,渲染用户添加的商品 -->
    <transition name="fade">
      <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty">清空</span>
      </div>
      <div class="list-content" ref="listcontent">
        <ul>
          <li class="shopcart-food" v-for="(food, index) in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price"><span>￥{{food.price * food.count}}</span></div>
            <!-- 这里也有一个数量加减控制 -->
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>

  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'
export default {
  props: {
    'minPrice': {
      type: Number,
      default: 0
    },
    'deliveryPrice': {
      type: Number,
      default: 0
    },
    'selectFoods': {
      type: Array,
      // default () {
      //   count: 0
      // }
      default() {
        return [{price: 20,count: 2}]
      }
    }
  },
  data () {
    return {
      fold: true,
      balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
      dropBalls: []
    }
  },
  components: {
    cartcontrol
  },
  computed: {
    // 获取总价格
    totalPrice () {
      let total = 0
      // 一定要和之前自己一直使用jquery操作dom分隔开
      // 这里都是通过对数据进行处理
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 获取总数量
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
  // 是否显示购物车列表详情
  listShow () {
    if (!this.totalCount) {
      this.fold = true
      return false
    }
    // 注意逻辑，要看最终返回的show的布尔值的真实性
    let show = !this.fold
    if (show) {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listcontent,{
          click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
    return show
  }
  },
  methods: {
    toggleList (event) {
      // 这里还有个注意点，totalCount是在computed中定义的，所以在整个组件中都能用？？？
      if(!this.totalCount){
        // 如果没有数量，直接return
        return
      }
      this.fold = !this.fold
    },
    // drop
    drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            console.log("dropBalls")
            console.log(this.dropBalls)
            return
          }
        }
      }
  }
}
</script>
<style lang='stylus'>
@import "../../common/stylus/mixin.styl"
  .shopcart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 50
    .content
      display flex
      background #141d27
      // 取消空白间隙
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 24px
            line-height 24px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #888
              &.highlight
                color #fff
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255, 255, 255, 0.2)
          font-size 16px
          font-weight 700
          color rgba(255, 255, 255, 0.5)
          &.highlight
            color #fff
        .desc
          display inline-block
          color rgba(255, 255, 255, 0.5)
          font-size 12px
          height 24px
          line-height 24px
          margin-top 12px
          margin-left 12px
      .content-right
        width 105px
        box-sizing border-box
        padding 0 8px
        text-align center
        background #2b343c
        .price
          font-size 12px
          color rgba(255, 255, 255, 0.4)
          height 48px
          line-height 48px
          font-weight 700
    .shopcart-list
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      transform translate3d(0, -100%, 0)
      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.5s
        transform translate3d(0, -100%, 0)
      }
      &.fade-enter, &.fade-leave-active {
        transform translate3d(0, 0, 0)
      }
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #ffffff
        .shopcart-food
        position relative
        padding 12px 0
        box-sizing border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px
</style>
