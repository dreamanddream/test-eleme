<!--星星-->
<template>
<!-- 首先要考虑到星星有不同尺寸，进而就要考虑到怎样加载不同的尺寸-->
  <div class="star">
    <div class="star-item" :class="starType">
      <!-- 根据不同的评分，星星显示个数不一样，所以要想到利用循环,然后要想到循环里的数据怎么得来，当然是父组件给传来 -->
      <span v-for="(itemClass, index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
    </div>
  </div>
</template>

<script>
// 定义常量,星星的长度，就要想到怎样生成itemClasses
const LENGTH = 5
// 这里也是考虑全局观念，通过变量形式一旦有改动，只需要改动这一处即可,所以不是直接拼接
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  data () {
    return {
    }
  },
  props: {
    score: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      // 定义数组
      let result = []
      // 处理分数,这里先乘2，然后向下取整，而不是直接取整，主要考虑到对半星的处理,这也是一个技巧，所以没有直接向下取整
      let score = Math.floor(this.score * 2) / 2
      // 处理半星
      let hasDecimal = score % 1 !== 0
      // 得到整星，直接取整
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 处理半星
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 处理未点亮的灰星
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
<style lang='stylus' rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.star
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
    &.star-48
      .star-item
      // 通过切图可以知道，尺寸48的星星宽度是40px，也就是20px
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        // 同时还要设置最后一个星星没有右边距
        &:last-child
          margin-right 0
        // 同时也要知道，星星有三种状态，所以要设置三种类进行区分，也就是上面定义的itemClass
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 3px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
// 要使用到mixin.styl中的bg-image
// @import "../../common/stylus/mixin.styl"
// .star
//   font-size:0
//     .star-item
//       display:inline-block
//       background-repeat:no-repeat
//     &.star-48
//       .star-item
//       // 通过切图可以知道，尺寸48的星星宽度是40px，也就是20px
//         width 20px
//         height 20px
//         margin-right 22px
//         background-size 20px 20px
//         // 同时还要设置最后一个星星没有右边距
//         &:last-child
//           margin-right 0
//         // 同时也要知道，星星有三种状态，所以要设置三种类进行区分，也就是上面定义的itemClass
//         &.on
//           bg-image('star48_on')
//         &.half
//           bg-image('star48_half')
//         &.off
//           bg-image('star48_off')
</style>
