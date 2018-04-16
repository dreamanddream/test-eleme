<!--  -->
<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price">0元</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'minPrice': {
      type: Number,
      default: 0
    },
    'deliveryPrice': {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},
  methods: {}
}

</script>
<style lang='stylus'>
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
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #888
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
        .desc
          display inline-block
          color rgba(255, 255, 255, 0.5)
          font-size 16px
          height 24px
          line-height 24px
          margin-top 12px
          margin-left 12px
</style>
