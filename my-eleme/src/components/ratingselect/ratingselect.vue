<template>
  <div class="ratingselect">
    <div class="rating-type">
      <!-- 直接使用外层传入的desc -->
      <!-- 默认selectType是all，all也就是代表常量2 -->
      <span class="block positive" @click="select(2, $event)" :class="{'active':selectType === 2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0, $event)" :class="{'active':selectType === 0}">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" @click="select(1, $event)" :class="{'active':selectType === 1}">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <!-- 只看有内容的评价 -->
    <div class="switch" @click="toggleContent($event)" :class="{'on':onlyContent}">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
// 三种状态
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
  export default {
    props: {
      ratings: {
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
    },
    computed: {
      positives () {
        return this.ratings.filter((rating => {
          return rating.rateType === POSITIVE
        }))
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }

    },
    methods: {
      select (type, event) {
        if(!event._constructed){
          return
        }
        this.selectType = type
        // 将事件通知到increment同时将selecttype和type传递过去
        this.$emit('increment','selectType',type)
      },
      // 是否显示全部内容的切换
      toggleContent () {
        if (!event._constructed) {
          return
        }
        this.onlyContent = !this.onlyContent
        // 通知父组件，将onlyContent和onlyContent传递给父组件
        this.$emit('increment', 'onlyContent', this.onlyContent)
      }
    }
  }
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.ratingselect
  .rating-type
    padding 18px 0
    margin 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size 0
    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      border-radius 1px
      font-size 12px
      color rgb(77, 85, 93)
      &.positive
        background rgba(0, 160, 220, 0.2)
        &.active
          color #ffffff
          background rgb(0, 160, 220)
      &.negative
        background rgba(77, 85, 93, 0.2)
        &.active
          color #ffffff
          background rgb(77, 85, 93)
      .count
        font-size 8px
        margin-left 2px
        line-height 16px
  .switch
    padding 12px 18px
    line-height 24px
    font-size 12px
    color rgb(147, 153, 159)
    border 1px solid rgba(1, 17, 27, 0.1)
    font-size 0
    &.on
      .icon-check_circle
        color #00c850
    .icon-check_circle
      display inline-block
      vertical-align top
      font-size 24px
      margin-right 4px
    .text
      font-size 12px
</style>

