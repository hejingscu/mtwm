<template>
  <div class="page" style="font-size: .26rem;">
    订单页
    {{test}}
  </div>
</template>

<script>
import { getShop,getBanner,getCategory } from '../service/getData'
import { Indicator  } from 'mint-ui';
export default {
  data () {
    return {
      test: true
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
