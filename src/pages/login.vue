<template>
  <div class="page" style="font-size: .26rem;">
    <div id="register">
      <input type="text" v-model="formData.phone">
      <input type="text" v-model="formData.password">
      <button @click="register()">注册</button>
    </div>
    <div id="register">
      <input type="text" v-model="formData.phone">
      <input type="text" v-model="formData.password">
      <button @click="login()">登录</button>
    </div>
  </div>
</template>

<script>
import { login,register } from '../service/getData'
import { Indicator  } from 'mint-ui';
export default {
  data () {
    return {
      formData: {password: '123456', phone: '18112341245'}
    }
  },
  methods:{
    register(){
      register(this.formData).then( res => {

      })
    },
    login(){
      login(this.formData).then( res => {

      })
    }
  },
  created: function(){
    
  }
}
</script>

<style lang="scss" scoped>

</style>
