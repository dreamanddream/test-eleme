<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <!-- 右侧评分 -->
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <!-- 用到星星就用star -->
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
    <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent"></ratingselect>
  <!-- 具体的评论内容 -->
    <div class="rating-wrapper">
      <ul>
        <li v-for="(rating, index) in ratings" :key="index" class="rating-item">
          <div class="avatar">
            <img :src="rating.avatar" alt="" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <!-- 如果有送达时间就显示，逻辑严谨 -->
              <span class="delivery" v-show="rating.deliveryTime">
                {{rating.deliveryTime}}分钟送达
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>
<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
import BScroll from 'better-scroll'
const ALL = 2
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  // 定义需要的数据
  // 很明显ratingselect组件需要父级传递信息过去，所以这里需要在data中定义
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  created () {
    this.$http.get('/api/ratings').then((res) => {
      // 要看请求的方法体res.body
      res = res.body
      if (res.errno === ERR_OK) {
        this.ratings = res.data
        this.$nextTick(() => {
          // console.log(this.ratings)
          this.scroll = new BScroll(this.$refs.ratings,
            {click: true}
          )
        })
      }
    })
  },
  components: {
    star,
    split,
    ratingselect
  }
}
</script>
<style lang="stylus">
 @import "../../common/stylus/mixin.styl"
.ratings
  position absolute
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  .overview
    display flex
    padding 18px 0 18px 18px
    .overview-left
      flex 0 0 137px
      width 137px
      padding 6px 0px
      border-right 1px solid rgba(7, 17, 27, 0.1)
      text-align center
      @media only screen and (max-width 320px)
        flex 0 0 110px
        width 110px
      .score
        margin-bottom 12px
        line-height 28px
        font-size 24px
        color rgb(255, 153, 0)
      .title
        margin-bottom 8px
        line-height 12px
        font-size 12px
        color rgb(7, 17, 27)
      .rank
        line-height 10px
        font-size 12px
        color rgb(147, 153, 159)
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      @media only screen and (max-width 320px)
        padding-left 6px
      .score-wrapper
        line-height 18px
        margin-top 8px
        font-size 0
        .title
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .star
          display inline-block
          margin 0 12px
          vertical-align top
        .score
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(266, 153, 0)
      .delivery-wrapper
        font-size 0
        .title
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .delivery
          display inline-block
          margin-left 12px
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(147, 153, 159)

  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      border-1px(rgba(1, 17, 27, 0.1))
      .avatar
        flex 0 0 28px
        width 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        position relative
        flex 1
        .name
          margin-bottom 4px
          line-height 12px
          font-weight 700
          font-size 10px
          color rgb(7, 17, 27)
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            margin-right 16px
            vertical-align top
          .delivery
            display inline-block
            vertical-align top
            font-size 10px
            line-height 12px
            color rgb(147, 153, 159)
        .text
          line-height 18px
          color rgb(7, 17, 27)
          font-size 12px
          margin-bottom 8px
        .recommend
          line-height 16px
          font-size 0
          .iconfont, .item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          .iconfont
            color rgb(0, 160, 220)
          .item
            padding 0 6px
            border 1px solid rgba(7, 17, 27, 0.1)
            border-radius 1px
            color rgb(147, 153, 159)
            background #fffff
        .time
          position absolute
          top 0
          right 0
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
</style>
