<template>
  <div class="page" id="pageSearch" style="font-size: .26rem;" :class="{'heightAuto': searchRes.length > 0}">
    <div class="topfixed-section">
      <div class="block-top">
        <div class="item item-return" @click="returned()"><span class="icon icon-return"></span></div>
        <div class="item item-search">
          <span class="icon icon-search"></span>
          <div class="item-input">
            <input type="text" :placeholder="placeholderText" v-model="searchText" @focus="focus" @blur="blur">
          </div>
        </div>
        <div class="item item-ok" @click="search()">搜索</div>
      </div>
      <searchOption @getshop="getShop" v-if="searchRes.length > 0 && searchText !== ''"></searchOption>
    </div>
    <shopList :data="searchRes" style="padding-top: 1.5rem;" id="searchOptionPosition"  v-if="searchRes.length > 0 && searchText !== ''"></shopList>
    <div class="nodata" v-if="searchRes.length === 0 && searchText !== '' && !isFocus">
      无搜索结果
    </div>
    <div v-if="searchRes.length === 0 && searchText == ''" style="padding-top: .84rem;">
      <div class="block-history">
        <div class="block-header">
          历史搜索
          <span class="fr icon icon-delete"></span>
        </div>
        <div class="item-list">
          <div class="item" @click="selectTag(item)" v-for="item in historyItemData">{{item}}</div>
        </div>
      </div>
      <div class="block-hot">
        <div class="block-header">
          热门搜索
        </div>
        <div class="item-list">
          <div class="item" @click="selectTag(item)" v-for="item in historyItemData">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShop,getBanner,getCategory } from '../service/getData'
import { Indicator  } from 'mint-ui';
export default {
  data () {
    return {
      isFocus: false,
      searchText: '',
      placeholderText: '测试文字',
      historyItemData: ['白切鸡','黄焖鸡','鲫鱼','蛋糕','海鲜','小龙虾','肯德基','高级餐厅','白切鸡','黄焖鸡','鲫鱼','蛋糕','海鲜','小龙虾'],
      searchRes: []
    }
  },
  methods:{
    refreshpagesearch(){
      this.$emit("refreshpagesearch")
    },
    focus(){
      this.isFocus = true
    },
    blur(){
      this.isFocus = false
    },
    selectTag(text){
      this.searchText = text
      this.getShop()
    },
    returned(){
      this.$router.go(-1)
    },
    getShop(option){
      let that = this
      getShop().then( res => {
        if(option){
          that.scrollTo('pageSearch')
        }
        that.searchRes = res.data
      })
    },
    search(){
      let that = this
      getShop({name: that.searchText}).then( res => {
        that.searchRes = res.data
      })
    }
  },
  created: function(){
    
  }
}
</script>

<style lang="scss" scoped>
.heightAuto{
  height: auto !important;
}
#pageSearch{
  background: #eaeaea;
  width: 100%;
  z-index: 1000001;
  .block-top{
    display: flex;
    flex-flow: row wrap;
    padding: .1rem 0;
    height: .84rem;
    box-sizing: border-box;
    background: #f9f9f9;
    .item{
      height: .64rem;
    }
    .item-return{
      width: 12%;
      .icon{
        position: relative;
        top: .1rem;
      }
      text-align: center;
    }
    .item-search{
      width: 72%;
      position: relative;
      .item-input{
        display: inline-block;
        width: 100%;
        padding: .1rem .5rem;
        height: .64rem;
        background: #edefef;
        border-radius: .2rem;
        input{
          position: relative;
          top: .03rem;
          width: 100%;
          border: 0;
          margin: 0;
          background: #edefef;
          font-size: .26rem;
        }
      }
      .icon{
        position: absolute;
        top: .13rem;
        left: .06rem;
      }
    }
    .item-ok{
      text-align: center;
      width: 16%;
      font-size: .28rem;
      line-height: .64rem;
      color: #f25a2b;
    }
  }
  .block-history,.block-hot{
    padding-left: 4%;
    background: #fff;
    padding-bottom: .2rem;
    .block-header{
      overflow: hidden;
      //padding: .2rem .4rem .2rem 0;
      border-bottom: 1px solid #eee;
      height: .64rem;
      line-height: .64rem;
      .icon-delete{
        position: relative;
        top: .16rem;
        right: .3rem;
      }
    }
    .item-list{
      display: flex;
      flex-flow: row wrap;
      .item{
        margin: .16rem .2rem 0 0;
        border: 1px solid #eee;
        padding: .06rem .12rem;
      }
    }
  }
  .nodata{
    height: 3rem;
    line-height: 3.8rem;
    text-align: center;
    background: #fff;
  }
}
</style>
