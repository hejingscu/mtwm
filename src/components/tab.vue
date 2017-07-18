<template>
  <div class="tab-container">
    <div class="item" @click="switchTab(index)" v-for="(item, index) in text" :class="{'active': tabIndex === index}">{{item}}</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    },
    props: {
      tabIndex: {
        type: Number
      },
      text: {
        type: Array
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
  .tab-container{
    display: flex;
    border-bottom: 1px solid #ddd;
    &>div{
      flex: 1;
      text-align: center;
      line-height: .8rem;
      margin: 0 8%;
    }
    .active{
      border-bottom: 2px solid #27a1e5;
      color: #27a1e5;
    }
  }
</style>