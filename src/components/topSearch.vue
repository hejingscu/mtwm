<template>
  <div>
    
    <div class="block-search">
      <transition name="slide" v-on:enter="positionEnter">
        <div class="item position" v-if="!searchItemChangeFlg"><div class="item-position">上峰电商产业园</div></div>
      </transition>

      <!-- <div class="item search" v-if="!searchItemChangeFlg" v-bind:class="{'search-extend': searchItemChangeFlg}"><div class="item-search"><a href="javascript:;" @click="refreshPageSearch" class="c-999">麻辣香锅</a></div></div>

      <transition name="slide" v-on:enter="searchEnter">
        <div class="item search w100" v-if="searchItemChangeFlg" v-bind:class="{'search-extend': searchItemChangeFlg}"><div class="item-search"><a href="javascript:;" @click="refreshPageSearch" class="c-999">麻辣香锅</a></div></div>
      </transition> -->

      <div class="item search" v-if="!searchItemChangeFlg" v-bind:class="{'search-extend': searchItemChangeFlg}">
        <div class="item-search"><router-link :to="{path: 'search'}" class="c-999">麻辣香锅</router-link></div>
      </div>

      <transition name="slide">
        <div class="item search w100" v-if="searchItemChangeFlg" v-bind:class="{'search-extend': searchItemChangeFlg}">
          <div class="item-search"><router-link :to="{path: 'search'}" class="c-999">麻辣香锅</router-link></div>
        </div>
      </transition>
    </div>
    
  </div>
</template>
<script>
import Velocity from 'velocity-animate'
  export default{
    data(){
      return{
        searchItemChangeHeight: 0,
        searchItemChangeFlg: false
      }
    },
    mounted(){
      let that = this
      //延时等待页面加载完成再执行
      setTimeout( () => {
        that.searchItemChangeHeight = document.getElementById("category").offsetTop * 0.8 //筛选条件开始置顶的位置
          that.timer = setInterval( () => {
            if(window.scrollY < that.searchItemChangeHeight){
              that.searchItemChangeFlg = false
            }else{
              that.searchItemChangeFlg = true
            }
          },50)
      },100)
    },
    deactivated(){
      clearInterval(this.timer)
    },
    methods: {
      refreshPageSearch(){
        this.$parent.showPageSearch = true
      },
      positionEnter(el, done) {
        Velocity(el, { width: '40%'}, { duration: 0 })
        Velocity(el, { width: '40%' }, { complete: done })
      }
    },
    created: function(){
      let that = this
      
    }
  }
</script>
<style lang="scss" scoped>
  .block-search{
    position: fixed;
    width: 100%;
    z-index: 200;
    height: .7rem;
    display: flex;
    flex-flow: row wrap;
    .item{
      float: left;
      padding: .1rem 3%;
      height: .84rem;
      line-height: .5rem;
      &>div{
        border-radius: .3rem;
      }
    }
    .position{
      width: 40%;
      white-space:nowrap; 
      overflow: hidden;
    }
    .item-position{
      text-align: center;
      background: #000;
      opacity: .5;
      color: #fff;
      height: 100%;
      line-height: .64rem;
    }
    .search{
      width: 60%;
    }
    .search-extend{
      //width: 100%;
      text-align: center;
      background: #fff;
      .item-search{
        background: #e4e5e6;
        color: #eee;
        a{
          color: #888;
        }
      }
    }
    .item-search{
      background: #fff;
      color: #999;
      padding-left: 6%;
      height: 100%;
      line-height: .64rem;
      a{
        display: inline-block;
        width: 100%;
      }
    }
  }
  // .slide-enter-active {
  //   transition: all 15s;
  // }
  // .slide-leave-active {
  //   transition: all 15s ;
  // }
  // .slide-enter{
  //   transform: translateX(0);    
  // }
  // .slide-leave-active {
  //   transform: translateX(-40%);
  // }
  // .fade-enter-active, .fade-leave-active {
  //   transition: opacity .5s
  // }
  // .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  //   opacity: 0
  // }
</style>