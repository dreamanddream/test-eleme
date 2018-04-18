<template>
  <div class="goods">
    <!-- 分析设计稿：一左一右 -->
    <!-- menu-wrpper左侧菜单栏 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text">
            <!-- 通过简单判断，决定是否显文字旁边的小图片,要看数据结构 -->
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧食品 -->
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="food-list food-list-hook" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="" width="57px" height="57px">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <!-- 这里只有降才显示，所以要加个v-show -->
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <!-- 加减商品数量，在哪个页面使用在哪添加div保证复用性 -->
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @increment="incrementTotal"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 底部购物车 -->
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart" :select-foods="selectFoods"></shopcart>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  // 定义要用到的数据
  data () {
    return {
      goods: [],
      listHeight: [],
      scrolly: 0
    }
  },
  // 计算属性
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 没有滚动右边栏目时，scrolly的值是0，根据右侧菜单进行滚动，同时将左边对应栏目显示高亮
        if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
          return i
        }
      }
      return 0
    },
    //处理选中的商品
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  // 请求数据
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this.$http.get('./api/goods').then((res) => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.goods = res.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
    // this.$nextTick(() => {
    //     this._initScroll()
    //     this._calculateHeight()
    // })
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     this._initScroll()
  //     this._calculateHeight()
  //   })
  // },
  methods: {
    // 初始化滚动
    _initScroll () {
      //  左侧菜单
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      // foodWrapper右侧对应的栏目
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      })
      // 同时给右侧添加滚动
      this.foodScroll.on('scroll', (pos) => {
        // pos.y获取滚动的纵坐标,实时获取
        this.scrolly = Math.abs(Math.round(pos.y))
      })
    },
    // 计算高度  获取每个li距离顶部得高度
    _calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      console.log(foodList.length)
      let height = 0
      this.listHeight.push(height)
      console.log(foodList.length)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        // console.log(item)
        // 原生js获取clientHeight
        height += item.clientHeight
        console.log(item.clientHeight)
        this.listHeight.push(height)
        // console.log("px")
        console.log(this.listHeight)
      }
    },
    //  点击左侧菜单标题
    selectMenu (index, event) {
      // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true
      if (!event._constructed) {
        // 去掉自带click事件的点击
        return
      }
      //
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      // el就是具体食物的某个li内容项目，左侧点击哪个将对应的index和右侧食物栏目的index对应起来
      console.log(el)
      // 调用better-scroll方法
      // scrollToElement(el, time, offsetX, offsetY, easing)
      this.foodScroll.scrollToElement(el, 300)
    },
    // 单击加号接收子组件传递的事件
    incrementTotal (target) {
      this.$refs.shopcart.drop(target)
      alert(this.$refs.shopcart.drop(target))
    },

  },
  components: {
    shopcart,
    cartcontrol
  }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
        // 在每个列表项目中，又是左侧图片固定，右边自适应，flex布局
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        // 取消列表页中最后一个的边框
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            font-size 10px
            color rgb(147, 153, 159)
            line-height 10px
          .extra
            .count
              margin-right 12px
          .desc
            margin-bottom 8px
          .price
            font-weight 700
            line-height 24px
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
</style>
