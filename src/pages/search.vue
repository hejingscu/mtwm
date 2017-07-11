<template>
  <div class="page" style="font-size: .26rem;">
    
  </div>
</template>

<script>
import { getShop,getBanner,getCategory } from '../service/getData'
import { Indicator  } from 'mint-ui';
export default {
  data () {
    return {
      bannerData: [],
      shopData: [],
      categoryData: [],
      blockShopFlg: false
    }
  },
  methods:{
    
  },
  created: function(){
    
  }
}
</script>

<style lang="scss" scoped>
 
</style>
