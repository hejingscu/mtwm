<template lang="html">
  <div class="header" style="font-size: 14px;padding: 0">
    <div class="project-name fl" style="padding-left: 20px;">
      <img src="../img/logo.png" height="30" width="30" alt="" style="margin-right: 6px;position: relative;top: -2px;">
      管理后台
    </div>
    <div style="margin-left: 220px;background: #2b3643;overflow: hidden;position: relative;z-index: 10;margin-right: -40px;">
      <div class="fr">
        <li class="li-item ui-dropdown userInfo" v-if="userProfile.phone"  @click="logout()">
            <a href="javascript:;">
               退出登录
            </a>
        </li>
        <li class="li-item ui-dropdown userInfo" v-if="userProfile.phone">
            <a href="javascript:;">
                欢迎你，<span>{{userProfile.phone}}&nbsp;</span><span class="touxiang"><img :src="userProfile.avatar"></span>
            </a>
        </li>
        
        <li class="li-item ui-dropdown userInfo" v-if="!userProfile.phone"  @click="login()">
            <a href="javascript:;">
               请登录
            </a>
        </li>
        <li class="li-item">
            <a href="javascript:;" @click="toIndex()"><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;回到主菜单</a>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    data(){
      return {
        userProfile: {
          phone: '',
          avatar: ''
        }
      }
    },
    props: {

    },
    methods: {
      login(){

      },
      toIndex(){
        
      },
      logout(){

      }
    },
    created: function(){
    },
    watch: {
      
    }
}
</script>

<style lang="scss" scoped>
.project-name{
  font-size: 18px;
  font-weight: bold;
  line-height: 50px;
}
.header .li-item:hover{
  background: #364150;
}
.header{
  ul,li,a{
    color: #fff !important;
  },
  .li-item{
    padding: 0 14px;
    display: block;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    float: right;
    vertical-align: middle;
    height: auto;
    position: relative;
  }
  .touxiang{
    margin-left: 20px;
    height: 40px;
    width: 40px;
    display: inline-block;
    img{
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
}

.ui-dropdown-menu{
  width: 100%;
  position: absolute;
  top: 50px;
  right: 0;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
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