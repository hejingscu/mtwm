<template lang="html">
  <div class="page-bar">
      <a href="javascript:;">首页</a>
      <i class="fa fa-circle"></i><a href="javascript:;">{{name}}</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '../router'
export default {
    data(){
      return {
        name: this.$route.name
      }
    },
    mounted(){

    },
    created: function(){
      // router.beforeEach((to, from, next) => {
      //   if(to.path !== from.name){this.name = to.name}
      //     if(this.getParentBarNode.text){
      //       this.$store.dispatch("clearParentBarNode")
      //     }
      //     next()
      // })
      console.log(this.$route)
    },
    watch: {
      
    }
}
</script>

<style lang="scss" scoped>
.fa-circle{
  margin: 0 6px;
}
.page-bar{
  a{
    color: #515151;
  }
}
</style>