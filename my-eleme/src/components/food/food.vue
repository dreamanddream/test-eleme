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
          <ratingselect :ratings="food.ratings" :select-type="selectType" :desc="desc" :only-content="onlyContent" @increment="incrementTotal"></ratingselect>
          <div class="rating-wrapper">
            <!-- 首先处理是否显示 -->
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
             <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
          </div>
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
  import ratingselect from '../ratingselect/ratingselect.vue'
  import {formatDate} from '../../common/js/date'
  const ALL = 2
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent : true,
        desc: {
          all : '全部',
          positive : '推荐',
          negative : '吐槽'
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
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
        // this.$emit('increment', event.target)
      },
      // 很巧妙的方法,处理过滤
      needShow(type, text) {
        // 分为三种情况，1.只显示有内容2.显示推荐的3.显示好评的   最终是返回true或者false结合v-show对li排查进行显示或者不显示
        // 挑选出没有内容的，设置返回值为false，然后就不显示了
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          // console.log(type === this.selectType);
          // 通过这个实现过滤，当点击时传递过来的selectType和遍历的类型type一致时就显示
          return type === this.selectType;
        }
      },
      incrementTotal (type, data) {
        this[type] = data
        // console.log("this[type]")
        // console.log(this[type])
        // console.log(data)
        // 重新加载dom
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      // 处理时间
      filters: {
        formatDate(time) {
          let date = new Date(time);
          console.log(date);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      }
    },
    components: {
      cartControl,
      split,
      ratingselect
    }
  }
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl";
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
    .rating
      padding-top 18px
      .title
        line-height 14px
        margin-left 18px
        font-size 14px
        color rgb(7, 17, 27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(1, 17, 27, 0.1))
          .user
            position absolute
            right 0
            top 16px
            font-size 0
            line-height 12px
            .name
              display inline-block
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
              margin-right 6px
            .avatar
              border-radius 50%
          .time
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
            .icon-thumb_up,.icon-thumb_down
              margin-right 4px
              line-height 16px
              font-size 12px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(147, 153, 159)
        .no-rating
          padding 16px 0
          font-size 12px
          color rgb(147, 153, 159)
</style>

