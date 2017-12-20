<template lang="html">
  <div class="sidebar" style="font-size: 14px;">
      <ul class="root-item">
        <li v-for="(item, index) in navList" class="li-nav">
          <a v-bind:href="item.url" @click="toggle(navList,index)" :class="{ current: item.isOpen }">
            <i class="fa" :class="{ 'fa-calendar': !item.iconEmpty, 'fa-android': item.icon }"></i>
            {{item.text}}
            <div class="arrow" v-if="item.children">
              <i v-if="item.isOpen" class="fa fa-angle-down"></i>
              <i v-else class="fa fa-angle-right"></i>
            </div>
          </a>
          <transition name="slide-fade">
            <ul class="child-item ul-nav" v-if="item.children && item.isOpen">
              <li v-for="(child, index) in item.children" class="li-nav">
                <a v-bind:href="child.url" @click="toggle(item.children,index)" :class="{ current: child.isOpen }">
                  <i class="fa fa-circle"></i>{{child.text}}
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
  </div>
</template>

<script>
import router from '../router'
export default {
    data(){
      return {
            navList: [
              { url: '#/index', text: '主页', isOpen: false},
              { url: '#/shop', text: '店铺管理', isOpen: false},
              { url: '#/banner', text: 'banner管理', isOpen: false},
              { url: '#/category', text: '类目管理', isOpen: false}
            ],
            currentItem: {}
      }
    },
    props: {

    },
    methods: {
      toggle(list, index){
        //点击非分隔栏时才进入循环
        if(!list[index].iconEmpty){
          list.forEach((item, listIndex) => {
            if(index !== listIndex){
              item.isOpen = false
            }
          })
          list[index].isOpen = !list[index].isOpen
        }
      },
      //构建菜单栏
      createFun(){
        if(!!this.$route.path && this.$route.path !== '/'){
          for(let i = 0;i<this.navList.length;i++){
            if(('#' + this.$route.path).indexOf(this.navList[i].url) !== -1){
              this.navList[i].isOpen = true;
              //针对三级菜单,目前最多允许三级菜单（如列表下的详情页，详情页tab在左导航是不存在的，但在页面的头部面包屑导航中存在 首页●xx列表页●xx详情页）
              if(('#' + this.$route.path) !== this.navList[i].url){
                this.$store.dispatch("changeParentBarNode",this.navList[i])
              }
            }
            if(this.navList[i].children){
              for(let j=0;j<this.navList[i].children.length;j++){
                if(('#' + this.$route.path).indexOf(this.navList[i].children[j].url) !== -1){
                  this.navList[i].children[j].isOpen = true;
                  this.navList[i].isOpen = true;
                  //同上
                  if(('#' + this.$route.path) !== this.navList[i].children[j].url){
                    this.$store.dispatch("changeParentBarNode",this.navList[i].children[j])
                  }
                }
              }
            }
          }
        }else{
          let firstRouter = this.navList[0]
          firstRouter.isOpen = true
          this.$router.push(firstRouter.url.substring(1))
        }
      },
      //切换顶部大导航
      changeMainMenu(str){
        switch(str.split('/')[1]){
          case 'ecard': 
            this.navList = this.ecardNavList
            break;
          case 'checkstand': 
            this.navList = this.checkstandNavList
            break;
          default: 
            break;
        }
      }
    },
    created: function(){
      let that = this
      this.changeMainMenu(window.location.hash)
      //每次路由变更时做一些事情
      router.beforeEach((to, from, next) => {
        if(to.path.split("/")[1] !== from.path.split("/")[1]){
          this.changeMainMenu(to.path)
        }else{
          that.navList.forEach( item => {
            item.isOpen = false
            if(item.children){
              item.children.forEach( childItem =>{
                childItem.isOpen = false
              })
            }
          })  
        }
        next()
      })
      this.createFun()
    },
    watch: {
      //路由变化时重新构建菜单栏
      '$route.path': {
        handler(newVal,oldVal){
          this.createFun()
        }
      }
    }
}
</script>

<style lang="scss" scoped>

.sidebar{
      overflow: hidden;
      .root-item{
            .current,.current:link,.current:visited,.current:hover,.current:active{
                  background: #36c6d3;
            }
      }
      .child-item{
            .current,.current:link,.current:visited,.current:hover,.current:active{
                  background: #3e4b5c;
            }
      }
      .li-nav{
            position: relative;
            line-height: 40px;
            border-top: 1px solid #3d4957;
            cursor: pointer;
            .arrow{
                  display: inline-block;
                  position: absolute;
                  top: 0;
                  right: 4px;
            }
            .ul-nav{
                  .li-nav{
                        a{
                              padding-left: 40px;
                        }
                  }
            }
            a{
                  padding-left: 20px;
                  color: #fff;
                  line-height: 40px;
                  height: 40px;
                  display: inline-block;
                  width: 100%;
                  &:hover{
                        background: #2c3542;
                  }
            }
      }
}

//动画
.slide-fade-enter-active {
  transition: all .5s ease;
}

.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>