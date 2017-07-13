<template>
  <div :class="{'fixedTop' : fixedTop, 'notFixedTop': !fixedTop}" id="searchOptionPosition">
    <div class="block-option" id="blockOption">
      <div class="item-option" :class="{'active' : curIndex === 0}" @click="switchTab(0)">综合排序</div>
      <div class="item-option" :class="{'active' : curIndex === 1}" @click="switchTab(1)">销量最高</div>
      <div class="item-option" :class="{'active' : curIndex === 2}" @click="switchTab(2)">距离最近</div>
      <div class="item-option">筛选</div>
    </div>
    
    <transition name="fade">
      <div class="block-zh-rank"  v-if="showZhRank">
        <div class="item-rank"  @click="switchTab(0, 'pfzg')">评分最高</div>
        <div class="item-rank"  @click="switchTab(0, 'psfzd')">配送费最低</div>
        <div class="item-rank"  @click="switchTab(0, 'zsjzd')">起送价最低</div>
        <div class="item-rank"  @click="switchTab(0, 'rjzd')">人均最低</div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showZhRank" @click="switchTab(0)" style="height: 100vh;position: absolute;top: 0;background: #000;z-index: 99;opacity: .8;width: 100%;"></div>
    </transition>
    
  </div>
</template>
<script>
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
//调用滚动插件
Vue.use(VueScrollTo, {
   container: "body",
   duration: 500,
   easing: "ease",
   offset: 0,
   cancelable: true,
   onDone: false,
   onCancel: false
})
  export default{
    data(){
      return{
        curIndex: 0,
        showZhRank: false,
        fixedTop: false,
        fixedTopHeight: 0
      }
    },
    //props: ['searchOptionIndex'],
    mounted(){
      let that = this
      //延时等待页面加载完成再执行
      setTimeout( () => {
        if(document.getElementById("blockShopTitle")){
          that.fixedTopHeight = document.getElementById("blockShopTitle").offsetTop //筛选条件开始置顶的位置
          setInterval( () => {
            if(window.scrollY < that.fixedTopHeight){
              that.fixedTop = false
            }else{
              that.fixedTop = true
            }
            that.$emit("refresh",that.fixedTop)
          },10)
        }
      },100)
    },
    methods: {
      switchTab(index, option){
        let that = this
        if(window.scrollY < that.fixedTopHeight){
          that.scrollTo('blockShopFlg')
        }
        switch(index){
          case 1:
            this.showZhRank = false
            this.curIndex = index
            this.getShop('xlzg')
            break;
          case 2:
            this.showZhRank = false
            this.curIndex = index
            this.getShop('jlzj')
            break;
          case 0:  
            //document.getElementById('app').scrollTop = 100
            if(option){
              this.curIndex = index
              this.getShop(option)
            }
            this.showZhRank = !this.showZhRank
            break
          default:
            break;
        }        
      },
      getShop(option){
        this.$emit("getshop", option)
      }
    },
    created: function(){
      let that = this
      
    }
  }
</script>
<style lang="scss" scoped>
  .block-option{
    display: flex;
    border-bottom: 1px solid #eee;
    position: relative;
    width: 100%;
    z-index: 100;
    background: #fff;
    .active{
      font-weight: bold;
    }
    .item-option{
      flex: 1;
      text-align: center;
      height: .7rem;
      line-height: .7rem;
    }
  }
  //元素置顶
  .fixedTop{
    position: fixed;
    top: .84rem;
    z-index: 10000;
    width: 100%;
  }
  .notFixedTop{
    position: relative;
    top: 0;
    z-index: 100;
    width: 100%;
  }
  .block-zh-rank{
    background: #fff;
    position: absolute;
    width: 100%;
    top: .61rem;
    z-index: 101;
    .item-rank{
      height: .7rem;
      line-height: .7rem;
      padding: 0 6%;
      border-bottom: 1px solid #eee;
    }
  }
  .slide-enter-active {
    transition: all .15s;
  }
  .slide-leave-active {
    transition: all .15s ;
  }
  .slide-enter{
    transform: translateY(0);    
  }
  .slide-leave-active {
    transform: translateY(100%);
  }
</style>