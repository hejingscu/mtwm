<template>
  <div class="page"style="font-size: .26rem;background: #fff;">
    <div class="shop-info">
    </div>
    <tab :text='["点菜","评价","商家"]' :tabIndex="tabIndex"></tab>
    <div class="page-tab" v-if="tabIndex === 0">
      <div class="scroll-tab text-center">
        <div class="item-tab active">
          所有商品
        </div>
      </div>
      <div class="goods-container"  style="padding-bottom: 1.3rem;">
        <div class="item-goods" v-for="(item, index) in goodsData">
          <img :src="item.icon" alt="" height="60">
          {{item.name}}
          <div class="item-num" style="font-size: .4rem;">
            <span v-if="item.count && item.count > 0" @click="decreaseGoods(item, index)">-</span>
            <span v-if="item.count && item.count > 0">{{item.count}}</span>
            <span @click="addGoods(item, index)">+</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page-tab" v-if="tabIndex === 1">
      评价
    </div>

    <div class="page-tab" v-if="tabIndex === 2">
      商家信息
    </div>

    <div class="cart">
      <!-- <div class="cart-main">
        <div class="cart-item-goods" v-for="item in cartData.list">
          {{item.name}}
          <span class="fr">{{item.count}}</span>
        </div>
      </div> -->
      <div class="item-icon"  :class="{'empty': cartData.list.length <= 0, 'notEmpty': cartData.list.length > 0}">
        <span :class="{'item-icon-empty': cartData.list.length <= 0, 'item-icon-notEmpty': cartData.list.length > 0}"></span>
      </div>
      <div class="cart-base">
        <div class="total-price">
          ￥{{totalPrice | number(2)}}
        </div>
        <div class="to-pay" @click="toPay" :class="{'to-pay-empty': cartData.list.length <= 0, 'to-pay-notEmpty': cartData.list.length > 0}">
          去结算
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getShopManage } from '@/service/getData'
export default {
  data () {
    return {
      tabIndex: 0,
      goodsData: [],
      cartData: {shopId: this.$route.query.id, list: []},
      totalBuyCart: {},
      totalPrice: 0
    }
  },
  methods: {
    getData(){
      let that = this
      getShopManage({id: that.$route.query.id}).then( res => {
        res.data.goods.forEach( item => { item.count = 0})//*******必须先给res添加参数count再赋值**********
        that.goodsData = res.data.goods
        that.getBuyCartData()
      })
      //that.$store.dispatch("getFoodsList", {id: that.$route.query.id})
    },
    toPay(){
      this.$router.push('/mine')
    },
    //加减商品
    addGoods(item,index){
      let that = this
      //商品个数增加
      if(item.count&&item.count>0){
        that.goodsData[index].count += 1
      }else{
        item.count = 1
        that.cartData.list.push(item)
      }
      that.saveBuyCartData()
    },
    decreaseGoods(item,index){
      let that = this
      that.goodsData[index].count -= 1
      if(that.goodsData[index].count === 0){
        that.cartData.list.forEach( (obj,index) => {
          if(item.id == obj.id){
            that.cartData.list.splice(index,1)
          }
        })
      }
      that.saveBuyCartData()
    },
    //保存商品数量至localstorage
    saveBuyCartData(){
      let that = this
      //先删除原先的购物车数据
      if(that.totalBuyCart[that.$route.query.id]){
        delete that.totalBuyCart[that.$route.query.id]
      }
      //重新赋值写入localstorage
      that.totalBuyCart[that.$route.query.id] = that.cartData.list
      window.localStorage.setItem('buyCart', JSON.stringify(this.totalBuyCart))
    },
    getBuyCartData(){
      let that = this
      //是否有购物车数据
      if(that.totalBuyCart[that.$route.query.id]){
        let shopCartGoodsList = that.totalBuyCart[that.$route.query.id]//从localstorage拿到的本店铺的购物车数据
        that.cartData.list = shopCartGoodsList//给购物车赋值
        that.goodsData = that.goodsData.concat(shopCartGoodsList).uniqueGoods()//给店铺商品赋值
        let shopCartGoodsMap = {}
        //购物车中的商品数量
        shopCartGoodsList.forEach( item => {
          shopCartGoodsMap[item.id] = item.count
        })
        that.goodsData.forEach( item => {
          for(var i in shopCartGoodsMap){
            if(item.id == i){
              item.count = shopCartGoodsMap[i]
            }
          }
        })
      }
    }
  },
  created: function(){
    this.totalBuyCart = JSON.parse(window.localStorage.getItem('buyCart'))
    if(!this.totalBuyCart){
      this.totalBuyCart = {}
    }
    this.getData()
  },
  watch: {
    //watch购物车内容，计算总价
    'cartData.list': {
        handler(newVal, oldVal){
          this.totalPrice = 0
          newVal.forEach( item => {
            this.totalPrice = (this.totalPrice + item.price * item.count)
          })
        },
        deep: true
      }
  }
}
</script>

<style lang="scss" scoped>
  .shop-info{
    height: 2rem;
    background: #000;
    opacity: .4;
  }
  .page-tab{
    display: flex;
    flex-flow: row wrap;
    .scroll-tab{
      background: #f4f4f4;
      min-height: 70vh;
      width: 20%;
      .item-tab{
        line-height: 1rem;
        height: 1rem;
      }
      .active{
        background: #fff;
      }
    }
    .goods-container{
      width: 80%;
      background: #fff;
      .item-goods{
        position: relative;
        .item-num{
          position: absolute;
          bottom: 0;
          right: 10%;
        }
      }
    }
  }

  .cart{
    position: fixed;
    bottom: 0;
    width: 100%;
    .item-icon{
      position: absolute;
      bottom: .2rem;
      left: 5%;
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
      background: #999;
      span{
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      .item-icon-empty{
        background: url('../../img/cart-empty.png') no-repeat 45%;
        background-size: 60%;
      }
      .item-icon-notEmpty{
        background: url('../../img/cart.png') no-repeat 45%;
        background-size: 60%;
      }
    }
    .empty{
      background: #999;
    }
    .notEmpty{
      background: #f5da55;
    }
    .cart-base{
      height: 1rem;
      background: #444;
      .total-price{
        float: left;
        color: #fff;
        line-height: 1rem;
        font-size: .4rem;
        margin-left: 20%;
      }
      .to-pay{
        float: right;
        width: 24%;
        text-align: center;
        line-height: 1rem;
      }
      .to-pay-empty{
        background: #333;
        color: #999;
      }
      .to-pay-notEmpty{
        background: #f5da55;
        color: #333;
      }
    }
    .cart-main{
      background: #f4f4f4;
      padding: .2rem .5rem;
      .cart-item-goods{
        line-height: .9rem;
      }
    }
  }
</style>
