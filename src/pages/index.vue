<template>
  <div class="page" style="font-size: .26rem;">
    <div class="banner">
      <swiper>
        <swiper-slide v-for="item in bannerData">
          <img :src="item.img" alt="">
        </swiper-slide>
      </swiper>
    </div>
    <div class="block-category" id="category" style="position: relative;z-index: 101;">
      <div v-for="item in categoryData" class="item-category">
        <div class="item-inner">
          <img :src="item.icon" alt="">
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="block-shop">
      <div class="block-title text-center" id="blockShopTitle" style="position: relative;z-index: 101;">附近商家</div>
      <searchOption @getshop="getShop" ></searchOption>
      <shopList :data="shopData"></shopList>
    </div>
  </div>
</template>

<script>
import { getShop,getBanner,getCategory } from '../service/getData'
import { Indicator  } from 'mint-ui';
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      bannerData: [],
      shopData: [],
      categoryData: []
    }
  },
  components: {swiper, swiperSlide},
  methods:{
    getMain(){
      getBanner().then( res => {
        this.bannerData = res.data
      })
      getCategory().then( res => {
        this.categoryData = res.data
      })
    },
    getShop(option){
      console.log(option)
      getShop().then( res => {
        this.shopData = res.data
      })
    }
  },
  created: function(){
    // Indicator.open()
  	this.getMain()
    this.getShop()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .swiper-container{
    height: 2rem;
    img{
      height: 100%;
    }
  }
  .block-title{
    height: .8rem;
    line-height: .8rem;
    border-bottom: 1px solid #eee;
  }
  .block-category{
    background: #fff;
    margin-bottom: .2rem;
    display: flex;
    flex-flow: row wrap;
    .item-category{
      width: 25%;
      //float: left;
      height: 1.7rem;
      padding: .3rem;
      .item-inner{
        text-align: center;
        font-size: .26rem;
      }
      img{
        width: .7rem;
        height: .7rem;
      }
    }
  }
  .block-shop{
    background: #fff;
    margin-bottom: .2rem;
  }
</style>
