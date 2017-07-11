<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function(){
    
  }
}
</script>
<style lang="scss">
html,body{
  -webkit-text-size-adjust: 100%;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);//取消点击元素时闪现的灰色块
}
html {
  font-size: 100px;
  overflow-x: hidden;
}

body {
  font-size: 62.5%;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  font-family: "Microsoft YaHei",Helvetica,STHeiti,Droid Sans Fallback;
  img {
    
  }
}
table{
  border: none;
  border-collapse: collapse;
}
a,a:link,a:visited,a:hover,a:active{
  text-decoration: none;
  //color: #fff;
}
.button,.input{
  width: 100%;
}
p,div,ul,li{
    margin: 0;padding: 0;box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: .3rem;
}
.c-000{color: #000;}
.c-333{color: #333 !important;}
.c-999{color: #999;}
.c-f25a2b{color: #f25a2b}
.c-35{color: #353535;}
.c-52{color: #525252}
.c-80{color: #808080}
.c-8b{color: #8b8b8b;}
.c-27a1e5{color: #27a1e5 !important}
.c-ccc{color: #ccc;}
.c-aaa{color: #aaa;}
.c-fff{color: #fff;}
.c-f00{color: #ff0 !important;}
.c-fa525b{color: #fa525b !important;}
.c-ff5454{color: #ff5454;}
.c-e5e5e5{color: #e5e5e5;}
.c-444{color: #444;}
.c-red{color: red}
.c-1ad371{color: #1ad371;}

.bg-fff{background: #fff;}

.text-center{text-align: center;}
.text-left{text-align: left;}
.text-right{text-align: right;}
.fl{float: left;}
.fr{float: right;}
.f-s-24{font-size: .24rem;}
.f-s-28{font-size: .28rem}
.f-s-30{font-size: .3rem}
.f-s-32{font-size: .32rem}
.f-s-36{font-size: .36rem}
.f-s-40{font-size: .4rem}
.f-s-48{font-size: .48rem;}
.f-s-56{font-size: .56rem;}
.f-s-70{font-size: .7rem;}

.w40{width: 40%;}
.w42{width: 42%;}
.w50{width: 50%;}
.w60{width: 60%;}
.w54{width: 54% !important;}
.w70{width: 70%;}
.w80{width: 80%;}
.w84{width: 84%;}
.w88{width: 88%;}
.w92{width: 92%;margin: 0 4%;}
.w100{width: 100% !important}



.page{
  margin: 0 auto;
}

//按钮
.btn-group{
    margin: 0 2% .3rem 2%;
    font-size: .38rem;
}
.btn{
    display: inline-block;
    text-align: center;
    border-radius: .08rem;
    color: #fff;
    height: .8rem;
    line-height: .8rem;
    font-size: .32rem;
}
.btn-disabled{
  opacity: .7;
}
.btn-white{
  border: 1px solid #fff;
}
.btn-gray{
  background: #c9c9c9;
  color: #fff;
}
.btn-primary{
    background: #27a1e5;
}
.btn-primary-2{
  border: 1px solid #27a1e5;
  color: #27a1e5;
}
.btn-num-2{
    width: 46%;
    margin: 0 1%;
}
.btn-num-1{
    width: 96%;
    margin: 0 auto;
}
.btn-bottom{
  height: 1.1rem;
  padding: .15rem 0;
  width: 100%;
  position: fixed;
  bottom: 0;
}

//icon
.icon{
  position: relative;
  display: inline-block;
}
.icon-test{
  width: .2rem;
  height: .2rem;
  background: url('./img/touxiang.png') no-repeat;
  background-size: contain;
}

//mint-ui修改样式
.mint-toast-text{
  font-size: .28rem !important;
}

//input输入框
.input-amount{
  height: .9rem;
  display: inline-block;
  box-sizing: border-box;
  padding: .3rem;
  width: 100%;
  border: 1px solid #d2d2d2;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}

.border-0{
  border: none !important;
}
</style>
