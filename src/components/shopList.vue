<template>
  <div>
    <router-link :key="index" v-for="(item, index) in data" class="item-shop" :to="{ path: 'shop/detail', query: { id: item._id }}">
      <div class="item-inner">
        <div class="img"><img :src="item.icon" alt=""></div>
        <div class="content">
          <div class="shop-name">{{item.name}}</div>    
          <div class="shop-price">起送价￥{{item.priceStart}}|配送￥{{item.psPrice}}|人均￥{{item.personPrice}}</div>      
          <div class="shop-discount">
            <i class="icon icon-test"></i>
            {{item.discount}}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    props:{
      data: {
        type: Array,
        default: []
      }
    }
  }
</script>
<style lang="scss" scoped>
  .item-shop{
    padding: 3%;
    display: block;
    min-height: 1.5rem;
    border-bottom: 1px solid #eee;
    background: #fff;
    color: #515151;
    .item-inner{
      .img{
        border: 1px solid #eee;
        float: left;
        width: 30%;
        height: 1rem;
        text-align: center;
        img{
          height: 100%;
        }
      }
      .content{
        float: right;
        width: 70%;
        padding-left: 2%;
      }
    }
  }
</style>