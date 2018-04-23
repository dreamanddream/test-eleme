<template>
  <div class="ratingselect">
    <div class="rating-type">
      <!-- 直接使用外层传入的desc -->
      <span>{{desc.all}}</span>
      <span>{{desc.positive}}</span>
      <span>{{desc.negative}}</span>
    </div>
    <div class="switch">
      
    </div>
  </div>
</template>
<script>
// 三种状态
const POSITIVE = 0
const NEGATIVE = 0
const ALL = 2
  export default {
    props: {
      rating: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      // 用于筛选，是否显示有评价的内容
      onlyContent: {
        type: Boolean,
        default: false
      },
      // 多扩展性
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    }
  }
</script>
<style lang="stylus">

</style>

