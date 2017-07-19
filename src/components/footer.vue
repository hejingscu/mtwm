<template>
  <div class="footer-container">
    <router-link :to="{ path: item.url}" class="item" @click="switchTab(index)" v-for="(item, index) in text" :class="{'active': tabIndex === index}">
      {{item.name}}
    </router-link>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        text: [
          {name: '首页', url: 'index'},
          {name: '订单', url: 'order'},
          {name: '我的', url: 'mine'}
        ]
      }
    },
    props: {
      tabIndex: {
        type: Number
      }
    },
    methods: {
      switchTab(index){
        this.$parent.tabIndex = index
      }
    }
  }
</script>
<style lang="scss" scoped>
  .footer-container{
    display: flex;
    position: fixed;
    width: 100%;
    background: #eee;
    opacity: .9;
    bottom: 0;
    .item{
      flex: 1;
      text-align: center;
      line-height: .8rem;
      margin: 0 8%;
      color: #111;
    }
    .active{
      border-bottom: 2px solid #27a1e5;
      color: #27a1e5;
    }
  }
</style>