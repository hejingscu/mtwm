<template>
  <div class="page">
    <div class="banner">
      <swiper>
        <swiper-slide v-for="item in bannerData">
          <img :src="item.img" alt="">
        </swiper-slide>
      </swiper>
    </div>
    <div class="block-category">
      <div v-for="item in categoryData" class="item-category">
        <img :src="item.icon" alt="">
        <div>{{item.name}}</div>
      </div>
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
    getData(){
      getBanner().then( res => {
        this.bannerData = res.data
      })
      getShop().then( res => {
        this.shopData = res.data
      })
      getCategory().then( res => {
        this.categoryData = res.data
      })
    }
  },
  created: function(){
    // Indicator.open()
  	this.getData()
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
  .block-category{
    .item-category{
      width: 25%;
      float: left;
      height: 1rem;
      img{
        width: .5rem;
        height: .5rem;
      }
    }
  }
</style>
