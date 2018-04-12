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
          <!-- 通过数据动态绑定class -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
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
  created () {
    // 创建classMap，对应不同的类
    this.classMap=[ 'decrease','discount','guarantee','invoice','special']
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "header.styl";
 @import "../../common/stylus/mixin.styl";
  .header
    color:#fff
    background: #000
    .content-wrapper
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
          font-size 12px
          line-height:12px  
</style>
