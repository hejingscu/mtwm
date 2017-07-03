<template lang="html">
  <div class="page-bar">
      <a href="javascript:;">首页</a>
      <span v-if="getParentBarNode.text"><i class="fa fa-circle"></i><a v-bind:href="getParentBarNode.url">{{getParentBarNode.text}}</a></span>
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
    computed: {
        ...mapGetters(['getParentBarNode'])
    },
    mounted(){

    },
    created: function(){
      router.beforeEach((to, from, next) => {
        if(to.path !== from.name){this.name = to.name}
          if(this.getParentBarNode.text){
            this.$store.dispatch("clearParentBarNode")
          }
          next()
      })
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