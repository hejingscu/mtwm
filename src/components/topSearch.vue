<template>
  <div>
    <div class="block-search">
      <div class="item position" v-if="!searchItemChangeFlg"><div class="item-position">上峰电商产业园</div></div>
      <div class="item search" v-bind:class="{'search-extend': searchItemChangeFlg}"><div class="item-search"><a href="#/search" class="c-999">麻辣香锅</a></div></div>
    </div>
  </div>
</template>
<script>

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
        that.searchItemChangeHeight = window.document.body.offsetHeight * 0.1 //筛选条件开始置顶的位置
          setInterval( () => {
            if(window.scrollY < that.searchItemChangeHeight){
              that.searchItemChangeFlg = false
            }else{
              that.searchItemChangeFlg = true
            }
          },50)
      },100)
    },
    methods: {

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
    height: .6rem;
    .item{
      float: left;
      padding: .1rem 3%;
      height: .74rem;
      line-height: .5rem;
      &>div{
        border-radius: .2rem;
      }
    }
    .position{
      width: 40%;
    }
    .item-position{
      text-align: center;
      background: #000;
      opacity: .5;
      color: #fff;
    }
    .search{
      width: 60%;
    }
    .search-extend{
      width: 100%;
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
      a{
        display: inline-block;
        width: 100%;
      }
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>