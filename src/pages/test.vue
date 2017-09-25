<template>
  <div class="page" style="font-size: .26rem;">
    <p>{{formData.a}}</p>
    <input type="text" v-model="formData.a">
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: { a: 1}
    }
  },
  methods:{
    
  },
  created: function(){
    console.log(this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 
</style>
