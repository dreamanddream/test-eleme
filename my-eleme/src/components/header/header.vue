<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <!-- img一般指定宽高 -->
        <img v-bind:src="seller.avatar" alt="" width="64px" height="64px">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <!-- 支持类型 -->
        <div v-if="seller.supports" class="support">
          <!-- 通过数据动态绑定class,根据type值不同，这样对应到classMap就不同，从而渲染不同的结果 -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <!-- 渲染右边5个,就是支持得类型 -->
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
     <!-- 公告 -->
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 模糊背景 -->
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <!-- 弹层 -->
    <div class="detail" v-show="detailShow">
      <!-- sticky footer的处理 -->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <div class="name">{{ seller.name }}</div>
        </div>
      </div>
      <div class="detail-close">
        <!-- 使用图标字体 -->
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  props: {
    seller: {
      type: Object
    }
  },
  // 控制弹层的显示与隐藏
  data () {
    return {
      detailShow: false
    }
  },
  // 在created中创建数组
  created () {
    // 创建classMap，对应不同的类
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  methods: {
    showDetail () {
      this.detailShow = true
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "header.styl";
 @import "../../common/stylus/mixin.styl";
  .header
    color:#fff
    overflow:hidden
    background:rgba(7, 17, 27, 0.5)
    position relative
    .content-wrapper
      position relative
      padding: 24px 12px 18px 24px
      /*消除空格,设置父级font-size为0，主要是图片有间隙 */
      font-size:0
      .avatar
        display:inline-block
        img
          border-radius 2px
      .content
        display:inline-block
        margin-left:16px
        /* font-size:14px */
      .title
        margin: 2px 0 8px 0
        .brand
          display:inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image("brand")
          background-size:30px 18px
          background-repeat: no-repeat
        .name
          margin-left:6px
          font-size 16px
          line-height 18px
          font-weight bold
      .description
        margin-bottom: 10px
        line-height: 12px
        font-size:12px
      .support
        .icon
          vertical-align:top
          display: inline-block
          width:12px
          height 12px
          margin-right: 4px
          background-size:12px 12px
          background-repeat:no-repeat
          /*这里应该是根据后台返回的不同数据，渲染不同的图片，在这里通过类进行区分 */
          /*怎样将返回值中的type0,1,2,3对应到不同的类 */
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
        // 这个font-size为10px在谷歌下是12px，但是在手机上是可以的
          font-size 10px
          line-height:12px
      .supports-count
        // 处理右边5个支持类型,添加定位
        position:absolute
        right 12px
        bottom:18px;
        padding:0 8px
        height:24px;
        line-height 24px
        border-radius:14px
        background:rgba(255, 0, 0, 0.7)
        text-align:center
        .count
          vertical-align:top
          font-size:10px
          display:inline-block
        .icon-keyboard_arrow_right
          font-size:10px
          // 这里要重写line-height，要不line-height是1
          line-height:24px
          margin-left:2px
    .bulletin-wrapper
      position relative
      height:28px
      line-height:28px
      padding: 0 22px 0 12px
      white-space:nowrap
      overflow hidden
      text-overflow:ellipsis
      background rgba(7, 17, 27, 0.7)
      .bulletin-title
        display:inline-block
        width:22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat:no-repeat
        vertical-align :top
        margin-top:8px
      .bulletin-text
        font-size:10px
        vertical-align top
        margin:0 4px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        top 7px
        right 12px
    .background
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      height 100%
      filter:blur(10px)
      img
        width 100%
        height 100%
    // 弹层
    .detail
      position:fixed
      z-index 100
      width 100%
      height 100%
      left 0
      top 0px
      background rgba(7, 17, 27, 0.6)
      .detail-wrapper
        width:100%
        min-height 100%
        .detail-main
          margin-top 64px
          // 这个padding-bottom有很重要作用，自己平常写项目也是这样
          padding-bottom 64px
          .name
            line-height:16px
            text-align center
            font-size 16px
            font-weight 7000
      .detail-close
          position relative
          width 32px
          height 32px
          margin: -64px auto 0 auto
          clear:both
          font-size 32px
</style>
