<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getList } from './service/getData'
export default {
  name: 'app',
  created: function(){
    getList({pageIndex: 1, pageSize: 10}).then( res => {
      console.log(res)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
